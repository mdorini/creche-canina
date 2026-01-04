# 📂 Estrutura do Projeto

\`\`\`
creche-canina-saas/
│
├── app/                          # Next.js App Router
│   ├── dashboard/
│   │   ├── admin/
│   │   │   └── page.tsx         # Dashboard do Admin
│   │   ├── staff/
│   │   │   └── page.tsx         # Dashboard do Staff (Mobile First)
│   │   └── tutor/
│   │       └── page.tsx         # Dashboard do Tutor (Timeline)
│   ├── login/
│   │   └── page.tsx             # Página de Login Unificada
│   ├── globals.css              # Estilos globais + Tailwind
│   ├── layout.tsx               # Layout raiz
│   └── page.tsx                 # Página inicial (redireciona)
│
├── components/
│   ├── dashboard/
│   │   └── navbar.tsx           # Barra de navegação dos dashboards
│   └── ui/                      # Componentes Shadcn/UI
│       ├── avatar.tsx
│       ├── badge.tsx
│       ├── button.tsx
│       ├── card.tsx
│       ├── input.tsx
│       ├── label.tsx
│       └── textarea.tsx
│
├── lib/
│   ├── supabase/
│   │   ├── client.ts            # Cliente Supabase (browser)
│   │   ├── server.ts            # Cliente Supabase (server)
│   │   └── middleware.ts        # Middleware de autenticação
│   └── utils.ts                 # Utilitários (cn helper)
│
├── types/
│   └── database.types.ts        # TypeScript types do banco
│
├── database-schema.sql          # Schema completo do PostgreSQL
├── middleware.ts                # Middleware Next.js
├── package.json                 # Dependências do projeto
├── tailwind.config.ts           # Configuração do Tailwind
├── tsconfig.json                # Configuração do TypeScript
├── next.config.js               # Configuração do Next.js
├── postcss.config.js            # Configuração do PostCSS
├── .env.local.example           # Exemplo de variáveis de ambiente
├── .gitignore                   # Arquivos ignorados pelo Git
├── README.md                    # Documentação principal
└── SETUP.md                     # Guia de configuração passo a passo
\`\`\`

## 🎨 Design System

### Cores

\`\`\`
Primary (Azul Confiança)
- Default: hsl(186 100% 42%) - #00B5D8
- Hover: #009BB8

Secondary (Verde Cuidado)
- Default: hsl(142 76% 73%) - #8DE8BC

Backgrounds
- Gray-50: Fundo geral
- White: Cards e componentes

Status Colors
- Green: Pet presente / Ação completa
- Orange: Alimentação
- Blue: Saúde
- Purple: Fotos/Mídia
\`\`\`

### Tipografia

\`\`\`
Font Family: Inter (Google Fonts)
- Heading 1: 3xl (30px) - Bold
- Heading 2: 2xl (24px) - Bold
- Heading 3: xl (20px) - Semibold
- Body: base (16px) - Regular
- Small: sm (14px) - Regular
- Tiny: xs (12px) - Regular
\`\`\`

### Espaçamento

\`\`\`
Border Radius
- Cards: rounded-2xl (16px)
- Buttons: rounded-xl (12px)
- Inputs: rounded-xl (12px)
- Avatar: rounded-full

Padding
- Cards: p-6 (24px)
- Buttons: px-4 py-2
- Container: p-4 md:p-6
\`\`\`

## 🔐 Fluxo de Autenticação

\`\`\`
┌─────────────┐
│   Browser   │
└──────┬──────┘
       │
       ↓
┌─────────────────────┐
│   Login Page        │
│  (email/password)   │
└──────┬──────────────┘
       │
       ↓
┌─────────────────────┐
│  Supabase Auth      │
│  (verificação)      │
└──────┬──────────────┘
       │
       ↓
┌─────────────────────┐
│  Busca Profile      │
│  (verifica role)    │
└──────┬──────────────┘
       │
       ├─→ Admin  → /dashboard/admin
       ├─→ Staff  → /dashboard/staff
       └─→ Tutor  → /dashboard/tutor
\`\`\`

## 📱 Fluxo de Uso - Staff (Mobile)

\`\`\`
1. Login → Dashboard Staff
           ↓
2. Vê lista de pets presentes
           ↓
3. Seleciona um pet
           ↓
4. Escolhe ação:
   ├─→ Alimentar (botão grande laranja)
   ├─→ Atividade (botão grande verde)
   ├─→ Saúde (botão grande azul)
   └─→ Foto (botão grande roxo)
           ↓
5. Preenche formulário simples
           ↓
6. Salva → Notifica tutor automaticamente
\`\`\`

## 📊 Fluxo de Dados

\`\`\`
┌──────────────────────────────────────┐
│        Staff registra ação           │
└──────────────┬───────────────────────┘
               │
               ↓
┌──────────────────────────────────────┐
│    daily_logs (INSERT no banco)      │
└──────────────┬───────────────────────┘
               │
               ├─→ RLS verifica permissão
               │
               ↓
┌──────────────────────────────────────┐
│   Tutor vê em tempo real (SELECT)   │
│   Timeline atualiza automaticamente  │
└──────────────────────────────────────┘
\`\`\`

## 🗄️ Principais Queries

### Staff - Buscar Pets Presentes

\`\`\`sql
SELECT 
  ci.*,
  p.*,
  pr.full_name as tutor_name
FROM check_ins ci
JOIN pets p ON ci.pet_id = p.id
JOIN profiles pr ON p.tutor_id = pr.id
WHERE ci.check_in_date = CURRENT_DATE
  AND ci.check_out_time IS NULL
  AND p.status = 'ativo'
ORDER BY ci.check_in_time;
\`\`\`

### Tutor - Buscar Timeline do Dia

\`\`\`sql
SELECT 
  dl.*,
  st.full_name as staff_name
FROM daily_logs dl
JOIN profiles st ON dl.staff_id = st.id
WHERE dl.pet_id = $pet_id
  AND dl.log_date = CURRENT_DATE
ORDER BY dl.created_at DESC;
\`\`\`

## 🎯 Próximas Features Prioritárias

1. **Formulários de Registro** (Alta)
   - Modal para alimentação
   - Modal para atividades
   - Modal para saúde
   - Upload de fotos

2. **Sistema de Notificações** (Alta)
   - Push notifications
   - Email notifications
   - Badge de não lidas

3. **Check-in/Check-out** (Média)
   - Interface de check-in
   - QR Code
   - Histórico de frequência

4. **Relatórios** (Média)
   - Resumo semanal
   - Resumo mensal
   - Download PDF

5. **Gestão de Pets** (Baixa)
   - CRUD completo
   - Upload de fotos
   - Histórico completo

## 📝 Convenções de Código

### Nomenclatura

\`\`\`typescript
// Componentes: PascalCase
function PetCard() {}

// Funções: camelCase
function getPetById() {}

// Constantes: UPPER_SNAKE_CASE
const MAX_PETS_PER_PAGE = 20

// Tipos: PascalCase
type Pet = {}
interface PetProps {}
\`\`\`

### Estrutura de Componentes

\`\`\`typescript
// 1. Imports
import { useState } from 'react'
import { Button } from '@/components/ui/button'

// 2. Types/Interfaces
interface Props {
  pet: Pet
}

// 3. Component
export function PetCard({ pet }: Props) {
  // 3.1 Hooks
  const [loading, setLoading] = useState(false)
  
  // 3.2 Handlers
  const handleClick = () => {}
  
  // 3.3 Render
  return <div>...</div>
}
\`\`\`

## 🧪 Testing (Futuro)

\`\`\`
tests/
├── unit/
│   ├── components/
│   └── lib/
├── integration/
│   └── api/
└── e2e/
    ├── login.spec.ts
    ├── admin-dashboard.spec.ts
    └── staff-workflow.spec.ts
\`\`\`

