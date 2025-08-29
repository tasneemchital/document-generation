import { useKV } from '@github/spark/hooks';
import { Layout } from '@/components/Layout';
import { Dashboard } from '@/components/Dashboard';
import { DocuGenPage } from '@/components/DocuGenPage';
import { DigitalContentManager } from '@/components/DigitalContentManager';

function App() {
  const [currentPage, setCurrentPage] = useKV<string>('current-page', 'dashboard');

  const handleNavigate = (page: string) => {
    setCurrentPage(page);
  };

  const renderCurrentPage = () => {
    switch (currentPage) {
      case 'dashboard':
        return <Dashboard onNavigate={handleNavigate} />;
      case 'master-list':
      case 'manage':
        return <DocuGenPage onNavigate={handleNavigate} />;
      case 'digital-content-manager':
        return <DigitalContentManager onNavigate={handleNavigate} />;
      case 'collaborate':
        return <PlaceholderPage title="Collaborate" description="Collaborate seamlessly with multiple stakeholders via automated workflows, version control and transparent audit" />;
      case 'generate':
        return <PlaceholderPage title="Generate" description="Generate documents in Word, Print X, 508 and large print in English and other languages" />;
      case 'integrate':
        return <PlaceholderPage title="Integrate" description="Reuse and stream content across multiple channels seamlessly" />;
      case 'admin-settings':
        return <PlaceholderPage title="Admin Settings" description="Administrative settings coming soon" />;
      case 'design-studio':
        return <PlaceholderPage title="Design Studio" description="Design tools coming soon" />;
      default:
        return <Dashboard onNavigate={handleNavigate} />;
    }
  };

  return (
    <Layout currentPage={currentPage} onNavigate={handleNavigate}>
      {renderCurrentPage()}
    </Layout>
  );
}

// Placeholder component for pages not yet implemented
function PlaceholderPage({ title, description }: { title: string; description: string }) {
  return (
    <div className="flex items-center justify-center h-full bg-background">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-foreground mb-4">{title}</h1>
        <p className="text-muted-foreground">{description}</p>
      </div>
    </div>
  );
}

export default App;