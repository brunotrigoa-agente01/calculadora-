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

function digitarNumero(numero) {
    // Depois de uma operacao, o primeiro digito substitui o resultado; os demais sao acrescentados.
    if(precisaLimparDisplay) {
        valorAtual = numero
        precisaLimparDisplay = false
    }else{
        valorAtual = valorAtual ==='0' ?  numero: valorAtual + numero;
    }
    atualizarDisplay(valorAtual)
}

function escolherOperacao(novaOperacao) {

    // Resolve a operacao anterior antes de guardar a proxima, permitindo contas encadeadas.
    if(operacaoAtual !== null && valorAnterior !== null && !precisaLimparDisplay ) {
        executarOperacao()
    }
    // A leitura ocorre depois do calculo para guardar o subtotal atualizado.
    valorAnterior = String(valorAtual).replace(',','.');
    operacaoAtual = novaOperacao;
    precisaLimparDisplay = true;
}

function executarOperacao() {
    // Sem primeiro valor ou operacao selecionada, nao ha conta para executar.
    if (valorAnterior === null || operacaoAtual === null) {return}

    // O visor usa virgula, mas Number espera ponto como separador decimal.
    const primeiroValor = Number(valorAnterior);
    const segundoValor = Number(valorAtual.replace(',','.'));
    let resultado = 0; 

    // Escolhe o calculo pelo codigo recebido do atributo data-operation do botao.
    switch (operacaoAtual) {
        case 'add':
            resultado = primeiroValor + segundoValor
            break;
        case 'subtract':
            resultado = primeiroValor - segundoValor
            break;
        case 'multiply': 
            resultado = primeiroValor * segundoValor
            break;
        case 'divide':
            // Interrompe a conta antes de dividir por zero e mostra uma mensagem.
            if (segundoValor === 0) {
                valorAtual = 'Error';
                valorAnterior = null;
                operacaoAtual = null;
                precisaLimparDisplay = true
                atualizarDisplay(valorAtual);
                return
            }
            resultado = primeiroValor / segundoValor 
            break;

        default:
        break;

    }
    // Converte o resultado para texto e restaura a virgula usada no visor.
    valorAtual = String(resultado).replace('.',',')
    // A conta terminou: limpa os operandos pendentes e prepara o proximo digito.
    valorAnterior = null;
    operacaoAtual = null;
    precisaLimparDisplay = true;
    atualizarDisplay(valorAtual);

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
                executarOperacao()
            break;

            default:
            break

        }
    })
})


