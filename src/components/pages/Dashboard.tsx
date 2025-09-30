import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { 
  FolderOpen,
  Sparkle,
  Upload,
  Robot,
  Users,
  FileText,
  TrendUp,
  UsersThree,
  DotsThree
} from '@phosphor-icons/react'

interface DashboardProps {
  onNavigate: (page: string) => void
}

export function Dashboard({ onNavigate }: DashboardProps) {
  const navigationTiles = [
    {
      id: 'manage',
      title: 'Manage',
      description: 'Manage collateral content',
      icon: FolderOpen,
      iconColor: 'text-blue-500',
      bgColor: 'bg-blue-50',
    },
    {
      id: 'generate',
      title: 'Generate',
      description: 'Generate Documents',
      icon: Sparkle,
      iconColor: 'text-purple-500',
      bgColor: 'bg-purple-50',
    },
    {
      id: 'publish',
      title: 'Publish',
      description: 'Publish content to portal',
      icon: Upload,
      iconColor: 'text-green-500',
      bgColor: 'bg-green-50',
    },
    {
      id: 'ask-benny',
      title: 'Ask Benny',
      description: 'AI assistant help',
      icon: Robot,
      iconColor: 'text-orange-500',
      bgColor: 'bg-orange-50',
    },
    {
      id: 'collaborate',
      title: 'Collaborate',
      description: 'Work together',
      icon: Users,
      iconColor: 'text-pink-500',
      bgColor: 'bg-pink-50',
    }
  ]

  const statsCards = [
    {
      title: 'Active Contracts',
      value: '6',
      subtitle: 'Medicare contracts',
      icon: FileText,
      iconBg: 'bg-gray-100',
      iconColor: 'text-gray-600'
    },
    {
      title: 'Total Documents',
      value: '247',
      subtitle: '+12% from last month',
      icon: FileText,
      iconBg: 'bg-gray-100',
      iconColor: 'text-gray-600'
    },
    {
      title: 'Documents Generated',
      value: '89',
      subtitle: '+15 this month',
      icon: TrendUp,
      iconBg: 'bg-gray-100',
      iconColor: 'text-gray-600'
    },
    {
      title: 'Collaborate Completed',
      value: '34',
      subtitle: '+8 this month',
      icon: UsersThree,
      iconBg: 'bg-gray-100',
      iconColor: 'text-gray-600'
    }
  ]

  const recentContracts = [
    {
      id: 'H5523004006',
      name: 'Medicare Advantage Notice of Coverage',
      status: 'Published',
      statusColor: 'bg-green-100 text-green-700'
    },
    {
      id: 'H2587501234',
      name: 'Medicare Part D Evidence of Coverage',
      status: 'Review',
      statusColor: 'bg-yellow-100 text-yellow-700'
    },
    {
      id: 'H8901234567',
      name: 'Medicare Summary Benefits',
      status: 'Published',
      statusColor: 'bg-green-100 text-green-700'
    }
  ]

  return (
    <div className="p-6 bg-background min-h-screen">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-semibold text-foreground mb-2">Dashboard</h1>
          <p className="text-muted-foreground">Welcome back to SimplifyDocs</p>
        </div>

        {/* Quick Actions Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
          {navigationTiles.map((tile) => {
            const IconComponent = tile.icon
            return (
              <Card 
                key={tile.id}
                className="cursor-pointer hover:shadow-md transition-all duration-200 border border-border bg-white"
                onClick={() => onNavigate?.(tile.id)}
              >
                <CardContent className="p-6 text-center">
                  <div className={`w-12 h-12 mx-auto mb-3 rounded-lg ${tile.bgColor} flex items-center justify-center`}>
                    <IconComponent size={24} className={tile.iconColor} />
                  </div>
                  <h3 className="font-medium text-foreground mb-1 text-sm">
                    {tile.title}
                  </h3>
                  <p className="text-xs text-muted-foreground">
                    {tile.description}
                  </p>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {statsCards.map((stat, index) => {
            const IconComponent = stat.icon
            return (
              <Card key={index} className="border border-border bg-white">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className={`w-10 h-10 rounded-lg ${stat.iconBg} flex items-center justify-center`}>
                      <IconComponent size={20} className={stat.iconColor} />
                    </div>
                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                      <DotsThree size={16} className="text-gray-400" />
                    </Button>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm text-muted-foreground font-medium">
                      {stat.title}
                    </p>
                    <p className="text-2xl font-bold text-foreground">
                      {stat.value}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {stat.subtitle}
                    </p>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* Recent Contracts */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-medium text-foreground">Recent Contracts</h2>
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => onNavigate('documents')}
              className="text-muted-foreground hover:text-foreground"
            >
              View All Documents
            </Button>
          </div>
          <Card className="border border-border bg-white">
            <CardContent className="p-0">
              <div className="divide-y divide-border">
                {recentContracts.map((contract) => (
                  <div key={contract.id} className="p-4 hover:bg-muted/50 transition-colors duration-200">
                    <div className="flex items-center justify-between">
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-blue-600 hover:text-blue-800 cursor-pointer">
                          {contract.id}
                        </p>
                        <p className="text-sm text-foreground mt-1">
                          {contract.name}
                        </p>
                      </div>
                      <Badge 
                        variant="secondary" 
                        className={`${contract.statusColor} text-xs font-medium border-0`}
                      >
                        {contract.status}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}