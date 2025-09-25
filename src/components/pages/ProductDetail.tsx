import { Button } from "@/components/ui/button"
import { ArrowLeft, Eye, Download } from "@phosphor-icons/react"
import { Separator } from "@/components/ui/separator"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

interface ProductDetailProps {
  productId?: string
  productName?: string
  onNavigate: (page: string) => void
}

export function ProductDetail({ productId, productName, onNavigate }: ProductDetailProps) {
  const productData = {
    id: productId,
    name: productName || 'Medicare EOC 2024',
    status: 'Active',
    lastUpdated: '2024-01-15',
    version: '1.2.3',
    fileSize: '2.4 MB',
    format: 'PDF',
    language: 'English',
    region: 'US',
    compliance: 'CMS Approved',
    teamLead: 'Sarah Johnson',
    reviewedBy: 'jane.smith',
    approvedBy: 'john.doe',
    approvers: ['Jane Executive', 'Bob Director']
  }

  return (
    <div className="flex-1 bg-background">
      {/* Header */}
      <div className="p-6 border-b border-border">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button 
              variant="ghost" 
              size="sm"
              onClick={() => onNavigate('portfolio')}
              className="flex items-center gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Portfolio
            </Button>
            <Separator orientation="vertical" className="h-6" />
            <div>
              <h1 className="text-2xl font-semibold text-foreground">{productData.name}</h1>
              <p className="text-muted-foreground">Product ID: {productData.id}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button size="sm" variant="outline" className="flex items-center gap-2">
              <Eye className="w-4 h-4" />
              Preview
            </Button>
            <Button size="sm" className="flex items-center gap-2">
              <Download className="w-4 h-4" />
              Download
            </Button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        <div className="grid grid-cols-3 gap-6 h-full">
          {/* Left Column - Accordions (1/3 width) */}
          <div className="col-span-1">
            <div className="bg-card border border-border rounded-lg p-4">
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="overview">
                  <AccordionTrigger>Overview</AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-2 text-sm">
                      <p>Product overview and general information</p>
                    </div>
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="details">
                  <AccordionTrigger>Details</AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-2 text-sm">
                      <p>Detailed product specifications</p>
                    </div>
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="configuration">
                  <AccordionTrigger>Configuration</AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-2 text-sm">
                      <p>Product configuration settings</p>
                    </div>
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="history">
                  <AccordionTrigger>History</AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-2 text-sm">
                      <p>Version history and changes</p>
                    </div>
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="permissions">
                  <AccordionTrigger>Permissions</AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-2 text-sm">
                      <p>Access controls and permissions</p>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
          </div>
          
          {/* Right Column - Blank (2/3 width) */}
          <div className="col-span-2">
            <div className="bg-card border border-border rounded-lg p-6 h-full min-h-96">
              {/* Blank content area */}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}