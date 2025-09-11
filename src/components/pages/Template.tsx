import { useState } from 'react'
import { useKV } from '@github/spark/hooks'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { PencilSimple, Export, DotsThree } from '@phosphor-icons/react'
import { Textarea } from '@/components/ui/textarea'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

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

const instances = ['Medicare EOC', 'Medicare Supplement', 'Medicaid']

export function Template({ onNavigate }: TemplateProps) {
  const [selectedView] = useState('Medicare EOC')
  const [selectedInstance] = useState('Medicare EOC')
  const [selectedSection, setSelectedSection] = useKV('template-selected-section', 'Medicare EOC Cover Page')
  const [sectionContent, setSectionContent] = useKV<Record<string, string>>('template-section-content', {})

  const currentContent = sectionContent[selectedSection] || ''

  const handleContentChange = (content: string) => {
    setSectionContent(prev => ({
      ...prev,
      [selectedSection]: content
    }))
  }

  const handleSave = () => {
    // Save functionality would be implemented here
    console.log('Saving content for section:', selectedSection)
  }

  return (
    <div className="flex flex-col h-full bg-background">
      {/* Header */}
      <div className="bg-card border-b border-border p-6">
        {/* Title Section */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-foreground mb-2">Medicare EOC</h1>
          <p className="text-sm text-muted-foreground">
            Version 1/1/2026, Version No. 2026_1.01
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-end gap-2 mb-6">
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

        {/* Navigation Controls */}
        <div className="flex items-center gap-6 flex-wrap">
          {/* View Dropdown */}
          <div className="flex items-center gap-2">
            <Label className="text-sm font-medium whitespace-nowrap">View</Label>
            <Select value={selectedView}>
              <SelectTrigger className="w-[180px] h-9">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Medicare EOC">Medicare EOC</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Instances Dropdown */}
          <div className="flex items-center gap-2">
            <Label className="text-sm font-medium whitespace-nowrap">Instances</Label>
            <Select value={selectedInstance}>
              <SelectTrigger className="w-[180px] h-9">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {instances.map(instance => (
                  <SelectItem key={instance} value={instance}>
                    {instance}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Section Dropdown */}
          <div className="flex items-center gap-2">
            <Label className="text-sm font-medium whitespace-nowrap">Section</Label>
            <Select value={selectedSection} onValueChange={setSelectedSection}>
              <SelectTrigger className="w-[240px] h-9">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {templateSections.map(section => (
                  <SelectItem key={section} value={section}>
                    {section}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      {/* Content Area */}
      <div className="flex-1 p-6">
        <div className="h-full">
          <Card className="h-full">
            <div className="h-full flex flex-col">
              {/* Section Title */}
              <div className="border-b border-border p-4">
                <h2 className="text-lg font-semibold text-foreground">
                  {selectedSection}
                </h2>
              </div>

              {/* Full Page Editor */}
              <div className="flex-1 p-4">
                <div className="h-full flex flex-col gap-4">
                  {/* Editor Toolbar */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Button variant="outline" size="sm">Bold</Button>
                      <Button variant="outline" size="sm">Italic</Button>
                      <Button variant="outline" size="sm">Underline</Button>
                      <div className="w-px h-6 bg-border mx-2" />
                      <Button variant="outline" size="sm">Bullet List</Button>
                      <Button variant="outline" size="sm">Number List</Button>
                      <div className="w-px h-6 bg-border mx-2" />
                      <Button variant="outline" size="sm">Insert Table</Button>
                      <Button variant="outline" size="sm">Insert Image</Button>
                    </div>
                    <Button onClick={handleSave}>Save Changes</Button>
                  </div>

                  {/* Content Editor */}
                  <div className="flex-1 border border-border rounded-md">
                    <Textarea
                      value={currentContent}
                      onChange={(e) => handleContentChange(e.target.value)}
                      placeholder={`Enter content for ${selectedSection}...`}
                      className="h-full min-h-[400px] resize-none border-0 focus-visible:ring-0 text-base leading-relaxed"
                    />
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}