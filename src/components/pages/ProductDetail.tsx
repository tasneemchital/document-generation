import { Button } from "@/components/ui/button"
import { Separator } from '@/components/ui/separator'
import { ArrowLeft, Download, Eye } from '@phosphor-icons/react'

interface ProductDetailProps {
  productId?: string
  productName?: string
  onNavigate: (page: string) => void
}

export function ProductDetail({ productId, productName, onNavigate }: ProductDetailProps) {
  // Mock data - in real app this would be fetched based on productId
  const productData = {
    id: productId || 'H9042008000',
    productName: productName || 'Medicare Advantage PDP',
    folderName: 'Medicare Advantage PDP',
    description: 'Medicare Advantage Prescription Drug Plan documentation and materials',
    lastModified: '2024-12-19',
    status: 'Active',
    version: '2.1',
    createdBy: 'john.doe',
    reviewedBy: 'jane.smith',
    teamLead: 'Sarah Johnson',
    approvers: ['Jane Executive', 'Bob Director']
  }

  return (
    <div className="flex flex-col h-full bg-background">
      {/* Header */}
      <div className="p-6 border-b border-border">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button 
              variant="ghost" 
              onClick={() => onNavigate('portfolio')}
              className="flex items-center gap-2"
            >
              <ArrowLeft size={16} />
              Back to Portfolio
            </Button>
            <Separator orientation="vertical" className="h-6" />
            <div>
              <h1 className="text-2xl font-semibold text-foreground">
                {productData.productName}
              </h1>
              <p className="text-muted-foreground text-sm">
                {productData.folderName}
              </p>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" className="flex items-center gap-2">
              <Eye size={16} />
              Preview
            </Button>
            <Button size="sm" className="flex items-center gap-2">
              <Download size={16} />
              Download
            </Button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-auto p-6">
        {/* Content area now empty - cards removed as requested */}
      </div>
    </div>
  )
}