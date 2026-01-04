import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import { Navbar } from '@/components/dashboard/navbar'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { 
  PlusCircle, 
  Search, 
  Dog, 
  Users, 
  Activity,
  UserPlus
} from 'lucide-react'
import Link from 'next/link'

export default async function AdminDashboard() {
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

  if (!profile || profile.role !== 'admin') {
    redirect('/login')
  }

  // Buscar pets ativos com informações do tutor
  const { data: pets } = await supabase
    .from('pets')
    .select(`
      *,
      tutor:profiles!pets_tutor_id_fkey(*)
    `)
    .eq('status', 'ativo')
    .order('name')

  // Buscar pets presentes hoje
  const today = new Date().toISOString().split('T')[0]
  const { data: checkInsToday } = await supabase
    .from('check_ins')
    .select('pet_id')
    .eq('check_in_date', today)
    .is('check_out_time', null)

  const presentPetIds = checkInsToday?.map(ci => ci.pet_id) || []

  // Estatísticas
  const { count: totalPets } = await supabase
    .from('pets')
    .select('*', { count: 'exact', head: true })
    .eq('status', 'ativo')

  const { count: totalTutors } = await supabase
    .from('profiles')
    .select('*', { count: 'exact', head: true })
    .eq('role', 'tutor')

  const { count: totalStaff } = await supabase
    .from('profiles')
    .select('*', { count: 'exact', head: true })
    .eq('role', 'staff')

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar profile={profile} />

      <main className="container mx-auto p-4 md:p-6 space-y-6">
        {/* Cabeçalho */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Dashboard Admin</h1>
            <p className="text-gray-600 mt-1">Gerencie pets, tutores e equipe</p>
          </div>
          <div className="flex gap-2">
            <Button className="gap-2">
              <PlusCircle className="w-4 h-4" />
              <span className="hidden sm:inline">Cadastrar Pet</span>
              <span className="sm:hidden">Pet</span>
            </Button>
            <Button variant="secondary" className="gap-2">
              <UserPlus className="w-4 h-4" />
              <span className="hidden sm:inline">Cadastrar Tutor</span>
              <span className="sm:hidden">Tutor</span>
            </Button>
          </div>
        </div>

        {/* Cards de Estatísticas */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">
                Pets Ativos
              </CardTitle>
              <Dog className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalPets || 0}</div>
              <p className="text-xs text-gray-500 mt-1">
                Cadastrados no sistema
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">
                Presentes Hoje
              </CardTitle>
              <Activity className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{presentPetIds.length}</div>
              <p className="text-xs text-gray-500 mt-1">
                Pets na creche agora
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">
                Tutores
              </CardTitle>
              <Users className="h-4 w-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalTutors || 0}</div>
              <p className="text-xs text-gray-500 mt-1">
                Clientes cadastrados
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">
                Equipe
              </CardTitle>
              <Users className="h-4 w-4 text-purple-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalStaff || 0}</div>
              <p className="text-xs text-gray-500 mt-1">
                Colaboradores ativos
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Busca e Filtros */}
        <Card>
          <CardHeader>
            <CardTitle>Pets Cadastrados</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex gap-2 mb-6">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Buscar por nome do pet ou tutor..."
                  className="pl-10"
                />
              </div>
            </div>

            {/* Lista de Pets */}
            <div className="space-y-3">
              {pets && pets.length > 0 ? (
                pets.map((pet: any) => (
                  <div
                    key={pet.id}
                    className="flex items-center gap-4 p-4 rounded-xl border bg-white hover:shadow-md transition-shadow"
                  >
                    <Avatar className="h-14 w-14">
                      <AvatarImage src={pet.photo_url} alt={pet.name} />
                      <AvatarFallback className="bg-primary/10 text-primary text-lg">
                        🐕
                      </AvatarFallback>
                    </Avatar>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-semibold text-gray-900">{pet.name}</h3>
                        {presentPetIds.includes(pet.id) && (
                          <Badge className="bg-green-500">Presente</Badge>
                        )}
                      </div>
                      <p className="text-sm text-gray-600">
                        {pet.breed || 'Raça não informada'}
                        {pet.age && ` • ${pet.age} meses`}
                      </p>
                      <p className="text-xs text-gray-500">
                        Tutor: {pet.tutor?.full_name || 'Não informado'}
                      </p>
                    </div>

                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        Ver Detalhes
                      </Button>
                      <Button variant="outline" size="sm">
                        Editar
                      </Button>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-12 text-gray-500">
                  <Dog className="h-12 w-12 mx-auto mb-3 opacity-20" />
                  <p>Nenhum pet cadastrado ainda</p>
                  <Button className="mt-4 gap-2">
                    <PlusCircle className="w-4 h-4" />
                    Cadastrar Primeiro Pet
                  </Button>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}

