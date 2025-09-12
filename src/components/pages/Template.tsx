import { useState, useRef, useEffect } from 'react'
import { useKV } from '@github/spark/hooks'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { 
  Bold, 
  Italic, 
  Underline, 
  AlignLeft,
  AlignCenter,
  AlignRight,
  List,
  ListNumbers,
  Plus,
  ArrowLeft,
  FloppyDisk
} from '@phosphor-icons/react'
import { DCMEditPage } from './DCMEditPage'
import { RuleData } from '@/lib/types'

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
  const [rules] = useKV<RuleData[]>('rule-data', [])
  const [selectedSection, setSelectedSection] = useState('Chapter 1')
  const [selectedView, setSelectedView] = useState('medicare-eoc')
  const [selectedInstance, setSelectedInstance] = useState('hmo-mapd')
  const [templateContents, setTemplateContents] = useKV<Record<string, string>>('template-contents', {})
  const [showCMLDialog, setShowCMLDialog] = useState(false)
  const [selectedRule, setSelectedRule] = useState<RuleData | null>(null)
  const [showEditRuleDialog, setShowEditRuleDialog] = useState(false)
  const [editingRule, setEditingRule] = useState<RuleData | null>(null)
  const [isModified, setIsModified] = useState(false)
  const editorRef = useRef<HTMLTextAreaElement>(null)

  // Get current section content
  const editorContent = templateContents[selectedSection] || ''
  
  const setEditorContent = (content: string) => {
    setTemplateContents((current: Record<string, string>) => ({
      ...current,
      [selectedSection]: content
    }))
  }

  const handleCMLInsert = () => {
    setSelectedRule(null) // Reset selection
    setShowCMLDialog(true)
  }

  const handleSave = () => {
    setIsModified(false)
    // Content is automatically saved via useKV
    // Show success message or feedback here if needed
  }

  const handleContentChange = (value: string) => {
    setEditorContent(value)
    setIsModified(true)
  }

  const handleSectionChange = (section: string) => {
    if (isModified) {
      // Auto-save current content before switching
      setIsModified(false)
    }
    setSelectedSection(section)
    setIsModified(false)
  }

  const handleInsertRule = () => {
    if (selectedRule && editorRef.current) {
      const textarea = editorRef.current
      const cursorPosition = textarea.selectionStart
      const currentContent = editorContent
      
      const ruleChunk = `[RULE-${selectedRule.id}]${selectedRule.description}[/RULE-${selectedRule.id}]`
      
      const newContent = 
        currentContent.slice(0, cursorPosition) +
        '\n' + ruleChunk + '\n' +
        currentContent.slice(cursorPosition)
      
      setEditorContent(newContent)
      setIsModified(true)
      setShowCMLDialog(false)
      setSelectedRule(null)
      
      // Focus back to editor and set cursor position
      setTimeout(() => {
        if (editorRef.current) {
          editorRef.current.focus()
          const newCursorPosition = cursorPosition + ruleChunk.length + 2 // +2 for newlines
          editorRef.current.setSelectionRange(newCursorPosition, newCursorPosition)
        }
      }, 100)
    }
  }

  const handleEditRule = () => {
    if (!editorRef.current) return
    
    const textarea = editorRef.current
    const selectionStart = textarea.selectionStart
    const selectionEnd = textarea.selectionEnd
    const selectedText = editorContent.slice(selectionStart, selectionEnd)
    
    // Check if selected text contains a rule
    const ruleMatch = selectedText.match(/\[RULE-([^\]]+)\]/)
    if (ruleMatch) {
      const ruleId = ruleMatch[1]
      const rule = rules.find(r => r.id === ruleId)
      if (rule && onEditRule) {
        onEditRule(ruleId)
        return
      }
    }
    
    // If no rule is selected, check if cursor is within a rule block
    const lines = editorContent.split('\n')
    let currentLine = 0
    let currentPosition = 0
    
    for (let i = 0; i < lines.length; i++) {
      if (currentPosition + lines[i].length >= selectionStart) {
        currentLine = i
        break
      }
      currentPosition += lines[i].length + 1 // +1 for newline
    }
    
    // Look backwards and forwards for rule boundaries
    let foundRuleId = ''
    let ruleStartLine = -1
    let ruleEndLine = -1
    
    for (let i = currentLine; i >= 0; i--) {
      const match = lines[i].match(/\[RULE-([^\]]+)\]/)
      if (match) {
        foundRuleId = match[1]
        ruleStartLine = i
        break
      }
    }
    
    // Look forwards for [/RULE-id] if we found a start
    if (foundRuleId) {
      for (let i = ruleStartLine; i < lines.length; i++) {
        if (lines[i].includes(`[/RULE-${foundRuleId}]`)) {
          ruleEndLine = i
          break
        }
      }
      
      if (ruleEndLine !== -1 && onEditRule) {
        onEditRule(foundRuleId)
        return
      }
    }
    
    // If no rule found, show a message
    setTimeout(() => {
      alert('Please select rule text to edit. Rule text appears as highlighted blocks.')
    }, 0)
  }

  const handleUpdateRule = (updatedRule: RuleData) => {
    // Update the rule content in editor
    const updatedContent = editorContent.replace(
      new RegExp(`\\[RULE-${updatedRule.id}\\].*?\\[/RULE-${updatedRule.id}\\]`, 'g'),
      `[RULE-${updatedRule.id}]${updatedRule.description}[/RULE-${updatedRule.id}]`
    )
    setEditorContent(updatedContent)
    setIsModified(true)
    setShowEditRuleDialog(false)
    setEditingRule(null)
  }

  // Convert rule chunks to styled format for display
  useEffect(() => {
    if (editorRef.current) {
      const textarea = editorRef.current
      const content = textarea.value
      
      // This would need additional implementation for visual rule chunks
      // For now, we'll use the basic textarea with rule markers
    }
  }, [editorContent])

  return (
    <div className="h-full flex flex-col bg-background">
      <div className="flex items-center justify-between p-6 border-b">
        <div className="flex items-center gap-4">
          <Button variant="ghost" onClick={() => onNavigate('dashboard')}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Dashboard
          </Button>
          <h1 className="text-2xl font-semibold">Template</h1>
        </div>
      </div>

      <div className="flex-1 p-6">
        <Card className="h-full">
          <div className="p-6 space-y-6">
            {/* Header Controls */}
            <div className="flex items-center gap-4 pb-4 border-b">
              <div className="flex items-center gap-2">
                <label className="text-sm font-medium">View:</label>
                <Select value={selectedView} onValueChange={setSelectedView}>
                  <SelectTrigger className="w-[200px]">
                    <SelectValue placeholder="Select view" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="medicare-eoc">Medicare EOC</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-center gap-2">
                <label className="text-sm font-medium">Instance:</label>
                <Select value={selectedInstance} onValueChange={setSelectedInstance}>
                  <SelectTrigger className="w-[200px]">
                    <SelectValue placeholder="Select instance" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="hmo-mapd">HMO MAPD</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-center gap-2">
                <label className="text-sm font-medium">Section:</label>
                <Select value={selectedSection} onValueChange={handleSectionChange}>
                  <SelectTrigger className="w-[200px]">
                    <SelectValue placeholder="Select section" />
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

              <h2 className="text-lg font-semibold ml-4">
                {selectedSection || 'Chapter 1'}
              </h2>
              
              <div className="ml-auto">
                <Button 
                  onClick={handleSave}
                  disabled={!isModified}
                  className="bg-primary hover:bg-primary/90"
                >
                  <FloppyDisk className="h-4 w-4 mr-2" />
                  {isModified ? 'Save Changes' : 'Saved'}
                </Button>
              </div>
            </div>

            {/* Editor Section */}
            <div className="space-y-4 h-[600px]">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-medium">Content Template</h3>
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm" title="Bold">
                    <Bold className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="sm" title="Italic">
                    <Italic className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="sm" title="Underline">
                    <Underline className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="sm" title="Align Left">
                    <AlignLeft className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="sm" title="Align Center">
                    <AlignCenter className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="sm" title="Align Right">
                    <AlignRight className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="sm" title="Bullet List">
                    <List className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="sm" title="Numbered List">
                    <ListNumbers className="h-4 w-4" />
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={handleCMLInsert}
                    className="ml-2"
                  >
                    <Plus className="h-4 w-4 mr-1" />
                    CML
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleEditRule}
                  >
                    Edit Rule
                  </Button>
                </div>
              </div>

              <div className="text-sm text-muted-foreground mb-2">
                Select rule text and click "Edit Rule" to modify rule content.
              </div>

              <div className="flex-1">
                <Textarea
                  ref={editorRef}
                  value={editorContent}
                  onChange={(e) => handleContentChange(e.target.value)}
                  placeholder="Start typing or click + CML to insert rule content..."
                  className="min-h-[500px] font-mono text-sm resize-none w-full"
                />
              </div>
            </div>
          </div>
        </Card>
      </div>

      {/* CML Dialog */}
      <Dialog open={showCMLDialog} onOpenChange={setShowCMLDialog}>
        <DialogContent className="max-w-7xl h-[85vh] flex flex-col p-0">
          <DialogHeader className="px-6 py-4 border-b flex-shrink-0">
            <DialogTitle>Select Rule to Insert ({rules.length} rules available)</DialogTitle>
          </DialogHeader>
          
          <div className="flex-1 overflow-hidden">
            <ScrollArea className="h-full w-full">
              <div className="px-6 py-4">
                <div className="overflow-x-auto">
                  <Table className="min-w-[1000px]">
                    <TableHeader className="sticky top-0 bg-background z-10 border-b">
                      <TableRow>
                        <TableHead className="w-[100px] min-w-[100px]">Rule ID</TableHead>
                        <TableHead className="w-[140px] min-w-[140px]">Benefit Type</TableHead>
                        <TableHead className="w-[140px] min-w-[140px]">Business Area</TableHead>
                        <TableHead className="w-[160px] min-w-[160px]">Sub-Business Area</TableHead>
                        <TableHead className="w-[80px] min-w-[80px]">Version</TableHead>
                        <TableHead className="w-[400px] min-w-[300px]">Description</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {rules.length === 0 ? (
                        <TableRow>
                          <TableCell colSpan={6} className="text-center text-muted-foreground py-8">
                            No rules available. Create rules in Digital Content Manager first.
                          </TableCell>
                        </TableRow>
                      ) : (
                        rules.map((rule) => (
                          <TableRow 
                            key={rule.id}
                            className={`cursor-pointer hover:bg-muted/50 transition-colors ${
                              selectedRule?.id === rule.id ? 'bg-primary/10 border-primary/50 shadow-sm' : ''
                            }`}
                            onClick={() => setSelectedRule(rule)}
                          >
                            <TableCell className="font-medium whitespace-nowrap">{rule.id}</TableCell>
                            <TableCell className="whitespace-nowrap">{rule.benefitType}</TableCell>
                            <TableCell className="whitespace-nowrap">{rule.businessArea}</TableCell>
                            <TableCell className="whitespace-nowrap">{rule.subBusinessArea}</TableCell>
                            <TableCell className="whitespace-nowrap">{rule.version}</TableCell>
                            <TableCell className="whitespace-normal break-words max-w-[400px]">{rule.description}</TableCell>
                          </TableRow>
                        ))
                      )}
                    </TableBody>
                  </Table>
                </div>
              </div>
            </ScrollArea>
          </div>
          
          <div className="flex items-center justify-between p-6 border-t bg-background flex-shrink-0 shadow-lg">
            <div className="flex items-center gap-2 text-sm text-muted-foreground max-w-[60%]">
              {selectedRule ? (
                <span>Selected: <strong className="text-foreground">{selectedRule.id}</strong> - {selectedRule.description.substring(0, 80)}...</span>
              ) : (
                <span>Click on a rule row to select it for insertion</span>
              )}
            </div>
            <div className="flex gap-3">
              <Button 
                variant="outline" 
                onClick={() => {
                  setShowCMLDialog(false)
                  setSelectedRule(null)
                }}
                className="min-w-[80px]"
              >
                Cancel
              </Button>
              <Button 
                onClick={handleInsertRule}
                disabled={!selectedRule}
                className="bg-primary hover:bg-primary/90 min-w-[80px] font-medium"
              >
                Insert
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Edit Rule Dialog */}
      <Dialog open={showEditRuleDialog} onOpenChange={setShowEditRuleDialog}>
        <DialogContent className="max-w-7xl max-h-[90vh] p-0">
          <div className="h-full">
            {editingRule && (
              <DCMEditPage
                rule={editingRule}
                onNavigate={() => setShowEditRuleDialog(false)}
                onSave={(updatedRule) => {
                  handleUpdateRule(updatedRule)
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