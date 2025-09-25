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
  Globe,
  CaretDown,
  CaretRight,
  FolderGear
} from '@phosphor-icons/react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import React, { useState } from 'react'

interface NavigationProps {
  currentPage: string
  onNavigate: (page: string) => void
  isCollapsed: boolean
}

interface NavigationItem {
  id: string
  label: string
  icon: any
  children?: NavigationItem[]
}

const navigationItems: NavigationItem[] = [
  { id: 'dashboard', label: 'Dashboard', icon: House },
  { 
    id: 'manage', 
    label: 'Manage', 
    icon: FolderGear,
    children: [
      { id: 'collaborate', label: 'Collaborate', icon: Users },
      { id: 'generate', label: 'Generate', icon: FilePdf },
      { id: 'publish', label: 'Publish', icon: Export },
      { id: 'translation-studio', label: 'Translation Studio', icon: Translate }
    ]
  },
  { id: 'template', label: 'Template', icon: File },
  { id: 'portfolio', label: 'Review', icon: Briefcase },
  { 
    id: 'global-content', 
    label: 'Create', 
    icon: Globe,
    children: [
      { id: 'dcm', label: 'Digital Content Manager', icon: FolderOpen },
      { id: 'global-template', label: 'Global Template', icon: Globe },
      { id: 'masterlist', label: 'Master List', icon: ListBullets }
    ]
  },
  { id: 'ask-benny', label: 'Ask Benny', icon: Robot },
  { id: 'admin-settings', label: 'Admin Settings', icon: Gear },
  { id: 'design-studio', label: 'Design Studio', icon: Palette }
]

export function Navigation({ currentPage, onNavigate, isCollapsed }: NavigationProps) {
  const [expandedItems, setExpandedItems] = useState<Set<string>>(() => {
    // Auto-expand parent items if a child is currently active
    const initialExpanded = new Set<string>()
    navigationItems.forEach(item => {
      if (item.children?.some(child => currentPage === child.id)) {
        initialExpanded.add(item.id)
      }
    })
    // Also expand global-content and manage by default
    initialExpanded.add('global-content')
    initialExpanded.add('manage')
    return initialExpanded
  })

  // Auto-expand parent when navigating to a child page
  React.useEffect(() => {
    navigationItems.forEach(item => {
      if (item.children?.some(child => currentPage === child.id)) {
        setExpandedItems(prev => new Set([...prev, item.id]))
      }
    })
  }, [currentPage])

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

  const renderNavigationItem = (item: NavigationItem, level = 0) => {
    const Icon = item.icon
    const isActive = currentPage === item.id
    const isExpanded = expandedItems.has(item.id)
    const hasChildren = item.children && item.children.length > 0
    const isChildActive = item.children?.some(child => currentPage === child.id)
    
    return (
      <li key={item.id}>
        <Button
          variant={isActive || isChildActive ? "default" : "ghost"}
          className={cn(
            "w-full justify-start h-9 transition-all duration-200",
            isActive || isChildActive
              ? "bg-primary text-primary-foreground hover:bg-primary/90" 
              : "hover:bg-muted text-muted-foreground hover:text-foreground",
            isCollapsed && "px-2",
            level > 0 && "ml-4 w-[calc(100%-1rem)]"
          )}
          onClick={() => {
            if (hasChildren && !isCollapsed) {
              toggleExpanded(item.id)
            } else if (!hasChildren) {
              onNavigate(item.id)
            }
          }}
        >
          <Icon size={18} className="shrink-0" />
          {!isCollapsed && (
            <>
              <span className="ml-3 truncate flex-1 text-left">{item.label}</span>
              {hasChildren && (
                isExpanded ? 
                  <CaretDown size={16} className="shrink-0" /> : 
                  <CaretRight size={16} className="shrink-0" />
              )}
            </>
          )}
        </Button>
        
        {hasChildren && !isCollapsed && isExpanded && (
          <ul className="mt-1 space-y-1">
            {item.children?.map(child => renderNavigationItem(child, level + 1))}
          </ul>
        )}
      </li>
    )
  }

  return (
    <aside className={cn(
      "bg-card border-r border-border transition-all duration-300 ease-in-out flex flex-col",
      isCollapsed ? "w-16" : "w-72"
    )}>      
      <nav className="flex-1 px-2 py-3">
        <ul className="space-y-1">
          {navigationItems.map((item) => renderNavigationItem(item))}
        </ul>
      </nav>
    </aside>
  )
}