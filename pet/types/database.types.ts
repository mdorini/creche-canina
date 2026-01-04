export type UserRole = 'admin' | 'staff' | 'tutor'
export type FeedingStatus = 'tudo' | 'parcial' | 'nao_comeu'
export type ActivityType = 'brincadeira' | 'descanso' | 'treino' | 'passeio' | 'banho'
export type StoolType = 'normal' | 'mole' | 'duro' | 'diarreia'
export type EnergyLevel = 'alta' | 'media' | 'baixa' | 'letargico'
export type PetStatus = 'ativo' | 'inativo' | 'suspenso'

export interface Profile {
  id: string
  email: string
  full_name: string
  phone?: string
  avatar_url?: string
  role: UserRole
  created_at: string
  updated_at: string
}

export interface Pet {
  id: string
  name: string
  breed?: string
  age?: number
  birth_date?: string
  photo_url?: string
  tutor_id: string
  status: PetStatus
  allergies?: string
  medical_conditions?: string
  behavior_notes?: string
  special_care?: string
  emergency_contact?: string
  emergency_phone?: string
  veterinarian_name?: string
  veterinarian_phone?: string
  created_at: string
  updated_at: string
  created_by?: string
  tutor?: Profile
}

export interface DailyLog {
  id: string
  pet_id: string
  staff_id: string
  log_date: string
  log_time: string
  log_type: string
  feeding_status?: FeedingStatus
  feeding_notes?: string
  activity_type?: ActivityType
  activity_duration?: number
  activity_notes?: string
  stool_type?: StoolType
  energy_level?: EnergyLevel
  health_notes?: string
  photo_url?: string
  video_url?: string
  general_notes?: string
  created_at: string
  updated_at: string
  pet?: Pet
  staff?: Profile
}

export interface CheckIn {
  id: string
  pet_id: string
  check_in_date: string
  check_in_time: string
  check_out_time?: string
  staff_check_in?: string
  staff_check_out?: string
  notes?: string
  created_at: string
  updated_at: string
  pet?: Pet
}

export interface Notification {
  id: string
  user_id: string
  pet_id?: string
  title: string
  message: string
  type: string
  is_read: boolean
  created_at: string
  pet?: Pet
}

