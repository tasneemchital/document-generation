import { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Plus, Trash2, RotateCcw, Save, Upload, Copy } from '@phosphor-icons/react';
import { sanitizeConditionExpression } from '@/lib/content-safety';

interface Condition {
  field: string;
  operator: string;
  value: string;
}

interface ConditionGroup {
  id: string;
  conditions: Condition[];
  logic: 'AND' | 'OR';
}

interface ConfigureRuleDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  initialCondition?: string;
  onApply: (condition: string) => void;
}

export function ConfigureRuleDialog({
  open,
  onOpenChange,
  initialCondition = '',
  onApply
}: ConfigureRuleDialogProps) {
  const [conditionGroups, setConditionGroups] = useState<ConditionGroup[]>([]);
  const [generatedExpression, setGeneratedExpression] = useState('');
  const [showGeneratedExpression, setShowGeneratedExpression] = useState(false);

  const fieldOptions = [
    'Medicare[PlanType]',
    'Medicare[IsRx]',
    'Patient[Age]',
    'Patient[State]',
    'Coverage[Type]',
    'PBPViewAnchor[PlanType]',
  ];

  const operatorOptions = ['=', '!=', '>', '<', '>=', '<=', 'contains', 'startsWith', 'endsWith'];

  // Initialize with empty group when dialog opens
  useEffect(() => {
    if (open) {
      if (initialCondition.trim()) {
        parseAndLoadCondition(initialCondition);
      } else {
        setConditionGroups([{
          id: `group-${Date.now()}`,
          conditions: [{ field: '', operator: '=', value: '' }],
          logic: 'AND'
        }]);
      }
    }
  }, [open, initialCondition]);

  const parseAndLoadCondition = (conditionStr: string) => {
    try {
      if (!conditionStr || conditionStr.trim() === '') {
        addConditionGroup();
        return;
      }

      // Safely handle the condition string to avoid JavaScript evaluation issues
      const safeConditionStr = String(conditionStr || '').trim();
      
      // Split by OR first to get groups
      const orGroups = safeConditionStr.split(/\s+OR\s+/i);
      const groups: ConditionGroup[] = [];

      orGroups.forEach((group, groupIndex) => {
        // Split by AND to get individual conditions
        const andConditions = group.split(/\s+AND\s+/i);
        const conditions: Condition[] = [];

        andConditions.forEach(condStr => {
          // Parse each condition using regex to match field[subfield]operator value
          const conditionRegex = /^(.+?)(>=|<=|!=|=|>|<|contains|startsWith|endsWith)(.+)$/i;
          const match = String(condStr || '').trim().match(conditionRegex);
          
          if (match) {
            conditions.push({
              field: String(match[1] || '').trim(),
              operator: String(match[2] || '').trim(),
              value: String(match[3] || '').trim()
            });
          }
        });

        if (conditions.length > 0) {
          groups.push({
            id: `group-${Date.now()}-${groupIndex}`,
            conditions: conditions,
            logic: 'AND' // Logic within group is always AND
          });
        }
      });

      if (groups.length > 0) {
        setConditionGroups(groups);
      } else {
        addConditionGroup();
      }
    } catch (error) {
      console.error('Error parsing condition:', error);
      addConditionGroup(); // Fallback to empty group
    }
  };

  const addConditionGroup = () => {
    setConditionGroups(prev => [...prev, {
      id: `group-${Date.now()}`,
      conditions: [{ field: '', operator: '=', value: '' }],
      logic: 'AND'
    }]);
  };

  const deleteConditionGroup = (groupId: string) => {
    const remaining = conditionGroups.filter(group => group.id !== groupId);
    
    if (remaining.length === 0) {
      if (window.confirm('Deleting this group will also delete the associated IF block. Do you want to proceed?')) {
        onOpenChange(false);
        return;
      } else {
        // Restore a default empty group if the user cancels the deletion
        addConditionGroup();
        return;
      }
    }
    
    setConditionGroups(remaining);
    setTimeout(() => generateExpression(), 100);
  };

  const addConditionToGroup = (groupId: string) => {
    setConditionGroups(prev => prev.map(group => 
      group.id === groupId 
        ? { ...group, conditions: [...group.conditions, { field: '', operator: '=', value: '' }] }
        : group
    ));
  };

  const deleteCondition = (groupId: string, conditionIndex: number) => {
    setConditionGroups(prev => prev.map(group => {
      if (group.id === groupId) {
        const newConditions = group.conditions.filter((_, index) => index !== conditionIndex);
        
        if (newConditions.length === 0) {
          // If no conditions remain, remove the entire group
          return null;
        }
        
        return { ...group, conditions: newConditions };
      }
      return group;
    }).filter(Boolean) as ConditionGroup[]);

    setTimeout(() => generateExpression(), 100);
  };

  const updateCondition = (groupId: string, conditionIndex: number, field: keyof Condition, value: string) => {
    setConditionGroups(prev => prev.map(group => {
      if (group.id === groupId) {
        const newConditions = group.conditions.map((condition, index) => 
          index === conditionIndex 
            ? { ...condition, [field]: value }
            : condition
        );
        return { ...group, conditions: newConditions };
      }
      return group;
    }));

    setTimeout(() => generateExpression(), 100);
  };

  const generateExpression = () => {
    try {
      let expression = '';
      let hasValidConditions = false;

      conditionGroups.forEach((group, groupIndex) => {
        let groupExpression = '';

        group.conditions.forEach((condition, condIndex) => {
          if (condition.field && condition.operator && condition.value) {
            hasValidConditions = true;
            if (condIndex > 0) {
              groupExpression += ` ${group.logic} `;
            }
            // Safely construct expression to avoid JavaScript evaluation issues
            const safeField = sanitizeConditionExpression(condition.field);
            const safeOperator = sanitizeConditionExpression(condition.operator); 
            const safeValue = sanitizeConditionExpression(condition.value);
            groupExpression += `${safeField}${safeOperator}${safeValue}`;
          }
        });

        if (groupExpression) {
          if (groupIndex > 0 && expression) {
            expression += ' OR ';
          }
          expression += groupExpression;
        }
      });

      // Final sanitization of the complete expression
      const safeExpression = sanitizeConditionExpression(expression);
      setGeneratedExpression(safeExpression);
      setShowGeneratedExpression(hasValidConditions);
    } catch (error) {
      console.error('Error generating expression:', error);
      setGeneratedExpression('');
      setShowGeneratedExpression(false);
    }
  };

  const copyExpression = async () => {
    if (generatedExpression) {
      try {
        await navigator.clipboard.writeText(generatedExpression);
      } catch (err) {
        console.error('Failed to copy expression:', err);
      }
    }
  };

  const clearAll = () => {
    if (window.confirm('Are you sure you want to clear all conditions?')) {
      setConditionGroups([]);
      setGeneratedExpression('');
      setShowGeneratedExpression(false);
      addConditionGroup();
    }
  };

  const saveConditions = () => {
    const dataToSave = {
      timestamp: new Date().toISOString(),
      conditionGroups: conditionGroups
    };
    
    const blob = new Blob([JSON.stringify(dataToSave, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `conditional_statements_${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const loadConditions = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.json';
    input.onchange = function(e) {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
          try {
            const data = JSON.parse(e.target?.result as string);
            if (data.conditionGroups) {
              setConditionGroups(data.conditionGroups);
              generateExpression();
            }
          } catch (error) {
            console.error('Error loading file:', error);
          }
        };
        reader.readAsText(file);
      }
    };
    input.click();
  };

  useEffect(() => {
    generateExpression();
  }, [conditionGroups]);

  const handleApply = () => {
    onApply(generatedExpression);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-[95vw] max-h-[95vh] w-[95vw] overflow-hidden">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            🛠️ Advanced Conditional Statement Editor
          </DialogTitle>
          <p className="text-muted-foreground">
            Create complex nested conditions with {{IF}}, {{ELSE}}, {{END}} format
          </p>
        </DialogHeader>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[82vh] overflow-hidden">
          {/* Editor Panel */}
          <div className="lg:col-span-2 overflow-hidden">
            <ScrollArea className="h-full w-full pr-4">
              <div className="space-y-4">
                <div className="flex flex-wrap gap-2 sticky top-0 bg-background p-2 border-b z-10">
                  <Button onClick={addConditionGroup} className="bg-green-600 hover:bg-green-700">
                    <Plus className="w-4 h-4 mr-2" />
                    Add Group
                  </Button>
                  <Button onClick={generateExpression} variant="outline">
                    <RotateCcw className="w-4 h-4 mr-2" />
                    Regenerate
                  </Button>
                  <Button onClick={saveConditions} variant="outline">
                    <Save className="w-4 h-4 mr-2" />
                    Save
                  </Button>
                  <Button onClick={loadConditions} variant="outline">
                    <Upload className="w-4 h-4 mr-2" />
                    Load
                  </Button>
                  <Button onClick={clearAll} variant="destructive">
                    <Trash2 className="w-4 h-4 mr-2" />
                    Clear All
                  </Button>
                </div>

                <div className="space-y-4 pb-4">
                  {conditionGroups.map((group, groupIndex) => (
                    <Card key={group.id} className="border-2 hover:border-blue-300 transition-colors">
                      <CardHeader className="bg-gradient-to-r from-blue-50 to-purple-50 pb-3">
                        <div className="flex items-center justify-between">
                          <CardTitle className="text-lg">Condition Group {groupIndex + 1}</CardTitle>
                          <Button 
                            size="sm" 
                            variant="destructive"
                            onClick={() => deleteConditionGroup(group.id)}
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </CardHeader>
                      <CardContent className="space-y-4 pt-4">
                        {group.conditions.map((condition, condIndex) => (
                          <div key={`${group.id}-${condIndex}`}>
                            {condIndex > 0 && (
                              <div className="flex justify-center py-2">
                                <Select
                                  value={group.logic}
                                  onValueChange={(value: 'AND' | 'OR') => 
                                    setConditionGroups(prev => prev.map(g => 
                                      g.id === group.id ? { ...g, logic: value } : g
                                    ))
                                  }
                                >
                                  <SelectTrigger className="w-20 bg-blue-50 border-blue-300">
                                    <SelectValue />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="AND">AND</SelectItem>
                                    <SelectItem value="OR">OR</SelectItem>
                                  </SelectContent>
                                </Select>
                              </div>
                            )}
                            
                            <div className="grid grid-cols-12 gap-3 items-center p-4 bg-gray-50 rounded-lg">
                              <div className="col-span-4">
                                <Select
                                  value={condition.field}
                                  onValueChange={(value) => updateCondition(group.id, condIndex, 'field', value)}
                                >
                                  <SelectTrigger>
                                    <SelectValue placeholder="Select Field" />
                                  </SelectTrigger>
                                  <SelectContent>
                                    {fieldOptions.map(field => (
                                      <SelectItem key={field} value={field}>{field}</SelectItem>
                                    ))}
                                  </SelectContent>
                                </Select>
                              </div>
                              
                              <div className="col-span-3">
                                <Select
                                  value={condition.operator}
                                  onValueChange={(value) => updateCondition(group.id, condIndex, 'operator', value)}
                                >
                                  <SelectTrigger>
                                    <SelectValue />
                                  </SelectTrigger>
                                  <SelectContent>
                                    {operatorOptions.map(op => (
                                      <SelectItem key={op} value={op}>{op}</SelectItem>
                                    ))}
                                  </SelectContent>
                                </Select>
                              </div>
                              
                              <div className="col-span-4">
                                <Input
                                  value={condition.value}
                                  onChange={(e) => updateCondition(group.id, condIndex, 'value', e.target.value)}
                                  placeholder="Value"
                                />
                              </div>
                              
                              <div className="col-span-1">
                                <Button
                                  size="sm"
                                  variant="destructive"
                                  onClick={() => deleteCondition(group.id, condIndex)}
                                >
                                  <Trash2 className="w-4 h-4" />
                                </Button>
                              </div>
                            </div>
                          </div>
                        ))}
                        
                        <Button 
                          onClick={() => addConditionToGroup(group.id)}
                          variant="outline"
                          className="w-full"
                        >
                          <Plus className="w-4 h-4 mr-2" />
                          Add Condition
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </ScrollArea>
          </div>

          {/* Output Panel */}
          <div className="space-y-4 overflow-hidden">
            <Card className="h-full flex flex-col">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  📝 Generated Expression
                </CardTitle>
              </CardHeader>
              <CardContent className="flex-1 flex flex-col overflow-hidden">
                {showGeneratedExpression ? (
                  <div className="space-y-3 flex-1 flex flex-col overflow-hidden">
                    <div className="flex-1 min-h-0 overflow-hidden">
                      <ScrollArea className="h-full w-full rounded-md border p-4 bg-green-50">
                        <code className="text-sm font-mono whitespace-pre-wrap break-words">
                          {generatedExpression}
                        </code>
                      </ScrollArea>
                    </div>
                    <Button onClick={copyExpression} variant="outline" size="sm" className="w-full">
                      <Copy className="w-4 h-4 mr-2" />
                      Copy Expression
                    </Button>
                  </div>
                ) : (
                  <div className="flex-1 flex items-center justify-center text-muted-foreground">
                    No valid conditions specified
                  </div>
                )}
                
                <div className="flex flex-col gap-2 mt-4">
                  <Button 
                    onClick={handleApply}
                    className="bg-blue-600 hover:bg-blue-700"
                    disabled={!showGeneratedExpression}
                  >
                    Apply Condition
                  </Button>
                  <Button onClick={() => onOpenChange(false)} variant="outline">
                    Cancel
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}