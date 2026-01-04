-- =====================================================
-- SCHEMA DO BANCO DE DADOS - CRECHE CANINA MVP
-- Supabase PostgreSQL
-- =====================================================

-- Extensões necessárias
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- =====================================================
-- ENUM TYPES
-- =====================================================

CREATE TYPE user_role AS ENUM ('admin', 'staff', 'tutor');
CREATE TYPE feeding_status AS ENUM ('tudo', 'parcial', 'nao_comeu');
CREATE TYPE activity_type AS ENUM ('brincadeira', 'descanso', 'treino', 'passeio', 'banho');
CREATE TYPE stool_type AS ENUM ('normal', 'mole', 'duro', 'diarreia');
CREATE TYPE energy_level AS ENUM ('alta', 'media', 'baixa', 'letargico');
CREATE TYPE pet_status AS ENUM ('ativo', 'inativo', 'suspenso');

-- =====================================================
-- TABELA: profiles
-- Estende auth.users do Supabase
-- =====================================================

CREATE TABLE profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    email TEXT UNIQUE NOT NULL,
    full_name TEXT NOT NULL,
    phone TEXT,
    avatar_url TEXT,
    role user_role NOT NULL DEFAULT 'tutor',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- =====================================================
-- TABELA: pets
-- Informações dos pets cadastrados
-- =====================================================

CREATE TABLE pets (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    breed TEXT,
    age INTEGER, -- idade em meses
    birth_date DATE,
    photo_url TEXT,
    tutor_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
    status pet_status DEFAULT 'ativo',
    
    -- Informações de saúde e comportamento
    allergies TEXT,
    medical_conditions TEXT,
    behavior_notes TEXT,
    special_care TEXT,
    
    -- Informações de contato emergencial
    emergency_contact TEXT,
    emergency_phone TEXT,
    veterinarian_name TEXT,
    veterinarian_phone TEXT,
    
    -- Metadados
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    created_by UUID REFERENCES profiles(id)
);

-- =====================================================
-- TABELA: daily_logs
-- Registros diários dos pets (coração do app)
-- =====================================================

CREATE TABLE daily_logs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    pet_id UUID NOT NULL REFERENCES pets(id) ON DELETE CASCADE,
    staff_id UUID NOT NULL REFERENCES profiles(id),
    log_date DATE NOT NULL DEFAULT CURRENT_DATE,
    log_time TIME NOT NULL DEFAULT CURRENT_TIME,
    
    -- Tipo de registro
    log_type TEXT NOT NULL, -- 'feeding', 'activity', 'health', 'general'
    
    -- Alimentação
    feeding_status feeding_status,
    feeding_notes TEXT,
    
    -- Atividades
    activity_type activity_type,
    activity_duration INTEGER, -- minutos
    activity_notes TEXT,
    
    -- Saúde/Fisiologia
    stool_type stool_type,
    energy_level energy_level,
    health_notes TEXT,
    
    -- Mídia
    photo_url TEXT,
    video_url TEXT,
    
    -- Observações gerais
    general_notes TEXT,
    
    -- Metadados
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- =====================================================
-- TABELA: check_ins
-- Controle de presença dos pets na creche
-- =====================================================

CREATE TABLE check_ins (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    pet_id UUID NOT NULL REFERENCES pets(id) ON DELETE CASCADE,
    check_in_date DATE NOT NULL DEFAULT CURRENT_DATE,
    check_in_time TIME NOT NULL,
    check_out_time TIME,
    staff_check_in UUID REFERENCES profiles(id),
    staff_check_out UUID REFERENCES profiles(id),
    notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    
    -- Constraint: um pet só pode ter um check-in ativo por dia
    UNIQUE(pet_id, check_in_date)
);

-- =====================================================
-- TABELA: notifications
-- Sistema de notificações para tutores
-- =====================================================

