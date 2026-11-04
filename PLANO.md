# Plano de aprendizagem: calculadora com Node.js

## Objetivo do projeto

Evoluir a calculadora existente para uma aplicação com front-end no navegador e back-end em Node.js. Preservar a interface atual e construir a comunicação entre as partes gradualmente, compreendendo arquitetura, implementação, testes e segurança para poder aplicar os conceitos em outros projetos.

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
- Estudar AppSec junto das funcionalidades que a justificam, usando o [Guia prático de segurança Web](./GUIA_SEGURANCA_APPSEC.md) como referência técnica, sem duplicar seu conteúdo neste plano.

## Fluxo/decisões aprovadas

1. Preservar a interface atual e separar front-end de back-end.
2. Criar e testar um servidor HTTP mínimo com `node:http`.
3. Aprender requisições e respostas HTTP antes de criar a rota de cálculo.
4. Implementar e testar a lógica e a validação da API antes de conectar o navegador.
5. Integrar o front-end progressivamente e tratar explicitamente falhas de requisição.
6. Organizar e testar o código antes de avançar para persistência.
7. Começar sem frameworks. Avaliar Express, banco de dados e outras ferramentas apenas diante de uma necessidade concreta.
8. Não implementar etapas futuras sem concluir e testar a etapa atual.

## Como acompanhar as duas trilhas

O plano acompanha duas trilhas relacionadas, mas não exige implementar funcionalidades futuras na calculadora apenas para estudar segurança:

- **Trilha A — Desenvolvimento Web:** etapas 1 a 7 abaixo. A etapa atual é a 5.
- **Trilha B — AppSec:** projetos vinculados às funcionalidades. O Projeto 1 avalia e protege a calculadora/API atual; os demais começam quando o projeto tiver formulários, persistência de banco de dados ou contas de usuário que os justifiquem.

O [Guia prático de segurança Web](./GUIA_SEGURANCA_APPSEC.md) contém explicações, exemplos de código vulnerável e mitigado e laboratórios. Este plano registra dependências, estado real, critérios e próximas tarefas.

## Critérios de conclusão e vocabulário de status

Uma etapa não fica concluída apenas porque o código foi escrito. Para concluir uma etapa:

- A funcionalidade e os critérios verificáveis da etapa estão implementados.
- O estudante consegue explicar o fluxo principal e as decisões relevantes.
- Os testes funcionais pertinentes foram executados; os fluxos de erro principais foram verificados.
- Os riscos de segurança aplicáveis foram avaliados e as proteções implementadas foram verificadas por testes quando possível.
- A documentação descreve o estado observado, sem declarar como testado o que foi apenas inspecionado.

Use os estados com este significado:

- **Não iniciado:** trabalho ainda não começou.
- **Em andamento:** há trabalho ou validação pendente.
- **Implementado, mas ainda não testado:** código presente, sem evidência suficiente de execução.
- **Testado e validado:** testes ou verificações definidos foram executados com sucesso; pode haver outros critérios de aprendizagem/documentação pendentes.
- **Concluído:** critérios de implementação, compreensão, teste, segurança pertinente e documentação foram satisfeitos.

As etapas 1 a 4 foram registradas anteriormente como concluídas com base em testes confirmados. Como não há registro suficiente de que o estudante já explicou os conceitos de cada uma, seus estados atuais abaixo são **Testado e validado** até essa compreensão ser demonstrada; o histórico original foi mantido. Essa pendência é de aprendizagem e não reabre a implementação dessas etapas.

## Etapa atual

Trilha A: Etapa 5 — Organização e testes. Status: **Em andamento**.

Trilha B: Projeto 1 — Segurança da calculadora e da API. Status: **Em andamento**.

## Etapas

### 1. Primeiro servidor HTTP

- **Objetivo:** entender como o Node.js cria um servidor usando o módulo nativo `node:http`.
- **Resultado verificável:** criar `server.js`, iniciar o servidor na porta 3000 e responder com uma mensagem de texto simples.
- **Teste:** executar `node server.js`, abrir `http://localhost:3000` e conferir a mensagem; encerrar com `Ctrl+C`.
- **Status:** Testado e validado; o usuário confirmou que iniciou o servidor e testou a resposta em `http://localhost:3000`. Falta registrar a explicação do fluxo para satisfazer o critério pedagógico de conclusão.

