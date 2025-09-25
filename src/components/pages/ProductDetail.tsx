import { ArrowLeft, Download, Eye, Calendar, User, FileText, Settings } from '@phosphor-icons/react'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
interface ProductDetailProps {
import { Separator } from '@/components/ui/separator'

interface ProductDetailProps {
  productId?: string
        id: 'H9042008000',
}

export function ProductDetail({ productId, onNavigate }: ProductDetailProps) {
  // Mock data - in real app this would be fetched based on productId
  const productData = {
        userName
    batchId: '47720',
        language: 'Engl
        lastModified: '
        reviewedBy: 'shivani.vidhate
      },
        id: 'H6529004000',
        source: 'Portfolio Management',
        collateralName: 'Medic
        productName: 'H
        versionNumber: '2026_0.12',
        queuedDate: '09/20/2025 09:45 AM'
        userName: 'kiran.raskar
        fileSize: '18.7 MB',
        language: 'Engl
        lastModifi
        reviewedBy: 'kir
      },
    lastModified: '07/02/2025 01:45 PM',
    createdBy: 'System Generator',
    reviewedBy: 'fatima.gavandi',
    approvedBy: 'john.smith'
  }

  return (
    <div className="flex flex-col h-full bg-background">
      {/* Header */}
      <div className="flex items-center gap-4 p-6 border-b border-border bg-card">
        <Button 
          variant="ghost" 
          size="sm"
          onClick={() => onNavigate('portfolio')}
          className="flex items-center gap-2"
        >
          <ArrowLeft size={16} />
          Back to Portfolio
        </Button>
        <div className="flex-1">
          <h1 className="text-2xl font-semibold text-foreground">
            {productData.productName}
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            {productData.folderName}
          </p>
      productN
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" className="flex items-center gap-2">
            <Eye size={16} />
            Preview
          </Button>
          <Button variant="outline" size="sm" className="flex items-center gap-2">
            <Download size={16} />
          <h1 classN
          </Button>
          <Button variant="outline" size="sm" className="flex items-center gap-2">
            <Settings size={16} />
          <Button va
          </Button>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-auto p-6">
        <div className="max-w-6xl mx-auto space-y-6">
      <div className="flex-1 overflow-a
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
                <CardTitle className="text-
                <CardTitle className="text-sm font-medium text-muted-foreground">Status</CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <Badge variant="secondary" className="bg-green-100 text-green-800 border-green-200">
                  {productData.status}
                </Badge>
              </CardContent>


            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium text-muted-foreground">Version</CardTitle>
              </CardHeader>
                <CardTitle className="text-s
                <span className="text-lg font-semibold">{productData.versionNumber}</span>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium text-muted-foreground">Batch ID</CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <span className="text-lg font-semibold">{productData.batchId}</span>
              </CardContent>
            </Card>
          </div>

                  </div>
          <Card>
                  </div>
              <CardTitle className="flex items-center gap-2">
                <FileText size={20} />
                Product Information
              </CardTitle>
            </CardHeader>
                    <label className="text-sm f
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <label className="text-
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Product Name</label>
                    <p className="text-foreground font-medium">{productData.productName}</p>
                <p class
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Collateral Name</label>
                    <p className="text-foreground">{productData.collateralName}</p>
              <CardTitle
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">ML Type</label>
                    <p className="text-foreground">{productData.mlType}</p>
                  <div c
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Font Type</label>
                    <p className="text-foreground">{productData.fontType}</p>
                  </div>
                </div>
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">File Size</label>
                    <p className="text-foreground">{productData.fileSize}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Page Count</label>
                    <p className="text-foreground">{productData.pageCount} pages</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Language</label>
                    <p className="text-foreground">{productData.language}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Compliance</label>
                    <p className="text-foreground">{productData.compliance}</p>
                  </div>
                </div>
          </Card>
              <Separator />
            <CardHe
                <label className="text-sm font-medium text-muted-foreground">Description</label>
                <p className="text-foreground mt-1">{productData.description}</p>
              </div>
                <div>
          </Card>

          {/* Processing Timeline */}
                
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar size={20} />
      </div>
              </CardTitle>

            <CardContent>
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
                  <div className="flex-1">
                    <div className="flex justify-between items-center">
                      <span className="font-medium">Queued for Processing</span>
                      <span className="text-sm text-muted-foreground">{productData.queuedDate}</span>
                    </div>
                    <p className="text-sm text-muted-foreground">Document queued in processing pipeline</p>
                  </div>

                <div className="flex items-start gap-4">

                  <div className="flex-1">
                    <div className="flex justify-between items-center">
                      <span className="font-medium">Processing Completed</span>
                      <span className="text-sm text-muted-foreground">{productData.processedDate}</span>
                    </div>
                    <p className="text-sm text-muted-foreground">Document successfully processed and validated</p>
                  </div>

                <div className="flex items-start gap-4">
                  <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                  <div className="flex-1">
                    <div className="flex justify-between items-center">
                      <span className="font-medium text-green-700">Status: Complete</span>
                      <span className="text-sm text-muted-foreground">{productData.processedDate}</span>
                    </div>
                    <p className="text-sm text-muted-foreground">Document ready for distribution</p>
                  </div>

              </div>

          </Card>

          {/* Team Information */}

            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User size={20} />
                Team Information
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Created By</label>
                  <p className="text-foreground font-medium">{productData.createdBy}</p>

                <div>
                  <label className="text-sm font-medium text-muted-foreground">Reviewed By</label>
                  <p className="text-foreground font-medium">{productData.reviewedBy}</p>

                <div>
                  <label className="text-sm font-medium text-muted-foreground">Approved By</label>
                  <p className="text-foreground font-medium">{productData.approvedBy}</p>
                </div>
              </div>

          </Card>

      </div>

  )
