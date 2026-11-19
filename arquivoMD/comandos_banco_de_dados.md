Claro! Vou transformar a lista em uma espécie de **cola de SQL para o projeto da calculadora**, com uma explicação curta e um exemplo prático ao lado.

Os exemplos consideram nosso banco `calculadora`, com as tabelas `usuarios` e `calculos`.

# **Guia de comandos SQL — Projeto Calculadora**

## **1. Criação e estrutura do banco**

| Comando           | Para que serve   | Exemplo na calculadora                           |
| ----------------- | ---------------- | ------------------------------------------------ |
| `CREATE DATABASE` | Cria banco       | `CREATE DATABASE calculadora;`                   |
| `USE`             | Seleciona banco  | `USE calculadora;`                               |
| `CREATE TABLE`    | Cria tabela      | `CREATE TABLE usuarios (id INT PRIMARY KEY);`    |
| `ALTER TABLE`     | Modifica tabela  | `ALTER TABLE usuarios ADD telefone VARCHAR(20);` |
| `DROP TABLE`      | Exclui tabela    | `DROP TABLE calculos;`                           |
| `DROP DATABASE`   | Exclui banco     | `DROP DATABASE calculadora;`                     |
| `DESCRIBE`        | Mostra estrutura | `DESCRIBE usuarios;`                             |
| `SHOW TABLES`     | Lista tabelas    | `SHOW TABLES;`                                   |



Cuidado

`DROP TABLE` e `DROP DATABASE` podem apagar estruturas e dados. Não execute esses exemplos no seu banco atual.



## **2. Manipulação de dados**

Esses são alguns dos comandos que você mais utilizará no backend.

| Comando       | Para que serve    | Exemplo na calculadora                                                  |
| ------------- | ----------------- | ----------------------------------------------------------------------- |
| `INSERT INTO` | Insere registro   | `INSERT INTO usuarios (nome, email) VALUES ('João', 'joao@gmail.com');` |
| `SELECT`      | Consulta dados    | `SELECT * FROM usuarios;`                                               |
| `UPDATE`      | Atualiza registro | `UPDATE usuarios SET nome = 'João Silva' WHERE id = 1;`                 |
| `DELETE`      | Exclui registro   | `DELETE FROM calculos WHERE id = 5;`                                    |

## **3. Filtros e organização**

| Comando    | Para que serve                | Exemplo na calculadora                               |
| ---------- | ----------------------------- | ---------------------------------------------------- |
| `WHERE`    | Filtra registros              | `SELECT * FROM calculos WHERE usuario_id = 1;`       |
| `AND`      | Duas condições                | `WHERE usuario_id = 1 AND operacao = 'soma';`        |
| `OR`       | Uma condição ou outra         | `WHERE operacao = 'soma' OR operacao = 'subtracao';` |
| `NOT`      | Inverte condição              | `WHERE NOT operacao = 'soma';`                       |
| `LIKE`     | Pesquisa padrão               | `WHERE nome LIKE 'Ma%';`                             |
| `IN`       | Procura valores de uma lista  | `WHERE operacao IN ('soma', 'divisao');`             |
| `BETWEEN`  | Filtra intervalo              | `WHERE resultado BETWEEN 10 AND 100;`                |
| `ORDER BY` | Ordena resultados             | `ORDER BY id DESC;`                                  |
| `LIMIT`    | Limita resultados             | `SELECT * FROM calculos LIMIT 10;`                   |
| `DISTINCT` | Remove repetidos do resultado | `SELECT DISTINCT operacao FROM calculos;`            |

## **4. Relacionamento entre tabelas**

Muito importante para nosso projeto

| Recurso       | Para que serve            | Exemplo na calculadora                                                       |
| ------------- | ------------------------- | ---------------------------------------------------------------------------- |
| `PRIMARY KEY` | Identifica registro único | `id INT PRIMARY KEY`                                                         |
| `FOREIGN KEY` | Relaciona tabelas         | `FOREIGN KEY (usuario_id) REFERENCES usuarios(id)`                           |
| `REFERENCES`  | Indica referência         | `REFERENCES usuarios(id)`                                                    |
| `JOIN`        | Combina tabelas           | `SELECT * FROM usuarios JOIN calculos ON usuarios.id = calculos.usuario_id;` |
| `INNER JOIN`  | Retorna correspondências  | Busca usuários que possuem cálculos.                                         |
| `LEFT JOIN`   | Mantém todos da esquerda  | Mostra usuários mesmo sem cálculos.                                          |

