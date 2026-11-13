const {test} = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs/promises');
const { calcular } = require('../calcular.js');
const { salvarHistorico, gravarHistorico } = require('../historico.js');

test( 'teste da soma de 10 e 5', () => {
    assert.equal(calcular(10, 5, 'somar'), 15);
});

test( 'teste da divisão com erro', () => {
    assert.throws(() => {
        calcular(10, 0, 'dividir');
    }, /Divisão por zero não é permitida/);
});
test( 'teste da divisão sem erro', () => {
    assert.equal(calcular(10, 5, 'dividir'), 2);
});

test( 'teste da subtração de 10 e 5', () => {
    assert.equal(calcular(10, 5, 'subtrair'), 5);
});

test( 'teste da multiplicação de 10 e 5', () => {
    assert.equal(calcular(10, 5, 'multiplicar'), 50);
});

test( 'teste de potencial invalida', () => {
    assert.throws(() => {
        calcular(10, 5, 'potencial');
    }, /Operação inválida/);
});

test('erro quando o resultado não é finito', () => {
    assert.throws(
        () => calcular(Number.MAX_VALUE, 2, 'multiplicar'),
        /Resultado não é um número finito/
    );
});
test('teste de duas chamadas simultâneas', async () => {
    const data1 = new Date().toISOString();
    const data2 = new Date(Date.now() + 1000).toISOString();

    const promise1 = salvarHistorico(
        'somar', 10, 5, 15, data1
    );

    const promise2 = salvarHistorico(
        'subtrair', 10, 5, 5, data2
    );

    assert.ok(promise1 instanceof Promise);
    assert.ok(promise2 instanceof Promise);

    await Promise.all([promise1, promise2]);

    const conteudo = await fs.readFile('historico.json', 'utf-8');
    const historico = JSON.parse(conteudo);

    const registro1 = historico.find(
        item => item.dataHora === data1
    );

    const registro2 = historico.find(
        item => item.dataHora === data2
    );

    assert.ok(registro1);
    assert.ok(registro2);

    assert.equal(registro1.operacao, 'somar');
    assert.equal(registro1.resultado, 15);

    assert.equal(registro2.operacao, 'subtrair');
    assert.equal(registro2.resultado, 5);
});



test('gravarHistorico persiste o cálculo no JSON', async () => {
    const dataHora = new Date().toISOString();

    await gravarHistorico('somar', 10, 5, 15, dataHora);

    // A leitura só começa depois que a gravação termina.
    const conteudo = await fs.readFile('historico.json', 'utf-8');
    assert.ok(conteudo);

    const historico = JSON.parse(conteudo);

    const registro = historico.find(
        item => item.dataHora === dataHora
    );

    assert.ok(registro);
    assert.equal(registro.operacao, 'somar');
    assert.equal(registro.resultado, 15);
});

//node --test testes/calcular_logica.js - codigo para o teste

// node --test testes/calcular_logica.js testes/calcular_api.js - esse comando vai rodar todos os testes que estiverem na pasta testes
