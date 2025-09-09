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

  const [isLoading, setIsLoading] = useState(false);
  const [aiPromptOpen, setAiPromptOpen] = useState(false);
  const [aiPromptText, setAiPromptText] = useState('');
  const [isGeneratingRule, setIsGeneratingRule] = useState(false);

  useEffect(() => {
    if (rule && mode === 'edit') {
      setFormData(rule);
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
      
      // Update the rule key field with the generated expression
      handleInputChange('key', generatedRule.trim());
      
      // Close the dialog and clear the prompt text
      setAiPromptOpen(false);
      setAiPromptText('');
      
      toast.success('Rule key generated successfully!');
    } catch (error) {
      console.error('Error generating rule:', error);
      toast.error('Failed to generate rule key. Please try again.');
    } finally {
      setIsGeneratingRule(false);
    }
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
          <CardContent className="space-y-8">
            {/* First Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="space-y-3">
                <Label htmlFor="benefitCategory" className="text-sm font-medium text-foreground">
                  Benefit Category <span className="text-red-500">*</span>
                </Label>
                <Select value={formData.templateName || 'Fitness Rider'} onValueChange={(value) => handleInputChange('templateName', value)}>
                  <SelectTrigger className="h-10">
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

              <div className="space-y-3">
                <Label htmlFor="benefitType" className="text-sm font-medium text-foreground">
                  Benefit Type <span className="text-red-500">*</span>
                </Label>
                <Select value={formData.benefitType || 'Out of Pocket Maximum'} onValueChange={(value) => handleInputChange('benefitType', value)}>
                  <SelectTrigger className="h-10">
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

              <div className="space-y-3">
                <Label htmlFor="businessArea" className="text-sm font-medium text-foreground">
                  Business Area <span className="text-red-500">*</span>
                </Label>
                <Select value={formData.businessArea || 'Marketing'} onValueChange={(value) => handleInputChange('businessArea', value)}>
                  <SelectTrigger className="h-10">
                    <SelectValue placeholder="Select area" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Marketing">Marketing</SelectItem>
                    <SelectItem value="Operations">Operations</SelectItem>
                    <SelectItem value="Compliance">Compliance</SelectItem>
                    <SelectItem value="Medical Management">Medical Management</SelectItem>
                    <SelectItem value="Finance">Finance</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-3">
                <Label htmlFor="subBusinessArea" className="text-sm font-medium text-foreground">
                  Sub-business Area <span className="text-red-500">*</span>
                </Label>
                <Select value={formData.subBusinessArea || 'MRK: DNSP'} onValueChange={(value) => handleInputChange('subBusinessArea', value)}>
                  <SelectTrigger className="h-10">
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

            {/* Second Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="space-y-3">
                <Label htmlFor="planYear" className="text-sm font-medium text-foreground">
                  Plan Year <span className="text-red-500">*</span>
                </Label>
                <Select value="2026" onValueChange={(value) => handleInputChange('version', value)}>
                  <SelectTrigger className="h-10">
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

              <div className="space-y-3">
                <Label htmlFor="effectiveStartDate" className="text-sm font-medium text-foreground">
                  Content Effective Start Date <span className="text-red-500">*</span>
                </Label>
                <DatePicker
                  date={formatDateForDisplay(formData.effectiveDate)}
                  onDateChange={handleDateChange}
                  placeholder="01-01-2026"
                  className="w-full h-10"
                />
              </div>

              <div className="space-y-3">
                <Label htmlFor="effectiveEndDate" className="text-sm font-medium text-foreground">
                  Content Effective End Date <span className="text-red-500">*</span>
                </Label>
                <DatePicker
                  date={new Date(2026, 11, 31)} // December 31, 2026
                  onDateChange={() => {}} // Read-only for now
                  placeholder="31-12-2026"
                  className="w-full h-10"
                />
              </div>

              <div className="space-y-3">
                <Label htmlFor="description" className="text-sm font-medium text-foreground">
                  Description <span className="text-red-500">*</span>
                </Label>
                <Select value="Headline" onValueChange={(value) => handleInputChange('description', value)}>
                  <SelectTrigger className="h-10">
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
            </div>

            {/* Third Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="space-y-3">
                <Label htmlFor="networkType" className="text-sm font-medium text-foreground">
                  Network Type <span className="text-red-500">*</span>
                </Label>
                <Select value="INN" onValueChange={(value) => handleInputChange('serviceGroup', value)}>
                  <SelectTrigger className="h-10">
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
          <CardContent className="space-y-8">
            <div className="flex items-center gap-4 mb-6">
              <Button variant="default" size="sm" className="bg-blue-600 text-white hover:bg-blue-700">
                English
              </Button>
              <Button variant="outline" size="sm">
                Español
              </Button>
              <Button variant="outline" size="sm" className="flex items-center gap-2">
                <Globe size={16} />
                繁
              </Button>
            </div>

            {/* Side-by-side Language Editors */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* English Language Editor */}
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <Label className="text-sm font-medium text-foreground">English Editor</Label>
                  <Badge variant="default" className="bg-blue-600 text-white">EN</Badge>
                </div>
                <div className="grid grid-cols-4 gap-2 mb-4">
                  <Button variant="outline" size="sm" className="h-8 text-xs font-mono">
                    ()
                  </Button>
                  <Button variant="outline" size="sm" className="h-8 text-xs font-mono">
                    III
                  </Button>
                  <Button variant="outline" size="sm" className="h-8 text-xs font-mono">
                    Ⅱ()
                  </Button>
                  <Button variant="outline" size="sm" className="h-8 text-xs font-mono">
                    ()
                  </Button>
                </div>
                <Textarea
                  placeholder="Enter English content template..."
                  value={formData.english || ''}
                  onChange={(e) => handleInputChange('english', e.target.value)}
                  className="min-h-[200px] font-mono text-sm"
                />
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Label className="text-sm text-muted-foreground">Status:</Label>
                    <Badge variant="outline" className="text-xs">
                      {formData.englishStatus || 'Draft'}
                    </Badge>
                  </div>
                  <Button variant="link" size="sm" className="text-blue-600 text-xs hover:text-blue-800">
                    Preview English
                  </Button>
                </div>
              </div>

              {/* Spanish Language Editor */}
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <Label className="text-sm font-medium text-foreground">Spanish Editor</Label>
                  <Badge variant="default" className="bg-green-600 text-white">ES</Badge>
                </div>
                <div className="grid grid-cols-4 gap-2 mb-4">
                  <Button variant="outline" size="sm" className="h-8 text-xs font-mono">
                    ()
                  </Button>
                  <Button variant="outline" size="sm" className="h-8 text-xs font-mono">
                    III
                  </Button>
                  <Button variant="outline" size="sm" className="h-8 text-xs font-mono">
                    Ⅱ()
                  </Button>
                  <Button variant="outline" size="sm" className="h-8 text-xs font-mono">
                    ()
                  </Button>
                </div>
                <Textarea
                  placeholder="Ingrese la plantilla de contenido en español..."
                  value={formData.spanish || ''}
                  onChange={(e) => handleInputChange('spanish', e.target.value)}
                  className="min-h-[200px] font-mono text-sm"
                />
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Label className="text-sm text-muted-foreground">Estado:</Label>
                    <Badge variant="outline" className="text-xs">
                      {formData.spanishStatus || 'Draft'}
                    </Badge>
                  </div>
                  <Button variant="link" size="sm" className="text-green-600 text-xs hover:text-green-800">
                    Vista Previa Español
                  </Button>
                </div>
              </div>
            </div>

            {/* Plan Preview Section */}
            <div className="mt-8 p-4 border border-border rounded-lg bg-muted/20">
              <div className="flex items-center justify-between mb-4">
                <Label className="text-sm font-medium text-foreground">Plan Preview</Label>
                <Button variant="link" size="sm" className="text-blue-600 text-xs hover:text-blue-800">
                  View Plan Eligibility
                </Button>
              </div>
              <Select value="" onValueChange={() => {}}>
                <SelectTrigger className="h-10 max-w-md">
                  <SelectValue placeholder="Select Plan to Preview Content" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="plan1">Plan 1 - Medicare Advantage</SelectItem>
                  <SelectItem value="plan2">Plan 2 - Medicare Supplement</SelectItem>
                  <SelectItem value="plan3">Plan 3 - Medicare Part D</SelectItem>
                </SelectContent>
              </Select>
              <div className="mt-4 bg-muted/50 p-6 rounded-md border-2 border-dashed border-muted-foreground/20">
                <p className="text-sm text-muted-foreground text-center">
                  Select a plan and language to preview content rendering in respective language
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}