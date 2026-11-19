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
7. Começar e permanecer com o servidor HTTP nativo enquanto não houver necessidade concreta de framework. O MySQL foi definido como próxima ferramenta de estudo na Etapa 7; Express continua futuro e não exige migração imediata.
8. Não avançar para etapas futuras sem concluir e testar a etapa atual, salvo adiamento explicitamente aprovado pelo usuário; um adiamento mantém a etapa incompleta e suas pendências registradas.

## Como acompanhar as duas trilhas

O plano acompanha duas trilhas relacionadas, mas não exige implementar funcionalidades futuras na calculadora apenas para estudar segurança:

- **Trilha A — Desenvolvimento Web:** etapas 1 a 7 abaixo. A Etapa 6 está adiada temporariamente e permanece pendente; a Etapa 7 está em andamento, com estudos de banco de dados priorizados antes da hospedagem.
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
- **Adiada temporariamente:** etapa pausada por decisão explícita; continua incompleta e suas tarefas permanecem pendentes para retomada, se necessário.
- **Implementado, mas ainda não testado:** código presente, sem evidência suficiente de execução.
- **Testado e validado:** testes ou verificações definidos foram executados com sucesso; pode haver outros critérios de aprendizagem/documentação pendentes.
- **Concluído:** critérios de implementação, compreensão, teste, segurança pertinente e documentação foram satisfeitos.

### Evidências de aprendizagem e autonomia

A presença de um conceito no código ou a aprovação de um teste demonstra apenas parte do progresso. Para registrar compreensão consolidada, usar evidências como explicar o fluxo e as decisões com as próprias palavras, investigar uma falha, propor e implementar uma correção e validar o resultado. No início, oferecer orientação e exemplos; com a prática, reduzir gradualmente as dicas e pedir que o estudante analise o problema, proponha uma solução e justifique suas escolhas. Não atribuir nível profissional sem evidências práticas.

As etapas 1 a 4 foram registradas anteriormente como concluídas com base em testes confirmados. Como não há registro suficiente de que o estudante já explicou os conceitos de cada uma, seus estados atuais abaixo são **Testado e validado** até essa compreensão ser demonstrada; o histórico original foi mantido. Essa pendência é de aprendizagem e não reabre a implementação dessas etapas.

## Etapa atual

Trilha A: Etapa 7 — Evolução do projeto. Status: **Em andamento**; próximo foco: Fase 1 — Introdução a banco de dados.

Etapa 6 — Persistência do histórico em arquivo JSON. Status: **Adiada temporariamente**; permanece incompleta e suas tarefas continuam pendentes para possível retomada.

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
- **Testes automatizados:** `testes/calcular_logica.js` cobre a lógica aritmética e a persistência do histórico, `testes/encadeamento.mjs` cobre a regra compartilhada de encadeamento e `testes/calcular_api.js` cobre operações, validações, erros e rotas HTTP. Na execução mais recente, em 2026-11-13, passaram **30 testes**: 9 de lógica/histórico, 3 de encadeamento e 18 de API. A confirmação anterior de 28 testes permanece registrada no histórico.
- **Análise do módulo de encadeamento:** o arquivo `encadeamento.mjs` implementa uma regra separada para `escolherOperacao(estado, novaOperacao, solicitarCalculo)`: quando existe operação anterior pendente, ele resolve a conta anterior antes de registrar a nova operação, atualiza `valorAtual` e mantém `valorAnterior` e `operacaoAtual` no estado; se o estado estiver em erro ou sem operação anterior, ele não dispara cálculo. Esse comportamento corresponde à regra atual da interface: contas encadeadas são resolvidas em sequência e o visor passa a usar a operação nova após o cálculo pendente.
- **Cobertura de falhas do encadeamento:** `testes/encadeamento.mjs` verifica que, após a rejeição do cálculo, o estado fica com `valorAtual` igual a `Error`, `valorAnterior` e `operacaoAtual` nulos e `precisaLimparDisplay` verdadeiro. A recuperação pela interface ainda não tem teste automatizado.
- **Possíveis melhorias futuras (não bloqueiam a etapa atual):** adicionar um teste automatizado para `=` sem segundo operando; testar a recuperação do encadeamento pela interface e avaliar testes automatizados da integração visual/E2E.
- **Teste:** executar os testes automatizados e confirmar operações normais, entradas inválidas, divisão por zero e o resultado sequencial de contas encadeadas.
- **Status:** Testado e validado pelos 30 testes automatizados executados em 2026-11-13 e pelos fluxos de interface descritos, testados manualmente. As melhorias de cobertura listadas acima são futuras e não bloqueiam o avanço.

