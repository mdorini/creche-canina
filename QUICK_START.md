# ⚡ Quick Start - 5 Minutos

Guia rápido para rodar o projeto localmente em 5 minutos!

## 📋 Pré-requisitos

- Node.js 18+ instalado
- Conta no Supabase (gratuita)

## 🚀 Passos Rápidos

### 1️⃣ Clone e Instale (1 min)

\`\`\`bash
# Clone o projeto
git clone <seu-repo>
cd creche-canina-saas

# Instale dependências
npm install
\`\`\`

### 2️⃣ Configure o Supabase (2 min)

1. Acesse [supabase.com](https://supabase.com) → Criar projeto
2. SQL Editor → Copie e cole todo o `database-schema.sql` → RUN
3. Settings → API → Copie:
   - Project URL
   - anon public key

### 3️⃣ Configure .env (30 seg)

\`\`\`bash
# Copie o exemplo
cp .env.local.example .env.local

# Edite .env.local e adicione suas credenciais
NEXT_PUBLIC_SUPABASE_URL=sua-url-aqui
NEXT_PUBLIC_SUPABASE_ANON_KEY=sua-chave-aqui
\`\`\`

### 4️⃣ Crie Usuários (1 min)

No Supabase:

**Authentication → Users → Add User:**

\`\`\`
Admin:
- Email: admin@test.com
- Password: admin123456
- ✅ Confirm Email

Staff:
- Email: staff@test.com
- Password: staff123456
- ✅ Confirm Email

Tutor:
- Email: tutor@test.com
- Password: tutor123456
- ✅ Confirm Email
\`\`\`

**SQL Editor → Execute:**

\`\`\`sql
-- Copie os IDs dos usuários criados e substitua abaixo

INSERT INTO profiles (id, email, full_name, role) VALUES
('uuid-admin', 'admin@test.com', 'Admin', 'admin'),
('uuid-staff', 'staff@test.com', 'Staff', 'staff'),
('uuid-tutor', 'tutor@test.com', 'Tutor', 'tutor');

-- Criar um pet de teste
INSERT INTO pets (name, breed, age, tutor_id, status) VALUES
('Rex', 'Golden Retriever', 24, 'uuid-tutor', 'ativo');
\`\`\`

### 5️⃣ Rode o Projeto (30 seg)

\`\`\`bash
npm run dev
\`\`\`

Abra [http://localhost:3000](http://localhost:3000)

## 🎉 Pronto!

### Teste os Logins:

- **Admin**: admin@test.com / admin123456
- **Staff**: staff@test.com / staff123456
- **Tutor**: tutor@test.com / tutor123456

## 📱 Testar no Celular

1. Descubra seu IP local:
   \`\`\`bash
   # Windows
   ipconfig
   
   # Mac/Linux
   ifconfig | grep inet
   \`\`\`

2. No celular, acesse:
   \`\`\`
   http://SEU-IP:3000
   \`\`\`
   Exemplo: `http://192.168.1.100:3000`

## 🐛 Problemas?

### Erro de autenticação
- Verifique se marcou "Confirm Email" ao criar usuários
- Confirme se os UUIDs no SQL estão corretos

### Pets não aparecem
- Verifique se o `tutor_id` do pet corresponde ao ID do usuário tutor
- Confirme que o status é 'ativo'

### Mais detalhes?
Veja `SETUP.md` para guia completo passo a passo.

---

💡 **Dica**: Para dados de exemplo completos, use `database-seed.sql`!

