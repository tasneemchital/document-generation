import { useState } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Bold, Italic, Underline, List, Link, Image, Plus } from '@phosphor-icons/react'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { DigitalContentManager } from './DigitalContentManager'

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
  'Rider and Dental Chart'
]

export function Template({ onNavigate }: TemplateProps) {
  const [selectedSection, setSelectedSection] = useState(templateSections[0])
  const [selectedView, setSelectedView] = useState('Draft')
  const [selectedInstance, setSelectedInstance] = useState('Instance 1')
  const [showCMLDialog, setShowCMLDialog] = useState(false)
  const [editorContent, setEditorContent] = useState('')

  return (
    <div className="flex flex-col h-full bg-background">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-border">
        <div className="flex items-center gap-4">
          <Button 
            variant="ghost" 
            onClick={() => onNavigate('dashboard')}
            className="text-muted-foreground"
          >
            ← Back to Dashboard
          </Button>
          <div className="h-6 w-px bg-border" />
          <h1 className="text-xl font-semibold">Medicare EOC Template</h1>
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

        <Button variant="outline" size="sm">
          Save Changes
        </Button>
      </div>

      {/* Editor Section */}
      <div className="flex-1 flex flex-col">
        <Card className="flex-1 m-4">
          <div className="p-4 border-b border-border">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold">{selectedSection}</h2>
              <p className="text-sm text-muted-foreground">
                Edit the content for this section below
              </p>
            </div>
          </div>

          {/* Rich Text Editor Toolbar */}
          <div className="flex items-center gap-2 p-3 border-b border-border bg-muted/20">
            <Button variant="outline" size="sm">
              <Bold className="w-4 h-4" />
            </Button>
            <Button variant="outline" size="sm">
              <Italic className="w-4 h-4" />
            </Button>
            <Button variant="outline" size="sm">
              <Underline className="w-4 h-4" />
            </Button>
            <div className="w-px h-6 bg-border mx-1" />
            <Button variant="outline" size="sm">
              <List className="w-4 h-4" />
            </Button>
            <Button variant="outline" size="sm">
              <Link className="w-4 h-4" />
            </Button>
            <Button variant="outline" size="sm">
              <Image className="w-4 h-4" />
            </Button>
            <div className="w-px h-6 bg-border mx-1" />
            
            <Dialog open={showCMLDialog} onOpenChange={setShowCMLDialog}>
              <DialogTrigger asChild>
                <Button variant="outline" size="sm">
                  <Plus className="w-4 h-4 mr-1" />
                  CML
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-6xl max-h-[80vh] overflow-hidden">
                <DialogHeader>
                  <DialogTitle>CML Rules - Digital Content Manager</DialogTitle>
                </DialogHeader>
                <div className="flex-1 overflow-hidden">
                  <DigitalContentManager 
                    onNavigate={() => {}} 
                    onEditRule={() => {}}
                    isDialog={true}
                  />
                </div>
              </DialogContent>
            </Dialog>
          </div>

          {/* Editor Content Area */}
          <div className="flex-1 p-4">
            <Textarea
              value={editorContent}
              onChange={(e) => setEditorContent(e.target.value)}
              placeholder={`Enter content for ${selectedSection}...`}
              className="min-h-[400px] resize-none border-0 focus-visible:ring-0 text-base leading-relaxed"
            />
          </div>
        </Card>
      </div>
    </div>
  )
}