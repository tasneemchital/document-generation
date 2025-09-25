import { useState, useEffect, useRef } from 'react'
import { Card, CardContent, CardHeader, Car
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Separator } from '@/components/ui/separator'
import { 
  ChevronDown
  Save,
  Print,
  Settings,
  BookO
  Unlock

  id: strin
  Settings,
  Search,
  BookOpen,
  Lock,
  Unlock
} from '@phosphor-icons/react'

interface DocumentSection {
  id: string
  title: string
  level: number
  content: string
  isExpanded: boolean
  hasContent: boolean
  children?: DocumentSection[]
}

    return [
        id: 'cover',
        level: 1,
        isExpanded: false,
 

        level: 1,
        isExpanded: false,
      },

        level: 1,
        isEx
      }
        id: 'chapter
        level: 1,
        isExpande
      },
        id: 'chapter4',
        level: 1,
      },
       
        id: 'chapter1',
        title: 'Chapter 1: Getting Started as a Member',
        level: 1,
        content: `<h2>Chapter 1: Getting Started as a Member</h2>\n<br/>\n<h3>Section 1.1: Introduction</h3>\n<p>Welcome to your Medicare health plan. This chapter provides essential information about your membership and how to get started with your benefits.</p>\n<br/>\n<h3>Section 1.2: Your Member ID Card</h3>\n<p>Your member ID card is your key to accessing healthcare services. Always bring your ID card when seeking medical care.</p>`,
        isExpanded: false,
        hasContent: true
      },
      {
        id: 'chapter2',
        title: 'Chapter 2: Important Phone Numbers and Resources',
        level: 1,
        content: `<h2>Chapter 2: Important Phone Numbers and Resources</h2>\n<br/>\n<h3>Customer Service</h3>\n<p>Phone: 1-800-XXX-XXXX</p>\n<p>TTY: 711</p>\n<p>Hours: 8 AM to 8 PM, 7 days a week</p>\n<br/>\n<h3>24-Hour Nurse Line</h3>\n<p>Phone: 1-800-XXX-XXXX</p>\n<p>Available 24 hours a day, 7 days a week</p>`,
        isExpanded: false,
        hasContent: true
      },
      {
        id: 'chapter3',
        title: 'Chapter 3: Using the Plan\'s Coverage for Medical Services',
        level: 1,
        content: `<h2>Chapter 3: Using the Plan's Coverage for Medical Services</h2>\n<br/>\n<h3>Section 3.1: Overview</h3>\n<p>This chapter explains how to use your plan's coverage for medical services, including how to access care and what costs you may be responsible for.</p>\n<br/>\n<h3>Section 3.2: Primary Care Provider</h3>\n<p>As an HMO member, you must choose a Primary Care Provider (PCP) who will coordinate your care and provide referrals to specialists when needed.</p>`,
        isExpanded: false,
        hasContent: true
      },
      {
        id: 'chapter4',
        title: 'Chapter 4: Medical Benefits Chart',
        level: 1,
        content: `<h2>Chapter 4: Medical Benefits Chart</h2>\n<br/>\n<table style="width:100%; border-collapse: collapse; border: 1px solid #ddd;">\n<thead>\n<tr style="background-color: #f5f5f5;">\n<th style="border: 1px solid #ddd; padding: 8px; text-align: left;">Service</th>\n<th style="border: 1px solid #ddd; padding: 8px; text-align: left;">Member Cost</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td style="border: 1px solid #ddd; padding: 8px;">Primary Care Visit</td>\n<td style="border: 1px solid #ddd; padding: 8px;">$0 copay</td>\n</tr>\n<tr>\n<td style="border: 1px solid #ddd; padding: 8px;">Specialist Visit</td>\n<td style="border: 1px solid #ddd; padding: 8px;">$15 copay</td>\n</tr>\n</tbody>\n</table>`,
        isExpanded: false,
        hasContent: true
      },
      {
        id: 'chapter5',
        title: 'Chapter 5: Using the Plan\'s Coverage for Prescription Drugs',
        level: 1,
        content: `<h2>Chapter 5: Using the Plan's Coverage for Prescription Drugs</h2>\n<br/>\n<h3>Section 5.1: Introduction to Prescription Drug Coverage</h3>\n<p>This chapter explains how your Medicare prescription drug coverage works, including information about the plan's formulary and cost-sharing.</p>\n<br/>\n<h3>Section 5.2: Formulary</h3>\n<p>The formulary is a list of covered prescription drugs. The formulary includes both brand name and generic drugs.</p>`,
        isExpanded: false,
        hasContent: true
      },
      {
        id: 'chapter6',
        title: 'Chapter 6: What You Pay for Prescription Drugs',
        level: 1,
        content: `<h2>Chapter 6: What You Pay for Prescription Drugs</h2>\n<br/>\n<h3>Coverage Stages</h3>\n<ul>\n<li><strong>Initial Coverage Stage:</strong> You pay your copay or coinsurance until total drug costs reach $5,030</li>\n<li><strong>Coverage Gap Stage:</strong> You pay 25% of the cost for covered drugs</li>\n<li><strong>Catastrophic Coverage Stage:</strong> You pay the greater of 5% coinsurance or $4.15/$10.35 copay</li>\n</ul>`,
        isExpanded: false,
        hasContent: true
      },
      {
        id: 'chapter7',
        title: 'Chapter 7: Asking Us to Pay Our Share of the Cost',
        level: 1,
        content: `<h2>Chapter 7: Asking Us to Pay Our Share of the Cost</h2>\n<br/>\n<p>This chapter explains when and how you can ask us to pay you back or pay a provider directly when you have received a bill for covered services.</p>`,
        isExpanded: false,
        hasContent: true
      },
      {
        id: 'chapter8',
        title: 'Chapter 8: Your Rights and Responsibilities',
        level: 1,
        content: `<h2>Chapter 8: Your Rights and Responsibilities</h2>\n<br/>\n<h3>Your Rights</h3>\n<ul>\n<li>Right to receive information about the plan</li>\n<li>Right to choose a Primary Care Provider</li>\n<li>Right to get covered services</li>\n<li>Right to participate in treatment decisions</li>\n</ul>\n<br/>\n<h3>Your Responsibilities</h3>\n<ul>\n<li>Get familiar with covered services and rules</li>\n<li>Follow plan policies and procedures</li>\n<li>Pay plan premiums and cost-sharing</li>\n</ul>`,
        isExpanded: false,
        hasContent: true
      },
      {
        id: 'chapter9',
        title: 'Chapter 9: What to Do If You Have a Problem or Complaint',
        level: 1,
        content: `<h2>Chapter 9: What to Do If You Have a Problem or Complaint</h2>\n<br/>\n<h3>Filing a Grievance</h3>\n<p>If you have a problem or concern about your plan or the care you receive, you can file a grievance. You can file a grievance at any time.</p>\n<br/>\n<h3>Filing an Appeal</h3>\n<p>If we deny coverage for a service or prescription drug, you have the right to ask us to reconsider our decision by filing an appeal.</p>`,
        isExpanded: false,
        hasContent: true
      },
      {
        id: 'chapter10',
        title: 'Chapter 10: Ending Your Membership in the Plan',
        level: 1,
        content: `<h2>Chapter 10: Ending Your Membership in the Plan</h2>\n<br/>\n<h3>When Can You End Your Membership?</h3>\n<p>You can end your membership in our plan during certain times of the year, or in certain special situations.</p>\n<br/>\n<h3>How Do You End Your Membership?</h3>\n<p>To end your membership, you can either enroll in a new Medicare plan or call Medicare directly.</p>`,
        isExpanded: false,
        hasContent: true
      },
      {
        id: 'chapter11',
        title: 'Chapter 11: Legal Notices',
        level: 1,
        content: `<h2>Chapter 11: Legal Notices</h2>\n<br/>\n<h3>Notice About Medicare Secondary Payer Subrogation Rights</h3>\n<p>We have the right and responsibility to collect for covered Medicare services when another party is responsible for payment.</p>\n<br/>\n<h3>Notice of Non-Discrimination</h3>\n<p>We don't discriminate based on race, ethnicity, national origin, religion, gender, age, mental or physical disability, health status, receipt of health care, claims experience, medical history, genetic information, evidence of insurability, or geographic location.</p>`,
        isExpanded: false,
        hasContent: true
      },
      {
        id: 'chapter12',
        title: 'Chapter 12: Definitions of Important Words',
        level: 1,
        content: `<h2>Chapter 12: Definitions of Important Words</h2>\n<br/>\n<dl>\n<dt><strong>Appeal:</strong></dt>\n<dd>Something you do if you disagree with our decision to deny a request for coverage of health care services or prescription drugs or payment for services or drugs you already received.</dd>\n<br/>\n<dt><strong>Copayment (or "copay"):</strong></dt>\n<dd>An amount you may be required to pay as your share of the cost for a medical service or supply, like a doctor's visit, hospital outpatient visit, or a prescription drug.</dd>\n<br/>\n<dt><strong>Formulary:</strong></dt>\n<dd>A list of prescription drugs covered by the plan.</dd>\n</dl>`,
        isExpanded: false,
        hasContent: true
      },
      {
        id: 'back-cover',
        title: 'Back Cover',
        level: 1,
        content: `<div style="text-align: center; padding: 40px;">\n<h2>Important Contact Information</h2>\n<br/>\n<p><strong>Customer Service:</strong></p>\n<p>1-800-XXX-XXXX</p>\n<p>TTY: 711</p>\n<br/>\n<p><strong>Website:</strong></p>\n<p>www.yourplanwebsite.com</p>\n<br/>\n<p style="font-size: 12px; color: #666; margin-top: 40px;">H1234_DOC_2025 CMS Accepted 09/2024</p>\n</div>`,
        isExpanded: false,
        hasContent: true
      }
    ]
  } else if (documentType === 'ANOC') {
    return [
      {
        id: 'cover',
        title: 'Cover Page',
        level: 1,
        content: `<h1>${documentName}</h1>\n<p>Annual Notice of Changes for Plan Year 2025</p>\n<p>Effective Date: January 1, 2025</p>\n<br/>\n<p>This document tells you about changes to your Medicare health plan for 2025.</p>`,
        isExpanded: false,
        hasContent: true
      },
      {
        id: 'section1',
        title: 'Section 1: Changes to Benefits and Costs',
        level: 1,
        content: `<h2>Section 1: Changes to Benefits and Costs for Medical Services</h2>\n<br/>\n<h3>Changes to Monthly Premium</h3>\n<p>Your monthly plan premium will be $25.00 in 2025. This is a decrease of $5.00 from 2024.</p>\n<br/>\n<h3>Changes to Your Maximum Out-of-Pocket Amount</h3>\n<p>Your maximum out-of-pocket amount for 2025 will be $3,450.</p>`,
        isExpanded: false,
        hasContent: true
      },
      {
        id: 'section2',
        title: 'Section 2: Changes to Prescription Drug Coverage',
        level: 1,
        content: `<h2>Section 2: Changes to Prescription Drug Coverage</h2>\n<br/>\n<h3>Changes to Our Drug List</h3>\n<p>We made changes to our drug list, including removing and adding drugs. Review the enclosed formulary to see current covered drugs.</p>`,
        isExpanded: false,
        hasContent: true
      },
      {
      level: 1,
      isExpanded: false,
    }
}
export function DocumentVi
  const [isEditing, setI
  const
  // 
   

    effectiveDate: '1/1/2025',
    lastMo

      id: 'section1',
      title: 'Introduction',
      level: 1,
      content: `<h2>Introduction</h2>\n<br/>\n<p>Welcome to ${documentName}. This document contains important information about your benefits and coverage.</p>`,
      isExpanded: false,
      hasContent: true
    },
    {
      id: 'section2', 
      title: 'Benefits Overview',
      level: 1,
      content: `<h2>Benefits Overview</h2>\n<br/>\n<p>This section provides an overview of your benefits and what is covered under this plan.</p>`,
      isExpanded: false,
      hasContent: true
    },
    {
      id: 'section3',
      title: 'Contact Information',
      level: 1,
      content: `<h2>Contact Information</h2>\n<br/>\n<p>For questions about your benefits, please contact customer service at 1-800-XXX-XXXX.</p>`,
      isExpanded: false,
      hasContent: true
    }
  ]
}

