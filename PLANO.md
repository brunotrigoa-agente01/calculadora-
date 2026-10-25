# Plano de aprendizagem: calculadora com Node.js

## Objetivo do projeto

Evoluir a calculadora existente para uma aplicação com front-end no navegador e back-end em Node.js. Preservar a interface atual e construir a comunicação entre as partes gradualmente, de modo que o estudante compreenda o fluxo e possa aplicar os conceitos em outros projetos.

## Requisitos aprovados

- Manter HTML, CSS e JavaScript que dependem do DOM no navegador.
- Criar os arquivos do back-end separadamente; não executar `calculadora.js` no Node.js.
- Começar pelo módulo nativo `node:http`, sem adicionar frameworks antes de haver necessidade.
- Construir e testar cada etapa antes de avançar.
- Criar uma API que receba operandos e uma operação, valide os dados e retorne o resultado em JSON.
- Integrar a interface com a API usando `fetch()`, tratando carregamento e erros sem quebrar a calculadora.
- Aprender organização em módulos e testes básicos de back-end.
- Explorar persistência do histórico em arquivo assíncrono e avaliar banco de dados somente quando apropriado.
- Introduzir ferramentas externas, segurança e hospedagem de forma gradual e justificada.

## Fluxo/decisões aprovadas

1. Preservar a interface atual e separar front-end de back-end.
2. Criar e testar um servidor HTTP mínimo com `node:http`.
3. Aprender requisições e respostas HTTP antes de criar a rota de cálculo.
4. Implementar e testar a lógica e a validação da API antes de conectar o navegador.
5. Integrar o front-end progressivamente e tratar explicitamente falhas de requisição.
6. Organizar e testar o código antes de avançar para persistência.
7. Começar sem frameworks. Avaliar Express, banco de dados e outras ferramentas apenas diante de uma necessidade concreta.
8. Não implementar etapas futuras sem concluir e testar a etapa atual.

## Etapa atual

Etapa 5 — Organização e testes. Status: **Pendente**.

## Etapas

### 1. Primeiro servidor HTTP

- **Objetivo:** entender como o Node.js cria um servidor usando o módulo nativo `node:http`.
- **Resultado verificável:** criar `server.js`, iniciar o servidor na porta 3000 e responder com uma mensagem de texto simples.
- **Teste:** executar `node server.js`, abrir `http://localhost:3000` e conferir a mensagem; encerrar com `Ctrl+C`.
- **Status:** Concluída; o usuário confirmou que iniciou o servidor e testou a resposta em `http://localhost:3000`.

### 2. Requisições e respostas HTTP

- **Objetivo:** compreender o fluxo entre cliente e servidor, incluindo métodos, rotas, status e cabeçalhos.
- **Resultado verificável:** distinguir requisições por caminho e responder de forma apropriada, incluindo uma resposta JSON.
- **Teste:** fazer requisições aos caminhos definidos e conferir conteúdo, cabeçalhos e status.
- **Status:** Concluída; testes confirmados pelo usuário: `GET /api` retornou 200 com JSON, `POST /api` retornou 405, `/` retornou 200 com texto e um caminho inexistente retornou 404 com JSON.

### 3. API de cálculo

- **Objetivo:** receber operação e operandos, validar os dados e calcular no back-end.
- **Resultado verificável:** rota de cálculo que retorna o resultado em JSON e trata entradas inválidas e divisão por zero.
- **Contrato implementado:** `POST /calcular` recebe JSON com `valor1`, `valor2` e `operacao`; aceita `somar`, `subtrair`, `multiplicar` e `dividir`.
- **Validação implementada:** corpo JSON, objeto, operandos numéricos finitos, operação permitida, divisão por zero e resultado não finito; erros são respondidos em JSON.
- **Testes realizados:** 17 de 17 cenários passaram, incluindo as quatro operações, entradas ausentes/inválidas, JSON vazio ou malformado, divisão por zero, método não permitido, rota inexistente e confirmação de que o servidor continua respondendo depois de erros.
- **Status:** Concluída.

### 4. Integração do front-end

