export async function escolherOperacao(estado, novaoperacao, solicitarCalculo){

    if(estado.valorAtual === 'Error'){
        return estado
    }
    try{
        if(estado.valorAnterior != null && estado.operacaoAtual  != null && !estado.precisaLimparDisplay){

        const resultado = await solicitarCalculo(estado.valorAnterior, estado.valorAtual, estado.operacaoAtual)
        estado.valorAtual = Number(resultado);

    }
    }catch (erro) {
        console.error('Erro ao calcular:', erro);
        estado.valorAtual = 'Error';
        estado.valorAnterior = null;
        estado.operacaoAtual = null;
        estado.precisaLimparDisplay = true;
        return estado;
    }
    
    estado.valorAnterior = Number(estado.valorAtual);
    estado.operacaoAtual = novaoperacao
    estado.precisaLimparDisplay = true
    return estado
}

