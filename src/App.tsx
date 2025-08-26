import { useState, useEffect } from 'react';
import { useKV } from '@github/spark/hooks';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { RefreshCw, Database, FileText, BookOpen, Languages } from '@phosphor-icons/react';
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

  const stats = {
    totalRules: rules.length,
    documents: Array.from(new Set(rules.map(r => r.documentName))).length,
    chapters: Array.from(new Set(rules.map(r => r.chapterName))).length,
    recentlyModified: rules.filter(r => 
      new Date().getTime() - new Date(r.lastModified).getTime() < 7 * 24 * 60 * 60 * 1000
    ).length
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-4xl font-bold text-foreground">DocuGen</h1>
              <p className="text-lg text-muted-foreground mt-1">
                Rule Management & Translation Platform
              </p>
            </div>
            <Button
              onClick={loadRuleData}
              disabled={isLoading}
              variant="outline"
              className="flex items-center gap-2"
            >
              <RefreshCw size={16} className={isLoading ? 'animate-spin' : ''} />
              Refresh Data
            </Button>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <FileText size={20} className="text-primary" />
                  <div>
                    <p className="text-2xl font-semibold">{stats.totalRules}</p>
                    <p className="text-sm text-muted-foreground">Total Rules</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <Database size={20} className="text-primary" />
                  <div>
                    <p className="text-2xl font-semibold">{stats.documents}</p>
                    <p className="text-sm text-muted-foreground">Documents</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <BookOpen size={20} className="text-primary" />
                  <div>
                    <p className="text-2xl font-semibold">{stats.chapters}</p>
                    <p className="text-sm text-muted-foreground">Chapters</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <Languages size={20} className="text-accent" />
                  <div>
                    <p className="text-2xl font-semibold">{stats.recentlyModified}</p>
                    <p className="text-sm text-muted-foreground">Recent Edits</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Main Content */}
        {isLoading ? (
          <Card>
            <CardContent className="p-8 text-center">
              <div className="flex items-center justify-center gap-2 text-muted-foreground">
                <RefreshCw size={20} className="animate-spin" />
                <span>Loading rule data...</span>
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