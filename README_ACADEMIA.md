# 🏋️ Academia API

API completa para gerenciamento de academias desenvolvida com NestJS, TypeScript e PostgreSQL.

## 🚀 Tecnologias

- **Backend:** NestJS + TypeScript
- **Banco de Dados:** PostgreSQL (Railway)
- **ORM:** Sequelize
- **Autenticação:** JWT
- **Documentação:** Swagger/OpenAPI
- **Validação:** class-validator

## 📦 Instalação e Execução

```bash
# Instalar dependências
npm install

# Rodar em desenvolvimento
npm run start:dev

# Build para produção
npm run build

# Rodar em produção
npm run start:prod
```

## 🌐 URLs

- **API:** http://localhost:3000
- **Documentação Swagger:** http://localhost:3000/api/docs

## 🏗️ Estrutura do Projeto

```
src/
├── modules/
│   ├── auth/           # Autenticação JWT
│   ├── usuarios/       # Gestão de usuários
│   ├── exercicios/     # Banco de exercícios
│   ├── treinos/        # Treinos personalizados
│   └── progresso/      # Acompanhamento de evolução
├── database/           # Configuração do banco
├── shared/            # Middlewares compartilhados
└── documentation/     # Configuração Swagger
```

## 📊 Entidades

### Usuários
- Alunos, instrutores e administradores
- Autenticação por email/senha
- Perfis com diferentes permissões

### Exercícios
- Banco completo de exercícios
- Categorizado por grupo muscular
- Níveis de dificuldade
- Instruções detalhadas

### Treinos
- Treinos personalizados por usuário
- Associação com exercícios
- Organização por dias da semana

### Progresso
- Registro de medidas corporais
- Acompanhamento de evolução
- Histórico de progresso

## 🔐 Autenticação

Sistema JWT com roles para diferentes tipos de usuário:
- **Admin:** Acesso total ao sistema
- **Instrutor:** Gestão de treinos e alunos
- **Aluno:** Acesso ao próprio perfil e treinos

## 📝 Documentação

A documentação completa da API está disponível via Swagger em `/api/docs` quando a aplicação estiver rodando.

## 🛠️ Configuração

Configure as variáveis de ambiente no arquivo `.env`:

```env
JWT_SECRET=sua_chave_secreta
JWT_EXPIRATION_TIME=3600s
DB_HOST=host_do_banco
DB_PORT=5432
DB_USER=usuario_do_banco
DB_PASS=senha_do_banco
DB_NAME=nome_do_banco
```

## 🧪 Testes

Para testar a API, use o arquivo `GUIA_APRESENTACAO.md` que contém exemplos completos de requisições.

## 🎯 Funcionalidades

- ✅ CRUD completo para todas entidades
- ✅ Sistema de autenticação robusto
- ✅ Relacionamentos entre tabelas
- ✅ Validação automática de dados
- ✅ Documentação automática
- ✅ Middleware de logging
- ✅ Tratamento de erros

## 🚀 Deploy

O projeto está configurado para deploy em plataformas como:
- Heroku
- Vercel
- AWS
- Railway

---

**Desenvolvido com MUITA paciência usando NestJS**
