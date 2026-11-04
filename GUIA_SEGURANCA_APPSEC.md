# Guia prático de segurança Web aplicada ao código

Este é um guia de consulta por funcionalidade, não um cronograma. Aplique o módulo quando começar a implementar a funcionalidade correspondente. Os exemplos são didáticos: os trechos vulneráveis servem para reconhecer o padrão e não devem ser usados em produção. Faça os laboratórios somente na plataforma oficial da PortSwigger.

## Como aplicar cada módulo

1. Identifique quais dados chegam do navegador, de APIs ou de persistência.
2. Valide formato, tipo, tamanho e limites no servidor; a validação do navegador é apenas conveniência para o usuário.
3. Use a mitigação adequada ao contexto: allowlist para operações, parâmetros para SQL e codificação contextual para HTML.
4. Acrescente testes para entradas válidas, inválidas e limites.
5. Se o controle depender de uma biblioteca ou serviço, confira a documentação e a configuração de produção antes de publicar.

As categorias citadas são do [OWASP Top 10:2025](https://owasp.org/Top10/2025/). Uma categoria ajuda a classificar o risco, mas não substitui a análise concreta do fluxo.

---

## Projeto 1 — Calculadora Web: strings, operações e execução de código

### Conceito e risco

O navegador envia dados não confiáveis. Se o servidor interpretar uma expressão recebida como código, em vez de aceitar operandos e uma operação limitada, abre-se uma superfície de **injeção de código**. Em Node.js, `eval()` pode executar código no contexto do processo; dependendo do contexto e das capacidades disponíveis, o impacto pode chegar à execução de comandos no servidor (RCE).

**OWASP:** A05:2025 — Injection. A calculadora deste repositório já recebe dois números finitos e uma operação permitida; ela não usa `eval()`. O risco abaixo é um padrão a evitar ao evoluir o projeto.

### Antes — não execute strings recebidas

```js
// Vulnerável: trata entrada externa como código JavaScript.
const resultado = eval(req.body.expressao);
```

Uma pessoa pode enviar uma string que não representa apenas uma conta. O servidor passa a interpretá-la como código, no processo Node.js. Não use `eval()`, `Function()` nem construa código com concatenação de texto para calcular expressões.

### Depois — aceite apenas números e operações conhecidas

No servidor atual baseado em `node:http`, a lógica pode continuar separada em `calcular.js`:

```js
const { calcular } = require('./calcular.js');

const OPERACOES = new Set([
    'somar',
    'subtrair',
    'multiplicar',
    'dividir'
]);

function calcularRequisicao(dados) {
    if (
        dados === null ||
        typeof dados !== 'object' ||
        Array.isArray(dados)
    ) {
        throw new Error('Corpo inválido');
    }

    const { valor1, valor2, operacao } = dados;

    if (!Number.isFinite(valor1) || !Number.isFinite(valor2)) {
        throw new Error('Os operandos devem ser números finitos');
    }

    if (!OPERACOES.has(operacao)) {
        throw new Error('Operação inválida');
    }

    return calcular(valor1, valor2, operacao);
}
```

O cliente envia JSON como `{ "valor1": 8, "valor2": 2, "operacao": "somar" }`. A allowlist impede que o cliente escolha uma função ou expressão arbitrária. A validação do servidor é obrigatória mesmo que a interface já valide os botões.

Se uma interface receber o número como texto, valide a gramática decimal antes da conversão. Esta regex é específica para números decimais simples com ponto ou vírgula; não é uma validação genérica para qualquer idioma ou formato:

```js
const NUMERO_DECIMAL = /^-?\d+(?:[.,]\d+)?$/;

function converterNumero(texto) {
    if (
        typeof texto !== 'string' ||
        texto.length > 32 ||
        !NUMERO_DECIMAL.test(texto)
    ) {
        throw new Error('Número inválido');
    }

    const numero = Number(texto.replace(',', '.'));
    if (!Number.isFinite(numero)) {
        throw new Error('Número inválido');
    }

    return numero;
}
```

Não transforme o resultado da regex em código executável. Regex complexas também podem causar consumo excessivo de CPU; limite o tamanho da entrada e prefira padrões simples.

### Limite o tamanho do corpo HTTP

No `server.js` atual, os pedaços do corpo são concatenados sem um limite explícito. Mesmo com validação matemática, um corpo enorme pode consumir memória. Aplique um limite enquanto lê a requisição e responda `413 Payload Too Large` quando ele for excedido:

```js
const LIMITE_CORPO = 1024;
let corpo = Buffer.alloc(0);
let excedeuLimite = false;

req.on('data', (pedaco) => {
    if (excedeuLimite) {
        return;
    }

    if (corpo.length + pedaco.length > LIMITE_CORPO) {
        excedeuLimite = true;
        return;
    }

    corpo = Buffer.concat([corpo, pedaco]);
});

req.on('end', () => {
    if (excedeuLimite) {
        res.writeHead(413, {
            'Content-Type': 'application/json; charset=utf-8'
        });
        res.end(JSON.stringify({ erro: 'Corpo muito grande' }));
        return;
    }

    // Só depois do limite, converta corpo para texto e faça JSON.parse().
});
```

No front-end, mostre texto com `textContent`, não com `innerHTML`. O `calculadora.js` atual já usa `display.textContent`, que é a escolha adequada para o visor.

### Laboratório PortSwigger

- [OS command injection, simple case](https://portswigger.net/web-security/os-command-injection/lab-simple) — prática de injeção de comandos em uma aplicação de laboratório. É um caso relacionado à execução no servidor, mas não é um laboratório de `eval()` em JavaScript.

---

## Projeto 2 — Formulários e entradas gerais

### Conceito e risco

Campos de cadastro, comentários, buscas e perfis podem carregar dados inesperados. Validar somente no navegador é insuficiente: uma requisição pode ser enviada diretamente à API. Ao inserir conteúdo não confiável no HTML sem codificação adequada, pode ocorrer **Cross-Site Scripting (XSS)**.

**OWASP:** A05:2025 — Injection (inclui XSS).

### Antes — validação somente no cliente e HTML montado com entrada

```js
// No navegador: não é uma barreira de segurança.
if (campo.value.length <= 30) {
    enviarFormulario();
}

// Vulnerável: o texto vira marcação HTML executável no contexto da página.
resultado.innerHTML = comentarioRecebido;
```

Um usuário pode ignorar o formulário e mandar diretamente um valor diferente para o servidor. Se esse valor for interpretado como HTML pelo navegador, pode alterar a página e executar ações no contexto da sessão da vítima.

### Depois — valide no servidor e insira como texto

Exemplo futuro com Express:

```js
app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: false, limit: '10kb' }));

app.post('/cadastro', (req, res) => {
    const apelido = req.body?.apelido;

    if (
        typeof apelido !== 'string' ||
        apelido.length > 30 ||
        !/^[A-Za-z0-9_]{3,30}$/.test(apelido)
    ) {
        return res.status(400).json({ erro: 'Apelido inválido' });
    }

    // Persistir somente depois das validações específicas do domínio.
    return res.status(201).json({ apelido });
});
```

Na interface:

```js
resultado.textContent = comentarioRecebido;
```

Valide de acordo com o significado do campo: um apelido pode ter allowlist, tamanho e formato; um comentário pode aceitar texto Unicode e exigir apenas tipo e tamanho. Não aplique uma regex estreita indiscriminadamente a nomes, endereços ou texto livre. Para saída HTML no servidor, use templates que escapem automaticamente e não desative o escape. Se HTML rico for realmente requisito, use um sanitizador mantido e uma allowlist apropriada; não invente uma função de sanitização com regex.

### Laboratório PortSwigger

- [Reflected XSS into HTML context with nothing encoded](https://portswigger.net/web-security/cross-site-scripting/reflected/lab-html-context-nothing-encoded) — demonstra o que ocorre quando a entrada refletida é inserida sem codificação adequada.

---

## Projeto 3 — Banco de dados: consultas, buscas e injeção

### Conceito e risco

Concatenar valores do usuário dentro de SQL mistura dados e sintaxe. Isso pode mudar o significado da consulta e comprometer confidencialidade ou integridade dos dados.

**OWASP:** A05:2025 — Injection.

### Antes — montar SQL por concatenação

```js
// Vulnerável: email passa a fazer parte do texto SQL.
const sql =
    "SELECT id, email FROM usuarios WHERE email = '" +
    req.query.email +
    "'";
const resultado = await pool.query(sql);
```

Uma entrada especialmente construída pode alterar a condição SQL ou a estrutura da consulta. O problema não é resolvido removendo alguns caracteres com regex: cada banco tem sintaxe própria, e o valor continua sendo tratado como parte do comando.

### Depois — consultas parametrizadas

Exemplo com `pg`:

```js
const email = req.query.email;

if (typeof email !== 'string' || email.length > 254) {
    return res.status(400).json({ erro: 'Email inválido' });
}

const resultado = await pool.query(
    'SELECT id, email FROM usuarios WHERE email = $1',
    [email]
);
```

O driver envia o valor separadamente do comando SQL. Faça validação de tipo, tamanho e formato para regras de negócio, mas use parâmetros para separar os dados da consulta.

Parâmetros protegem **valores**, não nomes dinâmicos de tabelas ou colunas. Para ordenação escolhida pelo usuário, use uma allowlist definida no código:

```js
const colunasOrdenaveis = new Map([
    ['recente', 'created_at'],
    ['email', 'email']
]);

const coluna = colunasOrdenaveis.get(req.query.ordenar) ?? 'created_at';
const limiteSolicitado = typeof req.query.limite === 'string'
    ? Number(req.query.limite)
    : NaN;
const limite = Number.isInteger(limiteSolicitado)
    ? Math.min(Math.max(limiteSolicitado, 1), 100)
    : 20;

const resultado = await pool.query(
    `SELECT id, email FROM usuarios ORDER BY ${coluna} LIMIT $1`,
    [limite]
);
```

A interpolação de `coluna` é segura aqui porque seu valor só pode vir do mapa estático. Não interpole diretamente parâmetros de URL no SQL.

### Laboratório PortSwigger

- [SQL injection vulnerability allowing login bypass](https://portswigger.net/web-security/sql-injection/lab-login-bypass) — exercício de SQL injection em um fluxo de login.

---

## Projeto 4 — Autenticação, senhas, sessões, cookies e JWT

### Conceitos e riscos

Autenticação verifica quem é o usuário; autorização verifica o que aquele usuário pode fazer. Uma sessão ou JWT válido não deve, por si só, conceder acesso a qualquer recurso. Senhas precisam de hash lento apropriado para senhas, e tokens precisam ser verificados antes de serem confiados.

**OWASP:** A07:2025 — Authentication Failures; A04:2025 — Cryptographic Failures; A01:2025 — Broken Access Control.

### 4.1 Senhas: armazenar hash, nunca texto puro

#### Antes

```js
// Vulnerável: banco de dados guarda a senha original.
await db.query(
    'INSERT INTO usuarios (email, senha) VALUES ($1, $2)',
    [email, senha]
);
```

Se o banco for exposto, senhas em texto puro ficam imediatamente legíveis. Hash rápido genérico como SHA-256 também não é substituto para uma função de hash de senhas.

#### Depois

Use uma biblioteca reconhecida que implemente Argon2id (ou bcrypt/scrypt quando apropriado). Exemplo com o pacote `argon2`:

```js
const argon2 = require('argon2');

const hashSenha = await argon2.hash(senha, {
    type: argon2.argon2id
});

await db.query(
    'INSERT INTO usuarios (email, password_hash) VALUES ($1, $2)',
    [email, hashSenha]
);
```

Para autenticar:

```js
const corresponde = usuario &&
    await argon2.verify(usuario.password_hash, senhaInformada);

if (!corresponde) {
    return res.status(401).json({ erro: 'Credenciais inválidas' });
}
```

Valide tamanho e tipo da senha sem truncá-la silenciosamente; limite o corpo da requisição para evitar entradas gigantes. Use respostas genéricas para não revelar se uma conta existe e adicione limitação de tentativas. Nunca registre senhas ou tokens nos logs.

### 4.2 Sessão e cookie

#### Antes

```js
// Vulnerável: estado de autenticação controlado pelo cliente.
res.cookie('isAdmin', 'true');
```

Dados de autorização em cookies controlados pelo cliente podem ser alterados. Cookies sem atributos de proteção também ficam mais expostos a roubo via JavaScript ou envio em contextos indesejados.

#### Depois — sessão gerenciada pelo servidor

Exemplo com `express-session`:

```js
const session = require('express-session');

if (!process.env.SESSION_SECRET) {
    throw new Error('SESSION_SECRET não configurado');
}

app.use(session({
    name: 'sid',
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
        httpOnly: true,
        secure: process.env.COOKIE_SECURE !== 'false',
        sameSite: 'lax',
        maxAge: 30 * 60 * 1000
    }
}));
```

Mantenha `COOKIE_SECURE` habilitado em ambientes servidos por HTTPS; desabilite-o apenas no desenvolvimento local sem HTTPS. Gere `SESSION_SECRET` com entropia suficiente e não o armazene no repositório.

Após login bem-sucedido, regenere o identificador da sessão antes de registrar a identidade autenticada, para evitar fixação de sessão:

```js
req.session.regenerate((erro) => {
    if (erro) {
        return next(erro);
    }

    req.session.userId = usuario.id;
    return res.sendStatus(204);
});
```

Em produção, configure um armazenamento de sessão apropriado; o `MemoryStore` padrão é para desenvolvimento e não deve ser usado como store de produção. `secure: true` exige HTTPS; se a aplicação estiver atrás de proxy TLS, configure `trust proxy` somente conforme a topologia real.

`HttpOnly` impede leitura do cookie por JavaScript, `Secure` restringe o envio a HTTPS, e `SameSite` reduz certos envios cross-site. Esses atributos não substituem autorização no servidor nem proteção CSRF para operações que alteram estado. Para essas rotas, use proteção CSRF apropriada e valide a origem conforme a arquitetura.

### 4.3 JWT: verificar assinatura e claims

#### Antes

```js
// Vulnerável: decode apenas interpreta o conteúdo; não valida a assinatura.
const claims = jwt.decode(token);
req.user = claims;
```

Decodificar não é verificar. As claims podem ser modificadas e não devem ser aceitas até a assinatura, o algoritmo e os atributos esperados serem validados.

#### Depois

Exemplo com `jsonwebtoken`, segredo configurado fora do código e token recebido no cabeçalho `Authorization: Bearer`:

```js
const jwt = require('jsonwebtoken');

if (!process.env.JWT_SECRET) {
    throw new Error('JWT_SECRET não configurado');
}

function autenticar(req, res, next) {
    const correspondencia = /^Bearer\s+(\S+)$/i.exec(
        req.get('authorization') ?? ''
    );
    if (!correspondencia) {
        return res.status(401).json({ erro: 'Não autenticado' });
    }

    try {
        const claims = jwt.verify(correspondencia[1], process.env.JWT_SECRET, {
            algorithms: ['HS256'],
            issuer: 'minha-api',
            audience: 'meu-front-end'
        });

        if (
            typeof claims !== 'object' ||
            claims === null ||
            typeof claims.sub !== 'string'
        ) {
            return res.status(401).json({ erro: 'Não autenticado' });
        }

        req.user = { id: claims.sub };
        return next();
    } catch (erro) {
        if (erro instanceof jwt.JsonWebTokenError) {
            return res.status(401).json({ erro: 'Não autenticado' });
        }

        return next(erro);
    }
}
```

Ao emitir o token, defina `issuer`, `audience`, expiração curta e somente as claims necessárias. Para HS256, use um segredo aleatório forte, mantido fora do código. Verifique a autorização para cada recurso no servidor; não confie em `role` enviado pelo navegador. JWT assinado não é necessariamente criptografado: não coloque senhas, segredos ou dados privados no payload.

Para aplicações Web, avalie cuidadosamente o armazenamento do token. `localStorage` fica acessível a JavaScript da página; cookie `HttpOnly` reduz essa exposição, mas exige considerar CSRF. Não existe escolha sem trade-offs: proteja contra XSS e CSRF conforme o mecanismo usado.

### Laboratórios PortSwigger

- [Username enumeration via different responses](https://portswigger.net/web-security/authentication/password-based/lab-username-enumeration-via-different-responses) — diferenças nas respostas do login que revelam a existência de usuários.
- [JWT authentication bypass via unverified signature](https://portswigger.net/web-security/jwt/lab-jwt-authentication-bypass-via-unverified-signature) — prática sobre confiar em JWT sem verificar a assinatura.
- [CSRF where token validation depends on request method](https://portswigger.net/web-security/csrf/lab-token-validation-depends-on-request-method) — complemento prático para validação de token CSRF em rotas com sessão/cookies.

---

## Checklist reutilizável antes de concluir uma funcionalidade

- [ ] A validação importante também acontece no servidor.
- [ ] Tipo, tamanho, formato e limites estão definidos para cada entrada.
- [ ] Nenhuma entrada externa é executada como código ou concatenada em SQL.
- [ ] A saída é inserida no contexto correto; texto não confiável usa `textContent` ou escape contextual.
- [ ] A autenticação não substitui autorização por recurso/ação.
- [ ] Senhas usam hash apropriado; segredos ficam fora do código e do repositório.
- [ ] Cookies e tokens têm configuração compatível com HTTPS, XSS e CSRF.
- [ ] Erros não expõem segredos, stack traces ou detalhes internos ao cliente.
- [ ] Há testes para entradas inválidas, limites e falhas esperadas.
- [ ] Laboratórios foram executados apenas no ambiente oficial autorizado.

## Referências

- [OWASP Top 10:2025](https://owasp.org/Top10/2025/)
- [OWASP Input Validation Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/Input_Validation_Cheat_Sheet.html)
- [OWASP Cross Site Scripting Prevention Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/Cross_Site_Scripting_Prevention_Cheat_Sheet.html)
- [OWASP SQL Injection Prevention Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/SQL_Injection_Prevention_Cheat_Sheet.html)
- [OWASP Password Storage Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/Password_Storage_Cheat_Sheet.html)
- [OWASP REST Security Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/REST_Security_Cheat_Sheet.html)
- [OWASP Session Management Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/Session_Management_Cheat_Sheet.html)
- [PortSwigger JWT testing guide](https://portswigger.net/web-security/jwt)
