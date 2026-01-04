import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import { Navbar } from '@/components/dashboard/navbar'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { 
  UtensilsCrossed,
  Activity,
  Heart,
  Camera,
  Clock,
  CheckCircle2
} from 'lucide-react'

export default async function StaffDashboard() {
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

  if (!profile || profile.role !== 'staff') {
    redirect('/login')
  }

  // Buscar pets presentes hoje
  const today = new Date().toISOString().split('T')[0]
  
  const { data: checkInsToday } = await supabase
    .from('check_ins')
    .select(`
      *,
      pet:pets(
        *,
        tutor:profiles!pets_tutor_id_fkey(*)
      )
    `)
    .eq('check_in_date', today)
    .is('check_out_time', null)
    .order('check_in_time')

  // Buscar logs de hoje para ver quem já foi alimentado/teve atividade
  const { data: logsToday } = await supabase
    .from('daily_logs')
    .select('pet_id, log_type, created_at')
    .eq('log_date', today)

  // Organizar logs por pet
  const petLogsMap: Record<string, any[]> = {}
  logsToday?.forEach(log => {
    if (!petLogsMap[log.pet_id]) {
      petLogsMap[log.pet_id] = []
    }
    petLogsMap[log.pet_id].push(log)
  })

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar profile={profile} />

      <main className="container mx-auto p-4 md:p-6 space-y-6 max-w-4xl">
        {/* Cabeçalho */}
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Olá, {profile.full_name.split(' ')[0]}! 👋</h1>
          <p className="text-gray-600 mt-1">
            {checkInsToday?.length || 0} pets presentes hoje
          </p>
        </div>

        {/* Cards de Ação Rápida */}
        <div className="grid grid-cols-2 gap-3">
          <Card className="bg-gradient-to-br from-orange-50 to-orange-100 border-orange-200">
            <CardContent className="p-4 text-center">
              <UtensilsCrossed className="h-8 w-8 mx-auto mb-2 text-orange-600" />
              <p className="font-semibold text-orange-900">Alimentação</p>
              <p className="text-xs text-orange-700 mt-1">Registrar refeição</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200">
            <CardContent className="p-4 text-center">
              <Activity className="h-8 w-8 mx-auto mb-2 text-green-600" />
              <p className="font-semibold text-green-900">Atividade</p>
              <p className="text-xs text-green-700 mt-1">Registrar brincadeira</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
            <CardContent className="p-4 text-center">
              <Heart className="h-8 w-8 mx-auto mb-2 text-blue-600" />
              <p className="font-semibold text-blue-900">Saúde</p>
              <p className="text-xs text-blue-700 mt-1">Registrar observação</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
            <CardContent className="p-4 text-center">
              <Camera className="h-8 w-8 mx-auto mb-2 text-purple-600" />
              <p className="font-semibold text-purple-900">Foto</p>
              <p className="text-xs text-purple-700 mt-1">Tirar foto do dia</p>
            </CardContent>
          </Card>
        </div>

        {/* Lista de Pets Presentes */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="h-5 w-5 text-primary" />
              Pets Presentes Hoje
            </CardTitle>
          </CardHeader>
          <CardContent>
            {checkInsToday && checkInsToday.length > 0 ? (
              <div className="space-y-3">
                {checkInsToday.map((checkIn: any) => {
                  const pet = checkIn.pet
                  const petLogs = petLogsMap[pet.id] || []
                  const hasFeedingToday = petLogs.some(log => log.log_type === 'feeding')
                  const hasActivityToday = petLogs.some(log => log.log_type === 'activity')
                  
                  return (
                    <div
                      key={checkIn.id}
                      className="p-4 rounded-2xl border bg-white hover:shadow-md transition-all"
                    >
                      <div className="flex items-start gap-4 mb-3">
                        <Avatar className="h-16 w-16 ring-4 ring-primary/10">
                          <AvatarImage src={pet.photo_url} alt={pet.name} />
                          <AvatarFallback className="bg-primary/10 text-2xl">
                            🐕
                          </AvatarFallback>
                        </Avatar>

                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <h3 className="font-bold text-lg text-gray-900">{pet.name}</h3>
                            <Badge variant="outline" className="text-xs">
                              {checkIn.check_in_time.slice(0, 5)}
                            </Badge>
                          </div>
                          <p className="text-sm text-gray-600">
                            {pet.breed || 'Raça não informada'}
                          </p>
                          <p className="text-xs text-gray-500">
                            Tutor: {pet.tutor?.full_name}
                          </p>

                          {/* Status do Dia */}
                          <div className="flex gap-2 mt-2">
                            {hasFeedingToday && (
                              <Badge className="bg-orange-500 gap-1">
                                <CheckCircle2 className="h-3 w-3" />
                                Alimentado
                              </Badge>
                            )}
                            {hasActivityToday && (
                              <Badge className="bg-green-500 gap-1">
                                <CheckCircle2 className="h-3 w-3" />
                                Brincou
                              </Badge>
                            )}
                          </div>
                        </div>
                      </div>

                      {/* Botões de Ação - Mobile First */}
                      <div className="grid grid-cols-2 gap-2">
                        <Button 
                          variant={hasFeedingToday ? "outline" : "default"}
                          className="w-full gap-2 h-12"
                        >
                          <UtensilsCrossed className="h-4 w-4" />
                          Alimentar
                        </Button>
                        <Button 
                          variant={hasActivityToday ? "outline" : "default"}
                          className="w-full gap-2 h-12"
                        >
                          <Activity className="h-4 w-4" />
                          Atividade
                        </Button>
                        <Button variant="outline" className="w-full gap-2 h-12">
                          <Heart className="h-4 w-4" />
                          Saúde
                        </Button>
                        <Button variant="outline" className="w-full gap-2 h-12">
                          <Camera className="h-4 w-4" />
                          Foto
                        </Button>
                      </div>

                      {/* Observações Especiais */}
                      {(pet.allergies || pet.special_care || pet.behavior_notes) && (
                        <div className="mt-3 p-3 bg-amber-50 rounded-xl border border-amber-200">
                          <p className="text-xs font-semibold text-amber-900 mb-1">
                            ⚠️ Atenção Especial:
                          </p>
                          <div className="text-xs text-amber-800 space-y-1">
                            {pet.allergies && <p>• Alergias: {pet.allergies}</p>}
                            {pet.special_care && <p>• Cuidados: {pet.special_care}</p>}
                            {pet.behavior_notes && <p>• Comportamento: {pet.behavior_notes}</p>}
                          </div>
                        </div>
                      )}
                    </div>
                  )
                })}
              </div>
            ) : (
              <div className="text-center py-12 text-gray-500">
                <Clock className="h-12 w-12 mx-auto mb-3 opacity-20" />
                <p className="font-medium">Nenhum pet presente hoje</p>
                <p className="text-sm mt-1">Os pets aparecerão aqui após o check-in</p>
              </div>
            )}
          </CardContent>
        </Card>
      </main>
    </div>
  )
}

