require('dotenv').config();

const mysql = require('mysql2/promise');

function obterConfiguracao() {
    const obrigatorias = ['DB_HOST', 'DB_USER', 'DB_NAME'];
    const ausentes = obrigatorias.filter((variavel) => {
        const valor = process.env[variavel];
        return typeof valor !== 'string' || valor.trim() === '';
    });

    if (process.env.DB_PASSWORD === undefined) {
        ausentes.push('DB_PASSWORD');
    }

    if (process.env.DB_PORT === undefined || process.env.DB_PORT.trim() === '') {
        ausentes.push('DB_PORT');
    }

    if (ausentes.length > 0) {
        throw new Error(
            `Configuração do MySQL incompleta. Defina no .env: ${ausentes.join(', ')}. Consulte .env.example.`
        );
    }

    const porta = Number(process.env.DB_PORT);
    if (!/^\d+$/.test(process.env.DB_PORT) || !Number.isInteger(porta) || porta < 1 || porta > 65535) {
        throw new Error('Configuração do MySQL inválida: DB_PORT deve ser um inteiro entre 1 e 65535.');
    }

    return {
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
        port: porta
    };
}

const banco = mysql.createPool({
    ...obterConfiguracao()
})

module.exports = banco;