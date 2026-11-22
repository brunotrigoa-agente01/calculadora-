const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs/promises');
const path = require('node:path');
const { calcular } = require('../calcular.js');
const { salvarHistorico, gravarHistorico } = require('../historico.js');
const { criaServidor } = require('../server.js');

const caminhoEsperado = path.join(__dirname, '..', 'historico.json');

test('calcular executa soma, subtração, multiplicação e divisão', () => {
    assert.equal(calcular(10, 5, 'somar'), 15);
    assert.equal(calcular(10, 5, 'subtrair'), 5);
    assert.equal(calcular(10, 5, 'multiplicar'), 50);
    assert.equal(calcular(10, 5, 'dividir'), 2);
});

test('calcular rejeita divisão por zero e operação inválida', () => {
    assert.throws(() => calcular(10, 0, 'dividir'), /Divisão por zero não é permitida/);
    assert.throws(() => calcular(10, 5, 'potencial'), /Operação inválida/);
});

test('calcular rejeita resultados não finitos', () => {
    assert.throws(
        () => calcular(Number.MAX_VALUE, 2, 'multiplicar'),
        /Resultado não é um número finito/
    );
});

test('gravarHistorico lê e persiste o cálculo sem acessar o arquivo real', async t => {
    const dataHora = new Date().toISOString();
    let conteudoGravado;

    t.mock.method(fs, 'readFile', async (caminho, codificacao) => {
        assert.equal(caminho, caminhoEsperado);
        assert.equal(codificacao, 'utf-8');
        return JSON.stringify([{ operacao: 'somar', resultado: 3 }]);
    });
    t.mock.method(fs, 'writeFile', async (caminho, conteudo, codificacao) => {
        assert.equal(caminho, caminhoEsperado);
        assert.equal(codificacao, 'utf-8');
        conteudoGravado = conteudo;
    });

    await gravarHistorico('subtrair', 10, 5, 5, dataHora);
    const historico = JSON.parse(conteudoGravado);

    assert.equal(historico.length, 2);
    assert.deepEqual(historico[1], {
        valor1: 10,
        valor2: 5,
        operacao: 'subtrair',
        resultado: 5,
        dataHora
    });
});

test('gravarHistorico inicializa conteúdo vazio e arquivo inexistente', async t => {
    let chamadasDeEscrita = 0;
    let conteudoFinal;

    t.mock.method(fs, 'readFile', async () => '');
    t.mock.method(fs, 'writeFile', async (caminho, conteudo) => {
        assert.equal(caminho, caminhoEsperado);
        chamadasDeEscrita++;
        conteudoFinal = conteudo;
    });

    await gravarHistorico('dividir', 10, 2, 5, new Date().toISOString());
    assert.equal(chamadasDeEscrita, 1);
    assert.equal(JSON.parse(conteudoFinal).length, 1);

    const erroArquivoAusente = Object.assign(new Error('arquivo ausente'), { code: 'ENOENT' });
    const escritasAusente = [];
    t.mock.restoreAll();
    t.mock.method(fs, 'readFile', async () => { throw erroArquivoAusente; });
    t.mock.method(fs, 'writeFile', async (caminho, conteudo) => {
        assert.equal(caminho, caminhoEsperado);
        escritasAusente.push(conteudo);
    });

    await gravarHistorico('somar', 1, 2, 3, new Date().toISOString());
    assert.equal(escritasAusente.length, 2);
    assert.equal(escritasAusente[0], '[]');
    assert.equal(JSON.parse(escritasAusente[1]).length, 1);
});

test('gravarHistorico propaga erros de leitura, JSON inválido e gravação', async t => {
    t.mock.method(fs, 'readFile', async () => {
        throw new Error('falha na leitura');
    });
    await assert.rejects(
        gravarHistorico('somar', 1, 2, 3, new Date().toISOString()),
        /falha na leitura/
    );

    t.mock.restoreAll();
    t.mock.method(fs, 'readFile', async () => '{');
    await assert.rejects(
        gravarHistorico('somar', 1, 2, 3, new Date().toISOString()),
        SyntaxError
    );

    t.mock.restoreAll();
    t.mock.method(fs, 'readFile', async () => '[]');
    t.mock.method(fs, 'writeFile', async () => {
        throw new Error('falha na gravação');
    });
    await assert.rejects(
        gravarHistorico('somar', 1, 2, 3, new Date().toISOString()),
        /falha na gravação/
    );
});

test('salvarHistorico serializa gravações concorrentes e mantém a fila após erro', async t => {
    let conteudo = '[]';
    let falharUmaVez = true;

    t.mock.method(fs, 'readFile', async () => conteudo);
    t.mock.method(fs, 'writeFile', async (caminho, proximoConteudo) => {
        assert.equal(caminho, caminhoEsperado);
        if (falharUmaVez) {
            falharUmaVez = false;
            throw new Error('falha temporária');
        }
        conteudo = proximoConteudo;
    });
    t.mock.method(console, 'error', () => {});

    const primeiraData = new Date().toISOString();
    const segundaData = new Date(Date.now() + 1).toISOString();
    const primeira = salvarHistorico('somar', 1, 2, 3, primeiraData);
    const segunda = salvarHistorico('subtrair', 5, 2, 3, segundaData);

    await assert.rejects(primeira, /falha temporária/);
    await segunda;

    const historico = JSON.parse(conteudo);
    assert.equal(historico.length, 1);
    assert.equal(historico[0].dataHora, segundaData);
});

test('salvarHistorico preserva ambas as gravações concorrentes', async t => {
    let conteudo = '[]';

    t.mock.method(fs, 'readFile', async () => conteudo);
    t.mock.method(fs, 'writeFile', async (caminho, proximoConteudo) => {
        assert.equal(caminho, caminhoEsperado);
        conteudo = proximoConteudo;
    });

    const primeiraData = new Date().toISOString();
    const segundaData = new Date(Date.now() + 1).toISOString();
    await Promise.all([
        salvarHistorico('somar', 1, 2, 3, primeiraData),
        salvarHistorico('subtrair', 5, 2, 3, segundaData)
    ]);

    const historico = JSON.parse(conteudo);
    assert.deepEqual(historico.map(registro => registro.dataHora), [
        primeiraData,
        segundaData
    ]);
});

test('POST /calcular informa falhas de persistência e ainda retorna o resultado', async t => {
    let chamadasHistorico = 0;
    let chamadasCalculo = 0;
    const servidor = criaServidor(
        async () => {
            chamadasHistorico++;
            throw new Error('erro ao salvar histórico');
        },
        async () => {
            chamadasCalculo++;
            throw new Error('MySQL indisponível');
        },
        async () => [],
        async () => true
    );
    t.mock.method(console, 'error', () => {});

    await new Promise((resolve, reject) => {
        servidor.once('error', reject);
        servidor.listen(0, '127.0.0.1', resolve);
    });
    t.after(() => new Promise((resolve, reject) => {
        servidor.close(erro => erro ? reject(erro) : resolve());
    }));

    const resposta = await fetch(`http://127.0.0.1:${servidor.address().port}/calcular`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ valor1: 8, valor2: 2, operacao: 'somar' })
    });
    const dados = await resposta.json();

    assert.equal(chamadasHistorico, 1);
    assert.equal(chamadasCalculo, 1);
    assert.equal(resposta.status, 200);
    assert.equal(dados.resultado, 10);
    assert.deepEqual(dados.avisos, {
        historico: 'Erro ao salvar histórico',
        mysql: 'Erro ao salvar no banco de dados'
    });
});
