import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'electTrigger, SelectValue } from '@/components/ui/select'
  Link, 
  AlignCenter,
  Plus
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
  onNaviga

  'Medic
 [showCM
  'Chapt
  'Chapter 6
  'Chapter 8',
  'Chapter 10
  'Cha
  'Chapter 6

  const [selectedView, se
  'Cha
 

    <div className="flex f
      <div className="flex i
 

      {/* Cont
  'Chapter 4',
  'Chapter 5',
  'Chapter 6',
  'Chapter 7',
  'Chapter 4',
  'Chapter 5',
  'Chapter 6',
  'Chapter 7',
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

                </Button>










          </div>






































" size="sm">







                <Button variant="outline" size="sm">

ssName="h-4 w-4" />
                </Button>
                <Button variant="outline" size="sm">
ers className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="sm">
ssName="h-4 w-4" />
               </Button>
                  <List className="h-4 w-4" />
                  <AlignLeft className="h-4 w-4" />
                </Button>
                  <ListNumbers className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="sm">
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

          <div className="flex-1 p-4">
            <Textarea
              placeholder="Enter your template content here..."
              value={editorContent}
              onChange={(e) => setEditorContent(e.target.value)}
              className="min-h-[400px] resize-none font-mono text-sm"
            />
          </div>
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
                </TableRow>
              </TableHeader>
              <TableBody>
                {rules.map((rule) => (
                  <TableRow key={rule.id} className="cursor-pointer hover:bg-muted/50">
                    <TableCell>{rule.id}</TableCell>
                    <TableCell>{rule.ruleName}</TableCell>
                    <TableCell>{rule.benefitType}</TableCell>
                    <TableCell>{rule.businessArea}</TableCell>
                    <TableCell>{rule.subBusinessArea}</TableCell>
                    <TableCell>{rule.description}</TableCell>
                    <TableCell>{rule.version}</TableCell>
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