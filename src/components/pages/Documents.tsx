import { useState } from 'react'
import { useKV } from '@github/spark/hooks'
import { SmartSearchBar } from '@/components/SmartSearchBar'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { 
  Table, 
  TableBody,
  TableCell, 
  TableHead,
  TableHeader, 
  TableRow 
} from '@/components/ui/table'
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  Filter,
  Eye,
  Calendar,
  FileText,
  Download,
  Settings,
  Edit,
  CaretUp,
  CaretDown,
  MagnifyingGlass
} from '@phosphor-icons/react'

interface DocumentData {
  id: string
  documentName: string
  planType: string
  instanceName: string
  effectiveDate: string
  versionNumber: string
  status: string
  lastModified: string
  createdBy: string
  documentType: string
}

const mockDocuments: DocumentData[] = [
  {
    id: 'DOC-001',
    documentName: 'Medicare ANOC 2025',
    planType: 'HMO',
    instanceName: 'Simplify HMO MAPD',
    effectiveDate: '1/1/2025',
    versionNumber: '2025_2.0',
    status: 'Active',
    lastModified: '12/15/2024',
    createdBy: 'John Smith',
    documentType: 'ANOC'
  },
  {
    id: 'DOC-002',
    documentName: 'PPO Evidence of Coverage',
    planType: 'PPO',
    instanceName: 'Simplify PPO',
    effectiveDate: '1/1/2025',
    versionNumber: '2025_1.0',
    status: 'Active',
    lastModified: '12/14/2024',
    createdBy: 'Sarah Johnson',
    documentType: 'EOC'
  },
  {
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
    createdBy: 'Jennifer Wang',
    documentType: 'Handbook'
  },
  {
    id: 'DOC-009',
    documentName: 'Outline of Coverage',
    planType: 'PPO',
    instanceName: 'Premium PPO Plan',
    effectiveDate: '1/1/2025',
    versionNumber: '2025_1.2',
    status: 'Under Review',
    lastModified: '12/07/2024',
    createdBy: 'Kevin Martinez',
    documentType: 'OOC'
  },
  {
    id: 'DOC-010',
    documentName: 'SOB Rx Filling Guide',
    planType: 'MAPD',
    instanceName: 'Medicare Rx Plan',
    effectiveDate: '1/1/2025',
    versionNumber: '2025_1.0',
    status: 'Active',
    lastModified: '12/06/2024',
    createdBy: 'Rachel Green',
    documentType: 'SOB'
  }
]

interface DocumentsProps {
  onNavigate?: (page: string) => void
  onDocumentSelect?: (documentId: string, documentName: string) => void
}

