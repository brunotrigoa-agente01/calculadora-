const fs = require('node:fs/promises');

async function salvarHistorico(operacao, valor1, valor2, resultado, dataHora) {
    const conteudo = await fs.readFile('historico.json', 'utf-8');
    const historico = JSON.parse(conteudo);

    const registro = {
        valor1: valor1,
        valor2: valor2,
        operacao: operacao,
        resultado: resultado,
        dataHora: dataHora
    };
    historico.push(registro);

    await fs.writeFile('historico.json', JSON.stringify(historico, null, 2), 'utf-8');  


    
}
module.exports = { salvarHistorico };
