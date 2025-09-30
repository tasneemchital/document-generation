import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { 
  Globe,
  FolderOpen,
  FilePdf,
  Users,
  Plus,
  FileText,
  Robot,
  CaretDown,
  CheckCircle,
} from '@phosphor-icons/react'

interface NavigationDemoProps {
  onNavigate: (page: string) => void
}

export function NavigationDemo({ onNavigate }: NavigationDemoProps) {
  const [expandedSections, setExpandedSections] = useState<Set<string>>(new Set())
  const [selectedPage, setSelectedPage] = useState('dashboard')

  const toggleSection = (sectionId: string) => {
    setExpandedSections(prev => {
      const newSet = new Set(prev)
      if (newSet.has(sectionId)) {
        newSet.delete(sectionId)
      } else {
        newSet.add(sectionId)
      }
      return newSet
    })
  }

  const handleNavigate = (pageId: string) => {
    setSelectedPage(pageId)
    if (['dcm', 'generate', 'collaborate', 'documents', 'portfolio', 'translation-studio', 'masterlist', 'template'].includes(pageId)) {
      onNavigate(pageId)
    } else {
      console.log(`Demo: Selected ${pageId}`)
    }
  }

  const navigationItems = [
    {
      id: 'dashboard',
      label: 'Dashboard',
      description: 'Central overview and task management',
      icon: Globe,
      isSection: false
    },
    {
      id: 'create',
      label: 'Create',
      icon: Globe,
      isSection: true,
      items: [
        {
          id: 'dcm',
          label: 'Digital Content Manager',
          description: 'Manage content rules and templates',
          icon: FileText
        },
        {
          id: 'template',
          label: 'Global Template',  
          description: 'Document template management',
          icon: FilePdf
        },
        {
          id: 'masterlist',
          label: 'Collections',
          description: 'Master lists and data collections',
          icon: FolderOpen
        }
      ]
    },
    {
      id: 'manage',
      label: 'Manage',
      icon: Users,
      isSection: true,
      items: [
        {
          id: 'collaborate',
          label: 'Collaborate',
          description: 'Team collaboration tools',
          icon: Users
        },
        {
          id: 'generate',
          label: 'Generate',
          description: 'Generate documents and reports', 
          icon: FilePdf
        },
        {
          id: 'publish',
          label: 'Integrate',
          description: 'Integration and publishing tools',
          icon: Globe
        },
        {
          id: 'translation-studio',
          label: 'Translation Studio',
          description: 'Document translation management',
          icon: Globe
        }
      ]
    },
    {
      id: 'portfolio',
      label: 'Review',
      description: 'Review and manage portfolios',
      icon: FolderOpen,
      isSection: false
    },
    {
      id: 'documents',
      label: 'Documents',
      description: 'Document management and viewing',
      icon: FileText,
      isSection: false
    }
  ]

  // Create flattened items for grid layout
  const getGridItems = () => {
    const items: Array<{
      id: string
      label: string
      description: string
      icon: any
      category: string
    }> = []
    
    navigationItems.forEach(item => {
      if (item.isSection && item.items) {
        item.items.forEach(subItem => {
          items.push({
            ...subItem,
            category: item.label
          })
        })
      } else if (!item.isSection && item.description) {
        items.push({
          ...item,
          category: 'Main'
        })
      }
    })
    
    return items
  }

  const gridItems = getGridItems()

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="text-center space-y-2">
        <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto">
          <Globe className="w-6 h-6 text-primary" />
        </div>
        <h1 className="text-2xl font-bold text-foreground">SimplifyDocs</h1>
        <p className="text-muted-foreground">
          Streamline your document management workflow
        </p>
      </div>

      {/* Compact Grid Navigation */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3">
        {gridItems.map((item) => (
          <Card 
            key={item.id}
            className={`cursor-pointer transition-all duration-200 hover:shadow-md hover:scale-105 border-2 ${
              selectedPage === item.id 
                ? 'border-primary bg-primary/5' 
                : 'border-border/50 hover:border-primary/50'
            }`}
            onClick={() => handleNavigate(item.id)}
          >
            <CardContent className="p-3 text-center">
              <div className={`w-8 h-8 rounded-lg flex items-center justify-center mx-auto mb-2 ${
                selectedPage === item.id
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-primary/10 text-primary'
              }`}>
                <item.icon className="w-4 h-4" />
              </div>
              <h3 className="font-medium text-sm line-clamp-1 mb-1">{item.label}</h3>
              <p className="text-xs text-muted-foreground line-clamp-2 mb-1">{item.description}</p>
              <span className="text-xs text-primary font-medium">{item.category}</span>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Quick Stats Row */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <Card>
          <CardContent className="p-3 text-center">
            <FileText className="w-6 h-6 text-blue-500 mx-auto mb-1" />
            <div className="text-lg font-bold">24</div>
            <div className="text-xs text-muted-foreground">Documents</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-3 text-center">
            <Robot className="w-6 h-6 text-green-500 mx-auto mb-1" />
            <div className="text-lg font-bold">12</div>
            <div className="text-xs text-muted-foreground">Active Rules</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-3 text-center">
            <Users className="w-6 h-6 text-purple-500 mx-auto mb-1" />
            <div className="text-lg font-bold">8</div>
            <div className="text-xs text-muted-foreground">Collaborators</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-3 text-center">
            <CheckCircle className="w-6 h-6 text-emerald-500 mx-auto mb-1" />
            <div className="text-lg font-bold">156</div>
            <div className="text-xs text-muted-foreground">Completed</div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity */}
      <Card>
        <CardContent className="p-4">
          <h3 className="font-semibold mb-3 flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-primary" />
            Recent Activity
          </h3>
          <div className="space-y-2">
            <div className="flex items-center justify-between py-2 border-b border-border/50">
              <div className="flex items-center gap-3">
                <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center">
                  <FileText className="w-3 h-3 text-blue-600" />
                </div>
                <div>
                  <div className="text-sm font-medium">New rule created</div>
                  <div className="text-xs text-muted-foreground">Product Documentation</div>
                </div>
              </div>
              <div className="text-xs text-muted-foreground">2m ago</div>
            </div>
            <div className="flex items-center justify-between py-2 border-b border-border/50">
              <div className="flex items-center gap-3">
                <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center">
                  <FilePdf className="w-3 h-3 text-green-600" />
                </div>
                <div>
                  <div className="text-sm font-medium">Document generated</div>
                  <div className="text-xs text-muted-foreground">Medicare EOC Report</div>
                </div>
              </div>
              <div className="text-xs text-muted-foreground">15m ago</div>
            </div>
            <div className="flex items-center justify-between py-2">
              <div className="flex items-center gap-3">
                <div className="w-6 h-6 bg-purple-100 rounded-full flex items-center justify-center">
                  <Users className="w-3 h-3 text-purple-600" />
                </div>
                <div>
                  <div className="text-sm font-medium">Collaboration started</div>
                  <div className="text-xs text-muted-foreground">Team Review Session</div>
                </div>
              </div>
              <div className="text-xs text-muted-foreground">1h ago</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}