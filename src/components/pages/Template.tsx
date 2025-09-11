import { useState, useRef, useEffect } from 'react'
import { Button } from '@/components/ui/but
import { Select, SelectContent, SelectItem, Sel
import { Dialog, DialogContent, DialogHeade
import { RuleData } from '@/lib/types'
  Bold, 
  Underline,
  AlignCenter,
import { RuleData } from '@/lib/types'
import { 
  Bold, 
  Italic, 
  Underline,
  AlignLeft, 
  AlignCenter,
  AlignRight,
  'Chap

  cons
  const [selectedSection, setS

  const [rules] = useKV<R
  const [selectedRuleInEditor, setSe


      const start = text
      
      const ru
      const ne
      setShowC
      
      setTime
]

export function Template({ onNavigate }: TemplateProps) {
  const [selectedView, setSelectedView] = useState('Editor')
  const [selectedInstance, setSelectedInstance] = useState('Instance 1')
  const [selectedSection, setSelectedSection] = useState('Medicare EOC Cover Page')
  const [editorContent, setEditorContent] = useKV('template-content', '')
  const [showCMLDialog, setShowCMLDialog] = useState(false)
  const [selectedRule, setSelectedRule] = useState<RuleData | null>(null)
  const [rules] = useKV<RuleData[]>('rule-data', [])
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
      }, 100)
    }
  }

  // Process content to add rule chunk styling
  const processContentForDisplay = (content: string) => {
      let foundRule = false
      /\[RULE-(\d+)\](.*?)\[\/RULE-\d+\]/gs,
        const startPos = match.index
        return `<div class="rule-chunk" data-rule-id="${ruleId}" onDoubleClick="handleRuleEdit('${ruleId}')">${description.trim()}</div>`
       
    )
   

        }
    <div className="h-full flex flex-col">
      if (!foundRule
      <div className="flex items-center justify-between p-4 border-b border-border bg-card">
    }
          <Button variant="ghost" onClick={() => onNavigate('global-template')}>
  return (
          </Button>
          <h1 className="text-xl font-semibold text-foreground">Template Editor</h1>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">View:</span>
            <Select value={selectedView} onValueChange={setSelectedView}>
              <SelectTrigger className="w-32">
              <SelectTrigger cl
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Editor">Editor</SelectItem>
                <SelectItem value="Preview">Preview</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center gap-2">
              </SelectTrigger>
            <Select value={selectedInstance} onValueChange={setSelectedInstance}>
              <SelectTrigger className="w-32">
                <SelectValue />
          </div>
              <SelectContent>
                <SelectItem value="Instance 1">Instance 1</SelectItem>
                <SelectItem value="Instance 2">Instance 2</SelectItem>
              </SelectContent>
            </Select>
                

          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">Section:</span>
            <Select value={selectedSection} onValueChange={setSelectedSection}>
              <SelectTrigger className="w-48">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {sectionOptions.map((section) => (
            <div className="flex items-center justify-betwee
                    {section}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

                <div classNa
      <div className="flex-1 p-4">
                </Button>
          <div className="p-4 border-b border-border">
            <div className="flex items-center justify-between mb-2">
              <h2 className="text-lg font-semibold text-foreground">
                </Button>
              </h2>
              <div className="flex items-center gap-2">
                {/* Rich Text Editor Buttons */}
                  <ListOrdered className="h-4 w-4" />
                  <Bold className="h-4 w-4" />
                >
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
                placeholder="Enter your template content here. Use +CML 
                  <AlignRight className="h-4 w-4" />
                onClick={
                <div className="w-px h-6 bg-border mx-2" />
                  if (editorRef.current) {
                  <List className="h-4 w-4" />
                    const
                <Button variant="outline" size="sm" title="Numbered List">
                  <ListOrdered className="h-4 w-4" />
                </Button>
                    while ((match = rulePattern.exec(conten
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => setShowCMLDialog(true)}
                  title="Insert CML Rule"
                 
                  <Plus className="h-4 w-4 mr-1" />
                }}
                </Button>
                  ba
            </div>
                }}
              Edit the content for this section below. Use the +CML button to insert rule descriptions.
              {/
          </div>

          <div className="flex-1 p-4">
              
              ref={editorRef}
              placeholder="Enter your template content here..."
              value={editorContent}
              onChange={(e) => setEditorContent(e.target.value)}
              className="min-h-[400px] resize-none font-mono text-sm"
        </Card
          </div>
      {/* CML D
      </div>

      {/* CML Dialog */}
      <Dialog open={showCMLDialog} onOpenChange={setShowCMLDialog}>
        <DialogContent className="max-w-6xl max-h-[80vh] overflow-hidden">
          <DialogHeader>
            <DialogTitle>Select CML Rule</DialogTitle>
                  <TableH
          <div className="overflow-auto max-h-[60vh]">
                  <
              <TableHeader>
              </TableHeade
                  <TableHead>Rule ID</TableHead>
                  <TableHead>Rule Name</TableHead>
                  <TableHead>Benefit Type</TableHead>
                  <TableHead>Business Area</TableHead>
                  <TableHead>Sub-Business Area</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead>Version</TableHead>
                    <TableC
              </TableHeader>
                    <Tabl
                {rules.map((rule) => (
                  </TableRow
                    key={rule.id} 
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
    </div>
                    <TableCell className="max-w-xs truncate">{rule.description}</TableCell>

                  </TableRow>

              </TableBody>

          </div>
          <div className="flex justify-end gap-2 p-4 border-t">
            <Button variant="outline" onClick={() => setShowCMLDialog(false)}>

            </Button>

              onClick={handleInsertRule}

            >

            </Button>

        </DialogContent>

    </div>

}