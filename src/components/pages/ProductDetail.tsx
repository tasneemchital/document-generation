import { Button } from "@/components/ui/button"
import { Separator } from '@/components/ui/separator'
import { ArrowLeft, Eye, Download } from "@phosphor-icons/react"
interface ProductDetailProps {
  productId?: string
  productName?: string
  onNavigate: (page: string) => void
}

export function ProductDetail({ productId, productName, onNavigate }: ProductDetailProps) {
  // Mock product data - in a real app this would come from an API
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
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Status Overview */}
          <div className="bg-card p-6 rounded-lg border border-border">
            <h3 className="text-lg font-medium text-card-foreground mb-4">Status Overview</h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Status:</span>
                <span className="px-2 py-1 bg-green-100 text-green-800 rounded-md text-sm">
                  {productData.status}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Version:</span>
                <span className="text-card-foreground font-medium">{productData.version}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Last Updated:</span>
                <span className="text-card-foreground">{productData.lastUpdated}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Compliance:</span>
                <span className="text-card-foreground">{productData.compliance}</span>
              </div>
            </div>
          </div>

          {/* File Details */}
          <div className="bg-card p-6 rounded-lg border border-border">
            <h3 className="text-lg font-medium text-card-foreground mb-4">File Details</h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Format:</span>
                <span className="text-card-foreground font-medium">{productData.format}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Size:</span>
                <span className="text-card-foreground">{productData.fileSize}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Language:</span>
                <span className="text-card-foreground">{productData.language}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Region:</span>
                <span className="text-card-foreground">{productData.region}</span>
              </div>
            </div>
          </div>


        </div>

        {/* Recent Activity */}
        <div className="mt-8">
          <div className="bg-card p-6 rounded-lg border border-border">
            <h3 className="text-lg font-medium text-card-foreground mb-4">Recent Activity</h3>
            <div className="space-y-4">
              <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-md">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <div className="flex-1">
                  <p className="text-sm text-card-foreground">Document updated to version {productData.version}</p>
                  <p className="text-xs text-muted-foreground">2 hours ago by {productData.teamLead}</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-md">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <div className="flex-1">
                  <p className="text-sm text-card-foreground">Document approved by compliance team</p>
                  <p className="text-xs text-muted-foreground">1 day ago by {productData.approvedBy}</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-md">
                <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                <div className="flex-1">
                  <p className="text-sm text-card-foreground">Document review completed</p>
                  <p className="text-xs text-muted-foreground">3 days ago by {productData.reviewedBy}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}