### 6. Persistência do histórico

- **Objetivo:** salvar e recuperar cálculos, praticando operações assíncronas de arquivo e tratamento de erros.
- **Implementado:** `historico.js` lê `historico.json`, acrescenta o cálculo e grava o arquivo usando `node:fs/promises`. A rota `POST /calcular` aguarda a gravação antes de responder sucesso; se a gravação falha, retorna HTTP 500.
- **Testado manualmente pelo usuário:** após reiniciar o servidor, o histórico permaneceu disponível; um novo cálculo acrescentou outro registro. Isso valida a persistência entre reinícios e a inclusão de novos cálculos.
- **Tratamento de erros:** o código responde com HTTP 500 quando a gravação falha, mas esse fluxo ainda precisa ser verificado. O tratamento de falha de leitura/gravação faz parte do objetivo de aprendizagem desta etapa.
- **Teste automatizado de persistência:** `testes/calcular_logica.js` aguarda `gravarHistorico()` concluir antes de ler o JSON e verifica que o registro com o identificador de data/hora do teste foi persistido. O teste passou na execução dos 30 testes em 2026-11-13.
- **Consulta do histórico:** não há rota ou interface para exibir registros. Isso não é requisito do resultado verificável atual (persistir e recuperar após reiniciar); implementar uma consulta visível pode ser considerado se passar a fazer parte do escopo desejado.
- **Riscos a avaliar:** `historico.js` usa o caminho relativo `historico.json`, que depende da pasta de trabalho ao iniciar o servidor. Gravações simultâneas também podem ler a mesma versão do arquivo e uma sobrescrever a atualização da outra. Avaliar a relevância desses casos para o uso previsto.
- **Isolamento dos testes:** os testes da API enviam cálculos que são gravados no `historico.json` relativo ao diretório de execução, e esperam um servidor em `localhost:3000`. Na execução de 2026-11-13, a suíte foi rodada numa cópia temporária do projeto, com servidor e histórico isolados; isso não adiciona isolamento automático aos testes do repositório.
- **Possível melhoria futura, deixada para depois por decisão do usuário:** tornar o isolamento dos dados dos testes uma característica reproduzível da configuração de testes, sem gravar no histórico real da calculadora.
- **Status:** Adiada temporariamente por decisão do usuário. A etapa não está concluída. A persistência após reinício e a inclusão de um novo registro foram testadas manualmente, e o teste automatizado de persistência passou; permanecem pendentes verificar falhas de leitura/gravação, avaliar os riscos do caminho relativo e de gravações simultâneas e atender aos critérios de aprendizagem. `historico.js` e `historico.json` permanecem preservados; a etapa poderá ser retomada futuramente se necessário.

### 7. Evolução do projeto

- **Objetivo:** avançar progressivamente em banco de dados, integração com Node.js e, depois de validar a aplicação localmente, hospedagem e publicação.
- **Plano detalhado:** [PLANO_BANCO_DE_DADOS.md](../PLANO_BANCO_DE_DADOS.md) é o planejamento oficial das aulas de banco de dados, MySQL e integração com Node.js. Atualizar o resumo desta etapa neste plano principal quando o andamento geral mudar.
- **Sequência aprovada:** estudar fundamentos relacionais; adotar MySQL como primeiro banco de dados do projeto; integrar MySQL ao Node.js e avaliar a substituição gradual da persistência JSON; preparar a estrutura de dados para uma evolução futura; somente então estudar hospedagem e publicação.
- **Tecnologias:** manter o servidor HTTP nativo por enquanto. Express permanece uma atividade futura e não é requisito para esta etapa. PostgreSQL poderá ser estudado depois de adquirir uma boa base com MySQL.
- **Critério geral:** dividir cada fase em tarefas menores e exigir prática, testes e compreensão demonstrada para registrá-la como concluída. Estudo teórico, isoladamente, não conclui uma atividade.
- **Status da etapa:** Em andamento. Nenhuma fase de banco de dados foi confirmada como concluída ou implementada. O próximo foco é a Fase 1; não iniciar agora a instalação ou integração do MySQL nem a publicação.

#### Fase 1 — Introdução a banco de dados

- Estudar o que é um banco de dados relacional e praticar a diferença entre tabelas, registros, colunas e tipos de dados.
- Compreender chaves primárias e estrangeiras, relacionamentos entre tabelas e normalização de dados.
- Produzir exercícios ou modelos simples e explicar as relações com as próprias palavras; a leitura teórica, sozinha, não basta para concluir esta fase.
- **Dependência:** nenhuma fase anterior da Etapa 7.
- **Status:** Não iniciada.

