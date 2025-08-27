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
    <div className="min-h-screen bg-gray-50">
      {/* Clean Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-6">
              <Button
                onClick={() => onNavigate('dashboard')}
                variant="ghost"
                size="sm"
                className="flex items-center gap-2 text-gray-600 hover:text-gray-900"
              >
                <ArrowLeft size={16} />
                Back to Dashboard
              </Button>
              <div className="flex items-center gap-3">
                <img src={logoSvg} alt="SimplifyDocs Logo" className="w-8 h-8" />
                <h1 className="text-xl font-semibold text-gray-900">DocuGen - Manage</h1>
              </div>
            </div>
            <Button
              onClick={loadRuleData}
              disabled={isLoading}
              variant="outline"
              size="sm"
              className="flex items-center gap-2 border-gray-300 text-gray-700 hover:bg-gray-50"
            >
              <RefreshCw size={14} className={isLoading ? 'animate-spin' : ''} />
              Refresh Data
            </Button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-6">
        {isLoading ? (
          <div className="bg-white rounded-lg border border-gray-200 p-12 text-center">
            <div className="flex items-center justify-center gap-3 text-gray-500">
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