export function DocumentViewer({ documentId, documentName, onNavigate }: DocumentViewerProps) {
  const [selectedSection, setSelectedSection] = useState<string>('cover')
  const [isEditing, setIsEditing] = useState(false)
  const [documentContent, setDocumentContent] = useKV<{ [key: string]: string }>(`document-content-${documentId}`, {})
  const editorRef = useRef<HTMLTextAreaElement>(null)

  // Mock document data - in real app would fetch based on documentId
  const documentData = {
    id: documentId,
    name: documentName,
    type: documentName.includes('EOC') ? 'EOC' : documentName.includes('ANOC') ? 'ANOC' : 'Other',
    version: '2025_2.0',
    effectiveDate: '1/1/2025',
    status: 'Active',
    lastModified: '12/15/2024'
  }

  const documentStructure = generateDocumentStructure(documentData.type, documentData.name)

  // Initialize content if not exists
  useEffect(() => {
    if (Object.keys(documentContent).length === 0) {
      const initialContent: { [key: string]: string } = {}
      documentStructure.forEach(section => {
        initialContent[section.id] = section.content
      })
      setDocumentContent(initialContent)
    }
  }, [documentStructure, documentContent, setDocumentContent])

  const currentSection = documentStructure.find(section => section.id === selectedSection)
  const currentContent = documentContent[selectedSection] || currentSection?.content || ''

  const handleSave = () => {
    if (editorRef.current && selectedSection) {
      const newContent = { ...documentContent }
      newContent[selectedSection] = editorRef.current.value
      setDocumentContent(newContent)
      setIsEditing(false)
    }
  }

  const handleSectionSelect = (sectionId: string) => {
    // Save current content before switching
    if (isEditing && editorRef.current && selectedSection) {
      const newContent = { ...documentContent }
      newContent[selectedSection] = editorRef.current.value
      setDocumentContent(newContent)
    }
    setSelectedSection(sectionId)
    setIsEditing(false)
  }

  return (
    <div className="flex h-screen bg-background">
      {/* Left Sidebar - Document Hierarchy */}
      <div className="w-80 border-r border-border bg-card">
        <div className="p-4 border-b border-border">
          <div className="flex items-center justify-between mb-4">
            <Button 
              variant="ghost" 
              size="sm"
              onClick={() => onNavigate('documents')}
              className="p-0 h-auto"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Documents
            </Button>
          </div>
          
          <div className="space-y-2">
            <h2 className="text-lg font-semibold line-clamp-2">{documentData.name}</h2>
            <div className="flex items-center gap-2">
              <Badge variant="secondary">{documentData.version}</Badge>
              <Badge variant="outline">{documentData.effectiveDate}</Badge>
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <FileText className="w-4 h-4" />
              <span>{documentData.type} Document</span>
            </div>
          </div>
        </div>

        {/* Document Structure Navigation */}
        <ScrollArea className="flex-1">
          <div className="p-4">
            <h3 className="text-sm font-medium text-muted-foreground mb-3 flex items-center gap-2">
              <BookOpen className="w-4 h-4" />
              Document Structure
            </h3>
            <div className="space-y-1">
              {documentStructure.map((section) => (
                <Button
                  key={section.id}
                  variant={selectedSection === section.id ? "secondary" : "ghost"}
                  size="sm"
                  className="w-full justify-start h-auto py-3 px-3"
                  onClick={() => handleSectionSelect(section.id)}
                >
                  <div className="flex items-start gap-2 text-left w-full">
                    <div className="flex-shrink-0 mt-0.5">
                      {section.hasContent ? (
                        <FileText className="w-3 h-3" />
                      ) : (
                        <ChevronRight className="w-3 h-3" />
                      )}
                    </div>
                    <span className="text-sm line-clamp-2 leading-5">
                      {section.title}
                    </span>
                  </div>
                </Button>
              ))}
            </div>
          </div>
        </ScrollArea>

        {/* Sidebar Footer */}
        <div className="p-4 border-t border-border bg-muted/30">
          <div className="text-xs text-muted-foreground space-y-1">
            <div>Last modified: {documentData.lastModified}</div>
            <div className="flex items-center gap-1">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span>Status: {documentData.status}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Right Content Area */}
      <div className="flex-1 flex flex-col">
        {/* Content Header */}
        <div className="p-4 border-b border-border bg-card">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <h1 className="text-xl font-semibold">{currentSection?.title}</h1>
              <div className="flex items-center gap-1">
                {isEditing ? (
                  <Unlock className="w-4 h-4 text-amber-500" />
                ) : (
                  <Lock className="w-4 h-4 text-muted-foreground" />
                )}
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm">
                <Search className="w-4 h-4 mr-2" />
                Find
              </Button>
              <Separator orientation="vertical" className="h-6" />
              {isEditing ? (
                <>
                  <Button onClick={handleSave} size="sm">
                    <Save className="w-4 h-4 mr-2" />
                    Save
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => setIsEditing(false)}
                  >
                    Cancel
                  </Button>
                </>
              ) : (
                <Button 
                  onClick={() => setIsEditing(true)}
                  size="sm"
                >
                  Edit Section
                </Button>
              )}
              <Separator orientation="vertical" className="h-6" />
              <Button variant="outline" size="sm">
                <Print className="w-4 h-4" />
              </Button>
              <Button variant="outline" size="sm">
                <Download className="w-4 h-4" />
              </Button>
              <Button variant="outline" size="sm">
                <Maximize className="w-4 h-4" />
              </Button>
              <Button variant="outline" size="sm">
                <Settings className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Content Editor/Viewer */}
        <div className="flex-1 p-6">
          <Card className="h-full">
            <CardHeader className="pb-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <CardTitle className="text-lg">Content</CardTitle>
                  {isEditing && (
                    <Badge variant="outline" className="text-xs">
                      Editing Mode
                    </Badge>
                  )}
                </div>
                <div className="text-sm text-muted-foreground">
                  Document ID: {documentData.id}
                </div>
              </div>
            </CardHeader>
            <CardContent className="h-[calc(100%-8rem)]">
              <ScrollArea className="h-full">
                {isEditing ? (
                  <textarea
                    ref={editorRef}
                    defaultValue={currentContent}
                    className="w-full h-full min-h-[600px] p-4 border border-input rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-ring"
                    placeholder="Enter document content..."
                  />
                ) : (
                  <div className="prose prose-sm max-w-none">
                    <div 
                      dangerouslySetInnerHTML={{ 
                        __html: currentContent.replace(/\n/g, '<br/>') 
                      }} 
                    />
                  </div>
                )}
              </ScrollArea>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}  const documentStructure = generateDocumentStructure(documentData.type, documentData.name)

  // Initialize content if not exists
  useEffect(() => {
    if (Object.keys(documentContent).length === 0) {
      const initialContent: { [key: string]: string } = {}
      documentStructure.forEach(section => {
        initialContent[section.id] = section.content
      })
      setDocumentContent(initialContent)
    }
  }, [documentStructure, documentContent, setDocumentContent])

  const currentSection = documentStructure.find(section => section.id === selectedSection)
  const currentContent = documentContent[selectedSection] || currentSection?.content || ''

  const handleSave = () => {
    if (editorRef.current && selectedSection) {
      const newContent = { ...documentContent }
      newContent[selectedSection] = editorRef.current.value
      setDocumentContent(newContent)
      setIsEditing(false)
    }
  }

  const handleSectionSelect = (sectionId: string) => {
    // Save current content before switching
    if (isEditing && editorRef.current && selectedSection) {
      const newContent = { ...documentContent }
      newContent[selectedSection] = editorRef.current.value
      setDocumentContent(newContent)
    }
    setSelectedSection(sectionId)
    setIsEditing(false)
  }

  return (
    <div className="flex h-screen bg-background">
      {/* Left Sidebar - Document Hierarchy */}
      <div className="w-80 border-r border-border bg-card">
        <div className="p-4 border-b border-border">
          <div className="flex items-center justify-between mb-4">
            <Button 
              variant="ghost" 
              size="sm"
              onClick={() => onNavigate('documents')}
              className="p-0 h-auto"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Documents
            </Button>
          </div>
          
          <div className="space-y-2">
            <h2 className="text-lg font-semibold line-clamp-2">{documentData.name}</h2>
            <div className="flex items-center gap-2">
              <Badge variant="secondary">{documentData.version}</Badge>
              <Badge variant="outline">{documentData.effectiveDate}</Badge>
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <FileText className="w-4 h-4" />
              <span>{documentData.type} Document</span>
            </div>
          </div>
        </div>

        {/* Document Structure Navigation */}
        <ScrollArea className="flex-1">
          <div className="p-4">
            <h3 className="text-sm font-medium text-muted-foreground mb-3 flex items-center gap-2">
              <BookOpen className="w-4 h-4" />
              Document Structure
            </h3>
            <div className="space-y-1">
              {documentStructure.map((section) => (
                <Button
                  key={section.id}
                  variant={selectedSection === section.id ? "secondary" : "ghost"}
                  size="sm"
                  className="w-full justify-start h-auto py-3 px-3"
                  onClick={() => handleSectionSelect(section.id)}
                >
                  <div className="flex items-start gap-2 text-left w-full">
                    <div className="flex-shrink-0 mt-0.5">
                      {section.hasContent ? (
                        <FileText className="w-3 h-3" />
                      ) : (
                        <ChevronRight className="w-3 h-3" />
                      )}
                    </div>
                    <span className="text-sm line-clamp-2 leading-5">
                      {section.title}
                    </span>
                  </div>
                </Button>
              ))}
            </div>
          </div>
        </ScrollArea>

        {/* Sidebar Footer */}
        <div className="p-4 border-t border-border bg-muted/30">
          <div className="text-xs text-muted-foreground space-y-1">
            <div>Last modified: {documentData.lastModified}</div>
            <div className="flex items-center gap-1">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span>Status: {documentData.status}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Right Content Area */}
      <div className="flex-1 flex flex-col">
        {/* Content Header */}
        <div className="p-4 border-b border-border bg-card">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <h1 className="text-xl font-semibold">{currentSection?.title}</h1>
              <div className="flex items-center gap-1">
                {isEditing ? (
                  <Unlock className="w-4 h-4 text-amber-500" />
                ) : (
                  <Lock className="w-4 h-4 text-muted-foreground" />
                )}
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm">
                <Search className="w-4 h-4 mr-2" />
                Find
              </Button>
              <Separator orientation="vertical" className="h-6" />
              {isEditing ? (
                <>
                  <Button onClick={handleSave} size="sm">
                    <Save className="w-4 h-4 mr-2" />
                    Save
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => setIsEditing(false)}
                  >
                    Cancel
                  </Button>
                </>
              ) : (
                <Button 
                  onClick={() => setIsEditing(true)}
                  size="sm"
                >
                  Edit Section
                </Button>
              )}
              <Separator orientation="vertical" className="h-6" />
              <Button variant="outline" size="sm">
                <Print className="w-4 h-4" />
              </Button>
              <Button variant="outline" size="sm">
                <Download className="w-4 h-4" />
              </Button>
              <Button variant="outline" size="sm">
                <Maximize className="w-4 h-4" />
              </Button>
              <Button variant="outline" size="sm">
                <Settings className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Content Editor/Viewer */}
        <div className="flex-1 p-6">
          <Card className="h-full">
            <CardHeader className="pb-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <CardTitle className="text-lg">Content</CardTitle>
                  {isEditing && (
                    <Badge variant="outline" className="text-xs">
                      Editing Mode
                    </Badge>
                  )}
                </div>
                <div className="text-sm text-muted-foreground">
                  Document ID: {documentData.id}
                </div>
              </div>
            </CardHeader>
            <CardContent className="h-[calc(100%-8rem)]">
              <ScrollArea className="h-full">
                {isEditing ? (
                  <textarea
                    ref={editorRef}
                    defaultValue={currentContent}
                    className="w-full h-full min-h-[600px] p-4 border border-input rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-ring"
                    placeholder="Enter document content..."
                  />
                ) : (
                  <div className="prose prose-sm max-w-none">
                    <div 
                      dangerouslySetInnerHTML={{ 
                        __html: currentContent.replace(/\n/g, '<br/>') 
                      }} 
                    />
                  </div>
                )}
              </ScrollArea>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}