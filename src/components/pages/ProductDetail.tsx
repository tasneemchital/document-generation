interface ProductDetailProps {
  productId?: string
  onNavigate: (page: string) => void
}

export function ProductDetail({ productId, onNavigate }: ProductDetailProps) {
  return (
    <div className="flex flex-col h-full bg-background">
    </div>
  )
}