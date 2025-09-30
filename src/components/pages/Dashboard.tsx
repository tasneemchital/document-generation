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
    <div className="p-4 bg-background min-h-screen">
      <div className="max-w-7xl mx-auto space-y-4">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-semibold text-foreground mb-2">Dashboard</h1>
          <p className="text-muted-foreground">Welcome back to SimplifyDocs</p>
        </div>

        {/* Combined Cards Grid - Side by Side Layout */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 xl:grid-cols-9 gap-3">
          {/* Quick Actions Cards - Smaller */}
          {navigationTiles.map((tile) => {
            const IconComponent = tile.icon
            return (
              <Card 
                key={tile.id}
                className="cursor-pointer hover:shadow-md transition-all duration-200 border border-border bg-white hover:scale-105"
                onClick={() => onNavigate?.(tile.id)}
              >
                <CardContent className="p-3 text-center">
                  <div className={`w-8 h-8 mx-auto mb-2 rounded-lg ${tile.bgColor} flex items-center justify-center`}>
                    <IconComponent size={16} className={tile.iconColor} />
                  </div>
                  <h3 className="font-medium text-foreground mb-1 text-xs">
                    {tile.title}
                  </h3>
                  <p className="text-[10px] text-muted-foreground line-clamp-2">
                    {tile.description}
                  </p>
                </CardContent>
              </Card>
            )
          })}

          {/* Stats Cards - Smaller */}
          {statsCards.map((stat, index) => {
            const IconComponent = stat.icon
            return (
              <Card key={`stat-${index}`} className="border border-border bg-white hover:shadow-md transition-all duration-200">
                <CardContent className="p-3">
                  <div className="flex items-center justify-between mb-2">
                    <div className={`w-6 h-6 rounded-lg ${stat.iconBg} flex items-center justify-center`}>
                      <IconComponent size={14} className={stat.iconColor} />
                    </div>
                    <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                      <DotsThree size={12} className="text-gray-400" />
                    </Button>
                  </div>
                  <div className="space-y-1">
                    <p className="text-[10px] text-muted-foreground font-medium line-clamp-1">
                      {stat.title}
                    </p>
                    <p className="text-lg font-bold text-foreground">
                      {stat.value}
                    </p>
                    <p className="text-[9px] text-muted-foreground line-clamp-1">
                      {stat.subtitle}
                    </p>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* Recent Contracts */}
        <div className="mt-6">
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
                  <div key={contract.id} className="p-3 hover:bg-muted/50 transition-colors duration-200">
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