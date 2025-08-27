import { ReactNode } from 'react';
import { 
  LayoutDashboard, 
  List, 
  Users, 
  FileText, 
  Share, 
  Settings, 
  Palette 
} from '@phosphor-icons/react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface LayoutProps {
  children: ReactNode;
  currentPage: string;
  onNavigate: (page: string) => void;
}

const navigationItems = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { id: 'master-list', label: 'Master List', icon: List },
  { id: 'collaborate', label: 'Collaborate', icon: Users },
  { id: 'generate', label: 'Generate', icon: FileText },
  { id: 'publish', label: 'Publish', icon: Share },
  { id: 'admin-settings', label: 'Admin Settings', icon: Settings },
  { id: 'design-studio', label: 'Design Studio', icon: Palette },
];

export function Layout({ children, currentPage, onNavigate }: LayoutProps) {
  return (
    <div className="flex h-screen bg-background">
      {/* Left Navigation Pane */}
      <div className="w-64 bg-card border-r border-border flex flex-col">
        {/* Logo/Header */}
        <div className="p-6 border-b border-border">
          <h1 className="text-xl font-semibold text-foreground">SimplifyDocs</h1>
        </div>
        
        {/* Navigation Items */}
        <nav className="flex-1 p-4 space-y-2">
          {navigationItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentPage === item.id;
            
            return (
              <Button
                key={item.id}
                variant={isActive ? "default" : "ghost"}
                className={cn(
                  "w-full justify-start gap-3 text-left",
                  isActive 
                    ? "bg-primary text-primary-foreground" 
                    : "text-muted-foreground hover:text-foreground hover:bg-secondary"
                )}
                onClick={() => onNavigate(item.id)}
              >
                <Icon size={20} />
                <span>{item.label}</span>
              </Button>
            );
          })}
        </nav>
      </div>
      
      {/* Main Content Area */}
      <div className="flex-1 overflow-hidden">
        {children}
      </div>
    </div>
  );
}