#### Fase 2 — MySQL e SQL

- Adotar MySQL como o primeiro banco de dados a estudar e usar neste projeto.
- Estudar instalação e configuração local, criação de banco e tabelas.
- Praticar `CREATE`, `INSERT`, `SELECT`, `UPDATE`, `DELETE`, `WHERE`, `ORDER BY` e `LIMIT`.
- Praticar `JOIN`, relacionamentos, chaves primárias e estrangeiras, índices e transações.
- Validar os exercícios com consultas executadas e explicar o resultado e o papel de cada comando.
- **Dependência:** fundamentos da Fase 1 praticados e compreendidos.
- **Status:** Não iniciada; nenhuma instalação ou configuração de MySQL foi realizada nesta atualização do plano.

#### Fase 3 — Integração com Node.js

- Conectar o Node.js ao MySQL e executar consultas pelo back-end.
- Aprender consultas parametrizadas e tratar erros de conexão e de consulta.
- Criar testes que verifiquem gravação, leitura e atualização dos dados com uma base isolada para testes.
- Somente depois de compreender e testar a integração, planejar a substituição gradual da persistência em arquivo JSON pelo MySQL.
- Preservar `historico.js` e `historico.json`; não remover a implementação nem os dados existentes. Definir e testar a migração de dados antes de mudar a persistência utilizada pela aplicação.
- A eventual migração para MySQL não conclui retroativamente a Etapa 6 nem altera suas pendências ou seu status adiado.
- **Dependência:** Fases 1 e 2 praticadas, com consultas SQL executadas e compreendidas.
- **Status:** Não iniciada.

#### Fase 4 — Preparação para a futura evolução

- Planejar como o banco poderá comportar cadastro de usuários, login/autenticação futuros, histórico individual de cálculos, relacionamento entre usuários e seus cálculos e permissões administrativas.
- Estudar tabelas e relacionamentos necessários, sem implementar agora cadastro, login, autenticação, histórico individual ou painel administrativo.
- Usar o [Guia prático de segurança Web](./GUIA_SEGURANCA_APPSEC.md) quando esses recursos forem planejados; segurança e controle de acesso deverão ser avaliados antes de implementar dados privados.
- **Dependência:** modelagem e integração de banco das Fases 1 a 3 compreendidas e testadas.
- **Status:** Não iniciada; permanece uma preparação de planejamento, não autorização para desenvolver o sistema de usuários.

#### Fase 5 — Hospedagem e publicação

- Começar a avaliar hospedagem somente depois de validar localmente a integração Node.js/MySQL e os testes pertinentes.
- Escolher uma hospedagem com base nos requisitos observados, configurar variáveis de ambiente e a conexão ao banco em produção e publicar a aplicação.
- Testar frontend, backend e banco de dados online; revisar segurança e configuração antes da publicação definitiva.
- **Preparação já implementada no servidor:** a porta usa `process.env.PORT || 3000`; `servidor.listen()` escuta em `0.0.0.0`; e a comparação `process.env.NODE_ENV === 'production'` seleciona mensagem genérica para erros HTTP 500 em produção e mensagem detalhada nos demais ambientes. O código não define `NODE_ENV` nem possui tratamento separado para `development` e `test`: ambos seguem o ramo diferente de produção.
- **Aprendizados relatados pelo usuário:** `process.env`, variáveis de ambiente, `NODE_ENV`, os ambientes `development`, `production` e `test`, comparação estrita com `===`, mensagens genéricas em produção e o fato de `node --test` não definir automaticamente `NODE_ENV=test`. São conhecimentos estudados, não novas implementações.
- **Testes manuais relatados pelo usuário:** configuração de `PORT` e escuta em `0.0.0.0` foram testadas; a calculadora abriu com sucesso no celular usando o IPv4 do computador na mesma rede Wi-Fi.
- **Testes automatizados pendentes:** não foi confirmado teste automatizado específico para `PORT`, `NODE_ENV` ou respostas de erro conforme o ambiente. Os 30 testes registrados em 2026-11-13 antecedem as mudanças de ambiente no servidor; não há contagem ou resultado de nova execução após essas mudanças.
- **Próximos passos sugeridos (não executados):** criar testes reproduzíveis para a porta configurada e para as respostas de erro em produção e nos demais ambientes; verificar explicitamente como o processo recebe cada valor de `NODE_ENV`; avaliar a publicação somente após a validação local de MySQL.
- **Dependência:** Fases 1 a 3 concluídas com implementação e testes locais; a Fase 4 deve estar planejada antes de publicar uma estrutura que pretenda suportar usuários no futuro.
- **Status:** Não iniciada quanto à contratação/configuração de hospedagem e publicação. A preparação de variáveis de ambiente e o teste de acesso pela rede local são evidências parciais, mas não concluem esta fase.

