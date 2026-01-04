-- =====================================================
-- SEED DATA - CRECHE CANINA
-- Execute este arquivo DEPOIS de criar os usuários no Supabase Auth
-- Substitua os UUIDs pelos IDs reais dos usuários criados
-- =====================================================

-- ⚠️ IMPORTANTE: Antes de executar, substitua os UUIDs abaixo pelos IDs reais
-- dos usuários que você criou no Supabase Authentication

-- =====================================================
-- PROFILES
-- =====================================================

-- Admin
INSERT INTO profiles (id, email, full_name, phone, role)
VALUES (
  'SUBSTITUA-PELO-UUID-DO-ADMIN',
  'admin@creche.com',
  'Maria Silva',
  '(48) 99999-1111',
  'admin'
);

-- Staff 1
INSERT INTO profiles (id, email, full_name, phone, role)
VALUES (
  'SUBSTITUA-PELO-UUID-DO-STAFF-1',
  'staff@creche.com',
  'João Santos',
  '(48) 99999-2222',
  'staff'
);

-- Staff 2
INSERT INTO profiles (id, email, full_name, phone, role)
VALUES (
  'SUBSTITUA-PELO-UUID-DO-STAFF-2',
  'carlos@creche.com',
  'Carlos Oliveira',
  '(48) 99999-3333',
  'staff'
);

-- Tutor 1
INSERT INTO profiles (id, email, full_name, phone, role)
VALUES (
  'SUBSTITUA-PELO-UUID-DO-TUTOR-1',
  'tutor@creche.com',
  'Ana Costa',
  '(48) 99999-4444',
  'tutor'
);

-- Tutor 2
INSERT INTO profiles (id, email, full_name, phone, role)
VALUES (
  'SUBSTITUA-PELO-UUID-DO-TUTOR-2',
  'pedro@gmail.com',
  'Pedro Almeida',
  '(48) 99999-5555',
  'tutor'
);

-- Tutor 3
INSERT INTO profiles (id, email, full_name, phone, role)
VALUES (
  'SUBSTITUA-PELO-UUID-DO-TUTOR-3',
  'julia@gmail.com',
  'Julia Fernandes',
  '(48) 99999-6666',
  'tutor'
);

-- =====================================================
-- PETS
-- =====================================================

-- Pet 1: Rex (Golden Retriever - Tutor 1)
INSERT INTO pets (
  name, breed, age, birth_date, tutor_id, status,
  allergies, behavior_notes, special_care,
  emergency_contact, emergency_phone,
  created_by
) VALUES (
  'Rex',
  'Golden Retriever',
  24,
  '2022-01-15',
  'SUBSTITUA-PELO-UUID-DO-TUTOR-1',
  'ativo',
  'Nenhuma alergia conhecida',
  'Muito brincalhão e sociável. Adora brincar de buscar bolinha.',
  'Precisa beber água frequentemente',
  'Ana Costa (Mãe)',
  '(48) 99999-4444',
  'SUBSTITUA-PELO-UUID-DO-ADMIN'
);

-- Pet 2: Luna (Poodle - Tutor 2)
INSERT INTO pets (
  name, breed, age, birth_date, tutor_id, status,
  allergies, medical_conditions, behavior_notes,
  emergency_contact, emergency_phone,
  created_by
) VALUES (
  'Luna',
  'Poodle',
  36,
  '2021-01-10',
  'SUBSTITUA-PELO-UUID-DO-TUTOR-2',
  'ativo',
  'Alérgica a frango',
  'Toma medicação para ansiedade',
  'Um pouco tímida no início, mas logo se acostuma. Não gosta de barulhos altos.',
  'Pedro Almeida',
  '(48) 99999-5555',
  'SUBSTITUA-PELO-UUID-DO-ADMIN'
);

