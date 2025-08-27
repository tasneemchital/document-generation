import { useState, useEffect } from 'react';
import { useKV } from '@github/spark/hooks';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { RefreshCw, ArrowLeft } from '@phosphor-icons/react';
import { Toaster } from '@/components/ui/sonner';
import { RuleGrid } from '@/components/RuleGrid';
import { RuleData } from '@/lib/types';
import { parseDraftCY2026 } from '@/lib/pdfParser';
import { toast } from 'sonner';
import logoSvg from '@/assets/images/logo.svg';

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
    if (rules.length === 0) {
      loadRuleData();
    } else {
      setIsLoading(false);
    }
  }, []);

  const handleRuleUpdate = (updatedRule: RuleData) => {
    setRules(current => 
      current.map(rule => 
        rule.id === updatedRule.id ? updatedRule : rule
      )
    );
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-4">
        {/* Header with back navigation */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-4">
            <Button
              onClick={() => onNavigate('dashboard')}
              variant="ghost"
              size="sm"
              className="flex items-center gap-2"
            >
              <ArrowLeft size={16} />
              Back to Dashboard
            </Button>
            <div className="flex items-center gap-3">
              <img src={logoSvg} alt="SimplifyDocs Logo" className="w-8 h-8" />
              <div>
                <h1 className="text-2xl font-semibold text-foreground">DocuGen - Manage</h1>
                <p className="text-sm text-muted-foreground">
                  CY2026 Draft Document Configuration Management
                </p>
              </div>
            </div>
          </div>
          <Button
            onClick={loadRuleData}
            disabled={isLoading}
            variant="outline"
            size="sm"
            className="flex items-center gap-2"
          >
            <RefreshCw size={14} className={isLoading ? 'animate-spin' : ''} />
            Load CY2026 Data
          </Button>
        </div>

        {/* Main Content */}
        {isLoading ? (
          <Card>
            <CardContent className="p-8 text-center">
              <div className="flex items-center justify-center gap-2 text-muted-foreground">
                <RefreshCw size={16} className="animate-spin" />
                <span>Loading CY2026 draft document data...</span>
              </div>
            </CardContent>
          </Card>
        ) : (
          <RuleGrid rules={rules} onRuleUpdate={handleRuleUpdate} />
        )}
      </div>

      <Toaster />
    </div>
  );
}