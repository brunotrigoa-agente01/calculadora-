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

module.exports = {
    salvarCalculo
};