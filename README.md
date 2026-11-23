# Calculadora Node.js

Aplicação local com interface HTML/CSS/JavaScript, servidor HTTP nativo do Node.js e persistência MySQL. O servidor também mantém a gravação existente em `historico.json`; essa persistência não é substituída pelo banco.

## Requisitos

- Node.js e npm. A versão verificada neste repositório é Node.js 24.
- MySQL Server 8.0.
- Um usuário MySQL local com permissão para criar o banco e as tabelas durante a preparação e para inserir/consultar os registros da aplicação.

## Instalação

Na pasta do projeto, instale as dependências travadas pelo `package-lock.json`:

```powershell
npm.cmd ci
```

## Preparar o MySQL

1. Inicie o serviço MySQL local.
2. No MySQL Workbench, abra e execute [`sql/esquema.sql`](./sql/esquema.sql). O script cria, caso não existam, o banco `calculadora` e as tabelas `usuarios` e `calculos`, sem excluir tabelas ou dados existentes.
3. O script insere o registro local de ID `1` somente quando esse ID ainda não existe. A interface atual usa temporariamente `usuario_id = 1`; não há cadastro ou autenticação.

O script corresponde ao esquema atual da aplicação: `usuarios(id, nome, email)` e `calculos(id, usuario_id, valor1, valor2, operacao, resultado)`, com chave estrangeira de `calculos.usuario_id` para `usuarios.id`.

## Configurar variáveis de ambiente

Crie uma cópia local do modelo:

```powershell
Copy-Item .env.example .env
```

Edite `.env` e informe os dados do MySQL local. `DB_PASSWORD` pode permanecer vazio somente se a conta MySQL local não exigir senha. Não compartilhe nem versione o arquivo `.env`; ele está no `.gitignore`. `PORT` é opcional e, se omitida, a aplicação usa a porta `3000`.

Variáveis necessárias: `DB_HOST`, `DB_USER`, `DB_PASSWORD`, `DB_NAME` e `DB_PORT`. O servidor informa quais estão ausentes sem imprimir seus valores.

## Testes

```powershell
npm.cmd test
```

Os testes de banco usam mocks e não gravam no MySQL real. A suíte também testa a interface com um DOM simulado; isso não substitui uma validação manual no navegador.

## Iniciar e acessar

```powershell
npm.cmd start
```

Abra <http://localhost:3000> no navegador. Se configurar outra porta em `PORT`, use essa porta no endereço.

## Acesso pela rede local

O servidor escuta em `0.0.0.0` para permitir testes por outros dispositivos na mesma rede. Em um dispositivo conectado à rede local, acesse `http://<IPv4-do-computador>:3000` (ou a porta configurada). Se necessário, permita a porta no firewall somente para uma rede privada confiável.

Esse acesso torna o servidor alcançável por outros dispositivos da rede. A versão atual não tem autenticação e usa o identificador temporário `usuario_id = 1`; não a exponha à Internet nem a redes não confiáveis.

## Hospedagem futura

Hospedagem e publicação não fazem parte da configuração atual. Antes de uma eventual publicação pública, será necessário avaliar autenticação/autorização, isolamento de dados, HTTPS, firewall/rede, credenciais, tratamento de erros de produção, testes de segurança e integração com banco isolado, além de backup e recuperação. Consulte [`arquivoMD/PLANO.md`](./arquivoMD/PLANO.md) para a lista de requisitos futuros.
