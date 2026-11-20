const fs = require('node:fs');
const path = require('node:path');
const http = require('node:http');
const { calcular} = require('./calcular.js');

function criaServidor(salvarHistorico, salvarCalculo, listarCalculos, verificarUsuario) {
    
    const producao = process.env.NODE_ENV === 'production';
    let arquivosPublicos = {

    '/':{ 
        nome: 'calculadora.html',
        tipo: 'text/html; charset=utf-8'},

    '/calculadora.js':{ 
        nome: 'calculadora.js',
        tipo: 'text/javascript; charset=utf-8'},

    '/calculadora.css':{ 
        nome: 'calculadora.css',
        tipo: 'text/css; charset=utf-8'},
        
        '/encadeamento.mjs':{
        nome: 'encadeamento.mjs',
        tipo: 'text/javascript; charset=utf-8'},

    };

    const limite_corpo = 10 * 1024; // 10 KB

    const servidor = http.createServer(
        {maxHeaderSize: 16 *1024}, 
        async (req, res) => {
     const url = new URL(req.url, `http://localhost`);

    const arquivoPublico = arquivosPublicos[url.pathname];
    

        if (req.method === 'GET' && arquivoPublico) {
            const caminhoArquivo = path.join(
                __dirname,
                arquivoPublico.nome
            );

            fs.readFile(caminhoArquivo, (erro, conteudo) => {
                if (erro) {
                    res.statusCode = 500;
                    res.setHeader(
                        'content-Type',
                        'text/plain; charset=utf-8'
                    );
                    res.end('Erro ao carregar o arquivo');
                    return;
                }

                res.statusCode = 200;
                res.setHeader('content-Type', arquivoPublico.tipo);
                res.end(conteudo);
            });

            return;

        }else if (req.method === 'GET' && url.pathname === '/api') {
            res.statusCode = 200;
            res.setHeader('content-Type', 'application/json; charset=utf-8')
            const resposta = {mensagem: 'API da calculadora funcionando'};
            res.end(JSON.stringify(resposta))

        }else if (url.pathname === '/api') {
            res.statusCode = 405;
            res.setHeader('content-Type', 'application/json; charset=utf-8')
            const resposta = {erro: 'Método não reconhecido'};
            res.end(JSON.stringify(resposta))

        }else if(req.method === 'POST' && url.pathname === '/calcular') {
            let corpo = '';
            let limiteExcedido = false;
            let tamanhoRecebido = 0;
            const tamanhodeclarado = req.headers['content-length'];

                if (tamanhodeclarado !== undefined ) {
                    const tamanho = Number(tamanhodeclarado);
                    if (!Number.isFinite(tamanho)){ 
                        res.statusCode = 400
                        res.setHeader('content-Type', 'application/json; charset=utf-8')
                        res.end(JSON.stringify({erro: 'Tamanho do corpo inválido'}))
                        return;
                    }
                    if(tamanho > limite_corpo){
                        res.statusCode = 413
                    res.setHeader('content-Type', 'application/json; charset=utf-8')
                        res.end(JSON.stringify({erro: 'Limite de tamanho do corpo excedido'}))
                        return;
                    }
                }

            req.on('data', (pedaco) =>{
                if (limiteExcedido) {
                    return;
                }
                
                tamanhoRecebido = tamanhoRecebido + pedaco.length;
                
                if (tamanhoRecebido > limite_corpo) {
                    limiteExcedido = true;
                    res.statusCode = 413
                    res.setHeader('content-Type', 'application/json; charset=utf-8')
                    res.end(JSON.stringify({erro: 'Limite de tamanho do corpo excedido'}))
                    return;
                }
                
                corpo = corpo + pedaco
            })
    
            req.on('end', async() => {
                let dados;
                if (limiteExcedido) {
                    return;
                }
                try{
                    dados = JSON.parse(corpo);
                
                }catch (erro){
                    res.statusCode = 400
                    res.setHeader('content-Type', 'application/json; charset=utf-8')
                    res.end(JSON.stringify({erro: 'JSON mal formado'}))
                    return
                }
                    
                
                const objetoValido = //true 
                    dados != null && 
                    typeof dados === 'object' &&
                    !Array.isArray(dados); // array.isarray verifica se é false, ou seja, não é um array

                const valoresValidos = // true
                    objetoValido &&
                    Number.isFinite(dados.valor1)&&
                    Number.isFinite(dados.valor2);

                
                const operadoresValidos = [ //true
                    'somar',
                    'multiplicar',
                    'dividir',
                    'subtrair'
                ];

                const operacaoValida = //true
                objetoValido &&
                operadoresValidos.includes(dados.operacao);

                if(!objetoValido || !valoresValidos || !operacaoValida){ //false
                    res.statusCode = 400
                    res.setHeader('content-Type', 'application/json; charset=utf-8')
                    res.end(JSON.stringify({erro:'digite dados validos e dois numeros'}))
                    return;
                }
                let resultado;
                try {
                    resultado = calcular(dados.valor1, dados.valor2, dados.operacao);
                    

                } catch (erro) {
                    res.statusCode = 400
                    res.setHeader('content-Type', 'application/json; charset=utf-8')
                    res.end(JSON.stringify({erro: erro.message}))
                    return;

                }
                let erroHistorico = null;
                let erroCalculo = null;
                try {
                    await salvarHistorico(dados.operacao, dados.valor1, dados.valor2, resultado, new Date().toISOString());
                    
                } catch (erro) {
                    erroHistorico = erro;
                    console.error('Erro ao salvar histórico:', erroHistorico);     
                }

                try {
                    await salvarCalculo(dados.usuario_id, dados.valor1, dados.valor2, dados.operacao, resultado);
                } catch (erro) {
                    erroCalculo = erro;
                    console.error('Erro ao salvar cálculo:', erroCalculo);

                    
                }
                const avisos = {}
                if (erroHistorico ) {
                    avisos.historico = 'Erro ao salvar histórico';
                    
                }
                if (erroCalculo) {
                    avisos.mysql = 'Erro ao salvar no banco de dados';
                    
                }

                res.statusCode = 200
                res.setHeader('content-Type', 'application/json; charset=utf-8')
                console.log(`${dados.valor1} ${dados.operacao} ${dados.valor2} = ${resultado}`)
                res.end(JSON.stringify({resultado:resultado, avisos: avisos}))
        });

        

        }else if (req.method === 'GET' && url.pathname === '/api/calculos'){



            try {
                const usuario_id = url.searchParams.get('usuario_id');
                
                if (!usuario_id || !Number.isInteger(Number(usuario_id)) || Number(usuario_id) <= 0) {
                    res.statusCode = 400;
                    res.setHeader('content-Type', 'application/json; charset=utf-8');
                    res.end(JSON.stringify({ erro: 'Parâmetro usuario_id é obrigatório e deve ser um número válido' }));
                    return;
                }else if (!await verificarUsuario(usuario_id)) {
                    res.statusCode = 404;
                    res.setHeader('content-Type', 'application/json; charset=utf-8');
                    res.end(JSON.stringify({ erro: 'Usuário não encontrado' }));
                    return;
                }

                const resultado = await listarCalculos(usuario_id);
                res.statusCode = 200;
                res.setHeader('content-Type', 'application/json; charset=utf-8')
                res.end(JSON.stringify(resultado));

            }catch (erro) {
                console.error('Erro ao listar cálculos:', erro);
                res.statusCode = 500;
                res.setHeader('content-Type', 'application/json; charset=utf-8')
                res.end(JSON.stringify({erro: 'Erro ao listar cálculos'}));
            }
                
           
            


        }else if(req.url !='/calcular') {
            res.statusCode = 404;
            res.setHeader('content-Type', 'application/json; charset=utf-8');
            res.end(JSON.stringify({ erro: 'Caminho não encontrado' }));


        }else {res.statusCode = 405;
            res.setHeader('content-Type', 'application/json; charset=utf-8');
            res.end(JSON.stringify({ erro: 'Método não reconhecido'}));
        }

    }) 

    return servidor
    
}
module.exports = {criaServidor}


