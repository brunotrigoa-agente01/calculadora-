# Plano de estudos de banco de dados — MySQL e Node.js

## Objetivo

Aprender banco de dados progressivamente, começando pelos fundamentos relacionais, avançando para SQL e MySQL e, depois, aplicando os conhecimentos à calculadora com backend em Node.js. O foco é compreender e praticar cada conceito, não apenas copiar comandos ou código.

Este é o planejamento oficial dos estudos de banco de dados do projeto. O resumo do andamento geral da calculadora deve permanecer alinhado ao [PLANO.md](./arquivoMD/PLANO.md), que continua sendo o plano principal do projeto.

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

**Status da etapa:** Aulas 1 a 9 marcadas como estudadas por relato do estudante; validação prática ainda não documentada. Exercício da Aula 9 pendente de confirmação.

## Etapa 2 — SQL intermediário

**Dependência:** fundamentos da Etapa 1 praticados e compreendidos. Continuar com exercícios conceituais e SQL sem instalar MySQL antes de concluir a parte teórica, salvo necessidade didática acordada.

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

**Status:** Não iniciada.

## Etapa 3 — Prática com MySQL

**Dependência:** Etapas 1 e 2 estudadas e validadas conforme seus critérios. A instalação e configuração só começam quando a base teórica estiver concluída ou quando uma necessidade didática for explicada e acordada.

### Atividades

1. Instalar e configurar MySQL localmente.
2. Criar um banco de dados e tabelas.
3. Inserir, consultar, atualizar e excluir dados.
4. Criar e verificar chaves primárias e estrangeiras na prática.
5. Modelar, progressivamente, o relacionamento entre usuários e cálculos para uma evolução futura.
6. Praticar consultas para recuperar o histórico da calculadora.

No começo, usar dados fictícios e um ambiente de aprendizagem separado. Antes de qualquer alteração aos dados ou à persistência da calculadora, planejar e confirmar como preservar o histórico existente.

**Critério de conclusão:** executar operações e consultas em MySQL, conferir os resultados, explicar as chaves e relacionamentos usados e registrar os testes práticos.

**Status:** Não iniciada. Nenhuma instalação de MySQL é autorizada ou solicitada nesta etapa de planejamento.

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

A migração não é automática: definir como os dados serão preservados e verificados antes de trocar a persistência usada pela aplicação. Manter `historico.js` e `historico.json` preservados até haver decisão e plano de migração aprovados. A migração futura não marca retroativamente a Etapa 6 do [PLANO.md](./arquivoMD/PLANO.md) como concluída nem apaga suas pendências.

**Critério de conclusão:** conseguir explicar e testar a conexão, as consultas, o tratamento de erros e a persistência; validar a migração antes de adotá-la na aplicação.

**Status:** Não iniciada.

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

**Critério de conclusão:** cada funcionalidade terá planejamento próprio e só poderá ser considerada concluída com implementação, testes, avaliação de segurança e compreensão demonstrada. Consultar o guia AppSec e retomar os estudos de segurança antes de implementar autenticação ou publicar definitivamente, conforme o andamento registrado no [PLANO.md](./arquivoMD/PLANO.md).

**Status:** Não iniciada; planejamento futuro, sem autorização para implementação.

## Registro de progresso e sincronização com o plano principal

- **Andamento inicial informado:** as Aulas 1 a 9 da Etapa 1 foram estudadas. O exercício da Aula 9 está pendente de confirmação. Não há evidência registrada aqui sobre exercícios das demais aulas nem dificuldades específicas; registrar quando forem confirmados.
- **Etapas 2 a 5:** não iniciadas.
- **Calculadora:** a Etapa 7 do [PLANO.md](./arquivoMD/PLANO.md) permanece em andamento, com estudo de banco de dados priorizado antes da hospedagem. A Etapa 6 — persistência em JSON — permanece adiada temporariamente, incompleta e disponível para possível retomada.
- **AppSec:** acompanhar a pausa temporária e as pendências conforme o plano principal; este plano de estudos não as marca como concluídas nem abandonadas.
- Ao concluir ou atualizar uma aula ou etapa, registrar aqui o que foi estudado, o exercício proposto e realizado, o resultado, as dúvidas/dificuldades relatadas e a evidência de compreensão. Atualizar o resumo correspondente no `PLANO.md` quando o andamento geral da Etapa 7 mudar, mantendo ambos alinhados.
- Não modificar código ou configuração da calculadora durante as aulas de planejamento; qualquer implementação exigirá decisão e autorização próprias.
