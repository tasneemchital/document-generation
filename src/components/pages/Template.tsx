import { useState, useRef } from 'react'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Card } from '@/components/ui/card'
import { useKV } from '@github/spark/hooks'
import { RuleData } from '@/lib/types'
import { CMLDialog } from './CMLDialog'
import { 
  Bold, 
  Italic, 
  Underline, 
  AlignLeft, 
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
  const editorRef = useRef<HTMLDivElement>(null)

  const handleInsertRule = (content: string) => {
    if (editorRef.current) {
      // Insert the rule chunk content at cursor position or at the end
      const selection = window.getSelection();
      if (selection && selection.rangeCount > 0) {
        const range = selection.getRangeAt(0);
        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = content;
        
        while (tempDiv.firstChild) {
          range.insertNode(tempDiv.firstChild);
        }
        
        // Move cursor after inserted content
        range.collapse(false);
        selection.removeAllRanges();
        selection.addRange(range);
      } else {
        // If no selection, append to end
        editorRef.current.innerHTML += content;
      }
    }
  }

  const handleEditRule = (ruleId: string) => {
    // Navigate to DCM edit page for the specific rule
    // This would need to be implemented based on your app's navigation pattern
    onNavigate('dcm');
    console.log('Edit rule:', ruleId);
  }

  const executeCommand = (command: string, value?: string) => {
    if (editorRef.current) {
      editorRef.current.focus();
      document.execCommand(command, false, value);
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
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <Label htmlFor="view-select" className="text-sm font-medium">
              View:
            </Label>
            <Select value={selectedView} onValueChange={setSelectedView}>
              <SelectTrigger id="view-select" className="w-32">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Draft">Draft</SelectItem>
                <SelectItem value="Preview">Preview</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center gap-2">
            <Label htmlFor="instance-select" className="text-sm font-medium">
              Instance:
            </Label>
            <Select value={selectedInstance} onValueChange={setSelectedInstance}>
              <SelectTrigger id="instance-select" className="w-32">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Instance 1">Instance 1</SelectItem>
                <SelectItem value="Instance 2">Instance 2</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center gap-2">
            <Label htmlFor="section-select" className="text-sm font-medium">
              Section:
            </Label>
            <Select value={selectedSection} onValueChange={setSelectedSection}>
              <SelectTrigger id="section-select" className="w-48">
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

        <div className="text-lg font-semibold text-foreground">
          Medicare EOC
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
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => executeCommand('bold')}
                  title="Bold"
                >
                  <Bold className="h-4 w-4" />
                </Button>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => executeCommand('italic')}
                  title="Italic"
                >
                  <Italic className="h-4 w-4" />
                </Button>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => executeCommand('underline')}
                  title="Underline"
                >
                  <Underline className="h-4 w-4" />
                </Button>
                <div className="w-px h-6 bg-border mx-2" />
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => executeCommand('justifyLeft')}
                  title="Align Left"
                >
                  <AlignLeft className="h-4 w-4" />
                </Button>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => executeCommand('justifyCenter')}
                  title="Align Center"
                >
                  <AlignCenter className="h-4 w-4" />
                </Button>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => executeCommand('justifyRight')}
                  title="Align Right"
                >
                  <AlignRight className="h-4 w-4" />
                </Button>
                <div className="w-px h-6 bg-border mx-2" />
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => executeCommand('insertUnorderedList')}
                  title="Bullet List"
                >
                  <List className="h-4 w-4" />
                </Button>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => executeCommand('insertOrderedList')}
                  title="Numbered List"
                >
                  <ListOrdered className="h-4 w-4" />
                </Button>
                <div className="w-px h-6 bg-border mx-2" />
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => setShowCMLDialog(true)}
                  className="ml-2"
                  title="Insert Content from CML"
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
            <div
              ref={editorRef}
              contentEditable
              className="min-h-[400px] p-4 border rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              style={{
                lineHeight: '1.6',
                fontFamily: 'Inter, sans-serif',
                fontSize: '14px',
                color: '#1f2937'
              }}
              onDoubleClick={(e) => {
                const target = e.target as HTMLElement;
                const ruleChunk = target.closest('.rule-chunk');
                
                if (ruleChunk) {
                  const ruleId = ruleChunk.getAttribute('data-rule-id');
                  if (ruleId) {
                    e.preventDefault();
                    e.stopPropagation();
                    handleEditRule(ruleId);
                  }
                }
              }}
              onClick={(e) => {
                const target = e.target as HTMLElement;
                const ruleChunk = target.closest('.rule-chunk');
                
                if (ruleChunk) {
                  // Remove selection from other chunks
                  const allChunks = editorRef.current?.querySelectorAll('.rule-chunk');
                  allChunks?.forEach(chunk => chunk.classList.remove('rule-chunk-selected'));
                  
                  // Add selection to clicked chunk
                  ruleChunk.classList.add('rule-chunk-selected');
                  
                  // Prevent text selection within the chunk
                  e.preventDefault();
                } else {
                  // Remove selection from all chunks if clicking outside
                  const allChunks = editorRef.current?.querySelectorAll('.rule-chunk');
                  allChunks?.forEach(chunk => chunk.classList.remove('rule-chunk-selected'));
                }
              }}
              onInput={() => {
                // Handle content changes if needed
              }}
              dangerouslySetInnerHTML={{
                __html: editorContent || '<p>Enter your template content here...</p>'
              }}
              suppressContentEditableWarning={true}
            />
          </div>
        </Card>
      </div>

      {/* CML Dialog */}
      <CMLDialog
        open={showCMLDialog}
        onClose={() => setShowCMLDialog(false)}
        onInsert={handleInsertRule}
      />
    </div>
  )
}