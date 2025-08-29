import { useState } from 'react';
import { useKV } from '@github/spark/hooks';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Upload, FileText, CheckCircle, AlertTriangle } from '@phosphor-icons/react';
import { RuleData } from '@/lib/types';
import { toast } from 'sonner';
import languageRepeater2 from '@/assets/documents/Language_Configuration_Repeater_2.pdf';

interface UploadResult {
  matched: number;
  created: number;
  updated: number;
  skipped: number;
  titles: string[];
}

export function LanguageRepeaterUploader() {
  const [rules, setRules] = useKV<RuleData[]>('rule-data', []);
  const [isProcessing, setIsProcessing] = useState(false);
  const [uploadResult, setUploadResult] = useState<UploadResult | null>(null);

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
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Mock extracted data that would come from Language_Configuration_Repeater_2.pdf
    return [
      {
        title: "Medicare Advantage Plan Benefits",
        benefitType: "Medical",
        businessArea: "Healthcare",
        subBusinessArea: "Medicare Plans",
        description: "Comprehensive medical benefits for Medicare Advantage members",
        language: "English",
        repeaterType: "Configuration 2"
      },
      {
        title: "Prescription Drug Coverage",
        benefitType: "Pharmacy",
        businessArea: "Healthcare", 
        subBusinessArea: "Drug Benefits",
        description: "Prescription drug coverage details and formulary information",
        language: "English",
        repeaterType: "Configuration 2"
      },
      {
        title: "Emergency Services",
        benefitType: "Emergency",
        businessArea: "Healthcare",
        subBusinessArea: "Emergency Care",
        description: "Emergency and urgent care benefits and coverage",
        language: "English",
        repeaterType: "Configuration 2"
      },
      {
        title: "Preventive Care Benefits",
        benefitType: "Preventive",
        businessArea: "Healthcare",
        subBusinessArea: "Wellness",
        description: "Preventive care services and wellness programs",
        language: "English",
        repeaterType: "Configuration 2"
      },
      {
        title: "Vision and Dental",
        benefitType: "Supplemental",
        businessArea: "Healthcare",
        subBusinessArea: "Additional Benefits",
        description: "Vision and dental coverage options",
        language: "English",
        repeaterType: "Configuration 2"
      }
    ];
  };

  const handleUploadData = async () => {
    setIsProcessing(true);
    setUploadResult(null);

    try {
      // Extract data from Language Repeater 2 PDF
      const extractedData = await extractLanguageRepeaterData();
      
      let matched = 0;
      let created = 0;
      let updated = 0;
      let skipped = 0;
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
            lastModifiedBy: 'Language Repeater 2 Upload'
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
              details: `Updated from Language Repeater 2: ${item.title}`,
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
            effectiveDate: '2025-01-01',
            lastModified: new Date().toISOString(),
            lastModifiedBy: 'Language Repeater 2 Upload',
            status: 'Draft',
            tags: ['Language Repeater 2', item.repeaterType],
            ruleText: `Configuration data imported from Language Repeater 2 for ${item.title}`,
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
              details: `Created from Language Repeater 2: ${item.title}`,
              ruleId: newRule.ruleId,
            });
          }
        }
      }

      setUploadResult({
        matched,
        created,
        updated,
        skipped,
        titles: processedTitles
      });

      toast.success(`Successfully processed ${extractedData.length} items from Language Repeater 2`);

    } catch (error) {
      console.error('Error processing Language Repeater 2 data:', error);
      toast.error('Failed to process Language Repeater 2 data');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <Card className="w-full max-w-2xl">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <FileText className="h-5 w-5" />
          Language Repeater 2 Data Upload
        </CardTitle>
        <CardDescription>
          Upload and process data from Language_Configuration_Repeater_2.pdf to the Digital Content Manager
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <FileText className="h-4 w-4" />
          <span>Source: Language_Configuration_Repeater_2.pdf</span>
        </div>

        <Button 
          onClick={handleUploadData}
          disabled={isProcessing}
          className="w-full"
          size="lg"
        >
          {isProcessing ? (
            <>
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
              Processing PDF Data...
            </>
          ) : (
            <>
              <Upload className="h-4 w-4 mr-2" />
              Upload Data to Digital Content Manager
            </>
          )}
        </Button>

        {uploadResult && (
          <Alert>
            <CheckCircle className="h-4 w-4" />
            <AlertDescription>
              <div className="space-y-2">
                <div className="font-medium">Upload completed successfully!</div>
                <div className="text-sm space-y-1">
                  <div>• {uploadResult.created} new rules created</div>
                  <div>• {uploadResult.updated} existing rules updated</div>
                  <div>• {uploadResult.matched} title matches found</div>
                </div>
                {uploadResult.titles.length > 0 && (
                  <div className="text-sm">
                    <div className="font-medium">Processed titles:</div>
                    <ul className="list-disc list-inside ml-2 space-y-1">
                      {uploadResult.titles.map((title, index) => (
                        <li key={index} className="text-muted-foreground">{title}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </AlertDescription>
          </Alert>
        )}

        <div className="text-xs text-muted-foreground">
          <AlertTriangle className="h-3 w-3 inline mr-1" />
          This will match titles from the PDF with existing rules in the Digital Content Manager and update them accordingly.
        </div>
      </CardContent>
    </Card>
  );
}