-- Pet 3: Thor (Husky Siberiano - Tutor 3)
INSERT INTO pets (
  name, breed, age, birth_date, tutor_id, status,
  behavior_notes, special_care,
  emergency_contact, emergency_phone,
  created_by
) VALUES (
  'Thor',
  'Husky Siberiano',
  18,
  '2022-07-20',
  'SUBSTITUA-PELO-UUID-DO-TUTOR-3',
  'ativo',
  'Muito energético! Precisa de bastante exercício. Tenta "fugir" se vir a porta aberta.',
  'Não deixar sozinho perto de portas abertas. Precisa de muita atividade física.',
  'Julia Fernandes',
  '(48) 99999-6666',
  'SUBSTITUA-PELO-UUID-DO-ADMIN'
);

-- Pet 4: Mel (Vira-lata - Tutor 1)
INSERT INTO pets (
  name, breed, age, tutor_id, status,
  behavior_notes,
  emergency_contact, emergency_phone,
  created_by
) VALUES (
  'Mel',
  'Vira-lata (SRD)',
  12,
  'SUBSTITUA-PELO-UUID-DO-TUTOR-1',
  'ativo',
  'Muito dócil e calma. Se dá bem com todos os outros pets.',
  'Ana Costa',
  '(48) 99999-4444',
  'SUBSTITUA-PELO-UUID-DO-ADMIN'
);

-- =====================================================
-- CHECK-INS DE HOJE
-- =====================================================

-- Check-in Rex
INSERT INTO check_ins (
  pet_id,
  check_in_time,
  staff_check_in,
  notes
) VALUES (
  (SELECT id FROM pets WHERE name = 'Rex'),
  '08:30:00',
  'SUBSTITUA-PELO-UUID-DO-STAFF-1',
  'Chegou animado e já foi brincar'
);

-- Check-in Luna
INSERT INTO check_ins (
  pet_id,
  check_in_time,
  staff_check_in,
  notes
) VALUES (
  (SELECT id FROM pets WHERE name = 'Luna'),
  '09:00:00',
  'SUBSTITUA-PELO-UUID-DO-STAFF-1',
  'Um pouco tímida hoje'
);

-- Check-in Thor
INSERT INTO check_ins (
  pet_id,
  check_in_time,
  staff_check_in,
  notes
) VALUES (
  (SELECT id FROM pets WHERE name = 'Thor'),
  '07:45:00',
  'SUBSTITUA-PELO-UUID-DO-STAFF-2',
  'Chegou com muita energia como sempre'
);

-- =====================================================
-- LOGS DO DIA - REX
-- =====================================================

-- Rex - Alimentação Manhã
INSERT INTO daily_logs (
  pet_id,
  staff_id,
  log_time,
  log_type,
  feeding_status,
  feeding_notes
) VALUES (
  (SELECT id FROM pets WHERE name = 'Rex'),
  'SUBSTITUA-PELO-UUID-DO-STAFF-1',
  '09:00:00',
  'feeding',
  'tudo',
  'Comeu toda a ração com muito apetite! 🍽️'
);

-- Rex - Atividade
INSERT INTO daily_logs (
  pet_id,
  staff_id,
  log_time,
  log_type,
  activity_type,
  activity_duration,
  activity_notes
) VALUES (
  (SELECT id FROM pets WHERE name = 'Rex'),
  'SUBSTITUA-PELO-UUID-DO-STAFF-1',
  '10:30:00',
  'activity',
  'brincadeira',
  30,
  'Brincou de buscar a bolinha no pátio. Muito feliz e ativo! 🎾'
);

-- Rex - Saúde
INSERT INTO daily_logs (
  pet_id,
  staff_id,
  log_time,
  log_type,
  energy_level,
  stool_type,
  health_notes
) VALUES (
  (SELECT id FROM pets WHERE name = 'Rex'),
  'SUBSTITUA-PELO-UUID-DO-STAFF-2',
  '11:00:00',
  'health',
  'alta',
  'normal',
  'Muito ativo e saudável hoje! Fisiologia normal. 💙'
);

-- =====================================================
-- LOGS DO DIA - LUNA
-- =====================================================

