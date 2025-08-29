import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { useKV } from '@github/spark/hooks';
import { 
  Database, 
  FileText, 
  Share, 
  MessageCircle, 
  Users,
  Clock,
  TrendUp,
  CheckCircle,
  AlertTriangle,
  Calendar,
  Eye,
  Plus,
  Download,
  Bell
} from '@phosphor-icons/react';


interface DashboardProps {
  onNavigate: (page: string) => void;
}

export function Dashboard({ onNavigate }: DashboardProps) {
  const [recentActivity] = useKV('recent-activity', [
    { id: 1, action: 'Created Medicare EOC template', timestamp: '2 hours ago', type: 'create' },
    { id: 2, action: 'Published compliance update', timestamp: '4 hours ago', type: 'publish' },
    { id: 3, action: 'Collaborated on benefits document', timestamp: '1 day ago', type: 'collaborate' },
    { id: 4, action: 'Generated PDF report', timestamp: '2 days ago', type: 'generate' }
  ]);

  const [dashboardStats] = useKV('dashboard-stats', {
    totalDocuments: 127,
    activeTemplates: 23,
    documentsThisMonth: 45,
    collaborators: 8,
    pendingApprovals: 3
  });

  const [recentDocuments] = useKV('recent-documents', [
    { id: 1, name: 'Medicare EOC Template v2.1', lastModified: '3 hours ago', status: 'Published', type: 'Template' },
    { id: 2, name: 'Benefits Summary 2025', lastModified: '1 day ago', status: 'Draft', type: 'Document' },
    { id: 3, name: 'Compliance Guidelines', lastModified: '2 days ago', status: 'Review', type: 'Policy' },
    { id: 4, name: 'Annual Report Template', lastModified: '1 week ago', status: 'Published', type: 'Template' }
  ]);

  const dashboardCards = [
    {
      id: 'master-list',
      title: 'Manage',
      description: 'Create, edit and manage your document templates',
      icon: Database,
      color: 'bg-primary text-primary-foreground',
      action: () => onNavigate('master-list')
    },
    {
      id: 'generate',
      title: 'Generate',
      description: 'Generate documents in Word, Print X, 508 and large print in English and other languages',
      icon: FileText,
      color: 'bg-accent text-accent-foreground',
      action: () => onNavigate('generate')
    },
    {
      id: 'integrate',
      title: 'Integrate',
      description: 'Reuse and stream content across multiple channels seamlessly',
      icon: Share,
      color: 'bg-secondary text-secondary-foreground',
      action: () => onNavigate('integrate')
    },
    {
      id: 'interact',
      title: 'Ask BNI (Benny)',
      description: 'Interact smartly with your content via your personalized Benefits1™ Native intelligence assistant',
      icon: MessageCircle,
      color: 'bg-muted text-muted-foreground',
      action: () => console.log('Ask BNI (Benny) clicked')
    },
    {
      id: 'collaborate',
      title: 'Collaborate',
      description: 'Collaborate seamlessly with multiple stakeholders via automated workflows, version control and transparent audit',
      icon: Users,
      color: 'bg-destructive text-destructive-foreground',
      action: () => onNavigate('collaborate')
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Published': return 'bg-green-100 text-green-800';
      case 'Draft': return 'bg-yellow-100 text-yellow-800';
      case 'Review': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'create': return <Plus size={16} className="text-green-600" />;
      case 'publish': return <CheckCircle size={16} className="text-blue-600" />;
      case 'collaborate': return <Users size={16} className="text-purple-600" />;
      case 'generate': return <FileText size={16} className="text-orange-600" />;
      default: return <Clock size={16} className="text-gray-600" />;
    }
  };

  return (
    <div className="h-full bg-background overflow-auto">
      <div className="container mx-auto px-6 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-foreground mb-2">
                Dashboard
              </h1>
              <p className="text-muted-foreground">
                Welcome back! Here's an overview of your document management activity.
              </p>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                <Bell size={16} className="mr-2" />
                Notifications
              </Button>
              <Button size="sm">
                <Plus size={16} className="mr-2" />
                New Document
              </Button>
            </div>
          </div>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Total Documents</p>
                  <p className="text-2xl font-bold text-foreground">{dashboardStats.totalDocuments}</p>
                </div>
                <Database size={24} className="text-primary" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Active Templates</p>
                  <p className="text-2xl font-bold text-foreground">{dashboardStats.activeTemplates}</p>
                </div>
                <FileText size={24} className="text-accent" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">This Month</p>
                  <p className="text-2xl font-bold text-foreground">{dashboardStats.documentsThisMonth}</p>
                </div>
                <TrendUp size={24} className="text-green-600" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Collaborators</p>
                  <p className="text-2xl font-bold text-foreground">{dashboardStats.collaborators}</p>
                </div>
                <Users size={24} className="text-purple-600" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Pending Approvals</p>
                  <p className="text-2xl font-bold text-foreground">{dashboardStats.pendingApprovals}</p>
                </div>
                <AlertTriangle size={24} className="text-orange-500" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          {/* Main Actions */}
          <div className="lg:col-span-2">
            <h2 className="text-xl font-semibold text-foreground mb-4">Quick Actions</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {dashboardCards.map((card) => {
                const IconComponent = card.icon;
                return (
                  <Card 
                    key={card.id} 
                    className="transition-all duration-200 hover:shadow-lg hover:-translate-y-1 cursor-pointer group"
                    onClick={card.action}
                  >
                    <CardHeader className="pb-3">
                      <div className="flex items-center gap-3 mb-2">
                        <div className={`p-2 rounded-lg ${card.color} transition-transform group-hover:scale-110`}>
                          <IconComponent size={20} weight="bold" />
                        </div>
                        <CardTitle className="text-lg font-semibold">
                          {card.title === 'Ask BNI (Benny)' ? (
                            <>Ask BNI (<em>Benny</em>)</>
                          ) : (
                            card.title
                          )}
                        </CardTitle>
                      </div>
                    </CardHeader>
                    <CardContent className="pt-0">
                      <p className="text-sm text-muted-foreground leading-relaxed mb-3">
                        {card.description}
                      </p>
                      <Button 
                        variant="ghost" 
                        size="sm"
                        className="w-full group-hover:bg-muted transition-colors"
                      >
                        Open {card.title}
                      </Button>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>

          {/* Recent Activity */}
          <div>
            <h2 className="text-xl font-semibold text-foreground mb-4">Recent Activity</h2>
            <Card>
              <CardContent className="p-4">
                <div className="space-y-4">
                  {recentActivity.map((activity) => (
                    <div key={activity.id} className="flex items-start gap-3">
                      <div className="mt-1">
                        {getActivityIcon(activity.type)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-foreground">{activity.action}</p>
                        <p className="text-xs text-muted-foreground">{activity.timestamp}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <Button variant="outline" size="sm" className="w-full mt-4">
                  <Eye size={16} className="mr-2" />
                  View All Activity
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Recent Documents */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-foreground">Recent Documents</h2>
            <Button variant="outline" size="sm" onClick={() => onNavigate('master-list')}>
              View Global Templates
            </Button>
          </div>
          <Card>
            <CardContent className="p-0">
              <div className="divide-y divide-border">
                {recentDocuments.map((doc) => (
                  <div key={doc.id} className="p-4 hover:bg-muted/50 transition-colors cursor-pointer">
                    <div className="flex items-center justify-between">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-3">
                          <FileText size={20} className="text-muted-foreground" />
                          <div>
                            <p className="font-medium text-foreground">{doc.name}</p>
                            <div className="flex items-center gap-2 mt-1">
                              <Badge variant="secondary" className={`text-xs ${getStatusColor(doc.status)}`}>
                                {doc.status}
                              </Badge>
                              <span className="text-xs text-muted-foreground">{doc.type}</span>
                              <span className="text-xs text-muted-foreground">•</span>
                              <span className="text-xs text-muted-foreground">{doc.lastModified}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button variant="ghost" size="sm">
                          <Eye size={16} />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Download size={16} />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Insights */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Document Creation Trend</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-muted-foreground">This Month</span>
                    <span className="font-medium">75%</span>
                  </div>
                  <Progress value={75} className="h-2" />
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-muted-foreground">Templates Used</span>
                    <span className="font-medium">89%</span>
                  </div>
                  <Progress value={89} className="h-2" />
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-muted-foreground">Collaboration Rate</span>
                    <span className="font-medium">64%</span>
                  </div>
                  <Progress value={64} className="h-2" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Upcoming Deadlines</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <Calendar size={16} className="text-orange-500" />
                  <div className="flex-1">
                    <p className="text-sm font-medium">Annual Benefits Review</p>
                    <p className="text-xs text-muted-foreground">Due in 3 days</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Calendar size={16} className="text-red-500" />
                  <div className="flex-1">
                    <p className="text-sm font-medium">Compliance Update</p>
                    <p className="text-xs text-muted-foreground">Due tomorrow</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Calendar size={16} className="text-yellow-500" />
                  <div className="flex-1">
                    <p className="text-sm font-medium">Q1 Report Template</p>
                    <p className="text-xs text-muted-foreground">Due in 1 week</p>
                  </div>
                </div>
              </div>
              <Button variant="outline" size="sm" className="w-full mt-4">
                <Calendar size={16} className="mr-2" />
                View Calendar
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}