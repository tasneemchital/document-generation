import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { 
  House, 
  Globe,
  Briefcase,
  FolderGear,
  File,
  FilePdf,
  ListBullets,
  Users,
  Sparkle,
  Plus,
  Translate,
  FileText,
  PaintBrush,
  Robot,
  Gear,
  CaretDown,
  CaretRight,
  CheckCircle,
  ArrowRight
} from '@phosphor-icons/react'
import { cn } from '@/lib/utils'

interface NavigationDemoProps {
  onNavigate?: (page: string) => void
}

export function NavigationDemo({ onNavigate }: NavigationDemoProps) {
  const [expandedSections, setExpandedSections] = useState(new Set(['create', 'manage']))
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

  const handlePageSelect = (pageId: string) => {
    setSelectedPage(pageId)
    // For demo purposes, show the actual page for key features
    if (['dcm', 'generate', 'collaborate', 'documents', 'portfolio', 'template', 'masterlist', 'translation-studio', 'publish'].includes(pageId)) {
      onNavigate?.(pageId)
    } else if (pageId === 'real-dashboard') {
      onNavigate?.('real-dashboard')
    } else {
      // For other items, stay in demo mode but highlight selection
      console.log(`Demo: Selected ${pageId}`)
    }
  }

  // Navigation structure demonstration
  const navigationStructure = [
    {
      id: 'dashboard',
      label: 'Dashboard',
      icon: House,
      description: 'Central overview and task management',
      features: ['Work queue management', 'Activity tracking', 'Quick stats', 'Navigation tiles']
    },
    {
      id: 'create',
      label: 'Create',
      icon: Globe,
      description: 'Content creation and management tools',
      isSection: true,
      children: [
        {
          id: 'dcm',
          label: 'Digital Content Manager',
          icon: File,
          description: 'Rule-based content management system',
          features: ['Rule creation & editing', 'AI-powered conditions', 'Template management', 'Version control']
        },
        {
          id: 'global-template',
          label: 'Global Template',
          icon: FilePdf,
          description: 'Master template management',
          features: ['Template library', 'Cross-reference management', 'Standardization', 'Global updates']
        },
        {
          id: 'masterlist',
          label: 'Collections',
          icon: ListBullets,
          description: 'Master lists and data collections',
          features: ['Cascade collections', 'Mapping collections', 'Certificates & specs', 'Integration collections']
        }
      ]
    },
    {
      id: 'portfolio',
      label: 'Review',
      icon: Briefcase,
      description: 'Portfolio and document review management',
      features: ['Smart search', 'Product filtering', 'Status tracking', 'Portfolio details']
    },
    {
      id: 'template',
      label: 'Template',
      icon: File,
      description: 'Rich text document editing with rule integration',
      features: ['WYSIWYG editor', 'Rule embedding', 'Multi-language support', 'Real-time preview']
    },
    {
      id: 'design-studio',
      label: 'Design Studio',
      icon: PaintBrush,
      description: 'Visual design and customization tools',
      features: ['Layout design', 'Branding', 'Visual themes', 'Asset management']
    },
    {
      id: 'manage',
      label: 'Manage',
      icon: FolderGear,
      description: 'Workflow and process management tools',
      isSection: true,
      children: [
        {
          id: 'collaborate',
          label: 'Collaborate',
          icon: Users,
          description: 'Team collaboration with grid/card layouts',
          features: ['Multi-view support', 'Review workflows', 'User management', 'Activity logs']
        },
        {
          id: 'generate',
          label: 'Generate',
          icon: Sparkle,
          description: 'Document generation with collateral selection',
          features: ['Multi-format output', 'Batch processing', 'Smart filters', 'Queue management']
        },
        {
          id: 'publish',
          label: 'Publish',
          icon: Plus,
          description: 'Content publishing and distribution',
          features: ['JSON management', 'Audit trails', 'Global filters', 'Publish tracking']
        },
        {
          id: 'translation-studio',
          label: 'Translation Studio',
          icon: Translate,
          description: 'Multi-language translation workflows',
          features: ['Document queuing', 'Status tracking', 'Language management', 'Audit trails']
        }
      ]
    },
    {
      id: 'documents',
      label: 'Documents',
      icon: FileText,
      description: 'Document library with viewer capabilities',
      features: ['Document viewer', 'Multi-language support', 'Search & filter', 'Hierarchical navigation']
    },
    {
      id: 'ask-benny',
      label: 'Ask Benny',
      icon: Robot,
      description: 'AI-powered assistance',
      features: ['Natural language queries', 'Smart suggestions', 'Context awareness', 'Learning capabilities']
    },
    {
      id: 'admin-settings',
      label: 'Admin Settings',
      icon: Gear,
      description: 'System configuration and administration',
      features: ['User management', 'System settings', 'Security config', 'Integration setup']
    }
  ]

  const getStatusColor = (itemId: string) => {
    // Different status colors for demonstration
    const colors = {
      'dashboard': 'bg-green-100 text-green-800',
      'dcm': 'bg-blue-100 text-blue-800',
      'generate': 'bg-purple-100 text-purple-800',
      'collaborate': 'bg-orange-100 text-orange-800',
      'documents': 'bg-indigo-100 text-indigo-800'
    }
    return colors[itemId as keyof typeof colors] || 'bg-gray-100 text-gray-800'
  }

  const renderNavigationItem = (item: any, level = 0) => {
    const Icon = item.icon
    const isExpanded = expandedSections.has(item.id)
    const isSelected = selectedPage === item.id
    const hasChildren = item.children && item.children.length > 0

    return (
      <div key={item.id} className="space-y-1">
        <Card 
          className={cn(
            "cursor-pointer transition-all duration-200 hover:shadow-md",
            isSelected ? "ring-2 ring-primary shadow-md bg-primary/5" : "hover:bg-muted/50",
            level > 0 && "ml-6"
          )}
          onClick={() => {
            if (hasChildren) {
              toggleSection(item.id)
            } else {
              handlePageSelect(item.id)
            }
          }}
        >
          <CardContent className="p-4">
            <div className="flex items-start justify-between">
              <div className="flex items-start gap-3 flex-1">
                <div className={cn(
                  "flex items-center justify-center w-10 h-10 rounded-lg",
                  isSelected ? "bg-primary text-primary-foreground" : "bg-muted"
                )}>
                  <Icon size={20} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="font-semibold text-foreground">{item.label}</h3>
                    {!hasChildren && (
                      <Badge className={cn("text-xs", getStatusColor(item.id))}>
                        Active
                      </Badge>
                    )}
                    {hasChildren && (
                      <Badge variant="outline" className="text-xs">
                        {item.children?.length} items
                      </Badge>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground mb-3">
                    {item.description}
                  </p>
                  {item.features && (
                    <div className="flex flex-wrap gap-1">
                      {item.features.slice(0, 3).map((feature: string, index: number) => (
                        <Badge key={index} variant="secondary" className="text-xs hover:bg-primary/20 cursor-pointer transition-colors">
                          {feature}
                        </Badge>
                      ))}
                      {item.features.length > 3 && (
                        <Badge variant="outline" className="text-xs hover:bg-muted cursor-pointer transition-colors">
                          +{item.features.length - 3} more
                        </Badge>
                      )}
                    </div>
                  )}
                </div>
              </div>
              <div className="flex items-center gap-2 ml-3">
                {!hasChildren && (
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-8 w-8 p-0"
                    onClick={(e) => {
                      e.stopPropagation()
                      handlePageSelect(item.id)
                    }}
                  >
                    <ArrowRight size={16} />
                  </Button>
                )}
                {hasChildren && (
                  <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                    {isExpanded ? <CaretDown size={16} /> : <CaretRight size={16} />}
                  </Button>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        {hasChildren && isExpanded && (
          <div className="space-y-1 ml-4">
            {item.children.map((child: any) => renderNavigationItem(child, level + 1))}
          </div>
        )}
      </div>
    )
  }

  return (
    <div className="p-6 space-y-6 max-w-4xl mx-auto">
      <div>
        <div className="flex items-center justify-between mb-3">
          <h1 className="text-3xl font-bold text-foreground">
            SimplifyDocs Navigation Architecture
          </h1>
          <Button 
            onClick={() => handlePageSelect('real-dashboard')}
            className="bg-primary hover:bg-primary/90"
          >
            View Real Dashboard
          </Button>
        </div>
        <p className="text-lg text-muted-foreground mb-6">
          Explore the comprehensive navigation menu with organized Create, Review, and Manage sections. Click on any navigation item to explore its features, or use the sidebar to access the actual modules.
        </p>

        {/* Overview Cards */}
        <Card className="border-primary/30 bg-primary/5 mb-6">
          <CardContent className="p-4">
            <div className="flex items-start gap-3">
              <div className="bg-primary/10 p-2 rounded-lg">
                <House className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground mb-2">
                  Interactive Navigation Demo
                </h3>
                <p className="text-sm text-muted-foreground">
                  This demonstration shows the complete navigation structure of SimplifyDocs. 
                  Expandable sections (Create, Manage) show their sub-modules. Click on any item to see its features, 
                  or use the sidebar navigation to access live modules.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <Card className="border-green-200 bg-green-50">
            <CardContent className="p-4 text-center">
              <Globe className="w-8 h-8 text-green-600 mx-auto mb-2" />
              <h3 className="font-semibold text-green-800">Create Section</h3>
              <p className="text-sm text-green-700 mt-1">
                Content creation and management tools
              </p>
            </CardContent>
          </Card>
          
          <Card className="border-blue-200 bg-blue-50">
            <CardContent className="p-4 text-center">
              <Briefcase className="w-8 h-8 text-blue-600 mx-auto mb-2" />
              <h3 className="font-semibold text-blue-800">Review Section</h3>
              <p className="text-sm text-blue-700 mt-1">
                Portfolio and document review
              </p>
            </CardContent>
          </Card>
          
          <Card className="border-purple-200 bg-purple-50">
            <CardContent className="p-4 text-center">
              <FolderGear className="w-8 h-8 text-purple-600 mx-auto mb-2" />
              <h3 className="font-semibold text-purple-800">Manage Section</h3>
              <p className="text-sm text-purple-700 mt-1">
                Workflow and process management
              </p>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Navigation Structure */}
      <div>
        <h2 className="text-xl font-semibold text-foreground mb-4">
          Navigation Structure
        </h2>
        <div className="space-y-3">
          {navigationStructure.map((item) => renderNavigationItem(item))}
        </div>
      </div>

      {/* Key Features Summary */}
      <Card className="border-2 border-primary/20 bg-primary/5">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CheckCircle className="w-6 h-6 text-primary" />
            Key Navigation Features
          </CardTitle>
          <CardDescription>
            Advanced navigation capabilities for enhanced user experience
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <h4 className="font-semibold text-foreground">Organization</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Hierarchical structure with expandable sections</li>
                <li>• Logical grouping by functionality</li>
                <li>• Clear visual hierarchy and icons</li>
                <li>• Consistent naming conventions</li>
              </ul>
            </div>
            <div className="space-y-2">
              <h4 className="font-semibold text-foreground">User Experience</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Collapsible sidebar for space efficiency</li>
                <li>• Active state management and persistence</li>
                <li>• Hover effects and visual feedback</li>
                <li>• Mobile-responsive design</li>
              </ul>
            </div>
            <div className="space-y-2">
              <h4 className="font-semibold text-foreground">Smart Features</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• SmartSearchBar with favorites</li>
                <li>• Contextual navigation and breadcrumbs</li>
                <li>• Progressive disclosure of features</li>
                <li>• Multi-modal interface support</li>
              </ul>
            </div>
            <div className="space-y-2">
              <h4 className="font-semibold text-foreground">Integration</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Cross-module data sharing</li>
                <li>• Unified state management</li>
                <li>• Seamless workflow transitions</li>
                <li>• Real-time updates and notifications</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}