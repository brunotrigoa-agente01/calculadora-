# Plano de aprendizagem e portfólio profissional: calculadora com Node.js

## Objetivo profissional

O objetivo de longo prazo é desenvolver conhecimentos e habilidades para disputar oportunidades como desenvolvedor web júnior. A calculadora continua sendo o projeto principal de aprendizagem; os demais projetos são uma sequência futura, não tarefas para implementação imediata.

O progresso será avaliado por evidências práticas de que o estudante consegue compreender e explicar o código, investigar e resolver problemas, desenvolver aplicações completas, criar e consumir APIs, trabalhar com bancos de dados, aplicar segurança, escrever e executar testes, usar Git e GitHub, publicar e manter aplicações e justificar decisões técnicas. Concluir um projeto, por si só, não comprova um nível profissional. A avaliação deve considerar compreensão, autonomia e capacidade de resolver problemas na prática; a evolução para pleno é um objetivo futuro, não uma classificação antecipada.

## Objetivo do projeto

Evoluir a calculadora existente para uma aplicação com front-end no navegador e back-end em Node.js. Preservar a interface atual e construir a comunicação entre as partes gradualmente, compreendendo arquitetura, implementação, testes e segurança para poder aplicar os conceitos em outros projetos.

Este projeto também integra uma trilha de formação profissional progressiva. A aprendizagem de bancos de dados, publicação e outras tecnologias deve acontecer quando houver uma necessidade concreta ou uma oportunidade de estudo justificada, sem transformar esses tópicos em requisitos artificiais para concluir a calculadora.

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

- **Trilha A — Desenvolvimento Web:** etapas 1 a 7 abaixo. A etapa atual é a 6.
- **Trilha B — AppSec:** projetos vinculados às funcionalidades. O Projeto 1 avalia e protege a calculadora/API atual; os demais começam quando o projeto tiver formulários, persistência de banco de dados ou contas de usuário que os justifiquem.
- **Visão de portfólio:** organiza os projetos futuros descritos adiante, sem alterar a sequência nem o estado das etapas atuais da calculadora.

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

### Evidências de aprendizagem e autonomia

A presença de um conceito no código ou a aprovação de um teste demonstra apenas parte do progresso. Para registrar compreensão consolidada, usar evidências como explicar o fluxo e as decisões com as próprias palavras, investigar uma falha, propor e implementar uma correção e validar o resultado. No início, oferecer orientação e exemplos; com a prática, reduzir gradualmente as dicas e pedir que o estudante analise o problema, proponha uma solução e justifique suas escolhas. Não atribuir nível profissional sem evidências práticas.

As etapas 1 a 4 foram registradas anteriormente como concluídas com base em testes confirmados. Como não há registro suficiente de que o estudante já explicou os conceitos de cada uma, seus estados atuais abaixo são **Testado e validado** até essa compreensão ser demonstrada; o histórico original foi mantido. Essa pendência é de aprendizagem e não reabre a implementação dessas etapas.

## Etapa atual

Trilha A: Etapa 6 — Persistência do histórico. Status: **Em andamento**.

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
- **Segundo operando:** o botão `=` só chama o cálculo quando `precisaLimparDisplay` é falso, pela condição em `calculadora.js` (linha 215). Assim, `8 + =` sem digitar um segundo operando não calcula; o comportamento foi testado manualmente.
- **Testado manualmente:** na interface, `8 + =` sem segundo operando não iniciou o cálculo; `8 + 2 × 3 =` exibiu o subtotal `10` ao selecionar `×` e o resultado final `30` após `=`.
- **Testes automatizados:** `testes/calcular_logica.js` cobre a lógica aritmética, `testes/encadeamento.mjs` cobre a regra compartilhada de encadeamento e `testes/calcular_api.js` cobre operações, validações, erros e rotas HTTP. O usuário confirmou que os **28 testes atuais passaram** (7 de lógica, 3 de encadeamento e 18 de API).
- **Análise do módulo de encadeamento:** o arquivo `encadeamento.mjs` implementa uma regra separada para `escolherOperacao(estado, novaOperacao, solicitarCalculo)`: quando existe operação anterior pendente, ele resolve a conta anterior antes de registrar a nova operação, atualiza `valorAtual` e mantém `valorAnterior` e `operacaoAtual` no estado; se o estado estiver em erro ou sem operação anterior, ele não dispara cálculo. Esse comportamento corresponde à regra atual da interface: contas encadeadas são resolvidas em sequência e o visor passa a usar a operação nova após o cálculo pendente.
- **Possíveis melhorias futuras (não bloqueiam a etapa atual):** adicionar um teste automatizado para `=` sem segundo operando; ampliar o teste de falha do encadeamento para conferir todo o estado após a rejeição e a recuperação pela interface; avaliar testes automatizados da integração visual/E2E.
- **Teste:** executar os testes automatizados e confirmar operações normais, entradas inválidas, divisão por zero e o resultado sequencial de contas encadeadas.
- **Status:** Testado e validado conforme a confirmação do usuário de que os 28 testes passaram e os fluxos de interface descritos foram testados manualmente. As melhorias de cobertura listadas acima são futuras e não bloqueiam o avanço.

