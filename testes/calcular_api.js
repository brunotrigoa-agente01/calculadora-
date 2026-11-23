const { after, before, test } = require('node:test');
const assert = require('node:assert/strict');
const http = require('node:http');
const { criaServidor } = require('../server.js');

let servidor;
let baseUrl;

function requisicaoSemContentLength(caminho, dados) {
    return new Promise((resolve, reject) => {
        const requisicao = http.request({
            hostname: '127.0.0.1',
            port: new URL(baseUrl).port,
            path: caminho,
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Transfer-Encoding': 'chunked'
            }
        }, (resposta) => {
            let corpo = '';
            resposta.on('data', pedaco => { corpo += pedaco; });
            resposta.on('end', () => {
                resolve({
                    status: resposta.statusCode,
                    dados: JSON.parse(corpo)
                });
            });
        });

        requisicao.on('error', reject);
        requisicao.write(JSON.stringify(dados));
        requisicao.end();
    });
}

async function abrirServidor(t, dependencias = {}) {
    const servidorTeste = criaServidor(
        dependencias.salvarHistorico || (async () => {}),
        dependencias.salvarCalculo || (async () => {}),
        dependencias.listarCalculos || (async () => []),
        dependencias.verificarUsuario || (async usuarioId => String(usuarioId) === '7')
    );

    await new Promise((resolve, reject) => {
        servidorTeste.once('error', reject);
        servidorTeste.listen(0, '127.0.0.1', resolve);
    });

    t.after(() => new Promise((resolve, reject) => {
        servidorTeste.close(erro => erro ? reject(erro) : resolve());
    }));

    return `http://127.0.0.1:${servidorTeste.address().port}`;
}

before(async () => {
    const historico = [
        { id: 5, operacao: 'somar', valor1: 2, valor2: 3, resultado: 5 },
        { id: 4, operacao: 'subtrair', valor1: 8, valor2: 2, resultado: 6 },
        { id: 3, operacao: 'multiplicar', valor1: 3, valor2: 4, resultado: 12 },
        { id: 2, operacao: 'dividir', valor1: 10, valor2: 2, resultado: 5 },
        { id: 1, operacao: 'somar', valor1: 1, valor2: 1, resultado: 2 }
    ];
    servidor = criaServidor(
        async () => {},
        async () => {},
        async () => historico,
        async usuarioId => String(usuarioId) === '7'
    );

    await new Promise((resolve, reject) => {
        servidor.once('error', reject);
        servidor.listen(0, '127.0.0.1', resolve);
    });
    baseUrl = `http://127.0.0.1:${servidor.address().port}`;
});

after(async () => {
    await new Promise((resolve, reject) => {
        servidor.close(erro => erro ? reject(erro) : resolve());
    });
});

async function postCalcular(dados) {
    return fetch(`${baseUrl}/calcular`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(dados)
    });
}

test('POST /calcular executa soma, subtração, multiplicação e divisão', async () => {
    const casos = [
        ['somar', 15],
        ['subtrair', 5],
        ['multiplicar', 50],
        ['dividir', 2]
    ];

    for (const [operacao, resultadoEsperado] of casos) {
        const resposta = await postCalcular({
            valor1: 10,
            valor2: 5,
            operacao
        });
        const dados = await resposta.json();
        assert.equal(resposta.status, 200);
        assert.equal(dados.resultado, resultadoEsperado);
    }
});

test('POST /calcular rejeita divisão por zero', async () => {
    const resposta = await postCalcular({
        valor1: 10,
        valor2: 0,
        operacao: 'dividir'
    });
    const dados = await resposta.json();

    assert.equal(resposta.status, 400);
    assert.equal(dados.erro, 'Divisão por zero não é permitida');
});

test('POST /calcular rejeita operação inválida, campos ausentes e tipos inválidos', async () => {
    const casosInvalidos = [
        { valor1: 10, valor2: 5, operacao: 'potencial' },
        { valor1: 10, operacao: 'somar' },
        { valor1: 'dez', valor2: 5, operacao: 'somar' },
        [10, 5, 'somar'],
        null
    ];

    for (const dados of casosInvalidos) {
        const resposta = await postCalcular(dados);
        const corpo = await resposta.json();
        assert.equal(resposta.status, 400);
        assert.equal(corpo.erro, 'digite dados validos e dois numeros');
    }
});

test('POST /calcular rejeita JSON malformado e corpo em formato não JSON', async () => {
    for (const corpo of ['{"valor1": 10,', 'valor1=10&valor2=5']) {
        const resposta = await fetch(`${baseUrl}/calcular`, {
            method: 'POST',
            headers: { 'Content-Type': 'text/plain' },
            body: corpo
        });
        const dados = await resposta.json();
        assert.equal(resposta.status, 400);
        assert.equal(dados.erro, 'JSON mal formado');
    }
});

test('POST /calcular rejeita resultado matemático não finito', async () => {
    const resposta = await postCalcular({
        valor1: Number.MAX_VALUE,
        valor2: 2,
        operacao: 'multiplicar'
    });
    const dados = await resposta.json();

    assert.equal(resposta.status, 400);
    assert.equal(dados.erro, 'Resultado não é um número finito');
});