CREATE TABLE notifications (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
    pet_id UUID REFERENCES pets(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    message TEXT NOT NULL,
    type TEXT NOT NULL, -- 'info', 'warning', 'alert'
    is_read BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- =====================================================
-- ÍNDICES PARA PERFORMANCE
-- =====================================================

CREATE INDEX idx_pets_tutor ON pets(tutor_id);
CREATE INDEX idx_pets_status ON pets(status);
CREATE INDEX idx_daily_logs_pet ON daily_logs(pet_id);
CREATE INDEX idx_daily_logs_date ON daily_logs(log_date);
CREATE INDEX idx_daily_logs_pet_date ON daily_logs(pet_id, log_date);
CREATE INDEX idx_check_ins_pet ON check_ins(pet_id);
CREATE INDEX idx_check_ins_date ON check_ins(check_in_date);
CREATE INDEX idx_notifications_user ON notifications(user_id);
CREATE INDEX idx_profiles_role ON profiles(role);

-- =====================================================
-- FUNÇÕES E TRIGGERS
-- =====================================================

-- Função para atualizar updated_at automaticamente
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Triggers para updated_at
CREATE TRIGGER update_profiles_updated_at BEFORE UPDATE ON profiles
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_pets_updated_at BEFORE UPDATE ON pets
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_daily_logs_updated_at BEFORE UPDATE ON daily_logs
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_check_ins_updated_at BEFORE UPDATE ON check_ins
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- =====================================================
-- ROW LEVEL SECURITY (RLS)
-- =====================================================

-- Habilitar RLS em todas as tabelas
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE pets ENABLE ROW LEVEL SECURITY;
ALTER TABLE daily_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE check_ins ENABLE ROW LEVEL SECURITY;
ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;

-- Políticas para PROFILES
CREATE POLICY "Usuários podem ver seu próprio perfil"
    ON profiles FOR SELECT
    USING (auth.uid() = id);

CREATE POLICY "Admin e Staff podem ver todos os perfis"
    ON profiles FOR SELECT
    USING (
        EXISTS (
            SELECT 1 FROM profiles
            WHERE id = auth.uid() AND role IN ('admin', 'staff')
        )
    );

CREATE POLICY "Usuários podem atualizar seu próprio perfil"
    ON profiles FOR UPDATE
    USING (auth.uid() = id);

-- Políticas para PETS
CREATE POLICY "Tutores podem ver seus próprios pets"
    ON pets FOR SELECT
    USING (tutor_id = auth.uid());

CREATE POLICY "Admin e Staff podem ver todos os pets"
    ON pets FOR SELECT
    USING (
        EXISTS (
            SELECT 1 FROM profiles
            WHERE id = auth.uid() AND role IN ('admin', 'staff')
        )
    );

CREATE POLICY "Admin pode criar pets"
    ON pets FOR INSERT
    WITH CHECK (
        EXISTS (
            SELECT 1 FROM profiles
            WHERE id = auth.uid() AND role = 'admin'
        )
    );

CREATE POLICY "Admin pode atualizar pets"
    ON pets FOR UPDATE
    USING (
        EXISTS (
            SELECT 1 FROM profiles
            WHERE id = auth.uid() AND role = 'admin'
        )
    );

-- Políticas para DAILY_LOGS
CREATE POLICY "Tutores podem ver logs de seus pets"
    ON daily_logs FOR SELECT
    USING (
        EXISTS (
            SELECT 1 FROM pets
            WHERE pets.id = daily_logs.pet_id
            AND pets.tutor_id = auth.uid()
        )
    );

CREATE POLICY "Admin e Staff podem ver todos os logs"
    ON daily_logs FOR SELECT
    USING (
        EXISTS (
            SELECT 1 FROM profiles
            WHERE id = auth.uid() AND role IN ('admin', 'staff')
        )
    );

CREATE POLICY "Staff pode criar logs"
    ON daily_logs FOR INSERT
    WITH CHECK (
        EXISTS (
            SELECT 1 FROM profiles
            WHERE id = auth.uid() AND role IN ('admin', 'staff')
        )
    );

CREATE POLICY "Staff pode atualizar seus próprios logs"
    ON daily_logs FOR UPDATE
    USING (staff_id = auth.uid());

-- Políticas para CHECK_INS
CREATE POLICY "Todos podem ver check-ins"
    ON check_ins FOR SELECT
    USING (true);

CREATE POLICY "Staff pode criar check-ins"
    ON check_ins FOR INSERT
    WITH CHECK (
        EXISTS (
            SELECT 1 FROM profiles
            WHERE id = auth.uid() AND role IN ('admin', 'staff')
        )
    );

CREATE POLICY "Staff pode atualizar check-ins"
    ON check_ins FOR UPDATE
    USING (
        EXISTS (
            SELECT 1 FROM profiles
            WHERE id = auth.uid() AND role IN ('admin', 'staff')
        )
    );

-- Políticas para NOTIFICATIONS
CREATE POLICY "Usuários podem ver suas notificações"
    ON notifications FOR SELECT
    USING (user_id = auth.uid());

CREATE POLICY "Usuários podem atualizar suas notificações"
    ON notifications FOR UPDATE
    USING (user_id = auth.uid());

CREATE POLICY "Staff pode criar notificações"
    ON notifications FOR INSERT
    WITH CHECK (
        EXISTS (
            SELECT 1 FROM profiles
            WHERE id = auth.uid() AND role IN ('admin', 'staff')
        )
    );

-- =====================================================
-- VIEWS ÚTEIS
-- =====================================================

-- View: Pets presentes hoje
CREATE OR REPLACE VIEW pets_present_today AS
SELECT 
    p.*,
    ci.check_in_time,
    ci.check_out_time,
    pr.full_name as tutor_name,
    pr.phone as tutor_phone
FROM pets p
INNER JOIN check_ins ci ON p.id = ci.pet_id
INNER JOIN profiles pr ON p.tutor_id = pr.id
WHERE ci.check_in_date = CURRENT_DATE
AND ci.check_out_time IS NULL
AND p.status = 'ativo';

-- View: Resumo diário por pet
CREATE OR REPLACE VIEW daily_summary AS
SELECT 
    p.id as pet_id,
    p.name as pet_name,
    dl.log_date,
    COUNT(CASE WHEN dl.log_type = 'feeding' THEN 1 END) as feeding_count,
    COUNT(CASE WHEN dl.log_type = 'activity' THEN 1 END) as activity_count,
    COUNT(CASE WHEN dl.log_type = 'health' THEN 1 END) as health_count,
    COUNT(dl.photo_url) as photo_count
FROM pets p
LEFT JOIN daily_logs dl ON p.id = dl.pet_id
GROUP BY p.id, p.name, dl.log_date;

-- =====================================================
-- DADOS INICIAIS (OPCIONAL - PARA TESTES)
-- =====================================================

-- Inserir perfil admin (após criar usuário no Supabase Auth)
-- INSERT INTO profiles (id, email, full_name, role)
-- VALUES ('uuid-do-usuario-admin', 'admin@crechecanina.com', 'Admin Principal', 'admin');

