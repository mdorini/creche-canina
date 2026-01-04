# 🎮 Como Usar - Guia do Usuário

## 🚀 Começando

### 1. Instalar Dependências

```bash
npm install
```

### 2. Configurar Supabase

Veja instruções detalhadas em `QUICK_START.md` ou `SETUP.md`

### 3. Rodar Localmente

```bash
npm run dev
```

Acesse: http://localhost:3000

---

## 👥 Tipos de Usuário

### 🔷 Admin (Administrador)
**Login de exemplo**: admin@test.com

**O que pode fazer:**
- ✅ Ver estatísticas gerais da creche
- ✅ Listar todos os pets cadastrados
- ✅ Buscar pets por nome
- ✅ Ver quais pets estão presentes
- ✅ Cadastrar novos pets e tutores
- ✅ Editar informações
- ✅ Gerenciar equipe

**Tela principal:**
```
┌─────────────────────────────────────────┐
│  Dashboard Admin                    [+] │
├─────────────────────────────────────────┤
│  📊 Estatísticas                        │
│  ┌───────┐ ┌───────┐ ┌───────┐         │
│  │ 24    │ │ 12    │ │ 8     │         │
│  │ Pets  │ │Presen.│ │Tutores│         │
│  └───────┘ └───────┘ └───────┘         │
│                                         │
│  🔍 [Buscar pet ou tutor...        ]   │
│                                         │
│  📋 Pets Cadastrados                    │
│  ┌─────────────────────────────────┐   │
│  │ 🐕 Rex                  [Editar]│   │
│  │    Golden • 24 meses    [Ver]   │   │
│  │    Tutor: Ana Costa     ✅ Pres.│   │
│  └─────────────────────────────────┘   │
└─────────────────────────────────────────┘
```

---

### 🔷 Staff (Colaborador)
**Login de exemplo**: staff@test.com

**O que pode fazer:**
- ✅ Ver pets presentes hoje
- ✅ Registrar alimentação
- ✅ Registrar atividades
- ✅ Registrar observações de saúde
- ✅ Tirar e enviar fotos
- ✅ Ver alertas de cuidados especiais

**Tela principal (Mobile):**
```
┌──────────────────────────┐
│ Olá, João! 👋        [@]│
│ 8 pets presentes hoje    │
├──────────────────────────┤
│ Ações Rápidas            │
│ ┌──────┐ ┌──────┐        │
│ │ 🍽️   │ │ 🎾   │        │
│ │Alim. │ │Ativ. │        │
│ └──────┘ └──────┘        │
│ ┌──────┐ ┌──────┐        │
│ │ 💙   │ │ 📸   │        │
│ │Saúde │ │Foto  │        │
│ └──────┘ └──────┘        │
│                          │
│ ⏰ Pets Presentes        │
│ ┌────────────────────┐   │
│ │ [🐕]  Rex          │   │
│ │ Golden Retriever   │   │
│ │ 08:30 • Ana Costa  │   │
│ │ ✅ Alimentado      │   │
│ │ [Alimentar] [Ativ.]│   │
│ │ [Saúde]    [Foto] │   │
│ └────────────────────┘   │
│                          │
│ ┌────────────────────┐   │
│ │ [🐕]  Luna         │   │
│ │ Poodle             │   │
│ │ ⚠️ Alérgica frango │   │
│ │ [Alimentar] [Ativ.]│   │
│ └────────────────────┘   │
└──────────────────────────┘
```

**Fluxo de Trabalho:**

1. **Check-in do Pet** (manhã)
   - Admin ou Staff registra entrada
   - Pet aparece na lista do Staff

2. **Alimentação**
   - Tap no botão 🍽️ Alimentar
   - Seleciona: Comeu tudo / Parcial / Não comeu
   - Adiciona observação (opcional)
   - Tira foto (opcional)
   - Salva → Tutor recebe notificação

3. **Atividade**
   - Tap no botão 🎾 Atividade
   - Seleciona tipo: Brincadeira / Passeio / Treino
   - Define duração
   - Adiciona observação
   - Tira foto/vídeo
   - Salva → Tutor vê em tempo real

4. **Saúde**
   - Tap no botão 💙 Saúde
   - Registra energia: Alta / Média / Baixa
   - Registra fisiologia
   - Adiciona observações
   - Salva

5. **Foto do Dia**
   - Tap no botão 📸 Foto
   - Tira foto
   - Adiciona legenda
   - Envia → Aparece na timeline do tutor

---

### 🔷 Tutor (Dono do Pet)
**Login de exemplo**: tutor@test.com

**O que pode fazer:**
- ✅ Ver se pet está na creche
- ✅ Acompanhar timeline do dia
- ✅ Ver fotos em tempo real
- ✅ Ver o que comeu
- ✅ Ver atividades realizadas
- ✅ Ver observações de saúde
- ✅ Acessar histórico completo

**Tela principal (Mobile):**
```
┌──────────────────────────┐
│ [──────────────────]  [@]│
│     [  🐕  ]             │
│      Rex                 │
│ Golden Retriever         │
│ ✅ Na creche desde 08:30 │
├──────────────────────────┤
│ Hoje na Creche  🔵 3     │
│                          │
│ ╔════════════════════╗   │
│ ║ 🍽️ Comeu tudo!    ║   │
│ ║ 10:30 • Por João   ║   │
│ ║                    ║   │
│ ║ [   Foto do Rex   ]║   │
│ ║                    ║   │
│ ║ Comeu toda ração   ║   │
│ ║ com muito apetite! ║   │
│ ╚════════════════════╝   │
│                          │
│ ╔════════════════════╗   │
│ ║ 🎾 Brincadeira     ║   │
│ ║ 11:00 • Por Maria  ║   │
│ ║                    ║   │
│ ║ [   Foto Rex      ]║   │
│ ║                    ║   │
│ ║ Brincou de buscar  ║   │
│ ║ bolinha - 30 min   ║   │
│ ╚════════════════════╝   │
│                          │
│ ╔════════════════════╗   │
│ ║ 💙 Saúde           ║   │
│ ║ 11:30 • Por João   ║   │
│ ║                    ║   │
│ ║ Energia: Alta ⚡   ║   │
│ ║ Fisiologia: Normal ║   │
│ ╚════════════════════╝   │
└──────────────────────────┘
```