### 6. Persistência do histórico

- **Objetivo:** salvar e recuperar cálculos, praticando operações assíncronas de arquivo e tratamento de erros.
- **Implementado:** `historico.js` lê `historico.json`, acrescenta o cálculo e grava o arquivo usando `node:fs/promises`. A rota `POST /calcular` aguarda a gravação antes de responder sucesso; se a gravação falha, retorna HTTP 500.
- **Testado manualmente pelo usuário:** após reiniciar o servidor, o histórico permaneceu disponível; um novo cálculo acrescentou outro registro. Isso valida a persistência entre reinícios e a inclusão de novos cálculos.
- **Tratamento de erros:** o código responde com HTTP 500 quando a gravação falha, mas esse fluxo ainda precisa ser verificado. O tratamento de falha de leitura/gravação faz parte do objetivo de aprendizagem desta etapa.
- **Consulta do histórico:** não há rota ou interface para exibir registros. Isso não é requisito do resultado verificável atual (persistir e recuperar após reiniciar); implementar uma consulta visível pode ser considerado se passar a fazer parte do escopo desejado.
- **Riscos a avaliar:** `historico.js` usa o caminho relativo `historico.json`, que depende da pasta de trabalho ao iniciar o servidor. Gravações simultâneas também podem ler a mesma versão do arquivo e uma sobrescrever a atualização da outra. Avaliar a relevância desses casos para o uso previsto.
- **Teste automatizado:** os testes de API existentes enviam cálculos que são gravados no mesmo `historico.json`. Não executei a suíte durante esta auditoria para evitar misturar dados de teste com o histórico real.
- **Possível melhoria futura, deixada para depois por decisão do usuário:** isolar operações dos testes automatizados para que não sejam confundidas com o histórico real da calculadora. Até essa melhoria ser feita, evitar usar o arquivo de histórico real como destino de dados de teste.
- **Status:** Em andamento. A persistência após reinício e a inclusão de um novo registro foram testadas manualmente pelo usuário; falta verificar o tratamento de erros de arquivo e atender aos demais critérios de aprendizagem.

### 7. Evolução e publicação

- **Objetivo:** avaliar ferramentas, segurança básica e hospedagem com base nas necessidades da aplicação.
- **Resultado verificável:** decisões justificadas sobre Express, variáveis de ambiente, banco de dados e hospedagem, implementando apenas o que fizer sentido e depois de conhecer as necessidades de publicação.
- **Limite atual:** não contratar hospedagem nem alterar configurações de publicação antes de desenvolver e testar os projetos.
- **Teste:** definido quando as necessidades e o ambiente de publicação forem conhecidos.
- **Status:** Não iniciado.

## Projetos futuros para o portfólio

Esta é uma visão de longo prazo, não uma lista de tarefas para iniciar agora. A calculadora permanece prioritária. Cada projeto futuro deverá ter planejamento e etapas próprias; definir um MVP, critérios de conclusão, testes e decisões técnicas antes de implementar. Distinguir requisitos essenciais do projeto, funcionalidades opcionais e oportunidades de aprendizagem.

### Projeto de portfólio 1 — Calculadora com API (projeto atual)

Continuar o trabalho descrito nas etapas acima. A trilha inclui JavaScript, Node.js, HTTP, APIs REST, JSON, `fetch()`, Promises, `async`/`await`, módulos, testes, segurança e persistência. PostgreSQL pode ser estudado como oportunidade relevante, mas não é requisito automático para concluir a calculadora nem substitui a avaliação de necessidade.

### Projeto de portfólio 2 — Sistema de cadastro

Proposta futura para clientes ou usuários: criar, listar, editar, excluir e pesquisar registros, com validação e persistência. Conhecimentos a estudar: CRUD, Express quando justificado, PostgreSQL, SQL, modelagem, validação no front-end e back-end e testes automatizados. O escopo e a escolha de tecnologias serão definidos no planejamento próprio do projeto.

### Projeto de portfólio 3 — Sistema de estoque

Proposta futura para cadastro de produtos, entradas e saídas, quantidades, histórico de movimentações, relatórios e pesquisa/filtros. Conhecimentos a estudar: relacionamentos entre tabelas, consultas SQL, regras de negócio, integridade de dados, transações e organização de APIs. Funcionalidades e ordem serão divididas em etapas no planejamento próprio.

