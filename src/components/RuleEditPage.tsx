import { useState, useEffect } from 'react';
import { RuleData } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { DatePicker } from '@/components/ui/date-picker';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { ArrowLeft, Eye, MagicWand } from '@phosphor-icons/react';
import { format } from 'date-fns';
import { toast } from 'sonner';

interface RuleEditPageProps {
  rule: RuleData;
  onSave: (updatedRule: RuleData) => void;
  onCancel: () => void;
}

export function RuleEditPage({ rule, onSave, onCancel }: RuleEditPageProps) {
  const [formData, setFormData] = useState<RuleData>(rule);
  const [contentEffectiveStartDate, setContentEffectiveStartDate] = useState<Date | undefined>(
    rule.effectiveDate ? new Date(rule.effectiveDate) : new Date('2025-01-01')
  );
  const [contentEffectiveEndDate, setContentEffectiveEndDate] = useState<Date | undefined>(
    new Date('2025-12-31')
  );
  const [selectedLanguage, setSelectedLanguage] = useState<string>('english');

  const handleInputChange = (field: keyof RuleData, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSave = () => {
    const updatedRule = {
      ...formData,
      effectiveDate: contentEffectiveStartDate ? format(contentEffectiveStartDate, 'MM-dd-yyyy') : formData.effectiveDate,
      lastModified: new Date().toISOString(),
      lastModifiedBy: 'Current User'
    };
    
    onSave(updatedRule);
    toast.success('Rule updated successfully');
  };

  const handleValidate = () => {
    toast.info('Rule validation completed');
  };

  const handleViewPlanEligibility = () => {
    toast.info('Plan eligibility view opened');
  };

  return (
    <div className="h-full bg-background overflow-auto">
      {/* Header */}
      <div className="bg-card border-b border-border px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="sm" onClick={onCancel}>
              <ArrowLeft size={16} />
            </Button>
            <h1 className="text-lg font-semibold text-foreground">Rule Details</h1>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={handleValidate}>
              Validate
            </Button>
            <Button size="sm" onClick={handleSave} className="bg-primary text-primary-foreground">
              <MagicWand size={16} className="mr-2" />
              Update
            </Button>
          </div>
        </div>
      </div>

      <div className="p-6">
        {/* Rule Information Card */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="text-base font-medium text-muted-foreground">Rule Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* First Row */}
            <div className="grid grid-cols-4 gap-4">
              <div>
                <Label htmlFor="benefit-category" className="text-sm font-medium text-foreground">
                  Benefit Category *
                </Label>
                <Select value={formData.templateName || ''} onValueChange={(value) => handleInputChange('templateName', value)}>
                  <SelectTrigger id="benefit-category">
                    <SelectValue placeholder="Select benefit category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Fitness Rider">Fitness Rider</SelectItem>
                    <SelectItem value="Dental">Dental</SelectItem>
                    <SelectItem value="Vision">Vision</SelectItem>
                    <SelectItem value="Prescription Drugs">Prescription Drugs</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="benefit-type" className="text-sm font-medium text-foreground">
                  Benefit Type *
                </Label>
                <Select value={formData.benefitType || ''} onValueChange={(value) => handleInputChange('benefitType', value)}>
                  <SelectTrigger id="benefit-type">
                    <SelectValue placeholder="Select benefit type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Out of Pocket Maximum">Out of Pocket Maximum</SelectItem>
                    <SelectItem value="Copayment">Copayment</SelectItem>
                    <SelectItem value="Coinsurance">Coinsurance</SelectItem>
                    <SelectItem value="Deductible">Deductible</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="business-area" className="text-sm font-medium text-foreground">
                  Business Area *
                </Label>
                <Select value={formData.businessArea || ''} onValueChange={(value) => handleInputChange('businessArea', value)}>
                  <SelectTrigger id="business-area">
                    <SelectValue placeholder="Select business area" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Marketing">Marketing</SelectItem>
                    <SelectItem value="Sales">Sales</SelectItem>
                    <SelectItem value="Operations">Operations</SelectItem>
                    <SelectItem value="Customer Service">Customer Service</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="sub-business-area" className="text-sm font-medium text-foreground">
                  Sub-business Area *
                </Label>
                <Select value={formData.subBusinessArea || ''} onValueChange={(value) => handleInputChange('subBusinessArea', value)}>
                  <SelectTrigger id="sub-business-area">
                    <SelectValue placeholder="Select sub-business area" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="MRK: DNSP">MRK: DNSP</SelectItem>
                    <SelectItem value="MRK: ANOC">MRK: ANOC</SelectItem>
                    <SelectItem value="MRK: EOC">MRK: EOC</SelectItem>
                    <SelectItem value="MRK: SB">MRK: SB</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Second Row */}
            <div className="grid grid-cols-4 gap-4">
              <div>
                <Label htmlFor="plan-year" className="text-sm font-medium text-foreground">
                  Plan Year *
                </Label>
                <Select value={formData.version || ''} onValueChange={(value) => handleInputChange('version', value)}>
                  <SelectTrigger id="plan-year">
                    <SelectValue placeholder="Select plan year" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="2025">2025</SelectItem>
                    <SelectItem value="2026">2026</SelectItem>
                    <SelectItem value="2027">2027</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="start-date" className="text-sm font-medium text-foreground">
                  Content Effective Start Date *
                </Label>
                <DatePicker
                  date={contentEffectiveStartDate}
                  onDateChange={setContentEffectiveStartDate}
                  placeholder="01-01-2025"
                />
              </div>

              <div>
                <Label htmlFor="end-date" className="text-sm font-medium text-foreground">
                  Content Effective End Date *
                </Label>
                <DatePicker
                  date={contentEffectiveEndDate}
                  onDateChange={setContentEffectiveEndDate}
                  placeholder="31-12-2025"
                />
              </div>

              <div>
                <Label htmlFor="description" className="text-sm font-medium text-foreground">
                  Description *
                </Label>
                <Select value={formData.description || ''} onValueChange={(value) => handleInputChange('description', value)}>
                  <SelectTrigger id="description">
                    <SelectValue placeholder="Select description" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Headline">Headline</SelectItem>
                    <SelectItem value="Body Text">Body Text</SelectItem>
                    <SelectItem value="Footer">Footer</SelectItem>
                    <SelectItem value="Disclaimer">Disclaimer</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Third Row */}
            <div className="grid grid-cols-1 gap-4">
              <div>
                <Label htmlFor="network-type" className="text-sm font-medium text-foreground">
                  Network Type *
                </Label>
                <Select defaultValue="INN">
                  <SelectTrigger id="network-type" className="w-64">
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
        <Card className="mb-6">
          <CardContent className="pt-6">
            <div>
              <Label htmlFor="rule-key" className="text-sm font-medium text-foreground">
                Rule Key *
              </Label>
              <div className="flex items-center gap-2 mt-2">
                <Input
                  id="rule-key"
                  value={formData.key || ''}
                  onChange={(e) => handleInputChange('key', e.target.value)}
                  placeholder="MedicareAcupuncturePackage="
                  className="flex-1"
                />
                <Button variant="outline" size="sm" onClick={handleValidate}>
                  Validate
                </Button>
                <Button variant="ghost" size="sm" className="text-primary">
                  <MagicWand size={16} />
                </Button>
              </div>
              <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
                <span>Affected Individual Plans: 5</span>
                <span>Affected Group Plans: 0</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Language and Content Section */}
        <div className="grid grid-cols-2 gap-6">
          {/* Content Template */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base font-medium text-foreground">Content Template</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex gap-2 mb-4">
                <Badge 
                  variant={selectedLanguage === 'english' ? 'default' : 'secondary'} 
                  className="cursor-pointer"
                  onClick={() => setSelectedLanguage('english')}
                >
                  English
                </Badge>
                <Badge 
                  variant={selectedLanguage === 'spanish' ? 'default' : 'secondary'} 
                  className="cursor-pointer"
                  onClick={() => setSelectedLanguage('spanish')}
                >
                  Español
                </Badge>
                <Badge variant="outline" className="cursor-pointer">
                  中文
                </Badge>
              </div>
              
              <div className="flex gap-2 mb-4">
                <Button variant="outline" size="sm" disabled>
                  H
                </Button>
                <Button variant="outline" size="sm" disabled>
                  Hi
                </Button>
                <Button variant="outline" size="sm" disabled>
                  fo()
                </Button>
                <Button variant="outline" size="sm" disabled>
                  ()
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Content Preview */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-base font-medium text-foreground">Content Preview</CardTitle>
              <Button variant="ghost" size="sm" onClick={handleViewPlanEligibility}>
                <Eye size={16} className="mr-2" />
                View Plan Eligibility
              </Button>
            </CardHeader>
            <CardContent>
              <Select defaultValue="">
                <SelectTrigger>
                  <SelectValue placeholder="Select Plan" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="plan1">Plan A</SelectItem>
                  <SelectItem value="plan2">Plan B</SelectItem>
                  <SelectItem value="plan3">Plan C</SelectItem>
                </SelectContent>
              </Select>
              
              <div className="mt-4 p-4 bg-muted rounded-md min-h-32">
                <p className="text-sm text-muted-foreground">
                  Select a plan and click Apply to preview content.
                </p>
              </div>
              
              <div className="flex gap-2 mt-4">
                <Button variant="outline" size="sm">
                  Clear
                </Button>
                <Button variant="outline" size="sm">
                  Apply
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}