### 2. Requisições e respostas HTTP

- **Objetivo:** compreender o fluxo entre cliente e servidor, incluindo métodos, rotas, status e cabeçalhos.
- **Resultado verificável:** distinguir requisições por caminho e responder de forma apropriada, incluindo uma resposta JSON.
- **Teste:** fazer requisições aos caminhos definidos e conferir conteúdo, cabeçalhos e status.
- **Status:** Testado e validado; testes confirmados pelo usuário: `GET /api` retornou 200 com JSON, `POST /api` retornou 405, `/` retornou 200 com texto e um caminho inexistente retornou 404 com JSON. Falta registrar a explicação do fluxo para satisfazer o critério pedagógico de conclusão.

### 3. API de cálculo

- **Objetivo:** receber operação e operandos, validar os dados e calcular no back-end.
- **Resultado verificável:** rota de cálculo que retorna o resultado em JSON e trata entradas inválidas e divisão por zero.
- **Contrato implementado:** `POST /calcular` recebe JSON com `valor1`, `valor2` e `operacao`; aceita `somar`, `subtrair`, `multiplicar` e `dividir`.
- **Validação implementada:** corpo JSON, objeto, operandos numéricos finitos, operação permitida, divisão por zero e resultado não finito; erros são respondidos em JSON.
- **Testes realizados:** 17 de 17 cenários passaram, incluindo as quatro operações, entradas ausentes/inválidas, JSON vazio ou malformado, divisão por zero, método não permitido, rota inexistente e confirmação de que o servidor continua respondendo depois de erros.
- **Status:** Testado e validado conforme o registro anterior de 17 cenários aprovados; não executei novamente esses 17 cenários nesta revisão. Falta registrar a explicação do fluxo para satisfazer o critério pedagógico de conclusão.

### 4. Integração do front-end

- **Objetivo:** conectar a calculadora ao back-end usando `fetch()` e compreender Promises e `async`/`await` nesse fluxo.
- **Resultado verificável:** enviar cálculos ao servidor, apresentar o resultado e comunicar erros.
- **Implementado:** o servidor entrega HTML, CSS e JavaScript; o botão `=` envia operandos e operação para `POST /calcular` usando `fetch()` e mostra no visor o resultado recebido ou uma mensagem de erro. Ao encadear operações, a operação pendente também é enviada à API.
- **Testes confirmados:** o usuário confirmou o cálculo pela interface, o erro de divisão por zero com status HTTP `400` e o teste de falha de conexão com o servidor indisponível.
- **Observações:** ainda não há indicador visual de carregamento. Em contas encadeadas, a interface também envia ao servidor a operação pendente antes de guardar a próxima; a regra adotada é sequencial, sem precedência matemática.
- **Status:** Testado e validado pelos testes manuais registrados de cálculo, divisão por zero e falha de conexão. Falta registrar a explicação do fluxo para satisfazer o critério pedagógico de conclusão.

### 5. Organização e testes

