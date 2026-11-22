# Plano de estudos de banco de dados — MySQL e Node.js

## Objetivo

Aprender banco de dados progressivamente, começando pelos fundamentos relacionais, avançando para SQL e MySQL e, depois, aplicando os conhecimentos à calculadora com backend em Node.js. O foco é compreender e praticar cada conceito, não apenas copiar comandos ou código.

Este é o planejamento oficial dos estudos de banco de dados do projeto. O resumo do andamento geral da calculadora deve permanecer alinhado ao [PLANO.md](./PLANO.md), que continua sendo o plano principal do projeto.

## Regras de aprendizagem

1. Estudar uma aula por vez e não avançar automaticamente.
2. Explicar os conceitos em linguagem simples, com exemplos relacionados à calculadora.
3. Ao final de cada aula, propor um exercício curto para verificar a compreensão.
4. Aguardar a tentativa do estudante, oferecer dicas e orientação antes de apresentar uma solução completa.
5. Registrar separadamente o conteúdo estudado, o exercício realizado, as dificuldades e as evidências de compreensão.
6. Não considerar uma aula concluída apenas porque foi explicada ou estudada teoricamente.
7. Não instalar ferramentas antes de concluir a parte teórica, salvo se houver necessidade didática explicada e acordada.
8. Não pular fundamentos, mudar o escopo ou começar implementação da calculadora sem conversar.
9. MySQL é o primeiro banco de dados escolhido. PostgreSQL poderá ser estudado futuramente, depois de uma boa base com MySQL, e não é prioridade deste plano.
10. O servidor HTTP nativo do Node.js permanece em uso. Estudar Express é uma possibilidade futura, não uma exigência para começar a integração com banco.

## Como registrar o progresso

- **Não iniciada:** ainda não começou.
- **Estudada:** conteúdo apresentado ou revisado; não significa que houve exercício ou compreensão demonstrada.
- **Em andamento:** exercício, revisão ou validação ainda pendente.
- **Testada e compreendida:** o estudante resolveu uma atividade pertinente e explicou o raciocínio; registrar as evidências.
- **Concluída:** os objetivos e exercícios definidos para a etapa foram realizados, testados quando aplicável e compreendidos.
- **Pendente de confirmação:** falta confirmar se uma atividade foi realizada ou qual foi seu resultado.

As atualizações devem registrar fatos confirmados pelo estudante ou verificados durante os estudos. Não inferir que uma atividade foi feita porque aparece neste planejamento.

## Etapa 1 — Fundamentos de banco de dados

**Objetivo:** construir o vocabulário e compreender os conceitos relacionais antes de instalar ferramentas ou começar a integração com a aplicação.

### Aulas

| Aula | Tema | Status atual | Verificação prática |
|---|---|---|---|
| 1 | O que é banco de dados | Estudada, conforme informado pelo estudante | Exercício e evidência não registrados |
| 2 | `PRIMARY KEY` | Estudada, conforme informado pelo estudante | Exercício e evidência não registrados |
| 3 | `FOREIGN KEY` | Estudada, conforme informado pelo estudante | Exercício e evidência não registrados |
| 4 | Tipos de dados | Estudada, conforme informado pelo estudante | Exercício e evidência não registrados |
| 5 | `NULL`, `NOT NULL` e `DEFAULT` | Estudada, conforme informado pelo estudante | Exercício e evidência não registrados |
| 6 | Comandos SQL básicos | Estudada, conforme informado pelo estudante | Exercício e evidência não registrados |
| 7 | `WHERE`, `ORDER BY` e `LIMIT` | Estudada, conforme informado pelo estudante | Exercício e evidência não registrados |
| 8 | Operadores de comparação e lógicos | Estudada, conforme informado pelo estudante | Exercício e evidência não registrados |
| 9 | `JOIN`: `INNER JOIN` e `LEFT JOIN` | Estudada, conforme informado pelo estudante | **Exercício pendente de confirmação** |

O status “estudada” registra a informação do estudante; não substitui exercícios nem demonstração de compreensão. O exercício da Aula 9 permanece pendente até que o estudante confirme sua realização e resultado. Não presumir o estado dos demais exercícios: atualizá-los quando houver evidência.

