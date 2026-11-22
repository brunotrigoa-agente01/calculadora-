const { test } = require('node:test');
const assert = require('node:assert/strict');
const banco = require('../banco.js');
const { salvarCalculo, listarCalculos, verificarUsuario } = require('../calculos.js');

test('salvarCalculo usa INSERT parametrizado e retorna o ID inserido', async t => {
    const executar = t.mock.method(banco, 'execute', async () => [{ insertId: 42 }, []]);
    const resultado = await salvarCalculo(7, 10, 5, 'somar', 15);

    assert.equal(resultado, 42);
    assert.deepEqual(executar.mock.calls[0].arguments, [
        'INSERT INTO calculos (usuario_id, valor1, valor2, operacao, resultado) VALUES (?, ?, ?, ?, ?)',
        [7, 10, 5, 'somar', 15]
    ]);
});

test('listarCalculos usa parâmetros e consulta os cinco registros mais recentes', async t => {
    const linhas = Array.from({ length: 5 }, (_, indice) => ({ id: 5 - indice }));
    const executar = t.mock.method(banco, 'execute', async () => [linhas, []]);
    const usuarioId = '7 OR 1=1';
    const resultado = await listarCalculos(usuarioId);

    assert.deepEqual(resultado, linhas);
    assert.deepEqual(executar.mock.calls[0].arguments, [
        'select * from calculos where usuario_id = ? order by id desc limit 5',
        [usuarioId]
    ]);
});

test('verificarUsuario indica presença ou ausência do registro usando parâmetro', async t => {
    const resultados = [[[{ id: 7 }], []], [[], []]];
    const executar = t.mock.method(
        banco,
        'execute',
        async () => resultados.shift()
    );

    assert.equal(await verificarUsuario(7), true);
    assert.equal(await verificarUsuario(8), false);
    assert.deepEqual(executar.mock.calls.map(chamada => chamada.arguments), [
        ['SELECT * FROM usuarios WHERE id = ?', [7]],
        ['SELECT * FROM usuarios WHERE id = ?', [8]]
    ]);
});

test('falha de conexão é propagada e uma execução posterior pode recuperar', async t => {
    let chamadas = 0;
    t.mock.method(banco, 'execute', async () => {
        chamadas++;
        if (chamadas === 1) {
            throw new Error('connect ECONNREFUSED');
        }
        return [{ insertId: 99 }, []];
    });

    await assert.rejects(
        salvarCalculo(7, 2, 3, 'somar', 5),
        /connect ECONNREFUSED/
    );
    assert.equal(await salvarCalculo(7, 2, 3, 'somar', 5), 99);
    assert.equal(chamadas, 2);
});
