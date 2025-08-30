<h1 align="center">Academia API</h1>
<p align="center">API REST para gestão de academia: usuários, exercícios, treinos e progresso físico.</p>

## 🎯 Objetivo
Centralizar cadastro de usuários, catálogo de exercícios, montagem de treinos e registro de progresso (peso, medidas, IMC) com autenticação JWT e documentação Swagger.

## 🧱 Arquitetura
- NestJS (modular, injeção de dependências)
- Sequelize + PostgreSQL (sequelize-typescript)
- Validação com class-validator / transformação com class-transformer
- Autenticação JWT (Bearer) + hashing bcrypt
- Swagger (`/api/docs`)
- Middlewares de logging e sanitização de body

```
Client -> HTTP -> Controllers -> Services -> Sequelize Models -> PostgreSQL
                         |-> DTO Validation
Auth Flow: /auth/login -> JWT -> rotas protegidas (futuro)
```

## 📦 Módulos Implementados
- Auth: login e emissão de token
- Usuários: CRUD + hashing de senha + normalização de email
- Exercícios: CRUD + filtros (grupoMuscular, dificuldade, ativo)
- Treinos: CRUD + filtros (usuarioId, diaSemana, ativo)
- Progresso: CRUD + cálculo automático de IMC

## 🗂 Entidades Principais (resumo)
| Entidade   | Campos chave | Observações |
|------------|--------------|-------------|
| Usuario    | id, nome, email (único), senha(hash), tipo(aluno/instrutor/admin), ativo | Email normalizado e senha bcrypt |
| Exercício  | id, nome, grupoMuscular, dificuldade, ativo | Filtros por query |
| Treino     | id, usuarioId, diaSemana(enum), nome, ativo | Associação a usuário |
| Progresso  | id, usuarioId, peso, altura, imc, dataRegistro | IMC recalculado create/update |

## 🔐 Autenticação
1. Usuário é criado com senha hasheada (bcrypt 10 rounds).
2. Login em `POST /auth/login` com `{ email, senha }`.
3. Retorno: token JWT + dados básicos.
4. Futuro: guard para proteger rotas e endpoint `/auth/me` (pendente).

Variáveis relevantes:
```
JWT_SECRET=seuSegredo
JWT_EXPIRATION_TIME=3600s
AUTH_DEBUG=false
PORT=3000
DATABASE_URL=postgres://user:pass@host:port/db (ou variáveis separadas)
```

## 🚀 Execução
```bash
npm install
npm run start:dev
# Acesse Swagger: http://localhost:3000/api/docs
```

## 🔍 Principais Endpoints
| Recurso | Método | Rota | Descrição |
|---------|--------|------|-----------|
| Auth    | POST   | /auth/login | Login e token |
| Usuários| POST   | /usuarios | Criar usuário |
| Usuários| GET    | /usuarios | Listar (sem senhas) |
| Usuários| PATCH  | /usuarios/:id | Atualizar (rehash se trocar senha) |
| Exercícios | GET | /exercicios?grupoMuscular=... | Listar filtrando |
| Treinos | GET | /treinos?usuarioId=&diaSemana= | Listar por filtros |
| Progresso | POST | /progresso | Registrar progresso (IMC calculado) |

## 🧪 Exemplos Rápidos
Criar usuário:
```json
{
  "nome": "João Silva",
  "email": "joao@exemplo.com",
  "senha": "Senha123@",
  "tipo": "aluno"
}
```
Login:
```json
{ "email": "joao@exemplo.com", "senha": "Senha123@" }
```
Criar progresso:
```json
{
  "usuarioId": 1,
  "peso": 82.4,
  "altura": 1.78,
  "dataRegistro": "2025-08-30"
}
```

## 🔎 Filtros Implementados
- Exercícios: `grupoMuscular`, `dificuldade`, `ativo`
- Treinos: `usuarioId`, `diaSemana`, `ativo`
(Próximo: filtros por período em Progresso)

## ✅ Boas Práticas Aplicadas
- DTOs com validação e transformação (trim, lowercase de email)
- Sanitização de body (middleware) sem quebrar tipos não-string
- Remoção de campo senha das respostas
- Logs de autenticação com modo debug seguro
- Cálculo derivado (IMC) no service, não no controller

## 🧭 Roteiro Sugerido de Apresentação (5-7 min)
1. Contexto & Problema: necessidade de gerenciar evolução física e prescrição de treinos.
2. Arquitetura: módulos Nest, camadas (Controller -> Service -> Model), ORM Sequelize.
3. Demonstração Swagger: criar usuário, login, usar token (futuro guard), listar exercícios com filtros.
4. Regras de Negócio: IMC automático, filtros de listagem, hashing de senha.
5. Extensões Futuras: /auth/me, roles/guards, paginação, filtros por data em progresso, auditoria.
6. Encerramento: robustez, escalabilidade e clareza de documentação.

## 📝 Pendências / Próximos Passos
- Endpoint `/auth/me` + guard JWT
- Paginação & ordenação padrão
- Filtros de progresso (intervalo datas, usuário)
- Tratamento 409 para email duplicado
- Roles/Permissions

## ❓ FAQ Rápido
| Pergunta | Resposta |
|----------|----------|
| Por que Nest? | Organização modular e padrões Enterprise. |
| Por que Sequelize? | Integração TypeScript + migrações futuras. |
| Onde vejo a doc? | `/api/docs` via Swagger. |
| Senhas em texto plano? | Nunca: sempre bcrypt; legado tratado no login (fallback). |
| Como expandir? | Adicionar guards, relacionamentos avançados e métricas. |

## 🧾 Licença
Uso educacional/demonstração. (Adicionar licença formal se necessário.)

---
Se algo não estiver claro para apresentação, revise o roteiro acima primeiro.