- **Objetivo:** conectar a calculadora ao back-end usando `fetch()` e compreender Promises e `async`/`await` nesse fluxo.
- **Resultado verificável:** enviar cálculos ao servidor, apresentar o resultado e comunicar erros.
- **Implementado:** o servidor entrega HTML, CSS e JavaScript; o botão `=` envia operandos e operação para `POST /calcular` usando `fetch()` e mostra no visor o resultado recebido ou uma mensagem de erro.
- **Testes confirmados:** o usuário confirmou o cálculo pela interface, o erro de divisão por zero com status HTTP `400` e o teste de falha de conexão com o servidor indisponível.
- **Observações:** ainda não há indicador visual de carregamento. Em contas encadeadas, uma operação intermediária pode ser executada no navegador; esse comportamento poderá ser revisado durante a etapa de organização e testes.
- **Status:** Concluída.

### 5. Organização e testes

- **Objetivo:** separar responsabilidades e verificar a lógica e a API com testes básicos.
- **Resultado verificável:** lógica de cálculo independente do DOM, módulos com responsabilidades claras e testes para os casos principais.
- **Teste:** executar os testes e confirmar operações normais, entradas inválidas e divisão por zero.
- **Status:** Pendente.

### 6. Persistência do histórico

- **Objetivo:** salvar e recuperar cálculos, praticando operações assíncronas de arquivo e tratamento de erros.
- **Resultado verificável:** histórico persistido em arquivo, se essa solução continuar adequada.
- **Teste:** registrar cálculos, reiniciar o servidor e confirmar que o histórico permanece disponível.
- **Status:** Pendente.

### 7. Evolução e publicação

- **Objetivo:** avaliar ferramentas, segurança básica e hospedagem com base nas necessidades da aplicação.
- **Resultado verificável:** decisões justificadas sobre Express, variáveis de ambiente, banco de dados e hospedagem, implementando apenas o que fizer sentido.
- **Teste:** definido quando as necessidades e o ambiente de publicação forem conhecidos.
- **Status:** Pendente.

## Dúvidas e decisões pendentes

- Definir, na etapa de persistência, se um arquivo continua suficiente ou se há uma necessidade concreta de banco de dados.
- Definir, na etapa de evolução, se alguma biblioteca, configuração adicional ou hospedagem é necessária.

## Histórico de mudanças

- **2026-10-15** — Roteiro inicial aprovado: evolução gradual da calculadora existente para uma aplicação com Node.js, começando por `node:http` e mantendo o front-end no navegador. Nenhuma implementação foi iniciada.
- **2026-10-15** — Etapa 1 concluída após o usuário confirmar que testou o servidor HTTP em `http://localhost:3000`; etapa 2 definida como atual.
- **2026-10-16** — Etapa 2 concluída após confirmação dos testes das rotas, métodos HTTP, respostas JSON e status 200, 404 e 405; etapa 3 definida como atual.
- **2026-10-23** — Etapa 3 marcada como concluída após aprovação de 17 cenários de teste da API. Etapa 4 definida como atual/em andamento: cálculos pela interface e erro de divisão por zero (HTTP 400) confirmados pelo usuário; teste de falha de conexão e indicador visual de carregamento ainda pendentes.
- **2026-10-23** — Etapa 4 marcada como concluída após o usuário confirmar o teste de falha de conexão, além dos cálculos pela interface e do erro de divisão por zero (HTTP 400). Etapa 5 definida como próxima; indicador de carregamento e comportamento de contas encadeadas ficam registrados como pontos a avaliar.

## Conceitos

### Praticados ou presentes no código atual

- JavaScript no navegador: DOM, eventos, funções, estado e lógica de operações.
- Node.js: servidor HTTP básico com `node:http`, `createServer()`, `response.end()` e `listen()` (etapa 1 testada pelo usuário).
- HTTP: diferença entre caminho (`req.url`) e método (`req.method`), cabeçalho `Content-Type`, serialização JSON e status HTTP 200, 404 e 405 (etapa 2 testada pelo usuário).
- O plano mencionava o arquivo `node.js.js` como exemplo de uso de `node:fs`, mas ele não está na pasta `calculadora01`; revisar essa referência se o arquivo voltar a fazer parte do projeto.
- A presença desses conceitos no código não significa que todos estejam consolidados; serão retomados quando necessários.

### A praticar ou revisar durante o projeto

- Diferenças entre APIs do navegador e APIs do Node.js.
- Módulos nativos e CommonJS (`require` e exportações).
- Servidor HTTP, requisições, respostas, rotas, portas, cabeçalhos e status.
- JSON na comunicação cliente-servidor.
- Promises, `async`/`await` e operações assíncronas de arquivo.
- `fetch()`, estados de carregamento e tratamento de falhas HTTP.
- Separação de responsabilidades e testes de back-end.
