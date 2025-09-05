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
  Info
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
      color: 'bg-blue-100',
      iconColor: 'text-blue-600',
      action: () => onNavigate('master-list')
    },
    {
      id: 'generate',
      title: 'Generate',
      description: 'Generate documents in Word, Print X, 508 and large print in English and other languages',
      icon: FileText,
      color: 'bg-purple-100',
      iconColor: 'text-purple-600',
      action: () => onNavigate('generate')
    },
    {
      id: 'publish',
      title: 'Integrate',
      description: 'Reuse and stream content across multiple channels seamlessly',
      icon: Share,
      color: 'bg-green-100',
      iconColor: 'text-green-600',
      action: () => onNavigate('integrate')
    },
    {
      id: 'ask-benny',
      title: 'Ask BNI (Benny)',
      description: 'Interact smartly with your content via your personalized Benefits1™ Native intelligence assistant',
      icon: CalendarCheck,
      color: 'bg-orange-100',
      iconColor: 'text-orange-600',
      action: () => console.log('Ask BNI (Benny) clicked')
    },
    {
      id: 'collaborate',
      title: 'Collaborate',
      description: 'Collaborate seamlessly with multiple stakeholders via automated workflows, version control and transparent audit',
      icon: Users,
      color: 'bg-pink-100',
      iconColor: 'text-pink-600',
      action: () => onNavigate('collaborate')
    }
  ];

  return (
    <div className="h-full bg-background overflow-auto">
      <div className="container mx-auto px-6 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Dashboard
          </h1>
          <p className="text-muted-foreground">
            Welcome back to SimplifyDocs
          </p>
        </div>

        {/* Main Action Cards */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-6 mb-8">
          {dashboardCards.map((card) => {
            const IconComponent = card.icon;
            return (
              <Card 
                key={card.id} 
                className="transition-all duration-200 hover:shadow-lg hover:-translate-y-1 cursor-pointer group text-center"
                onClick={card.action}
              >
                <CardContent className="p-6">
                  <div className={`w-12 h-12 rounded-full ${card.color} flex items-center justify-center mx-auto mb-4 transition-transform group-hover:scale-110`}>
                    <IconComponent size={24} className={card.iconColor} />
                  </div>
                  <h3 className="font-semibold text-foreground mb-2">
                    {card.title === 'Ask BNI (Benny)' ? (
                      <>Ask BNI (<em>Benny</em>)</>
                    ) : (
                      card.title
                    )}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {card.description}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-2 text-muted-foreground mb-2">
                <Clock size={16} />
                <span className="text-sm">Recent Activity</span>
              </div>
              <div className="text-3xl font-bold text-foreground mb-1">4 new</div>
              <div className="text-sm text-muted-foreground">Latest updates</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-2 text-muted-foreground mb-2">
                <FileText size={16} />
                <span className="text-sm">Total Documents</span>
              </div>
              <div className="text-3xl font-bold text-foreground mb-1">247</div>
              <div className="text-sm text-muted-foreground">+12% from last month</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-2 text-muted-foreground mb-2">
                <Info size={16} />
                <span className="text-sm">Documents Generated</span>
              </div>
              <div className="text-3xl font-bold text-foreground mb-1">89</div>
              <div className="text-sm text-muted-foreground">+15 this month</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-2 text-muted-foreground mb-2">
                <Users size={16} />
                <span className="text-sm">Collaborate Completed</span>
              </div>
              <div className="text-3xl font-bold text-foreground mb-1">34</div>
              <div className="text-sm text-muted-foreground">+8 this month</div>
            </CardContent>
          </Card>
        </div>

        {/* Work Queue Section */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <Tabs defaultValue="work-queue" className="w-full">
              <div className="flex items-center justify-between">
                <TabsList className="grid w-auto grid-cols-4">
                  <TabsTrigger value="work-queue">Work Queue (0)</TabsTrigger>
                  <TabsTrigger value="open-tasks">Open Tasks (0)</TabsTrigger>
                  <TabsTrigger value="completed-tasks">Completed Tasks (0)</TabsTrigger>
                  <TabsTrigger value="all-tasks">All Tasks (0)</TabsTrigger>
                </TabsList>
                <div className="flex items-center gap-2">
                  <Button variant="ghost" size="sm">
                    <ArrowRepeat size={16} />
                  </Button>
                  <Button variant="ghost" size="sm">
                    <Eye size={16} />
                  </Button>
                  <Button variant="ghost" size="sm">
                    <Trash size={16} />
                  </Button>
                  <Button variant="ghost" size="sm">
                    <FunnelSimple size={16} />
                  </Button>
                </div>
              </div>
              
              <TabsContent value="work-queue" className="mt-6">
                <Card>
                  <CardContent className="p-0">
                    {/* Table Header */}
                    <div className="grid grid-cols-12 gap-4 p-4 border-b bg-muted/20 text-sm font-medium text-muted-foreground">
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
                    
                    {/* Table Body - Empty State */}
                    <div className="p-12 text-center">
                      <p className="text-muted-foreground">No Rows To Show</p>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="open-tasks" className="mt-6">
                <Card>
                  <CardContent className="p-12 text-center">
                    <p className="text-muted-foreground">No open tasks</p>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="completed-tasks" className="mt-6">
                <Card>
                  <CardContent className="p-12 text-center">
                    <p className="text-muted-foreground">No completed tasks</p>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="all-tasks" className="mt-6">
                <Card>
                  <CardContent className="p-12 text-center">
                    <p className="text-muted-foreground">No tasks</p>
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