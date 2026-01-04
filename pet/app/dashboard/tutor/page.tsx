import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import { Navbar } from '@/components/dashboard/navbar'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { 
  Heart,
  UtensilsCrossed,
  Activity,
  Camera,
  Clock,
  MapPin,
  Phone,
  AlertCircle
} from 'lucide-react'
import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'

export default async function TutorDashboard() {
  const supabase = await createClient()
  
  const { data: { user } } = await supabase.auth.getUser()
  
  if (!user) {
    redirect('/login')
  }

  const { data: profile } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .single()

  if (!profile || profile.role !== 'tutor') {
    redirect('/login')
  }

  // Buscar pets do tutor
  const { data: pets } = await supabase
    .from('pets')
    .select('*')
    .eq('tutor_id', user.id)
    .eq('status', 'ativo')

  const firstPet = pets?.[0]

  // Se não tiver pet, mostrar mensagem
  if (!firstPet) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar profile={profile} />
        <main className="container mx-auto p-4 max-w-2xl">
          <div className="text-center py-12">
            <h2 className="text-2xl font-bold mb-2">Nenhum pet cadastrado</h2>
            <p className="text-gray-600">Entre em contato com a creche para cadastrar seu pet</p>
          </div>
        </main>
      </div>
    )
  }

  // Verificar se está presente hoje
  const today = new Date().toISOString().split('T')[0]
  const { data: checkInToday } = await supabase
    .from('check_ins')
    .select('*')
    .eq('pet_id', firstPet.id)
    .eq('check_in_date', today)
    .is('check_out_time', null)
    .single()

  // Buscar logs de hoje
  const { data: logsToday } = await supabase
    .from('daily_logs')
    .select(`
      *,
      staff:profiles!daily_logs_staff_id_fkey(*)
    `)
    .eq('pet_id', firstPet.id)
    .eq('log_date', today)
    .order('created_at', { ascending: false })

  // Buscar logs dos últimos 7 dias para histórico
  const sevenDaysAgo = new Date()
  sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7)
  const { data: recentLogs } = await supabase
    .from('daily_logs')
    .select('*')
    .eq('pet_id', firstPet.id)
    .gte('log_date', sevenDaysAgo.toISOString().split('T')[0])
    .order('created_at', { ascending: false })
    .limit(20)

  const getLogIcon = (logType: string) => {
    switch (logType) {
      case 'feeding':
        return <UtensilsCrossed className="h-5 w-5" />
      case 'activity':
        return <Activity className="h-5 w-5" />
      case 'health':
        return <Heart className="h-5 w-5" />
      default:
        return <Camera className="h-5 w-5" />
    }
  }

  const getLogColor = (logType: string) => {
    switch (logType) {
      case 'feeding':
        return 'from-orange-500 to-orange-600'
      case 'activity':
        return 'from-green-500 to-green-600'
      case 'health':
        return 'from-blue-500 to-blue-600'
      default:
        return 'from-purple-500 to-purple-600'
    }
  }

  const getLogTitle = (log: any) => {
    switch (log.log_type) {
      case 'feeding':
        return log.feeding_status === 'tudo' 
          ? '🍽️ Comeu tudo!' 
          : log.feeding_status === 'parcial'
          ? '🍽️ Comeu parcialmente'
          : '🍽️ Não comeu'
      case 'activity':
        return `🎾 ${log.activity_type === 'brincadeira' ? 'Brincadeira' : log.activity_type === 'passeio' ? 'Passeio' : 'Atividade'}`
      case 'health':
        return '💙 Observação de Saúde'
      default:
        return '📸 Atualização'
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-cyan-50 via-blue-50 to-teal-50">
      <Navbar profile={profile} />

      <main className="container mx-auto p-4 max-w-2xl space-y-4 pb-20">
        {/* Header do Pet - Estilo Stories */}
        <Card className="overflow-hidden border-0 shadow-lg">
          <div className="relative h-32 bg-gradient-to-br from-primary via-cyan-500 to-teal-400">
            <div className="absolute inset-0 bg-black/10"></div>
          </div>
          <CardContent className="relative -mt-16 pb-6">
            <div className="flex items-end gap-4 mb-4">
              <Avatar className="h-24 w-24 ring-4 ring-white shadow-xl">
                <AvatarImage src={firstPet.photo_url} alt={firstPet.name} />
                <AvatarFallback className="bg-primary text-white text-3xl">
                  🐕
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 pb-2">
                <h2 className="text-2xl font-bold text-gray-900">{firstPet.name}</h2>
                <p className="text-gray-600">{firstPet.breed || 'Vira-lata'}</p>
              </div>
            </div>

            {/* Status */}
            <div className="flex items-center gap-2">
              {checkInToday ? (
                <Badge className="bg-green-500 gap-2 px-3 py-1.5">
                  <MapPin className="h-3.5 w-3.5" />
                  Na creche agora
                  <span className="text-xs opacity-90">
                    desde {checkInToday.check_in_time.slice(0, 5)}
                  </span>
                </Badge>
              ) : (
                <Badge variant="outline" className="gap-2 px-3 py-1.5">
                  <MapPin className="h-3.5 w-3.5" />
                  Não está na creche hoje
                </Badge>
              )}
            </div>

            {/* Informações de Emergência */}
            {firstPet.emergency_contact && (
              <div className="mt-4 p-3 bg-amber-50 rounded-xl border border-amber-200">
                <div className="flex items-center gap-2 text-amber-900 text-sm">
                  <Phone className="h-4 w-4" />
                  <span className="font-medium">Emergência:</span>
                  <span>{firstPet.emergency_contact} - {firstPet.emergency_phone}</span>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Timeline do Dia - Estilo Feed */}
        {checkInToday && (
          <>
            <div className="flex items-center gap-2 px-2">
              <h3 className="text-lg font-bold text-gray-900">Hoje na Creche</h3>
              <Badge variant="outline">{logsToday?.length || 0} atualizações</Badge>
            </div>

            {logsToday && logsToday.length > 0 ? (
              <div className="space-y-4">
                {logsToday.map((log: any) => (
                  <Card key={log.id} className="overflow-hidden border-0 shadow-md hover:shadow-lg transition-shadow">
                    {/* Header do Card - Estilo Story */}
                    <div className={`h-1 bg-gradient-to-r ${getLogColor(log.log_type)}`}></div>
                    
                    <CardContent className="p-5">
                      {/* Cabeçalho com hora e tipo */}
                      <div className="flex items-center gap-3 mb-4">
                        <div className={`p-2.5 rounded-xl bg-gradient-to-br ${getLogColor(log.log_type)} text-white`}>
                          {getLogIcon(log.log_type)}
                        </div>
                        <div className="flex-1">
                          <h4 className="font-bold text-gray-900">
                            {getLogTitle(log)}
                          </h4>
                          <div className="flex items-center gap-2 text-xs text-gray-500">
                            <Clock className="h-3 w-3" />
                            {format(new Date(`${log.log_date}T${log.log_time}`), 'HH:mm', { locale: ptBR })}
                            {log.staff && (
                              <>
                                <span>•</span>
                                <span>Por {log.staff.full_name.split(' ')[0]}</span>
                              </>
                            )}
                          </div>
                        </div>
                      </div>

                      {/* Foto se existir */}
                      {log.photo_url && (
                        <div className="mb-4 rounded-xl overflow-hidden">
                          <img 
                            src={log.photo_url} 
                            alt="Foto do momento"
                            className="w-full h-64 object-cover"
                          />
                        </div>
                      )}

                      {/* Detalhes específicos */}
                      <div className="space-y-2">
                        {log.feeding_notes && (
                          <p className="text-sm text-gray-700">
                            <span className="font-medium">Observação:</span> {log.feeding_notes}
                          </p>
                        )}
                        {log.activity_notes && (
                          <p className="text-sm text-gray-700">
                            <span className="font-medium">Atividade:</span> {log.activity_notes}
                            {log.activity_duration && ` (${log.activity_duration} min)`}
                          </p>
                        )}
                        {log.health_notes && (
                          <p className="text-sm text-gray-700">
                            <span className="font-medium">Saúde:</span> {log.health_notes}
                          </p>
                        )}
                        {log.general_notes && (
                          <p className="text-sm text-gray-700">{log.general_notes}</p>
                        )}

                        {/* Indicadores de saúde */}
                        {(log.energy_level || log.stool_type) && (
                          <div className="flex gap-2 mt-3">
                            {log.energy_level && (
                              <Badge variant="outline" className="text-xs">
                                Energia: {log.energy_level}
                              </Badge>
                            )}
                            {log.stool_type && (
                              <Badge variant="outline" className="text-xs">
                                Fisiologia: {log.stool_type}
                              </Badge>
                            )}
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <Card className="border-dashed">
                <CardContent className="p-8 text-center text-gray-500">
                  <Camera className="h-12 w-12 mx-auto mb-3 opacity-20" />
                  <p className="font-medium">Aguardando atualizações</p>
                  <p className="text-sm mt-1">
                    A equipe compartilhará fotos e informações ao longo do dia
                  </p>
                </CardContent>
              </Card>
            )}
          </>
        )}

        {/* Histórico Recente */}
        {!checkInToday && recentLogs && recentLogs.length > 0 && (
          <>
            <div className="flex items-center gap-2 px-2 mt-8">
              <h3 className="text-lg font-bold text-gray-900">Últimas Visitas</h3>
            </div>

            <div className="space-y-3">
              {recentLogs.slice(0, 5).map((log: any) => (
                <Card key={log.id} className="border-0 shadow-sm">
                  <CardContent className="p-4 flex items-center gap-3">
                    <div className={`p-2 rounded-lg bg-gradient-to-br ${getLogColor(log.log_type)} text-white`}>
                      {getLogIcon(log.log_type)}
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-sm text-gray-900">
                        {getLogTitle(log)}
                      </p>
                      <p className="text-xs text-gray-500">
                        {format(new Date(log.log_date), "dd 'de' MMMM", { locale: ptBR })}
                      </p>
                    </div>
                    {log.photo_url && (
                      <div className="w-12 h-12 rounded-lg overflow-hidden">
                        <img src={log.photo_url} alt="" className="w-full h-full object-cover" />
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </>
        )}

        {/* Informações do Pet */}
        {(firstPet.allergies || firstPet.medical_conditions || firstPet.behavior_notes) && (
          <Card className="border-amber-200 bg-amber-50/50">
            <CardContent className="p-5">
              <div className="flex items-center gap-2 mb-3">
                <AlertCircle className="h-5 w-5 text-amber-600" />
                <h3 className="font-bold text-amber-900">Informações Importantes</h3>
              </div>
              <div className="space-y-2 text-sm text-amber-900">
                {firstPet.allergies && (
                  <p><span className="font-medium">Alergias:</span> {firstPet.allergies}</p>
                )}
                {firstPet.medical_conditions && (
                  <p><span className="font-medium">Condições médicas:</span> {firstPet.medical_conditions}</p>
                )}
                {firstPet.behavior_notes && (
                  <p><span className="font-medium">Comportamento:</span> {firstPet.behavior_notes}</p>
                )}
              </div>
            </CardContent>
          </Card>
        )}
      </main>
    </div>
  )
}

