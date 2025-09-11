import { useState, useRef, useEffect } from 'react'
import { RuleData } from '@/lib/types'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
  Plus
  Bold, 
  Underli
      se
      setT

  const [sele
  AlignCenter,
  AlignRight,
  List,
  ListOrdered,
  Plus
} from '@phosphor-icons/react'

interface TemplateProps {
  onNavigate: (page: string) => void
}

const sectionOptions = [
  'Medicare EOC Cover Page',
  'Chapter 1',
      // Creat
  'Chapter 3',
  'Chapter 4',
  'Chapter 5'
 

export function Template({ onNavigate }: TemplateProps) {
  const [selectedView, setSelectedView] = useState('Editor')
  const [selectedInstance, setSelectedInstance] = useState('Instance 1')
  const [selectedSection, setSelectedSection] = useState('Medicare EOC Cover Page')
  const [editorContent, setEditorContent] = useKV('template-content', '')
  const [showCMLDialog, setShowCMLDialog] = useState(false)
  const [selectedRule, setSelectedRule] = useState<RuleData | null>(null)
  const [rules] = useKV<RuleData[]>('rule-data', [])
  const [editingRuleId, setEditingRuleId] = useState<string | null>(null)
  const editorRef = useRef<HTMLTextAreaElement>(null)

          <h1 className="text-xl f
    if (selectedRule && editorRef.current) {
      const textarea = editorRef.current
      const start = textarea.selectionStart
      const end = textarea.selectionEnd
      
      // Create the rule chunk HTML that will be styled by CSS
      const ruleChunk = `\n\n[RULE-${selectedRule.id}]\n${selectedRule.description}\n[/RULE-${selectedRule.id}]\n\n`
span c
      const newContent = editorContent.substring(0, start) + ruleChunk + editorContent.substring(end)
      setEditorContent(newContent)
      setShowCMLDialog(false)
      setSelectedRule(null)
      
      // Focus back to editor
      setTimeout(() => {
        textarea.focus()
        textarea.setSelectionRange(start + ruleChunk.length, start + ruleChunk.length)
             
    }
  }

  // Process content to add rule chunk styling
  const processContentForDisplay = (content: string) => {
                <div classN
      /\[RULE-(\d+)\](.*?)\[\/RULE-\d+\]/gs,
                <Button variant="outlin
        return `<div class="rule-chunk" data-rule-id="${ruleId}" onDoubleClick="handleRuleEdit('${ruleId}')">${description.trim()}</div>`
       
    )
   

          
    <div className="h-full flex flex-col">
                <But
      <div className="flex items-center justify-between p-4 border-b border-border bg-card">
                  <AlignCenter className="h-4 w-4
          <Button variant="ghost" onClick={() => onNavigate('global-template')}>
                onClick={
          </Button>
          <h1 className="text-xl font-semibold text-foreground">Template Editor</h1>
              

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">View:</span>
            <Select value={selectedView} onValueChange={setSelectedView}>
              <SelectTrigger className="w-32">
                <SelectValue />
                  <TableHead>D
              <SelectContent>
                <SelectItem value="Editor">Editor</SelectItem>
                <SelectItem value="Preview">Preview</SelectItem>
                    className=
            </Select>
          </div>

                    <TableCell>{rule.benefitType}</
            <span className="text-sm text-muted-foreground">Instance:</span>

              <SelectTrigger className="w-32">
                <SelectValue />
              </SelectTrigger>

                <SelectItem value="Instance 1">Instance 1</SelectItem>
                <SelectItem value="Instance 2">Instance 2</SelectItem>
              </SelectContent>

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

                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      {/* Editor Section */}

        <Card className="h-full flex flex-col">

            <div className="flex items-center justify-between mb-2">
              <h2 className="text-lg font-semibold text-foreground">
                {selectedSection}

              <div className="flex items-center gap-2">
                {/* Rich Text Editor Buttons */}
                <Button variant="outline" size="sm" title="Bold">

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

                </Button>
                <div className="w-px h-6 bg-border mx-2" />
                <Button variant="outline" size="sm" title="Bullet List">

                </Button>
                <Button variant="outline" size="sm" title="Numbered List">
                  <ListOrdered className="h-4 w-4" />
                </Button>
                <div className="w-px h-6 bg-border mx-2" />

                  variant="outline" 
                  size="sm"
                  onClick={() => setShowCMLDialog(true)}
                  title="Insert CML Rule"
                >
                  <Plus className="h-4 w-4 mr-1" />
                  CML

              </div>

            <p className="text-sm text-muted-foreground mb-4">
              Edit the content for this section below. Use the +CML button to insert rule descriptions.
            </p>


          <div className="flex-1 p-4">
            <Textarea

              placeholder="Enter your template content here..."
              value={editorContent}
              onChange={(e) => setEditorContent(e.target.value)}
              className="min-h-[400px] resize-none font-mono text-sm"
            />

        </Card>


      {/* CML Dialog */}
      <Dialog open={showCMLDialog} onOpenChange={setShowCMLDialog}>
        <DialogContent className="max-w-6xl max-h-[80vh] overflow-hidden">
          <DialogHeader>
            <DialogTitle>Select CML Rule</DialogTitle>
          </DialogHeader>
          <div className="overflow-auto max-h-[60vh]">
            <Table>

                <TableRow>

                  <TableHead>Rule Name</TableHead>
                  <TableHead>Benefit Type</TableHead>
                  <TableHead>Business Area</TableHead>
                  <TableHead>Sub-Business Area</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead>Version</TableHead>
                </TableRow>

              <TableBody>

                  <TableRow 

                    className={`cursor-pointer hover:bg-muted/50 ${
                      selectedRule?.id === rule.id ? 'bg-muted' : ''
                    }`}
                    onClick={() => setSelectedRule(rule)}
                    title={`Rule ID: ${rule.id}`}
                  >
                    <TableCell>{rule.id}</TableCell>
                    <TableCell>{rule.ruleName}</TableCell>
                    <TableCell>{rule.benefitType}</TableCell>
                    <TableCell>{rule.businessArea}</TableCell>
                    <TableCell>{rule.subBusinessArea}</TableCell>
                    <TableCell className="max-w-xs truncate">{rule.description}</TableCell>
                    <TableCell>{rule.version}</TableCell>

                ))}

            </Table>

          <div className="flex justify-end gap-2 p-4 border-t">
            <Button variant="outline" onClick={() => setShowCMLDialog(false)}>
              Cancel

            <Button 

              disabled={!selectedRule}

              Insert Rule

          </div>

      </Dialog>

  )
