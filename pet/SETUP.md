# 🚀 Guia de Setup Completo

## Passo 1: Configurar o Supabase

### 1.1 Criar Conta e Projeto

1. Acesse [supabase.com](https://supabase.com) e crie uma conta
2. Clique em "New Project"
3. Preencha:
   - **Name**: Creche Canina
   - **Database Password**: Escolha uma senha forte
   - **Region**: South America (São Paulo) - mais próximo do Brasil
4. Aguarde a criação do projeto (1-2 minutos)

### 1.2 Executar o Schema do Banco

1. No painel do Supabase, vá em **SQL Editor** (ícone de banco de dados)
2. Clique em "New Query"
3. Copie todo o conteúdo do arquivo `database-schema.sql`
4. Cole no editor e clique em **RUN** (ou F5)
5. Aguarde a execução (deve aparecer "Success")

### 1.3 Obter as Credenciais

1. Vá em **Settings** > **API**
2. Copie:
   - **Project URL** (começa com https://)
   - **anon public** key (uma string longa)

### 1.4 Configurar Variáveis de Ambiente

1. Abra o arquivo `.env.local`
2. Substitua os valores:

\`\`\`env
NEXT_PUBLIC_SUPABASE_URL=https://seu-projeto.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=sua-chave-aqui
NEXT_PUBLIC_APP_URL=http://localhost:3000
\`\`\`

## Passo 2: Criar Usuários de Teste

### 2.1 Criar Usuários no Authentication

1. No Supabase, vá em **Authentication** > **Users**
2. Clique em "Add User" > "Create new user"
3. Crie 3 usuários:

**Admin:**
- Email: admin@creche.com
- Password: admin123456
- Email Confirm: ✅ (marcar)

**Staff:**
- Email: staff@creche.com
- Password: staff123456
- Email Confirm: ✅

**Tutor:**
- Email: tutor@creche.com
- Password: tutor123456
- Email Confirm: ✅

### 2.2 Configurar Perfis

1. Vá em **SQL Editor** > "New Query"
2. Para cada usuário criado, copie seu ID (UUID)
3. Execute os comandos abaixo **substituindo os UUIDs**:

\`\`\`sql
-- Admin (substitua 'uuid-do-admin' pelo ID real)
INSERT INTO profiles (id, email, full_name, role)
VALUES ('uuid-do-admin', 'admin@creche.com', 'Maria Silva', 'admin');

-- Staff (substitua 'uuid-do-staff' pelo ID real)
INSERT INTO profiles (id, email, full_name, role)
VALUES ('uuid-do-staff', 'staff@creche.com', 'João Santos', 'staff');

-- Tutor (substitua 'uuid-do-tutor' pelo ID real)
INSERT INTO profiles (id, email, full_name, role)
VALUES ('uuid-do-tutor', 'tutor@creche.com', 'Ana Costa', 'tutor');
\`\`\`

**Como copiar o UUID:**
- Em Authentication > Users
- Clique no email do usuário
- Copie o "ID" que aparece

## Passo 3: Criar Dados de Teste

### 3.1 Criar um Pet de Teste

\`\`\`sql
-- Substitua 'uuid-do-tutor' pelo ID do tutor criado
INSERT INTO pets (name, breed, age, tutor_id, status, allergies, behavior_notes)
VALUES (
  'Rex',
  'Golden Retriever',
  24,
  'uuid-do-tutor',
  'ativo',
  'Nenhuma alergia conhecida',
  'Muito brincalhão e sociável'
);
\`\`\`

### 3.2 Fazer Check-in do Pet

\`\`\`sql
-- Substitua os UUIDs
INSERT INTO check_ins (pet_id, check_in_time, staff_check_in)
VALUES (
  'uuid-do-pet-rex',  -- ID do pet criado acima
  '08:30:00',
  'uuid-do-staff'
);
\`\`\`

### 3.3 Criar Logs de Atividade

\`\`\`sql
-- Log de alimentação
INSERT INTO daily_logs (pet_id, staff_id, log_type, feeding_status, feeding_notes)
VALUES (
  'uuid-do-pet-rex',
  'uuid-do-staff',
  'feeding',
  'tudo',
  'Comeu toda a ração com muito apetite!'
);

-- Log de atividade
INSERT INTO daily_logs (pet_id, staff_id, log_type, activity_type, activity_duration, activity_notes)
VALUES (
  'uuid-do-pet-rex',
  'uuid-do-staff',
  'activity',
  'brincadeira',
  30,
  'Brincou de buscar a bolinha no pátio'
);

-- Log de saúde
INSERT INTO daily_logs (pet_id, staff_id, log_type, energy_level, stool_type, health_notes)
VALUES (
  'uuid-do-pet-rex',
  'uuid-do-staff',
  'health',
  'alta',
  'normal',
  'Muito ativo e saudável hoje!'
);
\`\`\`

## Passo 4: Instalar e Rodar o Projeto

### 4.1 Instalar Dependências

\`\`\`bash
npm install
\`\`\`

### 4.2 Rodar em Desenvolvimento

\`\`\`bash
npm run dev
\`\`\`

### 4.3 Acessar o Sistema

Abra [http://localhost:3000](http://localhost:3000)

**Logins:**
- Admin: admin@creche.com / admin123456
- Staff: staff@creche.com / staff123456
- Tutor: tutor@creche.com / tutor123456

## Passo 5: Configurar Storage (Opcional)

Para upload de fotos:

1. No Supabase, vá em **Storage**
2. Crie um bucket chamado "pets"
3. Configure como público:
   - Policies > New Policy
   - "Give public access" > Insert, Update, Select

## 📱 Testar no Celular

1. Descubra o IP da sua máquina:
   - Windows: `ipconfig`
   - Mac/Linux: `ifconfig`
   
2. No celular, acesse: `http://SEU-IP:3000`
   - Exemplo: `http://192.168.1.100:3000`

3. Teste a interface mobile-first do Staff!

## 🆘 Problemas Comuns

### Erro de autenticação
- Verifique se as variáveis de ambiente estão corretas
- Confirme que o email dos usuários foi verificado no Supabase

### Erro "relation does not exist"
- Execute novamente o schema SQL completo
- Verifique se todas as tabelas foram criadas

### Pets não aparecem
- Verifique se o tutor_id do pet corresponde ao ID do usuário tutor
- Confirme que o status do pet é 'ativo'

### Erro de permissão (RLS)
- Verifique se as políticas RLS foram criadas
- Teste desabilitando temporariamente o RLS para debug

## ✅ Checklist Final

- [ ] Projeto Supabase criado
- [ ] Schema SQL executado com sucesso
- [ ] 3 usuários criados (admin, staff, tutor)
- [ ] Perfis inseridos na tabela profiles
- [ ] Pet de teste criado
- [ ] Check-in realizado
- [ ] Logs de exemplo criados
- [ ] .env.local configurado
- [ ] npm install executado
- [ ] npm run dev funcionando
- [ ] Login com cada tipo de usuário testado

---

🎉 Pronto! Seu sistema está configurado e pronto para uso!

