import { useState } from 'react';
import { RuleData, EditingRule } from '@/lib/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Search, Edit, Save, X, Eye } from '@phosphor-icons/react';
import { toast } from 'sonner';

interface RuleGridProps {
  rules: RuleData[];
  onRuleUpdate: (updatedRule: RuleData) => void;
}

export function RuleGrid({ rules, onRuleUpdate }: RuleGridProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [editingRule, setEditingRule] = useState<EditingRule | null>(null);
  const [editValue, setEditValue] = useState('');
  const [previewRule, setPreviewRule] = useState<RuleData | null>(null);

  const filteredRules = rules.filter(rule => 
    rule.ruleId.toLowerCase().includes(searchQuery.toLowerCase()) ||
    rule.documentName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    rule.chapterName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    rule.sectionName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    rule.rule.toLowerCase().includes(searchQuery.toLowerCase())
  );

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
    const isEditable = !['createdAt', 'lastModified', 'id'].includes(field);
    
    if (isEditing) {
      return (
        <div className="flex items-center gap-2 min-w-0">
          {field === 'rule' || field === 'richText' || field === 'translatedText' ? (
            <Textarea
              value={editValue}
              onChange={(e) => setEditValue(e.target.value)}
              className="min-h-[60px] text-xs"
              autoFocus
            />
          ) : (
            <Input
              value={editValue}
              onChange={(e) => setEditValue(e.target.value)}
              className="text-xs"
              autoFocus
            />
          )}
          <div className="flex gap-1">
            <Button size="sm" variant="outline" onClick={handleSaveEdit}>
              <Save size={12} />
            </Button>
            <Button size="sm" variant="outline" onClick={handleCancelEdit}>
              <X size={12} />
            </Button>
          </div>
        </div>
      );
    }

    return (
      <div 
        className={`text-xs p-2 rounded min-h-[40px] flex items-center ${
          isEditable ? 'hover:bg-muted cursor-pointer' : ''
        } ${field === 'ruleId' ? 'font-mono font-semibold' : ''}`}
        onClick={() => isEditable && handleCellClick(rule, field)}
      >
        {field === 'richText' ? (
          <div 
            dangerouslySetInnerHTML={{ __html: content }} 
            className="prose prose-xs max-w-none"
          />
        ) : field === 'createdAt' || field === 'lastModified' ? (
          new Date(content).toLocaleDateString()
        ) : (
          <span className="truncate">{content}</span>
        )}
        {isEditable && (
          <Edit size={10} className="ml-1 opacity-0 group-hover:opacity-50 flex-shrink-0" />
        )}
      </div>
    );
  };

  return (
    <div className="space-y-4">
      {/* Search and Controls */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>Rule Management Grid</span>
            <Badge variant="secondary">{filteredRules.length} rules</Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-4">
            <div className="relative flex-1">
              <Search size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search rules, documents, chapters..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Grid */}
      <Card>
        <CardContent className="p-0">
          <ScrollArea className="h-[600px]">
            <div className="min-w-[1400px]">
              {/* Header */}
              <div className="grid grid-cols-8 gap-2 p-4 bg-muted/50 font-semibold text-xs border-b sticky top-0 z-10">
                <div>Rule ID</div>
                <div>Document Name</div>
                <div>Chapter Name</div>
                <div>Section Name</div>
                <div>Sub-section Name</div>
                <div>Rule</div>
                <div>Rich Text</div>
                <div>Translated Text</div>
              </div>

              {/* Rows */}
              {filteredRules.map((rule) => (
                <div 
                  key={rule.id} 
                  className="grid grid-cols-8 gap-2 p-2 border-b hover:bg-muted/30 group relative"
                >
                  {renderCell(rule, 'ruleId', rule.ruleId)}
                  {renderCell(rule, 'documentName', rule.documentName)}
                  {renderCell(rule, 'chapterName', rule.chapterName)}
                  {renderCell(rule, 'sectionName', rule.sectionName)}
                  {renderCell(rule, 'subSectionName', rule.subSectionName)}
                  {renderCell(rule, 'rule', rule.rule)}
                  {renderCell(rule, 'richText', rule.richText)}
                  {renderCell(rule, 'translatedText', rule.translatedText)}
                  
                  {/* Preview Button */}
                  <div className="absolute right-2 top-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button 
                          size="sm" 
                          variant="outline" 
                          onClick={() => setPreviewRule(rule)}
                        >
                          <Eye size={12} />
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-4xl max-h-[80vh]">
                        <DialogHeader>
                          <DialogTitle>Rule Details - {rule.ruleId}</DialogTitle>
                        </DialogHeader>
                        <ScrollArea className="max-h-[60vh]">
                          <div className="space-y-4 p-4">
                            <div className="grid grid-cols-2 gap-4">
                              <div>
                                <label className="text-sm font-semibold text-muted-foreground">Document</label>
                                <p className="text-sm">{rule.documentName}</p>
                              </div>
                              <div>
                                <label className="text-sm font-semibold text-muted-foreground">Chapter</label>
                                <p className="text-sm">{rule.chapterName}</p>
                              </div>
                              <div>
                                <label className="text-sm font-semibold text-muted-foreground">Section</label>
                                <p className="text-sm">{rule.sectionName}</p>
                              </div>
                              <div>
                                <label className="text-sm font-semibold text-muted-foreground">Sub-section</label>
                                <p className="text-sm">{rule.subSectionName}</p>
                              </div>
                            </div>
                            
                            <div>
                              <label className="text-sm font-semibold text-muted-foreground">Rule Text</label>
                              <p className="text-sm mt-1 p-3 bg-muted rounded">{rule.rule}</p>
                            </div>
                            
                            <div>
                              <label className="text-sm font-semibold text-muted-foreground">Rich Text</label>
                              <div 
                                className="mt-1 p-3 bg-muted rounded prose prose-sm max-w-none"
                                dangerouslySetInnerHTML={{ __html: rule.richText }}
                              />
                            </div>
                            
                            <div>
                              <label className="text-sm font-semibold text-muted-foreground">Translated Text</label>
                              <p className="text-sm mt-1 p-3 bg-muted rounded">{rule.translatedText}</p>
                            </div>
                            
                            <div className="flex gap-4 text-xs text-muted-foreground">
                              <span>Created: {rule.createdAt.toLocaleDateString()}</span>
                              <span>Modified: {rule.lastModified.toLocaleDateString()}</span>
                            </div>
                          </div>
                        </ScrollArea>
                      </DialogContent>
                    </Dialog>
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
        </CardContent>
      </Card>
    </div>
  );
}