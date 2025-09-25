import { ArrowLeft, Download, Eye, Calendar, User, FileText, Settings } from '@phosphor-icons/react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'

interface ProductDetailProps {
  productId?: string
  onNavigate: (page: string) => void
}

export function ProductDetail({ productId, onNavigate }: ProductDetailProps) {
  // Mock data mapping - in real app this would be fetched based on productId
  const getProductData = (id: string) => {
    const baseData = {
      'H9042008000': {
        id: 'H9042008000',
        batchId: 'H9042008000',
        source: 'Portfolio Management',
        mlType: 'Active',
        collateralName: 'Medicare Advantage Plan',
        fontType: 'Standard',
        productName: 'H9042008000',
        folderName: 'H9042008000 - Blue Cross Medicare Advantage 2026',
        versionNumber: '2026_0.12',
        status: 'PSoT Preparation',
        queuedDate: '09/20/2025 10:30 AM',
        processedDate: '09/25/2025 02:15 PM',
        userName: 'shivani.vidhate',
        description: 'Medicare Advantage Plan portfolio for 2026 coverage year. This plan includes comprehensive medical and prescription drug coverage for eligible members.',
        fileSize: '15.2 MB',
        pageCount: 156,
        language: 'English',
        compliance: 'CMS Review Pending',
        lastModified: '09/25/2025 02:00 PM',
        createdBy: 'Portfolio System',
        reviewedBy: 'shivani.vidhate',
        approvedBy: 'Pending Review'
      },
      'H6529004000': {
        id: 'H6529004000',
        batchId: 'H6529004000',
        source: 'Portfolio Management',
        mlType: 'Active',
        collateralName: 'Medicare Advantage Plan',
        fontType: 'Standard',
        productName: 'H6529004000',
        folderName: 'H6529004000 - Premium Medicare Advantage 2026',
        versionNumber: '2026_0.12',
        status: 'PSoT Preparation',
        queuedDate: '09/20/2025 09:45 AM',
        processedDate: '09/25/2025 01:30 PM',
        userName: 'kiran.raskar',
        description: 'Premium Medicare Advantage Plan with enhanced benefits and expanded provider network for the 2026 plan year.',
        fileSize: '18.7 MB',
        pageCount: 203,
        language: 'English',
        compliance: 'CMS Review Pending',
        lastModified: '09/25/2025 01:15 PM',
        createdBy: 'Portfolio System',
        reviewedBy: 'kiran.raskar',
        approvedBy: 'Pending Review'
      },
      '2026 Crosswalks': {
        id: '2026 Crosswalks',
        batchId: 'CW-2026-001',
        source: 'Crosswalk Management',
        mlType: 'Documentation',
        collateralName: 'Plan Crosswalk Documentation',
        fontType: 'Standard',
        productName: '2026 Crosswalks',
        folderName: '2026 Crosswalks - Plan Migration Documentation',
        versionNumber: '2026_0.01',
        status: 'PSoT Preparation',
        queuedDate: '09/15/2025 08:00 AM',
        processedDate: '09/17/2025 03:45 PM',
        userName: 'shivani.vidhate',
        description: 'Comprehensive crosswalk documentation for plan migrations and benefit changes effective January 1, 2026.',
        fileSize: '8.4 MB',
        pageCount: 85,
        language: 'English',
        compliance: 'Internal Review',
        lastModified: '09/17/2025 03:30 PM',
        createdBy: 'Crosswalk System',
        reviewedBy: 'shivani.vidhate',
        approvedBy: 'Pending Review'
      }
    }
    
    // Return specific product data or default for unknown IDs
    return baseData[id as keyof typeof baseData] || {
      id: productId || 'Unknown',
      batchId: productId || 'Unknown',
      source: 'Portfolio Management',
      mlType: 'Active',
      collateralName: 'Medicare Plan',
      fontType: 'Standard',
      productName: productId || 'Unknown Product',
      folderName: `${productId || 'Unknown'} - Medicare Plan Documentation`,
      versionNumber: '2025_1.0',
      status: 'In Review',
      queuedDate: '07/01/2025 09:00 AM',
      processedDate: '07/01/2025 05:00 PM',
      userName: 'system.user',
      description: 'Medicare plan documentation and related materials for member communication.',
      fileSize: '5.2 MB',
      pageCount: 48,
      language: 'English',
      compliance: 'Under Review',
      lastModified: '07/01/2025 04:45 PM',
      createdBy: 'Portfolio System',
      reviewedBy: 'system.user',
      approvedBy: 'Pending Review'
    }
  }

  const productData = getProductData(productId || '')

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
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" className="flex items-center gap-2">
            <Eye size={16} />
            Preview
          </Button>
          <Button variant="outline" size="sm" className="flex items-center gap-2">
            <Download size={16} />
            Download
          </Button>
          <Button variant="outline" size="sm" className="flex items-center gap-2">
            <Settings size={16} />
            Settings
          </Button>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-auto p-6">
        <div className="max-w-6xl mx-auto space-y-6">
          {/* Status and Basic Info */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium text-muted-foreground">Status</CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <Badge 
                  variant="secondary" 
                  className={
                    productData.status === 'Complete' ? 'bg-green-100 text-green-800 border-green-200' :
                    productData.status === 'PSoT Preparation' ? 'bg-blue-100 text-blue-800 border-blue-200' :
                    productData.status === 'In Review' ? 'bg-orange-100 text-orange-800 border-orange-200' :
                    'bg-gray-100 text-gray-800 border-gray-200'
                  }
                >
                  {productData.status}
                </Badge>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium text-muted-foreground">Version</CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
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

          {/* Product Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText size={20} />
                Product Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Product Name</label>
                    <p className="text-foreground font-medium">{productData.productName}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Collateral Name</label>
                    <p className="text-foreground">{productData.collateralName}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">ML Type</label>
                    <p className="text-foreground">{productData.mlType}</p>
                  </div>
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
              </div>
              <Separator />
              <div>
                <label className="text-sm font-medium text-muted-foreground">Description</label>
                <p className="text-foreground mt-1">{productData.description}</p>
              </div>
            </CardContent>
          </Card>

          {/* Processing Timeline */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar size={20} />
                Processing Timeline
              </CardTitle>
            </CardHeader>
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
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
                  <div className="flex-1">
                    <div className="flex justify-between items-center">
                      <span className="font-medium">Processing Completed</span>
                      <span className="text-sm text-muted-foreground">{productData.processedDate}</span>
                    </div>
                    <p className="text-sm text-muted-foreground">Document successfully processed and validated</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className={`w-2 h-2 rounded-full mt-2 ${
                    productData.status === 'Complete' ? 'bg-green-500' :
                    productData.status === 'PSoT Preparation' ? 'bg-blue-500' :
                    productData.status === 'In Review' ? 'bg-orange-500' :
                    'bg-gray-500'
                  }`}></div>
                  <div className="flex-1">
                    <div className="flex justify-between items-center">
                      <span className={`font-medium ${
                        productData.status === 'Complete' ? 'text-green-700' :
                        productData.status === 'PSoT Preparation' ? 'text-blue-700' :
                        productData.status === 'In Review' ? 'text-orange-700' :
                        'text-gray-700'
                      }`}>
                        Status: {productData.status}
                      </span>
                      <span className="text-sm text-muted-foreground">{productData.processedDate}</span>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {productData.status === 'Complete' ? 'Document ready for distribution' :
                       productData.status === 'PSoT Preparation' ? 'Document in preparation phase' :
                       productData.status === 'In Review' ? 'Document under review' :
                       'Current status of document'}
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Team Information */}
          <Card>
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
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Reviewed By</label>
                  <p className="text-foreground font-medium">{productData.reviewedBy}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Approved By</label>
                  <p className="text-foreground font-medium">{productData.approvedBy}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}