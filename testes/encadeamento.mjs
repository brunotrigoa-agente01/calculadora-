import { test } from 'node:test';
import assert from 'node:assert/strict';
import { escolherOperacao } from '../encadeamento.mjs';

test('calcula a operação pendente antes de trocar a operação',async () =>{
    const estado = {
        valorAtual: 2,
        valorAnterior: 8,
        operacaoAtual: 'add',
        precisaLimparDisplay: false
    }

    const solicitarCalculoFalso = async (valor1, valor2, operacao) => {
        assert.equal(valor1, 8);
        assert.equal(valor2, 2);
        assert.equal(operacao, 'add');
        return 10;
    }

    await escolherOperacao(estado, 'multiply', solicitarCalculoFalso);
    assert.equal(estado.valorAtual, '10');
    assert.equal(estado.valorAnterior, '10');
    assert.equal(estado.operacaoAtual, 'multiply');
    assert.equal(estado.precisaLimparDisplay, true);

}) 


test('não calcula se a operação inicial não for definida', async () => {
    let testeDeCalculo = 0
    const estado = {
        valorAtual: '8',
        valorAnterior: null,
        operacaoAtual: null,
        precisaLimparDisplay: false
    }

    const solicitarCalculoFalso = async () => {
        testeDeCalculo++;
        return 10;
    }

    await escolherOperacao(estado, 'multiply', solicitarCalculoFalso);
    assert.equal(testeDeCalculo, 0);
    assert.equal(estado.valorAtual, '8');
    assert.equal(estado.valorAnterior, '8');
    assert.equal(estado.operacaoAtual, 'multiply');
    assert.equal(estado.precisaLimparDisplay, true);

});

test( 'teste de erro catch ', async () =>{
    const estado = {
        valorAtual: '2',
        valorAnterior: '8',
        operacaoAtual: 'add',
        precisaLimparDisplay: false

    };
    const solicitarCalculoFalso = async (valor1, valor2, operacao) => {
        assert.equal(valor1, '8');
        assert.equal(valor2, '2');
        assert.equal(operacao, 'add');
        throw new Error('Error ao calcular');
        
        
    }
    await escolherOperacao(estado, 'multiply', solicitarCalculoFalso);
    assert.equal(estado.valorAtual, 'Error');
    assert.equal(estado.valorAnterior, null);
    assert.equal(estado.operacaoAtual, null);
    assert.equal(estado.precisaLimparDisplay, true);

})


