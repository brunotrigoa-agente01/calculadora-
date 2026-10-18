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
            const dados = JSON.parse(corpo);

            const objetoValido = //true 
                dados != null && 
                typeof dados === 'object' &&
                !Array.isArray(dados);

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
                res.setHeader('Content-Type', 'application/json; charset=utf-8');
                res.end('digite dados validos e dois numeros')
                return;
            }
            
            let resultado;

            if(dados.operacao === 'somar') {
                resultado = dados.valor1 + dados.valor2 

            }else if(dados.operacao === 'subtrair') {
                resultado = dados.valor1 - dados.valor2 
            
            }else if(dados.operacao === 'multiplicar') {
                resultado = dados.valor1 * dados.valor2 
            
            }else if(dados.operacao === 'dividir') {
                resultado = dados.valor1 / dados.valor2 
            }

            res.statusCode = 200
            console.log(`${dados.valor1} ${dados.operacao} ${dados.valor2} = ${resultado}`)
            res.end(String(resultado) )
        })

    }else {res.statusCode = 404;
        res.setHeader('Content-Type', 'application/json; charset=utf-8');
        res.end(JSON.stringify({ erro: 'Caminho não encontrado' }));
    }

    
}) 
    



servidor.listen(3000, () => {
    console.log("servidor rodando na porta 3000");
})