**Experiência:**
- 📱 **Visual tipo Instagram Stories**
- 🔄 **Atualização em tempo real**
- 📸 **Fotos em alta qualidade**
- ⏰ **Horário de cada evento**
- 👤 **Nome de quem registrou**
- 💝 **Design emocional e envolvente**

---

## 🎨 Cores e Significados

### No App

- 🟢 **Verde**: Pet presente / Ação concluída
- 🟠 **Laranja**: Alimentação
- 🔵 **Azul**: Saúde e cuidados
- 🟣 **Roxo**: Fotos e mídias
- 🔴 **Vermelho**: Alertas importantes
- ⚪ **Cinza**: Neutro / Não aplicável

### Status de Alimentação

- ✅ **Comeu tudo**: Verde - pet saudável
- ⚠️ **Comeu parcial**: Amarelo - atenção
- ❌ **Não comeu**: Vermelho - alerta

---

## 📱 Uso Mobile (Staff)

### Dicas de UX

1. **Uma mão só**: Todos os botões principais estão na parte inferior
2. **Botões grandes**: Fácil de tocar mesmo com luvas
3. **Feedback visual**: Cada ação mostra confirmação
4. **Cores intuitivas**: Cada tipo de ação tem sua cor
5. **Fotos grandes**: Fácil de visualizar o pet

### Workflow Típico

**Manhã (8h-10h):**
```
1. Chegar na creche
2. Fazer check-in dos pets (Admin/Staff)
3. Pets aparecem na lista do Staff
```

**Durante o dia:**
```
1. Pet come → Registrar alimentação → Foto
2. Brincadeira → Registrar atividade → Foto/vídeo
3. Observação → Registrar saúde
4. Momento fofo → Tirar foto avulsa
```

**Tarde (17h-19h):**
```
1. Tutor chega
2. Staff mostra timeline do dia
3. Check-out do pet
```

---

## 💡 Boas Práticas

### Para Staff

✅ **Fazer:**
- Registrar TODAS as refeições
- Tirar pelo menos 2-3 fotos por dia
- Registrar atividades logo após realizá-las
- Anotar qualquer comportamento diferente
- Ser descritivo nas observações

❌ **Evitar:**
- Deixar para registrar no final do dia
- Fotos desfocadas ou mal iluminadas
- Observações genéricas ("normal", "ok")
- Esquecer de pets mais quietos

### Para Tutores

✅ **Fazer:**
- Checar o app 2-3x ao dia
- Curtir/reagir às atualizações (futuro)
- Manter info de emergência atualizada
- Avisar mudanças na rotina do pet

### Para Admin

✅ **Fazer:**
- Manter cadastros atualizados
- Treinar staff no uso do app
- Monitorar estatísticas
- Coletar feedback dos tutores

---

## 🎯 Métricas de Sucesso

### Para a Creche

- **Satisfação dos tutores**: > 90%
- **Uso diário do staff**: > 80%
- **Fotos por pet/dia**: > 3
- **Tempo de registro**: < 30 segundos

### Para os Tutores

- **Transparência**: Ver tudo que acontece
- **Tranquilidade**: Saber que pet está bem
- **Conexão**: Ver fotos em tempo real
- **Confiança**: Profissionalismo da creche

---

## 🆘 Suporte

### Problemas Comuns

**Não consigo fazer login**
- Verifique email e senha
- Confirme que seu usuário foi criado
- Limpe cache do navegador

**Pets não aparecem**
- Verifique se fez check-in
- Recarregue a página
- Verifique conexão com internet

**Não consigo subir foto**
- Verifique tamanho (max 5MB)
- Formato: JPG, PNG, WEBP
- Verifique permissões de câmera

### Contato

- 📧 Email: suporte@crechecanina.com
- 📱 WhatsApp: (48) 99999-0000
- 💬 Chat no app (futuro)

---

## 🎓 Treinamento

### Para Novo Staff (15 min)

1. **Login** (2 min)
   - Como acessar
   - Navegação básica

2. **Check-in** (3 min)
   - Como registrar entrada
   - Verificar informações do pet

3. **Registros** (5 min)
   - Alimentação
   - Atividades
   - Saúde
   - Fotos

4. **Prática** (5 min)
   - Fazer registros de teste
   - Tirar fotos
   - Ver resultado na timeline

### Para Tutores (5 min)

1. **Acesso** (1 min)
   - Como fazer login
   - Salvar no celular

2. **Timeline** (2 min)
   - Como ver atualizações
   - Entender os ícones
   - Ver fotos

3. **Informações** (2 min)
   - Dados do pet
   - Contatos emergência
   - Histórico

---

## 🚀 Próximos Passos

1. ✅ **Hoje**: Explorar o sistema
2. 📝 **Amanhã**: Criar usuários de teste
3. 🎨 **Esta semana**: Personalizar cores/logo
4. 🚀 **Próxima semana**: Colocar em produção

---

**Dúvidas?** Veja os outros arquivos de documentação! 📚

