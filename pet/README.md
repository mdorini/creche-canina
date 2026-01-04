# 🐾 Creche Canina - SaaS MVP

Sistema completo de gestão para creches caninas com acompanhamento em tempo real para tutores.

> 🚀 **[Começar Agora em 5 Minutos →](QUICK_START.md)** | 📚 **[Ver Toda Documentação →](INDEX.md)** | 🎮 **[Como Usar →](COMO_USAR.md)**

## 🎯 Características

### Para Administradores
- Dashboard completo com estatísticas
- Gestão de pets e tutores
- Controle de equipe
- Busca e filtros avançados

### Para Staff (Colaboradores)
- Interface mobile-first otimizada para uso com uma mão
- Registro rápido de:
  - Alimentação (comeu tudo, parcial, não comeu)
  - Atividades (brincadeira, passeio, treino, banho)
  - Observações de saúde
  - Fotos do dia
- Lista de pets presentes com alertas de cuidados especiais

### Para Tutores
- Timeline estilo Stories/Feed do Instagram
- Acompanhamento em tempo real
- Fotos e vídeos do dia
- Histórico completo
- Alertas importantes sobre o pet

## 🛠️ Stack Tecnológica

- **Frontend**: Next.js 14 (App Router)
- **Styling**: Tailwind CSS + Shadcn/UI
- **Backend**: Supabase (Auth + Database + Storage)
- **Database**: PostgreSQL (via Supabase)
- **Language**: TypeScript

---

## ⚡ Quick Start

**Quer começar rápido?** Veja o **[QUICK_START.md](QUICK_START.md)** (5 minutos)

**Quer guia completo?** Veja o **[SETUP.md](SETUP.md)** (passo a passo)

---

## 📦 Instalação

### 1. Clone o repositório

\`\`\`bash
git clone <seu-repositorio>
cd creche-canina-saas
\`\`\`

### 2. Instale as dependências

\`\`\`bash
npm install
\`\`\`

### 3. Configure o Supabase

1. Crie uma conta em [supabase.com](https://supabase.com)
2. Crie um novo projeto
3. Execute o SQL do arquivo `database-schema.sql` no SQL Editor do Supabase
4. Configure as variáveis de ambiente:

\`\`\`bash
cp .env.local.example .env.local
\`\`\`

Edite `.env.local` e adicione suas credenciais do Supabase:

\`\`\`env
NEXT_PUBLIC_SUPABASE_URL=sua-url-do-supabase
NEXT_PUBLIC_SUPABASE_ANON_KEY=sua-chave-anonima
\`\`\`

### 4. Execute o projeto

\`\`\`bash
npm run dev
\`\`\`

Acesse [http://localhost:3000](http://localhost:3000)

## 🗄️ Estrutura do Banco de Dados

O sistema possui as seguintes tabelas principais:

- **profiles** - Usuários (Admin, Staff, Tutor)
- **pets** - Informações dos pets
- **daily_logs** - Registros diários (alimentação, atividades, saúde)
- **check_ins** - Controle de presença
- **notifications** - Sistema de notificações

### Segurança

O banco de dados utiliza Row Level Security (RLS) do Supabase para garantir que:
- Tutores só vejam seus próprios pets
- Staff possa criar registros
- Admin tenha acesso total

## 👥 Usuários de Teste

Após configurar o Supabase, crie usuários no Authentication e depois insira na tabela `profiles`:

\`\`\`sql
-- Admin
INSERT INTO profiles (id, email, full_name, role)
VALUES ('uuid-do-usuario', 'admin@creche.com', 'Admin Teste', 'admin');

-- Staff
INSERT INTO profiles (id, email, full_name, role)
VALUES ('uuid-do-usuario', 'staff@creche.com', 'Staff Teste', 'staff');

-- Tutor
INSERT INTO profiles (id, email, full_name, role)
VALUES ('uuid-do-usuario', 'tutor@creche.com', 'Tutor Teste', 'tutor');
\`\`\`

## 🎨 Design System

O projeto utiliza um design moderno e amigável com:

- **Cores principais**: Tons de azul e verde-água (confiança e cuidado)
- **Tipografia**: Inter (arredondada e amigável)
- **Componentes**: Shadcn/UI com bordas arredondadas (rounded-xl)
- **Mobile First**: Otimizado para dispositivos móveis

## 🚀 Próximos Passos

### Features Sugeridas para Evolução

1. **Check-in via QR Code**
   - Tutor mostra QR Code no celular
   - Staff escaneia para dar entrada

2. **Notificações Push**
   - Alertas em tempo real para tutores
   - Lembretes para staff

3. **Galeria de Fotos**
   - Álbum do mês
   - Download de fotos

4. **Relatórios**
   - Relatório mensal por pet
   - Estatísticas de frequência

5. **Agendamento**
   - Sistema de reservas
   - Calendário de disponibilidade

6. **Pagamentos**
   - Integração com meios de pagamento
   - Controle de mensalidades

## 📱 Screenshots

*Adicione screenshots aqui após deploy*

## 🤝 Contribuindo

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📝 Licença

Este projeto está sob a licença MIT.

## 💬 Suporte

Para suporte, envie um email para suporte@crechecanina.com ou abra uma issue.

---

Desenvolvido com 🐾 e ❤️ em Florianópolis

---

## 📚 Documentação Completa

Este projeto inclui documentação profissional e completa:

### 🚀 Para Começar
- **[START_HERE.md](START_HERE.md)** - ⭐ Comece por aqui!
- **[QUICK_START.md](QUICK_START.md)** - Setup em 5 minutos
- **[SETUP.md](SETUP.md)** - Guia completo passo a passo

### 🎮 Para Usar
- **[COMO_USAR.md](COMO_USAR.md)** - Guia completo de uso
- **[INDEX.md](INDEX.md)** - Índice de toda documentação

### 📊 Para Gestão
- **[RESUMO_EXECUTIVO.md](RESUMO_EXECUTIVO.md)** - Visão executiva
- **[FEATURES.md](FEATURES.md)** - Features e roadmap

### 🔧 Para Desenvolvedores
- **[PROJECT_STRUCTURE.md](PROJECT_STRUCTURE.md)** - Arquitetura
- **[DEPLOY.md](DEPLOY.md)** - Guia de deploy

### 🗄️ Banco de Dados
- **[database-schema.sql](database-schema.sql)** - Schema completo
- **[database-seed.sql](database-seed.sql)** - Dados de exemplo

---

## 🎯 Roadmap

Veja o roadmap completo em **[FEATURES.md](FEATURES.md)**

### Próximas Features
- [ ] Formulários de registro de ações
- [ ] Upload de fotos (Supabase Storage)
- [ ] Sistema de notificações push
- [ ] Check-in via QR Code
- [ ] Dashboard com gráficos
- [ ] App mobile nativo

---

## 🤝 Como Contribuir

1. Fork o projeto
2. Leia **[PROJECT_STRUCTURE.md](PROJECT_STRUCTURE.md)**
3. Escolha uma feature em **[FEATURES.md](FEATURES.md)**
4. Crie uma branch (`git checkout -b feature/AmazingFeature`)
5. Commit (`git commit -m 'Add some AmazingFeature'`)
6. Push (`git push origin feature/AmazingFeature`)
7. Abra um Pull Request

