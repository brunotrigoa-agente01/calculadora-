const http = require('node:http');

const servidor = http.createServer((req, res) => {
    console.log(req.url)
    if(req.url === '/'){
        res.statusCode = 200;
        res.setHeader('content-Type', 'text/plain; charset=utf-8' );
        res.end('servidor de calculadora funcionando')

    }else if (req.method === 'GET' && req.url === '/api') {
        res.statusCode = 200;
        res.setHeader('content-Type', 'application/json; charset=utf-8')
        const resposta = {mensagem: 'apida calculadora funcionado'};
        res.end(JSON.stringify(resposta))

    }else if (req.url === '/api') {
        res.statusCode = 405;
        res.setHeader('content-Type', 'application/json; charset=utf-8')
        const resposta = {mensagem: 'metodo não permitido'};
        res.end(JSON.stringify(resposta))

    }else if(req.method === 'POST' && req.url === '/calcular') {
        let corpo = '';
        req.on('data', (pedaco) =>{
            corpo = corpo + pedaco
        })

        req.on('end', () => {
            res.statusCode = 200
            const dados = JSON.parse(corpo);
            console.log(dados.valor1);
            console.log(dados.valor2);
            console.log(dados.operacao);
            res.end('dados recebidos')
        })

    }else {res.statusCode = 404;
        res.setHeader('Content-Type', 'application/json; charset=utf-8');
        res.end(JSON.stringify({ erro: 'Caminho não encontrado' }));
    }

    
}) 
    



servidor.listen(3000, () => {
    console.log("servidor rodando na porta 3000");
})