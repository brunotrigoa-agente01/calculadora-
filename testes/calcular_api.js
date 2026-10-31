const { test } = require('node:test');
const assert = require('node:assert/strict');


const URL = 'http://localhost:3000';

// Função auxiliar para enviar requisições POST para a API
async function postCalcular(dados) {
    return fetch(`${URL}/calcular`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(dados)
    });
}

// 1. Testar a soma
test('POST /calcular deve somar 10 e 5', async () => {
    const resposta = await postCalcular({
        valor1: 10,
        valor2: 5,
        operacao: 'somar'
    });

    const dados = await resposta.json();

    assert.equal(resposta.status, 200);
    assert.equal(dados.resultado, 15);
});

// 2. Testar a subtração
test('POST /calcular deve subtrair 10 e 5', async () => {
    const resposta = await postCalcular({
        valor1: 10,
        valor2: 5,
        operacao: 'subtrair'
    });

    const dados = await resposta.json();

    assert.equal(resposta.status, 200);
    assert.equal(dados.resultado, 5);
});

// 3. Testar a multiplicação
test('POST /calcular deve multiplicar 10 e 5', async () => {
    const resposta = await postCalcular({
        valor1: 10,
        valor2: 5,
        operacao: 'multiplicar'
    });

    const dados = await resposta.json();

    assert.equal(resposta.status, 200);
    assert.equal(dados.resultado, 50);
});

// 4. Testar a divisão correta
test('POST /calcular deve dividir 10 por 5', async () => {
    const resposta = await postCalcular({
        valor1: 10,
        valor2: 5,
        operacao: 'dividir'
    });

    const dados = await resposta.json();

    assert.equal(resposta.status, 200);
    assert.equal(dados.resultado, 2);
});

// 5. Testar divisão por zero
test('POST /calcular deve rejeitar divisão por zero', async () => {
    const resposta = await postCalcular({
        valor1: 10,
        valor2: 0,
        operacao: 'dividir'
    });

    const dados = await resposta.json();

    assert.equal(resposta.status, 400);
    assert.equal(dados.erro, 'Divisão por zero não é permitida');
});

// 6. Testar uma operação inválida
test('POST /calcular deve rejeitar operação inválida', async () => {
    const resposta = await postCalcular({
        valor1: 10,
        valor2: 5,
        operacao: 'potencial'
    });

    const dados = await resposta.json();

    assert.equal(resposta.status, 400);
    assert.equal(dados.erro, 'digite dados validos e dois numeros');
});

// 7. Testar valor que não é numérico
test('POST /calcular deve rejeitar valores que não são números', async () => {
    const resposta = await postCalcular({
        valor1: 'dez',
        valor2: 5,
        operacao: 'somar'
    });

    const dados = await resposta.json();

    assert.equal(resposta.status, 400);
    assert.equal(dados.erro, 'digite dados validos e dois numeros');
});

// 8. Testar campo obrigatório ausente
test('POST /calcular deve rejeitar dados incompletos', async () => {
    const resposta = await postCalcular({
        valor1: 10,
        operacao: 'somar'
    });

    const dados = await resposta.json();

    assert.equal(resposta.status, 400);
    assert.equal(dados.erro, 'digite dados validos e dois numeros');
});

// 9. Testar corpo JSON que não é um objeto válido
test('POST /calcular deve rejeitar um array como entrada', async () => {
    const resposta = await postCalcular([10, 5, 'somar']); // array é com [] em vez de {} para objeto

    const dados = await resposta.json();

    assert.equal(resposta.status, 400);
    assert.equal(dados.erro, 'digite dados validos e dois numeros');
});

// 10. Testar JSON malformado
test('POST /calcular deve rejeitar JSON inválido', async () => {
    const resposta = await fetch(`${URL}/calcular`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: '{"valor1": 10,'
    });

    const dados = await resposta.json();

    assert.equal(resposta.status, 400);
    assert.equal(dados.erro, 'JSON mal formado');
});

// 11. Testar resultado matemático não finito
test('POST /calcular deve rejeitar resultado não finito', async () => {
    const resposta = await postCalcular({
        valor1: Number.MAX_VALUE,
        valor2: 2,
        operacao: 'multiplicar'
    });

    const dados = await resposta.json();

    assert.equal(resposta.status, 400);
    assert.equal(dados.erro, 'Resultado não é um número finito');
});

// 12. Testar a rota GET /api
test('GET /api deve retornar uma resposta de sucesso', async () => {
    const resposta = await fetch(`${URL}/api`);

    const dados = await resposta.json();

    assert.equal(resposta.status, 200);
    assert.equal(dados.mensagem, 'API da calculadora funcionando');
});

// 13. Testar método não permitido na rota /api
test('POST /api deve retornar método não permitido', async () => {
    const resposta = await fetch(`${URL}/api`, {
        method: 'POST'
    });

    const dados = await resposta.json();

    assert.equal(resposta.status, 405);
    assert.equal(dados.erro, 'Método não reconhecido');
});

// 14. Testar uma rota inexistente
test('rota inexistente deve retornar 404', async () => {
    const resposta = await fetch(`${URL}/rota-inexistente`);

    assert.equal(resposta.status, 404);
});