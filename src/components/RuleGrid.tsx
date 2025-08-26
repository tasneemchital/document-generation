import { useState } from 'react';
import { RuleData, EditingRule } from '@/lib/types';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Checkbox } from '@/components/ui/checkbox';
import { 
  CaretDown, 
  FunnelSimple, 
  Edit, 
  Save, 
  X, 
  Eye,
  LockSimple,
  LockSimpleOpen
} from '@phosphor-icons/react';
import { toast } from 'sonner';

interface RuleGridProps {
  rules: RuleData[];
  onRuleUpdate: (updatedRule: RuleData) => void;
}

export function RuleGrid({ rules, onRuleUpdate }: RuleGridProps) {
  const [editingRule, setEditingRule] = useState<EditingRule | null>(null);
  const [editValue, setEditValue] = useState('');
  const [previewRule, setPreviewRule] = useState<RuleData | null>(null);
  const [selectedRows, setSelectedRows] = useState<Set<string>>(new Set());
  const [isLocked, setIsLocked] = useState(false);
  
  // Filter states matching DCM snapshot
  const [templateFilter, setTemplateFilter] = useState('[Select One]');
  const [chapterFilter, setChapterFilter] = useState('[Select One]');
  const [sectionFilter, setSectionFilter] = useState('[Select One]');
  
  // Get unique filter options
  const templateOptions = Array.from(new Set(rules.map(r => r.documentName))).sort();
  const chapterOptions = Array.from(new Set(rules.map(r => r.chapterName))).sort();
  const sectionOptions = Array.from(new Set(rules.map(r => r.sectionName))).sort();

  const filteredRules = rules.filter(rule => {
    if (templateFilter !== '[Select One]' && rule.documentName !== templateFilter) return false;
    if (chapterFilter !== '[Select One]' && rule.chapterName !== chapterFilter) return false;
    if (sectionFilter !== '[Select One]' && rule.sectionName !== sectionFilter) return false;
    return true;
  });

  const handleRowSelect = (ruleId: string, checked: boolean) => {
    const newSelected = new Set(selectedRows);
    if (checked) {
      newSelected.add(ruleId);
    } else {
      newSelected.delete(ruleId);
    }
    setSelectedRows(newSelected);
  };

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedRows(new Set(filteredRules.map(r => r.id)));
    } else {
      setSelectedRows(new Set());
    }
  };

  const handleCellClick = (rule: RuleData, field: keyof RuleData) => {
    if (['createdAt', 'lastModified', 'id'].includes(field)) return;
    
    setEditingRule({ id: rule.id, field, value: rule[field] as string });
    setEditValue(rule[field] as string);
  };

  const handleSaveEdit = () => {
    if (!editingRule) return;

    const ruleToUpdate = rules.find(r => r.id === editingRule.id);
    if (!ruleToUpdate) return;

    const updatedRule = {
      ...ruleToUpdate,
      [editingRule.field]: editValue,
      lastModified: new Date()
    };

    onRuleUpdate(updatedRule);
    setEditingRule(null);
    setEditValue('');
    toast.success('Rule updated successfully');
  };

  const handleCancelEdit = () => {
    setEditingRule(null);
    setEditValue('');
  };

  const renderCell = (rule: RuleData, field: keyof RuleData, content: string) => {
    const isEditing = editingRule?.id === rule.id && editingRule?.field === field;
    const isEditable = !['createdAt', 'lastModified', 'id'].includes(field) && !isLocked;
    
    if (isEditing) {
      return (
        <div className="flex items-center gap-2 min-w-0 p-1">
          {field === 'rule' || field === 'richText' || field === 'translatedText' ? (
            <Textarea
              value={editValue}
              onChange={(e) => setEditValue(e.target.value)}
              className="min-h-[40px] text-xs resize-none"
              autoFocus
            />
          ) : (
            <Input
              value={editValue}
              onChange={(e) => setEditValue(e.target.value)}
              className="text-xs h-8"
              autoFocus
            />
          )}
          <div className="flex gap-1">
            <Button size="sm" variant="outline" onClick={handleSaveEdit} className="h-6 w-6 p-0">
              <Save size={10} />
            </Button>
            <Button size="sm" variant="outline" onClick={handleCancelEdit} className="h-6 w-6 p-0">
              <X size={10} />
            </Button>
          </div>
        </div>
      );
    }

    return (
      <div 
        className={`text-xs p-2 min-h-[32px] flex items-center border-r border-border last:border-r-0 ${
          isEditable ? 'hover:bg-blue-50 cursor-pointer' : ''
        } ${selectedRows.has(rule.id) ? 'bg-blue-50' : ''}`}
        onClick={() => isEditable && handleCellClick(rule, field)}
      >
        <span className="truncate flex-1">{content}</span>
        {isEditable && (
          <Edit size={10} className="ml-1 opacity-0 group-hover:opacity-50 flex-shrink-0" />
        )}
      </div>
    );
  };

  return (
    <div className="w-full">
      {/* Header with title and controls */}
      <div className="flex items-center justify-between mb-4 p-4 bg-card border-b">
        <h2 className="text-lg font-semibold text-foreground">Language Configuration Repeater</h2>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setIsLocked(!isLocked)}
            className="flex items-center gap-2"
          >
            {isLocked ? <LockSimple size={14} /> : <LockSimpleOpen size={14} />}
            {isLocked ? 'Locked' : 'Unlocked'}
          </Button>
          {/* Toolbar buttons matching DCM */}
          <div className="flex items-center gap-1 text-muted-foreground">
            <Button variant="ghost" size="sm" className="h-6 w-6 p-0">🔍</Button>
            <Button variant="ghost" size="sm" className="h-6 w-6 p-0">⚙️</Button>
            <Button variant="ghost" size="sm" className="h-6 w-6 p-0">📋</Button>
            <Button variant="ghost" size="sm" className="h-6 w-6 p-0">🗂️</Button>
            <Button variant="ghost" size="sm" className="h-6 w-6 p-0">➕</Button>
            <Button variant="ghost" size="sm" className="h-6 w-6 p-0">✂️</Button>
            <Button variant="ghost" size="sm" className="h-6 w-6 p-0">🗑️</Button>
            <Button variant="ghost" size="sm" className="h-6 w-6 p-0">💾</Button>
            <Button variant="ghost" size="sm" className="h-6 w-6 p-0">❌</Button>
            <Button variant="ghost" size="sm" className="h-6 w-6 p-0">🔍</Button>
            <Button variant="ghost" size="sm" className="h-6 w-6 p-0">🔄</Button>
            <Button variant="ghost" size="sm" className="h-6 w-6 p-0">⛶</Button>
            <Button variant="ghost" size="sm" className="h-6 w-6 p-0">⚙️</Button>
            <Button variant="ghost" size="sm" className="h-6 w-6 p-0">💾</Button>
          </div>
        </div>
      </div>

      {/* Filter Row */}
      <div className="flex items-center gap-4 p-2 bg-muted/30 border-b">
        <div className="flex items-center gap-2">
          <Checkbox 
            id="lock-select"
            checked={isLocked}
            onCheckedChange={(checked) => setIsLocked(checked as boolean)}
          />
          <label htmlFor="lock-select" className="text-xs font-medium">Is Lock</label>
          <CaretDown size={12} className="text-muted-foreground" />
        </div>

        <Select value={templateFilter} onValueChange={setTemplateFilter}>
          <SelectTrigger className="w-48 h-8 text-xs">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="[Select One]">[Select One]</SelectItem>
            {templateOptions.map(option => (
              <SelectItem key={option} value={option}>{option}</SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select value={chapterFilter} onValueChange={setChapterFilter}>
          <SelectTrigger className="w-48 h-8 text-xs">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="[Select One]">[Select One]</SelectItem>
            {chapterOptions.map(option => (
              <SelectItem key={option} value={option}>{option}</SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Input placeholder="" className="w-32 h-8 text-xs" />
        <Input placeholder="" className="w-48 h-8 text-xs" />
      </div>

      {/* Table */}
      <div className="border border-border bg-card">
        {/* Column Headers */}
        <div className="flex bg-muted/50 border-b text-xs font-medium">
          <div className="w-8 p-2 border-r border-border flex items-center justify-center">
            <Checkbox 
              checked={filteredRules.length > 0 && selectedRows.size === filteredRules.length}
              onCheckedChange={handleSelectAll}
            />
          </div>
          <div className="w-16 p-2 border-r border-border flex items-center justify-center">
            <LockSimpleOpen size={12} />
          </div>
          <div className="flex-1 p-2 border-r border-border flex items-center justify-between min-w-[140px]">
            <span>Template Name</span>
            <div className="flex items-center gap-1">
              <CaretDown size={12} />
              <FunnelSimple size={12} />
            </div>
          </div>
          <div className="w-24 p-2 border-r border-border flex items-center justify-center">
            <span>CMS Regulated</span>
          </div>
          <div className="flex-1 p-2 border-r border-border flex items-center justify-between min-w-[140px]">
            <span>Chapter Name</span>
            <div className="flex items-center gap-1">
              <CaretDown size={12} />
              <FunnelSimple size={12} />
            </div>
          </div>
          <div className="flex-1 p-2 border-r border-border flex items-center justify-between min-w-[140px]">
            <span>Section Name</span>
            <div className="flex items-center gap-1">
              <CaretDown size={12} />
              <FunnelSimple size={12} />
            </div>
          </div>
          <div className="flex-1 p-2 border-r border-border flex items-center justify-between min-w-[140px]">
            <span>Sub Section Name</span>
            <div className="flex items-center gap-1">
              <CaretDown size={12} />
              <FunnelSimple size={12} />
            </div>
          </div>
          <div className="flex-1 p-2 border-r border-border flex items-center justify-between min-w-[140px]">
            <span>Service Group</span>
            <div className="flex items-center gap-1">
              <CaretDown size={12} />
              <FunnelSimple size={12} />
            </div>
          </div>
        </div>

        {/* Data Rows */}
        <ScrollArea className="h-[500px]">
          {filteredRules.map((rule, index) => (
            <div 
              key={rule.id} 
              className={`flex border-b border-border hover:bg-muted/30 group ${
                selectedRows.has(rule.id) ? 'bg-blue-50' : index % 2 === 1 ? 'bg-muted/20' : 'bg-card'
              }`}
            >
              <div className="w-8 p-2 border-r border-border flex items-center justify-center text-xs">
                {index + 1}
              </div>
              <div className="w-16 p-2 border-r border-border flex items-center justify-center">
                <Checkbox 
                  checked={selectedRows.has(rule.id)}
                  onCheckedChange={(checked) => handleRowSelect(rule.id, checked as boolean)}
                />
              </div>
              <div className="flex-1 p-2 border-r border-border text-xs min-w-[140px]">
                {rule.documentName}
              </div>
              <div className="w-24 p-2 border-r border-border flex items-center justify-center">
                <Checkbox 
                  checked={rule.cmsRegulated}
                  onCheckedChange={(checked) => {
                    const updatedRule = {
                      ...rule,
                      cmsRegulated: checked as boolean,
                      lastModified: new Date()
                    };
                    onRuleUpdate(updatedRule);
                  }}
                  disabled={isLocked}
                />
              </div>
              <div className="flex-1 p-2 border-r border-border text-xs min-w-[140px]">
                {rule.chapterName}
              </div>
              <div className="flex-1 p-2 border-r border-border text-xs min-w-[140px]">
                {rule.sectionName}
              </div>
              <div className="flex-1 p-2 border-r border-border text-xs min-w-[140px]">
                {rule.subSectionName}
              </div>
              <div className="flex-1 p-2 text-xs min-w-[140px]">
                {/* Service Group placeholder */}
                Service Group {index + 1}
              </div>
            </div>
          ))}
        </ScrollArea>
      </div>

      {/* Bottom Section Selector */}
      <div className="flex items-center justify-between p-2 bg-primary text-primary-foreground">
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium">Section</span>
          <Select value="Language Configuration" onValueChange={() => {}}>
            <SelectTrigger className="w-48 h-8 text-xs bg-primary-foreground text-foreground">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Language Configuration">Language Configuration</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="secondary" size="sm" className="h-6 w-6 p-0">
            💾
          </Button>
          <Button variant="secondary" size="sm" className="h-6 w-6 p-0">
            ⬇️
          </Button>
        </div>
      </div>

      {/* Preview Dialog */}
      {previewRule && (
        <Dialog open={!!previewRule} onOpenChange={() => setPreviewRule(null)}>
          <DialogContent className="max-w-4xl max-h-[80vh]">
            <DialogHeader>
              <DialogTitle>Rule Details - {previewRule.ruleId}</DialogTitle>
            </DialogHeader>
            <ScrollArea className="max-h-[60vh]">
              <div className="space-y-4 p-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-semibold text-muted-foreground">Document</label>
                    <p className="text-sm">{previewRule.documentName}</p>
                  </div>
                  <div>
                    <label className="text-sm font-semibold text-muted-foreground">CMS Regulated</label>
                    <p className="text-sm">{previewRule.cmsRegulated ? 'Yes' : 'No'}</p>
                  </div>
                  <div>
                    <label className="text-sm font-semibold text-muted-foreground">Chapter</label>
                    <p className="text-sm">{previewRule.chapterName}</p>
                  </div>
                  <div>
                    <label className="text-sm font-semibold text-muted-foreground">Section</label>
                    <p className="text-sm">{previewRule.sectionName}</p>
                  </div>
                  <div>
                    <label className="text-sm font-semibold text-muted-foreground">Sub-section</label>
                    <p className="text-sm">{previewRule.subSectionName}</p>
                  </div>
                </div>
                
                <div>
                  <label className="text-sm font-semibold text-muted-foreground">Rule Text</label>
                  <p className="text-sm mt-1 p-3 bg-muted rounded">{previewRule.rule}</p>
                </div>
                
                <div>
                  <label className="text-sm font-semibold text-muted-foreground">Rich Text</label>
                  <div 
                    className="mt-1 p-3 bg-muted rounded prose prose-sm max-w-none"
                    dangerouslySetInnerHTML={{ __html: previewRule.richText }}
                  />
                </div>
                
                <div>
                  <label className="text-sm font-semibold text-muted-foreground">Translated Text</label>
                  <p className="text-sm mt-1 p-3 bg-muted rounded">{previewRule.translatedText}</p>
                </div>
                
                <div className="flex gap-4 text-xs text-muted-foreground">
                  <span>Created: {previewRule.createdAt.toLocaleDateString()}</span>
                  <span>Modified: {previewRule.lastModified.toLocaleDateString()}</span>
                </div>
              </div>
            </ScrollArea>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}