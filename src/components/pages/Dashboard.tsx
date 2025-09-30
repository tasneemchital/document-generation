import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Label } from '@/components/ui/label'
import { useState } from 'react'
import { Plus, FileText, Users, TrendUp, FolderOpen, FilePdf, ShareNetwork, Robot, PaintBrush, ArrowsClockwise, Eye, Calendar, Funnel, CaretDown, Clock, CheckCircle, UsersThree, Sparkle, ArrowRight, Activity, Lightning, Target } from '@phosphor-icons/react'

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
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/30">
      <div className="container mx-auto px-6 py-8 max-w-7xl">
        {/* Header Section */}
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
                      <div className="flex-1">
                        <h3 className="text-sm font-medium text-muted-foreground mb-1">
                          {stat.title}
                        </h3>
                        <div className="text-3xl font-bold text-foreground mb-1 group-hover:text-primary transition-colors duration-300">
                          {stat.value}
                        </div>
                        <p className="text-sm text-muted-foreground">
                          {stat.subtitle}
                        </p>
                      </div>
                      <div className={`w-12 h-12 rounded-xl ${stat.bgColor} flex items-center justify-center group-hover:scale-110 transition-all duration-300 shadow-md relative overflow-hidden`}>
                        <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        <IconComponent size={22} className={stat.iconColor} weight="duotone" />
                      </div>
                    </div>
                    <div className="w-full bg-secondary/50 rounded-full h-1.5 overflow-hidden">
                      <div 
                        className="h-full bg-gradient-to-r from-primary to-accent rounded-full transition-all duration-1000 group-hover:from-accent group-hover:to-primary"
                        style={{ width: `${65 + (index * 10)}%` }}
                      />
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>

        {/* Recent Activity Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Recent Contracts - Takes 2/3 width */}
          <div className="lg:col-span-2">
            <Card className="border-border/50 bg-card/50 backdrop-blur-sm shadow-lg overflow-hidden">
              <CardHeader className="pb-4 border-b border-border/50 bg-gradient-to-r from-card to-muted/20">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-xl font-semibold text-foreground flex items-center gap-2">
                    <FileText size={20} className="text-primary" />
                    Recent Contracts
                  </CardTitle>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => onNavigate?.('documents')}
                    className="text-sm bg-primary/10 border-primary/20 hover:bg-primary hover:text-primary-foreground transition-all duration-300"
                  >
                    View All Documents
                    <ArrowRight size={14} className="ml-1" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="p-0">
                <div className="space-y-0">
                  {recentContracts.map((contract, index) => (
                    <div 
                      key={contract.id}
                      className={`group flex items-center justify-between p-6 hover:bg-gradient-to-r hover:from-primary/5 hover:to-accent/5 transition-all duration-300 cursor-pointer border-l-4 border-transparent hover:border-primary ${
                        index !== recentContracts.length - 1 ? 'border-b border-border/30' : ''
                      }`}
                      onClick={() => onNavigate?.('documents')}
                    >
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <span className="text-sm font-mono text-primary font-semibold bg-primary/10 px-3 py-1 rounded-full">
                            {contract.id}
                          </span>
                          <Badge className={`text-xs px-3 py-1 ${contract.statusColor} border-0 font-medium`}>
                            {contract.status}
                          </Badge>
                        </div>
                        <p className="text-base text-foreground font-medium group-hover:text-primary transition-colors duration-300">
                          {contract.name}
                        </p>
                      </div>
                      <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <ArrowRight size={18} className="text-muted-foreground group-hover:text-primary" />
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Recent Activity - Takes 1/3 width */}
          <div className="lg:col-span-1">
            <Card className="border-border/50 bg-card/50 backdrop-blur-sm shadow-lg overflow-hidden h-full">
              <CardHeader className="pb-4 border-b border-border/50 bg-gradient-to-r from-card to-muted/20">
                <CardTitle className="text-xl font-semibold text-foreground flex items-center gap-2">
                  <Clock size={20} className="text-accent" />
                  Recent Activity
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-4">
                  {recentActivities.map((activity, index) => (
                    <div key={index} className="group flex items-start gap-3 p-3 rounded-lg hover:bg-muted/30 transition-colors duration-200">
                      <div className="w-2 h-2 rounded-full bg-primary mt-2 group-hover:scale-125 transition-transform duration-200" />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-foreground line-clamp-1">
                          {activity.action}
                        </p>
                        <p className="text-sm text-primary font-medium line-clamp-1">
                          {activity.item}
                        </p>
                        <p className="text-xs text-muted-foreground mt-1">
                          {activity.time}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}