import { useState, useRef, useEffect } from 'react'
import { useKV } from '@github/spark/hooks'
import { RuleData } from '@/lib/types'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { ScrollArea } from '@/components/ui/scroll-area'
import { ArrowLeft, 
  Bold, 
  Italic, 
  Underline, 
  AlignLeft, 
  AlignCenter,
  AlignRight,
  List,
  ListOrdered,
  Plus,
  Pencil
} from '@phosphor-icons/react'
import { DCMEditPage } from './DCMEditPage'

interface TemplateProps {
  onNavigate: (page: string) => void
  onEditRule?: (ruleId: string) => void
}

const sectionOptions = [
  'Medicare EOC Cover Page',
  'Chapter 1',
  'Chapter 2',
  'Chapter 3',
  'Chapter 4',
  'Chapter 5',
  'Chapter 6',
  'Chapter 7',
  'Chapter 8',
  'Chapter 9',
  'Chapter 10',
  'Chapter 11',
  'Chapter 12',
  'Back Cover',
  'Rider and Dental Chat'
]

export function Template({ onNavigate, onEditRule }: TemplateProps) {
  const [selectedView, setSelectedView] = useState('Editor')
  const [selectedInstance, setSelectedInstance] = useState('Instance 1')
  const [selectedSection, setSelectedSection] = useState('Medicare EOC Cover Page')
  const [editorContent, setEditorContent] = useKV('template-content', '')
  const [showCMLDialog, setShowCMLDialog] = useState(false)
  const [showEditRuleDialog, setShowEditRuleDialog] = useState(false)
  const [selectedRule, setSelectedRule] = useState<RuleData | null>(null)
  const [editingRule, setEditingRule] = useState<RuleData | null>(null)
  const [rules] = useKV<RuleData[]>('rule-data', [])
  const [selectedText, setSelectedText] = useState('')
  const editorRef = useRef<HTMLTextAreaElement>(null)

  const handleInsertRule = () => {
    if (selectedRule && editorRef.current) {
      const textarea = editorRef.current
      const start = textarea.selectionStart
      const end = textarea.selectionEnd
      
      // Create the rule chunk HTML that will be styled by CSS
      const ruleChunk = `\n\n[RULE-${selectedRule.id}]\n${selectedRule.description}\n[/RULE-${selectedRule.id}]\n\n`
      
      const newContent = editorContent.substring(0, start) + ruleChunk + editorContent.substring(end)
      setEditorContent(newContent)
      setShowCMLDialog(false)
      setSelectedRule(null)
      
      // Focus back to editor
      setTimeout(() => {
        textarea.focus()
        textarea.setSelectionRange(start + ruleChunk.length, start + ruleChunk.length)
      }, 0)
    }
  }

  const handleEditRule = () => {
    if (!editorRef.current) return
    
    const textarea = editorRef.current
    const start = textarea.selectionStart
    const end = textarea.selectionEnd
    const selectedText = editorContent.substring(start, end)
    
    // First check if user has selected text that contains a rule reference
    const ruleMatch = selectedText.match(/\[RULE-([^\]]+)\]/);
    if (ruleMatch) {
      const ruleId = ruleMatch[1];
      const rule = rules.find(r => r.id === ruleId);
      if (rule) {
        setEditingRule(rule);
        setShowEditRuleDialog(true);
        return;
      }
    }
    
    // If no rule is selected, check if cursor is within a rule block
    const lines = editorContent.split('\n');
    let currentLine = 0;
    let currentPos = 0;
    
    // Find which line the cursor is on
    for (let i = 0; i < lines.length; i++) {
      if (currentPos + lines[i].length >= start) {
        currentLine = i;
        break;
      }
      currentPos += lines[i].length + 1; // +1 for newline
    }
    
    // Look backwards and forwards for rule boundaries
    let ruleStartLine = -1;
    let ruleEndLine = -1;
    let foundRuleId = '';
    
    // Look backwards for [RULE-id]
    for (let i = currentLine; i >= 0; i--) {
      const match = lines[i].match(/\[RULE-([^\]]+)\]/);
      if (match) {
        ruleStartLine = i;
        foundRuleId = match[1];
        break;
      }
      if (lines[i].match(/\[\/RULE-/)) {
        break; // Hit end of another rule
      }
    }
    
    // Look forwards for [/RULE-id] if we found a start
    if (ruleStartLine !== -1 && foundRuleId) {
      for (let i = ruleStartLine + 1; i < lines.length; i++) {
        if (lines[i].match(new RegExp(`\\[/RULE-${foundRuleId.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\]`))) {
          ruleEndLine = i;
          break;
        }
      }
      
      // If we found both boundaries, edit the rule
      if (ruleEndLine !== -1) {
        const rule = rules.find(r => r.id === foundRuleId);
        if (rule) {
          setEditingRule(rule);
          setShowEditRuleDialog(true);
          return;
        }
      }
    }
    
    // If no rule found, show a message
    alert('Please select rule text or place cursor within a rule block to edit it.');
  }

  const handleUpdateRule = (updatedRule: RuleData) => {
    // Update the rule in the content
    const updatedContent = editorContent.replace(
      new RegExp(`\\[RULE-${updatedRule.id}\\].*?\\[/RULE-${updatedRule.id}\\]`, 'gs'),
      `[RULE-${updatedRule.id}]\n${updatedRule.description}\n[/RULE-${updatedRule.id}]`
    );
    setEditorContent(updatedContent);
    setShowEditRuleDialog(false);
    setEditingRule(null);
  }

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-border bg-card">
        <div className="flex items-center gap-4">
          <Button variant="ghost" onClick={() => onNavigate('global-template')}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Global Template
          </Button>
          <h1 className="text-xl font-semibold text-foreground">Template Editor</h1>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">View:</span>
            <Select value={selectedView} onValueChange={setSelectedView}>
              <SelectTrigger className="w-32">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Editor">Editor</SelectItem>
                <SelectItem value="Preview">Preview</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">Instance:</span>
            <Select value={selectedInstance} onValueChange={setSelectedInstance}>
              <SelectTrigger className="w-32">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Instance 1">Instance 1</SelectItem>
                <SelectItem value="Instance 2">Instance 2</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">Section:</span>
            <Select value={selectedSection} onValueChange={setSelectedSection}>
              <SelectTrigger className="w-48">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {sectionOptions.map((section) => (
                  <SelectItem key={section} value={section}>
                    {section}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      {/* Editor Section */}
      <div className="flex-1 p-4">
        <Card className="h-full flex flex-col">
          <div className="p-4 border-b border-border">
            <div className="flex items-center justify-between mb-2">
              <h2 className="text-lg font-semibold text-foreground">
                {selectedSection}
              </h2>
              <div className="flex items-center gap-2">
                {/* Rich Text Editor Buttons */}
                <Button variant="outline" size="sm" title="Bold">
                  <Bold className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="sm" title="Italic">
                  <Italic className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="sm" title="Underline">
                  <Underline className="h-4 w-4" />
                </Button>
                <div className="w-px h-6 bg-border mx-2" />
                <Button variant="outline" size="sm" title="Align Left">
                  <AlignLeft className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="sm" title="Align Center">
                  <AlignCenter className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="sm" title="Align Right">
                  <AlignRight className="h-4 w-4" />
                </Button>
                <div className="w-px h-6 bg-border mx-2" />
                <Button variant="outline" size="sm" title="Bullet List">
                  <List className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="sm" title="Numbered List">
                  <ListOrdered className="h-4 w-4" />
                </Button>
                <div className="w-px h-6 bg-border mx-2" />
                <Button
                  variant="outline" 
                  size="sm"
                  onClick={() => setShowCMLDialog(true)}
                  title="Insert CML Rule"
                >
                  <Plus className="h-4 w-4 mr-1" />
                  CML
                </Button>
                <Button
                  variant="outline" 
                  size="sm"
                  onClick={handleEditRule}
                  title="Edit Rule"
                  className="border-orange-200 text-orange-600 hover:bg-orange-50"
                >
                  <Pencil className="h-4 w-4 mr-1" />
                  Edit Rule
                </Button>
              </div>
            </div>
            <p className="text-sm text-muted-foreground">
              Edit the content for this section below. Use the +CML button to insert rule descriptions.
              Select rule text and click "Edit Rule" to modify it.
            </p>
          </div>

          <div className="flex-1 p-4">
            <Textarea
              ref={editorRef}
              placeholder="Enter your template content here..."
              value={editorContent}
              onChange={(e) => setEditorContent(e.target.value)}
              className="min-h-[400px] resize-none font-mono text-sm"
            />
          </div>
        </Card>
      </div>

      {/* CML Dialog */}
      <Dialog open={showCMLDialog} onOpenChange={setShowCMLDialog}>
        <DialogContent className="max-w-6xl max-h-[80vh] overflow-hidden">
          <DialogHeader>
            <DialogTitle>Select CML Rule</DialogTitle>
          </DialogHeader>
          <div className="overflow-auto max-h-[60vh]">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Rule ID</TableHead>
                  <TableHead>Rule Name</TableHead>
                  <TableHead>Benefit Type</TableHead>
                  <TableHead>Business Area</TableHead>
                  <TableHead>Sub-Business Area</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead>Version</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {rules.map((rule) => (
                  <TableRow 
                    key={rule.id}
                    className={`cursor-pointer hover:bg-muted/50 ${
                      selectedRule?.id === rule.id ? 'bg-muted' : ''
                    }`}
                    onClick={() => setSelectedRule(rule)}
                    title={`Rule ID: ${rule.id}`}
                  >
                    <TableCell>{rule.ruleId || rule.id}</TableCell>
                    <TableCell>{rule.templateName || rule.ruleName || 'N/A'}</TableCell>
                    <TableCell>{rule.benefitType}</TableCell>
                    <TableCell>{rule.businessArea}</TableCell>
                    <TableCell>{rule.subBusinessArea}</TableCell>
                    <TableCell className="max-w-xs truncate">{rule.description}</TableCell>
                    <TableCell>{rule.version}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          <div className="flex justify-end gap-2 p-4 border-t">
            <Button variant="outline" onClick={() => setShowCMLDialog(false)}>
              Cancel
            </Button>
            <Button 
              onClick={handleInsertRule}
              disabled={!selectedRule}
            >
              Insert Rule
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Edit Rule Dialog */}
      <Dialog open={showEditRuleDialog} onOpenChange={setShowEditRuleDialog}>
        <DialogContent className="max-w-[98vw] max-h-[98vh] overflow-hidden p-0">
          <div className="h-[98vh] overflow-auto">
            {editingRule && (
              <DCMEditPage
                rule={editingRule}
                onNavigate={() => setShowEditRuleDialog(false)}
                onSave={(updatedRule) => {
                  handleUpdateRule(updatedRule);
                  setShowEditRuleDialog(false);
                }}
                mode="edit"
              />
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}