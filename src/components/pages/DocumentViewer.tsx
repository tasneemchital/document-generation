import { useState, useEffect, useRef } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Separator } from '@/components/ui/separator'
import { 
  ChevronDown,
  ChevronRight,
  Save,
  Print,
  Settings,
  BookOpen,
  Lock,
  Unlock,
  ArrowLeft
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

interface DocumentViewerProps {
  documentId: string
  documentName: string
  onNavigate: (page: string) => void
}

export function DocumentViewer({ documentId, documentName, onNavigate }: DocumentViewerProps) {
  const [sections, setSections] = useState<DocumentSection[]>([])
  const [selectedSectionId, setSelectedSectionId] = useState<string>('')
  const contentRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Initialize document sections based on documentId
    const initializeSections = () => {
      const documentSections: DocumentSection[] = [
        {
          id: 'cover',
          title: '1. Cover Page',
          level: 1,
          content: `<div style="text-align: center; padding: 40px;">
            <h1 style="font-size: 2.5rem; margin-bottom: 20px; color: #1f2937;">Medicare Evidence of Coverage</h1>
            <h2 style="font-size: 1.8rem; margin-bottom: 30px; color: #374151;">H1234 - Simplify HMO MAPD</h2>
            <p style="font-size: 1.2rem; margin-bottom: 20px;">Effective Date: January 1, 2025</p>
            <p style="font-size: 1rem; color: #6b7280;">Version: 2025_14.0</p>
            <div style="margin-top: 50px;">
              <p style="font-size: 1.1rem; margin-bottom: 10px;">This document contains important information about your Medicare health and prescription drug coverage.</p>
              <p style="font-size: 1rem; color: #6b7280;">Please read and keep this document for your records.</p>
            </div>
          </div>`,
          isExpanded: false,
          hasContent: true
        },
        {
          id: 'chapter1',
          title: '2. Chapter 1: Getting Started as a Member',
          level: 1,
          content: `<h2>Chapter 1: Getting Started as a Member</h2>
          <br/>
          <h3>Section 1.1: Introduction</h3>
          <p>Welcome to your Medicare health plan. This chapter provides essential information about your membership and how to get started with your benefits.</p>
          <br/>
          <h3>Section 1.2: Your Member ID Card</h3>
          <p>Your member ID card is your key to accessing healthcare services. Always bring your ID card when seeking medical care.</p>
          <br/>
          <h3>Section 1.3: Getting Help</h3>
          <p>If you have questions about your coverage, contact Customer Service at 1-800-XXX-XXXX. Our representatives are available 8 AM to 8 PM, 7 days a week.</p>`,
          isExpanded: false,
          hasContent: true
        },
        {
          id: 'chapter2',
          title: '3. Chapter 2: Important Phone Numbers and Resources',
          level: 1,
          content: `<h2>Chapter 2: Important Phone Numbers and Resources</h2>
          <br/>
          <h3>Customer Service</h3>
          <p><strong>Phone:</strong> 1-800-XXX-XXXX</p>
          <p><strong>TTY:</strong> 711</p>
          <p><strong>Hours:</strong> 8 AM to 8 PM, 7 days a week</p>
          <br/>
          <h3>24-Hour Nurse Line</h3>
          <p><strong>Phone:</strong> 1-800-XXX-XXXX</p>
          <p>Available 24 hours a day, 7 days a week</p>
          <br/>
          <h3>Pharmacy Services</h3>
          <p><strong>Phone:</strong> 1-800-XXX-XXXX</p>
          <p><strong>Hours:</strong> 24 hours a day, 7 days a week</p>`,
          isExpanded: false,
          hasContent: true
        },
        {
          id: 'chapter3',
          title: '4. Chapter 3: Using the Plan\'s Coverage for Medical Services',
          level: 1,
          content: `<h2>Chapter 3: Using the Plan's Coverage for Medical Services</h2>
          <br/>
          <h3>Section 3.1: Overview</h3>
          <p>This chapter explains how to use your plan's coverage for medical services, including how to access care and what costs you may be responsible for.</p>
          <br/>
          <h3>Section 3.2: Primary Care Provider</h3>
          <p>As an HMO member, you must choose a Primary Care Provider (PCP) who will coordinate your care and provide referrals to specialists when needed.</p>
          <br/>
          <h3>Section 3.3: Referrals and Prior Authorization</h3>
          <p>Some services require referrals from your PCP or prior authorization from the plan. Check your member materials or contact Customer Service for details.</p>`,
          isExpanded: false,
          hasContent: true
        },
        {
          id: 'chapter4',
          title: '5. Chapter 4: Medical Benefits Chart',
          level: 1,
          content: `<h2>Chapter 4: Medical Benefits Chart</h2>
          <br/>
          <table style="width:100%; border-collapse: collapse; border: 1px solid #ddd; margin: 20px 0;">
            <thead>
              <tr style="background-color: #f5f5f5;">
                <th style="border: 1px solid #ddd; padding: 12px; text-align: left; font-weight: 600;">Service</th>
                <th style="border: 1px solid #ddd; padding: 12px; text-align: left; font-weight: 600;">Member Cost</th>
                <th style="border: 1px solid #ddd; padding: 12px; text-align: left; font-weight: 600;">Authorization Required</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td style="border: 1px solid #ddd; padding: 8px;">Primary Care Visit</td>
                <td style="border: 1px solid #ddd; padding: 8px;">$0 copay</td>
                <td style="border: 1px solid #ddd; padding: 8px;">No</td>
              </tr>
              <tr>
                <td style="border: 1px solid #ddd; padding: 8px;">Specialist Visit</td>
                <td style="border: 1px solid #ddd; padding: 8px;">$15 copay</td>
                <td style="border: 1px solid #ddd; padding: 8px;">Referral required</td>
              </tr>
              <tr>
                <td style="border: 1px solid #ddd; padding: 8px;">Emergency Room</td>
                <td style="border: 1px solid #ddd; padding: 8px;">$120 copay</td>
                <td style="border: 1px solid #ddd; padding: 8px;">No</td>
              </tr>
              <tr>
                <td style="border: 1px solid #ddd; padding: 8px;">Urgent Care</td>
                <td style="border: 1px solid #ddd; padding: 8px;">$65 copay</td>
                <td style="border: 1px solid #ddd; padding: 8px;">No</td>
              </tr>
            </tbody>
          </table>`,
          isExpanded: false,
          hasContent: true
        },
        {
          id: 'chapter5',
          title: '6. Chapter 5: Using the Plan\'s Coverage for Prescription Drugs',
          level: 1,
          content: `<h2>Chapter 5: Using the Plan's Coverage for Prescription Drugs</h2>
          <br/>
          <h3>Section 5.1: Introduction to Prescription Drug Coverage</h3>
          <p>This chapter explains how your Medicare prescription drug coverage works, including information about the plan's formulary and cost-sharing.</p>
          <br/>
          <h3>Section 5.2: Formulary</h3>
          <p>The formulary is a list of covered prescription drugs. The formulary includes both brand name and generic drugs organized into different tiers.</p>
          <br/>
          <h3>Section 5.3: Pharmacy Network</h3>
          <p>You can fill your prescriptions at any pharmacy in our network. Use our online pharmacy locator or call Customer Service to find network pharmacies near you.</p>`,
          isExpanded: false,
          hasContent: true
        },
        {
          id: 'chapter6',
          title: '7. Chapter 6: What You Pay for Prescription Drugs',
          level: 1,
          content: `<h2>Chapter 6: What You Pay for Prescription Drugs</h2>
          <br/>
          <h3>Coverage Stages</h3>
          <div style="margin: 20px 0;">
            <h4 style="color: #1f2937; margin-bottom: 10px;">Initial Coverage Stage</h4>
            <p style="margin-left: 20px;">You pay your copay or coinsurance until total drug costs reach $5,030</p>
            
            <h4 style="color: #1f2937; margin: 20px 0 10px 0;">Coverage Gap Stage</h4>
            <p style="margin-left: 20px;">You pay 25% of the cost for covered drugs</p>
            
            <h4 style="color: #1f2937; margin: 20px 0 10px 0;">Catastrophic Coverage Stage</h4>
            <p style="margin-left: 20px;">You pay the greater of 5% coinsurance or $4.15/$10.35 copay</p>
          </div>`,
          isExpanded: false,
          hasContent: true
        },
        {
          id: 'chapter7',
          title: '8. Chapter 7: Asking Us to Pay Our Share of the Bill',
          level: 1,
          content: `<h2>Chapter 7: Asking Us to Pay Our Share of the Bill</h2>
          <br/>
          <h3>When You May Need to Ask for Reimbursement</h3>
          <p>Generally, you will not need to pay for covered services and then ask us for reimbursement. However, there are some situations where you may need to pay first and then request reimbursement:</p>
          <br/>
          <ul style="margin-left: 20px; margin-bottom: 20px;">
            <li style="margin-bottom: 10px;">Emergency or urgent care when you're out of the plan's service area</li>
            <li style="margin-bottom: 10px;">When you receive services from an out-of-network provider in certain circumstances</li>
            <li style="margin-bottom: 10px;">When you pay for prescription drugs at a non-network pharmacy</li>
          </ul>
          <br/>
          <h3>How to Submit a Reimbursement Request</h3>
          <p>To request reimbursement, send us the completed claim form along with your receipts and any other required documentation.</p>`,
          isExpanded: false,
          hasContent: true
        }
      ]
      
      setSections(documentSections)
      if (documentSections.length > 0) {
        setSelectedSectionId(documentSections[0].id)
      }
    }

    initializeSections()
  }, [documentId])

  const toggleSection = (sectionId: string) => {
    setSections(prev => prev.map(section => 
      section.id === sectionId 
        ? { ...section, isExpanded: !section.isExpanded }
        : section
    ))
  }

  const handleSectionSelect = (sectionId: string) => {
    setSelectedSectionId(sectionId)
  }

  const getSelectedSection = () => {
    return sections.find(section => section.id === selectedSectionId)
  }

  const selectedSection = getSelectedSection()

  return (
    <div className="flex h-screen bg-background">
      {/* Left Panel - Document Hierarchy */}
      <div className="w-1/3 border-r border-border bg-card">
        <div className="p-6 border-b border-border">
          <div className="flex items-center gap-3 mb-4">
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => onNavigate('documents')}
              className="flex items-center gap-2"
            >
              <ArrowLeft size={16} />
              Back to Documents
            </Button>
          </div>
          <div>
            <h1 className="text-xl font-semibold text-foreground mb-2">{documentName}</h1>
            <div className="flex items-center gap-3 text-sm text-muted-foreground">
              <Badge variant="outline">H1234</Badge>
              <span>Effective: 1/1/2025</span>
              <span>Version: 2025_14.0</span>
            </div>
          </div>
        </div>
        
        <ScrollArea className="flex-1">
          <div className="p-4">
            <div className="space-y-2">
              {sections.map((section) => (
                <div key={section.id} className="space-y-1">
                  <Button
                    variant={selectedSectionId === section.id ? "secondary" : "ghost"}
                    className={`w-full justify-start text-left p-3 h-auto ${
                      selectedSectionId === section.id ? 'bg-secondary' : ''
                    }`}
                    onClick={() => handleSectionSelect(section.id)}
                  >
                    <div className="flex items-center gap-2 w-full">
                      {section.hasContent ? (
                        <div className="flex items-center gap-2">
                          <BookOpen size={16} className="text-muted-foreground flex-shrink-0" />
                          <span className="text-sm font-medium truncate">{section.title}</span>
                        </div>
                      ) : (
                        <div className="flex items-center gap-2">
                          <div className="w-4 h-4 rounded border border-border flex-shrink-0" />
                          <span className="text-sm text-muted-foreground truncate">{section.title}</span>
                        </div>
                      )}
                    </div>
                  </Button>
                </div>
              ))}
            </div>
          </div>
        </ScrollArea>
      </div>

      {/* Right Panel - Content */}
      <div className="flex-1 flex flex-col">
        {/* Toolbar */}
        <div className="border-b border-border bg-card p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <h2 className="text-lg font-semibold text-foreground">
                {selectedSection?.title || 'Select a section'}
              </h2>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm">
                <Print size={16} />
              </Button>
              <Button variant="outline" size="sm">
                <Settings size={16} />
              </Button>
              <Button size="sm">
                <Save size={16} className="mr-2" />
                Save
              </Button>
            </div>
          </div>
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-auto">
          {selectedSection ? (
            <div className="p-8">
              <div 
                ref={contentRef}
                className="prose max-w-none"
                dangerouslySetInnerHTML={{ __html: selectedSection.content }}
              />
            </div>
          ) : (
            <div className="flex items-center justify-center h-full">
              <div className="text-center text-muted-foreground">
                <BookOpen size={48} className="mx-auto mb-4 opacity-50" />
                <p className="text-lg">Select a section to view its content</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}