**Critério de conclusão:** revisar ou praticar os conceitos necessários, confirmar os exercícios pendentes e demonstrar compreensão por explicação e aplicação simples. A etapa não será considerada concluída só porque as aulas foram estudadas.

**Prática confirmada no ambiente local:** o banco `calculadora`, as tabelas `usuarios` e `calculos`, as chaves primárias/estrangeiras e o relacionamento foram criados. João foi inserido com ID 1 e um cálculo foi associado a ele.
**Status da etapa:** Em andamento. Aulas 1 a 9 foram estudadas por relato e parte dos fundamentos foi praticada no MySQL, mas ainda faltam exercícios/evidências de compreensão para concluir a etapa.

## Etapa 2 — SQL intermediário

**Dependência:** fundamentos da Etapa 1 praticados e compreendidos. MySQL já foi instalado por necessidade didática; a Etapa 2 continua exigindo prática dos conteúdos intermediários previstos.

### Conteúdos

1. Índices e desempenho.
2. `GROUP BY` e funções de agregação.
3. `HAVING`.
4. Aliases e consultas mais elaboradas.
5. Relacionamentos e modelagem de tabelas.
6. Normalização de banco de dados.
7. Transações e segurança das operações.

**Prática sugerida:** usar exemplos pequenos e relacionados a cálculos, resultados e usuários fictícios; prever o resultado de uma consulta antes de conferir. Não usar dados pessoais ou dados reais do histórico como material de exercício.

**Critério de conclusão:** realizar exercícios curtos dos temas, explicar o resultado das consultas e justificar uma modelagem simples. Registrar dúvidas e tópicos a revisar.

**Prática confirmada:** consultas básicas, filtros, relacionamentos e `INNER JOIN` já foram praticados no MySQL local.
**Pendências:** confirmar exercícios de índices, agregações, `HAVING`, aliases, modelagem/normalização e transações.
**Status:** Em andamento.

## Etapa 3 — Prática com MySQL

**Dependência:** Etapas 1 e 2 praticadas e validadas conforme seus critérios. A instalação já foi realizada e agora serve como ambiente de estudo local.

### Atividades

1. Instalar e configurar MySQL localmente.
2. Criar um banco de dados e tabelas.
3. Inserir, consultar, atualizar e excluir dados.
4. Criar e verificar chaves primárias e estrangeiras na prática.
5. Modelar, progressivamente, o relacionamento entre usuários e cálculos para uma evolução futura.
6. Praticar consultas para recuperar o histórico da calculadora.

No começo, usar dados fictícios e um ambiente de aprendizagem separado. Antes de qualquer alteração aos dados ou à persistência da calculadora, planejar e confirmar como preservar o histórico existente.

**Critério de conclusão:** executar operações e consultas em MySQL, conferir os resultados, explicar as chaves e relacionamentos usados e registrar os testes práticos.

**Prática confirmada:** MySQL Server 8.0 e MySQL Workbench foram instalados e configurados; o serviço local MySQL80 está na porta 3306; o banco `calculadora` e as tabelas `usuarios`/`calculos` foram criados; João foi inserido com ID 1; um cálculo foi associado; consultas com `SELECT`, `WHERE`, `INNER JOIN` e outros comandos foram praticadas.
**Status:** Em andamento; há prática local confirmada, mas a etapa ainda não está concluída.

## Etapa 4 — Integração com Node.js

**Dependência:** prática com MySQL da Etapa 3 executada e compreendida.

### Atividades

1. Entender como uma aplicação Node.js se comunica com um banco de dados.
2. Avaliar e conhecer um driver ou biblioteca de conexão compatível com MySQL.
3. Planejar a configuração da conexão, mantendo credenciais fora do código-fonte.
4. Executar comandos SQL pelo JavaScript.
5. Inserir cálculos no banco e consultar o histórico.
6. Tratar e testar falhas de conexão, consultas e validação.
7. Usar consultas parametrizadas e compreender como evitam que valores de entrada sejam interpretados como parte do SQL.
8. Criar testes de persistência em ambiente de teste isolado.
9. Só depois de compreender e testar a integração, planejar uma substituição gradual da persistência em arquivo JSON.

A migração não é automática: definir como os dados serão preservados e verificados antes de trocar a persistência usada pela aplicação. Manter `historico.js` e `historico.json` preservados até haver decisão e plano de migração aprovados. A migração futura não marca retroativamente a Etapa 6 do [PLANO.md](./PLANO.md) como concluída nem apaga suas pendências.

