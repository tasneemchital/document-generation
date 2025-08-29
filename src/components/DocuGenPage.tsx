import { useEffect } from 'react';
import { useKV } from '@github/spark/hooks';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Toaster } from '@/components/ui/sonner';
import { RuleGrid } from '@/components/RuleGrid';
import { ActivityLog } from '@/components/ActivityLog';
import { MedicareEOCMasterList } from '@/components/MedicareEOCMasterList';
import { RuleData } from '@/lib/types';
import { generateMockRuleData } from '@/lib/mockRuleData';
import { toast } from 'sonner';

interface DocuGenPageProps {
  onNavigate: (page: string) => void;
}

export function DocuGenPage({ onNavigate }: DocuGenPageProps) {
  const [rules, setRules] = useKV<RuleData[]>('rule-data', []);
  const [selectedConfig, setSelectedConfig] = useKV<string>('selected-config', 'digital-content-manager-anoc-eoc');
  const [selectedMedicareType, setSelectedMedicareType] = useKV<string>('selected-medicare-type', 'medicare-anoc');
  const [activityLogCollapsed, setActivityLogCollapsed] = useKV<boolean>('activity-log-collapsed', false);
  const [langRepeaterDataLoaded, setLangRepeaterDataLoaded] = useKV<boolean>('lang-repeater-data-loaded', false);

  useEffect(() => {
    // Navigate to Digital Content Manager when selected
    if (selectedConfig === 'digital-content-manager' || selectedConfig === 'digital-content-manager-anoc-eoc') {
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

  // Auto-load Language Repeater 2 data when Digital Content Manager is selected
  useEffect(() => {
    if ((selectedConfig === 'digital-content-manager' || selectedConfig === 'digital-content-manager-anoc-eoc') && !langRepeaterDataLoaded && Array.isArray(rules)) {
      loadLanguageRepeaterData();
    }
  }, [selectedConfig, langRepeaterDataLoaded, rules]);

  // Mock data extraction from Language Repeater 2 - simulates PDF parsing
  const extractLanguageRepeaterData = async (): Promise<Array<{
    title: string;
    benefitType: string;
    businessArea: string;
    subBusinessArea: string;
    description: string;
    language: string;
    repeaterType: string;
  }>> => {
    // Simulate PDF processing delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Mock extracted data that would come from Language_Configuration_Repeater_2.pdf
    return [
      {
        title: "Medicare Advantage Plan Benefits",
        benefitType: "Medical",
        businessArea: "Healthcare",
        subBusinessArea: "Medicare Plans",
        description: "Comprehensive medical benefits for Medicare Advantage members",
        language: "English",
        repeaterType: "ANOC-EOC"
      },
      {
        title: "Prescription Drug Coverage",
        benefitType: "Pharmacy",
        businessArea: "Healthcare", 
        subBusinessArea: "Drug Benefits",
        description: "Prescription drug coverage details and formulary information",
        language: "English",
        repeaterType: "ANOC-EOC"
      },
      {
        title: "Emergency Services",
        benefitType: "Emergency",
        businessArea: "Healthcare",
        subBusinessArea: "Emergency Care",
        description: "Emergency and urgent care benefits and coverage",
        language: "English",
        repeaterType: "ANOC-EOC"
      },
      {
        title: "Preventive Care Benefits",
        benefitType: "Preventive",
        businessArea: "Healthcare",
        subBusinessArea: "Wellness",
        description: "Preventive care services and wellness programs",
        language: "English",
        repeaterType: "ANOC-EOC"
      },
      {
        title: "Vision and Dental",
        benefitType: "Supplemental",
        businessArea: "Healthcare",
        subBusinessArea: "Additional Benefits",
        description: "Vision and dental coverage options",
        language: "English",
        repeaterType: "ANOC-EOC"
      },
      {
        title: "Transportation Services",
        benefitType: "Transportation",
        businessArea: "Healthcare",
        subBusinessArea: "Additional Benefits",
        description: "Medical transportation benefits and coverage",
        language: "English",
        repeaterType: "ANOC-EOC"
      },
      {
        title: "Over-the-Counter Benefits",
        benefitType: "OTC",
        businessArea: "Healthcare",
        subBusinessArea: "Additional Benefits",
        description: "Over-the-counter medication and health item benefits",
        language: "English",
        repeaterType: "ANOC-EOC"
      },
      {
        title: "Mental Health Services",
        benefitType: "Mental Health",
        businessArea: "Healthcare",
        subBusinessArea: "Behavioral Health",
        description: "Mental health and behavioral health services coverage",
        language: "English",
        repeaterType: "ANOC-EOC"
      }
    ];
  };

  const loadLanguageRepeaterData = async () => {
    try {
      // Extract data from Language Repeater 2 PDF
      const extractedData = await extractLanguageRepeaterData();
      
      let matched = 0;
      let created = 0;
      let updated = 0;
      const processedTitles: string[] = [];

      // Process each extracted item
      for (const item of extractedData) {
        const existingRule = rules.find(rule => 
          rule.templateName?.toLowerCase().includes(item.title.toLowerCase()) ||
          item.title.toLowerCase().includes(rule.templateName?.toLowerCase() || '')
        );

        if (existingRule) {
          // Update existing rule with new data
          const updatedRule: RuleData = {
            ...existingRule,
            benefitType: item.benefitType,
            businessArea: item.businessArea,
            subBusinessArea: item.subBusinessArea,
            description: item.description,
            lastModified: new Date().toISOString(),
            lastModifiedBy: 'Language Repeater 2 Auto-Load'
          };

          setRules(current => 
            current.map(rule => 
              rule.id === existingRule.id ? updatedRule : rule
            )
          );

          matched++;
          updated++;
          processedTitles.push(item.title);

          // Log the update activity
          if ((window as any).addActivityLog) {
            (window as any).addActivityLog({
              user: 'System',
              action: 'upload',
              target: `Rule ${existingRule.ruleId}`,
              details: `Auto-updated from Language Repeater 2: ${item.title}`,
              ruleId: existingRule.ruleId,
            });
          }
        } else {
          // Create new rule from extracted data
          const newRule: RuleData = {
            id: `rule_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
            ruleId: `LR2_${Date.now().toString().slice(-6)}`,
            templateName: item.title,
            version: '1.0',
            benefitType: item.benefitType,
            businessArea: item.businessArea,
            subBusinessArea: item.subBusinessArea,
            description: item.description,
            effectiveDate: '01/01/2025',
            lastModified: new Date().toISOString(),
            lastModifiedBy: 'Language Repeater 2 Auto-Load',
            status: 'Draft',
            tags: ['Language Repeater 2', item.repeaterType],
            ruleText: `Configuration data auto-imported from Language Repeater 2 for ${item.title}`,
            conditions: []
          };

          setRules(current => [newRule, ...current]);
          created++;
          processedTitles.push(item.title);

          // Log the creation activity
          if ((window as any).addActivityLog) {
            (window as any).addActivityLog({
              user: 'System',
              action: 'create',
              target: `Rule ${newRule.ruleId}`,
              details: `Auto-created from Language Repeater 2: ${item.title}`,
              ruleId: newRule.ruleId,
            });
          }
        }
      }

      setLangRepeaterDataLoaded(true);
      toast.success(`Auto-loaded ${extractedData.length} items from Language Repeater 2 (${created} created, ${updated} updated)`);

    } catch (error) {
      console.error('Error loading Language Repeater 2 data:', error);
      toast.error('Failed to auto-load Language Repeater 2 data');
    }
  };

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
                  <SelectItem value="digital-content-manager">Digital Content Manager</SelectItem>
                  <SelectItem value="digital-content-manager-anoc-eoc">Digital Content Manager - ANOC-EOC</SelectItem>
                  <SelectItem value="medicare-anoc">Medicare ANOC</SelectItem>
                  <SelectItem value="medicare-eoc">Medicare EOC</SelectItem>
                </SelectContent>
              </Select>

            </div>
          </div>
        </div>
      </div>

      {/* Main Content - Adjusted Height for Activity Log */}
      <div className={`flex-1 overflow-hidden ${activityLogCollapsed ? '' : 'pb-64'}`}>
        <RuleGrid 
          rules={rules} 
          onRuleUpdate={handleRuleUpdate}
          onRuleCreate={handleRuleCreate}
        />
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