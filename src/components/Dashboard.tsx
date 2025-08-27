import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  Database, 
  FileText, 
  Share, 
  MessageCircle, 
  Users 
} from '@phosphor-icons/react';


interface DashboardProps {
  onNavigate: (page: string) => void;
}

export function Dashboard({ onNavigate }: DashboardProps) {
  const dashboardCards = [
    {
      id: 'manage',
      title: 'Manage',
      description: 'Configure and manage document rules, templates, and data structures',
      icon: Database,
      color: 'bg-primary text-primary-foreground',
      action: () => onNavigate('manage')
    },
    {
      id: 'generate',
      title: 'Generate',
      description: 'Create documents from templates using configured rules and data',
      icon: FileText,
      color: 'bg-accent text-accent-foreground',
      action: () => console.log('Generate clicked')
    },
    {
      id: 'publish',
      title: 'Publish',
      description: 'Review, approve, and distribute generated documents to stakeholders',
      icon: Share,
      color: 'bg-secondary text-secondary-foreground',
      action: () => console.log('Publish clicked')
    },
    {
      id: 'interact',
      title: 'Interact',
      description: 'Engage with published content through comments and feedback systems',
      icon: MessageCircle,
      color: 'bg-muted text-muted-foreground',
      action: () => console.log('Interact clicked')
    },
    {
      id: 'collaborate',
      title: 'Collaborate',
      description: 'Work together with team members on document creation and review',
      icon: Users,
      color: 'bg-destructive text-destructive-foreground',
      action: () => console.log('Collaborate clicked')
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-foreground mb-4">
            SimplifyDocs
          </h1>
        </div>

        {/* Dashboard Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {dashboardCards.map((card) => {
            const IconComponent = card.icon;
            return (
              <Card 
                key={card.id} 
                className="transition-all duration-200 hover:shadow-lg hover:-translate-y-1 cursor-pointer group"
                onClick={card.action}
              >
                <CardHeader className="pb-4">
                  <div className="flex items-center gap-3 mb-2">
                    <div className={`p-2 rounded-lg ${card.color} transition-transform group-hover:scale-110`}>
                      <IconComponent size={24} weight="bold" />
                    </div>
                    <CardTitle className="text-xl font-semibold">
                      {card.title}
                    </CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="pt-0">
                  <p className="text-muted-foreground leading-relaxed mb-4">
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

        {/* Footer */}
        <div className="text-center mt-16 text-sm text-muted-foreground">
          <p>Select a module above to begin your document workflow journey.</p>
        </div>
      </div>
    </div>
  );
}