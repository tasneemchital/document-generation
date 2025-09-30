import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { useState } from 'react'
import { 
  Users, 
  FileText, 
  ShareNetwork,
  TrendUp, 
  FolderOpen,
  ArrowRight, 
  Clock, 
  CheckCircle, 
  UsersThree, 
  Calendar,
  Lightning,
  Target,
  Activity,
  Sparkle,
  Robot
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
      title: 'Tasks Completed',
      value: '34',
      subtitle: '+8 this month',
      icon: UsersThree,
      iconColor: 'text-orange-600',
      bgColor: 'bg-orange-50'
    }
  ]

  const recentContracts = [
    {
      id: 'H5239001234',
      name: 'Medicare Advantage Notice of Coverage',
      status: 'Active',
      statusColor: 'bg-green-100 text-green-800'
    },
    {
      id: 'H5239851234',
      name: 'Medicare Part D Evidence of Coverage',
      status: 'Review',
      statusColor: 'bg-yellow-100 text-yellow-800'
    },
    {
      id: 'H5239002468',
      name: 'Medicare Summary Benefits',
      status: 'Active',
      statusColor: 'bg-green-100 text-green-800'
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/30">
      <div className="container mx-auto px-6 py-8 max-w-7xl">
        <div className="mb-10">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-4xl font-bold text-foreground mb-3 tracking-tight">
                Good morning 👋
              </h1>
              <p className="text-lg text-muted-foreground">
                Ready to simplify your document workflow today?
              </p>
            </div>
            <div className="hidden md:flex items-center gap-4">
              <div className="flex items-center gap-2 text-sm text-muted-foreground bg-card/50 backdrop-blur-sm rounded-lg px-4 py-2 border border-border/50">
                <Activity size={16} className="text-emerald-500" />
                <span>All systems operational</span>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions Grid */}
        <div className="mb-12">
          <h2 className="text-xl font-semibold text-foreground mb-6 flex items-center gap-2">
            <Lightning size={20} className="text-accent" />
            Quick Actions
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            {navigationTiles.map((tile) => {
              const IconComponent = tile.icon
              return (
                <Card 
                  key={tile.id}
                  className="group cursor-pointer transition-all duration-300 hover:scale-[1.02] hover:shadow-xl hover:shadow-primary/5 border-border/50 bg-card/50 backdrop-blur-sm overflow-hidden relative"
                  onClick={() => onNavigate?.(tile.id)}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <CardContent className="p-6 text-center h-full flex flex-col justify-center items-center relative z-10">
                    <div className={`w-16 h-16 mx-auto mb-4 rounded-2xl ${tile.bgColor} flex items-center justify-center group-hover:scale-110 transition-all duration-300 shadow-lg group-hover:shadow-xl relative overflow-hidden`}>
                      <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      <IconComponent size={28} className={tile.iconColor} weight="duotone" />
                    </div>
                    <h3 className="font-semibold text-base mb-2 text-foreground leading-tight group-hover:text-primary transition-colors duration-300">
                      {tile.title}
                    </h3>
                    <p className="text-sm text-muted-foreground leading-tight line-clamp-2">
                      {tile.description}
                    </p>
                    <div className="mt-3 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-1 group-hover:translate-y-0">
                      <ArrowRight size={16} className="text-primary" />
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>

        {/* Metrics Overview */}
        <div className="mb-12">
          <h2 className="text-xl font-semibold text-foreground mb-6 flex items-center gap-2">
            <Target size={20} className="text-primary" />
            Performance Overview
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {statsCards.map((stat, index) => {
              const IconComponent = stat.icon
              return (
                <Card 
                  key={index} 
                  className="group border-border/50 bg-card/50 backdrop-blur-sm hover:shadow-lg hover:shadow-primary/5 transition-all duration-300 hover:border-primary/20 overflow-hidden relative"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-primary/3 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <CardContent className="p-6 relative z-10">
                    <div className="flex items-start justify-between mb-4">
                      <div className={`w-12 h-12 rounded-xl ${stat.bgColor} flex items-center justify-center group-hover:scale-110 transition-all duration-300`}>
                        <IconComponent size={24} className={stat.iconColor} weight="duotone" />
                      </div>
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-foreground mb-1 group-hover:text-primary transition-colors duration-300">
                        {stat.value}
                      </p>
                      <p className="text-sm font-medium text-foreground mb-1">
                        {stat.title}
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
        </div>

        {/* Recent Contracts */}
        <div>
          <h2 className="text-xl font-semibold text-foreground mb-6 flex items-center gap-2">
            <FileText size={20} className="text-primary" />
            Recent Contracts
          </h2>
          <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
            <CardContent className="p-0">
              <div className="divide-y divide-border/50">
                {recentContracts.map((contract) => (
                  <div key={contract.id} className="p-6 hover:bg-muted/30 transition-colors duration-200">
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <h3 className="font-medium text-foreground mb-1">
                          {contract.name}
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          Contract ID: {contract.id}
                        </p>
                      </div>
                      <div className="flex items-center gap-4">
                        <Badge className={`${contract.statusColor} border-0`}>
                          {contract.status}
                        </Badge>
                        <ArrowRight size={16} className="text-muted-foreground" />
                      </div>
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