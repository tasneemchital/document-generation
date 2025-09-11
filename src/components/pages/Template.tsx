import { useState } from 'react'
import { Card } from '@/components/ui/card'
import { Card } from '@/components/ui/card'
import { Textarea } from '@/components/ui/textarea'
  'Chapter 3',
 
  'Chapter 11',

interface TemplateProps {
  onNavigate: (page: string) => void
}

const templateSections = [
  'Medicare EOC Cover Page',
  'Chapter 1',
  'Chapter 2', 
              
  'Chapter 4',
          
            <S
              
              
          <div
               
  'Chapter 11',
              <
  'Back Cover',
          </Bu
]

              <Label className="text-lg font-semibo
                Edit the content for this section below
  const [selectedView, setSelectedView] = useState('Draft')
  const [selectedInstance, setSelectedInstance] = useState('Instance 1')
                <SelectItem value="Preview">

          
          <div className="flex items-center gap-2">
            <Select 
                <SelectValue />
              <SelectContent>
                <SelectItem value="Instance 2">Instance 2</SelectItem>
        </div>

        <div className="flex items-center gap-2">
            <Select value={selectedSection} 
                <SelectValue />
              <Sele
                  <SelectItem key={section} 
                  </SelectItem>
              </Sel
          </div>

          <Button v
        </div>
      </div>

      {/* Controls Row */}
      <div className="flex items-center justify-between p-4 border-b border-border bg-muted/30">
        <div className="flex items-center gap-6">
              <Label className="text-lg font-semibo
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


              <SelectTrigger className="w-[280px] h-9">















