## Melhoria futura do front-end — Histórico local com LocalStorage

Proposta de melhoria para consultar os cálculos anteriores na própria interface, usando o armazenamento do navegador. Esta melhoria é independente da persistência atual do servidor em `historico.json`: **não sincronizar os dois históricos**, não substituir a gravação no servidor e não considerar esta melhoria parte do escopo ou dos critérios das Etapas 6 e 7.

**Prioridade sugerida:** planejar a implementação depois de retomar e estabilizar a persistência da Etapa 6, sem reabrir nem ampliar seu escopo. Como a Etapa 7 permanece em andamento, definir no planejamento próprio quando encaixar esta melhoria, sem alterar o status ou o escopo dela. A melhoria permanece futura e não é trabalho atual.

### Etapas propostas e dependências

1. **Definir os dados e o comportamento do armazenamento**
   - Definir os campos de cada registro: operação, operandos, resultado e data/hora.
   - Planejar o uso de JSON para converter os registros ao salvar e recuperar.
   - Definir como informar e tratar armazenamento vazio, dados inválidos ou JSON corrompido, sem alegar que um registro foi salvo quando ocorreu uma falha.
   - **Dependência:** planejamento próprio da melhoria; preferencialmente após estabilizar a Etapa 6.

2. **Criar a lógica isolada do histórico local**
   - Organizar leitura, gravação e limpeza do LocalStorage separadamente das operações matemáticas, seguindo a arquitetura existente.
   - Recuperar uma lista vazia quando ainda não houver registros salvos e tratar erros de leitura ou gravação sem interromper indevidamente a calculadora.
   - **Dependência:** formato dos registros e comportamentos da etapa 1 definidos.

3. **Salvar cálculos no navegador**
   - Registrar os cálculos realizados na interface, incluindo operação, operandos, resultado e data/hora.
   - Recuperar os registros quando a página for aberta novamente.
   - Manter esse fluxo separado da chamada e da persistência do servidor; não implementar sincronização.
   - **Dependência:** lógica de armazenamento da etapa 2 testada isoladamente.

4. **Adicionar o painel de histórico à calculadora**
   - Incluir botão ou ícone próximo ao visor para abrir e fechar a área de histórico na própria interface.
   - Exibir operação, resultado e data/hora disponível; mostrar uma mensagem clara quando não houver registros.
   - Manter a interface organizada e responsiva.
   - **Dependência:** leitura dos registros da etapa 2 e dados da etapa 3 disponíveis para exibição.
   - **Estado parcial atual:** o botão “Histórico” e um painel vazio que abre e fecha foram adicionados à interface e testados no navegador. Ainda não há exibição de cálculos nem integração com LocalStorage; esta implementação parcial não conclui a melhoria.

5. **Permitir limpar o histórico local**
   - Solicitar confirmação antes de apagar todos os registros do LocalStorage.
   - Atualizar a interface após a limpeza e representar corretamente o estado vazio.
   - **Dependência:** painel da etapa 4 funcionando.

6. **Validar os fluxos e registrar a aprendizagem**
   - Testar salvamento, recuperação após recarregar a página, armazenamento vazio, dados inválidos/JSON corrompido, limpeza e abertura/fechamento do painel.
   - Testar cada parte durante sua implementação e executar novamente os cenários integrados ao final.
   - Registrar limitações e evidências de que o estudante consegue explicar o LocalStorage e a manipulação dos dados.
   - **Dependência:** etapas 2 a 5 implementadas e testadas progressivamente.

### Critérios de conclusão da melhoria

Considerar a melhoria concluída somente quando:

1. O botão de histórico estiver integrado à interface.
2. A área de histórico abrir e fechar corretamente.
3. Os cálculos forem salvos no LocalStorage com os dados definidos.
4. Os registros forem recuperados após atualizar ou reabrir a página.
5. A limpeza pedir confirmação e atualizar a interface corretamente.
6. Os testes de salvamento, recuperação, armazenamento vazio, JSON inválido, limpeza e interface tiverem sido realizados.
7. O estudante conseguir explicar como o LocalStorage funciona e como os dados são convertidos e manipulados.

