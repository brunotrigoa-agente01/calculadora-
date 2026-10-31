const fs = require('node:fs');
const path = require('node:path');
const http = require('node:http');
const { calcular} = require('./calcular.js');

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

};


const servidor = http.createServer((req, res) => {
   const arquivoPublico = arquivosPublicos[req.url];

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

    }else if (req.method === 'GET' && req.url === '/api') {
        res.statusCode = 200;
        res.setHeader('content-Type', 'application/json; charset=utf-8')
        const resposta = {mensagem: 'API da calculadora funcionando'};
        res.end(JSON.stringify(resposta))

    }else if (req.url === '/api') {
        res.statusCode = 405;
        res.setHeader('content-Type', 'application/json; charset=utf-8')
        const resposta = {erro: 'Método não reconhecido'};
        res.end(JSON.stringify(resposta))

    }else if(req.method === 'POST' && req.url === '/calcular') {
        let corpo = '';
        req.on('data', (pedaco) =>{
            corpo = corpo + pedaco
        })
 
        req.on('end', () => {
            let dados;
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
            res.statusCode = 200
            res.setHeader('content-Type', 'application/json; charset=utf-8')
            console.log(`${dados.valor1} ${dados.operacao} ${dados.valor2} = ${resultado}`)
            res.end(JSON.stringify({resultado:resultado}))
    });

    }else if(req.url !='/calcular') {
        res.statusCode = 404;
        res.setHeader('content-Type', 'application/json; charset=utf-8');
        res.end(JSON.stringify({ erro: 'Caminho não encontrado' }));


    }else {res.statusCode = 405;
        res.setHeader('content-Type', 'application/json; charset=utf-8');
        res.end(JSON.stringify({ erro: 'Método não reconhecido'}));
    }

}) 
    



servidor.listen(3000, () => {
    console.log("servidor rodando na porta 3000");
})