- **Objetivo:** separar responsabilidades e verificar a lógica e a API com testes básicos.
- **Resultado verificável:** lógica de cálculo independente do DOM, módulos com responsabilidades claras e testes para os casos principais.
- **Já implementado:** a lógica aritmética está isolada em `calcular.js`, sem dependência do DOM ou do HTTP; `server.js` valida a requisição e traduz erros em respostas HTTP; `calculadora.js` chama a API. O código atual também usa a operação pendente ao encadear uma nova operação.
- **Comportamento definido:** as operações são executadas sequencialmente. Assim, `8 + 2 × 3` deve resultar em `30`, pois `8 + 2` é resolvido ao selecionar a multiplicação.
- **Testado manualmente:** na interface, `8 + 2 × 3 =` exibiu o subtotal `10` ao selecionar `×` e o resultado final `30` após `=`.
- **Testes automatizados:** `testes/calcular_logica.js` cobre a lógica aritmética e `testes/calcular_api.js` cobre operações, validações, erros e rotas HTTP. Em 2026-11-04, executei os testes em separado, com o servidor iniciado para a API: **7 testes de lógica e 14 testes de API passaram**.
- **Pendente — prioridade alta:** corrigir e testar a recuperação de `escolherOperacao()`. No `catch` atual, a interface limpa o estado pendente e mostra `Error`, mas a função continua depois do bloco e volta a gravar `Error` como operando e a nova operação. Uma falha da API durante o encadeamento pode, assim, deixar estado incoerente. Retornar ou reorganizar o fluxo após a falha e testar a recuperação com `AC` e um cálculo novo.
- **Análise do módulo de encadeamento:** o arquivo `encadeamento.mjs` implementa uma regra separada para `escolherOperacao(estado, novaOperacao, solicitarCalculo)`: quando existe operação anterior pendente, ele resolve a conta anterior antes de registrar a nova operação, atualiza `valorAtual` e mantém `valorAnterior` e `operacaoAtual` no estado; se o estado estiver em erro ou sem operação anterior, ele não dispara cálculo. Esse comportamento corresponde à regra atual da interface: contas encadeadas são resolvidas em sequência e o visor passa a usar a operação nova após o cálculo pendente.
- **Pendente — consolidação do encadeamento:** `calculadora.js` e `encadeamento.mjs` têm implementações separadas de `escolherOperacao()`. A página carrega `calculadora.js` como script clássico, e o servidor não publica `encadeamento.mjs`; portanto, a implementação em `.mjs` não está integrada nem é a usada pela interface. Escolher uma única implementação que possa ser compartilhada pelo navegador e pelos testes; se usar módulo ES, servir o arquivo pelo servidor e carregar/importar o módulo corretamente na página.
- **Pendente — cobertura:** criar testes unitários para a lógica compartilhada de encadeamento, incluindo soma encadeada, erro durante a operação pendente e recuperação. Os testes atuais em `testes/encadeamento.mjs` cobrem os cenários de operação pendente e ausência de operação inicial, mas ainda não exercitam falhas de rede, recuperação do estado do visor e a integração com a interface em navegador. Acrescentar testes de integração com a API real se forem úteis, além de verificar fluxos de erro e recuperação da interface; considerar testes E2E com navegador após consolidar os fundamentos.
- **Teste:** executar os testes automatizados e confirmar operações normais, entradas inválidas, divisão por zero e o resultado sequencial de contas encadeadas.
- **Status:** Em andamento. A lógica de cálculo e os testes automatizados da lógica/API estão implementados e **testados e validados** na execução de 2026-11-04; o encadeamento foi **testado manualmente**. A lógica de encadeamento compartilhada, a recuperação após falha e os testes automatizados correspondentes ainda não estão concluídos.

### 6. Persistência do histórico

- **Objetivo:** salvar e recuperar cálculos, praticando operações assíncronas de arquivo e tratamento de erros.
- **Resultado verificável:** histórico persistido em arquivo, se essa solução continuar adequada.
- **Teste:** registrar cálculos, reiniciar o servidor e confirmar que o histórico permanece disponível.
- **Status:** Não iniciado.

### 7. Evolução e publicação

- **Objetivo:** avaliar ferramentas, segurança básica e hospedagem com base nas necessidades da aplicação.
- **Resultado verificável:** decisões justificadas sobre Express, variáveis de ambiente, banco de dados e hospedagem, implementando apenas o que fizer sentido.
- **Teste:** definido quando as necessidades e o ambiente de publicação forem conhecidos.
- **Status:** Não iniciado.

## Trilha B — Cibersegurança Web (AppSec)

Esta trilha complementa a Trilha A conforme as funcionalidades forem implementadas. Usar o [Guia prático de segurança Web](./GUIA_SEGURANCA_APPSEC.md) para os exemplos e laboratórios. Os estados abaixo descrevem somente o que foi confirmado no código ou executado; não indicam que uma aplicação futura já foi criada.