O LocalStorage é armazenamento local do navegador e este histórico não substitui `historico.json`, não é compartilhado automaticamente com outros navegadores ou dispositivos e não será sincronizado com o servidor nesta melhoria.

## Fase futura — Evolução da calculadora com usuários e painel administrativo

Esta fase é uma proposta de longo prazo para transformar a calculadora em uma aplicação com contas de usuário, histórico individual e área administrativa. **Não iniciar antes de concluir as etapas planejadas atuais**, incluindo a retomada e conclusão da Etapa 6 e a conclusão da Etapa 7. A inclusão desta fase não altera o escopo, o status ou as pendências dessas etapas.

O desenvolvimento deverá ser gradual, com uma funcionalidade por vez, testes antes de avançar e orientação adequada ao nível atual do estudante. As tecnologias de banco de dados e autenticação serão escolhidas somente após avaliar necessidades, alternativas, segurança, testes, custo e hospedagem. O [Guia prático de segurança Web](./GUIA_SEGURANCA_APPSEC.md), especialmente seus módulos sobre banco de dados e autenticação, será a referência AppSec, sem duplicar seus exemplos.

### Etapas propostas e dependências

1. **Definir requisitos, arquitetura e permissões**
   - Delimitar as ações de usuário comum e administrador e quais dados cada perfil pode acessar.
   - Planejar as rotas, as fronteiras entre front-end e back-end e os requisitos de segurança.
   - Avaliar a migração do histórico JSON e as opções de persistência; não escolher banco ou estratégia de autenticação antecipadamente.
   - **Dependência:** conclusão das Etapas 6 e 7 e aprovação do escopo desta fase.

2. **Modelar e migrar os dados**
   - Estudar banco relacional, tabelas, chaves primárias, chaves estrangeiras, relacionamentos, integridade e transações.
   - Modelar usuários e cálculos, relacionando cada registro de histórico ao identificador do usuário.
   - Planejar migração dos registros existentes no JSON e validar que os dados não sejam perdidos nem atribuídos incorretamente.
   - **Dependência:** etapa 1 concluída e escolha justificada de persistência.

3. **Implementar cadastro e validação**
   - Criar cadastro com validação no servidor, tratamento de erros e testes de sucesso e falha.
   - Armazenar senhas usando uma função de hash apropriada; nunca guardar nem retornar a senha em texto puro.
   - **Dependência:** modelo de dados da etapa 2 definido.

4. **Implementar autenticação, sessão e logout**
   - Implementar login e logout e proteger as rotas privadas no back-end.
   - Comparar sessões/cookies com outras estratégias, incluindo tokens somente se houver justificativa; decidir considerando arquitetura, segurança e hospedagem.
   - Testar credenciais inválidas, ausência de autenticação e encerramento de sessão.
   - **Dependência:** cadastro da etapa 3 funcionando e estratégia de autenticação justificada.

5. **Associar e proteger o histórico individual**
   - Associar novos cálculos à identidade autenticada no servidor.
   - Permitir que cada usuário consulte e gerencie apenas os próprios registros.
   - Não confiar em identificadores de usuário enviados pelo cliente para decidir autorização.
   - Testar tentativas de consultar, alterar ou excluir o histórico de outra conta e confirmar a negação.
   - **Dependência:** persistência da etapa 2 e autenticação da etapa 4.

6. **Criar a área privada do usuário**
   - Permitir consultar o próprio histórico e informações da própria conta.
   - Implementar apenas ações de gerenciamento permitidas para o usuário.
   - Validar as permissões no back-end, mesmo quando a interface ocultar ações indisponíveis.
   - **Dependência:** autenticação da etapa 4 e histórico individual protegido da etapa 5.

7. **Criar o painel administrativo**
   - Definir e verificar uma permissão administrativa distinta da conta comum.
   - Permitir ao administrador consultar usuários, históricos e informações de cadastro apenas conforme as permissões aprovadas.
   - Proteger cada rota administrativa no back-end e impedir que usuários comuns acessem ou elevem os próprios privilégios.
   - **Dependência:** autenticação da etapa 4, regras de autorização definidas na etapa 1 e dados individualizados da etapa 5.

