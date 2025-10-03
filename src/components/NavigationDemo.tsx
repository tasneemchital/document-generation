import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { 
  Users,
  Gear,
  Wrench,
  Globe,
  Files,
  FileText,
  Database,
  Eye,
  FolderOpen,
  Translate,
  PencilSimple,
  Lightning,
  Palette,
  BookOpen,
  Robot,
  Calendar,
  CheckCircle,
  Clock
} from '@phosphor-icons/react'

interface NavigationDemoProps {
  onNavigate: (page: string) => void
}

export function NavigationDemo({ onNavigate }: NavigationDemoProps) {
  const [selectedItem, setSelectedItem] = useState('')

  const handleNavigate = (pageId: string) => {
    setSelectedItem(pageId)
    onNavigate(pageId)
  }

  const categories = [
    {
      id: 'manage',
      title: 'Manage',
      subtitle: 'Core workflow tools',
      icon: Users,
      color: 'bg-blue-50 border-blue-200',
      iconColor: 'text-blue-600',
      titleColor: 'text-blue-900',
      items: [
        {
          id: 'collaborate',
          label: 'Collaborate',
          icon: Users,
          color: 'text-blue-600'
        },
        {
          id: 'generate',
          label: 'Generate', 
          icon: Lightning,
          color: 'text-blue-600'
        },
        {
          id: 'publish',
          label: 'Publish',
          icon: Globe,
          color: 'text-blue-600'
        },
        {
          id: 'translation-studio',
          label: 'Translation Studio',
          icon: Translate,
          color: 'text-blue-600'
        }
      ]
    },
    {
      id: 'configure',
      title: 'Configure',
      subtitle: 'Setup and templates',
      icon: Gear,
      color: 'bg-yellow-50 border-yellow-200',
      iconColor: 'text-yellow-600',
      titleColor: 'text-yellow-900',
      items: [
        {
          id: 'template',
          label: 'Global Template',
          icon: FileText,
          color: 'text-yellow-600'
        },
        {
          id: 'dcm',
          label: 'Digital Content Manager',
          icon: Database,
          color: 'text-yellow-600'
        },
        {
          id: 'masterlist',
          label: 'Collections',
          icon: FolderOpen,
          color: 'text-yellow-600'
        }
      ]
    },
    {
      id: 'other-tools',
      title: 'Other Tools',
      subtitle: 'Additional utilities',
      icon: Wrench,
      color: 'bg-pink-50 border-pink-200',
      iconColor: 'text-pink-600',
      titleColor: 'text-pink-900',
      items: [
        {
          id: 'design-studio',
          label: 'Design Studio',
          icon: Palette,
          color: 'text-pink-600'
        },
        {
          id: 'documents',
          label: 'Documents',
          icon: Files,
          color: 'text-pink-600'
        },
        {
          id: 'ask-benny',
          label: 'Ask Benny',
          icon: Robot,
          color: 'text-pink-600'
        }
      ]
    }
  ]

  return (
    <div className="p-8 space-y-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="text-center space-y-4">
        <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto">
          <BookOpen className="w-8 h-8 text-primary" />
        </div>
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-2">SimplifyDocs</h1>
          <p className="text-lg text-muted-foreground">
            Streamline your document management workflow
          </p>
        </div>
      </div>

      {/* Category Cards Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {categories.map((category) => (
          <Card 
            key={category.id} 
            className={`${category.color} border-2 transition-all duration-200 hover:shadow-lg`}
          >
            <CardHeader className="pb-4">
              <div className="flex items-center gap-3 mb-2">
                <div className={`w-10 h-10 rounded-xl bg-white/80 flex items-center justify-center`}>
                  <category.icon className={`w-5 h-5 ${category.iconColor}`} />
                </div>
                <div>
                  <CardTitle className={`text-lg ${category.titleColor}`}>
                    {category.title}
                  </CardTitle>
                  <p className={`text-sm ${category.titleColor}/70`}>
                    {category.subtitle}
                  </p>
                </div>
              </div>
            </CardHeader>
            <CardContent className="pt-0 space-y-2">
              {category.items.map((item) => (
                <div
                  key={item.id}
                  className={`flex items-center gap-3 p-3 rounded-lg bg-white/60 hover:bg-white/80 cursor-pointer transition-all duration-150 group ${
                    selectedItem === item.id ? 'bg-white shadow-sm' : ''
                  }`}
                  onClick={() => handleNavigate(item.id)}
                >
                  <div className="w-8 h-8 rounded-lg bg-white flex items-center justify-center group-hover:scale-110 transition-transform">
                    <item.icon className={`w-4 h-4 ${item.color}`} />
                  </div>
                  <span className={`font-medium ${category.titleColor} group-hover:${category.titleColor}`}>
                    {item.label}
                  </span>
                </div>
              ))}
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="bg-white border border-border">
          <CardContent className="p-6 text-center">
            <FileText className="w-8 h-8 text-blue-500 mx-auto mb-3" />
            <div className="text-3xl font-bold text-foreground mb-1">24</div>
            <div className="text-sm text-muted-foreground">Documents</div>
          </CardContent>
        </Card>
        <Card className="bg-white border border-border">
          <CardContent className="p-6 text-center">
            <Calendar className="w-8 h-8 text-green-500 mx-auto mb-3" />
            <div className="text-3xl font-bold text-foreground mb-1">12</div>
            <div className="text-sm text-muted-foreground">Active Rules</div>
          </CardContent>
        </Card>
        <Card className="bg-white border border-border">
          <CardContent className="p-6 text-center">
            <Users className="w-8 h-8 text-purple-500 mx-auto mb-3" />
            <div className="text-3xl font-bold text-foreground mb-1">8</div>
            <div className="text-sm text-muted-foreground">Collaborators</div>
          </CardContent>
        </Card>
        <Card className="bg-white border border-border">
          <CardContent className="p-6 text-center">
            <CheckCircle className="w-8 h-8 text-green-600 mx-auto mb-3" />
            <div className="text-3xl font-bold text-foreground mb-1">156</div>
            <div className="text-sm text-muted-foreground">Completed</div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity */}
      <Card className="bg-white border border-border">
        <CardHeader className="pb-4">
          <div className="flex items-center gap-2">
            <Clock className="w-5 h-5 text-green-500" />
            <CardTitle className="text-lg text-foreground">Recent Activity</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="pt-0 space-y-4">
          <div className="flex items-center justify-between py-3 border-b border-border last:border-b-0">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center">
                <FileText className="w-4 h-4 text-blue-600" />
              </div>
              <div>
                <div className="font-medium text-foreground">New rule created</div>
                <div className="text-sm text-muted-foreground">Product Documentation</div>
              </div>
            </div>
            <div className="text-sm text-muted-foreground">2m ago</div>
          </div>
          
          <div className="flex items-center justify-between py-3 border-b border-border last:border-b-0">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-green-50 flex items-center justify-center">
                <Files className="w-4 h-4 text-green-600" />
              </div>
              <div>
                <div className="font-medium text-foreground">Document generated</div>
                <div className="text-sm text-muted-foreground">Medicare EOC Report</div>
              </div>
            </div>
            <div className="text-sm text-muted-foreground">15m ago</div>
          </div>
          
          <div className="flex items-center justify-between py-3">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-purple-50 flex items-center justify-center">
                <Users className="w-4 h-4 text-purple-600" />
              </div>
              <div>
                <div className="font-medium text-foreground">Collaboration started</div>
                <div className="text-sm text-muted-foreground">Team Review Session</div>
              </div>
            </div>
            <div className="text-sm text-muted-foreground">1h ago</div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
