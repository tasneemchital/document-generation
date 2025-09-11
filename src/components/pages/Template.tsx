import { useState, useRef, useEffect } from 'react'
import { useKV } from '@github/spark/hooks'
import { Card } from '@/components/ui/
import { Textarea } from '@/components/ui/texta
import { Card } from '@/components/ui/card'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { ScrollArea } from '@/components/ui/scroll-area'
  Pencil
  Bold, 
  'Chapter
  Underline, 

  AlignCenter,
  'Chapter 2'
  List,

  Plus,
      co
} from '@phosphor-icons/react'
import { DCMEditPage } from './DCMEditPage'

interface TemplateProps {
  onNavigate: (page: string) => void
  onEditRule?: (ruleId: string) => void
}

const sectionOptions = [
  'Medicare EOC Cover Page',
  'Chapter 1',
      currentP
      // Creat
    //
        ruleSt
      if (line
    
        if (li
      }, 0)
   
          retur
    

      new RegExp(`\\[RULE
 

        <div className="flex items-center gap-4">
          </Button>
        return;
    }
    // If no rule is selected, check if cursor is within a rule block
    let currentLine = 0;
    
    for (let i = 0; i < lines.length; i++) {
        currentLine = i;
      }
    }
    // Look backwards and forwards for rule boundarie

    
    for (let i = currentLine; i >= 0; i--) {
      if (match) {
        foundRuleId = match[1];
      }
      
    }
    // Look forwards for [/RULE-id] if we found a start
      
          ruleEndLine = i;
        }
      
      if (ruleEndLine !== -
      
          setShowEditRuleDial
         
     
    // If no rule found, show a message
      }, 0)
     
  }

                  title="Edit Ru
                  Edit Ru
    
    <div className="h-full flex flex-c
      <div className="flex items-center j
          <Button variant="ghost" onC
            Back to Global Template
    

                  <TableHead>Description</TableHead
            <Select 
                    className={
      const rule = rules.find(r => r.id === ruleId);
                <
        setEditingRule(rule);

        return;
       
    }
    
    // If no rule is selected, check if cursor is within a rule block
                
    let currentLine = 0;
            )}
    

    for (let i = 0; i < lines.length; i++) {

        currentLine = i;

      }
      {/* Editor Section */}
    }
    
                {selectedSection}
              <div classNam
                <Button v
                </Button>
    
                <Button variant="ou
    for (let i = currentLine; i >= 0; i--) {
                <Button variant="outline" size="sm" titl
      if (match) {
                  <AlignCe
        foundRuleId = match[1];
              
      }
                </Button>
                  <ListOrdered className=
       
    }
    
    // Look forwards for [/RULE-id] if we found a start
                  CML
                <Button
                  size="sm"
          ruleEndLine = i;
                
        }
       
      
              Select rule text and click "Edit Rule
          </div>
          <div className="flex-1 p-4">
              ref={
              value={editorCont
              className="min-h-[400px]
          </div>
        }

    }
    
    // If no rule found, show a message

  }

                  <TableHead>Sub-Business Area</TableHe
                  <TableHead>Version<



      


    setEditingRule(null);
   




            <Button variant="outline" onClick={() => setShowCMLDialog(false)}>



            Back to Global Template





          <div className="flex items-center gap-2">
                  handleUpdateRule(updatedRule);
                }}

                <SelectValue />

              <SelectContent>



            </Select>











              </SelectContent>

          </div>







              <SelectContent>



                  </SelectItem>







      {/* Editor Section */}





                {selectedSection}





                </Button>


                </Button>


                </Button>























                >

                  CML

                <Button

                  size="sm"













          </div>

          <div className="flex-1 p-4">







          </div>











              <TableHeader>









              </TableHeader>

                {rules.map((rule) => (

                    key={rule.id}





                  >









              </TableBody>

          </div>

            <Button variant="outline" onClick={() => setShowCMLDialog(false)}>

            </Button>

              onClick={handleInsertRule}

            >

            </Button>









              <DCMEditPage



                  handleUpdateRule(updatedRule);

                }}

              />

          </div>

      </Dialog>

  )