-- Luna - Alimentação
INSERT INTO daily_logs (
  pet_id,
  staff_id,
  log_time,
  log_type,
  feeding_status,
  feeding_notes
) VALUES (
  (SELECT id FROM pets WHERE name = 'Luna'),
  'SUBSTITUA-PELO-UUID-DO-STAFF-1',
  '09:15:00',
  'feeding',
  'parcial',
  'Comeu metade da ração. Deixou um pouco no pote.'
);

-- Luna - Atividade (Descanso)
INSERT INTO daily_logs (
  pet_id,
  staff_id,
  log_time,
  log_type,
  activity_type,
  activity_duration,
  activity_notes
) VALUES (
  (SELECT id FROM pets WHERE name = 'Luna'),
  'SUBSTITUA-PELO-UUID-DO-STAFF-1',
  '10:00:00',
  'activity',
  'descanso',
  45,
  'Descansou na almofada preferida. Estava tranquila. 😴'
);

-- =====================================================
-- LOGS DO DIA - THOR
-- =====================================================

-- Thor - Alimentação
INSERT INTO daily_logs (
  pet_id,
  staff_id,
  log_time,
  log_type,
  feeding_status,
  feeding_notes
) VALUES (
  (SELECT id FROM pets WHERE name = 'Thor'),
  'SUBSTITUA-PELO-UUID-DO-STAFF-2',
  '08:00:00',
  'feeding',
  'tudo',
  'Devorou a ração em segundos! 😋'
);

-- Thor - Atividade (Passeio)
INSERT INTO daily_logs (
  pet_id,
  staff_id,
  log_time,
  log_type,
  activity_type,
  activity_duration,
  activity_notes
) VALUES (
  (SELECT id FROM pets WHERE name = 'Thor'),
  'SUBSTITUA-PELO-UUID-DO-STAFF-2',
  '10:00:00',
  'activity',
  'passeio',
  60,
  'Passeio longo para gastar energia. Correu muito! 🏃‍♂️'
);

-- Thor - Atividade (Treino)
INSERT INTO daily_logs (
  pet_id,
  staff_id,
  log_time,
  log_type,
  activity_type,
  activity_duration,
  activity_notes
) VALUES (
  (SELECT id FROM pets WHERE name = 'Thor'),
  'SUBSTITUA-PELO-UUID-DO-STAFF-1',
  '11:30:00',
  'activity',
  'treino',
  20,
  'Treino de comandos básicos. Está aprendendo rápido! 🎓'
);

-- =====================================================
-- NOTIFICAÇÕES
-- =====================================================

-- Notificação para Tutor 1 (Ana)
INSERT INTO notifications (
  user_id,
  pet_id,
  title,
  message,
  type
) VALUES (
  'SUBSTITUA-PELO-UUID-DO-TUTOR-1',
  (SELECT id FROM pets WHERE name = 'Rex'),
  '📸 Nova foto do Rex!',
  'Rex brincou muito hoje e está super feliz!',
  'info'
);

-- Notificação para Tutor 2 (Pedro)
INSERT INTO notifications (
  user_id,
  pet_id,
  title,
  message,
  type
) VALUES (
  'SUBSTITUA-PELO-UUID-DO-TUTOR-2',
  (SELECT id FROM pets WHERE name = 'Luna'),
  '🍽️ Luna comeu hoje',
  'Luna comeu parcialmente. Fique atento em casa.',
  'warning'
);

-- =====================================================
-- FIM DO SEED
-- =====================================================

-- Verificar dados inseridos
SELECT 'Profiles criados:' as tabela, COUNT(*) as total FROM profiles
UNION ALL
SELECT 'Pets criados:', COUNT(*) FROM pets
UNION ALL
SELECT 'Check-ins hoje:', COUNT(*) FROM check_ins WHERE check_in_date = CURRENT_DATE
UNION ALL
SELECT 'Logs hoje:', COUNT(*) FROM daily_logs WHERE log_date = CURRENT_DATE
UNION ALL
SELECT 'Notificações:', COUNT(*) FROM notifications;

-- ✅ Pronto! Seu banco está populado com dados de exemplo.

