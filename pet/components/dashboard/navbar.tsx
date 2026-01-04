'use client'

import { DogIcon, LogOut, Bell } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'
import { Profile } from '@/types/database.types'

interface NavbarProps {
  profile: Profile
}

export function Navbar({ profile }: NavbarProps) {
  const router = useRouter()
  const supabase = createClient()

  const handleLogout = async () => {
    await supabase.auth.signOut()
    router.push('/login')
    router.refresh()
  }

  const getRoleName = (role: string) => {
    const roles: Record<string, string> = {
      admin: 'Administrador',
      staff: 'Equipe',
      tutor: 'Tutor'
    }
    return roles[role] || role
  }

  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-white/80 backdrop-blur-sm">
      <div className="container flex h-16 items-center px-4">
        <div className="flex items-center gap-2">
          <div className="flex items-center justify-center w-10 h-10 bg-primary rounded-xl">
            <DogIcon className="w-6 h-6 text-white" />
          </div>
          <div className="hidden sm:block">
            <h2 className="text-lg font-bold text-gray-900">Creche Canina</h2>
            <p className="text-xs text-gray-500">{getRoleName(profile.role)}</p>
          </div>
        </div>

        <div className="ml-auto flex items-center gap-3">
          <Button variant="ghost" size="icon" className="relative">
            <Bell className="h-5 w-5" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full"></span>
          </Button>

          <div className="flex items-center gap-3">
            <div className="hidden md:block text-right">
              <p className="text-sm font-medium text-gray-900">{profile.full_name}</p>
              <p className="text-xs text-gray-500">{profile.email}</p>
            </div>
            <Avatar>
              <AvatarImage src={profile.avatar_url} alt={profile.full_name} />
              <AvatarFallback className="bg-primary text-white">
                {profile.full_name.split(' ').map(n => n[0]).join('').toUpperCase()}
              </AvatarFallback>
            </Avatar>
          </div>

          <Button variant="ghost" size="icon" onClick={handleLogout}>
            <LogOut className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </nav>
  )
}