**Critério de conclusão:** conseguir explicar e testar a conexão, as consultas, o tratamento de erros e a persistência; validar a migração antes de adotá-la na aplicação.

**Implementado no código:** `banco.js` carrega as variáveis de ambiente com `dotenv` e cria um pool por `mysql2/promise`; o `.env` está excluído do Git. `calculos.js` usa `banco.execute()` com parâmetros para inserir cálculos, listar por `usuario_id` com `ORDER BY id DESC LIMIT 5` e verificar a existência do usuário. `inicializarServer.js` injeta essas funções em `server.js`, que as encaminha às rotas, incluindo `GET /api/calculos`. A interface busca os registros nessa rota ao abrir o histórico e volta a buscá-los após um novo cálculo quando o painel permanece aberto; exibe os resultados na ordem recebida, mais recentes primeiro. O limite é apenas de consulta/exibição e não apaga registros antigos do MySQL. O `localStorage` da interface é separado desse histórico do banco. `package.json` inclui scripts `start` e `test`.
**Testes automatizados:** a configuração atual contém 10 testes em `testes/calcular_api.js`, 9 em `testes/calcular_logica.js`, 4 em `testes/calculos.js` e 3 em `testes/encadeamento.mjs`, total de **26**. Conforme relatório anterior, todos passaram em duas execuções de `npm.cmd test`; não foram executados novamente nesta atualização documental. Os quatro testes de `calculos.js` usam mocks e verificam consulta parametrizada, inserção, listagem limitada, verificação de usuário e simulação de falha seguida de sucesso. Eles não representam integração automatizada com servidor MySQL real. A integração automatizada com MySQL real foi deliberadamente adiada pelo usuário.
**Testes manuais relatados pelo desenvolvedor:** (1) com MySQL ligado, os cálculos são gravados; (2) após atualizar a página, o histórico é recuperado do MySQL; (3) o histórico aberto é atualizado após um novo cálculo; (4) com MySQL desligado, a calculadora continua realizando operações matemáticas; (5) o aviso de falha ao salvar aparece e desaparece após aproximadamente cinco segundos; (6) depois de religar o MySQL, novos cálculos voltam a ser gravados. São relatos de verificações manuais; não foram repetidos nesta atualização documental e não devem ser descritos como testes automatizados.
**Persistência JSON:** `historico.js` e `historico.json` continuam preservados. Não houve migração, substituição nem alteração dos dados como parte desta atualização. A conferência registrada na revisão anterior, em 2026-11-22, encontrou 13 registros no arquivo; essa contagem é histórica e não foi revalidada aqui.
**Próximas atividades:** automatizar gravação, recuperação e indisponibilidade/recuperação com um banco de teste MySQL isolado; demonstrar compreensão do fluxo completo frontend → servidor → módulo de cálculos → MySQL; concluir exercícios e compreensão de fundamentos relacionais e SQL intermediário; e avaliar futuramente a migração JSON, sem executá-la agora.
**Limite do escopo atual:** não migrar nem remover `historico.js` ou `historico.json`. Cadastro completo pela interface, login, autenticação, sessões, histórico individual autenticado, painel administrativo e hospedagem/publicação permanecem em etapas futuras.
**Status:** Em andamento. A conexão, a consulta dos cinco cálculos e o painel integrado à API estão implementados. O desenvolvedor relatou testes manuais de gravação/recuperação e indisponibilidade/retomada; o relatório anterior registra 26 testes automatizados aprovados em duas execuções, com MySQL simulado. Permanecem pendentes a integração automatizada com MySQL real isolado, os estudos e exercícios de banco de dados e a compreensão demonstrada do fluxo.

## Etapa 5 — Evolução do projeto

**Dependência:** fundamentos e integração com banco das Etapas 1 a 4 concluídos conforme seus critérios, além de planejamento próprio e conversa antes de ampliar o escopo. Esta etapa é futura: não implementar agora sistema de usuários ou painel administrativo.

### Tópicos futuros

