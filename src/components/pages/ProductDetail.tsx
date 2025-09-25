import { Button } from "@/components/ui/button"
import { Separator } from '@/components/ui/separator'
import { Separator } from '@/components/ui/separator'
import { ArrowLeft, Download, Eye } from '@phosphor-icons/react'

interface ProductDetailProps {
  // Mock data - in 
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
          <div className="flex it
    teamLead: 'Sarah Johnson',
              size="sm"
    approvers: ['Jane Executive', 'Bob Director']
   

          
    <div className="flex flex-col h-full bg-background">
              <Downl
      <div className="p-6 border-b border-border">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
      <div className
              variant="ghost" 
            <CardHeader
              onClick={() => onNavigate('portfolio')}
              className="flex items-center gap-2"
            >
              <ArrowLeft size={16} />
              Back to Portfolio
              <div>
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
                     
            <Button size="sm" className="flex items-center gap-2">
              <Download size={16} />
              Download
                     
                
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-auto p-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Product Information */}
          <Card>
              <div>
              <CardTitle>Product Information</CardTitle>
              </div>
            <CardContent className="space-y-4">
                <p 
                <label className="text-sm font-medium text-muted-foreground">Product ID</label>
                <p className="text-foreground mt-1">{productData.id}</p>
              </div>
    </div>
                <label className="text-sm font-medium text-muted-foreground">Status</label>
                <p className="text-foreground mt-1">{productData.status}</p>
              </div>

                <label className="text-sm font-medium text-muted-foreground">Version</label>
                <p className="text-foreground mt-1">{productData.version}</p>


                <label className="text-sm font-medium text-muted-foreground">Last Modified</label>
                <p className="text-foreground mt-1">{productData.lastModified}</p>
              </div>

          </Card>

          {/* Description */}

            <CardHeader>
              <CardTitle>Description</CardTitle>

            <CardContent>
              <p className="text-foreground">{productData.description}</p>
            </CardContent>
          </Card>

          {/* Document History */}
          <Card>
            <CardHeader>
              <CardTitle>Document History</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 border border-border rounded-lg">
                  <div className="flex-1">
                    <div className="flex justify-between items-center">
                      <span className="font-medium text-foreground">Version 2.1</span>
                      <span className="text-sm text-muted-foreground">{productData.lastModified}</span>
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">Current version - Active</p>
                  </div>

                <div className="flex items-center justify-between p-3 border border-border rounded-lg opacity-60">


                      <span className="font-medium text-foreground">Version 2.0</span>
                      <span className="text-sm text-muted-foreground">2024-11-15</span>
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">Previous version</p>
                  </div>

              </div>

          </Card>

          {/* Team Information */}

            <CardHeader>
              <CardTitle>Team Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm font-medium text-muted-foreground">Created By</label>
                <p className="text-foreground mt-1">{productData.createdBy}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-muted-foreground">Reviewed By</label>
                <p className="text-foreground mt-1">{productData.reviewedBy}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-muted-foreground">Team Lead</label>
                <p className="text-foreground mt-1">{productData.teamLead}</p>
              </div>

          </Card>

      </div>

  )
