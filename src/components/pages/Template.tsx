import { useState, useRef } from 'react'
import { Card } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import { useKV } from '@github/spark/hooks'
import { RuleData } from '@/lib/types'
import { 
  Bold, 
  Italic, 
  Underline, 
  List, 
  ListNumbers, 
  Link, 
  AlignLeft,
  AlignCenter,
  AlignRight,
  Plus
} from '@phosphor-icons/react'

interface TemplateProps {
  onNavigate: (page: string) => void
}

const templateSections = [
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

export function Template({ onNavigate }: TemplateProps) {
  const [selectedView, setSelectedView] = useState('Draft')
  const [selectedInstance, setSelectedInstance] = useState('Instance 1')
  const [selectedSection, setSelectedSection] = useState('Medicare EOC Cover Page')
  const [editorContent, setEditorContent] = useState('')
  const [showCMLDialog, setShowCMLDialog] = useState(false)
  const [selectedRule, setSelectedRule] = useState<RuleData | null>(null)
  const [rules] = useKV<RuleData[]>('rule-data', [])
  const [, setEditingRule] = useKV<RuleData | null>('dcm-editing-rule', null)
  const textareaRef = useRef<HTMLTextAreaElement>(null)
  const [cursorPosition, setCursorPosition] = useState(0)

  // Track cursor position when textarea is clicked or keys are pressed
  const handleTextareaClick = () => {
    if (textareaRef.current) {
      setCursorPosition(textareaRef.current.selectionStart)
    }
  }

  const handleTextareaKeyUp = () => {
    if (textareaRef.current) {
      setCursorPosition(textareaRef.current.selectionStart)
    }
  }

  const handleRuleSelect = (rule: RuleData) => {
    setSelectedRule(rule)
  }

  const handleInsertRule = () => {
    if (!selectedRule || !textareaRef.current) return

    const textarea = textareaRef.current
    const content = editorContent
    // Use a more readable format for the inserted content
    const insertText = `${selectedRule.description}`
    
    // Insert at cursor position
    const beforeCursor = content.substring(0, cursorPosition)
    const afterCursor = content.substring(cursorPosition)
    const newContent = beforeCursor + insertText + afterCursor
    
    setEditorContent(newContent)
    
    // Store mapping of content to rule for double-click functionality
    const contentToRuleMap = JSON.parse(localStorage.getItem('cml-content-map') || '{}')
    contentToRuleMap[selectedRule.description] = selectedRule.id
    localStorage.setItem('cml-content-map', JSON.stringify(contentToRuleMap))
    
    // Move cursor to end of inserted text
    setTimeout(() => {
      const newCursorPosition = cursorPosition + insertText.length
      textarea.setSelectionRange(newCursorPosition, newCursorPosition)
      textarea.focus()
      setCursorPosition(newCursorPosition)
    }, 0)
    
    setShowCMLDialog(false)
    setSelectedRule(null)
  }

  // Handle double-click on CML content
  const handleEditorDoubleClick = (event: React.MouseEvent) => {
    const textarea = textareaRef.current
    if (!textarea) return

    const clickPosition = textarea.selectionStart
    const content = editorContent
    
    // Get the current selection or word at cursor
    let selectionStart = clickPosition
    let selectionEnd = clickPosition
    
    // Expand selection to include the full content block
    // Look for word boundaries or line breaks
    while (selectionStart > 0 && content[selectionStart - 1] !== '\n' && content[selectionStart - 1] !== ' ') {
      selectionStart--
    }
    while (selectionEnd < content.length && content[selectionEnd] !== '\n' && content[selectionEnd] !== ' ') {
      selectionEnd++
    }
    
    const selectedText = content.substring(selectionStart, selectionEnd).trim()
    
    // Check if this content matches any inserted rule description
    const contentToRuleMap = JSON.parse(localStorage.getItem('cml-content-map') || '{}')
    const ruleId = contentToRuleMap[selectedText]
    
    if (ruleId) {
      const rule = rules.find(r => r.id === ruleId)
      if (rule) {
        // Select the entire content block
        textarea.setSelectionRange(selectionStart, selectionEnd)
        
        // Open edit dialog
        setEditingRule(rule)
        onNavigate('edit-rule')
      }
    }
  }

  return (
    <div className="flex flex-col h-full bg-background">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-border">
        <div className="flex items-center gap-4">
          <h1 className="text-2xl font-semibold text-foreground">Template</h1>
        </div>
      </div>

      {/* Controls Row */}
      <div className="flex items-center justify-between p-4 border-b border-border bg-muted/30">
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            <Label className="text-sm font-medium">View</Label>
            <Select value={selectedView} onValueChange={setSelectedView}>
              <SelectTrigger className="w-[140px] h-9">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Draft">Draft</SelectItem>
                <SelectItem value="Preview">Preview</SelectItem>
                <SelectItem value="Published">Published</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center gap-2">
            <Label className="text-sm font-medium">Instance</Label>
            <Select value={selectedInstance} onValueChange={setSelectedInstance}>
              <SelectTrigger className="w-[140px] h-9">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Instance 1">Instance 1</SelectItem>
                <SelectItem value="Instance 2">Instance 2</SelectItem>
                <SelectItem value="Instance 3">Instance 3</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center gap-2">
            <Label className="text-sm font-medium">Section</Label>
            <Select value={selectedSection} onValueChange={setSelectedSection}>
              <SelectTrigger className="w-[280px] h-9">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {templateSections.map((section) => (
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
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-medium">Medicare EOC</h2>
              <div className="flex items-center gap-2">
                {/* Rich Text Editor Buttons */}
                <Button variant="outline" size="sm">
                  <Bold className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="sm">
                  <Italic className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="sm">
                  <Underline className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="sm">
                  <List className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="sm">
                  <ListNumbers className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="sm">
                  <Link className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="sm">
                  <AlignLeft className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="sm">
                  <AlignCenter className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="sm">
                  <AlignRight className="h-4 w-4" />
                </Button>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => setShowCMLDialog(true)}
                  className="ml-2"
                >
                  <Plus className="h-4 w-4 mr-1" />
                  CML
                </Button>
              </div>
            </div>
            <p className="text-sm text-muted-foreground mb-4">
              Edit the content for this section below
            </p>
          </div>

          <div className="flex-1 p-4">
            <div className="relative">
              <Textarea
                ref={textareaRef}
                placeholder="Enter your template content here..."
                value={editorContent}
                onChange={(e) => setEditorContent(e.target.value)}
                onClick={handleTextareaClick}
                onKeyUp={handleTextareaKeyUp}
                onDoubleClick={handleEditorDoubleClick}
                className="min-h-[400px] resize-none font-mono text-sm pr-4"
              />
              {/* Visual hint for CML content */}
              <div className="absolute top-2 right-2 text-xs text-muted-foreground bg-muted/50 px-2 py-1 rounded">
                Double-click CML content to edit rules
              </div>
            </div>
          </div>
        </Card>
      </div>

      {/* CML Dialog */}
      <Dialog open={showCMLDialog} onOpenChange={setShowCMLDialog}>
        <DialogContent className="max-w-6xl max-h-[80vh] overflow-hidden">
          <DialogHeader>
            <DialogTitle>Select CML Rule</DialogTitle>
            {selectedRule && (
              <div className="text-sm text-muted-foreground mt-2 p-3 bg-muted/30 rounded-md">
                <div className="font-medium">Selected: {selectedRule.ruleName}</div>
                <div className="text-xs mt-1">Description: {selectedRule.description}</div>
              </div>
            )}
          </DialogHeader>
          <div className="overflow-auto max-h-[50vh]">
            <TooltipProvider>
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
                  {rules.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={7} className="text-center text-muted-foreground py-8">
                        No rules available. Please create rules in the Digital Content Manager first.
                      </TableCell>
                    </TableRow>
                  ) : (
                    rules.map((rule) => (
                      <Tooltip key={rule.id}>
                        <TooltipTrigger asChild>
                          <TableRow 
                            className={`cursor-pointer hover:bg-muted/50 transition-colors ${
                              selectedRule?.id === rule.id ? 'bg-primary/10 border-primary/20' : ''
                            }`}
                            onClick={() => handleRuleSelect(rule)}
                          >
                            <TableCell className="font-medium">{rule.id}</TableCell>
                            <TableCell>{rule.ruleName}</TableCell>
                            <TableCell>{rule.benefitType}</TableCell>
                            <TableCell>{rule.businessArea}</TableCell>
                            <TableCell>{rule.subBusinessArea}</TableCell>
                            <TableCell className="max-w-[300px]">
                              <div className="truncate" title={rule.description}>
                                {rule.description}
                              </div>
                            </TableCell>
                            <TableCell>{rule.version}</TableCell>
                          </TableRow>
                        </TooltipTrigger>
                        <TooltipContent side="top">
                          <div className="text-sm">
                            <div className="font-medium">Rule ID: {rule.id}</div>
                            <div className="text-xs text-muted-foreground mt-1">
                              Click to select, then click Insert to add to editor
                            </div>
                          </div>
                        </TooltipContent>
                      </Tooltip>
                    ))
                  )}
                </TableBody>
              </Table>
            </TooltipProvider>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => {
                setShowCMLDialog(false)
                setSelectedRule(null)
              }}
            >
              Cancel
            </Button>
            <Button
              onClick={handleInsertRule}
              disabled={!selectedRule}
              className="bg-primary hover:bg-primary/90"
            >
              {selectedRule ? `Insert "${selectedRule.ruleName}"` : 'Select a rule to insert'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}