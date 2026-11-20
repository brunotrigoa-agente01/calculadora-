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

async function verificarUsuario(usuario_id) {
     try{
        const [usuarios] = await banco.execute('SELECT * FROM usuarios WHERE id = ?', [usuario_id]);
        return  usuarios.length > 0? true : false;

    }catch (erro) {
        console.error('Erro ao verificar usuário:', erro);
        throw erro;
       
    }
}


module.exports = {
    salvarCalculo,
    listarCalculos,
    verificarUsuario
};