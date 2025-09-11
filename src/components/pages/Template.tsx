import { useState } from 'react'
import { Card } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Bold, Italic, Underline, List, Link, Image, Plus } from '@phosphor-icons/react'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Bold, Italic, Underline, List, Link, Image, Plus } from '@phosphor-icons/react'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { DigitalContentManager } from './DigitalContentManager'

  'Chapter 5',
  'Chapter 7',
 

  'Back Cover',
]
export functio
  const [selec
  const [showC

  'Chapter 5',
  'Chapter 6',
  'Chapter 7',
  'Chapter 8',
  'Chapter 9',
  'Chapter 10',
  'Chapter 11',
  'Chapter 12',
  'Back Cover',
        <div className="fl
]

export function Template({ onNavigate }: TemplateProps) {
                <SelectItem value="Draft">Draft</SelectItem>
  const [selectedView, setSelectedView] = useState('Draft')
  const [selectedInstance, setSelectedInstance] = useState('Instance 1')

            <Label className="text-sm font-medium">Insta

  return (
    <div className="flex flex-col h-full bg-background">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-border">
        <div className="flex items-center gap-4">
            <Label
              <SelectTrigger
              </SelectTrigger>
                {templateSections.map((sectio
           
                ))}
          </Button>
        </div>
        <Button variant="outline" size="sm">
        </div>
      <div c

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








                Edit the content for this section below
              </p>
            </div>
























            
























            <Textarea


              placeholder={`Enter content for ${selectedSection}...`}

            />
          </div>
        </Card>
      </div>
    </div>
  )
}