import { useState } from 'react'
import { useKV } from '@github/spark/hooks'
import { SmartSearchBar } from '@/components/SmartSearchBar'
import { Card, CardContent } from '@/components/ui/card'
  Table, 
  TableCell, 
  TableHeader, 
} from '@
  Filter,
  Eye,
  Calendar,
  Building,
} from '@phosph
interface D
  documentName: string
  instanc
  version
  lastModif
  docu

const mockD
    id: 'DO
    planTyp
    e
    status: 'Active',

  },
    id: 'DOC
    planType: 'PPO',
    effectiveDate:
    status: 'Active',
    createdBy: 'Sarah J
  },
    id: 'DOC-003
    planType: 'DSNP',
    effectiveDate: 
    status: 'Draft',
 

    id: 'DOC-004',
    planType: 'HMO',
   
    status: 'Under
    createdBy: 'Lisa Wilson',
  },
    id: 'DOC-005',
    planType: 'HMO',
    effectiveDate: '1/1/2025',
    status: 'Active',
    createdBy: 'Robert Brown',
  },
    id: 'DOC-006',
  },
  {
    status: 'Activ
    createdBy: 'Emily Clark',
  },
    id: 'DOC-007',
    planType: 'All Plans',
    effectiveDate: '1/1/2025',
    status: 'Active',
    createdBy: 'David Lee',
  },
    id: 'DOC-008',
    
   
    id: 'DOC-003',
    documentName: 'Summary of Benefits',
    planType: 'DSNP',
    instanceName: 'Simplify Choice DSNP',
    effectiveDate: '1/1/2025',
    versionNumber: '2025_1.5',
    status: 'Draft',
    lastModified: '12/13/2024',
    createdBy: 'Mike Davis',
    documentType: 'SB'
  },
  {
    id: 'DOC-004',
    documentName: 'Medicare EOC Handbook',
    planType: 'HMO',
    instanceName: 'Health Choice HMO',
    effectiveDate: '1/1/2025',
    versionNumber: '2025_3.0',
    status: 'Under Review',
    lastModified: '12/12/2024',
    createdBy: 'Lisa Wilson',
    documentType: 'EOC'
  },
  {
    id: 'DOC-005',
    documentName: 'Care Plus HMO Benefits',
    planType: 'HMO',
    instanceName: 'Care Plus HMO',
    effectiveDate: '1/1/2025',
    versionNumber: '2025_1.0',
    status: 'Active',
    lastModified: '12/11/2024',
    createdBy: 'Robert Brown',
    documentType: 'SB'
  },
  {
    id: 'DOC-006',
    documentName: 'Commercial Handbook 2025',
    planType: 'Commercial',
    instanceName: 'Commercial Plan A',
    effectiveDate: '1/1/2025',
    versionNumber: '2025_4.0',
    status: 'Active',
    lastModified: '12/10/2024',
    createdBy: 'Emily Clark',
    documentType: 'Handbook'
  },
  {
    id: 'DOC-007',
    documentName: 'HIPAA Privacy Notice',
    planType: 'All Plans',
    instanceName: 'Global',
    effectiveDate: '1/1/2025',
    versionNumber: '2025_1.0',
    status: 'Active',
    lastModified: '12/09/2024',
    createdBy: 'David Lee',
    documentType: 'HIPAA'
  },
  {
    id: 'DOC-008',
    documentName: 'Medicaid Handbook',
    planType: 'Medicaid',
    instanceName: 'State Medicaid Plan',
    effectiveDate: '1/1/2025',
    versionNumber: '2025_2.0',
    status: 'Draft',
    lastModified: '12/08/2024',
        return 'bg-blue-100 text-
    documentType: 'Handbook'
    
  {
  return (
    documentName: 'Outline of Coverage',
      <div className
    instanceName: 'Premium PPO Plan',
          <p className="text-m
    versionNumber: '2025_1.2',
    status: 'Under Review',
    lastModified: '12/07/2024',
    createdBy: 'Kevin Martinez',
    documentType: 'OOC'
    
  {
          </Button
    documentName: 'SOB Rx Filling Guide',
    planType: 'MAPD',
    instanceName: 'Medicare Rx Plan',
    effectiveDate: '1/1/2025',
    versionNumber: '2025_1.0',
    status: 'Active',
    lastModified: '12/06/2024',
          />
    documentType: 'SOB'

]

interface DocumentsProps {
  onNavigate?: (page: string) => void
}

export function Documents({ onNavigate }: DocumentsProps) {
  const [searchTerm, setSearchTerm] = useState('')
  const [planTypeFilter, setPlanTypeFilter] = useState('all')
  const [statusFilter, setStatusFilter] = useState('all')
  const [documentTypeFilter, setDocumentTypeFilter] = useState('all')
  const [documents] = useKV<DocumentData[]>('documents-data', mockDocuments)

  // Get unique values for filters
  const uniquePlanTypes = Array.from(new Set(documents.map(doc => doc.planType)))
  const uniqueStatuses = Array.from(new Set(documents.map(doc => doc.status)))
  const uniqueDocumentTypes = Array.from(new Set(documents.map(doc => doc.documentType)))

  // Filter documents based on search and filters
  const filteredDocuments = documents.filter(doc => {
    const matchesSearch = searchTerm === '' || 
      doc.documentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doc.instanceName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doc.planType.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doc.documentType.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesPlanType = planTypeFilter === 'all' || doc.planType === planTypeFilter
    const matchesStatus = statusFilter === 'all' || doc.status === statusFilter  
    const matchesDocumentType = documentTypeFilter === 'all' || doc.documentType === documentTypeFilter
    
    return matchesSearch && matchesPlanType && matchesStatus && matchesDocumentType
    

  const getStatusColor = (status: string) => {
    switch (status) {

        return 'bg-green-100 text-green-800'
                var
        return 'bg-yellow-100 text-yellow-800'
      case 'Under Review':
        return 'bg-blue-100 text-blue-800'
      default:
        return 'bg-gray-100 text-gray-800'
     
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Documents</h1>
          <p className="text-muted-foreground mt-1">
            Manage and view all document templates and instances
          </p>
      <Card>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Download className="w-4 h-4 mr-2" />
                <T
          </Button>
          <Button variant="outline" size="sm">
            <Settings className="w-4 h-4 mr-2" />
            Settings
          </Button>
        </div>
      </div>

      {/* Smart Search Bar */}
            
        <CardContent className="p-4">
                    </div>
            value={searchTerm}
            onChange={setSearchTerm}
            placeholder="Search documents by name, instance, plan type..."
            storageKey="documents-search"
          />
                  </Ta
      </Card>

      {/* Global Filters */}
            
        <CardContent className="p-4">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Filter className="w-4 h-4 text-muted-foreground" />
              <span className="text-sm font-medium">Filters:</span>
            </div>
            
            <div className="flex items-center gap-2">
              <Building className="w-4 h-4 text-muted-foreground" />
              <Select value={planTypeFilter} onValueChange={setPlanTypeFilter}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Plan Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Plan Types</SelectItem>
                  {uniquePlanTypes.map(type => (
                    <SelectItem key={type} value={type}>{type}</SelectItem>
            <p classN
                </SelectContent>
          </CardContent


            <div className="flex items-center gap-2">
              <Tag className="w-4 h-4 text-muted-foreground" />
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Statuses</SelectItem>
                  {uniqueStatuses.map(status => (
                    <SelectItem key={status} value={status}>{status}</SelectItem>

                </SelectContent>

            </div>

            <div className="flex items-center gap-2">
              <FileText className="w-4 h-4 text-muted-foreground" />
              <Select value={documentTypeFilter} onValueChange={setDocumentTypeFilter}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Document Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  {uniqueDocumentTypes.map(type => (
                    <SelectItem key={type} value={type}>{type}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {(planTypeFilter !== 'all' || statusFilter !== 'all' || documentTypeFilter !== 'all') && (
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => {
                  setPlanTypeFilter('all')
                  setStatusFilter('all')
                  setDocumentTypeFilter('all')
                }}

                Clear Filters

            )}

        </CardContent>


      {/* Results Summary */}
      <div className="flex items-center justify-between text-sm text-muted-foreground">

          Showing {filteredDocuments.length} of {documents.length} documents

        <div className="flex items-center gap-2">
          <Calendar className="w-4 h-4" />
          <span>Last updated: {new Date().toLocaleDateString()}</span>
        </div>
      </div>

      {/* Documents Table */}
      <Card>
        <CardContent className="p-0">

            <TableHeader>

                <TableHead>Document Name</TableHead>
                <TableHead>Plan Type</TableHead>
                <TableHead>Instance Name</TableHead>
                <TableHead>Effective Date</TableHead>
                <TableHead>Version Number</TableHead>

                <TableHead>Document Type</TableHead>
                <TableHead>Last Modified</TableHead>
                <TableHead>Created By</TableHead>

              </TableRow>

            <TableBody>

                <TableRow key={doc.id} className="hover:bg-muted/50">

                    <div className="flex items-center gap-2">
                      <FileText className="w-4 h-4 text-muted-foreground" />
                      {doc.documentName}

                  </TableCell>

                    <Badge variant="outline">{doc.planType}</Badge>

                  <TableCell>{doc.instanceName}</TableCell>


                    <Badge variant="secondary">{doc.versionNumber}</Badge>
                  </TableCell>
                  <TableCell>
                    <Badge className={getStatusColor(doc.status)} variant="secondary">

                    </Badge>

                  <TableCell>

                  </TableCell>

                  <TableCell>{doc.createdBy}</TableCell>

                    <div className="flex items-center gap-1">

                        <Eye className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="sm">

                      </Button>

                  </TableCell>

              ))}
            </TableBody>
          </Table>

      </Card>

      {filteredDocuments.length === 0 && (
        <Card>
          <CardContent className="p-8 text-center">
            <FileText className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">No documents found</h3>
            <p className="text-muted-foreground">
              Try adjusting your search criteria or filters

          </CardContent>

      )}

  )
