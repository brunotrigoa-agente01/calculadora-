const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');

const caminhoCalculadora = path.join(__dirname, '..', 'calculadora.js');
const codigoCalculadora = fs.readFileSync(caminhoCalculadora, 'utf8');
const importEncadeamento = /^import \{escolherOperacao\} from '\.\/encadeamento\.mjs'\r?\n/;

function criarBotao(dataset = {}) {
    const ouvintes = {};
    return {
        dataset,
        disabled: false,
        ouvintes,
        addEventListener(tipo, ouvinte) {
            ouvintes[tipo] = ouvinte;
        },
        setAttribute() {},
        click() {
            if (this.disabled) {
                return Promise.resolve();
            }
            return ouvintes.click?.();
        }
    };
}

async function criarInterface(fetch) {
    const numeros = ['0', '2', '3', '8'].map(numero => criarBotao({ number: numero }));
    const operacoes = [criarBotao({ operation: 'add' })];
    const funcoes = ['clear', 'sign', 'percent', 'decimal', 'equals']
        .map(action => criarBotao({ action }));
    const elementos = {
        display: { textContent: '' },
        'botao-historico': criarBotao(),
        'historico-popover': { hidden: true, innerText: '' },
        'mensagem-aviso': { textContent: '', style: {} }
    };
    const temporizadores = [];
    let proximoTemporizador = 0;

    const document = {
        getElementById(id) {
            return elementos[id];
        },
        querySelectorAll(seletor) {
            if (seletor === '.tecla[data-number]') {
                return numeros;
            }
            if (seletor === '.tecla-operacao') {
                return operacoes;
            }
            return funcoes;
        }
    };

    const codigoExecutavel = codigoCalculadora.replace(importEncadeamento, '');
    assert.notEqual(codigoExecutavel, codigoCalculadora);

    const { escolherOperacao } = await import('../encadeamento.mjs');
    const chamadasFetch = [];
    const armazenamento = new Map();
    vm.runInNewContext(codigoExecutavel, {
        document,
        escolherOperacao,
        fetch: (...argumentos) => new Promise(resolve => {
            chamadasFetch.push({ argumentos, resolve });
        }),
        localStorage: {
            getItem(chave) {
                return armazenamento.get(chave) || null;
            },
            setItem(chave, valor) {
                armazenamento.set(chave, valor);
            }
        },
        setTimeout(callback, atraso) {
            const temporizador = { id: ++proximoTemporizador, callback, atraso, cancelado: false };
            temporizadores.push(temporizador);
            return temporizador;
        },
        clearTimeout(temporizador) {
            temporizador.cancelado = true;
        },
        console: { error() {}, log() {} }
    });

    return {
        elementos,
        numeros,
        operacoes,
        funcoes,
        chamadasFetch,
        temporizadores,
        async digitar(numero) {
            await numeros.find(botao => botao.dataset.number === numero).click();
        },
        async escolherOperacao() {
            await operacoes[0].click();
        },
        async limpar() {
            await funcoes.find(botao => botao.dataset.action === 'clear').click();
        },
        clicarIgual() {
            return funcoes.find(botao => botao.dataset.action === 'equals').click();
        },
        responder(indice, corpo) {
            chamadasFetch[indice].resolve({
                ok: true,
                statusText: 'OK',
                json: async () => corpo
            });
        }
    };
}

async function prepararSoma(interfaceCalculadora) {
    await interfaceCalculadora.digitar('8');
    await interfaceCalculadora.escolherOperacao();
    await interfaceCalculadora.digitar('2');
}

async function aguardarResposta() {
    await new Promise(resolve => setImmediate(resolve));
}

test('bloqueia entradas e cliques repetidos enquanto o cálculo está pendente', async () => {
    const interfaceCalculadora = await criarInterface();
    await prepararSoma(interfaceCalculadora);

    interfaceCalculadora.clicarIgual();
    assert.equal(interfaceCalculadora.chamadasFetch.length, 1);
    assert.ok(interfaceCalculadora.numeros.every(botao => botao.disabled));
    assert.ok(interfaceCalculadora.operacoes.every(botao => botao.disabled));
    assert.ok(interfaceCalculadora.funcoes.every(botao => botao.disabled));

    await interfaceCalculadora.digitar('3');
    await interfaceCalculadora.limpar();
    interfaceCalculadora.clicarIgual();
    assert.equal(interfaceCalculadora.chamadasFetch.length, 1);

    interfaceCalculadora.responder(0, { resultado: 10, avisos: {} });
    await aguardarResposta();

    assert.equal(interfaceCalculadora.elementos.display.textContent, '10');
    assert.ok(interfaceCalculadora.numeros.every(botao => !botao.disabled));
    assert.ok(interfaceCalculadora.funcoes.every(botao => !botao.disabled));
});

test('preserva avisos simultâneos e não deixa temporizadores ocultarem avisos recentes', async () => {
    const interfaceCalculadora = await criarInterface();
    await prepararSoma(interfaceCalculadora);
    interfaceCalculadora.clicarIgual();
    interfaceCalculadora.responder(0, {
        resultado: 10,
        avisos: { mysql: 'falha mysql', historico: 'falha json' }
    });
    await aguardarResposta();

    const mensagem = interfaceCalculadora.elementos['mensagem-aviso'];
    assert.match(mensagem.textContent, /impossível salvar no banco de dados/);
    assert.match(mensagem.textContent, /não salvo no histórico/);
    assert.equal(interfaceCalculadora.temporizadores.length, 1);

    await interfaceCalculadora.limpar();
    await prepararSoma(interfaceCalculadora);
    interfaceCalculadora.clicarIgual();
    interfaceCalculadora.responder(1, {
        resultado: 10,
        avisos: { mysql: 'falha mysql' }
    });
    await aguardarResposta();

    assert.equal(interfaceCalculadora.temporizadores.length, 2);
    assert.equal(interfaceCalculadora.temporizadores[0].cancelado, true);
    assert.equal(interfaceCalculadora.temporizadores[1].cancelado, false);
    assert.match(mensagem.textContent, /impossível salvar no banco de dados/);
});
