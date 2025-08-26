import { useState, useEffect } from 'react';
import { useKV } from '@github/spark/hooks';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { RefreshCw } from '@phosphor-icons/react';
import { Toaster } from '@/components/ui/sonner';
import { RuleGrid } from '@/components/RuleGrid';
import { RuleData } from '@/lib/types';
import { generateMockRuleData } from '@/lib/mockRuleData';
import { toast } from 'sonner';

function App() {
  const [rules, setRules] = useKV<RuleData[]>('rule-data', []);
  const [isLoading, setIsLoading] = useState(true);

  const loadRuleData = async () => {
    setIsLoading(true);
    try {
      const data = await generateMockRuleData();
      setRules(data);
      toast.success('Rule data loaded successfully');
    } catch (error) {
      toast.error('Failed to load rule data');
      console.error('Failed to load rule data:', error);
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
        {/* Simple header */}
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-2xl font-semibold text-foreground">DocuGen</h1>
            <p className="text-sm text-muted-foreground">
              Document Configuration Management
            </p>
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

        {/* Main Content */}
        {isLoading ? (
          <Card>
            <CardContent className="p-8 text-center">
              <div className="flex items-center justify-center gap-2 text-muted-foreground">
                <RefreshCw size={16} className="animate-spin" />
                <span>Loading configuration data...</span>
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

export default App;