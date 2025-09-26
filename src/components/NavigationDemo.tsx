import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { 
  Globe,
  FolderG
  FilePdf
  Users,
  Plus,
  FileText,
  Robot
  CaretDow
  CheckCircle,
} from '

  onNav

  const [ex

    setE
      i
      } else
      }
    })

    setSelectedPage(pageId)
    if (['dcm', 'generate', 'col

    } else {
      console.log(`Demo: Selected ${p
 

    {
      label: 'Dashboard',
      description: 'Central overview and task management',

      id: 'create',
      icon: Globe,
      isSection: true,
        {
          label: 'Digital Conten
          desc
        },
       
          icon: Fil
      
   

          description: 'Master lists and data co
        }
    },
   

      features: ['Smart search', 'Produ
    {
     
      description: 'Ri
    },
      id: 'design-
      icon: PaintBrush,
      features: ['Layout design', 'Branding', 'Visual themes', 'Asset management']
    {
     
      description: 
      children: [
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
              <div className="flex items-start gap-3 flex-1">
          features: ['Document queuing', 'Status tracking', 'Language management', 'Audit trails']
         
      ]
      
    {
      id: 'documents',
      label: 'Documents',
                     
      description: 'Document library with viewer capabilities',
      features: ['Document viewer', 'Multi-language support', 'Search & filter', 'Hierarchical navigation']
    },
     
      id: 'ask-benny',
                  <p clas
      icon: Robot,
                  {item.features && (
      features: ['Natural language queries', 'Smart suggestions', 'Context awareness', 'Learning capabilities']
      
    {
      id: 'admin-settings',
      label: 'Admin Settings',
                 
      description: 'System configuration and administration',
      features: ['User management', 'System settings', 'Security config', 'Integration setup']
    }
   

                  <Button
    // Different status colors for demonstration
                    
      'dashboard': 'bg-green-100 text-green-800',
      'dcm': 'bg-blue-100 text-blue-800',
      'generate': 'bg-purple-100 text-purple-800',
      'collaborate': 'bg-orange-100 text-orange-800',
      'documents': 'bg-indigo-100 text-indigo-800'
     
    return colors[itemId as keyof typeof colors] || 'bg-gray-100 text-gray-800'
   

  const renderNavigationItem = (item: any, level = 0) => {
    const Icon = item.icon
    const isExpanded = expandedSections.has(item.id)
    const isSelected = selectedPage === item.id
    const hasChildren = item.children && item.children.length > 0

      </div>
      <div key={item.id} className="space-y-1">

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

        >
          <CardContent className="p-4">
            <div className="flex items-start justify-between">
              <div className="flex items-start gap-3 flex-1">
                <div className={cn(
                  "flex items-center justify-center w-10 h-10 rounded-lg",
                  isSelected ? "bg-primary text-primary-foreground" : "bg-muted"
                <p 
                  <Icon size={20} />
                  or u
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="font-semibold text-foreground">{item.label}</h3>

                      <Badge className={cn("text-xs", getStatusColor(item.id))}>
            <CardContent class
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
          
                    <div className="flex flex-wrap gap-1">
                      {item.features.slice(0, 3).map((feature: string, index: number) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                          {feature}
                        </Badge>
                      ))}
                      {item.features.length > 3 && (
                        <Badge variant="outline" className="text-xs">
                          +{item.features.length - 3} more
                        </Badge>
                      )}
                    </div>
                  )}
      </div>
              </div>
      <Card className="border-2 border-primary/20 bg-primary
                {!hasChildren && (
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-8 w-8 p-0"
                    onClick={(e) => {
                      e.stopPropagation()





































































































































