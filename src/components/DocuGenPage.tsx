import { useState, useEffect } from 'react';
import { useKV } from '@github/spark/hooks';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { RefreshCw } from '@phosphor-icons/react';
import { Toaster } from '@/components/ui/sonner';
import { RuleGrid } from '@/components/RuleGrid';
import { ActivityLog } from '@/components/ActivityLog';
import { RuleData } from '@/lib/types';
import { parseDraftCY2026 } from '@/lib/pdfParser';
import { toast } from 'sonner';

interface DocuGenPageProps {
  onNavigate: (page: string) => void;
}

export function DocuGenPage({ onNavigate }: DocuGenPageProps) {
  const [rules, setRules] = useKV<RuleData[]>('rule-data', []);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedConfig, setSelectedConfig] = useKV<string>('selected-config', 'digital-content-manager');
  const [activityLogCollapsed, setActivityLogCollapsed] = useKV<boolean>('activity-log-collapsed', false);

  const loadRuleData = async () => {
    setIsLoading(true);
    try {
      const data = await parseDraftCY2026();
      setRules(data);
      toast.success(`Loaded ${data.length} rules from CY2026 draft document`);
      
      // Log the data loading activity
      if ((window as any).addActivityLog) {
        (window as any).addActivityLog({
          user: 'Current User',
          action: 'view',
          target: 'CY2026 Draft Document',
          details: `Loaded ${data.length} rules from draft document`,
        });
      }
    } catch (error) {
      toast.error('Failed to load CY2026 draft data');
      console.error('Failed to load CY2026 draft data:', error);
      
      // Log the error activity
      if ((window as any).addActivityLog) {
        (window as any).addActivityLog({
          user: 'Current User',
          action: 'view',
          target: 'CY2026 Draft Document',
          details: 'Failed to load draft document data',
        });
      }
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    // Always load data on component mount to ensure we get the latest 25 rules
    loadRuleData();
  }, []);

  useEffect(() => {
    // Navigate to Digital Content Manager when selected
    if (selectedConfig === 'digital-content-manager') {
      onNavigate('digital-content-manager');
    }
  }, [selectedConfig, onNavigate]);

  const handleRuleUpdate = (updatedRule: RuleData) => {
    setRules(current => 
      current.map(rule => 
        rule.id === updatedRule.id ? updatedRule : rule
      )
    );
    
    // Log the rule update activity
    if ((window as any).addActivityLog) {
      (window as any).addActivityLog({
        user: 'Current User',
        action: 'edit',
        target: `Rule ${updatedRule.ruleId || 'N/A'}`,
        details: `Updated rule in ${updatedRule.templateName || 'Unknown Template'}`,
        ruleId: updatedRule.ruleId,
      });
    }
  };

  return (
    <div className="h-full bg-background overflow-hidden flex flex-col relative">
      {/* Compact Header */}
      <div className="bg-card border-b border-border flex-shrink-0">
        <div className="px-6 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Select value={selectedConfig} onValueChange={setSelectedConfig}>
                <SelectTrigger className="w-64">
                  <SelectValue placeholder="Select configuration" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="digital-content-manager">Digital Content Manager - ANOC-EOC</SelectItem>
                  <SelectItem value="medicare-anoc">Medicare ANOC</SelectItem>
                  <SelectItem value="medicare-eoc">Medicare EOC</SelectItem>
                </SelectContent>
              </Select>
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

      {/* Main Content - Adjusted Height for Activity Log */}
      <div className={`flex-1 overflow-hidden ${activityLogCollapsed ? '' : 'pb-64'}`}>
        {isLoading ? (
          <div className="bg-card p-12 text-center h-full flex items-center justify-center">
            <div className="flex items-center justify-center gap-3 text-muted-foreground">
              <RefreshCw size={20} className="animate-spin" />
              <span className="text-sm">Loading CY2026 draft document data...</span>
            </div>
          </div>
        ) : (
          <RuleGrid rules={rules} onRuleUpdate={handleRuleUpdate} />
        )}
      </div>

      {/* Activity Log at Bottom */}
      <div className={`absolute bottom-0 left-0 right-0 z-10 ${activityLogCollapsed ? 'h-auto' : 'h-64'}`}>
        <ActivityLog 
          isCollapsed={activityLogCollapsed}
          onToggle={() => setActivityLogCollapsed(!activityLogCollapsed)}
        />
      </div>

      <Toaster />
    </div>
  );
}