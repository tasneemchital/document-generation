import { useEffect, useState } from 'react';
import { useKV } from '@github/spark/hooks';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Toaster } from '@/components/ui/sonner';
import { RuleGrid } from '@/components/RuleGrid';
import { ActivityLog } from '@/components/ActivityLog';
import { MedicareEOCMasterList } from '@/components/MedicareEOCMasterList';
import { LanguageRepeaterUploader } from '@/components/LanguageRepeaterUploader';
import { RuleData } from '@/lib/types';
import { generateMockRuleData } from '@/lib/mockRuleData';
import { Upload } from '@phosphor-icons/react';

interface DocuGenPageProps {
  onNavigate: (page: string) => void;
}

export function DocuGenPage({ onNavigate }: DocuGenPageProps) {
  const [rules, setRules] = useKV<RuleData[]>('rule-data', []);
  const [selectedConfig, setSelectedConfig] = useKV<string>('selected-config', 'digital-content-manager');
  const [selectedMedicareType, setSelectedMedicareType] = useKV<string>('selected-medicare-type', 'medicare-anoc');
  const [activityLogCollapsed, setActivityLogCollapsed] = useKV<boolean>('activity-log-collapsed', false);
  const [showUploader, setShowUploader] = useState(false);

  useEffect(() => {
    // Navigate to Digital Content Manager when selected
    if (selectedConfig === 'digital-content-manager') {
      onNavigate('digital-content-manager');
    }
  }, [selectedConfig, onNavigate]);

  useEffect(() => {
    // Load mock data if no rules exist - ensure rules is an array
    if (!Array.isArray(rules) || rules.length === 0) {
      generateMockRuleData().then(mockRules => {
        setRules(mockRules);
      });
    }
  }, [rules, setRules]);

  const handleRuleUpdate = (updatedRule: RuleData) => {
    setRules(current => {
      if (!Array.isArray(current)) {
        console.error('Rules state is not an array:', current);
        return [updatedRule];
      }
      return current.map(rule => 
        rule.id === updatedRule.id ? updatedRule : rule
      );
    });
    
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

  const handleRuleCreate = (newRule: RuleData) => {
    setRules(current => {
      if (!Array.isArray(current)) {
        console.error('Rules state is not an array:', current);
        return [newRule];
      }
      return [newRule, ...current];
    });
    
    // Log the rule creation activity
    if ((window as any).addActivityLog) {
      (window as any).addActivityLog({
        user: 'Current User',
        action: 'create',
        target: `Rule ${newRule.ruleId}`,
        details: `Created new rule with auto-generated ID: ${newRule.ruleId}`,
        ruleId: newRule.ruleId,
      });
    }
  };

  // If Medicare EOC is selected, show the Master List view
  if (selectedConfig === 'medicare-eoc') {
    return <MedicareEOCMasterList onNavigate={onNavigate} />;
  }

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
              
              {selectedConfig === 'digital-content-manager' && (
                <Button 
                  variant="outline" 
                  onClick={() => setShowUploader(!showUploader)}
                  className="flex items-center gap-2"
                >
                  <Upload className="h-4 w-4" />
                  Language Repeater 2
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Main Content - Adjusted Height for Activity Log */}
      <div className={`flex-1 overflow-hidden ${activityLogCollapsed ? '' : 'pb-64'}`}>
        {showUploader && selectedConfig === 'digital-content-manager' ? (
          <div className="p-6 flex justify-center">
            <LanguageRepeaterUploader />
          </div>
        ) : (
          <RuleGrid 
            rules={rules} 
            onRuleUpdate={handleRuleUpdate}
            onRuleCreate={handleRuleCreate}
          />
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