### Projeto 1 — Segurança da calculadora e da API

- **Objetivo:** verificar validação de entradas, evitar injeção de código e fortalecer o processamento das requisições HTTP.
- **Verificado no código:** não há uso de `eval()` para calcular expressões; `server.js` exige operandos `Number.isFinite`, limita operações a uma lista permitida e responde a JSON malformado; `calculadora.js` usa `textContent` para exibir conteúdo no visor.
- **Testado:** os 14 testes atuais em `testes/calcular_api.js` cobrem as quatro operações, divisão por zero, operação/operandos/dados inválidos, JSON malformado, resultado não finito, respostas de `/api` e caminho inexistente. A execução de 2026-11-04 passou em 14/14.
- **Pendente — prioridade alta antes de expor a API fora do ambiente local:** definir e aplicar limite ao corpo HTTP; responder `413 Payload Too Large`; não acumular/processar o restante após ultrapassar o limite; adicionar testes para corpo excessivo e comprovar resposta de erro. Criar uma verificação explícita de que o servidor responde corretamente a uma requisição válida após requisições inválidas.
- **Pendente:** os testes da API dependem de um servidor previamente iniciado em `localhost:3000`; integrar ou documentar de forma robusta esse requisito para a execução de testes, sem mascarar falha de conexão como sucesso.
- **Status:** Em andamento. Controles de validação básicos estão implementados e os testes atuais de API passaram; limite de corpo, cobertura correspondente e demais itens de robustez permanecem pendentes. Não registrar os controles inspecionados como testes automatizados.

### Projeto 2 — Segurança de formulários e XSS

- **Objetivo:** validar entradas no servidor, entender entradas não confiáveis e contextos de saída, usar o DOM com segurança e introduzir proteção CSRF quando existirem operações com sessão/cookies que a justifiquem.
- **Dependência:** desenvolver formulários ou outra funcionalidade que aceite e apresente conteúdo de usuário.
- **Status:** Não iniciado; material de referência disponível no guia.

### Projeto 3 — Banco de dados e SQL Injection

- **Objetivo:** praticar consultas SQL seguras, consultas parametrizadas, validação e controle de acesso a dados.
- **Dependência:** escolher e implementar persistência em banco de dados por necessidade concreta. A etapa 6 atual trata primeiro de avaliar persistência em arquivo; banco de dados não é requisito para concluir a calculadora.
- **Status:** Não iniciado; material de referência disponível no guia.

### Projeto 4 — Autenticação, sessões e autorização

- **Objetivo:** compreender cadastro, armazenamento seguro e hash de senhas, autenticação, sessões/cookies, JWT e autorização de operações protegidas.
- **Dependência:** uma funcionalidade que justifique contas de usuário e dados/ações privados. Não adicionar autenticação à calculadora apenas para cumprir o plano.
- **Status:** Não iniciado; material de referência disponível no guia.

## Dúvidas e decisões pendentes

- Definir, na etapa de persistência, se um arquivo continua suficiente ou se há uma necessidade concreta de banco de dados.
- Definir, na etapa de evolução, se alguma biblioteca, configuração adicional ou hospedagem é necessária.
- Na etapa 5, decidir a forma de compartilhar a lógica de encadeamento entre navegador e testes (módulo ES ou outra separação compatível com a arquitetura atual).
- Antes de disponibilizar a API fora do ambiente local, implementar e testar o limite do corpo da requisição.

## Histórico de mudanças

