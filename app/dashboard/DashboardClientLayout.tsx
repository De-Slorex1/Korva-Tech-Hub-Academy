'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  BarChart3,
  BookOpen,
  Briefcase,
  Calendar,
  MessageSquare,
  Settings,
  Users,
  FileText,
  CreditCard,
  ChevronDown,
  Menu,
  X,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { mockUser } from '@/lib/mock-data'

const navigationItems = [
  {
    label: 'MY LEARNING',
    items: [
      { name: 'Dashboard', href: '/dashboard', icon: BarChart3 },
      { name: 'My Learning', href: '/dashboard/learning', icon: BookOpen },
      { name: 'Live Classes', href: '/dashboard/classes', icon: Calendar },
      { name: 'Assignments', href: '/dashboard/assignments', icon: FileText },
      { name: 'Projects', href: '/dashboard/projects', icon: Briefcase },
    ],
  },
  {
    label: 'COMMUNITY',
    items: [
      { name: 'Community', href: '/dashboard/community', icon: Users },
      { name: 'Mentor Support', href: '/dashboard/mentor', icon: MessageSquare },
      { name: 'Messages', href: '/dashboard/messages', icon: MessageSquare },
      { name: 'Announcements', href: '/dashboard/announcements', icon: Calendar },
    ],
  },
//   {
//     label: 'CAREER',
//     items: [
//       { name: 'Career Hub', href: '/dashboard/career', icon: Briefcase },
//       { name: 'Portfolio', href: '/dashboard/portfolio', icon: FileText },
//       { name: 'Job Opportunities', href: '/dashboard/jobs', icon: Briefcase },
//     ],
//   },
  {
    label: 'OTHERS',
    items: [
      { name: 'Certificates', href: '/dashboard/certificates', icon: FileText },
      { name: 'Billing', href: '/dashboard/billing', icon: CreditCard },
      { name: 'Settings', href: '/dashboard/settings', icon: Settings },
    ],
  },
]

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)

  const SidebarContent = () => (
    <div className="flex flex-col h-full">
      {/* Logo */}
      <div className="p-6 border-b border-border">
        <Link href="/dashboard" className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center">
            <span className="text-primary-foreground font-bold text-lg">K</span>
          </div>
          <div>
            <div className="font-bold text-foreground">Korva Tech Hub</div>
            <div className="text-xs text-muted-foreground">Tech Excellence</div>
          </div>
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto py-6">
        {navigationItems.map((section) => (
          <div key={section.label} className="mb-8 px-3">
            <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">
              {section.label}
            </h3>
            <div className="space-y-2">
              {section.items.map((item) => {
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
          </div>
        ))}
      </nav>

      {/* User Profile */}
      <div className="p-4 border-t border-border">
        <Link
          href="/dashboard/settings"
          className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-muted transition-colors"
        >
          <img
            src={mockUser.avatar}
            alt={mockUser.name}
            className="w-10 h-10 rounded-full"
          />
          <div className="flex-1 min-w-0">
            <div className="text-sm font-semibold text-foreground truncate">
              {mockUser.name}
            </div>
            <div className="text-xs text-muted-foreground">{mockUser.role}</div>
          </div>
        </Link>
      </div>

      {/* Upgrade Banner */}
      <div className="p-4 m-3 bg-gradient-to-r from-primary/20 to-accent/20 rounded-lg border border-primary/30">
        <div className="text-xs font-semibold text-primary mb-2">
          Unlock advanced features
        </div>
        <Button
          size="sm"
          className="w-full bg-primary hover:bg-primary/90"
        >
          Upgrade Plan
        </Button>
      </div>
    </div>
  )

  return (
    <div className="min-h-screen bg-background flex">
      {/* Desktop Sidebar */}
      <div className="hidden lg:flex w-64 bg-card border-r border-border">
        <SidebarContent />
      </div>

      {/* Mobile Sidebar */}
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild className="lg:hidden">
          <Button
            variant="ghost"
            size="icon"
            className="fixed top-4 left-4 z-40"
          >
            {open ? (
              <X className="w-5 h-5" />
            ) : (
              <Menu className="w-5 h-5" />
            )}
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
