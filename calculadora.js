import {escolherOperacao} from './encadeamento.mjs'

// Captura os elementos do HTML; os seletores data-* identificam cada tipo de botao.
let display = document.getElementById("display");
const botoesNumeros = document.querySelectorAll(".tecla[data-number]");
const botoesOperacoes = document.querySelectorAll(".tecla-operacao");
const botoesFuncoes = document.querySelectorAll("[data-action]");
const botaoHistorico = document.getElementById("botao-historico");
const popoverHistorico = document.getElementById("historico-popover");
const mensagemAviso = document.getElementById("mensagem-aviso");

// Estado guardado pelo JavaScript, separado do texto que aparece no visor.
const operador  = {
            'add': '+',
            'subtract': '-',
            'multiply': '*',
            'divide': '/'
        }
let valorAtual = "0";
let valorAnterior = null; // Armazena o valor anterior para operações
let operacaoAtual = null; // Armazena a operação atual (+, -, *, /)
let precisaLimparDisplay = false; // Indica se o display precisa ser limpo antes de digitar um novo número
let calculoEmAndamento = false;
let temporizadorAviso = null;
const botoesCalculadora = [...botoesNumeros, ...botoesOperacoes, ...botoesFuncoes];

async function executarComBloqueio(callback) {
    if (calculoEmAndamento) {
        return;
    }

    calculoEmAndamento = true;
    botoesCalculadora.forEach((botao) => {
        botao.disabled = true;
    });

    try {
        await callback();
    } finally {
        calculoEmAndamento = false;
        botoesCalculadora.forEach((botao) => {
            botao.disabled = false;
        });
    }
}


async function atualizarHistorico() {
    try {
        const resultado = await fetch('/api/calculos?usuario_id=1');

        if (!resultado.ok) {
            throw new Error('Erro na requisição: ' + resultado.statusText);
        }

        const dadosResposta = await resultado.json();
        mostrarHistorico(dadosResposta);

    } catch (erro) {
        console.error('Erro ao buscar histórico:', erro);
        popoverHistorico.innerText = 'Erro ao buscar histórico';
    }
}

botaoHistorico.addEventListener("click", async () => {
    const aberto = !popoverHistorico.hidden;
    popoverHistorico.hidden = aberto;
    botaoHistorico.setAttribute("aria-expanded", String(!aberto));

    if(!aberto){
        atualizarHistorico();
        }   
            
});

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
         atualizarDisplay(valorAtual )
    }

}

