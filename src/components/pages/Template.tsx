import { useState } from 'react'
import { Card } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
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
  'Rider and Dental Chat'
]

export function Template({ onNavigate }: TemplateProps) {
  const [selectedView, setSelectedView] = useState('Draft')
  const [selectedInstance, setSelectedInstance] = useState('Instance 1')
  const [selectedSection, setSelectedSection] = useState('Medicare EOC Cover Page')
  const [showCMLDialog, setShowCMLDialog] = useState(false)

  return (
    <div className="flex flex-col h-full bg-background">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-border">
        <div className="flex items-center gap-4">
          <h1 className="text-xl font-semibold">Template</h1>
          <h2 className="text-lg text-muted-foreground">Medicare EOC</h2>
        </div>
        <Button variant="outline" size="sm" onClick={() => onNavigate('dashboard')}>
          Back to Dashboard
        </Button>
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
      <div className="flex-1 p-6">
        <Card className="h-full">
          <div className="flex flex-col h-full">
            {/* Section Title */}
            <div className="p-4 border-b border-border">
              <h3 className="text-lg font-medium">{selectedSection}</h3>
              <p className="text-sm text-muted-foreground mt-1">
                Edit the content for this section below
              </p>
            </div>

            {/* Rich Text Editor Toolbar */}
            <div className="flex items-center gap-2 p-4 border-b border-border bg-muted/20">
              <div className="flex items-center gap-1">
                <Button variant="ghost" size="sm" className="p-2">
                  <Bold className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="sm" className="p-2">
                  <Italic className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="sm" className="p-2">
                  <Underline className="h-4 w-4" />
                </Button>
                <div className="w-px h-4 bg-border mx-2" />
                <Button variant="ghost" size="sm" className="p-2">
                  <List className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="sm" className="p-2">
                  <Link className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="sm" className="p-2">
                  <Image className="h-4 w-4" />
                </Button>
                <div className="w-px h-4 bg-border mx-2" />
                <Dialog open={showCMLDialog} onOpenChange={setShowCMLDialog}>
                  <DialogTrigger asChild>
                    <Button variant="outline" size="sm" className="gap-2">
                      <Plus className="h-4 w-4" />
                      CML
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-6xl max-h-[80vh] overflow-hidden">
                    <DialogHeader>
                      <DialogTitle>Select CML Rule</DialogTitle>
                    </DialogHeader>
                    <div className="overflow-auto max-h-[70vh]">
                      <DigitalContentManager 
                        onNavigate={() => {}}
                        onEditRule={() => {}}
                        isSelectionMode={true}
                      />
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
            </div>

            {/* Content Editor */}
            <div className="flex-1 p-4">
              <Textarea
                className="w-full h-full min-h-[400px] resize-none border-none focus-visible:ring-0 text-sm leading-relaxed"
                placeholder={`Enter content for ${selectedSection}...`}
              />
            </div>
          </div>
        </Card>
      </div>
    </div>
  )
}