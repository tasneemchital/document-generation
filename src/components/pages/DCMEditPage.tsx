import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { DatePicker } from '@/components/ui/date-picker';
import { Separator } from '@/components/ui/separator';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { ArrowLeft, Calendar, MapPin, Gear, FileText, Globe, Check, X, Robot } from '@phosphor-icons/react';
import { format, parse, isValid } from 'date-fns';
import { RuleData } from '@/lib/types';
import { toast } from 'sonner';

declare global {
  interface Window {
    spark: {
      llmPrompt: (strings: TemplateStringsArray, ...values: any[]) => string;
      llm: (prompt: string, modelName?: string, jsonMode?: boolean) => Promise<string>;
    }
  }
}

const spark = (window as any).spark;

interface DCMEditPageProps {
  rule: RuleData | null;
  onNavigate: (page: string) => void;
  onSave?: (rule: RuleData) => void;
  mode: 'edit' | 'create';
}

export function DCMEditPage({ rule, onNavigate, onSave, mode }: DCMEditPageProps) {
  const [formData, setFormData] = useState<RuleData>({
    id: '',
    ruleId: '',
    effectiveDate: '01/01/2026',
    version: '2026',
    benefitType: 'Out of Pocket Maximum',
    businessArea: 'Marketing',
    subBusinessArea: 'MRK: DNSP',
    description: 'Headline',
    templateName: 'Fitness Rider',
    serviceId: 'SRV001',
    cmsRegulated: false,
    chapterName: 'General Information',
    sectionName: 'Benefits Coverage',
    subsectionName: 'Medical Services',
    serviceGroup: 'INN',
    sourceMapping: 'Benefits1 Mapping',
    tiers: 'Tier 1',
    key: 'Medicare|Acupuncture|Package|=',
    rule: 'Standard Coverage Rule',
    isTabular: false,
    english: '',
    englishStatus: 'Draft',
    spanish: '',
    spanishStatus: 'Draft',
    published: false,
    createdAt: new Date(),
    lastModified: new Date()
  });

  const [isLoading, setIsLoading] = useState(false);
  const [aiPromptOpen, setAiPromptOpen] = useState(false);
  const [aiPromptText, setAiPromptText] = useState('');
  const [isGeneratingRule, setIsGeneratingRule] = useState(false);
  const [generatedRuleCondition, setGeneratedRuleCondition] = useState('');
  const [selectedLanguage, setSelectedLanguage] = useState<'english' | 'spanish' | 'chinese'>('english');
  const [selectedPlan, setSelectedPlan] = useState<string>('');
  const [chineseContent, setChineseContent] = useState('');

  useEffect(() => {
    if (rule && mode === 'edit') {
      setFormData(rule);
    } else if (mode === 'create') {
      // Add sample content for new rules
      setFormData(prev => ({
        ...prev,
        english: `IF(planType="Medicare Advantage")
  Your {planName} plan includes {benefit} with a {copay} copay and {deductible} deductible.
ELSE
  Your {planName} includes {benefit}.
ENDIF

For more information, contact customer service.`,
        spanish: `IF(planType="Medicare Advantage")
  Su plan {planName} incluye {benefit} con un copago de {copay} y deducible de {deductible}.
ELSE
  Su {planName} incluye {benefit}.
ENDIF

Para más información, contacte al servicio al cliente.`
      }));
      setChineseContent(`IF(planType="Medicare Advantage")
  您的{planName}计划包括{benefit}，共付额为{copay}，免赔额为{deductible}。
ELSE
  您的{planName}包括{benefit}。
ENDIF

如需更多信息，请联系客户服务。`);
    }
  }, [rule, mode]);

  const formatDateForDisplay = (dateString: string): Date | undefined => {
    if (!dateString) return undefined;
    try {
      // Try to parse as ISO date first
      let date = new Date(dateString);
      if (isValid(date)) {
        return date;
      }
      
      // Try to parse as MM/dd/yyyy format
      date = parse(dateString, 'MM/dd/yyyy', new Date());
      if (isValid(date)) {
        return date;
      }
      
      // Try to parse as MM-dd-yyyy format
      date = parse(dateString, 'MM-dd-yyyy', new Date());
      if (isValid(date)) {
        return date;
      }
      
      return undefined;
    } catch {
      return undefined;
    }
  };

  const formatDateForStorage = (date: Date): string => {
    return format(date, 'MM/dd/yyyy');
  };

  const handleInputChange = (field: keyof RuleData, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value,
      lastModified: new Date()
    }));
  };

  const handleDateChange = (newDate: Date | undefined) => {
    if (newDate) {
      handleInputChange('effectiveDate', formatDateForStorage(newDate));
    }
  };

  const handleSave = async () => {
    setIsLoading(true);
    try {
      // Validation
      if (!formData.templateName || !formData.templateName.trim()) {
        toast.error('Benefit Category is required');
        return;
      }
      if (!formData.benefitType || !formData.benefitType.trim()) {
        toast.error('Benefit Type is required');
        return;
      }
      if (!formData.businessArea || !formData.businessArea.trim()) {
        toast.error('Business Area is required');
        return;
      }
      if (!formData.subBusinessArea || !formData.subBusinessArea.trim()) {
        toast.error('Sub-Business Area is required');
        return;
      }

      // Generate rule ID if creating new
      if (mode === 'create') {
        const newRuleId = `R${String(Date.now()).slice(-4)}`;
        formData.ruleId = newRuleId;
        formData.id = `rule-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
        formData.createdAt = new Date();
      }

      if (onSave) {
        onSave(formData);
      }

      // Log the activity
      if ((window as any).addActivityLog) {
        (window as any).addActivityLog({
          user: 'Current User',
          action: mode === 'create' ? 'create' : 'edit',
          target: `Rule ${formData.ruleId}`,
          details: `${mode === 'create' ? 'Created' : 'Updated'} rule details`,
          ruleId: formData.ruleId,
        });
      }

      toast.success(`Rule ${mode === 'create' ? 'created' : 'updated'} successfully!`);
      onNavigate('dcm');
    } catch (error) {
      console.error('Error saving rule:', error);
      toast.error('Failed to save rule');
    } finally {
      setIsLoading(false);
    }
  };

  const handleValidate = () => {
    // Mock validation - in real app this would validate business rules
    toast.success('Rule validation passed successfully');
  };

  const handleClear = () => {
    if (confirm('Are you sure you want to clear all changes?')) {
      if (mode === 'edit' && rule) {
        setFormData(rule);
      } else {
        setFormData({
          id: '',
          ruleId: '',
          effectiveDate: '01/01/2026',
          version: '2026',
          benefitType: 'Out of Pocket Maximum',
          businessArea: 'Marketing',
          subBusinessArea: 'MRK: DNSP',
          description: 'Headline',
          templateName: 'Fitness Rider',
          serviceId: '',
          cmsRegulated: false,
          chapterName: '',
          sectionName: '',
          subsectionName: '',
          serviceGroup: 'INN',
          sourceMapping: '',
          tiers: '',
          key: 'Medicare|Acupuncture|Package|=',
          rule: '',
          isTabular: false,
          english: '',
          englishStatus: 'Draft',
          spanish: '',
          spanishStatus: 'Draft',
          published: false,
          createdAt: new Date(),
          lastModified: new Date()
        });
      }
      toast.info('Form cleared');
    }
  };

  const handleAiPromptCreate = async () => {
    if (!aiPromptText.trim()) {
      toast.error('Please enter a description for the rule condition');
      return;
    }

    setIsGeneratingRule(true);
    try {
      const prompt = spark.llmPrompt`You are a benefits rule expert. Based on this natural language description, generate a rule key expression that follows the pattern "Category|Subcategory|Type|Operator" where:
      - Category could be Medicare, Commercial, Group, etc.
      - Subcategory could be specific benefit types like Acupuncture, PCP Visit, etc.
      - Type could be Package, Individual, Family, etc.
      - Operator could be =, >, <, >=, <=, etc.

      Description: ${aiPromptText}

      Return only the rule key expression, nothing else.`;

      const generatedRule = await spark.llm(prompt);
      
      // Store the generated rule condition for display
      setGeneratedRuleCondition(generatedRule.trim());
      
      toast.success('Rule key generated successfully!');
    } catch (error) {
      console.error('Error generating rule:', error);
      toast.error('Failed to generate rule key. Please try again.');
    } finally {
      setIsGeneratingRule(false);
    }
  };

  // Helper functions for the new Content Template & Preview section
  const getSelectedLanguageContent = (): string => {
    switch (selectedLanguage) {
      case 'english':
        return formData.english || '';
      case 'spanish':
        return formData.spanish || '';
      case 'chinese':
        return chineseContent;
      default:
        return '';
    }
  };

  const handleLanguageContentChange = (content: string) => {
    switch (selectedLanguage) {
      case 'english':
        handleInputChange('english', content);
        break;
      case 'spanish':
        handleInputChange('spanish', content);
        break;
      case 'chinese':
        setChineseContent(content);
        break;
    }
  };

  const getEditorPlaceholder = (): string => {
    switch (selectedLanguage) {
      case 'english':
        return `Enter English content template with IF statements...

Example:
IF(planType="Medicare Advantage")
  Your Medicare Advantage plan includes {benefit}.
ELSE
  Your plan includes {benefit}.
ENDIF`;
      case 'spanish':
        return `Ingrese la plantilla de contenido en español con declaraciones IF...

Ejemplo:
IF(planType="Medicare Advantage")
  Su plan Medicare Advantage incluye {benefit}.
ELSE
  Su plan incluye {benefit}.
ENDIF`;
      case 'chinese':
        return `输入带有IF语句的中文内容模板...

示例:
IF(planType="Medicare Advantage")
  您的Medicare Advantage计划包括{benefit}。
ELSE
  您的计划包括{benefit}。
ENDIF`;
      default:
        return '';
    }
  };

  const insertTemplateCode = (code: string) => {
    const currentContent = getSelectedLanguageContent();
    const newContent = currentContent + (currentContent ? '\n' : '') + code;
    handleLanguageContentChange(newContent);
  };

  const getPlanDisplayName = (planValue: string): string => {
    const planNames: Record<string, string> = {
      'medicare-advantage': 'Medicare Advantage Plus',
      'medicare-supplement': 'Medicare Supplement',
      'medicare-part-d': 'Medicare Part D',
      'commercial-hmo': 'Commercial HMO',
      'commercial-ppo': 'Commercial PPO'
    };
    return planNames[planValue] || planValue;
  };

  const processTemplateContent = (content: string, plan: string): string => {
    if (!content || !plan) return '';

    // Mock plan data for demonstration
    const planData: Record<string, any> = {
      'medicare-advantage': {
        planName: 'Medicare Advantage Plus',
        planType: 'Medicare Advantage',
        benefit: 'comprehensive medical and prescription coverage',
        copay: '$20',
        deductible: '$500'
      },
      'medicare-supplement': {
        planName: 'Medicare Supplement',
        planType: 'Medicare Supplement',
        benefit: 'supplemental coverage for Medicare gaps',
        copay: '$0',
        deductible: '$250'
      },
      'medicare-part-d': {
        planName: 'Medicare Part D',
        planType: 'Medicare Part D',
        benefit: 'prescription drug coverage',
        copay: '$15',
        deductible: '$200'
      },
      'commercial-hmo': {
        planName: 'Commercial HMO',
        planType: 'Commercial HMO',
        benefit: 'managed care coverage',
        copay: '$25',
        deductible: '$1000'
      },
      'commercial-ppo': {
        planName: 'Commercial PPO',
        planType: 'Commercial PPO',
        benefit: 'preferred provider organization coverage',
        copay: '$30',
        deductible: '$1500'
      }
    };

    let processedContent = content;
    const currentPlanData = planData[plan] || {};

    // Process IF statements (simplified logic for demonstration)
    processedContent = processedContent.replace(/IF\([^)]+\)\s*\n?(.*?)\n?(?:ELSE\s*\n?(.*?)\n?)?ENDIF/gs, (match, ifContent, elseContent) => {
      // For demo purposes, always show the IF content
      return ifContent || '';
    });

    // Replace variables with actual values
    Object.entries(currentPlanData).forEach(([key, value]) => {
      const regex = new RegExp(`\\{${key}\\}`, 'g');
      processedContent = processedContent.replace(regex, value);
    });

    // Convert newlines to HTML breaks for display
    return processedContent.replace(/\n/g, '<br>');
  };

  return (
    <div className="h-full bg-background overflow-auto">
      {/* Header */}
      <div className="bg-card border-b border-border px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onNavigate('dcm')}
              className="flex items-center gap-2"
            >
              <ArrowLeft size={16} />
              Back to Digital Content Manager
            </Button>
            <Separator orientation="vertical" className="h-6" />
            <div>
              <h1 className="text-xl font-semibold text-foreground">
                {mode === 'edit' ? 'Edit Rule Details' : 'Create New Rule'}
              </h1>
              {mode === 'edit' && (
                <p className="text-sm text-muted-foreground">
                  Rule ID: <span className="font-mono font-medium">{formData.ruleId}</span>
                </p>
              )}
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Button
              variant="outline"
              onClick={handleClear}
              className="flex items-center gap-2"
            >
              <X size={16} />
              Clear
            </Button>
            <Button
              variant="outline"
              onClick={handleValidate}
              className="flex items-center gap-2 border-blue-600 text-blue-600 hover:bg-blue-50"
            >
              <Check size={16} />
              Validate
            </Button>
            <Button
              onClick={handleSave}
              disabled={isLoading}
              className="flex items-center gap-2 bg-purple-600 text-white hover:bg-purple-700"
            >
              <Check size={16} />
              {mode === 'edit' ? 'Update' : 'Create'}
            </Button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="p-8 max-w-7xl mx-auto">
        {/* Rule Information Section */}
        <Card className="mb-8 shadow-sm">
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center gap-2 text-lg">
              <FileText size={20} className="text-primary" />
              Rule Information
            </CardTitle>
            <p className="text-sm text-muted-foreground">
              Define the core details for this rule
            </p>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Compact 2-row layout for better alignment */}
            
            {/* First Row - Main Fields */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="space-y-2">
                <Label htmlFor="benefitCategory" className="text-sm font-medium text-foreground">
                  Benefit Category <span className="text-red-500">*</span>
                </Label>
                <Select value={formData.templateName || 'Fitness Rider'} onValueChange={(value) => handleInputChange('templateName', value)}>
                  <SelectTrigger className="h-9">
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Fitness Rider">Fitness Rider</SelectItem>
                    <SelectItem value="Medical">Medical</SelectItem>
                    <SelectItem value="Pharmacy">Pharmacy</SelectItem>
                    <SelectItem value="Dental">Dental</SelectItem>
                    <SelectItem value="Vision">Vision</SelectItem>
                    <SelectItem value="Transportation">Transportation</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="benefitType" className="text-sm font-medium text-foreground">
                  Benefit Type <span className="text-red-500">*</span>
                </Label>
                <Select value={formData.benefitType || 'Out of Pocket Maximum'} onValueChange={(value) => handleInputChange('benefitType', value)}>
                  <SelectTrigger className="h-9">
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Out of Pocket Maximum">Out of Pocket Maximum</SelectItem>
                    <SelectItem value="Copayment">Copayment</SelectItem>
                    <SelectItem value="Coinsurance">Coinsurance</SelectItem>
                    <SelectItem value="Deductible">Deductible</SelectItem>
                    <SelectItem value="Premium">Premium</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="businessArea" className="text-sm font-medium text-foreground">
                  Business Area <span className="text-red-500">*</span>
                </Label>
                <Select value={formData.businessArea || 'Marketing'} onValueChange={(value) => handleInputChange('businessArea', value)}>
                  <SelectTrigger className="h-9">
                    <SelectValue placeholder="Select area" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Marketing">Marketing</SelectItem>
                    <SelectItem value="Operations">Operations</SelectItem>
                    <SelectItem value="Compliance">Compliance</SelectItem>
                    <SelectItem value="Finance">Finance</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="subBusinessArea" className="text-sm font-medium text-foreground">
                  Sub-business Area <span className="text-red-500">*</span>
                </Label>
                <Select value={formData.subBusinessArea || 'MRK: DNSP'} onValueChange={(value) => handleInputChange('subBusinessArea', value)}>
                  <SelectTrigger className="h-9">
                    <SelectValue placeholder="Select sub-area" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="MRK: DNSP">MRK: DNSP</SelectItem>
                    <SelectItem value="OPS: Claims">OPS: Claims</SelectItem>
                    <SelectItem value="COMP: Regulatory">COMP: Regulatory</SelectItem>
                    <SelectItem value="MED: Utilization">MED: Utilization</SelectItem>
                    <SelectItem value="FIN: Actuarial">FIN: Actuarial</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Second Row - Plan Year, Dates, Description, Network Type */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
              <div className="space-y-2">
                <Label htmlFor="planYear" className="text-sm font-medium text-foreground">
                  Plan Year <span className="text-red-500">*</span>
                </Label>
                <Select value={formData.version || '2026'} onValueChange={(value) => handleInputChange('version', value)}>
                  <SelectTrigger className="h-9">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="2024">2024</SelectItem>
                    <SelectItem value="2025">2025</SelectItem>
                    <SelectItem value="2026">2026</SelectItem>
                    <SelectItem value="2027">2027</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="effectiveStartDate" className="text-sm font-medium text-foreground">
                  Content Effective Start Date <span className="text-red-500">*</span>
                </Label>
                <DatePicker
                  date={formatDateForDisplay(formData.effectiveDate)}
                  onDateChange={handleDateChange}
                  placeholder="01-01-2026"
                  className="w-full h-9"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="effectiveEndDate" className="text-sm font-medium text-foreground">
                  Content Effective End Date <span className="text-red-500">*</span>
                </Label>
                <DatePicker
                  date={new Date(2026, 11, 31)} // December 31, 2026
                  onDateChange={() => {}} // Read-only for now
                  placeholder="31-12-2026"
                  className="w-full h-9"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description" className="text-sm font-medium text-foreground">
                  Description <span className="text-red-500">*</span>
                </Label>
                <Select value={formData.description || 'Headline'} onValueChange={(value) => handleInputChange('description', value)}>
                  <SelectTrigger className="h-9">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Headline">Headline</SelectItem>
                    <SelectItem value="Body Text">Body Text</SelectItem>
                    <SelectItem value="Footnote">Footnote</SelectItem>
                    <SelectItem value="Disclaimer">Disclaimer</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="networkType" className="text-sm font-medium text-foreground">
                  Network Type <span className="text-red-500">*</span>
                </Label>
                <Select value={formData.serviceGroup || 'INN'} onValueChange={(value) => handleInputChange('serviceGroup', value)}>
                  <SelectTrigger className="h-9">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="INN">INN</SelectItem>
                    <SelectItem value="OON">OON</SelectItem>
                    <SelectItem value="Both">Both</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Rule Key Section */}
        <Card className="mb-8 shadow-sm">
          <CardHeader className="pb-4">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <MapPin size={20} className="text-primary" />
                  Rule Key <span className="text-red-500">*</span>
                </CardTitle>
                <p className="text-sm text-muted-foreground">
                  Define the key that identifies which plans this rule applies to
                </p>
              </div>
              <Dialog open={aiPromptOpen} onOpenChange={setAiPromptOpen}>
                <DialogTrigger asChild>
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex items-center gap-2 border-purple-200 text-purple-600 hover:bg-purple-50"
                  >
                    <Robot size={16} />
                    AI Prompt
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[500px]">
                  <DialogHeader>
                    <DialogTitle className="flex items-center gap-2">
                      <Robot size={20} className="text-purple-600" />
                      AI Rule Generator
                    </DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4 py-4">
                    <div className="space-y-2">
                      <Label className="text-sm font-medium">
                        Describe your rule condition in natural language:
                      </Label>
                      <Textarea
                        placeholder="Example: Create a rule for Medicare acupuncture benefits that applies to all individual plans with equal coverage..."
                        value={aiPromptText}
                        onChange={(e) => setAiPromptText(e.target.value)}
                        className="min-h-[120px] resize-none"
                      />
                    </div>

                    {/* Generated Rule Condition Display */}
                    {generatedRuleCondition && (
                      <div className="space-y-2">
                        <Label className="text-sm font-medium">
                          Generated Rule Condition:
                        </Label>
                        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                          <div className="flex items-center justify-between">
                            <code className="text-sm text-green-800 font-mono">
                              {generatedRuleCondition}
                            </code>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => {
                                handleInputChange('key', generatedRuleCondition);
                                setAiPromptOpen(false);
                                setAiPromptText('');
                                setGeneratedRuleCondition('');
                                toast.success('Rule condition applied to Rule Key field!');
                              }}
                              className="text-green-700 border-green-300 hover:bg-green-100"
                            >
                              Apply to Rule Key
                            </Button>
                          </div>
                        </div>
                      </div>
                    )}

                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                      <p className="text-sm text-blue-800">
                        <strong>Tip:</strong> Be specific about the benefit type, plan category, and coverage details. 
                        The AI will generate a structured rule key expression based on your description.
                      </p>
                    </div>
                    <div className="flex items-center justify-end gap-3 pt-4">
                      <Button
                        variant="outline"
                        onClick={() => {
                          setAiPromptOpen(false);
                          setAiPromptText('');
                          setGeneratedRuleCondition('');
                        }}
                        disabled={isGeneratingRule}
                      >
                        Cancel
                      </Button>
                      <Button
                        onClick={handleAiPromptCreate}
                        disabled={isGeneratingRule || !aiPromptText.trim()}
                        className="bg-purple-600 text-white hover:bg-purple-700"
                      >
                        {isGeneratingRule ? (
                          <>
                            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                            Generating...
                          </>
                        ) : (
                          'Create'
                        )}
                      </Button>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div className="space-y-3">
                <Label htmlFor="ruleKey" className="text-sm font-medium text-foreground">
                  Rule Key Expression
                </Label>
                <Textarea
                  value={formData.key || 'Medicare|Acupuncture|Package|='}
                  onChange={(e) => handleInputChange('key', e.target.value)}
                  placeholder="Enter rule key"
                  className="min-h-[80px] font-mono text-sm resize-none"
                />
              </div>
              <div className="flex items-center gap-4 text-sm">
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className="text-blue-600 border-blue-200 bg-blue-50">
                    Individual Plans: 5
                  </Badge>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className="text-green-600 border-green-200 bg-green-50">
                    Group Plans: 0
                  </Badge>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Content Template & Preview Section */}
        <Card className="mb-8 shadow-sm">
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center gap-2 text-lg">
              <Globe size={20} className="text-primary" />
              Content Template & Preview
            </CardTitle>
            <p className="text-sm text-muted-foreground">
              Configure content templates and preview across different plans
            </p>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Language Selection */}
            <div className="space-y-3">
              <Label className="text-sm font-medium text-foreground">Language Selection</Label>
              <div className="flex items-center gap-3">
                <Button 
                  variant={selectedLanguage === 'english' ? 'default' : 'outline'} 
                  size="sm" 
                  onClick={() => setSelectedLanguage('english')}
                  className={selectedLanguage === 'english' ? 'bg-blue-600 text-white hover:bg-blue-700' : ''}
                >
                  English
                </Button>
                <Button 
                  variant={selectedLanguage === 'spanish' ? 'default' : 'outline'} 
                  size="sm"
                  onClick={() => setSelectedLanguage('spanish')}
                  className={selectedLanguage === 'spanish' ? 'bg-green-600 text-white hover:bg-green-700' : ''}
                >
                  Español
                </Button>
                <Button 
                  variant={selectedLanguage === 'chinese' ? 'default' : 'outline'} 
                  size="sm" 
                  onClick={() => setSelectedLanguage('chinese')}
                  className={`flex items-center gap-2 ${selectedLanguage === 'chinese' ? 'bg-purple-600 text-white hover:bg-purple-700' : ''}`}
                >
                  <Globe size={16} />
                  中文
                </Button>
              </div>
            </div>

            {/* Plan Selection */}
            <div className="space-y-3">
              <Label className="text-sm font-medium text-foreground">Plan Selection</Label>
              <Select value={selectedPlan} onValueChange={setSelectedPlan}>
                <SelectTrigger className="h-10 max-w-md">
                  <SelectValue placeholder="Select a plan to preview content" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="medicare-advantage">Medicare Advantage Plus</SelectItem>
                  <SelectItem value="medicare-supplement">Medicare Supplement</SelectItem>
                  <SelectItem value="medicare-part-d">Medicare Part D</SelectItem>
                  <SelectItem value="commercial-hmo">Commercial HMO</SelectItem>
                  <SelectItem value="commercial-ppo">Commercial PPO</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Split View: Editor and Preview */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
              {/* Left Side: Editor with IF Statements */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Label className="text-sm font-medium text-foreground">
                      {selectedLanguage === 'english' ? 'English' : selectedLanguage === 'spanish' ? 'Spanish' : 'Chinese'} Editor
                    </Label>
                    <Badge 
                      variant="default" 
                      className={`text-white ${
                        selectedLanguage === 'english' ? 'bg-blue-600' : 
                        selectedLanguage === 'spanish' ? 'bg-green-600' : 'bg-purple-600'
                      }`}
                    >
                      {selectedLanguage === 'english' ? 'EN' : selectedLanguage === 'spanish' ? 'ES' : 'CN'}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-2">
                    <Label className="text-sm text-muted-foreground">Status:</Label>
                    <Badge variant="outline" className="text-xs">
                      {selectedLanguage === 'english' ? formData.englishStatus : 
                       selectedLanguage === 'spanish' ? formData.spanishStatus : 'Draft'}
                    </Badge>
                  </div>
                </div>

                {/* Template Helper Buttons */}
                <div className="grid grid-cols-4 gap-2">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="h-8 text-xs font-mono"
                    onClick={() => insertTemplateCode('IF(plan="Medicare")')}
                  >
                    IF()
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="h-8 text-xs font-mono"
                    onClick={() => insertTemplateCode('ENDIF')}
                  >
                    ENDIF
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="h-8 text-xs font-mono"
                    onClick={() => insertTemplateCode('ELSE')}
                  >
                    ELSE
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="h-8 text-xs font-mono"
                    onClick={() => insertTemplateCode('{planName}')}
                  >
                    {'{planName}'}
                  </Button>
                </div>

                <Textarea
                  placeholder={getEditorPlaceholder()}
                  value={getSelectedLanguageContent()}
                  onChange={(e) => handleLanguageContentChange(e.target.value)}
                  className="min-h-[300px] font-mono text-sm"
                />
              </div>

              {/* Right Side: Preview */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Label className="text-sm font-medium text-foreground">Content Preview</Label>
                    <Badge variant="outline" className="text-xs">
                      {selectedPlan ? getPlanDisplayName(selectedPlan) : 'No Plan Selected'}
                    </Badge>
                  </div>
                  {selectedPlan && (
                    <Button variant="link" size="sm" className="text-blue-600 text-xs hover:text-blue-800">
                      View Plan Details
                    </Button>
                  )}
                </div>

                <div className="border border-border rounded-lg bg-card">
                  <div className="p-4 border-b border-border bg-muted/20">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">
                        {selectedLanguage === 'english' ? 'English' : selectedLanguage === 'spanish' ? 'Spanish' : 'Chinese'} Preview
                      </span>
                      <span className="text-xs text-muted-foreground">
                        {selectedPlan ? 'Live Preview' : 'Select Plan'}
                      </span>
                    </div>
                  </div>
                  <div className="p-6 min-h-[280px]">
                    {selectedPlan ? (
                      <div className="prose prose-sm max-w-none">
                        <div 
                          className="text-sm leading-relaxed whitespace-pre-wrap"
                          dangerouslySetInnerHTML={{ 
                            __html: processTemplateContent(getSelectedLanguageContent(), selectedPlan) 
                          }}
                        />
                      </div>
                    ) : (
                      <div className="flex flex-col items-center justify-center h-full text-center py-12">
                        <Globe size={48} className="text-muted-foreground/50 mb-4" />
                        <p className="text-sm text-muted-foreground mb-2">
                          Select a plan to preview content
                        </p>
                        <p className="text-xs text-muted-foreground/70">
                          The preview will show the resolved content without IF conditions
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}