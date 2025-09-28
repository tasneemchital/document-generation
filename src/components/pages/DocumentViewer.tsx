import { useState, useEffect, useRef } from 'react'
import { useKV } from '@github/spark/hooks'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Separator } from '@/components/ui/separator'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { 
  CaretDown,
  ChevronRight,
  FloppyDisk,
  Printer,
  Gear,
  BookOpen,
  Lock,
  Unlock,
  ArrowLeft,
  Translate
} from '@phosphor-icons/react'

interface DocumentSection {
  id: string
  title: string
  level: number
  content: string
  contentSpanish: string
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
  const [selectedLanguage, setSelectedLanguage] = useKV('document-language', 'english')
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
          contentSpanish: `<div style="text-align: center; padding: 40px;">
            <h1 style="font-size: 2.5rem; margin-bottom: 20px; color: #1f2937;">Evidencia de Cobertura de Medicare</h1>
            <h2 style="font-size: 1.8rem; margin-bottom: 30px; color: #374151;">H1234 - Simplify HMO MAPD</h2>
            <p style="font-size: 1.2rem; margin-bottom: 20px;">Fecha Efectiva: 1 de enero de 2025</p>
            <p style="font-size: 1rem; color: #6b7280;">Versión: 2025_14.0</p>
            <div style="margin-top: 50px;">
              <p style="font-size: 1.1rem; margin-bottom: 10px;">Este documento contiene información importante sobre su cobertura de salud y medicamentos recetados de Medicare.</p>
              <p style="font-size: 1rem; color: #6b7280;">Por favor, lea y mantenga este documento para sus registros.</p>
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
          contentSpanish: `<h2>Capítulo 1: Comenzar como Miembro</h2>
          <br/>
          <h3>Sección 1.1: Introducción</h3>
          <p>Bienvenido a su plan de salud de Medicare. Este capítulo proporciona información esencial sobre su membresía y cómo comenzar con sus beneficios.</p>
          <br/>
          <h3>Sección 1.2: Su Tarjeta de Identificación de Miembro</h3>
          <p>Su tarjeta de identificación de miembro es su clave para acceder a los servicios de atención médica. Siempre traiga su tarjeta de identificación cuando busque atención médica.</p>
          <br/>
          <h3>Sección 1.3: Obtener Ayuda</h3>
          <p>Si tiene preguntas sobre su cobertura, comuníquese con Servicio al Cliente al 1-800-XXX-XXXX. Nuestros representantes están disponibles de 8 AM a 8 PM, los 7 días de la semana.</p>`,
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
          contentSpanish: `<h2>Capítulo 2: Números de Teléfono Importantes y Recursos</h2>
          <br/>
          <h3>Servicio al Cliente</h3>
          <p><strong>Teléfono:</strong> 1-800-XXX-XXXX</p>
          <p><strong>TTY:</strong> 711</p>
          <p><strong>Horas:</strong> 8 AM a 8 PM, 7 días a la semana</p>
          <br/>
          <h3>Línea de Enfermería las 24 Horas</h3>
          <p><strong>Teléfono:</strong> 1-800-XXX-XXXX</p>
          <p>Disponible las 24 horas del día, los 7 días de la semana</p>
          <br/>
          <h3>Servicios de Farmacia</h3>
          <p><strong>Teléfono:</strong> 1-800-XXX-XXXX</p>
          <p><strong>Horas:</strong> 24 horas del día, 7 días de la semana</p>`,
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
          contentSpanish: `<h2>Capítulo 3: Uso de la Cobertura del Plan para Servicios Médicos</h2>
          <br/>
          <h3>Sección 3.1: Descripción General</h3>
          <p>Este capítulo explica cómo usar la cobertura de su plan para servicios médicos, incluyendo cómo acceder a la atención y qué costos puede ser responsable de pagar.</p>
          <br/>
          <h3>Sección 3.2: Proveedor de Atención Primaria</h3>
          <p>Como miembro de HMO, debe elegir un Proveedor de Atención Primaria (PCP) que coordinará su atención y proporcionará referencias a especialistas cuando sea necesario.</p>
          <br/>
          <h3>Sección 3.3: Referencias y Autorización Previa</h3>
          <p>Algunos servicios requieren referencias de su PCP o autorización previa del plan. Verifique sus materiales de miembro o comuníquese con Servicio al Cliente para obtener detalles.</p>`,
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
          contentSpanish: `<h2>Capítulo 4: Tabla de Beneficios Médicos</h2>
          <br/>
          <table style="width:100%; border-collapse: collapse; border: 1px solid #ddd; margin: 20px 0;">
            <thead>
              <tr style="background-color: #f5f5f5;">
                <th style="border: 1px solid #ddd; padding: 12px; text-align: left; font-weight: 600;">Servicio</th>
                <th style="border: 1px solid #ddd; padding: 12px; text-align: left; font-weight: 600;">Costo del Miembro</th>
                <th style="border: 1px solid #ddd; padding: 12px; text-align: left; font-weight: 600;">Autorización Requerida</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td style="border: 1px solid #ddd; padding: 8px;">Visita de Atención Primaria</td>
                <td style="border: 1px solid #ddd; padding: 8px;">$0 copago</td>
                <td style="border: 1px solid #ddd; padding: 8px;">No</td>
              </tr>
              <tr>
                <td style="border: 1px solid #ddd; padding: 8px;">Visita al Especialista</td>
                <td style="border: 1px solid #ddd; padding: 8px;">$15 copago</td>
                <td style="border: 1px solid #ddd; padding: 8px;">Referencia requerida</td>
              </tr>
              <tr>
                <td style="border: 1px solid #ddd; padding: 8px;">Sala de Emergencias</td>
                <td style="border: 1px solid #ddd; padding: 8px;">$120 copago</td>
                <td style="border: 1px solid #ddd; padding: 8px;">No</td>
              </tr>
              <tr>
                <td style="border: 1px solid #ddd; padding: 8px;">Atención Urgente</td>
                <td style="border: 1px solid #ddd; padding: 8px;">$65 copago</td>
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
          contentSpanish: `<h2>Capítulo 5: Uso de la Cobertura del Plan para Medicamentos Recetados</h2>
          <br/>
          <h3>Sección 5.1: Introducción a la Cobertura de Medicamentos Recetados</h3>
          <p>Este capítulo explica cómo funciona su cobertura de medicamentos recetados de Medicare, incluyendo información sobre el formulario del plan y el reparto de costos.</p>
          <br/>
          <h3>Sección 5.2: Formulario</h3>
          <p>El formulario es una lista de medicamentos recetados cubiertos. El formulario incluye medicamentos de marca y genéricos organizados en diferentes niveles.</p>
          <br/>
          <h3>Sección 5.3: Red de Farmacias</h3>
          <p>Puede surtir sus recetas en cualquier farmacia de nuestra red. Use nuestro localizador de farmacias en línea o llame a Servicio al Cliente para encontrar farmacias de la red cerca de usted.</p>`,
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
          contentSpanish: `<h2>Capítulo 6: Lo que Paga por Medicamentos Recetados</h2>
          <br/>
          <h3>Etapas de Cobertura</h3>
          <div style="margin: 20px 0;">
            <h4 style="color: #1f2937; margin-bottom: 10px;">Etapa de Cobertura Inicial</h4>
            <p style="margin-left: 20px;">Usted paga su copago o coseguro hasta que los costos totales de medicamentos alcancen $5,030</p>
            
            <h4 style="color: #1f2937; margin: 20px 0 10px 0;">Etapa de Brecha de Cobertura</h4>
            <p style="margin-left: 20px;">Usted paga el 25% del costo por medicamentos cubiertos</p>
            
            <h4 style="color: #1f2937; margin: 20px 0 10px 0;">Etapa de Cobertura Catastrófica</h4>
            <p style="margin-left: 20px;">Usted paga el mayor de 5% de coseguro o $4.15/$10.35 copago</p>
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
          contentSpanish: `<h2>Capítulo 7: Pidiéndonos que Paguemos Nuestra Parte de la Factura</h2>
          <br/>
          <h3>Cuando Puede Necesitar Pedir Reembolso</h3>
          <p>Generalmente, no necesitará pagar por servicios cubiertos y luego pedirnos reembolso. Sin embargo, hay algunas situaciones donde puede necesitar pagar primero y luego solicitar reembolso:</p>
          <br/>
          <ul style="margin-left: 20px; margin-bottom: 20px;">
            <li style="margin-bottom: 10px;">Atención de emergencia o urgente cuando esté fuera del área de servicio del plan</li>
            <li style="margin-bottom: 10px;">Cuando reciba servicios de un proveedor fuera de la red en ciertas circunstancias</li>
            <li style="margin-bottom: 10px;">Cuando pague por medicamentos recetados en una farmacia que no esté en la red</li>
          </ul>
          <br/>
          <h3>Cómo Enviar una Solicitud de Reembolso</h3>
          <p>Para solicitar reembolso, envíenos el formulario de reclamo completado junto con sus recibos y cualquier otra documentación requerida.</p>`,
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
    const section = sections.find(section => section.id === selectedSectionId)
    if (!section) return null
    
    // Return section with appropriate content based on selected language
    return {
      ...section,
      content: selectedLanguage === 'spanish' ? section.contentSpanish : section.content
    }
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
            <div className="flex items-center gap-3">
              {/* Language Selector */}
              <div className="flex items-center gap-2">
                <Translate size={16} className="text-muted-foreground" />
                <Select value={selectedLanguage} onValueChange={setSelectedLanguage}>
                  <SelectTrigger className="w-32">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="english">English</SelectItem>
                    <SelectItem value="spanish">Español</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" title="Print document">
                  <Printer size={16} />
                </Button>
                <Button variant="outline" size="sm" title="Document settings">
                  <Gear size={16} />
                </Button>
                <Button size="sm" title="Save document">
                  <FloppyDisk size={16} className="mr-2" />
                  Save
                </Button>
              </div>
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