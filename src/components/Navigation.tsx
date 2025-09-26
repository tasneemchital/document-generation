import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { 
  House, 
  FilePdf, 
  Gear, 
  File,
  Robot,
  ListBullets,
  Translate,
  Briefcase,
  Globe,
  CaretDown,
  CaretRight,
  FolderGear,
  PaintBrush,
  Users,
  Sparkle,
  Plus,
  FileText
} from '@phosphor-icons/react'
import { cn } from '@/lib/utils'

interface NavigationItem {
  id: string
  label: string
  icon: React.ComponentType<any>
  children?: NavigationItem[]
}

interface NavigationProps {
  currentPage: string
  onNavigate: (page: string) => void
  isCollapsed: boolean
}

const navigationItems: NavigationItem[] = [
  { id: 'dashboard', label: 'Dashboard', icon: House },
  { 
    id: 'manage', 
    label: 'Manage', 
    icon: FolderGear,
    children: [
      { id: 'global-template', label: 'Global Template', icon: FilePdf },
    ]
  },
  { id: 'template', label: 'Template', icon: File },
  { id: 'design-studio', label: 'Design Studio', icon: PaintBrush },
  { id: 'translation-studio', label: 'Translation Studio', icon: Translate },
  { id: 'documents', label: 'Documents', icon: FileText },
  { id: 'portfolio', label: 'Review', icon: Briefcase },
  { 
    id: 'global-content', 
    label: 'Global Content', 
    icon: Globe,
    children: [
      { id: 'dcm', label: 'Digital Content Manager', icon: File },
      { id: 'masterlist', label: 'Collections', icon: ListBullets },
    ]
  },
  { id: 'collaborate', label: 'Collaborate', icon: Users },
  { id: 'generate', label: 'Generate', icon: Sparkle },
  { id: 'publish', label: 'Publish', icon: Plus },
  { id: 'ask-benny', label: 'Ask Benny', icon: Robot },
  { id: 'admin-settings', label: 'Admin Settings', icon: Gear },
]

interface NavigationItemComponentProps {
  item: NavigationItem
  currentPage: string
  onNavigate: (page: string) => void
  isCollapsed: boolean
  level?: number
}

function NavigationItemComponent({ 
  item, 
  currentPage, 
  onNavigate, 
  isCollapsed, 
  level = 0 
}: NavigationItemComponentProps) {
  const [expandedItems, setExpandedItems] = useState<Set<string>>(new Set())
  
  const toggleExpanded = (itemId: string) => {
    setExpandedItems(prev => {
      const newSet = new Set(prev)
      if (newSet.has(itemId)) {
        newSet.delete(itemId)
      } else {
        newSet.add(itemId)
      }
      return newSet
    })
  }

  const hasChildren = item.children && item.children.length > 0
  const isActive = currentPage === item.id
  const isExpanded = expandedItems.has(item.id)
  const isChildActive = item.children?.some(child => currentPage === child.id)

  const Icon = item.icon

  return (
    <li>
      <Button
        variant="ghost"
        className={cn(
          "w-full justify-start font-normal transition-colors",
          isActive || isChildActive 
            ? "bg-primary text-primary-foreground hover:bg-primary/90" 
            : "hover:bg-muted text-muted-foreground hover:text-foreground",
          level > 0 && "ml-4 w-[calc(100%-1rem)]",
          isCollapsed && "px-2"
        )}
        onClick={() => {
          if (hasChildren) {
            toggleExpanded(item.id)
          } else {
            onNavigate(item.id)
          }
        }}
      >
        <Icon size={18} className="shrink-0" />
        {!isCollapsed && (
          <>
            <span className="ml-2 truncate">{item.label}</span>
            {hasChildren && (
              <div className="ml-auto">
                {isExpanded ? (
                  <CaretDown size={16} className="shrink-0" />
                ) : (
                  <CaretRight size={16} className="shrink-0" />
                )}
              </div>
            )}
          </>
        )}
      </Button>
      
      {hasChildren && isExpanded && !isCollapsed && (
        <ul className="mt-1 space-y-1">
          {item.children?.map((child) => (
            <NavigationItemComponent
              key={child.id}
              item={child}
              currentPage={currentPage}
              onNavigate={onNavigate}
              isCollapsed={isCollapsed}
              level={level + 1}
            />
          ))}
        </ul>
      )}
    </li>
  )
}

export function Navigation({ currentPage, onNavigate, isCollapsed }: NavigationProps) {
  return (
    <aside className={cn(
      "bg-card border-r border-border transition-all duration-300",
      isCollapsed ? "w-16" : "w-64"
    )}>
      <nav className="p-4">
        <ul className="space-y-2">
          {navigationItems.map((item) => (
            <NavigationItemComponent
              key={item.id}
              item={item}
              currentPage={currentPage}
              onNavigate={onNavigate}
              isCollapsed={isCollapsed}
            />
          ))}
        </ul>
      </nav>
    </aside>
  )
}