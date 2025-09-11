import { useState } from 'react'
import { Card } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
 
  'Back Cover',
export functio

      {/* Head
          <h2 
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
            <Se
                  <Bold c
]

export function Template({ onNavigate }: TemplateProps) {
  const [selectedView, setSelectedView] = useState('Draft')
  const [selectedInstance, setSelectedInstance] = useState('Instance 1')
                    </Button>
  const [showCMLDialog, setShowCMLDialog] = useState(false)

  return (
    <div className="flex flex-col h-full bg-background">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-border">
        <div className="flex items-center gap-4">


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







                Edit the content for this section below
              </p>
            </div>






                </Button>















































          </div>
        </Card>
      </div>
    </div>
  )
}