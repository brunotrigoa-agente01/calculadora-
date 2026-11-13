
const fs = require('node:fs/promises');

// Fila que controla a ordem das gravações.
    // Começa com uma Promise já resolvida.
    let fila = Promise.resolve();

// Responsável por ler, atualizar e gravar o histórico.
async function gravarHistorico(operacao, valor1, valor2, resultado, dataHora) { 
    let conteudo;
    try {
        conteudo = await fs.readFile('historico.json', 'utf-8');
        if (!conteudo) {
            conteudo = '[]'; // Inicializa como um array vazio se o arquivo estiver vazio.
        }
    }catch(erro){
        if (erro.code === 'ENOENT') {
            // Se o arquivo não existir, inicializa como um array vazio.
            conteudo = '[]';
            await fs.writeFile('historico.json', conteudo, 'utf-8'); // Cria o arquivo com conteúdo inicial.
        }else{
            throw erro; // retorna o erro para ser tratado na função salvarHistorico
        }

    }
     
    const historico = JSON.parse(conteudo);

    historico.push({
        valor1: valor1, 
        valor2: valor2, 
        operacao: operacao, 
        resultado: resultado, 
        dataHora: dataHora});

    await fs.writeFile(
        'historico.json',
        JSON.stringify(historico, null, 2),
        'utf-8'
    );
}

// Organiza as gravações em sequência.
function salvarHistorico(operacao, valor1, valor2, resultado, dataHora) {

    // A nova gravação espera a anterior terminar.
    const operacaoAtual = fila.then(() => {
        return gravarHistorico(
            operacao,
            valor1,
            valor2,
            resultado,
            dataHora
        );
    });

    // Mantém a fila funcionando mesmo se uma gravação falhar.
    fila = operacaoAtual.catch((erro) => {
        // Trata o erro, mas mantém a fila em funcionamento.
        console.error('Erro ao salvar histórico:', erro);
        return Promise.resolve(); // Continua a fila mesmo após o erro.
    });

    // Devolve a Promise original para o servidor receber o erro,
    // caso esta gravação específica falhe.
    return operacaoAtual;
}

module.exports = { salvarHistorico, gravarHistorico };
