import { useState } from 'react'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Card } from '@/components/ui/card'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { PencilSimple, Export, DotsThree } from '@phosphor-icons/react'

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
  const [selectedSection, setSelectedSection] = useState('Medicare EOC Cover Page')
  const [content, setContent] = useState('')

  return (
    <div className="flex flex-col h-full bg-background">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-border">
        <div className="flex items-center gap-4">
          <h1 className="text-xl font-semibold text-foreground">Template Editor</h1>
          <div className="h-0.5 bg-primary w-16 rounded-full" />
        </div>

        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm">
            <PencilSimple size={16} />
          </Button>
          <Button variant="ghost" size="sm">
            <Export size={16} />
          </Button>
          <Button variant="ghost" size="sm">
            <DotsThree size={16} />
          </Button>
        </div>
      </div>

      {/* Section Controls */}
      <div className="flex items-center justify-between p-4 border-b border-border">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <Label className="text-sm font-medium">Section</Label>
            <Select value={selectedSection} onValueChange={setSelectedSection}>
              <SelectTrigger className="w-[300px] h-10">
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

        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            Save Draft
          </Button>
          <Button size="sm">
            Publish
          </Button>
        </div>
      </div>

      {/* Editor Content */}
      <div className="flex-1 p-6">
        <Card className="h-full">
          <div className="p-6 h-full">
            <div className="mb-4">
              <Label className="text-lg font-semibold text-foreground">
                {selectedSection}
              </Label>
              <p className="text-sm text-muted-foreground mt-1">
                Edit the content for this section below
              </p>
            </div>
            
            <Textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder={`Enter content for ${selectedSection}...`}
              className="h-[calc(100%-80px)] resize-none"
            />
          </div>
        </Card>
      </div>
    </div>
  )
}