export async function escolherOperacao(estado, novaoperacao, solicitarCalculo){

    if(estado.valorAtual === 'Error'){
        return estado
    }

    if(estado.valorAnterior != null && estado.operacaoAtual  != null && !estado.precisaLimparDisplay){

        const resultado = await solicitarCalculo(estado.valorAnterior, estado.valorAtual, estado.operacaoAtual)
        estado.valorAtual = String(resultado.toString().replace('.', ','));

    }
    estado.valorAnterior = String(estado.valorAtual.replace(',', '.'));
    estado.operacaoAtual = novaoperacao
    estado.precisaLimparDisplay = true
    return estado
}

