# 🏋️ API ACADEMIA - GUIA COMPLETO DE APRESENTAÇÃO

## 📊 **STATUS DO PROJETO**
✅ **PROJETO COMPLETO E FUNCIONAL** - Pronto para apresentação!

---

## 🚀 **COMO RODAR A APLICAÇÃO**

### **1. Pré-requisitos:**
- Node.js instalado
- PostgreSQL configurado (Railway)

### **2. Comandos:**
```bash
# Instalar dependências
npm install

# Rodar em desenvolvimento (com watch)
npm run start:dev

# Rodar em produção
npm run start:prod
```

### **3. URLs Importantes:**
- **API Base:** `http://localhost:3000`
- **Swagger Documentação:** `http://localhost:3000/api/docs`

---

## 🏗️ **ARQUITETURA DO PROJETO**

### **Módulos Implementados:**
- **👥 Usuários** (alunos, instrutores, admins)
- **💪 Exercícios** (banco completo de exercícios)
- **🏋️ Treinos** (treinos personalizados)
- **📈 Progresso** (acompanhamento de evolução)
- **🔐 Autenticação** (JWT com roles)

### **Tecnologias:**
- **Backend:** NestJS + TypeScript
- **Banco:** PostgreSQL (Railway Cloud)
- **ORM:** Sequelize
- **Documentação:** Swagger/OpenAPI
- **Validação:** class-validator
- **Autenticação:** JWT Bearer Token

---

## 🎯 **ENDPOINTS PRINCIPAIS**

### **🔐 Autenticação:**
```
POST /auth/login - Login (email/senha)
```

### **👥 Usuários:**
```
GET    /usuarios     - Listar usuários
POST   /usuarios     - Criar usuário
GET    /usuarios/:id - Buscar por ID
PATCH  /usuarios/:id - Atualizar
DELETE /usuarios/:id - Remover
```

### **💪 Exercícios:**
```
GET    /exercicios     - Listar exercícios
POST   /exercicios     - Criar exercício
GET    /exercicios/:id - Buscar por ID
PATCH  /exercicios/:id - Atualizar
DELETE /exercicios/:id - Remover
```

### **🏋️ Treinos:**
```
GET    /treinos     - Listar treinos
POST   /treinos     - Criar treino
GET    /treinos/:id - Buscar por ID
PATCH  /treinos/:id - Atualizar
DELETE /treinos/:id - Remover
```

### **📈 Progresso:**
```
GET    /progresso     - Listar registros
POST   /progresso     - Criar registro
GET    /progresso/:id - Buscar por ID
PATCH  /progresso/:id - Atualizar
DELETE /progresso/:id - Remover
```

---

## 🧪 **DADOS DE TESTE (API Dog/Postman)**

### **1. Criar Admin:**
```json
POST http://localhost:3000/usuarios
Content-Type: application/json

{
  "nome": "Admin da Academia",
  "email": "admin@academia.com",
  "senha": "123456",
  "telefone": "(11) 99999-9999",
  "dataNascimento": "1990-01-01",
  "tipo": "admin",
  "ativo": true
}
```

### **2. Criar Instrutor:**
```json
POST http://localhost:3000/usuarios
Content-Type: application/json

{
  "nome": "Carlos Instrutor",
  "email": "carlos@academia.com",
  "senha": "123456",
  "telefone": "(11) 88888-8888",
  "tipo": "instrutor"
}
```

### **3. Criar Exercício - Flexão:**
```json
POST http://localhost:3000/exercicios
Content-Type: application/json

{
  "nome": "Flexão de Braço",
  "descricao": "Exercício para fortalecer peitoral e tríceps",
  "grupoMuscular": "Peitoral",
  "equipamento": "Nenhum",
  "dificuldade": "iniciante",
  "instrucoes": "Deite-se de barriga para baixo, apoie as mãos no chão na largura dos ombros"
}
```