### **Exemplo importante de JOIN**

Imagine que queremos descobrir o nome do usuário que realizou cada cálculo:

```
SELECT
    usuarios.nome,
    calculos.operacao,
    calculos.resultado
FROM usuarios
INNER JOIN calculos
ON usuarios.id = calculos.usuario_id;
```

Resultado imaginário:

| Nome  | Operação      | Resultado |
| ----- | ------------- | --------- |
| João  | soma          | 15        |
| Maria | divisão       | 5         |
| João  | multiplicação | 30        |

## **5. Funções de consulta**

| Função     | Para que serve   | Exemplo na calculadora                                           |
| ---------- | ---------------- | ---------------------------------------------------------------- |
| `COUNT()`  | Conta registros  | `SELECT COUNT(*) FROM calculos;`                                 |
| `SUM()`    | Soma valores     | `SELECT SUM(resultado) FROM calculos;`                           |
| `AVG()`    | Calcula média    | `SELECT AVG(resultado) FROM calculos;`                           |
| `MAX()`    | Maior resultado  | `SELECT MAX(resultado) FROM calculos;`                           |
| `MIN()`    | Menor resultado  | `SELECT MIN(resultado) FROM calculos;`                           |
| `GROUP BY` | Agrupa registros | `SELECT usuario_id, COUNT(*) FROM calculos GROUP BY usuario_id;` |
| `HAVING`   | Filtra grupos    | `HAVING COUNT(*) > 5;`                                           |

## **6. Tipos de dados e restrições**

Esses não são comandos isolados, mas recursos usados na criação das tabelas.

| Recurso          | Para que serve          | Exemplo na calculadora        |
| ---------------- | ----------------------- | ----------------------------- |
| `INT`            | Número inteiro          | `id INT`                      |
| `VARCHAR(n)`     | Texto                   | `nome VARCHAR(100)`           |
| `DECIMAL(p,s)`   | Número decimal preciso  | `resultado DECIMAL(10,2)`     |
| `DATE`           | Data                    | `data DATE`                   |
| `DATETIME`       | Data e horário          | `criado_em DATETIME`          |
| `AUTO_INCREMENT` | ID automático           | `id INT AUTO_INCREMENT`       |
| `NOT NULL`       | Não permite nulo        | `email VARCHAR(150) NOT NULL` |
| `UNIQUE`         | Não permite duplicidade | `email VARCHAR(150) UNIQUE`   |
| `DEFAULT`        | Valor padrão            | `ativo BOOLEAN DEFAULT TRUE`  |
| `CHECK`          | Impõe condição          | `CHECK (resultado >= 0)`      |

## **7. Exemplo completo: consultando o histórico de um usuário**

Este exemplo reúne vários conceitos que você aprendeu:

```
SELECT
    operacao,
    valor1,
    valor2,
    resultado
FROM calculos
WHERE usuario_id = 1
ORDER BY id DESC
LIMIT 10;
```

O que acontece?

1. `SELECT`: escolhe os dados.
2. `FROM`: consulta a tabela de cálculos.
3. `WHERE`: seleciona somente os cálculos do usuário 1.
4. `ORDER BY`: coloca os mais recentes primeiro (considerando IDs crescentes).
5. `LIMIT`: mostra somente 10 registros.

## **Minha sugestão de prioridade**

Não precisa dominar tudo agora. Para desenvolver sua calculadora, eu priorizaria:

**Primeiro dominar**

CREATE TABLE

INSERT INTO

SELECT

WHERE

UPDATE e DELETE

PRIMARY KEY e FOREIGN KEY

**Depois aprender na prática**

INNER JOIN e LEFT JOIN

GROUP BY e COUNT

ORDER BY e LIMIT

ALTER TABLE

Índices e transações

