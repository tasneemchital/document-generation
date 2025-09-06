import { useKV } from '@github/spark/hooks';
import { Layout } from '@/components/Layout';
import { Dashboard } from '@/components/Dashboard';
import { MedicareEOCDashboard } from '@/components/MedicareEOCDashboard';
import { DocuGenPage } from '@/components/DocuGenPage';
import { DigitalContentManager } from '@/components/DigitalContentManager';
import { RuleDetailsPage } from '@/components/RuleDetailsPage';
import { DCMEditPage } from '@/components/DCMEditPage';
import { RuleData } from '@/lib/types';

function App() {
  const [currentPage, setCurrentPage] = useKV<string>('current-page', 'dashboard');
  const [editingRule, setEditingRule] = useKV<RuleData | null>('editing-rule', null);
  const [rules, setRules] = useKV<RuleData[]>('rule-data', []);

  const handleNavigate = (page: string) => {
    setCurrentPage(page);
    if (page !== 'rule-details' && page !== 'edit-rule' && page !== 'dcm-edit') {
      setEditingRule(null);
    }
  };

  const handleEditRule = (rule: RuleData) => {
    setEditingRule(rule);
    setCurrentPage('edit-rule');
  };

  const handleEditDCMRule = (rule: RuleData) => {
    setEditingRule(rule);
    setCurrentPage('dcm-edit');
  };

  const handleCreateRule = () => {
    setEditingRule(null);
    setCurrentPage('rule-details');
  };

  const handleSaveRule = (rule: RuleData) => {
    setRules(current => {
      if (!Array.isArray(current)) {
        return [rule];
      }
      const existingIndex = current.findIndex(r => r.id === rule.id);
      if (existingIndex >= 0) {
        // Update existing rule
        return current.map(r => r.id === rule.id ? rule : r);
      } else {
        // Add new rule
        return [rule, ...current];
      }
    });
  };

  const renderCurrentPage = () => {
    switch (currentPage) {
      case 'dashboard':
        return <Dashboard onNavigate={handleNavigate} />;
      case 'medicare-eoc':
        return <MedicareEOCDashboard onNavigate={handleNavigate} />;
      case 'master-list':
      case 'manage':
        return <DocuGenPage onNavigate={handleNavigate} onEditRule={handleEditRule} onCreateRule={handleCreateRule} />;
      case 'rule-details':
        return <RuleDetailsPage onNavigate={handleNavigate} mode="create" />;
      case 'edit-rule':
        return <RuleDetailsPage onNavigate={handleNavigate} rule={editingRule} mode="edit" />;
      case 'digital-content-manager':
        return <DigitalContentManager onNavigate={handleNavigate} onEditRule={handleEditDCMRule} />;
      case 'dcm-edit':
        return <DCMEditPage rule={editingRule} onNavigate={handleNavigate} onSave={handleSaveRule} mode={editingRule ? 'edit' : 'create'} />;
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