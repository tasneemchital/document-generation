import { Button } from "@/components/ui/button"
import { ArrowLeft } from "@phosphor-icons/react"

interface ProductDetailProps {
  productId?: string
  productName?: string
  onNavigate: (page: string) => void
}

export function ProductDetail({ productId, productName, onNavigate }: ProductDetailProps) {
  return (
    <div className="flex flex-col h-full bg-background">
      <div className="p-6 border-b border-border">
        <div className="flex items-center gap-4">
          <Button
            variant="outline"
            size="sm"
            onClick={() => onNavigate('portfolio')}
            className="flex items-center gap-2"
          >
            <ArrowLeft size={16} />
            Back to Portfolio
          </Button>
          <h1 className="text-2xl font-semibold text-foreground">
            {productName || 'Product Detail'}
          </h1>
        </div>
      </div>
      <div className="flex-1 p-6">
        {/* Content will go here */}
      </div>
    </div>
  )
}