8. **Integrar, testar e revisar segurança**
   - Testar os fluxos completos e principais falhas de cadastro, login, sessão, autorização, acesso entre contas e administração.
   - Avaliar controle de acesso às rotas, validação, armazenamento de senhas e riscos AppSec pertinentes; incluir SQL Injection se for escolhido banco relacional.
   - Registrar resultados, limitações e decisões técnicas e explicar a arquitetura com as próprias palavras.
   - **Dependência:** etapas 2 a 7 implementadas e testadas progressivamente.

### Critérios de conclusão da fase

Considerar a fase concluída somente quando:

1. Cadastro, login e logout funcionarem com tratamento de erros.
2. Cada usuário conseguir acessar somente os próprios dados.
3. O administrador acessar somente os recursos administrativos autorizados.
4. O back-end aplicar as permissões independentemente da interface.
5. Os principais cenários de sucesso, falha e acesso indevido tiverem testes executados.
6. Os riscos de segurança e as decisões de arquitetura tiverem sido avaliados e documentados.
7. O estudante conseguir explicar a arquitetura, o fluxo de autenticação e os motivos das decisões técnicas.

### Decisões reservadas para o planejamento próprio

- Banco de dados e processo de migração do JSON, incluindo como tratar registros antigos sem usuário associado.
- Estratégia de autenticação e gerenciamento de sessões.
- Forma segura de criar e manter a primeira conta administrativa.
- Relação de escopo com o Projeto de portfólio 4 — Sistema de gerenciamento; decidir no planejamento próprio se haverá reaproveitamento, integração ou desenvolvimento separado.

Todas as etapas desta fase começam como **Não iniciado**. Não considerar uma etapa concluída sem evidências de implementação, testes e compreensão; esta fase permanece futura e não é trabalho atual.

## Projetos futuros para o portfólio

Esta é uma visão de longo prazo, não uma lista de tarefas para iniciar agora. A calculadora permanece prioritária. Cada projeto futuro deverá ter planejamento e etapas próprias; definir um MVP, critérios de conclusão, testes e decisões técnicas antes de implementar. Distinguir requisitos essenciais do projeto, funcionalidades opcionais e oportunidades de aprendizagem.

### Projeto de portfólio 1 — Calculadora com API (projeto atual)

Continuar o trabalho descrito nas etapas acima. A trilha inclui JavaScript, Node.js, HTTP, APIs REST, JSON, `fetch()`, Promises, `async`/`await`, módulos, testes, segurança e persistência. MySQL será o primeiro banco de dados estudado para este projeto; PostgreSQL poderá ser estudado depois de adquirida uma boa base com MySQL e não é requisito automático para concluir a calculadora.

### Projeto de portfólio 2 — Sistema de cadastro

Proposta futura para clientes ou usuários: criar, listar, editar, excluir e pesquisar registros, com validação e persistência. Conhecimentos a estudar: CRUD, Express quando justificado, SQL, modelagem, validação no front-end e back-end e testes automatizados. O MySQL será a primeira base do projeto atual; PostgreSQL poderá ser estudado depois de adquirida uma boa base com MySQL. O escopo e a escolha de tecnologias serão definidos no planejamento próprio do projeto.

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

A contratação de hospedagem fica para depois que os projetos estiverem desenvolvidos e testados. Avaliar se uma única contratação atende ao portfólio estático e às aplicações Node.js independentes, comparando também com serviços separados quando isso for técnica ou financeiramente melhor. Considerar suporte a HTML/CSS/JavaScript estáticos e Node.js, execução de aplicações independentes, domínios e subdomínios, variáveis de ambiente, integração com MySQL, armazenamento persistente, HTTPS, backups, limites de processamento/armazenamento, custo e expansão. PostgreSQL poderá entrar em avaliações futuras depois de adquirida uma boa base com MySQL. Nenhum provedor será presumido nem contratado nesta fase.

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

**Pausa temporária:** por decisão do estudante, os estudos de validação/AppSec estão pausados temporariamente para variar os assuntos e evitar desgaste. Não estão concluídos nem abandonados. Preservar as pendências e retomar os conteúdos em momento oportuno, especialmente antes de implementar autenticação ou publicar definitivamente a aplicação.

Como referência de sequência, os módulos sobre formulários e XSS podem ser retomados no sistema de cadastro; banco de dados e SQL Injection, quando a integração MySQL da Etapa 7 ou outros projetos adotarem persistência SQL; autenticação, sessões e autorização, quando o sistema de gerenciamento tiver usuários e recursos privados. Essa associação não altera os estados dos projetos AppSec nem duplica o conteúdo do guia.

### Projeto 1 — Segurança da calculadora e da API

