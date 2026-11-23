CREATE DATABASE IF NOT EXISTS calculadora
    CHARACTER SET utf8mb4
    COLLATE utf8mb4_0900_ai_ci;

USE calculadora;

CREATE TABLE IF NOT EXISTS usuarios (
    id INT NOT NULL AUTO_INCREMENT,
    nome VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL,
    PRIMARY KEY (id)
) ENGINE=InnoDB
  DEFAULT CHARSET=utf8mb4
  COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE IF NOT EXISTS calculos (
    id INT NOT NULL AUTO_INCREMENT,
    usuario_id INT NOT NULL,
    valor1 DECIMAL(10,2) NOT NULL,
    valor2 DECIMAL(10,2) NOT NULL,
    operacao VARCHAR(20) NOT NULL,
    resultado DECIMAL(10,2) NOT NULL,
    PRIMARY KEY (id),
    KEY usuario_id (usuario_id),
    CONSTRAINT calculos_ibfk_1
        FOREIGN KEY (usuario_id)
        REFERENCES usuarios (id)
) ENGINE=InnoDB
  DEFAULT CHARSET=utf8mb4
  COLLATE=utf8mb4_0900_ai_ci;

INSERT INTO usuarios (id, nome, email)
VALUES (1, 'Usuário local', 'usuario-local@example.invalid')
ON DUPLICATE KEY UPDATE id = id;
