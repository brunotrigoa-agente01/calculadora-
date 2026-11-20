const banco = require('./banco');

async function salvarCalculo(usuario_id, valor1, valor2, operacao, resultado) {
    const [enviar] = await banco.execute(
        'INSERT INTO calculos (usuario_id, valor1, valor2, operacao, resultado) VALUES (?, ?, ?, ?, ?)',[
        usuario_id,
        valor1,
        valor2,
        operacao,
        resultado
    ]);
    return enviar.insertId;
}

async function listarCalculos(usuario_id) {
    const [calculos] = await banco.execute('select * from calculos where usuario_id = ?', [usuario_id]);
    return calculos;
}

module.exports = {
    salvarCalculo,
    listarCalculos
};