function aplicarPorcentagem() {
    // Troca a virgula do visor por ponto para o JavaScript converter o texto em numero.
    if(valorAtual === '0' || valorAtual === 'Error') {
        return

    }else {
        valorAtual = String(Number(valorAtual.replace(',','.') / 100 )).replace('.',',');
        atualizarDisplay(`${valorAtual}%`);
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
        usuario_id: 1,
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
    const {resultado, avisos} = await resposta.json();

    if (!resposta.ok) {
        throw new Error('Erro na requisição: ' + resposta.statusText);
    }
    return {resultado, avisos}; 
};
    
function digitarNumero(numero) {
    // Depois de uma operacao, o primeiro digito substitui o resultado; os demais sao acrescentados.
    if(precisaLimparDisplay) {
        valorAtual = numero
        precisaLimparDisplay = false
    }else{
        valorAtual = valorAtual ==='0' ?  numero: valorAtual + numero;
    }
    atualizarVisor()
};
function atualizarVisor(){
    
    if (valorAnterior !== null && operacaoAtual !== null ) {
        const simbolo = operador[operacaoAtual]
        if(precisaLimparDisplay){
            atualizarDisplay(valorAnterior + simbolo );
        }else{
            atualizarDisplay(valorAnterior + simbolo + valorAtual);
        }
        
    } else {
        atualizarDisplay(valorAtual);
    }
}
// Registra um clique em cada botao numerico; o valor e lido quando ocorre o clique.
botoesNumeros.forEach((botao) => {
    botao.addEventListener('click' , () => {
        digitarNumero(botao.dataset.number)
    })
})

// Cada botao informa sua operacao pelo atributo data-operation.
botoesOperacoes.forEach((botao)=>{
    botao.addEventListener('click', async () =>{
        await executarComBloqueio(async () => {
            const estado = {
                valorAtual,
                valorAnterior,
                operacaoAtual,
                precisaLimparDisplay
            };

            await escolherOperacao(
                estado,
                botao.dataset.operation,
                async (...argumentos) => {
                    const { resultado } = await solicitarCalculo(...argumentos);
                    return resultado;
                }
            );

            if (estado.valorAnterior !== null && estado.operacaoAtual !== null) {
                const simbolo = operador[estado.operacaoAtual]
                atualizarDisplay(estado.valorAnterior + simbolo);
            }

            valorAtual = estado.valorAtual;
            valorAnterior = estado.valorAnterior;
            operacaoAtual = estado.operacaoAtual;
            precisaLimparDisplay = estado.precisaLimparDisplay;

            atualizarVisor();
        });

    })
        
})

function mostrarHistorico(dadosHistorico) {
    const simbolo = {
        'somar': '+',
        'subtrair': '-',
        'multiplicar': '*',
        'dividir': '/'
    };

    const historico = dadosHistorico || [];

    if (historico.length === 0) {
        popoverHistorico.innerText = 'Nenhum cálculo realizado ainda';
        return;
    }

    // Limpa o conteúdo anterior do popover.
    popoverHistorico.innerText = '';

    // Exibe os cálculos mais recentes primeiro.
    historico.forEach((calculo) => {
        const linha = `${Number(calculo.valor1)} ${simbolo[calculo.operacao]} ${Number(calculo.valor2)} = ${Number(calculo.resultado)}`;

        popoverHistorico.innerText += linha + '\n';
    });
}

function mostrarAvisos(avisos) {
    const mensagens = [];

    if (avisos.mysql) {
        console.error('Erro ao salvar cálculo:', avisos.mysql);
        mensagens.push('Calculo realizado mas impossível salvar no banco de dados');
    }
    if (avisos.historico) {
        console.error('calculo realizado mas não salvo no histórico', avisos.historico);
        mensagens.push('calculo realizado mas não salvo no histórico');
    }

    if (mensagens.length === 0) {
        return;
    }

    if (temporizadorAviso !== null) {
        clearTimeout(temporizadorAviso);
    }

    mensagemAviso.style.display = 'block';
    mensagemAviso.textContent = mensagens.join(' | ');
    temporizadorAviso = setTimeout(() => {
        mensagemAviso.textContent = '';
        mensagemAviso.style.display = 'none';
        temporizadorAviso = null;
    }, 5000);
}



async function calcularNoServidor() {
    // Envia os dados para o servidor e recebe o resultado.
    if (valorAnterior === null || operacaoAtual === null) {
        return
    }


    try {
        const {resultado, avisos: avisosResposta} = await solicitarCalculo(valorAnterior, valorAtual, operacaoAtual);
        const avisos = avisosResposta || {};

        try {
            const resultadojson = {
            valorAtual:valorAtual,
            valorAnterior:valorAnterior,
            operacaoAtual:operacaoAtual,
            resultado:resultado,
            avisos: avisos || null,
            data: new Date().toISOString()
        }
            const conteudo = localStorage.getItem('historico')
            const registro = conteudo ? JSON.parse(conteudo): []
            registro.push(resultadojson)
            const historico = JSON.stringify(registro)
            localStorage.setItem('historico', historico)
            
        }catch(erro){
            console.log('erro ao salvar no local storage:', erro)
            
        }
        

        valorAtual = String(resultado).replace('.',',');
        atualizarDisplay(valorAtual);

        mostrarAvisos(avisos);
        
        valorAnterior = null;
        operacaoAtual = null;
        precisaLimparDisplay = true;

        if(!popoverHistorico.hidden){
            atualizarHistorico()
        }

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
                if(!precisaLimparDisplay) {
                    executarComBloqueio(calcularNoServidor);
                    
                };
            break;

            default:
            break

        }
    })
})


