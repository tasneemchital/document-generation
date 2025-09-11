import { useState, useRef, useEffect } from 'react'
import { Select, SelectContent, SelectItem, Sel
import { RuleData } from '@/lib/types'
  Bold, 
import { RuleData } from '@/lib/types'
  AlignC
  Plus
  Italic,
  Underline,
  Underline,
  AlignCenter,
  'Chap
  List,

  Plus
} from '@phosphor-icons/react' setSe
  Bold, 
  Italic, 
  Underline,
  AlignLeft, 
      setShowC
  AlignRight,
      setTime
]

  const [selectedSection, setS
  const [selectedView, setSelectedView] = useState('Editor')
  const [selectedInstance, setSelectedInstance] = useState('Instance 1')
  const [selectedSection, setSelectedSection] = useState('Medicare EOC Cover Page')
  const [editorContent, setEditorContent] = useKV('template-content', '')
etShowCMLDialog] = useState(false)
  const [selectedRule, setSelectedRule] = useState<RuleData | null>(null)
      
      const ru

      setShowC => {
      
      setTime
]textarea.selectionStart
ectionEnd
      
  const [selectedView, setSelectedView] = useState('Editor')
      const ruleChunk = `\n\n[RULE-${selectedRule.id}]\n${selectedRule.description}\n[/RULE-${selectedRule.id}]\n\n`
      
  const [editorContent, setEditorContent] = useKV('template-content', '')
      setEditorContent(newContent)
      setShowCMLDialog(false)
  const [rules] = useKV<RuleData[]>('rule-data', [])
  const editorRef = useRef<HTMLTextAreaElement>(null)
 // Focus back to editor
  const handleInsertRule = () => {
    if (selectedRule && editorRef.current) {
        textarea.setSelectionRange(start + ruleChunk.length, start + ruleChunk.length)
      const start = textarea.selectionStart
      const end = textarea.selectionEnd
      
      // Create the rule chunk HTML that will be styled by CSS
      const ruleChunk = `\n\n[RULE-${selectedRule.id}]\n${selectedRule.description}\n[/RULE-${selectedRule.id}]\n\n`
  const processContentForDisplay = (content: string) => {
      const newContent = editorContent.substring(0, start) + ruleChunk + editorContent.substring(end)
      setEditorContent(newContent)
      setShowCMLDialog(false)
        return `<div class="rule-chunk" data-rule-id="${ruleId}" onDoubleClick="handleRuleEdit('${ruleId}')">${description.trim()}</div>`
      
      // Focus back to editor
   
        textarea.focus()
        }
    <div className="h-full flex flex-col">
    }foundRule
  }er-b border-border bg-card">

  // Process content to add rule chunk styling
  return (
          </Button>
      /\[RULE-(\d+)\](.*?)\[\/RULE-\d+\]/gs,
        </div>

       ms-center gap-4">
          <div className="flex items-center gap-2">
   reground">View:</span>
 value={selectedView} onValueChange={setSelectedView}>
        }me="w-32">
              <SelectTrigger cl
              </SelectTrigger>
      <div className="flex items-center justify-between p-4 border-b border-border bg-card">
    }     <SelectItem value="Editor">Editor</SelectItem>
          <Button variant="ghost" onClick={() => onNavigate('global-template')}>
  return (
          </Button>
          <h1 className="text-xl font-semibold text-foreground">Template Editor</h1>
        </div>
          <div className="flex items-center gap-2">
        <div className="flex items-center gap-4">
            <Select value={selectedInstance} onValueChange={setSelectedInstance}>
            <span className="text-sm text-muted-foreground">View:</span>
            <Select value={selectedView} onValueChange={setSelectedView}>
              <SelectTrigger className="w-32">
              <SelectTrigger cl
                <SelectItem value="Instance 1">Instance 1</SelectItem>
                <SelectItem value="Instance 2">Instance 2</SelectItem>
              </SelectContent>
            </Select>
                

          <div className="flex items-center gap-2">
span className="text-sm text-muted-foreground">Section:</span>
            <Select value={selectedSection} onValueChange={setSelectedSection}>
              <SelectTrigger className="w-48">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {sectionOptions.map((section) => (
              <SelectContent>
                    {section}
                <SelectItem value="Instance 2">Instance 2</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">Section:</span>
            <Select value={selectedSection} onValueChange={setSelectedSection}>
              <SelectTrigger className="w-48">
                <SelectValue />
              </SelectTrigger>der-border">
              <SelectContent>lex items-center justify-between mb-2">
                {sectionOptions.map((section) => (
            <div className="flex items-center justify-betwee
                    {section}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div> size="sm" title="Italic">
      </div>-4 w-4" />

                <div classNaerline">
      <div className="flex-1 p-4">
                </Button>
                <div className="w-px h-6 bg-border mx-2" />
                <Button variant="outline" size="sm" title="Align Left">
                  <AlignLeft className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="sm" title="Align Center">
                  <AlignCenter className="h-4 w-4" />
                </Button>
                placeholder="Enter your template content here. Use +CML 
                  <Bold className="h-4 w-4" />
                >
                <div className="w-px h-6 bg-border mx-2" />
                  if (editorRef.current) {
                  <List className="h-4 w-4" />
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
                  ba
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

}            <Button variant="outline" onClick={() => setShowCMLDialog(false)}>

            </Button>

              onClick={handleInsertRule}

            >

            </Button>

        </DialogContent>

    </div>

}