### **4. Criar Exercício - Agachamento:**
```json
POST http://localhost:3000/exercicios
Content-Type: application/json

{
  "nome": "Agachamento",
  "descricao": "Exercício para fortalecimento das pernas e glúteos",
  "grupoMuscular": "Quadríceps",
  "equipamento": "Nenhum",
  "dificuldade": "iniciante",
  "instrucoes": "Flexione os joelhos mantendo as costas retas, desça até 90 graus"
}
```

### **5. Criar Exercício - Supino:**
```json
POST http://localhost:3000/exercicios
Content-Type: application/json

{
  "nome": "Supino Reto",
  "descricao": "Exercício com barra para peitoral",
  "grupoMuscular": "Peitoral",
  "equipamento": "Barra e Banco",
  "dificuldade": "intermediario",
  "instrucoes": "Deite no banco, segure a barra com pegada média, desça controlado até o peito"
}
```

### **6. Testar Login:**
```json
POST http://localhost:3000/auth/login
Content-Type: application/json

{
  "email": "admin@academia.com",
  "senha": "123456"
}
```

### **7. Listar Dados:**
```
GET http://localhost:3000/usuarios
GET http://localhost:3000/exercicios
```

---

## 🎯 **ROTEIRO DE APRESENTAÇÃO**

### **1. Introdução (2 min):**
- "Desenvolvi uma API completa para gerenciamento de academia"
- "Usando NestJS, PostgreSQL e boas práticas"

### **2. Demonstração Swagger (3 min):**
- Abrir `http://localhost:3000/api/docs`
- Mostrar documentação automática
- Explicar estrutura dos endpoints

### **3. Teste Prático (5 min):**
- Criar usuário via API
- Fazer login e mostrar JWT
- Criar exercícios
- Listar dados criados

### **4. Pontos Técnicos (3 min):**
- Arquitetura modular NestJS
- Relacionamentos no banco
- Validações automáticas
- Middleware customizados

### **5. Conclusão (2 min):**
- Projeto escalável e profissional
- Pronto para produção
- Possíveis melhorias futuras

---

## 🏆 **PONTOS FORTES DO PROJETO**

### **✅ Arquitetura:**
- Código bem estruturado e organizados
- Padrões de projeto aplicados
- Separação de responsabilidades

### **✅ Funcionalidades:**
- CRUD completo para todas entidades
- Sistema de autenticação robusto
- Relacionamentos entre tabelas
- Validação de dados

### **✅ Tecnologia:**
- Framework moderno (NestJS)
- Banco na nuvem (Railway)
- Documentação automática (Swagger)
- TypeScript para type safety

### **✅ Profissionalismo:**
- Middleware customizados
- Tratamento de erros
- Logs estruturados
- Configuração via ambiente

---

## 🔧 **CONFIGURAÇÕES**

### **Variáveis de Ambiente (.env):**
```env
JWT_SECRET=matheus
JWT_EXPIRATION_TIME=3600s
DB_HOST=crossover.proxy.rlwy.net
DB_PORT=44359
DB_USER=matheus_lins
DB_PASS=matheus_lins
DB_NAME=matheus_lins_banco
```

### **Scripts package.json:**
```json
{
  "start": "nest start",
  "start:dev": "nest start --watch",
  "start:prod": "node dist/main",
  "build": "nest build"
}
```

---

## 📋 **CHECKLIST PRÉ-APRESENTAÇÃO**

- [ ] Aplicação rodando sem erros
- [ ] Swagger acessível em `/api/docs`
- [ ] Banco conectado (Railway)
- [ ] Ao menos 1 usuário criado
- [ ] Alguns exercícios cadastrados
- [ ] Teste de login funcionando
- [ ] API Dog/Postman configurado

---

## 🚀 **PRÓXIMOS PASSOS (Opcional)**

### **Melhorias Possíveis:**
- Implementar upload de imagens
- Sistema de notificações
- Dashboard administrativo
- Aplicativo mobile (React Native)
- Relatórios de progresso
- Sistema de agendamento

### **Deploy:**
- Heroku, Vercel, ou AWS
- CI/CD com GitHub Actions
- Monitoramento com logs

---

**🎯 PROJETO PRONTO PARA APRESENTAÇÃO!** 
*API Academia - Sistema completo de gerenciamento de academia desenvolvido com NestJS*