- **Objetivo:** verificar validação de entradas, evitar injeção de código e fortalecer o processamento das requisições HTTP.
- **Verificado no código:** não há uso de `eval()` para calcular expressões; `server.js` exige operandos `Number.isFinite`, limita operações a uma lista permitida e responde a JSON malformado; `calculadora.js` usa `textContent` para exibir conteúdo no visor.
- **Implementado no código:** `server.js` define limite de 10 KB, rejeita `Content-Length` declarado acima do limite e verifica o tamanho recebido durante a leitura, respondendo `413` quando excedido. `testes/calcular_api.js` inclui um teste de corpo acima do limite e verifica uma requisição válida em seguida.
- **Cabeçalhos:** o servidor define `maxHeaderSize` em 16 KB. Não encontrei teste específico que verifique a rejeição de cabeçalhos acima desse limite.
- **Leitura do corpo:** o tamanho dos pedaços recebidos é contado, mas o corpo é acumulado em uma string (`corpo = corpo + pedaco`), não em `Buffer`. Compreender e avaliar a leitura em bytes com `Buffer` permanece um tópico de estudo/possível melhoria, não uma pendência da Etapa 6.
- **Testes:** os 30 testes automatizados passaram em 2026-11-13, incluindo os 18 testes de API, com casos para corpo acima do limite e requisição válida após a rejeição. A suíte foi executada numa cópia temporária do projeto; o histórico real não foi usado.
- **Pendente:** os testes da API dependem de um servidor previamente iniciado em `localhost:3000`; integrar ou documentar de forma robusta esse requisito para a execução de testes, sem mascarar falha de conexão como sucesso.
- **Status:** Em andamento. Os controles foram inspecionados no código e os 30 testes passaram na execução de 2026-11-13; permanece pendente tornar a execução dos testes da API independente de um servidor iniciado manualmente.

### Projeto 2 — Segurança de formulários e XSS

- **Objetivo:** validar entradas no servidor, entender entradas não confiáveis e contextos de saída, usar o DOM com segurança e introduzir proteção CSRF quando existirem operações com sessão/cookies que a justifiquem.
- **Dependência:** desenvolver formulários ou outra funcionalidade que aceite e apresente conteúdo de usuário.
- **Status:** Não iniciado; material de referência disponível no guia.

### Projeto 3 — Banco de dados e SQL Injection

- **Objetivo:** praticar consultas SQL seguras, consultas parametrizadas, validação e controle de acesso a dados.
- **Dependência:** a Etapa 7 agora prevê MySQL como primeiro banco do projeto, nas Fases 2 e 3. O estudo AppSec de SQL Injection permanece não iniciado e temporariamente pausado; a escolha de MySQL não significa que esses estudos ou controles já foram concluídos.
- **Status:** Não iniciado; material de referência disponível no guia.

### Projeto 4 — Autenticação, sessões e autorização

- **Objetivo:** compreender cadastro, armazenamento seguro e hash de senhas, autenticação, sessões/cookies, JWT e autorização de operações protegidas.
- **Dependência:** uma funcionalidade que justifique contas de usuário e dados/ações privados. Não adicionar autenticação à calculadora apenas para cumprir o plano.
- **Status:** Não iniciado; material de referência disponível no guia.

## Dúvidas e decisões pendentes