export function Documents({ onNavigate, onDocumentSelect }: DocumentsProps) {
  const [searchTerm, setSearchTerm] = useState('')
  const [documents] = useKV<DocumentData[]>('documents-data', mockDocuments)
  
  // Column filters
  const [documentNameFilter, setDocumentNameFilter] = useState('')
  const [planTypeFilter, setPlanTypeFilter] = useState('')
  const [instanceNameFilter, setInstanceNameFilter] = useState('')
  const [effectiveDateFilter, setEffectiveDateFilter] = useState('')
  const [versionNumberFilter, setVersionNumberFilter] = useState('')
  const [statusFilter, setStatusFilter] = useState('')
  const [documentTypeFilter, setDocumentTypeFilter] = useState('')
  const [lastModifiedFilter, setLastModifiedFilter] = useState('')
  const [createdByFilter, setCreatedByFilter] = useState('')
  
  // Sorting
  const [sortColumn, setSortColumn] = useState<keyof DocumentData | ''>('')
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc')

  // Get unique values for filters
  const uniquePlanTypes = Array.from(new Set(documents.map(doc => doc.planType))).sort()
  const uniqueStatuses = Array.from(new Set(documents.map(doc => doc.status))).sort()
  const uniqueDocumentTypes = Array.from(new Set(documents.map(doc => doc.documentType))).sort()
  const uniqueCreatedBy = Array.from(new Set(documents.map(doc => doc.createdBy))).sort()

  // Filter documents based on search and column filters
  const filteredDocuments = documents
    .filter(doc => {
      const matchesSearch = searchTerm === '' || 
        Object.values(doc).some(value => 
          value.toString().toLowerCase().includes(searchTerm.toLowerCase())
        )

      const matchesDocumentName = documentNameFilter === '' || 
        doc.documentName.toLowerCase().includes(documentNameFilter.toLowerCase())
      const matchesPlanType = planTypeFilter === '' || doc.planType === planTypeFilter
      const matchesInstanceName = instanceNameFilter === '' || 
        doc.instanceName.toLowerCase().includes(instanceNameFilter.toLowerCase())
      const matchesEffectiveDate = effectiveDateFilter === '' || 
        doc.effectiveDate.includes(effectiveDateFilter)
      const matchesVersionNumber = versionNumberFilter === '' || 
        doc.versionNumber.toLowerCase().includes(versionNumberFilter.toLowerCase())
      const matchesStatus = statusFilter === '' || doc.status === statusFilter
      const matchesDocumentType = documentTypeFilter === '' || doc.documentType === documentTypeFilter
      const matchesLastModified = lastModifiedFilter === '' || 
        doc.lastModified.includes(lastModifiedFilter)
      const matchesCreatedBy = createdByFilter === '' || doc.createdBy === createdByFilter
      
      return matchesSearch && matchesDocumentName && matchesPlanType && 
             matchesInstanceName && matchesEffectiveDate && matchesVersionNumber && 
             matchesStatus && matchesDocumentType && matchesLastModified && matchesCreatedBy
    })
    .sort((a, b) => {
      if (!sortColumn) return 0
      
      const aValue = a[sortColumn]
      const bValue = b[sortColumn]
      
      if (aValue < bValue) return sortDirection === 'asc' ? -1 : 1
      if (aValue > bValue) return sortDirection === 'asc' ? 1 : -1
      return 0
    })

  const handleSort = (column: keyof DocumentData) => {
    if (sortColumn === column) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc')
    } else {
      setSortColumn(column)
      setSortDirection('asc')
    }
  }

  const clearAllFilters = () => {
    setDocumentNameFilter('')
    setPlanTypeFilter('')
    setInstanceNameFilter('')
    setEffectiveDateFilter('')
    setVersionNumberFilter('')
    setStatusFilter('')
    setDocumentTypeFilter('')
    setLastModifiedFilter('')
    setCreatedByFilter('')
    setSortColumn('')
    setSortDirection('asc')
  }

  const hasActiveFilters = documentNameFilter || planTypeFilter || instanceNameFilter || 
    effectiveDateFilter || versionNumberFilter || statusFilter || documentTypeFilter || 
    lastModifiedFilter || createdByFilter

  const getSortIcon = (column: keyof DocumentData) => {
    if (sortColumn === column) {
      return sortDirection === 'asc' ? 
        <CaretUp className="w-4 h-4" /> : 
        <CaretDown className="w-4 h-4" />
    }
    return <CaretUp className="w-4 h-4 opacity-30" />
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active':
        return 'bg-green-100 text-green-800'
      case 'Draft':
        return 'bg-yellow-100 text-yellow-800'
      case 'Under Review':
        return 'bg-blue-100 text-blue-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
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
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
          <Button variant="outline" size="sm">
            <Settings className="w-4 h-4 mr-2" />
            Settings
          </Button>
        </div>
      </div>

      {/* Smart Search Bar */}
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex-1 max-w-md">
              <SmartSearchBar
                value={searchTerm}
                onChange={setSearchTerm}
                placeholder="Search documents by name, instance, plan type..."
                storageKey="documents-search"
              />
            </div>
            {hasActiveFilters && (
              <Button 
                variant="outline" 
                size="sm"
                onClick={clearAllFilters}
                className="ml-4"
              >
                Clear All Filters
              </Button>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Results Summary */}
      <div className="flex items-center justify-between text-sm text-muted-foreground">
        <span>
          Showing {filteredDocuments.length} of {documents.length} documents
        </span>
        <div className="flex items-center gap-2">
          <Calendar className="w-4 h-4" />
          <span>Last updated: {new Date().toLocaleDateString()}</span>
        </div>
      </div>

      {/* Documents Table */}
      <Card>
        <CardContent className="p-0">
          <div className="p-4 bg-muted/30 border-b border-border">
            <p className="text-sm text-muted-foreground flex items-center gap-2">
              <FileText className="w-4 h-4" />
              Double-click any document name to open the full document viewer
            </p>
          </div>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-64">
                  <div className="flex items-center justify-between">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleSort('documentName')}
                      className="flex items-center gap-2 p-0 h-auto font-semibold"
                    >
                      Document Name
                      {getSortIcon('documentName')}
                    </Button>
                  </div>
                  <div className="mt-2">
                    <Input
                      placeholder="Filter..."
                      value={documentNameFilter}
                      onChange={(e) => setDocumentNameFilter(e.target.value)}
                      className="h-8 text-xs"
                    />
                  </div>
                </TableHead>
                <TableHead>
                  <div className="flex items-center justify-between">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleSort('planType')}
                      className="flex items-center gap-2 p-0 h-auto font-semibold"
                    >
                      Plan Type
                      {getSortIcon('planType')}
                    </Button>
                  </div>
                  <div className="mt-2">
                    <Select value={planTypeFilter} onValueChange={setPlanTypeFilter}>
                      <SelectTrigger className="h-8 text-xs">
                        <SelectValue placeholder="Filter..." />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="">All</SelectItem>
                        {uniquePlanTypes.map(type => (
                          <SelectItem key={type} value={type}>{type}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </TableHead>
                <TableHead>
                  <div className="flex items-center justify-between">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleSort('instanceName')}
                      className="flex items-center gap-2 p-0 h-auto font-semibold"
                    >
                      Instance Name
                      {getSortIcon('instanceName')}
                    </Button>
                  </div>
                  <div className="mt-2">
                    <Input
                      placeholder="Filter..."
                      value={instanceNameFilter}
                      onChange={(e) => setInstanceNameFilter(e.target.value)}
                      className="h-8 text-xs"
                    />
                  </div>
                </TableHead>
                <TableHead>
                  <div className="flex items-center justify-between">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleSort('effectiveDate')}
                      className="flex items-center gap-2 p-0 h-auto font-semibold"
                    >
                      Effective Date
                      {getSortIcon('effectiveDate')}
                    </Button>
                  </div>
                  <div className="mt-2">
                    <Input
                      placeholder="Filter..."
                      value={effectiveDateFilter}
                      onChange={(e) => setEffectiveDateFilter(e.target.value)}
                      className="h-8 text-xs"
                    />
                  </div>
                </TableHead>
                <TableHead>
                  <div className="flex items-center justify-between">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleSort('versionNumber')}
                      className="flex items-center gap-2 p-0 h-auto font-semibold"
                    >
                      Version Number
                      {getSortIcon('versionNumber')}
                    </Button>
                  </div>
                  <div className="mt-2">
                    <Input
                      placeholder="Filter..."
                      value={versionNumberFilter}
                      onChange={(e) => setVersionNumberFilter(e.target.value)}
                      className="h-8 text-xs"
                    />
                  </div>
                </TableHead>
                <TableHead>
                  <div className="flex items-center justify-between">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleSort('status')}
                      className="flex items-center gap-2 p-0 h-auto font-semibold"
                    >
                      Status
                      {getSortIcon('status')}
                    </Button>
                  </div>
                  <div className="mt-2">
                    <Select value={statusFilter} onValueChange={setStatusFilter}>
                      <SelectTrigger className="h-8 text-xs">
                        <SelectValue placeholder="Filter..." />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="">All</SelectItem>
                        {uniqueStatuses.map(status => (
                          <SelectItem key={status} value={status}>{status}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </TableHead>
                <TableHead>
                  <div className="flex items-center justify-between">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleSort('documentType')}
                      className="flex items-center gap-2 p-0 h-auto font-semibold"
                    >
                      Document Type
                      {getSortIcon('documentType')}
                    </Button>
                  </div>
                  <div className="mt-2">
                    <Select value={documentTypeFilter} onValueChange={setDocumentTypeFilter}>
                      <SelectTrigger className="h-8 text-xs">
                        <SelectValue placeholder="Filter..." />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="">All</SelectItem>
                        {uniqueDocumentTypes.map(type => (
                          <SelectItem key={type} value={type}>{type}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </TableHead>
                <TableHead>
                  <div className="flex items-center justify-between">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleSort('lastModified')}
                      className="flex items-center gap-2 p-0 h-auto font-semibold"
                    >
                      Last Modified
                      {getSortIcon('lastModified')}
                    </Button>
                  </div>
                  <div className="mt-2">
                    <Input
                      placeholder="Filter..."
                      value={lastModifiedFilter}
                      onChange={(e) => setLastModifiedFilter(e.target.value)}
                      className="h-8 text-xs"
                    />
                  </div>
                </TableHead>
                <TableHead>
                  <div className="flex items-center justify-between">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleSort('createdBy')}
                      className="flex items-center gap-2 p-0 h-auto font-semibold"
                    >
                      Created By
                      {getSortIcon('createdBy')}
                    </Button>
                  </div>
                  <div className="mt-2">
                    <Select value={createdByFilter} onValueChange={setCreatedByFilter}>
                      <SelectTrigger className="h-8 text-xs">
                        <SelectValue placeholder="Filter..." />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="">All</SelectItem>
                        {uniqueCreatedBy.map(user => (
                          <SelectItem key={user} value={user}>{user}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredDocuments.map(doc => (
                <TableRow 
                  key={doc.id} 
                  className="hover:bg-muted/50 cursor-pointer"
                  onDoubleClick={() => onDocumentSelect?.(doc.id, doc.documentName)}
                >
                  <TableCell>
                    <div 
                      className="flex items-center gap-2 cursor-pointer hover:text-primary transition-colors"
                      onDoubleClick={(e) => {
                        e.stopPropagation()
                        onDocumentSelect?.(doc.id, doc.documentName)
                      }}
                      title="Double-click to open document"
                    >
                      <FileText className="w-4 h-4 text-muted-foreground" />
                      {doc.documentName}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline">{doc.planType}</Badge>
                  </TableCell>
                  <TableCell>{doc.instanceName}</TableCell>
                  <TableCell>{doc.effectiveDate}</TableCell>
                  <TableCell>
                    <Badge variant="secondary">{doc.versionNumber}</Badge>
                  </TableCell>
                  <TableCell>
                    <Badge className={getStatusColor(doc.status)} variant="secondary">
                      {doc.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline">{doc.documentType}</Badge>
                  </TableCell>
                  <TableCell>{doc.lastModified}</TableCell>
                  <TableCell>{doc.createdBy}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <Button variant="ghost" size="sm">
                        <Eye className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Edit className="w-4 h-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {filteredDocuments.length === 0 && (
        <Card>
          <CardContent className="p-8 text-center">
            <FileText className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">No documents found</h3>
            <p className="text-muted-foreground">
              Try adjusting your search criteria or filters
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}