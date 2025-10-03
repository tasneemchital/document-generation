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
  Robot
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

      {/* Quick Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
          <CardContent className="p-4 text-center">
            <Files className="w-8 h-8 text-blue-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-blue-900">247</div>
            <div className="text-sm text-blue-700">Documents</div>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200">
          <CardContent className="p-4 text-center">
            <Database className="w-8 h-8 text-green-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-green-900">45</div>
            <div className="text-sm text-green-700">Active Rules</div>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
          <CardContent className="p-4 text-center">
            <Users className="w-8 h-8 text-purple-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-purple-900">12</div>
            <div className="text-sm text-purple-700">Team Members</div>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-br from-orange-50 to-orange-100 border-orange-200">
          <CardContent className="p-4 text-center">
            <Lightning className="w-8 h-8 text-orange-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-orange-900">89%</div>
            <div className="text-sm text-orange-700">Efficiency</div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