- MySQL foi definido como o primeiro banco de dados do projeto; ainda é necessário estudar e testar sua modelagem e integração nas Fases 1 a 3 da Etapa 7.
- Definir durante a Fase 3 da Etapa 7 a biblioteca de conexão Node.js/MySQL e a configuração de testes, sem migrar a persistência antes de compreender e validar a integração.
- Retomar a Etapa 6, atualmente adiada temporariamente e incompleta, se necessário: verificar o comportamento quando a leitura ou gravação do arquivo falha.
- Retomar a Etapa 6, atualmente adiada temporariamente e incompleta, se necessário: avaliar caminho de arquivo independente da pasta de inicialização e segurança contra gravações simultâneas.
- Express continua como atividade futura; não é necessário migrar imediatamente do servidor HTTP nativo.
- Documentar ou automatizar a inicialização do servidor necessária para os testes de API.
- Planejar cada projeto futuro separadamente quando a calculadora e os conhecimentos necessários justificarem avançar para ele.
- Comparar hospedagem do portfólio e das aplicações somente depois de validar a integração local com MySQL e conhecer os requisitos de publicação; não contratar agora.
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
- **2026-11-13** — O teste de persistência em `testes/calcular_logica.js` foi ajustado para aguardar diretamente `gravarHistorico()` antes de ler o JSON e verificar o registro gravado. A suíte completa passou numa cópia temporária do projeto: 30 testes (9 de lógica/histórico, 3 de encadeamento e 18 de API). A execução usou servidor e histórico temporários; o `historico.json` real não foi alterado. A Etapa 6 continua em andamento: falta verificar falhas de leitura/gravação e cumprir os critérios de aprendizagem; o isolamento automático no próprio projeto permanece uma melhoria futura.
- **2026-11-14** — Por decisão explícita do usuário, a Etapa 6 — Persistência do histórico — foi adiada, mas permanece pendente e incompleta, com suas tarefas preservadas para retomada. A Etapa 7 — Evolução e publicação — passou a ser a etapa atual, em andamento; não foram contratados serviços nem alteradas configurações de publicação.
- **2026-11-15** — Registrado o progresso da Etapa 7: `server.js` configura a porta via `PORT` com fallback para 3000, escuta em `0.0.0.0` e usa `NODE_ENV === 'production'` para retornar mensagem genérica de erro em produção. O usuário relata ter estudado variáveis de ambiente, `NODE_ENV`, comparação `===` e que `node --test` não define automaticamente `NODE_ENV=test`; relata também teste manual de `PORT`/`0.0.0.0` e acesso bem-sucedido pelo celular via IPv4 na rede Wi-Fi. Não foi confirmado teste automatizado específico para ambiente; os 30 testes de 2026-11-13 antecedem as alterações de ambiente. A Etapa 7 permanece em andamento e a Etapa 6 continua adiada e pendente.
- **2026-11-15** — Acrescentada como planejamento futuro, sem implementação, uma fase para evoluir a calculadora com persistência relacional a avaliar, cadastro e autenticação, histórico individual, área privada, painel administrativo e validação AppSec. Foram descritas etapas pequenas, dependências e critérios de conclusão; a fase depende da conclusão das Etapas 6 e 7 e não altera seus escopos ou status.
- **2026-11-15** — Acrescentada, sem implementação, uma melhoria futura do front-end para consultar e gerenciar no LocalStorage um histórico local de cálculos. Foram registrados os dados, etapas, dependências e testes previstos, com separação explícita do histórico do servidor e prioridade sugerida após estabilizar a Etapa 6; os escopos e status das Etapas 6 e 7 foram preservados.
- **2026-11-15** — Por decisão do estudante, a Etapa 6 permanece adiada temporariamente, incompleta e preservada para possível retomada, sem excluir `historico.js` ou `historico.json`. A Etapa 7 foi reorganizada para estudar fundamentos relacionais, MySQL/SQL e integração Node.js/MySQL antes da preparação de hospedagem; PostgreSQL fica como estudo posterior e Express continua futuro. Os estudos de validação/AppSec foram pausados temporariamente, sem serem considerados concluídos ou abandonados. Nenhum código foi alterado nesta atualização.

## Conceitos

O registro abaixo diferencia conceitos presentes no código daqueles cuja compreensão já foi demonstrada. Atualizar essa distinção somente com evidência de prática, explicação ou revisão; não inferir consolidação a partir da conclusão de uma funcionalidade.

### Praticados ou presentes no código atual

- JavaScript no navegador: DOM, eventos, funções, estado e lógica de operações.
- Node.js: servidor HTTP básico com `node:http`, `createServer()`, `response.end()` e `listen()` (etapa 1 testada pelo usuário).
- Configuração do servidor presente em `server.js`: porta por `process.env.PORT || 3000`, escuta em `0.0.0.0` e seleção da mensagem de erro de produção com `process.env.NODE_ENV === 'production'`.
- HTTP: diferença entre caminho (`req.url`) e método (`req.method`), cabeçalho `Content-Type`, serialização JSON e status HTTP 200, 404 e 405 (etapa 2 testada pelo usuário).
- O arquivo `node.js.js` não faz parte da estrutura atual; não é uma dependência das etapas presentes.
- A presença desses conceitos no código não significa que todos estejam consolidados; serão retomados quando necessários.

### Estudados pelo usuário (relato; não significam implementação adicional)

- Variáveis de ambiente e acesso por `process.env`.
- `NODE_ENV` e os nomes de ambiente `development`, `production` e `test`.
- Comparação estrita com `===` para identificar o valor do ambiente.
- Diferença entre mensagens detalhadas fora de produção e mensagens genéricas em produção para não expor detalhes internos.
- `node --test` não define automaticamente `NODE_ENV=test`; esse valor precisa ser configurado explicitamente quando desejado.

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
