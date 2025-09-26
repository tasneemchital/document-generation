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

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="text-center space-y-2">
        <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
          <Globe className="w-8 h-8 text-primary" />
        </div>
        <h1 className="text-3xl font-bold text-foreground">SimplifyDocs</h1>
        <p className="text-muted-foreground text-lg">
          Streamline your document management workflow
        </p>
      </div>

      {/* Navigation Cards */}
      <div className="space-y-4">
        {navigationItems.map((item) => (
          <div key={item.id} className="space-y-2">
            {item.isSection ? (
              <>
                <Button
                  variant="ghost"
                  className="w-full justify-between h-auto p-4 border border-border/50 hover:border-primary/50"
                  onClick={() => toggleSection(item.id)}
                >
                  <div className="flex items-center space-x-3">
                    <item.icon className="w-5 h-5 text-primary" />
                    <span className="font-medium">{item.label}</span>
                  </div>
                  <CaretDown 
                    className={`w-4 h-4 transition-transform ${
                      expandedSections.has(item.id) ? 'rotate-180' : ''
                    }`} 
                  />
                </Button>
                
                {expandedSections.has(item.id) && item.items && (
                  <div className="ml-4 space-y-2">
                    {item.items.map((subItem) => (
                      <Button
                        key={subItem.id}
                        variant={selectedPage === subItem.id ? "default" : "ghost"}
                        className="w-full justify-start h-auto p-4 border border-border/30"
                        onClick={() => handleNavigate(subItem.id)}
                      >
                        <div className="flex items-center space-x-3 text-left">
                          <subItem.icon className="w-4 h-4 flex-shrink-0" />
                          <div>
                            <div className="font-medium">{subItem.label}</div>
                            <div className="text-xs text-muted-foreground">
                              {subItem.description}
                            </div>
                          </div>
                        </div>
                      </Button>
                    ))}
                  </div>
                )}
              </>
            ) : (
              <Button
                key={item.id}
                variant={selectedPage === item.id ? "default" : "ghost"}
                className="w-full justify-start h-auto p-4 border border-border/50 hover:border-primary/50"
                onClick={() => handleNavigate(item.id)}
              >
                <div className="flex items-center space-x-3 text-left">
                  <item.icon className="w-5 h-5 flex-shrink-0" />
                  <div>
                    <div className="font-medium">{item.label}</div>
                    <div className="text-xs text-muted-foreground">
                      {item.description}
                    </div>
                  </div>
                </div>
              </Button>
            )}
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <Card>
        <CardContent className="p-4">
          <h3 className="font-semibold mb-3">Quick Actions</h3>
          <div className="grid grid-cols-2 gap-3">
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => handleNavigate('dcm')}
              className="h-auto p-3 flex flex-col items-center gap-2"
            >
              <Plus className="w-4 h-4" />
              <span className="text-xs">New Rule</span>
            </Button>
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => handleNavigate('generate')}
              className="h-auto p-3 flex flex-col items-center gap-2"
            >
              <FilePdf className="w-4 h-4" />
              <span className="text-xs">Generate</span>
            </Button>
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => handleNavigate('collaborate')}
              className="h-auto p-3 flex flex-col items-center gap-2"
            >
              <Users className="w-4 h-4" />
              <span className="text-xs">Collaborate</span>
            </Button>
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => handleNavigate('documents')}
              className="h-auto p-3 flex flex-col items-center gap-2"
            >
              <FileText className="w-4 h-4" />
              <span className="text-xs">Documents</span>
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Feature Status */}
      <Card>
        <CardContent className="p-4">
          <h3 className="font-semibold mb-3 flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-green-500" />
            Available Features
          </h3>
          <div className="text-sm text-muted-foreground space-y-1">
            <div>✅ Digital Content Manager</div>
            <div>✅ Documents Viewer</div>
            <div>✅ Generate Module</div> 
            <div>✅ Collaborate Module</div>
            <div>✅ Portfolio/Review</div>
            <div>✅ Translation Studio</div>
            <div>✅ Global Template</div>
            <div>✅ Collections (Master Lists)</div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}