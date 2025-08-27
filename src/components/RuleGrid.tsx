import { useState } from 'react';
import { RuleData, EditingRule } from '@/lib/types';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { 
  ChevronDown, 
  Filter, 
  Edit, 
  Save, 
  X, 
  Search,
  Download,
  Plus
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
  const [searchTerm, setSearchTerm] = useState('');
  
  // Filter states
  const [statusFilter, setStatusFilter] = useState('All');
  const [vendorTypeFilter, setVendorTypeFilter] = useState('All');
  const [vendorFilter, setVendorFilter] = useState('All');
  
  const filteredRules = rules.filter(rule => {
    if (searchTerm && !(rule.templateName?.toLowerCase().includes(searchTerm.toLowerCase())) &&
        !(rule.ruleId?.toLowerCase().includes(searchTerm.toLowerCase())) &&
        !(rule.chapterName?.toLowerCase().includes(searchTerm.toLowerCase()))) {
      return false;
    }
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
    
    const fieldValue = rule[field] as string || '';
    setEditingRule({ id: rule.id, field, value: fieldValue });
    setEditValue(fieldValue);
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

  const renderCell = (rule: RuleData, field: keyof RuleData, content: string, className: string = '') => {
    const isEditing = editingRule?.id === rule.id && editingRule?.field === field;
    const isEditable = !['createdAt', 'lastModified', 'id', 'cmsRegulated', 'isTabular'].includes(field);
    
    if (isEditing) {
      return (
        <div className={`px-3 py-1 border-r border-gray-200 flex items-center gap-2 ${className}`}>
          {field === 'rule' || field === 'english' || field === 'spanish' ? (
            <Textarea
              value={editValue}
              onChange={(e) => setEditValue(e.target.value)}
              className="min-h-[28px] text-sm resize-none border-blue-300 focus:border-blue-500 flex-1"
              autoFocus
            />
          ) : (
            <Input
              value={editValue}
              onChange={(e) => setEditValue(e.target.value)}
              className="text-sm h-7 border-blue-300 focus:border-blue-500 flex-1"
              autoFocus
            />
          )}
          <div className="flex gap-1 flex-shrink-0">
            <Button size="sm" variant="outline" onClick={handleSaveEdit} className="h-6 w-6 p-0 border-green-300 hover:bg-green-50">
              <Save size={10} className="text-green-600" />
            </Button>
            <Button size="sm" variant="outline" onClick={handleCancelEdit} className="h-6 w-6 p-0 border-gray-300 hover:bg-gray-50">
              <X size={10} className="text-gray-500" />
            </Button>
          </div>
        </div>
      );
    }

    return (
      <div 
        className={`px-3 py-2 text-sm border-r border-gray-200 last:border-r-0 ${className} ${
          isEditable ? 'hover:bg-blue-50 cursor-pointer group' : ''
        } ${selectedRows.has(rule.id) ? 'bg-blue-50' : ''}`}
        onClick={() => isEditable && handleCellClick(rule, field)}
      >
        <div className="flex items-center justify-between">
          <span className="truncate flex-1 text-gray-900">{content}</span>
          {isEditable && (
            <Edit size={12} className="ml-2 opacity-0 group-hover:opacity-40 text-gray-400 flex-shrink-0" />
          )}
        </div>
      </div>
    );
  };

  const getStatusBadge = (status: string) => {
    if (!status) {
      return <Badge variant="secondary" className="bg-gray-100 text-gray-800">Unknown</Badge>;
    }
    
    switch (status.toLowerCase()) {
      case 'complete':
        return <Badge variant="default" className="bg-green-100 text-green-800 hover:bg-green-100">✓ Complete</Badge>;
      case 'in progress':
        return <Badge variant="default" className="bg-blue-100 text-blue-800 hover:bg-blue-100">In Progress</Badge>;
      case 'pending':
        return <Badge variant="default" className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">Pending</Badge>;
      case 'approved':
        return <Badge variant="default" className="bg-green-100 text-green-800 hover:bg-green-100">✓ Approved</Badge>;
      default:
        return <Badge variant="secondary" className="bg-gray-100 text-gray-800">{status}</Badge>;
    }
  };

  return (
    <div className="w-full h-screen flex flex-col overflow-hidden">
      {/* Compact Header Section */}
      <div className="bg-white border border-gray-200 flex-shrink-0">
        <div className="px-6 py-3 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-base font-semibold text-gray-900">Rules</h2>
              <p className="text-xs text-gray-500 mt-1">
                Showing {filteredRules.length} of {rules.length} rules
              </p>
            </div>
            <div className="flex items-center gap-3">
              <Button variant="outline" size="sm" className="flex items-center gap-2 border-gray-300 text-gray-700 hover:bg-gray-50">
                <Download size={14} />
                Download PDF
              </Button>
              <Button size="sm" className="flex items-center gap-2 bg-purple-600 text-white hover:bg-purple-700">
                <Plus size={14} />
                New Rule
              </Button>
            </div>
          </div>
        </div>

        {/* Compact Filter Section */}
        <div className="px-6 py-3 bg-gray-50 border-b border-gray-200">
          <div className="flex items-center gap-4">
            <div className="flex-1 max-w-md">
              <div className="relative">
                <Search size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <Input
                  placeholder="Search for Rules"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 border-gray-300 focus:border-blue-500 focus:ring-blue-500 h-9"
                />
              </div>
            </div>

            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-36 h-9 border-gray-300 focus:border-blue-500">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-green-500"></div>
                  <SelectValue />
                </div>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="All">All</SelectItem>
                <SelectItem value="Complete">Complete</SelectItem>
                <SelectItem value="In Progress">In Progress</SelectItem>
                <SelectItem value="Pending">Pending</SelectItem>
              </SelectContent>
            </Select>

            <Select value={vendorTypeFilter} onValueChange={setVendorTypeFilter}>
              <SelectTrigger className="w-36 h-9 border-gray-300 focus:border-blue-500">
                <SelectValue placeholder="All" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="All">All</SelectItem>
                <SelectItem value="Template">Template</SelectItem>
                <SelectItem value="Chapter">Chapter</SelectItem>
              </SelectContent>
            </Select>

            <Select value={vendorFilter} onValueChange={setVendorFilter}>
              <SelectTrigger className="w-36 h-9 border-gray-300 focus:border-blue-500">
                <SelectValue placeholder="All" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="All">All</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

        {/* Full Height Table Section with Maximum Scrolling Area */}
        <div className="flex-1 overflow-auto">
          <div className="min-w-[3572px] h-full">
            {/* Table Header */}
            <div className="flex bg-gray-50 border-b border-gray-200 text-sm font-medium text-gray-500 sticky top-0 z-10">
              <div className="w-12 px-3 py-2 border-r border-gray-200">
                <Checkbox 
                  checked={filteredRules.length > 0 && selectedRows.size === filteredRules.length}
                  onCheckedChange={handleSelectAll}
                />
              </div>
              <div className="w-24 px-3 py-2 border-r border-gray-200 flex items-center gap-2">
                <span>Rule ID</span>
                <ChevronDown size={14} className="text-gray-400" />
              </div>
              <div className="w-32 px-3 py-2 border-r border-gray-200 flex items-center gap-2">
                <span>Effective Date</span>
                <ChevronDown size={14} className="text-gray-400" />
              </div>
              <div className="w-24 px-3 py-2 border-r border-gray-200 flex items-center gap-2">
                <span>Version</span>
                <ChevronDown size={14} className="text-gray-400" />
              </div>
              <div className="w-48 px-3 py-2 border-r border-gray-200 flex items-center gap-2">
                <span>Template Name</span>
                <ChevronDown size={14} className="text-gray-400" />
              </div>
              <div className="w-32 px-3 py-2 border-r border-gray-200 flex items-center gap-2">
                <span>Service ID</span>
                <ChevronDown size={14} className="text-gray-400" />
              </div>
              <div className="w-32 px-3 py-2 border-r border-gray-200 flex items-center justify-center">
                <span>CMS Regulated</span>
              </div>
              <div className="w-48 px-3 py-2 border-r border-gray-200 flex items-center gap-2">
                <span>Chapter Name</span>
                <ChevronDown size={14} className="text-gray-400" />
              </div>
              <div className="w-48 px-3 py-2 border-r border-gray-200 flex items-center gap-2">
                <span>Section Name</span>
                <ChevronDown size={14} className="text-gray-400" />
              </div>
              <div className="w-48 px-3 py-2 border-r border-gray-200 flex items-center gap-2">
                <span>Subsection Name</span>
                <ChevronDown size={14} className="text-gray-400" />
              </div>
              <div className="w-32 px-3 py-2 border-r border-gray-200 flex items-center gap-2">
                <span>Service Group</span>
                <ChevronDown size={14} className="text-gray-400" />
              </div>
              <div className="w-40 px-3 py-2 border-r border-gray-200 flex items-center gap-2">
                <span>Source Mapping</span>
                <ChevronDown size={14} className="text-gray-400" />
              </div>
              <div className="w-32 px-3 py-2 border-r border-gray-200 flex items-center gap-2">
                <span>Tiers</span>
                <ChevronDown size={14} className="text-gray-400" />
              </div>
              <div className="w-32 px-3 py-2 border-r border-gray-200 flex items-center gap-2">
                <span>Key</span>
                <ChevronDown size={14} className="text-gray-400" />
              </div>
              <div className="w-64 px-3 py-2 border-r border-gray-200 flex items-center gap-2">
                <span>Rule</span>
                <ChevronDown size={14} className="text-gray-400" />
              </div>
              <div className="w-28 px-3 py-2 border-r border-gray-200 flex items-center justify-center">
                <span>Is Tabular</span>
              </div>
              <div className="w-64 px-3 py-2 border-r border-gray-200 flex items-center gap-2">
                <span>English</span>
                <ChevronDown size={14} className="text-gray-400" />
              </div>
              <div className="w-32 px-3 py-2 border-r border-gray-200 flex items-center gap-2">
                <span>Status</span>
                <ChevronDown size={14} className="text-gray-400" />
              </div>
              <div className="w-64 px-3 py-2 border-r border-gray-200 flex items-center gap-2">
                <span>Spanish</span>
                <ChevronDown size={14} className="text-gray-400" />
              </div>
              <div className="w-32 px-3 py-2 flex items-center gap-2">
                <span>Status</span>
                <ChevronDown size={14} className="text-gray-400" />
              </div>
            </div>

            {/* Table Body - Compact rows */}
            <div className="bg-white">
              {filteredRules.map((rule, index) => (
                <div 
                  key={rule.id} 
                  className={`flex border-b border-gray-100 hover:bg-gray-50 ${
                    selectedRows.has(rule.id) ? 'bg-blue-50' : ''
                  }`}
                >
                  <div className="w-12 px-3 py-2 border-r border-gray-200 flex items-center">
                    <Checkbox 
                      checked={selectedRows.has(rule.id)}
                      onCheckedChange={(checked) => handleRowSelect(rule.id, checked as boolean)}
                    />
                  </div>
                  
                  {renderCell(rule, 'ruleId', rule.ruleId || 'N/A', 'w-24 font-medium')}
                  {renderCell(rule, 'effectiveDate', rule.effectiveDate || 'N/A', 'w-32')}
                  {renderCell(rule, 'version', rule.version || 'N/A', 'w-24')}
                  {renderCell(rule, 'templateName', rule.templateName || 'N/A', 'w-48 font-medium')}
                  {renderCell(rule, 'serviceId', rule.serviceId || 'N/A', 'w-32')}
                  
                  <div className="w-32 px-3 py-2 border-r border-gray-200 flex items-center justify-center">
                    <Checkbox 
                      checked={rule.cmsRegulated || false}
                      onCheckedChange={(checked) => {
                        const updatedRule = {
                          ...rule,
                          cmsRegulated: checked as boolean,
                          lastModified: new Date()
                        };
                        onRuleUpdate(updatedRule);
                      }}
                    />
                  </div>
                  
                  {renderCell(rule, 'chapterName', rule.chapterName || 'N/A', 'w-48')}
                  {renderCell(rule, 'sectionName', rule.sectionName || 'N/A', 'w-48')}
                  {renderCell(rule, 'subsectionName', rule.subsectionName || 'N/A', 'w-48')}
                  {renderCell(rule, 'serviceGroup', rule.serviceGroup || 'N/A', 'w-32')}
                  {renderCell(rule, 'sourceMapping', rule.sourceMapping || 'N/A', 'w-40')}
                  {renderCell(rule, 'tiers', rule.tiers || 'N/A', 'w-32')}
                  {renderCell(rule, 'key', rule.key || 'N/A', 'w-32')}
                  {renderCell(rule, 'rule', rule.rule || 'N/A', 'w-64')}
                  
                  <div className="w-28 px-3 py-2 border-r border-gray-200 flex items-center justify-center">
                    <Checkbox 
                      checked={rule.isTabular || false}
                      onCheckedChange={(checked) => {
                        const updatedRule = {
                          ...rule,
                          isTabular: checked as boolean,
                          lastModified: new Date()
                        };
                        onRuleUpdate(updatedRule);
                      }}
                    />
                  </div>
                  
                  {renderCell(rule, 'english', rule.english || 'N/A', 'w-64')}
                  
                  <div className="w-32 px-3 py-2 border-r border-gray-200">
                    {getStatusBadge(rule.englishStatus)}
                  </div>
                  
                  {renderCell(rule, 'spanish', rule.spanish || 'N/A', 'w-64')}
                  
                  <div className="w-32 px-3 py-2">
                    {getStatusBadge(rule.spanishStatus)}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

      {/* Preview Dialog */}
      {previewRule && (
        <Dialog open={!!previewRule} onOpenChange={() => setPreviewRule(null)}>
          <DialogContent className="max-w-4xl max-h-[80vh]">
            <DialogHeader>
              <DialogTitle>Rule Details - {previewRule.ruleId || 'N/A'}</DialogTitle>
            </DialogHeader>
            <ScrollArea className="max-h-[60vh]">
              <div className="space-y-4 p-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-semibold text-gray-500">Template</label>
                    <p className="text-sm">{previewRule.templateName || 'N/A'}</p>
                  </div>
                  <div>
                    <label className="text-sm font-semibold text-gray-500">Service ID</label>
                    <p className="text-sm">{previewRule.serviceId || 'N/A'}</p>
                  </div>
                  <div>
                    <label className="text-sm font-semibold text-gray-500">Service Group</label>
                    <p className="text-sm">{previewRule.serviceGroup || 'N/A'}</p>
                  </div>
                  <div>
                    <label className="text-sm font-semibold text-gray-500">Source Mapping</label>
                    <p className="text-sm">{previewRule.sourceMapping || 'N/A'}</p>
                  </div>
                  <div>
                    <label className="text-sm font-semibold text-gray-500">Tiers</label>
                    <p className="text-sm">{previewRule.tiers || 'N/A'}</p>
                  </div>
                  <div>
                    <label className="text-sm font-semibold text-gray-500">Key</label>
                    <p className="text-sm">{previewRule.key || 'N/A'}</p>
                  </div>
                  <div>
                    <label className="text-sm font-semibold text-gray-500">CMS Regulated</label>
                    <p className="text-sm">{previewRule.cmsRegulated ? 'Yes' : 'No'}</p>
                  </div>
                  <div>
                    <label className="text-sm font-semibold text-gray-500">Chapter</label>
                    <p className="text-sm">{previewRule.chapterName || 'N/A'}</p>
                  </div>
                  <div>
                    <label className="text-sm font-semibold text-gray-500">Section</label>
                    <p className="text-sm">{previewRule.sectionName || 'N/A'}</p>
                  </div>
                </div>
                
                <div>
                  <label className="text-sm font-semibold text-gray-500">Rule Text</label>
                  <p className="text-sm mt-1 p-3 bg-gray-50 rounded">{previewRule.rule || 'N/A'}</p>
                </div>
                
                <div>
                  <label className="text-sm font-semibold text-gray-500">English</label>
                  <p className="text-sm mt-1 p-3 bg-gray-50 rounded">{previewRule.english || 'N/A'}</p>
                  <p className="text-xs text-gray-500 mt-1">Status: {previewRule.englishStatus || 'Unknown'}</p>
                </div>
                
                <div>
                  <label className="text-sm font-semibold text-gray-500">Spanish</label>
                  <p className="text-sm mt-1 p-3 bg-gray-50 rounded">{previewRule.spanish || 'N/A'}</p>
                  <p className="text-xs text-gray-500 mt-1">Status: {previewRule.spanishStatus || 'Unknown'}</p>
                </div>
              </div>
            </ScrollArea>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}