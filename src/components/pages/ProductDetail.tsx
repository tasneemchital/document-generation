import { Button } from "@/components/ui/button"

  productId?: string
  onNavigate: (page: string) => void
import { Separator } from '@/components/ui/separator'

interface ProductDetailProps {
  productId?: string
      <div className="p-6 border-b b
}

export function ProductDetail({ productId, onNavigate }: ProductDetailProps) {
  // Mock data - in real app this would be fetched based on productId
  const productData = {
    id: 'H9042008000',
    productName: 'Medicare Advantage PDP',
  )















    reviewedBy: 'fatima.gavandi',

  }

  return (

      {/* Header */}

        <Button 

          size="sm"





        </Button>



          </h1>

            {productData.folderName}

        </div>



            Preview



            Download









      <div className="flex-1 overflow-auto p-6">



            <Card>







              </CardContent>





              </CardHeader>





            <Card>







          </div>







              </CardTitle>

            <CardContent>





                  </div>



                  </div>



                  </div>



                  </div>



















              </div>



              <div>

                <p className="text-foreground mt-1">{productData.description}</p>

            </CardContent>



          <Card>





            </CardHeader>











                </div>



                  <div className="flex-1">
                    <div className="flex justify-between items-center">





                </div>












            </CardContent>



          <Card>



                Team Information







                </div>



                </div>



                </div>

            </CardContent>

        </div>

    </div>

}