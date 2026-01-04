# 🚀 Guia de Deploy

## Deploy na Vercel (Recomendado)

### Passo 1: Preparar o Repositório

1. Crie um repositório no GitHub:
\`\`\`bash
git init
git add .
git commit -m "Initial commit - Creche Canina MVP"
git branch -M main
git remote add origin https://github.com/seu-usuario/creche-canina.git
git push -u origin main
\`\`\`

### Passo 2: Deploy na Vercel

1. Acesse [vercel.com](https://vercel.com)
2. Faça login com GitHub
3. Clique em "New Project"
4. Importe seu repositório
5. Configure as variáveis de ambiente:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
6. Clique em "Deploy"

### Passo 3: Configurar Domínio (Opcional)

1. No dashboard da Vercel, vá em "Settings" > "Domains"
2. Adicione seu domínio personalizado
3. Siga as instruções de DNS

## Deploy na Netlify

### Passo 1: Build Configuration

Crie o arquivo `netlify.toml`:

\`\`\`toml
[build]
  command = "npm run build"
  publish = ".next"

[[plugins]]
  package = "@netlify/plugin-nextjs"
\`\`\`

### Passo 2: Deploy

1. Acesse [netlify.com](https://netlify.com)
2. Conecte com GitHub
3. Selecione o repositório
4. Configure variáveis de ambiente
5. Deploy!

## Deploy Manual (VPS/Cloud)

### Requisitos

- Node.js 18+
- PM2 ou similar
- Nginx (reverse proxy)
- SSL Certificate (Let's Encrypt)

### Passo 1: Setup do Servidor

\`\`\`bash
# Instalar Node.js
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# Instalar PM2
sudo npm install -g pm2

# Clonar repositório
git clone https://github.com/seu-usuario/creche-canina.git
cd creche-canina

# Instalar dependências
npm install

# Build
npm run build
\`\`\`

### Passo 2: Configurar PM2

Crie `ecosystem.config.js`:

\`\`\`javascript
module.exports = {
  apps: [{
    name: 'creche-canina',
    script: 'npm',
    args: 'start',
    env: {
      NODE_ENV: 'production',
      PORT: 3000,
      NEXT_PUBLIC_SUPABASE_URL: 'sua-url',
      NEXT_PUBLIC_SUPABASE_ANON_KEY: 'sua-key'
    }
  }]
}
\`\`\`

\`\`\`bash
pm2 start ecosystem.config.js
pm2 save
pm2 startup
\`\`\`

### Passo 3: Configurar Nginx

\`\`\`nginx
server {
    listen 80;
    server_name crechecanina.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
\`\`\`

### Passo 4: SSL com Let's Encrypt

\`\`\`bash
sudo apt install certbot python3-certbot-nginx
sudo certbot --nginx -d crechecanina.com
\`\`\`

## Configurações Pós-Deploy

### 1. Atualizar URLs no Supabase

1. Vá em Supabase > Settings > Auth
2. Adicione a URL de produção em:
   - Site URL
   - Redirect URLs

### 2. Configurar CORS

Se necessário, configure CORS no Supabase:
- Settings > API > CORS

### 3. Monitoring

Configure monitoring:
- Vercel Analytics (automático)
- Google Analytics
- Sentry para error tracking

## Checklist de Deploy

- [ ] Código commitado no Git
- [ ] Build local funciona (`npm run build`)
- [ ] Variáveis de ambiente configuradas
- [ ] Deploy realizado
- [ ] URLs configuradas no Supabase
- [ ] SSL ativo (HTTPS)
- [ ] Teste de login em produção
- [ ] Teste de cada dashboard
- [ ] Teste mobile
- [ ] Monitoring configurado

## Troubleshooting

### Erro de Build

\`\`\`bash
# Limpar cache
rm -rf .next
npm run build
\`\`\`

### Erro de Variáveis de Ambiente

- Variáveis com `NEXT_PUBLIC_` são públicas
- Verifique se estão configuradas no painel de deploy
- Rebuild após adicionar variáveis

### Erro de Supabase

- Verifique se a URL está correta
- Confirme que a chave é a `anon` (não a `service_role`)
- Adicione domínio de produção nas configurações do Supabase

### Performance Lenta

- Habilite Next.js Image Optimization
- Configure Supabase Connection Pooling
- Use CDN para assets estáticos

## Atualizações Futuras

\`\`\`bash
# Pull do código
git pull origin main

# Instalar novas dependências
npm install

# Build
npm run build

# Restart (PM2)
pm2 restart creche-canina

# Restart (Vercel)
# Automático com push no GitHub
\`\`\`

## Backup

### Banco de Dados (Supabase)

1. Supabase faz backup automático
2. Para backup manual:
   - Settings > Database > Backup
   - Download SQL dump

### Arquivos

\`\`\`bash
# Backup do código
git push origin main

# Backup de configurações
cp .env.production .env.backup
\`\`\`

---

💡 **Dica**: Use staging environment para testar antes de produção!

