import { 
  House, 
  FolderOpen, 
  Users, 
  FilePdf, 
  Export, 
  Gear, 
  Palette,
  Robot,
  ListBullets,
  File,
  Translate,
  Briefcase,
  Globe
} from '@phosphor-icons/react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

interface NavigationProps {
  currentPage: string
  onNavigate: (page: string) => void
  isCollapsed: boolean
}

const navigationItems = [
  { id: 'dashboard', label: 'Dashboard', icon: House },
  { id: 'global-template', label: 'Global Template', icon: Globe },
  { id: 'template', label: 'Template', icon: File },
  { id: 'translation-studio', label: 'Translation Studio', icon: Translate },
  { id: 'dcm', label: 'Digital Content Manager', icon: FolderOpen },
  { id: 'portfolio', label: 'Portfolio', icon: Briefcase },
  { id: 'global-content', label: 'Global Content', icon: Globe },
  { id: 'masterlist', label: 'Master List', icon: ListBullets },
  { id: 'collaborate', label: 'Collaborate', icon: Users },
  { id: 'generate', label: 'Generate', icon: FilePdf },
  { id: 'publish', label: 'Publish', icon: Export },
  { id: 'ask-benny', label: 'Ask Benny', icon: Robot },
  { id: 'admin-settings', label: 'Admin Settings', icon: Gear },
  { id: 'design-studio', label: 'Design Studio', icon: Palette }
]

export function Navigation({ currentPage, onNavigate, isCollapsed }: NavigationProps) {
  return (
    <aside className={cn(
      "bg-card border-r border-border transition-all duration-300 ease-in-out flex flex-col",
      isCollapsed ? "w-16" : "w-72"
    )}>      
      <nav className="flex-1 px-2 py-3">
        <ul className="space-y-1">
          {navigationItems.map((item) => {
            const Icon = item.icon
            const isActive = currentPage === item.id
            
            return (
              <li key={item.id}>
                <Button
                  variant={isActive ? "default" : "ghost"}
                  className={cn(
                    "w-full justify-start h-9 transition-all duration-200",
                    isActive 
                      ? "bg-primary text-primary-foreground hover:bg-primary/90" 
                      : "hover:bg-muted text-muted-foreground hover:text-foreground",
                    isCollapsed && "px-2"
                  )}
                  onClick={() => onNavigate(item.id)}
                >
                  <Icon size={18} className="shrink-0" />
                  {!isCollapsed && (
                    <span className="ml-3 truncate">{item.label}</span>
                  )}
                </Button>
              </li>
            )
          })}
        </ul>
      </nav>
    </aside>
  )
}