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

  return (
    <div className="h-full bg-background overflow-auto">
      <div className="container mx-auto px-6 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Dashboard
          </h1>
          <p className="text-muted-foreground">
            Select a module below to get started with your document workflow.
          </p>
        </div>

        {/* Dashboard Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
                      {card.title === 'Ask BNI (Benny)' ? (
                        <>Ask BNI (<em>Benny</em>)</>
                      ) : (
                        card.title
                      )}
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
      </div>
    </div>
  );
}