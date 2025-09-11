import { useState, useRef } from
import { Label } from '@/components/ui/label'
import { Card } from '@/components/ui/card'
import { RuleData } from '@/lib/types'
import { 
  Italic, 
  AlignLeft, 
  AlignRight,
  ListOrdered,
} from '@phosphor-icons/react'
interface
}
const sect
  'Chapter 1'
  'Chapter 3'
  'Chapter 5',
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
        range.
        select
        // If 
      }
  }
  const handleE
    // This wou
    console.log

    if (editorRef.current
 

  return (
      {/* Header */}
        <div className="flex items-center gap-4">
        </div>

      <div className="flex items-center justify-between p-4
          <div className="flex items-center gap-2">
              View:

                <SelectValue />
              <SelectCo
                <SelectItem value="Preview">Preview</SelectItem
            </Select>

     
   

          
                <SelectItem value="Instance 1">Instance 
              </Sele
          </div>
          <div className="flex items-center gap-2
              Section:
            <S
            

                  <SelectI
                  </SelectItem>
              </SelectContent>
          </div>

          Medicare 
      </div>
      {/* Editor Section */}
        <Card className="h-full flex flex-col">
            <div className="fle
                {selectedSecti
              <div className=
                <Button 
                  size="sm"
                  title="Bold"
                  <Bo
                

                  title="Italic"
                  <Italic className="h-4 w-4" />
                <Button
                  si
                  title="Underline"
                  <Underline className="h-4 w-4" />
                <div className=
                  variant="out
                  onClick={()
                >
                </Button>
                  variant="out
                  onC
                

                  variant="outline" 
                  onClick={() => executeCommand('justifyRight')}
                >
                </Bu
                <Button 
                  size="sm"
                  title="Bullet
                  <List classN
                <Button 
                  size="sm"
                  title="Numbered List"
                  <ListOrdere
                <div className=
                  v
                  onClick={() 
                  tit
                
              

              Edit the content for this section below
          </div>
          <div
            

                lineHeight: 
      <div className="flex-1 p-4">
        <Card className="h-full flex flex-col">
          <div className="p-4 border-b border-border">
            <div className="flex items-center justify-between mb-2">
              <h2 className="text-lg font-semibold text-foreground">
                {selectedSection}
              </h2>
              <div className="flex items-center gap-2">
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
                <div className="w-px h-6 bg-border mx-2" />
                <Button variant="outline" size="sm">
                  <AlignLeft className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="sm">
                  <AlignCenter className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="sm">
                  <AlignRight className="h-4 w-4" />
                </Button>
                <div className="w-px h-6 bg-border mx-2" />
                <Button variant="outline" size="sm">
                  <List className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="sm">
                  <ListOrdered className="h-4 w-4" />
                </Button>
                <div className="w-px h-6 bg-border mx-2" />
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
                  <TableRow 
                    key={rule.id} 
                    className={`cursor-pointer hover:bg-muted/50 ${
                      selectedRule?.id === rule.id ? 'bg-muted' : ''
                    }`}
                    onClick={() => setSelectedRule(rule)}
                    title={`Rule ID: ${rule.id}`}
                  >
                    <TableCell>{rule.id}</TableCell>
                    <TableCell>{rule.ruleName}</TableCell>
                    <TableCell>{rule.benefitType}</TableCell>
                    <TableCell>{rule.businessArea}</TableCell>
                    <TableCell>{rule.subBusinessArea}</TableCell>
                    <TableCell className="max-w-xs truncate">{rule.description}</TableCell>
                    <TableCell>{rule.version}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          <div className="flex justify-end gap-2 p-4 border-t">
            <Button variant="outline" onClick={() => setShowCMLDialog(false)}>
              Cancel
            </Button>
            <Button 
              onClick={handleInsertRule}
              disabled={!selectedRule}
            >
              Insert
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}