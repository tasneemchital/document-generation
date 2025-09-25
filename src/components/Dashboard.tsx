import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useKV } from '@github/spark/hooks';
import { 
  Folder, 
  FileText, 
  Share, 
  CalendarCheck, 
  Users,
  Clock,
  ArrowRepeat,
  Eye,
  Trash,
  FunnelSimple,
  Info,
  TrendUp,
  Star,
  ChartBar,
  Lightning
} from '@phosphor-icons/react';


interface DashboardProps {
  onNavigate: (page: string) => void;
}

export function Dashboard({ onNavigate }: DashboardProps) {
  const dashboardCards = [
    {
      id: 'manage',
      title: 'Manage',
      description: 'Create, edit and manage your document templates',
      icon: Folder,
      gradient: 'from-blue-500 to-blue-600',
      bgColor: 'bg-gradient-to-br from-blue-50 to-blue-100/50',
      iconBg: 'bg-gradient-to-br from-blue-500 to-blue-600',
      action: () => onNavigate('master-list')
    },
    {
      id: 'generate',
      title: 'Generate',
      description: 'Generate documents in Word, Print X, 508 and large print in English and other languages',
      icon: FileText,
      gradient: 'from-purple-500 to-purple-600',
      bgColor: 'bg-gradient-to-br from-purple-50 to-purple-100/50',
      iconBg: 'bg-gradient-to-br from-purple-500 to-purple-600',
      action: () => onNavigate('generate')
    },
    {
      id: 'publish',
      title: 'Integrate',
      description: 'Reuse and stream content across multiple channels seamlessly',
      icon: Share,
      gradient: 'from-emerald-500 to-emerald-600',
      bgColor: 'bg-gradient-to-br from-emerald-50 to-emerald-100/50',
      iconBg: 'bg-gradient-to-br from-emerald-500 to-emerald-600',
      action: () => onNavigate('integrate')
    },
    {
      id: 'ask-benny',
      title: 'Ask BNI (Benny)',
      description: 'Interact smartly with your content via your personalized Benefits1™ Native intelligence assistant',
      icon: Lightning,
      gradient: 'from-amber-500 to-orange-500',
      bgColor: 'bg-gradient-to-br from-amber-50 to-orange-100/50',
      iconBg: 'bg-gradient-to-br from-amber-500 to-orange-500',
      action: () => console.log('Ask BNI (Benny) clicked')
    },
    {
      id: 'collaborate',
      title: 'Collaborate',
      description: 'Collaborate seamlessly with multiple stakeholders via automated workflows, version control and transparent audit',
      icon: Users,
      gradient: 'from-rose-500 to-pink-500',
      bgColor: 'bg-gradient-to-br from-rose-50 to-pink-100/50',
      iconBg: 'bg-gradient-to-br from-rose-500 to-pink-500',
      action: () => onNavigate('collaborate')
    }
  ];

  return (
    <div className="min-h-full bg-gradient-to-br from-background via-background to-muted/30 overflow-auto">
      <div className="container mx-auto px-6 py-8">
        {/* Header with improved styling */}
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-12 h-12 bg-gradient-to-br from-primary to-primary/80 rounded-xl flex items-center justify-center shadow-lg">
              <ChartBar size={24} className="text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
                Dashboard
              </h1>
              <p className="text-muted-foreground text-lg">
                Welcome back to SimplifyDocs
              </p>
            </div>
          </div>
        </div>

        {/* Main Action Cards with enhanced design */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-12">
          {dashboardCards.map((card) => {
            const IconComponent = card.icon;
            return (
              <Card 
                key={card.id} 
                className={`group relative overflow-hidden transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 cursor-pointer border-0 ${card.bgColor} backdrop-blur-sm`}
                onClick={card.action}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <CardContent className="p-8 relative z-10">
                  <div className={`w-16 h-16 rounded-2xl ${card.iconBg} flex items-center justify-center mx-auto mb-6 transition-all duration-300 group-hover:scale-110 group-hover:rotate-3 shadow-xl`}>
                    <IconComponent size={28} className="text-white" />
                  </div>
                  <h3 className="font-bold text-foreground mb-3 text-lg text-center">
                    {card.title === 'Ask BNI (Benny)' ? (
                      <>Ask BNI (<em>Benny</em>)</>
                    ) : (
                      card.title
                    )}
                  </h3>
                  <p className="text-sm text-muted-foreground text-center leading-relaxed">
                    {card.description}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Enhanced Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <Card className="relative overflow-hidden border-0 bg-gradient-to-br from-slate-50 to-slate-100/50 shadow-lg hover:shadow-xl transition-all duration-300">
            <CardContent className="p-8">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center shadow-lg">
                  <Clock size={20} className="text-white" />
                </div>
                <Badge variant="secondary" className="bg-blue-100 text-blue-700 border-blue-200">
                  New
                </Badge>
              </div>
              <div className="text-3xl font-bold text-foreground mb-2">4</div>
              <div className="text-sm font-medium text-muted-foreground mb-1">Recent Activity</div>
              <div className="flex items-center gap-1 text-xs text-emerald-600">
                <TrendUp size={12} />
                Latest updates
              </div>
            </CardContent>
          </Card>
          
          <Card className="relative overflow-hidden border-0 bg-gradient-to-br from-purple-50 to-purple-100/50 shadow-lg hover:shadow-xl transition-all duration-300">
            <CardContent className="p-8">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                  <FileText size={20} className="text-white" />
                </div>
                <Badge variant="secondary" className="bg-purple-100 text-purple-700 border-purple-200">
                  Total
                </Badge>
              </div>
              <div className="text-3xl font-bold text-foreground mb-2">247</div>
              <div className="text-sm font-medium text-muted-foreground mb-1">Total Documents</div>
              <div className="flex items-center gap-1 text-xs text-emerald-600">
                <TrendUp size={12} />
                +12% from last month
              </div>
            </CardContent>
          </Card>
          
          <Card className="relative overflow-hidden border-0 bg-gradient-to-br from-emerald-50 to-emerald-100/50 shadow-lg hover:shadow-xl transition-all duration-300">
            <CardContent className="p-8">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-xl flex items-center justify-center shadow-lg">
                  <Info size={20} className="text-white" />
                </div>
                <Badge variant="secondary" className="bg-emerald-100 text-emerald-700 border-emerald-200">
                  Generated
                </Badge>
              </div>
              <div className="text-3xl font-bold text-foreground mb-2">89</div>
              <div className="text-sm font-medium text-muted-foreground mb-1">Documents Generated</div>
              <div className="flex items-center gap-1 text-xs text-emerald-600">
                <TrendUp size={12} />
                +15 this month
              </div>
            </CardContent>
          </Card>
          
          <Card className="relative overflow-hidden border-0 bg-gradient-to-br from-rose-50 to-rose-100/50 shadow-lg hover:shadow-xl transition-all duration-300">
            <CardContent className="p-8">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-rose-500 to-rose-600 rounded-xl flex items-center justify-center shadow-lg">
                  <Users size={20} className="text-white" />
                </div>
                <Badge variant="secondary" className="bg-rose-100 text-rose-700 border-rose-200">
                  Done
                </Badge>
              </div>
              <div className="text-3xl font-bold text-foreground mb-2">34</div>
              <div className="text-sm font-medium text-muted-foreground mb-1">Collaborate Completed</div>
              <div className="flex items-center gap-1 text-xs text-emerald-600">
                <TrendUp size={12} />
                +8 this month
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Enhanced Work Queue Section */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-8">
            <Tabs defaultValue="work-queue" className="w-full">
              <div className="flex items-center justify-between">
                <div className="bg-white/50 backdrop-blur-sm rounded-xl p-1 shadow-lg border">
                  <TabsList className="grid w-auto grid-cols-4 bg-transparent gap-1">
                    <TabsTrigger 
                      value="work-queue" 
                      className="data-[state=active]:bg-white data-[state=active]:shadow-lg transition-all duration-200"
                    >
                      Work Queue (0)
                    </TabsTrigger>
                    <TabsTrigger 
                      value="open-tasks"
                      className="data-[state=active]:bg-white data-[state=active]:shadow-lg transition-all duration-200"
                    >
                      Open Tasks (0)
                    </TabsTrigger>
                    <TabsTrigger 
                      value="completed-tasks"
                      className="data-[state=active]:bg-white data-[state=active]:shadow-lg transition-all duration-200"
                    >
                      Completed Tasks (0)
                    </TabsTrigger>
                    <TabsTrigger 
                      value="all-tasks"
                      className="data-[state=active]:bg-white data-[state=active]:shadow-lg transition-all duration-200"
                    >
                      All Tasks (0)
                    </TabsTrigger>
                  </TabsList>
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="ghost" size="sm" className="hover:bg-white/50 backdrop-blur-sm transition-all duration-200">
                    <ArrowRepeat size={16} />
                  </Button>
                  <Button variant="ghost" size="sm" className="hover:bg-white/50 backdrop-blur-sm transition-all duration-200">
                    <Eye size={16} />
                  </Button>
                  <Button variant="ghost" size="sm" className="hover:bg-white/50 backdrop-blur-sm transition-all duration-200">
                    <Trash size={16} />
                  </Button>
                  <Button variant="ghost" size="sm" className="hover:bg-white/50 backdrop-blur-sm transition-all duration-200">
                    <FunnelSimple size={16} />
                  </Button>
                </div>
              </div>
              
              <TabsContent value="work-queue" className="mt-8">
                <Card className="border-0 shadow-xl bg-white/70 backdrop-blur-sm">
                  <CardContent className="p-0">
                    {/* Enhanced Table Header */}
                    <div className="grid grid-cols-12 gap-4 p-6 border-b bg-gradient-to-r from-muted/30 to-muted/10 text-sm font-semibold text-foreground">
                      <div className="col-span-1">Task #</div>
                      <div className="col-span-1">Folder</div>
                      <div className="col-span-1">Effective Date</div>
                      <div className="col-span-1">Workflow</div>
                      <div className="col-span-1">State</div>
                      <div className="col-span-1">Plan</div>
                      <div className="col-span-1">PlanName</div>
                      <div className="col-span-1">PlanType</div>
                      <div className="col-span-1">View</div>
                      <div className="col-span-1">Task</div>
                      <div className="col-span-1">Status</div>
                      <div className="col-span-1">Star</div>
                    </div>
                    
                    {/* Enhanced Empty State */}
                    <div className="p-16 text-center">
                      <div className="w-20 h-20 bg-gradient-to-br from-muted to-muted/50 rounded-full flex items-center justify-center mx-auto mb-4">
                        <FileText size={32} className="text-muted-foreground" />
                      </div>
                      <h3 className="text-lg font-semibold text-foreground mb-2">No work items yet</h3>
                      <p className="text-muted-foreground">When you have tasks, they'll appear here</p>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="open-tasks" className="mt-8">
                <Card className="border-0 shadow-xl bg-white/70 backdrop-blur-sm">
                  <CardContent className="p-16 text-center">
                    <div className="w-20 h-20 bg-gradient-to-br from-blue-100 to-blue-200 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Clock size={32} className="text-blue-600" />
                    </div>
                    <h3 className="text-lg font-semibold text-foreground mb-2">No open tasks</h3>
                    <p className="text-muted-foreground">All caught up! Great work.</p>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="completed-tasks" className="mt-8">
                <Card className="border-0 shadow-xl bg-white/70 backdrop-blur-sm">
                  <CardContent className="p-16 text-center">
                    <div className="w-20 h-20 bg-gradient-to-br from-emerald-100 to-emerald-200 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Star size={32} className="text-emerald-600" />
                    </div>
                    <h3 className="text-lg font-semibold text-foreground mb-2">No completed tasks</h3>
                    <p className="text-muted-foreground">Completed tasks will appear here</p>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="all-tasks" className="mt-8">
                <Card className="border-0 shadow-xl bg-white/70 backdrop-blur-sm">
                  <CardContent className="p-16 text-center">
                    <div className="w-20 h-20 bg-gradient-to-br from-purple-100 to-purple-200 rounded-full flex items-center justify-center mx-auto mb-4">
                      <FileText size={32} className="text-purple-600" />
                    </div>
                    <h3 className="text-lg font-semibold text-foreground mb-2">No tasks yet</h3>
                    <p className="text-muted-foreground">Start creating tasks to see them here</p>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
}