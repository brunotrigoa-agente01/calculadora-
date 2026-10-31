const {test} = require('node:test');
const assert = require('node:assert/strict');
const { calcular } = require('../calcular.js');

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

//node --test testes/calcular_logica.js - codigo para o teste

// node --test testes/calcular_logica.js testes/calcular_api.js - esse comando vai rodar todos os testes que estiverem na pasta testes