1. Modelagem de usuários.
2. Cadastro e login.
3. Proteção de senhas com hash apropriado.
4. Autenticação e sessões.
5. Histórico individual por usuário.
6. Área privada.
7. Painel administrativo.
8. Controle de permissões no backend.
9. Testes e tratamento de erros.
10. Preparação para hospedagem, depois de validar a aplicação local e revisar os requisitos de segurança.

**Critério de conclusão:** cada funcionalidade terá planejamento próprio e só poderá ser considerada concluída com implementação, testes, avaliação de segurança e compreensão demonstrada. Consultar o guia AppSec e retomar os estudos de segurança antes de implementar autenticação ou publicar definitivamente, conforme o andamento registrado no [PLANO.md](./PLANO.md).

**Status:** Não iniciada; planejamento futuro, sem autorização para implementação.

## Registro de progresso e sincronização com o plano principal

- **Andamento confirmado em 2026-11-19:** as Aulas 1 a 9 da Etapa 1 foram estudadas por relato e parte da modelagem/SQL foi praticada no MySQL local. Exercícios específicos e a explicação dos conceitos ainda precisam de evidências completas.
- **Integração confirmada em 2026-11-20:** o código configura `mysql2/promise` com pool e variáveis de ambiente em `.env`, e conecta as operações parametrizadas de `calculos.js` às rotas por `inicializarServer.js`. O usuário relata testes anteriores da integração; eles não foram repetidos nesta atualização e não significam que todas as atividades da Fase 4 foram concluídas.
- **Atualização de 2026-11-22:** `listarCalculos()` filtra por `usuario_id` e usa `ORDER BY id DESC LIMIT 5`; `GET /api/calculos` serve o painel da interface, que busca ao abrir e atualiza se permanecer aberto após cálculo. O limite não apaga registros. O histórico do MySQL é distinto do `localStorage`. O desenvolvedor relatou seis cenários manuais: gravação e recuperação com MySQL ligado, atualização do painel aberto, continuidade das operações com MySQL desligado, aviso temporário de falha e retomada das gravações após religar o serviço. O relatório anterior registra duas execuções de `npm.cmd test` com 26 aprovações: 10 API, 9 lógica/histórico, 4 banco com mocks e 3 encadeamento. Não houve nova execução nesta atualização documental; os testes de banco simulam `banco.execute` e não integram com MySQL real. A integração automatizada com banco real segue adiada, assim como a demonstração de compreensão do fluxo completo.
- **Prática confirmada:** banco `calculadora`, tabelas `usuarios` e `calculos`, chave estrangeira, João com ID 1, cálculo associado e consultas `SELECT`, `WHERE`, `INNER JOIN` e outras operações.
- **Ambiente confirmado:** MySQL Server 8.0, MySQL Workbench e serviço MySQL80 na porta 3306; `mysql2` 3.24.6 instalado no projeto CommonJS.
- **Etapas 2 a 5:** a Etapa 2 está em andamento; a Etapa 3 está em andamento por prática SQL parcial; a Etapa 4 está em andamento, com integração implementada, testes automatizados com mocks e testes manuais relatados, mas sem integração automatizada com MySQL real nem compreensão demonstrada do fluxo completo; a Etapa 5 permanece não iniciada.
- **Calculadora:** a Etapa 7 do [PLANO.md](./PLANO.md) permanece em andamento. A consulta dos cinco cálculos e o painel de histórico estão implementados e o desenvolvedor relatou verificações manuais; o relatório anterior registra 26 testes automatizados aprovados em duas execuções, com o banco simulado. Permanecem pendentes testes automatizados contra MySQL real isolado, fundamentos/SQL e compreensão demonstrada. A Etapa 6 — persistência em JSON — permanece adiada temporariamente, incompleta e disponível para possível retomada.
- **AppSec:** acompanhar a pausa temporária e as pendências conforme o plano principal; este plano de estudos não as marca como concluídas nem abandonadas.
- Ao concluir ou atualizar uma aula ou etapa, registrar aqui o que foi estudado, o exercício proposto e realizado, o resultado, as dúvidas/dificuldades relatadas e a evidência de compreensão. Atualizar o resumo correspondente no `PLANO.md` quando o andamento geral da Etapa 7 mudar, mantendo ambos alinhados.
- Não modificar código ou configuração da calculadora durante as aulas de planejamento; qualquer implementação exigirá decisão e autorização próprias.
