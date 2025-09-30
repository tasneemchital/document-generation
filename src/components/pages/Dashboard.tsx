import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Label } from '@/components/ui/label'
import { useState } from 'react'
import { Plus, FileText, Users, TrendUp, FolderOpen, FilePdf, ShareNetwork, Robot, PaintBrush, ArrowsClockwise, Eye, Calendar, Funnel, CaretDown, Clock, CheckCircle, UsersThree, Sparkle } from '@phosphor-icons/react'

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
    <div className="p-8 space-y-8 bg-background min-h-full">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground mb-2">Dashboard</h1>
        <p className="text-muted-foreground">Welcome back to SimplifyDocs</p>
      </div>

      {/* Quick Navigation Cards */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 mb-12">
        {navigationTiles.map((tile) => {
          const IconComponent = tile.icon
          return (
            <Card 
              key={tile.id}
              className={`cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-lg group border ${tile.borderColor} min-h-[140px] ${tile.bgColor}`}
              onClick={() => onNavigate?.(tile.id)}
            >
              <CardContent className="p-6 text-center h-full flex flex-col justify-center items-center">
                <div className={`w-14 h-14 mx-auto mb-4 rounded-xl ${tile.bgColor} flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-sm`}>
                  <IconComponent size={28} className={tile.iconColor} weight="duotone" />
                </div>
                <h3 className="font-semibold text-base mb-2 text-foreground leading-tight">{tile.title}</h3>
                <p className="text-sm text-muted-foreground leading-tight">{tile.description}</p>
              </CardContent>
            </Card>
          )
        })}
      </div>
      
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        {statsCards.map((stat, index) => {
          const IconComponent = stat.icon
          return (
            <Card key={index} className="border-border hover:shadow-md transition-shadow duration-300">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-sm font-medium text-muted-foreground">{stat.title}</h3>
                  <div className={`w-10 h-10 rounded-lg ${stat.bgColor} flex items-center justify-center`}>
                    <IconComponent size={20} className={stat.iconColor} weight="duotone" />
                  </div>
                </div>
                <div className="space-y-1">
                  <div className="text-3xl font-bold text-foreground">{stat.value}</div>
                  <p className="text-sm text-muted-foreground">{stat.subtitle}</p>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Recent Contracts Section */}
      <Card className="border-border">
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between">
            <CardTitle className="text-xl font-semibold text-foreground">Recent Contracts</CardTitle>
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => onNavigate?.('documents')}
              className="text-sm"
            >
              View All Documents
            </Button>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <div className="space-y-0">
            {recentContracts.map((contract, index) => (
              <div 
                key={contract.id}
                className={`flex items-center justify-between p-6 hover:bg-muted/50 transition-colors duration-200 cursor-pointer ${
                  index !== recentContracts.length - 1 ? 'border-b border-border' : ''
                }`}
                onClick={() => onNavigate?.('documents')}
              >
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-1">
                    <span className="text-sm font-mono text-primary font-medium">{contract.id}</span>
                    <Badge className={`text-xs px-2 py-1 ${contract.statusColor} border-0`}>
                      {contract.status}
                    </Badge>
                  </div>
                  <p className="text-sm text-foreground font-medium">{contract.name}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}