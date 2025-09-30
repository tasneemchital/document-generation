import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { useState } from 'react'
import { 
  FileText, 
  Users, 
  TrendUp, 
  FolderOpen,
  ShareNetwork, 
  Robot, 
  Clock, 
  CheckCircle, 
  UsersThree, 
  Sparkle, 
  ArrowRight, 
  Activity, 
  Lightning, 
  Target,
  Folder,
  Calendar
} from '@phosphor-icons/react'

interface DashboardProps {
  onNavigate?: (page: string) => void
}

export function Dashboard({ onNavigate }: DashboardProps) {
  const [selectedTaskFilter, setSelectedTaskFilter] = useState('open')

  // Mock recent activity data
  const recentActivities = [
    { action: 'Document generated', item: 'Medicare Plan SBC', time: '2 minutes ago' },
    { action: 'Review completed', item: 'EOC Template', time: '15 minutes ago' },
    { action: 'Published to portal', item: 'EGWP Documents', time: '1 hour ago' },
    { action: 'Collaboration started', item: 'Annual Notice', time: '2 hours ago' }
  ]

  // Mock task data
  const mockTasks = [
    {
      id: 1,
      taskNumber: 'T001',
      folder: 'EOC Documents',
      effectiveDate: '01/15/2024',
      workflow: 'Review',
      state: 'In Progress',
      plan: 'Medicare Advantage',
      planName: 'MA Plan 2024',
      planType: 'HMO',
      view: 'PDF',
      task: 'Content Review',
      status: 'Active',
      starred: false
    },
    {
      id: 2,
      taskNumber: 'T002',
      folder: 'SBC Templates',
      effectiveDate: '02/01/2024',
      workflow: 'Approval',
      state: 'Pending',
      plan: 'Individual',
      planName: 'Silver Plan',
      planType: 'PPO',
      view: 'HTML',
      task: 'Final Review',
      status: 'Waiting',
      starred: true
    }
  ]

  const navigationTiles = [
    {
      id: 'manage',
      title: 'Manage',
      description: 'Manage collateral content',
      icon: FolderOpen,
      iconColor: 'text-blue-600',
      bgColor: 'bg-blue-50',
      borderColor: 'border-blue-200'
    },
    {
      id: 'generate',
      title: 'Generate',
      description: 'Generate Documents',
      icon: Sparkle,
      iconColor: 'text-purple-600',
      bgColor: 'bg-purple-50', 
      borderColor: 'border-purple-200'
    },
    {
      id: 'publish',
      title: 'Publish',
      description: 'Publish content to portal',
      icon: ShareNetwork,
      iconColor: 'text-green-600',
      bgColor: 'bg-green-50',
      borderColor: 'border-green-200'
    },
    {
      id: 'ask-benny',
      title: 'Ask Benny',
      description: 'AI assistant help',
      icon: Robot,
      iconColor: 'text-orange-600',
      bgColor: 'bg-orange-50',
      borderColor: 'border-orange-200'
    },
    {
      id: 'collaborate',
      title: 'Collaborate',
      description: 'Work together',
      icon: UsersThree,
      iconColor: 'text-pink-600',
      bgColor: 'bg-pink-50',
      borderColor: 'border-pink-200'
    }
  ]

  const statsCards = [
    {
      title: 'Active Contracts',
      value: '6',
      subtitle: 'Medicare contracts',
      icon: FileText,
      iconColor: 'text-blue-600',
      bgColor: 'bg-blue-50'
    },
    {
      title: 'Total Documents',
      value: '247',
      subtitle: '+12% from last month',
      icon: CheckCircle,
      iconColor: 'text-emerald-600',
      bgColor: 'bg-emerald-50'
    },
    {
      title: 'Documents Generated',
      value: '89',
      subtitle: '+15 this month',
      icon: TrendUp,
      iconColor: 'text-purple-600',
      bgColor: 'bg-purple-50'
    },
    {
      title: 'Collaborate Completed',
      value: '34',
      subtitle: '+8 this month',
      icon: UsersThree,
      iconColor: 'text-orange-600',
      bgColor: 'bg-orange-50'
    }
  ]

  // Mock recent contracts data
  const recentContracts = [
    {
      id: 'H5523404008',
      name: 'Medicare Advantage Notice of Coverage',
      status: 'Published',
      statusColor: 'bg-green-100 text-green-800'
    },
    {
      id: 'H5239851234',
      name: 'Medicare Part D Evidence of Coverage',
      status: 'Review',
      statusColor: 'bg-yellow-100 text-yellow-800'
    },
    {
      id: 'H8901234567',
      name: 'Medicare Summary Benefits',
      status: 'Published',
      statusColor: 'bg-green-100 text-green-800'
    }
  ]

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-6 py-8 max-w-7xl">
        {/* Header Section */}
        <div className="mb-8">
          <h1 className="text-2xl font-semibold text-foreground mb-2">
            Dashboard
          </h1>
          <p className="text-sm text-muted-foreground">
            Welcome back to SimplifyDocs
          </p>
        </div>

        {/* Quick Actions Grid - Top Navigation Cards */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-6 mb-8">
          {navigationTiles.map((tile) => {
            const IconComponent = tile.icon
            return (
              <Card 
                key={tile.id}
                className="group cursor-pointer transition-all duration-200 hover:scale-[1.02] hover:shadow-lg border border-border bg-card"
                onClick={() => onNavigate?.(tile.id)}
              >
                <CardContent className="p-6 text-center h-full flex flex-col justify-center items-center">
                  <div className={`w-12 h-12 mx-auto mb-3 rounded-lg ${tile.bgColor} flex items-center justify-center`}>
                    <IconComponent size={24} className={tile.iconColor} weight="duotone" />
                  </div>
                  <h3 className="font-medium text-base mb-1 text-foreground">
                    {tile.title}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {tile.description}
                  </p>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          {statsCards.map((stat, index) => {
            const IconComponent = stat.icon
            return (
              <Card 
                key={index} 
                className="border border-border bg-card hover:shadow-md transition-shadow duration-200"
              >
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <p className="text-sm font-medium text-muted-foreground mb-1">
                        {stat.title}
                      </p>
                      <div className="text-2xl font-bold text-foreground mb-1">
                        {stat.value}
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {stat.subtitle}
                      </p>
                    </div>
                    <div className={`w-10 h-10 rounded-lg ${stat.bgColor} flex items-center justify-center ml-4`}>
                      <IconComponent size={20} className={stat.iconColor} />
                    </div>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* Recent Activity Section */}
        <Card className="border border-border bg-card">
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-foreground">
              Recent Contracts
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="space-y-0">
              {recentContracts.map((contract, index) => (
                <div 
                  key={contract.id}
                  className={`group flex items-center justify-between p-4 hover:bg-muted/30 transition-colors duration-200 cursor-pointer ${
                    index !== recentContracts.length - 1 ? 'border-b border-border' : ''
                  }`}
                  onClick={() => onNavigate?.('documents')}
                >
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-1">
                      <span className="text-sm font-mono text-primary font-medium bg-primary/10 px-2 py-1 rounded">
                        {contract.id}
                      </span>
                      <Badge className={`text-xs px-2 py-1 ${contract.statusColor} border-0`}>
                        {contract.status}
                      </Badge>
                    </div>
                    <p className="text-sm text-foreground">
                      {contract.name}
                    </p>
                  </div>
                  <Button variant="ghost" size="sm">
                    View All Documents
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}