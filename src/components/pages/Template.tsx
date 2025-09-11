import { useState } from 'react'
import { useKV } from '@github/spark/hooks'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Card, CardContent } from '@/components/ui/card'
import { 
  Bold, 
  Italic, 
  Underline, 
  List, 
  ListNumbers, 
  Link, 
  AlignLeft, 
  AlignCenter,
  AlignRight,
  Plus
} from '@phosphor-icons/react'
import { RuleData } from '@/lib/types'

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
  const [rules] = useKV<RuleData[]>('rule-data', [])

  const handleInsertRule = (rule: RuleData) => {
    setEditorContent(prev => prev + rule.description)
    setShowCMLDialog(false)
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
            <Label htmlFor="view-select">View:</Label>
            <Select value={selectedView} onValueChange={setSelectedView}>
              <SelectTrigger className="w-32">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Draft">Draft</SelectItem>
                <SelectItem value="Published">Published</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center gap-2">
            <Label htmlFor="instance-select">Instance:</Label>
            <Select value={selectedInstance} onValueChange={setSelectedInstance}>
              <SelectTrigger className="w-32">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Instance 1">Instance 1</SelectItem>
                <SelectItem value="Instance 2">Instance 2</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center gap-2">
            <Label htmlFor="section-select">Section:</Label>
            <Select value={selectedSection} onValueChange={setSelectedSection}>
              <SelectTrigger className="w-48">
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
      </div>

      {/* Editor Section */}
      <div className="flex-1 p-4">
        <Card className="h-full">
          <div className="p-4 border-b border-border">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-medium">{selectedSection}</h2>
              <div className="flex items-center gap-1">
                {/* Rich Text Editor Buttons */}
                <Button variant="outline" size="sm">
                  <Bold className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="sm">
                  <Italic className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="sm">
                  <Underline className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="sm">
                  <List className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="sm">
                  <ListNumbers className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="sm">
                  <Link className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="sm">
                  <AlignLeft className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="sm">
                  <AlignCenter className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="sm">
                  <AlignRight className="h-4 w-4" />
                </Button>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => setShowCMLDialog(true)}
                  className="ml-2"
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

          <CardContent className="flex-1 p-4">
            <Textarea
              placeholder="Enter your template content here..."
              value={editorContent}
              onChange={(e) => setEditorContent(e.target.value)}
              className="min-h-[400px] resize-none font-mono text-sm"
            />
          </CardContent>
        </Card>
      </div>

      {/* CML Dialog */}
      <Dialog open={showCMLDialog} onOpenChange={setShowCMLDialog}>
        <DialogContent className="max-w-6xl max-h-[80vh] overflow-hidden">
          <DialogHeader>
            <DialogTitle>Select CML Rule</DialogTitle>
          </DialogHeader>
          <div className="overflow-auto max-h-[60vh]">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Rule ID</TableHead>
                  <TableHead>Rule Name</TableHead>
                  <TableHead>Benefit Type</TableHead>
                  <TableHead>Business Area</TableHead>
                  <TableHead>Sub-Business Area</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead>Version</TableHead>
                  <TableHead>Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {rules.map((rule) => (
                  <TableRow key={rule.id} className="hover:bg-muted/50">
                    <TableCell>{rule.id}</TableCell>
                    <TableCell>{rule.ruleName}</TableCell>
                    <TableCell>{rule.benefitType}</TableCell>
                    <TableCell>{rule.businessArea}</TableCell>
                    <TableCell>{rule.subBusinessArea}</TableCell>
                    <TableCell className="max-w-md truncate">{rule.description}</TableCell>
                    <TableCell>{rule.version}</TableCell>
                    <TableCell>
                      <Button 
                        size="sm" 
                        onClick={() => handleInsertRule(rule)}
                      >
                        Insert
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}