- **2026-10-15** — Roteiro inicial aprovado: evolução gradual da calculadora existente para uma aplicação com Node.js, começando por `node:http` e mantendo o front-end no navegador. Nenhuma implementação foi iniciada.
- **2026-10-15** — Etapa 1 concluída após o usuário confirmar que testou o servidor HTTP em `http://localhost:3000`; etapa 2 definida como atual.
- **2026-10-16** — Etapa 2 concluída após confirmação dos testes das rotas, métodos HTTP, respostas JSON e status 200, 404 e 405; etapa 3 definida como atual.
- **2026-10-23** — Etapa 3 marcada como concluída após aprovação de 17 cenários de teste da API. Etapa 4 definida como atual/em andamento: cálculos pela interface e erro de divisão por zero (HTTP 400) confirmados pelo usuário; teste de falha de conexão e indicador visual de carregamento ainda pendentes.
- **2026-10-23** — Etapa 4 marcada como concluída após o usuário confirmar o teste de falha de conexão, além dos cálculos pela interface e do erro de divisão por zero (HTTP 400). Etapa 5 definida como próxima; indicador de carregamento e comportamento de contas encadeadas ficam registrados como pontos a avaliar.
- **2026-10-26** — Revisão do estado do projeto: etapa 5 iniciada, pois a lógica de cálculo já está separada em `calcular.js` e a interface envia operações ao servidor. O código atual resolve a operação pendente ao selecionar outra, adotando execução sequencial; ainda falta confirmar esse fluxo pela interface e criar testes automatizados para a lógica e a API.
- **2026-10-26** — Encadeamento testado manualmente pela interface: `8 + 2 × 3 =` mostrou o subtotal `10` ao selecionar `×` e o resultado final `30`. Permanecem pendentes os testes automatizados da lógica e da API.
- **2026-10-28** — Testes automatizados da lógica e da API executados: 20 de 21 passaram inicialmente. A falha identificou que `POST /api` retornava o erro em `mensagem`, enquanto o teste e o padrão das demais respostas de erro esperavam `erro`; o servidor foi ajustado e os 21 testes passaram. A etapa 5 continua em andamento até cobrir automaticamente os fluxos de erro e o encadeamento da interface.
- **2026-11-02** — Revisei o plano e executei novamente os testes da lógica e da API com o servidor ativo: 21 de 21 passaram. A etapa 5 continua em andamento porque ainda não há testes automatizados do encadeamento nem dos fluxos de erro da interface; `encadeamento.mjs` existe como implementação separada, mas não está integrado nem testado.
- **2026-11-04** — Revisão na branch `calculadora-node.js`: mantida a estrutura e o histórico; acrescentados critérios objetivos de conclusão, a Trilha B de AppSec referenciando `GUIA_SEGURANCA_APPSEC.md` e o estado confirmado da calculadora. Os testes executados nesta revisão passaram: 7 de lógica e 14 de API. Registrados como pendências o estado incoerente após erro em `escolherOperacao()`, a duplicação/não integração de `encadeamento.mjs`, os testes de recuperação e o limite HTTP 413. Nenhum arquivo da aplicação foi alterado.
- **2026-11-04** — Análise do módulo `encadeamento.mjs`: a regra de cálculo pendente e a verificação de estado inicial foram registradas no plano, assim como os testes existentes em `testes/encadeamento.mjs` e a pendência de consolidar essa lógica com o código da interface da calculadora.

## Conceitos

### Praticados ou presentes no código atual

- JavaScript no navegador: DOM, eventos, funções, estado e lógica de operações.
- Node.js: servidor HTTP básico com `node:http`, `createServer()`, `response.end()` e `listen()` (etapa 1 testada pelo usuário).
- HTTP: diferença entre caminho (`req.url`) e método (`req.method`), cabeçalho `Content-Type`, serialização JSON e status HTTP 200, 404 e 405 (etapa 2 testada pelo usuário).
- O arquivo `node.js.js` não faz parte da estrutura atual; não é uma dependência das etapas presentes.
- A presença desses conceitos no código não significa que todos estejam consolidados; serão retomados quando necessários.

### A praticar ou revisar durante o projeto

- Diferenças entre APIs do navegador e APIs do Node.js.
- Módulos nativos e CommonJS (`require` e exportações).
- Servidor HTTP, requisições, respostas, rotas, portas, cabeçalhos e status.
- JSON na comunicação cliente-servidor.
- Promises, `async`/`await` e operações assíncronas de arquivo.
- `fetch()`, estados de carregamento e tratamento de falhas HTTP.
- Separação de responsabilidades e testes de back-end.