test('POST /calcular rejeita corpos maiores que o limite e continua atendendo', async () => {
    const respostaGrande = await postCalcular({
        valor1: 10,
        valor2: 5,
        operacao: 'somar',
        textoExtra: 'a'.repeat(11 * 1024)
    });
    const erro = await respostaGrande.json();
    assert.equal(respostaGrande.status, 413);
    assert.equal(erro.erro, 'Limite de tamanho do corpo excedido');

    const respostaValida = await postCalcular({
        valor1: 10,
        valor2: 5,
        operacao: 'somar'
    });
    assert.equal(respostaValida.status, 200);
    assert.equal((await respostaValida.json()).resultado, 15);
});

test('POST /calcular funciona e aplica o limite sem Content-Length', async () => {
    const resposta = await requisicaoSemContentLength('/calcular', {
        valor1: 10,
        valor2: 5,
        operacao: 'somar'
    });
    assert.equal(resposta.status, 200);
    assert.equal(resposta.dados.resultado, 15);

    const respostaGrande = await requisicaoSemContentLength('/calcular', {
        valor1: 10,
        valor2: 5,
        operacao: 'somar',
        textoExtra: 'a'.repeat(12 * 1024)
    });
    assert.equal(respostaGrande.status, 413);
    assert.equal(respostaGrande.dados.erro, 'Limite de tamanho do corpo excedido');
});

test('GET /api e métodos e rotas inválidos retornam os status esperados', async () => {
    const api = await fetch(`${baseUrl}/api`);
    assert.equal(api.status, 200);
    assert.equal((await api.json()).mensagem, 'API da calculadora funcionando');

    const metodoInvalido = await fetch(`${baseUrl}/api`, { method: 'POST' });
    assert.equal(metodoInvalido.status, 405);
    assert.equal((await metodoInvalido.json()).erro, 'Método não reconhecido');

    const rotaInexistente = await fetch(`${baseUrl}/rota-inexistente`);
    assert.equal(rotaInexistente.status, 404);
});

test('rotas mantêm a classificação correta quando a URL tem query string', async () => {
    const api = await fetch(`${baseUrl}/api?origem=teste`);
    assert.equal(api.status, 200);

    const metodoApiInvalido = await fetch(`${baseUrl}/api?origem=teste`, {
        method: 'POST'
    });
    assert.equal(metodoApiInvalido.status, 405);

    const metodoCalculoInvalido = await fetch(`${baseUrl}/calcular?origem=teste`);
    assert.equal(metodoCalculoInvalido.status, 405);

    const calculo = await fetch(`${baseUrl}/calcular?origem=teste`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ valor1: 2, valor2: 3, operacao: 'somar' })
    });
    assert.equal(calculo.status, 200);
    assert.equal((await calculo.json()).resultado, 5);

    const rotaInexistente = await fetch(`${baseUrl}/rota-inexistente?origem=teste`);
    assert.equal(rotaInexistente.status, 404);
});

test('GET /api/calculos valida usuario_id e retorna os cálculos listados', async () => {
    for (const usuarioId of ['', 'abc', '0', '-1', '1.5']) {
        const resposta = await fetch(`${baseUrl}/api/calculos?usuario_id=${usuarioId}`);
        assert.equal(resposta.status, 400);
    }

    const usuarioInexistente = await fetch(`${baseUrl}/api/calculos?usuario_id=8`);
    assert.equal(usuarioInexistente.status, 404);
    assert.equal((await usuarioInexistente.json()).erro, 'Usuário não encontrado');

    const resposta = await fetch(`${baseUrl}/api/calculos?usuario_id=7`);
    assert.equal(resposta.status, 200);
    assert.deepEqual(await resposta.json(), [
        { id: 5, operacao: 'somar', valor1: 2, valor2: 3, resultado: 5 },
        { id: 4, operacao: 'subtrair', valor1: 8, valor2: 2, resultado: 6 },
        { id: 3, operacao: 'multiplicar', valor1: 3, valor2: 4, resultado: 12 },
        { id: 2, operacao: 'dividir', valor1: 10, valor2: 2, resultado: 5 },
        { id: 1, operacao: 'somar', valor1: 1, valor2: 1, resultado: 2 }
    ]);
});

test('GET /api/calculos retorna erro e recupera em uma requisição seguinte', async t => {
    let chamadas = 0;
    const base = await abrirServidor(t, {
        listarCalculos: async () => {
            chamadas++;
            if (chamadas === 1) {
                throw new Error('MySQL indisponível');
            }
            return [{ id: 9, resultado: 12 }];
        }
    });

    const primeiraResposta = await fetch(`${base}/api/calculos?usuario_id=7`);
    assert.equal(primeiraResposta.status, 500);
    assert.equal((await primeiraResposta.json()).erro, 'Erro ao listar cálculos');

    const segundaResposta = await fetch(`${base}/api/calculos?usuario_id=7`);
    assert.equal(segundaResposta.status, 200);
    assert.deepEqual(await segundaResposta.json(), [{ id: 9, resultado: 12 }]);
});
