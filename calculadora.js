// Captura os elementos do HTML; os seletores data-* identificam cada tipo de botao.
let display = document.getElementById("display");
const botoesNumeros = document.querySelectorAll(".tecla[data-number]");
const botoesOperacoes = document.querySelectorAll(".tecla-operacao");
const botoesFuncoes = document.querySelectorAll("[data-action]");

// Estado guardado pelo JavaScript, separado do texto que aparece no visor.
let valorAtual = "0";
let valorAnterior = null; // Armazena o valor anterior para operações
let operacaoAtual = null; // Armazena a operação atual (+, -, *, /)
let precisaLimparDisplay = false; // Indica se o display precisa ser limpo antes de digitar um novo número


function atualizarDisplay(valor) {
    // Atualiza a tela a partir do estado atual da calculadora.
    display.textContent = valor
}

function limparTudo() { 
    // Reinicia os valores e a operacao pendente.
    valorAtual = "0";
    valorAnterior = null; 
    operacaoAtual = null;
    precisaLimparDisplay = false;
    atualizarDisplay(valorAtual);
}

function inverterSinal() {
    // Zero e a mensagem de erro nao precisam ser convertidos em numero.
    if (valorAtual === '0' || valorAtual === 'Error'){
        return

    }else{
         valorAtual = String(Number(valorAtual.replace(',','.')) * -1).replace('.',',');
         atualizarDisplay(valorAtual)
    }

}

function aplicarPorcentagem() {
    // Troca a virgula do visor por ponto para o JavaScript converter o texto em numero.
    if(valorAtual === '0' || valorAtual == 'Error') {
        return

    }else {
        valorAtual = String(Number(valorAtual.replace(',','.') / 100 )).replace('.',',');
        atualizarDisplay(valorAtual)
    }

}

function adicionarDecimal() {
    // Se o visor esta pronto para uma nova entrada, a virgula inicia um novo numero.
    if(precisaLimparDisplay) {
        valorAtual = '0'
        precisaLimparDisplay = false

    }
    // Evita inserir mais de uma virgula no mesmo numero.
    if(!valorAtual.includes(',') ) {
        valorAtual += ','
        atualizarDisplay(valorAtual)
    }

}
async function solicitarCalculo(valor1, valor2, operacao) {

    const operacoes = {
        'add': 'somar',
        'subtract': 'subtrair',
        'multiply': 'multiplicar',
        'divide': 'dividir'
        }

    const dados = {
        valor1: Number(String(valor1).replace(',','.')),
        valor2: Number(String(valor2).replace(',','.')),
        operacao: operacoes[operacao]

    };

    
    const resposta = await fetch('/calcular', {
        method:'post',
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify(dados) 
    });
    const dadosResposta = await resposta.json();

    if (!resposta.ok) {
        throw new Error(dadosResposta.erro || 'Erro na requisição: ' + resposta.statusText);
    }
    return dadosResposta.resultado;
};
    
function digitarNumero(numero) {
    // Depois de uma operacao, o primeiro digito substitui o resultado; os demais sao acrescentados.
    if(precisaLimparDisplay) {
        valorAtual = numero
        precisaLimparDisplay = false
    }else{
        valorAtual = valorAtual ==='0' ?  numero: valorAtual + numero;
    }
    atualizarDisplay(valorAtual)
};

async function escolherOperacao(novaOperacao) {

    if(valorAtual === 'Error'){return};

    // Resolve a operacao anterior antes de guardar a proxima, permitindo contas encadeadas.
    if(operacaoAtual !== null && valorAnterior !== null && !precisaLimparDisplay ) {
        try{
        const resultado = await solicitarCalculo(valorAnterior, valorAtual, operacaoAtual)
        valorAtual = String(resultado).replace('.',',');
        atualizarDisplay(valorAtual)

        }catch (erro) {
            console.error('Erro ao calcular:', erro);
            valorAtual = "Error";
            atualizarDisplay(valorAtual);
            valorAnterior = null;
            operacaoAtual = null;
            precisaLimparDisplay = true;
        }
    }
    valorAnterior = String(valorAtual).replace(',','.');
    operacaoAtual = novaOperacao;
    precisaLimparDisplay = true;
}


// Registra um clique em cada botao numerico; o valor e lido quando ocorre o clique.
botoesNumeros.forEach((botao) => {
    botao.addEventListener('click' , () => {
        digitarNumero(botao.dataset.number)
    })
})

// Cada botao informa sua operacao pelo atributo data-operation.
botoesOperacoes.forEach((botao)=>{
    botao.addEventListener('click', () =>{
        escolherOperacao(botao.dataset.operation)
    })
        
})

async function calcularNoServidor() {
    // Envia os dados para o servidor e recebe o resultado.
    if (valorAnterior === null || operacaoAtual === null) {
        return
    }


    try {
        const resultado = await solicitarCalculo(valorAnterior, valorAtual, operacaoAtual);
        valorAtual = String(resultado).replace('.',',');
        atualizarDisplay(valorAtual);

        valorAnterior = null;
        operacaoAtual = null;
        precisaLimparDisplay = true;

    } catch (erro) {
        console.error('Erro ao calcular:', erro);
        valorAtual = "Error";
        atualizarDisplay(valorAtual);
        valorAnterior = null;
        operacaoAtual = null;
        precisaLimparDisplay = true;
    }
}

// Registra as acoes AC, sinal, porcentagem, virgula e igual.
botoesFuncoes.forEach((botao) =>{
    // Guarda a acao deste botao para escolher a funcao no clique.
    const acao = botao.dataset.action

    botao.addEventListener('click', ()=>{
        switch(acao){
            case 'clear':
                limparTudo()
            break;

            case 'sign':
                inverterSinal()
            break;

            case 'percent':
                aplicarPorcentagem()
            break;

            case 'decimal':
                adicionarDecimal()
            break;

            case 'equals':
                calcularNoServidor();
            break;

            default:
            break

        }
    })
})