### Projeto de portfólio 4 — Sistema de gerenciamento

Proposta futura com login, usuários, painel administrativo, permissões e dados privados, quando esse escopo se justificar. Conhecimentos a estudar: hash de senhas, sessões e cookies, JWT quando apropriado, controle de acesso, proteção de rotas e segurança de aplicações. Não adicionar autenticação sem necessidade concreta; detalhar escopo, segurança e testes antes da implementação.

Novos projetos poderão ser acrescentados conforme os conhecimentos adquiridos e as necessidades identificadas. As relações com os módulos AppSec são orientativas e seguem as funcionalidades, não uma correspondência numérica obrigatória.

## Portfólio profissional

O portfólio será o site principal de apresentação da trajetória profissional e poderá ter seções de apresentação pessoal, sobre, conhecimentos e tecnologias, projetos e contato.

Cada projeto apresentado deverá informar nome e descrição, problema que resolve, funcionalidades, tecnologias, imagens ou demonstrações, link para a aplicação e link para o código-fonte quando disponível. Ao selecionar um projeto, o visitante deverá conseguir acessar sua aplicação quando ela estiver publicada. A página de apresentação pode ficar no portfólio enquanto cada aplicação continua independente, com ciclo próprio de desenvolvimento e manutenção.

## Decisões técnicas e hospedagem futura

Antes de adotar uma tecnologia ou funcionalidade, avaliar:

1. Qual problema resolve?
2. O que permite aprender?
3. Qual sua relevância profissional?
4. É compatível com a arquitetura atual?
5. Quais são seus requisitos de segurança?
6. Como será testada?
7. Qual seu custo?
8. Como afetará a hospedagem?
9. Facilita ou dificulta a manutenção?
10. Quais possibilidades de evolução oferece?

Uma tecnologia não precisa ser obrigatória para o funcionamento do projeto para justificar seu estudo; a decisão deve esclarecer a oportunidade de aprendizagem e o trade-off, sem adotar ferramentas apenas por popularidade.

A contratação de hospedagem fica para depois que os projetos estiverem desenvolvidos e testados. Avaliar se uma única contratação atende ao portfólio estático e às aplicações Node.js independentes, comparando também com serviços separados quando isso for técnica ou financeiramente melhor. Considerar suporte a HTML/CSS/JavaScript estáticos e Node.js, execução de aplicações independentes, domínios e subdomínios, variáveis de ambiente, integração com PostgreSQL, armazenamento persistente, HTTPS, backups, limites de processamento/armazenamento, custo e expansão. Nenhum provedor será presumido nem contratado nesta fase.

## Metodologia e acompanhamento de conhecimentos

- Aprender com projetos reais, uma funcionalidade por vez, com explicações simples e progressivas.
- Testar cada implementação antes de avançar; priorizar o raciocínio do estudante e oferecer dicas antes da solução completa.
- Explicar causas e correções possíveis para erros; não mudar decisões aprovadas sem conversar.
- Reduzir gradualmente a orientação para desenvolver autonomia de análise, implementação, investigação e justificativa técnica.
- Registrar conhecimentos praticados, evidências de compreensão e tópicos a revisar. Não presumir que um assunto foi compreendido porque o código funcionou ou os testes passaram.
- No início de cada projeto futuro, estabelecer escopo, etapas, critérios de validação e decisões técnicas em um planejamento próprio.

O registro deve diferenciar assunto ainda não estudado, praticado que precisa de revisão e compreensão demonstrada com evidência. No estado atual, as etapas 1 a 4 já registram a necessidade de explicar os conceitos; essa pendência pedagógica permanece sem reabrir suas implementações validadas.

## Trilha B — Cibersegurança Web (AppSec)

Esta trilha complementa a Trilha A conforme as funcionalidades forem implementadas. Usar o [Guia prático de segurança Web](./GUIA_SEGURANCA_APPSEC.md) para os exemplos e laboratórios. Os estados abaixo descrevem somente o que foi confirmado no código ou executado; não indicam que uma aplicação futura já foi criada.

Como referência de sequência, os módulos sobre formulários e XSS podem ser retomados no sistema de cadastro; banco de dados e SQL Injection, quando cadastro ou estoque adotarem persistência SQL; autenticação, sessões e autorização, quando o sistema de gerenciamento tiver usuários e recursos privados. Essa associação não altera os estados dos projetos AppSec nem duplica o conteúdo do guia.

### Projeto 1 — Segurança da calculadora e da API

