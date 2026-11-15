const {criaServidor} = require('./server.js')
const { salvarHistorico } = require('./historico.js');


const servidor = criaServidor(salvarHistorico)

const porta = process.env.PORT || 3000;

servidor.listen(porta, '0.0.0.0' , () => {
    console.log(`servidor rodando na porta ${porta}` );
})