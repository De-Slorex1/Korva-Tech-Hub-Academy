'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import {
  BarChart3, BookOpen, Users, FileText,
  Settings, Menu, X, LogOut, Bell, ClipboardList
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { createClient } from '@/lib/supabaseClient'

const navigationItems = [
  { name: 'Dashboard', href: '/instructor', icon: BarChart3 },
  { name: 'My Courses', href: '/instructor/courses', icon: BookOpen },
  { name: 'Students', href: '/instructor/students', icon: Users },
  { name: 'Assignments', href: '/instructor/assignments', icon: FileText },
  { name: 'Attendance', href: '/instructor/attendance', icon: ClipboardList },
  { name: 'Announcements', href: '/instructor/announcements', icon: Bell },
  { name: 'Settings', href: '/instructor/settings', icon: Settings },
]

type Profile = {
  first_name: string
  last_name: string
  role: string
  email: string
} | null

export default function InstructorShell({
  children,
  profile,
}: {
  children: React.ReactNode
  profile: Profile
}) {
  const pathname = usePathname()
  const router = useRouter()
  const [open, setOpen] = useState(false)

  const handleLogout = async () => {
    const supabase = createClient()
    await supabase.auth.signOut()
    router.push("/sign-in")
  }

  const SidebarContent = () => (
    <div className="flex flex-col h-full">
      {/* Logo */}
      <div className="p-6 border-b border-border">
        <Link href="/instructor" className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center">
            <span className="text-primary-foreground font-bold text-lg">K</span>
          </div>
          <div>
            <div className="font-bold text-foreground">Korva Tech Hub</div>
            <div className="text-xs text-muted-foreground">Instructor Portal</div>
          </div>
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto py-6 px-3">
        <div className="space-y-1">
          {navigationItems.map((item) => {
            const Icon = item.icon
            const isActive = pathname === item.href
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className={`flex items-center gap-3 px-4 py-2.5 rounded-lg transition-colors ${
                  isActive
                    ? 'bg-primary text-primary-foreground'
                    : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span className="text-sm font-medium">{item.name}</span>
              </Link>
            )
          })}
        </div>
      </nav>

      {/* Profile */}
      <div className="p-4 border-t border-border">
        <div className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-muted transition-colors">
          <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
            <span className="text-primary font-bold text-sm">
              {profile?.first_name?.[0]}{profile?.last_name?.[0]}
            </span>
          </div>
          <div className="flex-1 min-w-0">
            <div className="text-sm font-semibold text-foreground truncate">
              {profile?.first_name} {profile?.last_name}
            </div>
            <div className="text-xs text-muted-foreground capitalize">{profile?.role}</div>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center gap-1 text-xs text-muted-foreground hover:text-destructive transition-colors shrink-0"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  )

  return (
    <div className="min-h-screen bg-background flex">
      {/* Desktop Sidebar */}
      <div className="hidden lg:flex w-64 bg-card border-r border-border flex-col">
        <SidebarContent />
      </div>

      {/* Mobile Sidebar */}
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild className="lg:hidden">
          <Button variant="ghost" size="icon" className="fixed top-4 left-4 z-40">
            {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-64 p-0">
          <SidebarContent />
        </SheetContent>
      </Sheet>

      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        <div className="p-4 md:p-8">{children}</div>
      </main>
    </div>
  )
}