- **Objetivo:** verificar validação de entradas, evitar injeção de código e fortalecer o processamento das requisições HTTP.
- **Verificado no código:** não há uso de `eval()` para calcular expressões; `server.js` exige operandos `Number.isFinite`, limita operações a uma lista permitida e responde a JSON malformado; `calculadora.js` usa `textContent` para exibir conteúdo no visor.
- **Implementado no código:** `server.js` define limite de 10 KB, rejeita `Content-Length` declarado acima do limite e verifica o tamanho recebido durante a leitura, respondendo `413` quando excedido. `testes/calcular_api.js` inclui um teste de corpo acima do limite e verifica uma requisição válida em seguida.
- **Cabeçalhos:** o servidor define `maxHeaderSize` em 16 KB. Não encontrei teste específico que verifique a rejeição de cabeçalhos acima desse limite.
- **Leitura do corpo:** o tamanho dos pedaços recebidos é contado, mas o corpo é acumulado em uma string (`corpo = corpo + pedaco`), não em `Buffer`. Compreender e avaliar a leitura em bytes com `Buffer` permanece um tópico de estudo/possível melhoria, não uma pendência da Etapa 6.
- **Testes:** o usuário confirmou que os 28 testes atuais passaram, incluindo os 18 testes de API, com casos para corpo acima do limite e requisição válida após a rejeição.
- **Pendente:** os testes da API dependem de um servidor previamente iniciado em `localhost:3000`; integrar ou documentar de forma robusta esse requisito para a execução de testes, sem mascarar falha de conexão como sucesso.
- **Status:** Em andamento. Os controles e testes atuais foram confirmados pelo usuário; permanece pendente tornar a execução dos testes da API independente de um servidor iniciado manualmente.

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
- Na Etapa 6, verificar o comportamento quando a leitura ou gravação do arquivo falha.
- Na Etapa 6, avaliar caminho de arquivo independente da pasta de inicialização e segurança contra gravações simultâneas.
- Documentar ou automatizar a inicialização do servidor necessária para os testes de API.
- Planejar cada projeto futuro separadamente quando a calculadora e os conhecimentos necessários justificarem avançar para ele.
- Comparar hospedagem do portfólio e das aplicações somente quando os requisitos de publicação forem conhecidos; não contratar agora.
- Definir como registrar evidências de conhecimentos consolidados e tópicos a revisar conforme forem demonstrados durante os projetos.

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
- **2026-11-08** — Atualização documental após inspeção do estado atual: corrigidas as pendências já resolvidas de integração do módulo de encadeamento e limite HTTP de 10 KB/413; registrados o teste de corpo grande existente e as lacunas de cobertura restantes. Os testes não foram executados nesta atualização.
- **2026-11-08** — O usuário confirmou que os 28 testes atuais passaram. A Etapa 5 foi marcada como testada e validada, as melhorias de cobertura permaneceram como futuras/não bloqueantes e a Etapa 6 — Persistência do histórico — foi definida como próxima, pendente de início.
- **2026-11-09** — Auditoria do estado atual: a Etapa 6 já tem gravação assíncrona de cálculos em `historico.json`, chamada pela API, e o arquivo contém dois registros. A etapa foi atualizada para em andamento; não foi possível confirmar por evidência existente a recuperação após reiniciar, nem há rota/interface para consultar os registros. Registrados os riscos do caminho relativo e de gravações simultâneas. A suíte da API não foi executada para evitar gravar dados de teste no histórico usado pela calculadora; o isolamento dos dados de teste permanece uma melhoria futura, conforme decisão do usuário.
- **2026-11-09** — O usuário confirmou o teste manual de persistência: após reiniciar o servidor, o histórico continuou disponível e um novo cálculo acrescentou um registro. Atualizado o status da validação de persistência; permanece pendente verificar o tratamento de falhas de arquivo. A ausência de rota/interface para consulta foi retirada como requisito, pois não consta do escopo aprovado da etapa.
- **2026-11-10** — Ampliação estratégica do plano para incluir objetivo profissional, evidências de aprendizagem e autonomia, sequência futura de projetos, portfólio e critérios de decisão/hospedagem. Preservados os estados, decisões, testes confirmados, pendências e registros históricos anteriores; a etapa 6 permanece em andamento. Os projetos futuros continuam como planejamento, sem implementação imediata.

## Conceitos

O registro abaixo diferencia conceitos presentes no código daqueles cuja compreensão já foi demonstrada. Atualizar essa distinção somente com evidência de prática, explicação ou revisão; não inferir consolidação a partir da conclusão de uma funcionalidade.

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
- Criar e consumir APIs, modelar e consultar bancos de dados, aplicar validação e segurança e investigar erros de forma progressivamente mais autônoma.
- Testes automatizados, Git/GitHub, publicação e manutenção de aplicações, conforme cada projeto avançar e houver evidências de prática.
