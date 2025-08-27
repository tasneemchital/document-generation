import { useState, useEffect } from 'react';
import { useKV } from '@github/spark/hooks';
import { Button } from '@/components/ui/button';
import { RefreshCw } from '@phosphor-icons/react';
import { Toaster } from '@/components/ui/sonner';
import { RuleGrid } from '@/components/RuleGrid';
import { RuleData } from '@/lib/types';
import { parseDraftCY2026 } from '@/lib/pdfParser';
import { toast } from 'sonner';

interface DocuGenPageProps {
  onNavigate: (page: string) => void;
}

export function DocuGenPage({ onNavigate }: DocuGenPageProps) {
  const [rules, setRules] = useKV<RuleData[]>('rule-data', []);
  const [isLoading, setIsLoading] = useState(true);

  const loadRuleData = async () => {
    setIsLoading(true);
    try {
      const data = await parseDraftCY2026();
      setRules(data);
      toast.success(`Loaded ${data.length} rules from CY2026 draft document`);
    } catch (error) {
      toast.error('Failed to load CY2026 draft data');
      console.error('Failed to load CY2026 draft data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    // Always load data on component mount to ensure we get the latest 25 rules
    loadRuleData();
  }, []);

  const handleRuleUpdate = (updatedRule: RuleData) => {
    setRules(current => 
      current.map(rule => 
        rule.id === updatedRule.id ? updatedRule : rule
      )
    );
  };

  return (
    <div className="h-full bg-background overflow-hidden flex flex-col">
      {/* Clean Header */}
      <div className="bg-card border-b border-border flex-shrink-0">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <h1 className="text-xl font-semibold text-foreground">Language Configuration Repeater</h1>
            </div>
            <Button
              onClick={loadRuleData}
              disabled={isLoading}
              variant="outline"
              size="sm"
              className="flex items-center gap-2"
            >
              <RefreshCw size={14} className={isLoading ? 'animate-spin' : ''} />
              Refresh Data
            </Button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-hidden p-6">
        {isLoading ? (
          <div className="bg-card rounded-lg border border-border p-12 text-center h-full flex items-center justify-center">
            <div className="flex items-center justify-center gap-3 text-muted-foreground">
              <RefreshCw size={20} className="animate-spin" />
              <span className="text-sm">Loading CY2026 draft document data...</span>
            </div>
          </div>
        ) : (
          <RuleGrid rules={rules} onRuleUpdate={handleRuleUpdate} />
        )}
      </div>

      <Toaster />
    </div>
  );
}