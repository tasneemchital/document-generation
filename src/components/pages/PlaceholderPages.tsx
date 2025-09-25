import React, { useState, useMemo, useEffect } from "react"
import { useKV } from '@github/spark/hooks'
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { FileText, Clock, BarChart3, X, CaretUp, CaretDown, CaretLeft, CaretRight, Columns, MagnifyingGlass, Funnel, Download, Eye, Gear, ArrowUp, ArrowDown, ArrowLeft, ArrowClockwise, Queue, WarningCircle, UploadSimple, Users, Link, Plus, TextAa, Rows, CopySimple, XCircle, FrameCorners, FileXls, CloudArrowUp, ArrowsClockwise, FloppyDisk } from "@phosphor-icons/react"
import { SmartSearchBar } from "@/components/SmartSearchBar"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"

// JSON Popup Component
function JsonViewerPopup() {
  const [isOpen, setIsOpen] = useState(false)
  
  // Updated sample JSON data with new structure based on your requirements
  const sampleJsonData = `{
  "Languages": [{
    "LanguageName": "English",
    "Content": "Healthy food and utilities are eligible expenses only for enrollees with a qualifying condition such as diabetes, cardiovascular disorders, chronic heart failure, chronic kidney disease and/or chronic high cholesterol."
  }, {
    "LanguageName": "Spanish", 
    "Content": "Los alimentos saludables y servicios públicos son gastos elegibles solo para afiliados con condiciones que califiquen como diabetes, trastornos cardiovasculares, insuficiencia cardíaca crónica, enfermedad renal crónica y/o colesterol alto crónico."
  }, {
    "LanguageName": "Chinese",
    "Content": "健康食品和公用事业只对有合格病症的参保人员是合格费用，如糖尿病、心血管疾病、慢性心力衰竭、慢性肾病和/或慢性高胆固醇。"
  }],
  "Counties": [{
    "CountyName": "St. Croix",
    "FipsCode": "**",
    "PartialInd": "N"
  }, {
    "CountyName": "St. John-St. Thomas",
    "FipsCode": "**", 
    "PartialInd": "N"
  }],
  "Status": "Insert",
  "ApprovedDateTime": "2025-07-29T13:09:48"
}`

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button 
          variant="ghost" 
          size="sm" 
          className="h-7 px-2 text-xs text-green-800 bg-green-100 border-green-300 hover:bg-green-200"
          onClick={() => setIsOpen(true)}
        >
          Insert
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[80vh]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            Publish JSON
          </DialogTitle>
          <DialogDescription>
            View JSON data for this record
          </DialogDescription>
        </DialogHeader>
        <div className="flex-1 min-h-0">
          <Textarea
            readOnly
            value={sampleJsonData}
            className="min-h-[400px] font-mono text-sm resize-none"
            style={{ whiteSpace: 'pre-wrap' }}
          />
        </div>
        <div className="flex justify-end pt-4">
          <Button onClick={() => setIsOpen(false)}>
            Close
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

// QueuedCollateral component implementation
function QueuedCollateral() {
  const [sortField, setSortField] = useState<string | null>(null)
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc')
  const [currentPage, setCurrentPage] = useState(1)
  const [pageSize, setPageSize] = useState(10)
  const [selectedRows, setSelectedRows] = useKV('queued-selected-rows', [] as string[])
  
  // Filter checkboxes state
  const [viewFilters, setViewFilters] = useKV('queued-view-filters', {
    userGeneratedReleased: true,
    userGeneratedInProgress: false,
    systemGenerated: false
  })
  
  // Column filters for search
  const [columnFilters, setColumnFilters] = useState({
    batchId: '',
    source: '',
    mlType: '',
    collateralName: '',
    fontType: '',
    productName: '',
    folderName: '',
    versionNumber: '',
    status: '',
    queuedDate: '',
    processedDate: '',
    userName: ''
  })
  
  // Column visibility state
  const [visibleColumns, setVisibleColumns] = useKV('queued-visible-columns', {
    batchId: true,
    source: true,
    mlType: true,
    collateralName: true,
    fontType: true,
    productName: true,
    folderName: true,
    versionNumber: true,
    status: true,
    queuedDate: true,
    processedDate: true,
    userName: true,
    downloadPdf: true,
    downloadJson: true
  })
  
  // Sample data based on the screenshot
  const queuedData = [
    {
      id: '47730',
      batchId: '47730',
      source: '',
      mlType: 'Released',
      collateralName: 'Medicare ANOC',
      fontType: 'Regular',
      productName: 'H4801024000',
      folderName: 'Term_H4801-024_Blue Cross Medic...',
      versionNumber: '2025_1.0',
      status: 'Complete',
      queuedDate: '07/02/2025 02:05 PM',
      processedDate: '07/02/2025 02:10 PM',
      userName: 'fatima.gavandi'
    },
    {
      id: '47710',
      batchId: '47710',
      source: '',
      mlType: 'Released',
      collateralName: 'Medicare ANOC',
      fontType: 'Regular',
      productName: 'H9706060000',
      folderName: 'INDV_H9706-006_Blue Cross Medic...',
      versionNumber: '2025_2.0',
      status: 'Complete',
      queuedDate: '07/02/2025 10:07 PM',
      processedDate: '07/02/2025 10:09 AM',
      userName: 'fatima.gavandi'
    },
    {
      id: '47698',
      batchId: '47698',
      source: '',
      mlType: 'Released',
      collateralName: 'Medicare ANOC',
      fontType: 'Regular',
      productName: 'H9706005000',
      folderName: 'INDV_H9706-005_Blue Cross Medic...',
      versionNumber: '2025_2.0',
      status: 'Complete',
      queuedDate: '07/02/2025 09:04 AM',
      processedDate: '07/02/2025 09:05 AM',
      userName: 'fatima.gavandi'
    },
    {
      id: '47693',
      batchId: '47693',
      source: '',
      mlType: 'Released',
      collateralName: 'Medicare ANOC',
      fontType: 'Regular',
      productName: 'H9706001000',
      folderName: 'INDV_H9706-001_Blue Cross Medic...',
      versionNumber: '2025_2.0',
      status: 'Complete',
      queuedDate: '07/02/2025 07:19 AM',
      processedDate: '07/02/2025 07:20 AM',
      userName: 'fatima.gavandi'
    },
    {
      id: '47605',
      batchId: '47605',
      source: '',
      mlType: 'Released',
      collateralName: 'Medicare ANOC',
      fontType: 'Regular',
      productName: 'H8554001000',
      folderName: 'INDV_H8554-001_Blue Cross Medic...',
      versionNumber: '2025_2.0',
      status: 'Complete',
      queuedDate: '07/02/2025 12:38 AM',
      processedDate: '07/02/2025 12:39 AM',
      userName: 'fatima.gavandi'
    },
    {
      id: '47598',
      batchId: '47598',
      source: '',
      mlType: 'Released',
      collateralName: 'Medicare ANOC',
      fontType: 'Regular',
      productName: 'H8133005000',
      folderName: 'INDV_H8133-005_Blue Cross Medic...',
      versionNumber: '2025_2.0',
      status: 'Complete',
      queuedDate: '07/01/2025 02:19 PM',
      processedDate: '07/01/2025 02:20 PM',
      userName: 'fatima.gavandi'
    },
    {
      id: '47581',
      batchId: '47581',
      source: '',
      mlType: 'Released',
      collateralName: 'Medicare ANOC',
      fontType: 'Regular',
      productName: 'H8133001000',
      folderName: 'INDV_H8133-001_Blue Cross Medic...',
      versionNumber: '2025_2.0',
      status: 'Complete',
      queuedDate: '07/01/2025 10:27 AM',
      processedDate: '07/01/2025 10:29 AM',
      userName: 'fatima.gavandi'
    },
    {
      id: '47579',
      batchId: '47579',
      source: '',
      mlType: 'Released',
      collateralName: 'Medicare ANOC',
      fontType: 'Regular',
      productName: 'H8133001000',
      folderName: 'INDV_H8133-001_Blue Cross Medic...',
      versionNumber: '2026_2.02',
      status: 'Complete',
      queuedDate: '07/01/2025 10:20 AM',
      processedDate: '07/01/2025 10:22 AM',
      userName: 'fatima.gavandi'
    },
    {
      id: '47576',
      batchId: '47576',
      source: '',
      mlType: 'Released',
      collateralName: 'Medicare ANOC',
      fontType: 'Regular',
      productName: 'H8554003000',
      folderName: 'INDV_H8554-003_Blue Cross Medic...',
      versionNumber: '2025_2.0',
      status: 'Complete',
      queuedDate: '07/01/2025 09:45 AM',
      processedDate: '07/01/2025 09:47 AM',
      userName: 'fatima.gavandi'
    },
    {
      id: '47243',
      batchId: '47243',
      source: '',
      mlType: 'Released',
      collateralName: 'Medicare ANOC',
      fontType: 'Regular',
      productName: 'S5715012000',
      folderName: 'INDV_S5715-012_Blue Cross Medic...',
      versionNumber: '2025_2.0',
      status: 'Complete',
      queuedDate: '06/26/2025 09:11 AM',
      processedDate: '06/26/2025 09:12 AM',
      userName: 'kaveri.k'
    },
    {
      id: '47241',
      batchId: '47241',
      source: '',
      mlType: 'Released',
      collateralName: 'Medicare ANOC',
      fontType: 'Regular',
      productName: 'S5715010000',
      folderName: 'INDV_S5715-010_Blue Cross Medic...',
      versionNumber: '2025_2.0',
      status: 'Complete',
      queuedDate: '06/26/2025 09:09 AM',
      processedDate: '06/26/2025 09:10 AM',
      userName: 'kaveri.k'
    },
    {
      id: '47145',
      batchId: '47145',
      source: 'CollateralModule',
      mlType: 'Released',
      collateralName: 'Medicare ANOC',
      fontType: 'Regular',
      productName: 'H1666008000',
      folderName: 'INDV_H1666-008_Blue Cross Medic...',
      versionNumber: '2026_2.02',
      status: 'Complete',
      queuedDate: '06/25/2025 09:34 AM',
      processedDate: '06/25/2025 09:36 AM',
      userName: 'kaveri.k'
    },
    {
      id: '47143',
      batchId: '47143',
      source: 'CollateralModule',
      mlType: 'Released',
      collateralName: 'Medicare ANOC',
      fontType: 'Regular',
      productName: 'H8634019000',
      folderName: 'INDV_H8634-019_Blue Cross Medic...',
      versionNumber: '2025_2.0',
      status: 'Complete',
      queuedDate: '06/25/2025 09:20 AM',
      processedDate: '06/25/2025 09:21 AM',
      userName: 'Arun.Mandal'
    },
    {
      id: '46992',
      batchId: '46992',
      source: '',
      mlType: 'Released',
      collateralName: 'Medicare EOC',
      fontType: 'Regular',
      productName: 'City of Chicago (PPO MAPD)',
      folderName: 'Group_City of Chicago H8634',
      versionNumber: '2026_0.01',
      status: 'Complete',
      queuedDate: '06/23/2025 03:39 PM',
      processedDate: '06/23/2025 03:40 PM',
      userName: 'vaibhav.kharat'
    },
    {
      id: '46991',
      batchId: '46991',
      source: '',
      mlType: 'Released',
      collateralName: 'Medicare ANOC',
      fontType: 'Regular',
      productName: 'City of Chicago (PPO MAPD)',
      folderName: 'Group_City of Chicago H8634',
      versionNumber: '2026_0.01',
      status: 'Complete',
      queuedDate: '06/23/2025 03:35 PM',
      processedDate: '06/23/2025 03:37 PM',
      userName: 'vaibhav.kharat'
    },
    {
      id: '46990',
      batchId: '46990',
      source: '',
      mlType: 'Released',
      collateralName: 'Medicare EOC',
      fontType: 'Regular',
      productName: 'City of Chicago (PPO MAPD)',
      folderName: 'Group_City of Chicago H8634',
      versionNumber: '2026_0.01',
      status: 'Complete',
      queuedDate: '06/23/2025 03:33 PM',
      processedDate: '06/23/2025 03:35 PM',
      userName: 'vaibhav.kharat'
    },
    {
      id: '44922',
      batchId: '44922',
      source: 'CollateralModule',
      mlType: 'Released',
      collateralName: 'Medicare EOC',
      fontType: 'Regular',
      productName: 'H8554003000',
      folderName: 'INDV_H8554-003_Blue Cross Medic...',
      versionNumber: '2026_2.02',
      status: 'Complete',
      queuedDate: '06/09/2025 10:27 AM',
      processedDate: '06/09/2025 10:30 AM',
      userName: 'Simran Govande'
    }
  ]
  
  // Available columns configuration
  const availableColumns = [
    { key: 'batchId', label: 'BatchId' },
    { key: 'source', label: 'Source' },
    { key: 'mlType', label: 'Collection Type' },
    { key: 'collateralName', label: 'Collateral Name' },
    { key: 'fontType', label: 'Font Type' },
    { key: 'productName', label: 'Product Name' },
    { key: 'folderName', label: 'Folder Name' },
    { key: 'versionNumber', label: 'Version Number' },
    { key: 'status', label: 'Status' },
    { key: 'queuedDate', label: 'Queued Date' },
    { key: 'processedDate', label: 'Processed Date' },
    { key: 'userName', label: 'UserName' },
    { key: 'downloadPdf', label: 'Download PDF' },
    { key: 'downloadJson', label: 'Download Word' }
  ]
  
  // Filter and sort data
  const filteredAndSortedData = useMemo(() => {
    let filtered = queuedData.filter(item => {
      // Apply column filters
      if (columnFilters.batchId && !item.batchId.toLowerCase().includes(columnFilters.batchId.toLowerCase())) {
        return false
      }
      if (columnFilters.source && !item.source.toLowerCase().includes(columnFilters.source.toLowerCase())) {
        return false
      }
      if (columnFilters.mlType && !item.mlType.toLowerCase().includes(columnFilters.mlType.toLowerCase())) {
        return false
      }
      if (columnFilters.collateralName && !item.collateralName.toLowerCase().includes(columnFilters.collateralName.toLowerCase())) {
        return false
      }
      if (columnFilters.fontType && !item.fontType.toLowerCase().includes(columnFilters.fontType.toLowerCase())) {
        return false
      }
      if (columnFilters.productName && !item.productName.toLowerCase().includes(columnFilters.productName.toLowerCase())) {
        return false
      }
      if (columnFilters.folderName && !item.folderName.toLowerCase().includes(columnFilters.folderName.toLowerCase())) {
        return false
      }
      if (columnFilters.versionNumber && !item.versionNumber.toLowerCase().includes(columnFilters.versionNumber.toLowerCase())) {
        return false
      }
      if (columnFilters.status && !item.status.toLowerCase().includes(columnFilters.status.toLowerCase())) {
        return false
      }
      if (columnFilters.queuedDate && !item.queuedDate.toLowerCase().includes(columnFilters.queuedDate.toLowerCase())) {
        return false
      }
      if (columnFilters.processedDate && !item.processedDate.toLowerCase().includes(columnFilters.processedDate.toLowerCase())) {
        return false
      }
      if (columnFilters.userName && !item.userName.toLowerCase().includes(columnFilters.userName.toLowerCase())) {
        return false
      }
      
      return true
    })
    
    if (sortField) {
      filtered.sort((a, b) => {
        const aValue = a[sortField as keyof typeof a] || ''
        const bValue = b[sortField as keyof typeof b] || ''
        
        if (sortDirection === 'asc') {
          return aValue.toString().localeCompare(bValue.toString())
        } else {
          return bValue.toString().localeCompare(aValue.toString())
        }
      })
    }
    
    return filtered
  }, [queuedData, sortField, sortDirection, columnFilters])
  
  // Pagination calculations
  const totalPages = Math.ceil(filteredAndSortedData.length / pageSize)
  const startIndex = (currentPage - 1) * pageSize
  const endIndex = startIndex + pageSize
  const currentPageData = filteredAndSortedData.slice(startIndex, endIndex)
  
  // Reset to page 1 when sort or filters change
  useEffect(() => {
    setCurrentPage(1)
  }, [sortField, sortDirection, columnFilters])
  
  const handleSort = (field: string) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc')
    } else {
      setSortField(field)
      setSortDirection('asc')
    }
  }
  
  const handleRowSelect = (rowId: string, checked: boolean) => {
    setSelectedRows((current: string[]) => 
      checked ? [...current, rowId] : current.filter(id => id !== rowId)
    )
  }
  
  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      const allVisibleIds = currentPageData.map(item => item.id)
      setSelectedRows((current: string[]) => {
        const newSet = new Set([...current, ...allVisibleIds])
        return Array.from(newSet)
      })
    } else {
      const visibleIds = new Set(currentPageData.map(item => item.id))
      setSelectedRows((current: string[]) => 
        current.filter(id => !visibleIds.has(id))
      )
    }
  }
  
  const updateColumnFilter = (column: string, value: string) => {
    setColumnFilters(prev => ({
      ...prev,
      [column]: value
    }))
  }
  
  const clearColumnFilter = (column: string) => {
    setColumnFilters(prev => ({
      ...prev,
      [column]: ''
    }))
  }
  
  const toggleColumnVisibility = (columnKey: string) => {
    setVisibleColumns((current: any) => ({
      ...current,
      [columnKey]: !current[columnKey]
    }))
  }
  
  const toggleViewFilter = (filterKey: string) => {
    setViewFilters((current: any) => ({
      ...current,
      [filterKey]: !current[filterKey]
    }))
  }
  
  const isAllVisibleSelected = currentPageData.length > 0 && 
    currentPageData.every(item => selectedRows.includes(item.id))
  
  const isSomeVisibleSelected = currentPageData.some(item => selectedRows.includes(item.id))
  
  return (
    <div className="space-y-6">
      {/* Header with View Filters */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <h2 className="text-xl font-semibold text-foreground">Collaterals Queued</h2>
        </div>
        <div className="flex items-center gap-8 text-sm">
          <div className="flex items-center gap-2">
            <Checkbox
              id="view-user-generated-released"
              checked={viewFilters.userGeneratedReleased}
              onCheckedChange={() => toggleViewFilter('userGeneratedReleased')}
            />
            <Label htmlFor="view-user-generated-released" className="cursor-pointer font-medium">
              View User Generated - Released Collections
            </Label>
          </div>
          <div className="flex items-center gap-2">
            <Checkbox
              id="view-user-generated-progress"
              checked={viewFilters.userGeneratedInProgress}
              onCheckedChange={() => toggleViewFilter('userGeneratedInProgress')}
            />
            <Label htmlFor="view-user-generated-progress" className="cursor-pointer font-medium">
              View User Generated - In Progress Collections
            </Label>
          </div>
          <div className="flex items-center gap-2">
            <Checkbox
              id="view-system-generated"
              checked={viewFilters.systemGenerated}
              onCheckedChange={() => toggleViewFilter('systemGenerated')}
            />
            <Label htmlFor="view-system-generated" className="cursor-pointer font-medium">
              View System Generated
            </Label>
          </div>
        </div>
      </div>
      
      {/* Actions and Column Controls */}
      <div className="flex items-center justify-between">
        <div className="text-sm text-muted-foreground">
          {filteredAndSortedData.length} items total
          {selectedRows.length > 0 && (
            <Badge variant="secondary" className="ml-3">
              {selectedRows.length} selected
            </Badge>
          )}
        </div>
        
        <div className="flex items-center gap-3">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="flex items-center gap-2 h-9">
                <Columns size={16} />
                Columns
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-64">
              {availableColumns.map((column) => (
                <DropdownMenuCheckboxItem
                  key={column.key}
                  checked={visibleColumns[column.key]}
                  onCheckedChange={() => toggleColumnVisibility(column.key)}
                >
                  {column.label}
                </DropdownMenuCheckboxItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
          
          {/* Action buttons - icons only */}
          <div className="flex items-center gap-2">
            <Button 
              variant="outline" 
              size="sm" 
              className="h-9 w-9 p-0" 
              title="Refresh"
            >
              <ArrowClockwise size={16} />
            </Button>
            <Button 
              variant="outline" 
              size="sm" 
              className="h-9 w-9 p-0" 
              title="Requeue Segmented EOC"
            >
              <Queue size={16} />
            </Button>
            <Button 
              variant="outline" 
              size="sm" 
              className="h-9 w-9 p-0" 
              title="Requeue 508 validations"
            >
              <WarningCircle size={16} />
            </Button>
            <Button 
              variant="outline" 
              size="sm" 
              className="h-9 w-9 p-0" 
              title="Bulk download"
            >
              <Download size={16} />
            </Button>
            <Button 
              variant="outline" 
              size="sm" 
              className="h-9 w-9 p-0" 
              title="Download excel errors"
            >
              <WarningCircle size={16} />
            </Button>
            <Button 
              variant="outline" 
              size="sm" 
              className="h-9 w-9 p-0" 
              title="Upload"
            >
              <UploadSimple size={16} />
            </Button>
            <Button 
              variant="outline" 
              size="sm" 
              className="h-9 w-9 p-0 text-destructive hover:bg-destructive hover:text-destructive-foreground" 
              title="Terminate"
            >
              <X size={16} />
            </Button>
          </div>
        </div>
      </div>
      
      {/* Data Grid */}
      <Card>
        <CardContent className="p-0">
          <div className="border rounded-lg">
            <Table>
              <TableHeader>
                {/* Column Headers with Sort */}
                <TableRow className="bg-muted/30">
                  <TableHead className="w-12 border-r h-12">
                    <Checkbox
                      checked={isAllVisibleSelected}
                      onCheckedChange={handleSelectAll}
                      ref={(el) => {
                        if (el) el.indeterminate = isSomeVisibleSelected && !isAllVisibleSelected
                      }}
                    />
                  </TableHead>
                  {visibleColumns.batchId && (
                    <TableHead className="border-r h-12 min-w-[120px]">
                      <div className="flex items-center gap-1 cursor-pointer select-none font-semibold" onClick={() => handleSort('batchId')}>
                        BatchId
                        {sortField === 'batchId' && (
                          sortDirection === 'asc' ? <CaretUp size={12} /> : <CaretDown size={12} />
                        )}
                      </div>
                    </TableHead>
                  )}
                  {visibleColumns.source && (
                    <TableHead className="border-r h-12 min-w-[140px]">
                      <div className="flex items-center gap-1 cursor-pointer select-none font-semibold" onClick={() => handleSort('source')}>
                        Source
                        {sortField === 'source' && (
                          sortDirection === 'asc' ? <CaretUp size={12} /> : <CaretDown size={12} />
                        )}
                      </div>
                    </TableHead>
                  )}
                  {visibleColumns.mlType && (
                    <TableHead className="border-r h-12 min-w-[100px]">
                      <div className="flex items-center gap-1 cursor-pointer select-none font-semibold" onClick={() => handleSort('mlType')}>
                        Collection Type
                        {sortField === 'mlType' && (
                          sortDirection === 'asc' ? <CaretUp size={12} /> : <CaretDown size={12} />
                        )}
                      </div>
                    </TableHead>
                  )}
                  {visibleColumns.collateralName && (
                    <TableHead className="border-r h-12 min-w-[150px]">
                      <div className="flex items-center gap-1 cursor-pointer select-none font-semibold" onClick={() => handleSort('collateralName')}>
                        Collateral Name
                        {sortField === 'collateralName' && (
                          sortDirection === 'asc' ? <CaretUp size={12} /> : <CaretDown size={12} />
                        )}
                      </div>
                    </TableHead>
                  )}
                  {visibleColumns.fontType && (
                    <TableHead className="border-r h-12 min-w-[100px]">
                      <div className="flex items-center gap-1 cursor-pointer select-none font-semibold" onClick={() => handleSort('fontType')}>
                        Font Type
                        {sortField === 'fontType' && (
                          sortDirection === 'asc' ? <CaretUp size={12} /> : <CaretDown size={12} />
                        )}
                      </div>
                    </TableHead>
                  )}
                  {visibleColumns.productName && (
                    <TableHead className="border-r h-12 min-w-[140px]">
                      <div className="flex items-center gap-1 cursor-pointer select-none font-semibold" onClick={() => handleSort('productName')}>
                        Product Name
                        {sortField === 'productName' && (
                          sortDirection === 'asc' ? <CaretUp size={12} /> : <CaretDown size={12} />
                        )}
                      </div>
                    </TableHead>
                  )}
                  {visibleColumns.folderName && (
                    <TableHead className="border-r h-12 min-w-[200px]">
                      <div className="flex items-center gap-1 cursor-pointer select-none font-semibold" onClick={() => handleSort('folderName')}>
                        Folder Name
                        {sortField === 'folderName' && (
                          sortDirection === 'asc' ? <CaretUp size={12} /> : <CaretDown size={12} />
                        )}
                      </div>
                    </TableHead>
                  )}
                  {visibleColumns.versionNumber && (
                    <TableHead className="border-r h-12 min-w-[130px]">
                      <div className="flex items-center gap-1 cursor-pointer select-none font-semibold" onClick={() => handleSort('versionNumber')}>
                        Version Number
                        {sortField === 'versionNumber' && (
                          sortDirection === 'asc' ? <CaretUp size={12} /> : <CaretDown size={12} />
                        )}
                      </div>
                    </TableHead>
                  )}
                  {visibleColumns.status && (
                    <TableHead className="border-r h-12 min-w-[100px]">
                      <div className="flex items-center gap-1 cursor-pointer select-none font-semibold" onClick={() => handleSort('status')}>
                        Status
                        {sortField === 'status' && (
                          sortDirection === 'asc' ? <CaretUp size={12} /> : <CaretDown size={12} />
                        )}
                      </div>
                    </TableHead>
                  )}
                  {visibleColumns.queuedDate && (
                    <TableHead className="border-r h-12 min-w-[160px]">
                      <div className="flex items-center gap-1 cursor-pointer select-none font-semibold" onClick={() => handleSort('queuedDate')}>
                        Queued Date
                        {sortField === 'queuedDate' && (
                          sortDirection === 'asc' ? <CaretUp size={12} /> : <CaretDown size={12} />
                        )}
                      </div>
                    </TableHead>
                  )}
                  {visibleColumns.processedDate && (
                    <TableHead className="border-r h-12 min-w-[160px]">
                      <div className="flex items-center gap-1 cursor-pointer select-none font-semibold" onClick={() => handleSort('processedDate')}>
                        Processed Date
                        {sortField === 'processedDate' && (
                          sortDirection === 'asc' ? <CaretUp size={12} /> : <CaretDown size={12} />
                        )}
                      </div>
                    </TableHead>
                  )}
                  {visibleColumns.userName && (
                    <TableHead className="border-r h-12 min-w-[140px]">
                      <div className="flex items-center gap-1 cursor-pointer select-none font-semibold" onClick={() => handleSort('userName')}>
                        UserName
                        {sortField === 'userName' && (
                          sortDirection === 'asc' ? <CaretUp size={12} /> : <CaretDown size={12} />
                        )}
                      </div>
                    </TableHead>
                  )}
                  {visibleColumns.downloadPdf && (
                    <TableHead className="border-r h-12 text-center min-w-[120px]">
                      Download PDF
                    </TableHead>
                  )}
                  {visibleColumns.downloadJson && (
                    <TableHead className="h-12 text-center min-w-[120px]">
                      Download Word
                    </TableHead>
                  )}
                </TableRow>

                {/* Filter Row */}
                <TableRow className="bg-white border-b-2">
                  <TableHead className="p-2 border-r">
                    {/* Empty cell for checkbox column */}
                  </TableHead>
                  {visibleColumns.batchId && (
                    <TableHead className="p-2 border-r">
                      <div className="relative">
                        <MagnifyingGlass size={14} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
                        <Input
                          value={columnFilters.batchId}
                          onChange={(e) => updateColumnFilter('batchId', e.target.value)}
                          className="pl-9 h-8 text-sm"
                        />
                        {columnFilters.batchId && (
                          <Button
                            variant="ghost"
                            size="sm"
                            className="absolute right-2 top-1/2 transform -translate-y-1/2 h-6 w-6 p-0"
                            onClick={() => clearColumnFilter('batchId')}
                          >
                            <X size={12} />
                          </Button>
                        )}
                      </div>
                    </TableHead>
                  )}
                  {visibleColumns.source && (
                    <TableHead className="p-2 border-r">
                      <div className="relative">
                        <MagnifyingGlass size={14} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
                        <Input
                          value={columnFilters.source}
                          onChange={(e) => updateColumnFilter('source', e.target.value)}
                          className="pl-9 h-8 text-sm"
                        />
                        {columnFilters.source && (
                          <Button
                            variant="ghost"
                            size="sm"
                            className="absolute right-2 top-1/2 transform -translate-y-1/2 h-6 w-6 p-0"
                            onClick={() => clearColumnFilter('source')}
                          >
                            <X size={12} />
                          </Button>
                        )}
                      </div>
                    </TableHead>
                  )}
                  {visibleColumns.mlType && (
                    <TableHead className="p-2 border-r">
                      <div className="relative">
                        <MagnifyingGlass size={14} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
                        <Input
                          value={columnFilters.mlType}
                          onChange={(e) => updateColumnFilter('mlType', e.target.value)}
                          className="pl-9 h-8 text-sm"
                        />
                        {columnFilters.mlType && (
                          <Button
                            variant="ghost"
                            size="sm"
                            className="absolute right-2 top-1/2 transform -translate-y-1/2 h-6 w-6 p-0"
                            onClick={() => clearColumnFilter('mlType')}
                          >
                            <X size={12} />
                          </Button>
                        )}
                      </div>
                    </TableHead>
                  )}
                  {visibleColumns.collateralName && (
                    <TableHead className="p-2 border-r">
                      <div className="relative">
                        <MagnifyingGlass size={14} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
                        <Input
                          value={columnFilters.collateralName}
                          onChange={(e) => updateColumnFilter('collateralName', e.target.value)}
                          className="pl-9 h-8 text-sm"
                        />
                        {columnFilters.collateralName && (
                          <Button
                            variant="ghost"
                            size="sm"
                            className="absolute right-2 top-1/2 transform -translate-y-1/2 h-6 w-6 p-0"
                            onClick={() => clearColumnFilter('collateralName')}
                          >
                            <X size={12} />
                          </Button>
                        )}
                      </div>
                    </TableHead>
                  )}
                  {visibleColumns.fontType && (
                    <TableHead className="p-2 border-r">
                      <div className="relative">
                        <MagnifyingGlass size={14} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
                        <Input
                          value={columnFilters.fontType}
                          onChange={(e) => updateColumnFilter('fontType', e.target.value)}
                          className="pl-9 h-8 text-sm"
                        />
                        {columnFilters.fontType && (
                          <Button
                            variant="ghost"
                            size="sm"
                            className="absolute right-2 top-1/2 transform -translate-y-1/2 h-6 w-6 p-0"
                            onClick={() => clearColumnFilter('fontType')}
                          >
                            <X size={12} />
                          </Button>
                        )}
                      </div>
                    </TableHead>
                  )}
                  {visibleColumns.productName && (
                    <TableHead className="p-2 border-r">
                      <div className="relative">
                        <MagnifyingGlass size={14} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
                        <Input
                          value={columnFilters.productName}
                          onChange={(e) => updateColumnFilter('productName', e.target.value)}
                          className="pl-9 h-8 text-sm"
                        />
                        {columnFilters.productName && (
                          <Button
                            variant="ghost"
                            size="sm"
                            className="absolute right-2 top-1/2 transform -translate-y-1/2 h-6 w-6 p-0"
                            onClick={() => clearColumnFilter('productName')}
                          >
                            <X size={12} />
                          </Button>
                        )}
                      </div>
                    </TableHead>
                  )}
                  {visibleColumns.folderName && (
                    <TableHead className="p-2 border-r">
                      <div className="relative">
                        <MagnifyingGlass size={14} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
                        <Input
                          value={columnFilters.folderName}
                          onChange={(e) => updateColumnFilter('folderName', e.target.value)}
                          className="pl-9 h-8 text-sm"
                        />
                        {columnFilters.folderName && (
                          <Button
                            variant="ghost"
                            size="sm"
                            className="absolute right-2 top-1/2 transform -translate-y-1/2 h-6 w-6 p-0"
                            onClick={() => clearColumnFilter('folderName')}
                          >
                            <X size={12} />
                          </Button>
                        )}
                      </div>
                    </TableHead>
                  )}
                  {visibleColumns.versionNumber && (
                    <TableHead className="p-2 border-r">
                      <div className="relative">
                        <MagnifyingGlass size={14} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
                        <Input
                          value={columnFilters.versionNumber}
                          onChange={(e) => updateColumnFilter('versionNumber', e.target.value)}
                          className="pl-9 h-8 text-sm"
                        />
                        {columnFilters.versionNumber && (
                          <Button
                            variant="ghost"
                            size="sm"
                            className="absolute right-2 top-1/2 transform -translate-y-1/2 h-6 w-6 p-0"
                            onClick={() => clearColumnFilter('versionNumber')}
                          >
                            <X size={12} />
                          </Button>
                        )}
                      </div>
                    </TableHead>
                  )}
                  {visibleColumns.status && (
                    <TableHead className="p-2 border-r">
                      <div className="relative">
                        <MagnifyingGlass size={14} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
                        <Input
                          value={columnFilters.status}
                          onChange={(e) => updateColumnFilter('status', e.target.value)}
                          className="pl-9 h-8 text-sm"
                        />
                        {columnFilters.status && (
                          <Button
                            variant="ghost"
                            size="sm"
                            className="absolute right-2 top-1/2 transform -translate-y-1/2 h-6 w-6 p-0"
                            onClick={() => clearColumnFilter('status')}
                          >
                            <X size={12} />
                          </Button>
                        )}
                      </div>
                    </TableHead>
                  )}
                  {visibleColumns.queuedDate && (
                    <TableHead className="p-2 border-r">
                      <div className="relative">
                        <MagnifyingGlass size={14} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
                        <Input
                          value={columnFilters.queuedDate}
                          onChange={(e) => updateColumnFilter('queuedDate', e.target.value)}
                          className="pl-9 h-8 text-sm"
                        />
                        {columnFilters.queuedDate && (
                          <Button
                            variant="ghost"
                            size="sm"
                            className="absolute right-2 top-1/2 transform -translate-y-1/2 h-6 w-6 p-0"
                            onClick={() => clearColumnFilter('queuedDate')}
                          >
                            <X size={12} />
                          </Button>
                        )}
                      </div>
                    </TableHead>
                  )}
                  {visibleColumns.processedDate && (
                    <TableHead className="p-2 border-r">
                      <div className="relative">
                        <MagnifyingGlass size={14} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
                        <Input
                          value={columnFilters.processedDate}
                          onChange={(e) => updateColumnFilter('processedDate', e.target.value)}
                          className="pl-9 h-8 text-sm"
                        />
                        {columnFilters.processedDate && (
                          <Button
                            variant="ghost"
                            size="sm"
                            className="absolute right-2 top-1/2 transform -translate-y-1/2 h-6 w-6 p-0"
                            onClick={() => clearColumnFilter('processedDate')}
                          >
                            <X size={12} />
                          </Button>
                        )}
                      </div>
                    </TableHead>
                  )}
                  {visibleColumns.userName && (
                    <TableHead className="p-2 border-r">
                      <div className="relative">
                        <MagnifyingGlass size={14} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
                        <Input
                          value={columnFilters.userName}
                          onChange={(e) => updateColumnFilter('userName', e.target.value)}
                          className="pl-9 h-8 text-sm"
                        />
                        {columnFilters.userName && (
                          <Button
                            variant="ghost"
                            size="sm"
                            className="absolute right-2 top-1/2 transform -translate-y-1/2 h-6 w-6 p-0"
                            onClick={() => clearColumnFilter('userName')}
                          >
                            <X size={12} />
                          </Button>
                        )}
                      </div>
                    </TableHead>
                  )}
                  {visibleColumns.downloadPdf && (
                    <TableHead className="p-2 border-r">
                      {/* Empty for Download PDF column */}
                    </TableHead>
                  )}
                  {visibleColumns.downloadJson && (
                    <TableHead className="p-2">
                      {/* Empty for Download JSON column */}
                    </TableHead>
                  )}
                </TableRow>
              </TableHeader>
              <TableBody>
                {currentPageData.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={Object.values(visibleColumns).filter(Boolean).length + 1} className="text-center py-8 text-muted-foreground">
                      {Object.values(columnFilters).some(filter => filter !== '') 
                        ? "No items match the current filters" 
                        : "No queued items available"
                      }
                    </TableCell>
                  </TableRow>
                ) : (
                  currentPageData.map((item, index) => (
                    <TableRow 
                      key={item.id} 
                      className={`
                        ${selectedRows.includes(item.id) ? 'bg-blue-50 border-blue-200' : 'hover:bg-muted/30'}
                        ${index % 2 === 0 ? 'bg-white' : 'bg-slate-50/30'}
                        border-b transition-colors h-11
                      `}
                    >
                      <TableCell className="border-r p-3">
                        <Checkbox
                          checked={selectedRows.includes(item.id)}
                          onCheckedChange={(checked) => 
                            handleRowSelect(item.id, checked as boolean)
                          }
                        />
                      </TableCell>
                      {visibleColumns.batchId && (
                        <TableCell className="font-mono text-blue-600 font-medium border-r p-3 text-sm">
                          {item.batchId}
                        </TableCell>
                      )}
                      {visibleColumns.source && (
                        <TableCell className="border-r p-3 text-sm">
                          {item.source || (
                            <span className="text-muted-foreground italic">—</span>
                          )}
                        </TableCell>
                      )}
                      {visibleColumns.mlType && (
                        <TableCell className="border-r p-3">
                          <Badge variant="outline" className="text-xs font-medium">
                            {item.mlType}
                          </Badge>
                        </TableCell>
                      )}
                      {visibleColumns.collateralName && (
                        <TableCell className="border-r p-3 text-sm font-medium">
                          {item.collateralName}
                        </TableCell>
                      )}
                      {visibleColumns.fontType && (
                        <TableCell className="border-r p-3 text-sm">
                          <Badge variant="secondary" className="text-xs">
                            {item.fontType}
                          </Badge>
                        </TableCell>
                      )}
                      {visibleColumns.productName && (
                        <TableCell className="border-r p-3 text-sm font-mono">
                          {item.productName}
                        </TableCell>
                      )}
                      {visibleColumns.folderName && (
                        <TableCell className="border-r p-3 text-sm font-mono max-w-52 truncate" title={item.folderName}>
                          {item.folderName}
                        </TableCell>
                      )}
                      {visibleColumns.versionNumber && (
                        <TableCell className="border-r p-3">
                          <Badge variant="outline" className="font-mono text-xs">
                            {item.versionNumber}
                          </Badge>
                        </TableCell>
                      )}
                      {visibleColumns.status && (
                        <TableCell className="border-r p-3">
                          <Badge variant="default" className="bg-green-100 text-green-800 border-green-300 text-xs font-medium">
                            {item.status}
                          </Badge>
                        </TableCell>
                      )}
                      {visibleColumns.queuedDate && (
                        <TableCell className="border-r p-3 text-sm font-mono">
                          {item.queuedDate}
                        </TableCell>
                      )}
                      {visibleColumns.processedDate && (
                        <TableCell className="border-r p-3 text-sm font-mono">
                          {item.processedDate}
                        </TableCell>
                      )}
                      {visibleColumns.userName && (
                        <TableCell className="border-r p-3 text-sm font-medium">
                          {item.userName}
                        </TableCell>
                      )}
                      {visibleColumns.downloadPdf && (
                        <TableCell className="border-r p-3 text-center">
                          <div className="flex items-center justify-center gap-2">
                            <Button variant="ghost" size="sm" className="h-7 w-7 p-0 text-red-600 hover:bg-red-50" title="Download PDF">
                              <Download size={16} />
                            </Button>
                            <Button variant="ghost" size="sm" className="h-7 w-7 p-0 text-orange-600 hover:bg-orange-50" title="Download Alt PDF">
                              <Download size={16} />
                            </Button>
                          </div>
                        </TableCell>
                      )}
                      {visibleColumns.downloadJson && (
                        <TableCell className="p-3 text-center">
                          <div className="flex items-center justify-center gap-2">
                            <Button variant="ghost" size="sm" className="h-7 w-7 p-0 text-blue-600 hover:bg-blue-50" title="Download JSON">
                              <Download size={16} />
                            </Button>
                            <Button variant="ghost" size="sm" className="h-7 w-7 p-0 text-gray-600 hover:bg-gray-50" title="Download Other">
                              <Download size={16} />
                            </Button>
                          </div>
                        </TableCell>
                      )}
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
          
          {/* Enhanced Pagination Controls */}
          <div className="flex items-center justify-between mt-4 px-4 pb-4 text-sm text-muted-foreground border-t bg-muted/20">
            <div className="flex items-center gap-4">
              <span className="font-medium">
                Showing {startIndex + 1} - {Math.min(endIndex, filteredAndSortedData.length)} of {filteredAndSortedData.length}
                {queuedData.length !== filteredAndSortedData.length && (
                  <span className="text-blue-600 font-medium">
                    {' '}(filtered from {queuedData.length} total)
                  </span>
                )}
              </span>
              {selectedRows.length > 0 && (
                <Badge variant="secondary" className="text-xs px-2 py-1">
                  {selectedRows.length} selected
                </Badge>
              )}
            </div>
            
            {totalPages > 1 && (
              <div className="flex items-center gap-3">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setCurrentPage(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="h-8 w-8 p-0"
                >
                  <CaretLeft size={14} />
                </Button>
                
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium">Page</span>
                  <Input
                    type="number"
                    min="1"
                    max={totalPages}
                    value={currentPage}
                    onChange={(e) => {
                      const page = parseInt(e.target.value)
                      if (page >= 1 && page <= totalPages) {
                        setCurrentPage(page)
                      }
                    }}
                    className="w-16 h-8 text-center text-sm font-medium"
                  />
                  <span className="text-sm font-medium">of {totalPages}</span>
                </div>
                
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setCurrentPage(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className="h-8 w-8 p-0"
                >
                  <CaretRight size={14} />
                </Button>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export function Publish() {
  const [sortField, setSortField] = useState<string | null>(null)
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc')
  const [currentPage, setCurrentPage] = useState(1)
  const [pageSize, setPageSize] = useState(50)
  const [selectedRows, setSelectedRows] = useKV('publish-selected-rows', [] as string[])
  
  // Global filters
  const [globalFilters, setGlobalFilters] = useState({
    planYear: '2026',
    ruleId: '',
    rowVersionId: '',
    contractNumber: '',
    benefitType: '--select-one--',
    benefitCategory: '--select-one--',
    businessArea: 'Portals',
    subBusinessArea: '--Select One--',
    jsonCreatedDateFrom: '',
    jsonCreatedDateTo: ''
  })
  
  // Column filters
  const [columnFilters, setColumnFilters] = useState({
    eventSequence: '',
    ruleId: '',
    rowVersion: '',
    benefitType: '',
    benefitCategory: '',
    businessArea: '',
    subBusinessArea: '',
    createdOn: '',
    jsonData: '',
    isPublished: ''
  })
  
  // Column visibility state
  const [visibleColumns, setVisibleColumns] = useKV('publish-visible-columns', {
    eventSequence: true,
    ruleId: true,
    rowVersion: true,
    benefitType: true,
    benefitCategory: true,
    businessArea: true,
    subBusinessArea: true,
    createdOn: true,
    jsonData: true,
    isPublished: true,
    downloadJs: true
  })
  
  // Sample data based on the screenshot
  const publishData = [
    {
      id: '35782391',
      eventSequence: '35782391',
      ruleId: '24537',
      rowVersion: '1.0',
      benefitType: 'OTC and VBID Food Allowance',
      benefitCategory: 'Medical',
      businessArea: 'Portals',
      subBusinessArea: 'Claims Processing Module',
      createdOn: '2025-08-20 10:04:18',
      jsonData: 'Insert',
      isPublished: 'Yes'
    },
    {
      id: '35782390',
      eventSequence: '35782390',
      ruleId: '24537',
      rowVersion: '1.0',
      benefitType: 'OTC and VBID Food Allowance',
      benefitCategory: 'Medical',
      businessArea: 'Portals',
      subBusinessArea: 'Claims Processing Module',
      createdOn: '2025-08-20 10:04:18',
      jsonData: 'Insert',
      isPublished: 'Yes'
    },
    {
      id: '35782389',
      eventSequence: '35782389',
      ruleId: '24537',
      rowVersion: '1.0',
      benefitType: 'OTC and VBID Food Allowance',
      benefitCategory: 'Medical',
      businessArea: 'Portals',
      subBusinessArea: 'Claims Processing Module',
      createdOn: '2025-08-20 10:04:18',
      jsonData: 'Insert',
      isPublished: 'Yes'
    },
    {
      id: '35782388',
      eventSequence: '35782388',
      ruleId: '24537',
      rowVersion: '1.0',
      benefitType: 'OTC and VBID Food Allowance',
      benefitCategory: 'Medical',
      businessArea: 'Portals',
      subBusinessArea: 'Claims Processing Module',
      createdOn: '2025-08-20 10:04:18',
      jsonData: 'Insert',
      isPublished: 'Yes'
    },
    {
      id: '35782387',
      eventSequence: '35782387',
      ruleId: '24512',
      rowVersion: '1.0',
      benefitType: 'OTC and VBID Food Allowance',
      benefitCategory: 'Medical',
      businessArea: 'Portals',
      subBusinessArea: 'Member Portal Enhancement',
      createdOn: '2025-08-20 10:03:38',
      jsonData: 'Insert',
      isPublished: 'Yes'
    },
    {
      id: '35782386',
      eventSequence: '35782386',
      ruleId: '24512',
      rowVersion: '1.0',
      benefitType: 'OTC and VBID Food Allowance',
      benefitCategory: 'Medical',
      businessArea: 'Portals',
      subBusinessArea: 'Member Portal Enhancement',
      createdOn: '2025-08-20 10:03:38',
      jsonData: 'Insert',
      isPublished: 'Yes'
    },
    {
      id: '35782385',
      eventSequence: '35782385',
      ruleId: '24512',
      rowVersion: '1.0',
      benefitType: 'OTC and VBID Food Allowance',
      benefitCategory: 'Medical',
      businessArea: 'Portals',
      subBusinessArea: 'Provider Directory System',
      createdOn: '2025-08-20 10:03:38',
      jsonData: 'Insert',
      isPublished: 'Yes'
    },
    {
      id: '35782384',
      eventSequence: '35782384',
      ruleId: '24512',
      rowVersion: '1.0',
      benefitType: 'OTC and VBID Food Allowance',
      benefitCategory: 'Medical',
      businessArea: 'Portals',
      subBusinessArea: 'Provider Directory System',
      createdOn: '2025-08-20 10:03:38',
      jsonData: 'Insert',
      isPublished: 'Yes'
    },
    {
      id: '35782383',
      eventSequence: '35782383',
      ruleId: '24489',
      rowVersion: '1.0',
      benefitType: 'OTC Items - Debit Card',
      benefitCategory: 'Medical',
      businessArea: 'Portals',
      subBusinessArea: 'Provider Directory System',
      createdOn: '2025-08-20 09:56:24',
      jsonData: 'Insert',
      isPublished: 'Yes'
    },
    {
      id: '35782382',
      eventSequence: '35782382',
      ruleId: '24489',
      rowVersion: '1.0',
      benefitType: 'OTC Items - Debit Card',
      benefitCategory: 'Medical',
      businessArea: 'Portals',
      subBusinessArea: 'Provider Directory System',
      createdOn: '2025-08-20 09:56:24',
      jsonData: 'Insert',
      isPublished: 'Yes'
    },
    {
      id: '35782381',
      eventSequence: '35782381',
      ruleId: '24488',
      rowVersion: '1.0',
      benefitType: 'OTC and VBID Food Allowance',
      benefitCategory: 'Medical',
      businessArea: 'Portals',
      subBusinessArea: 'Benefits Administration',
      createdOn: '2025-08-20 09:55:54',
      jsonData: 'Insert',
      isPublished: 'Yes'
    }
  ]
  
  // Available columns configuration
  const availableColumns = [
    { key: 'eventSequence', label: 'EventSequence' },
    { key: 'ruleId', label: 'Rule ID' },
    { key: 'rowVersion', label: 'Row Version' },
    { key: 'benefitType', label: 'Benefit Type' },
    { key: 'benefitCategory', label: 'Benefit Category' },
    { key: 'businessArea', label: 'Business Area' },
    { key: 'subBusinessArea', label: 'SubBusiness Area' },
    { key: 'createdOn', label: 'Created On' },
    { key: 'jsonData', label: 'JsonData' },
    { key: 'isPublished', label: 'IsPublished' },
    { key: 'downloadJs', label: 'Download JS...' }
  ]
  
  // Filter and sort data
  const filteredAndSortedData = useMemo(() => {
    let filtered = publishData.filter(item => {
      // Apply column filters
      if (columnFilters.eventSequence && !item.eventSequence.toLowerCase().includes(columnFilters.eventSequence.toLowerCase())) {
        return false
      }
      if (columnFilters.ruleId && !item.ruleId.toLowerCase().includes(columnFilters.ruleId.toLowerCase())) {
        return false
      }
      if (columnFilters.rowVersion && !item.rowVersion.toLowerCase().includes(columnFilters.rowVersion.toLowerCase())) {
        return false
      }
      if (columnFilters.benefitType && !item.benefitType.toLowerCase().includes(columnFilters.benefitType.toLowerCase())) {
        return false
      }
      if (columnFilters.benefitCategory && !item.benefitCategory.toLowerCase().includes(columnFilters.benefitCategory.toLowerCase())) {
        return false
      }
      if (columnFilters.businessArea && !item.businessArea.toLowerCase().includes(columnFilters.businessArea.toLowerCase())) {
        return false
      }
      if (columnFilters.subBusinessArea && !item.subBusinessArea.toLowerCase().includes(columnFilters.subBusinessArea.toLowerCase())) {
        return false
      }
      if (columnFilters.createdOn && !item.createdOn.toLowerCase().includes(columnFilters.createdOn.toLowerCase())) {
        return false
      }
      if (columnFilters.jsonData && !item.jsonData.toLowerCase().includes(columnFilters.jsonData.toLowerCase())) {
        return false
      }
      if (columnFilters.isPublished && !item.isPublished.toLowerCase().includes(columnFilters.isPublished.toLowerCase())) {
        return false
      }
      
      return true
    })
    
    if (sortField) {
      filtered.sort((a, b) => {
        const aValue = a[sortField as keyof typeof a] || ''
        const bValue = b[sortField as keyof typeof b] || ''
        
        if (sortDirection === 'asc') {
          return aValue.toString().localeCompare(bValue.toString())
        } else {
          return bValue.toString().localeCompare(aValue.toString())
        }
      })
    }
    
    return filtered
  }, [publishData, sortField, sortDirection, columnFilters])
  
  // Pagination calculations
  const totalPages = Math.ceil(filteredAndSortedData.length / pageSize)
  const startIndex = (currentPage - 1) * pageSize
  const endIndex = startIndex + pageSize
  const currentPageData = filteredAndSortedData.slice(startIndex, endIndex)
  
  // Reset to page 1 when sort or filters change
  useEffect(() => {
    setCurrentPage(1)
  }, [sortField, sortDirection, columnFilters, globalFilters])
  
  const handleSort = (field: string) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc')
    } else {
      setSortField(field)
      setSortDirection('asc')
    }
  }
  
  const handleRowSelect = (rowId: string, checked: boolean) => {
    setSelectedRows((current: string[]) => 
      checked ? [...current, rowId] : current.filter(id => id !== rowId)
    )
  }
  
  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      const allVisibleIds = currentPageData.map(item => item.id)
      setSelectedRows((current: string[]) => {
        const newSet = new Set([...current, ...allVisibleIds])
        return Array.from(newSet)
      })
    } else {
      const visibleIds = new Set(currentPageData.map(item => item.id))
      setSelectedRows((current: string[]) => 
        current.filter(id => !visibleIds.has(id))
      )
    }
  }
  
  const updateColumnFilter = (column: string, value: string) => {
    setColumnFilters(prev => ({
      ...prev,
      [column]: value
    }))
  }
  
  const clearColumnFilter = (column: string) => {
    setColumnFilters(prev => ({
      ...prev,
      [column]: ''
    }))
  }
  
  const toggleColumnVisibility = (columnKey: string) => {
    setVisibleColumns((current: any) => ({
      ...current,
      [columnKey]: !current[columnKey]
    }))
  }
  
  const updateGlobalFilter = (field: string, value: string) => {
    setGlobalFilters(prev => ({
      ...prev,
      [field]: value
    }))
  }
  
  const clearGlobalFilters = () => {
    setGlobalFilters({
      planYear: '2026',
      ruleId: '',
      rowVersionId: '',
      contractNumber: '',
      benefitType: '--select-one--',
      benefitCategory: '--select-one--',
      businessArea: 'Portals',
      subBusinessArea: '--Select One--',
      jsonCreatedDateFrom: '',
      jsonCreatedDateTo: ''
    })
  }
  
  const searchData = () => {
    // Implement search functionality based on global filters
    console.log('Searching with filters:', globalFilters)
  }
  
  const isAllVisibleSelected = currentPageData.length > 0 && 
    currentPageData.every(item => selectedRows.includes(item.id))
  
  const isSomeVisibleSelected = currentPageData.some(item => selectedRows.includes(item.id))

  return (
    <div className="p-4 space-y-6">
      <div className="mb-4">
        <h1 className="text-2xl font-semibold text-foreground mb-2">Publish</h1>
        <p className="text-muted-foreground">Manage and publish JSON data</p>
      </div>

      {/* Global Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="space-y-4">
            {/* First Row */}
            <div className="grid grid-cols-5 gap-4">
              <div className="space-y-2">
                <Label className="text-sm font-medium">
                  Plan Year <span className="text-red-500">*</span>
                </Label>
                <Select value={globalFilters.planYear} onValueChange={(value) => updateGlobalFilter('planYear', value)}>
                  <SelectTrigger className="h-9">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="2026">2026</SelectItem>
                    <SelectItem value="2025">2025</SelectItem>
                    <SelectItem value="2024">2024</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label className="text-sm font-medium">Rule ID:</Label>
                <Input
                  value={globalFilters.ruleId}
                  onChange={(e) => updateGlobalFilter('ruleId', e.target.value)}
                  placeholder="Type here"
                  className="h-9"
                />
              </div>
              
              <div className="space-y-2">
                <Label className="text-sm font-medium">Row Version ID:</Label>
                <Input
                  value={globalFilters.rowVersionId}
                  onChange={(e) => updateGlobalFilter('rowVersionId', e.target.value)}
                  placeholder="Type here"
                  className="h-9"
                />
              </div>
              
              <div className="space-y-2">
                <Label className="text-sm font-medium">Contract Number:</Label>
                <Input
                  value={globalFilters.contractNumber}
                  onChange={(e) => updateGlobalFilter('contractNumber', e.target.value)}
                  placeholder="Type here"
                  className="h-9"
                />
              </div>
              
              <div className="space-y-2">
                <Label className="text-sm font-medium">Benefit Type:</Label>
                <Select value={globalFilters.benefitType} onValueChange={(value) => updateGlobalFilter('benefitType', value)}>
                  <SelectTrigger className="h-9">
                    <SelectValue placeholder="--Select One--" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="--select-one--">--Select One--</SelectItem>
                    <SelectItem value="otc-and-vbid-food">OTC and VBID Food Allowance</SelectItem>
                    <SelectItem value="otc-debit-card">OTC Items - Debit Card</SelectItem>
                    <SelectItem value="medical">Medical</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            {/* Second Row */}
            <div className="grid grid-cols-5 gap-4">
              <div className="space-y-2">
                <Label className="text-sm font-medium">Benefit Category:</Label>
                <Select value={globalFilters.benefitCategory} onValueChange={(value) => updateGlobalFilter('benefitCategory', value)}>
                  <SelectTrigger className="h-9">
                    <SelectValue placeholder="--Select One--" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="--select-one--">--Select One--</SelectItem>
                    <SelectItem value="medical">Medical</SelectItem>
                    <SelectItem value="pharmacy">Pharmacy</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label className="text-sm font-medium">Business Area <span className="text-red-500">*</span>:</Label>
                <Select value={globalFilters.businessArea} onValueChange={(value) => updateGlobalFilter('businessArea', value)}>
                  <SelectTrigger className="h-9">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Portals">Portals</SelectItem>
                    <SelectItem value="Claims">Claims</SelectItem>
                    <SelectItem value="Benefits">Benefits</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label className="text-sm font-medium">SubBusiness Area:</Label>
                <Select value={globalFilters.subBusinessArea} onValueChange={(value) => updateGlobalFilter('subBusinessArea', value)}>
                  <SelectTrigger className="h-9">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="--Select One--">--Select One--</SelectItem>
                    <SelectItem value="Claims Processing Module">Claims Processing Module</SelectItem>
                    <SelectItem value="Member Portal Enhancement">Member Portal Enhancement</SelectItem>
                    <SelectItem value="Provider Directory System">Provider Directory System</SelectItem>
                    <SelectItem value="Benefits Administration">Benefits Administration</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label className="text-sm font-medium">JSON Created Date:</Label>
                <div className="flex gap-2">
                  <Input
                    type="date"
                    value={globalFilters.jsonCreatedDateFrom}
                    onChange={(e) => updateGlobalFilter('jsonCreatedDateFrom', e.target.value)}
                    className="h-9 flex-1"
                  />
                  <Input
                    type="date"
                    value={globalFilters.jsonCreatedDateTo}
                    onChange={(e) => updateGlobalFilter('jsonCreatedDateTo', e.target.value)}
                    className="h-9 flex-1"
                  />
                </div>
              </div>
              
              <div className="flex items-end gap-2">
                <Button onClick={searchData} className="bg-green-600 hover:bg-green-700 h-9 px-6">
                  Search
                </Button>
                <Button variant="outline" onClick={clearGlobalFilters} className="h-9 px-6">
                  Clear
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Status Information */}
      <div className="flex items-center justify-end text-sm text-muted-foreground space-x-6">
        <div>JSONs Created: <span className="font-semibold text-foreground">569226</span></div>
        <div>JSONs Published: <span className="font-semibold text-foreground">569226</span></div>
        <div>JSONs in BCSDB DB: <span className="font-semibold text-foreground">567647</span></div>
      </div>

      {/* Data Grid Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <h3 className="text-lg font-medium">Publish Audit</h3>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm" className="h-8 w-8 p-0" title="Refresh data">
              <ArrowClockwise size={14} />
            </Button>
            <Button variant="ghost" size="sm" className="h-8 w-8 p-0" title="Download audit data">
              <Download size={14} />
            </Button>
            <Button variant="ghost" size="sm" className="h-8 w-8 p-0" title="Move up">
              <ArrowUp size={14} />
            </Button>
            <Button variant="ghost" size="sm" className="h-8 w-8 p-0" title="Move down">
              <ArrowDown size={14} />
            </Button>
          </div>
        </div>
        
        <div className="flex items-center gap-3">
          <span className="text-sm">Page 1 of 200</span>
          <span className="text-sm">View 1 - 50 of 10,000</span>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="flex items-center gap-2 h-9">
                <Columns size={16} />
                Columns
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-64">
              {availableColumns.map((column) => (
                <DropdownMenuCheckboxItem
                  key={column.key}
                  checked={visibleColumns[column.key]}
                  onCheckedChange={() => toggleColumnVisibility(column.key)}
                >
                  {column.label}
                </DropdownMenuCheckboxItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* Data Grid */}
      <Card>
        <CardContent className="p-0">
          <div className="border rounded-lg overflow-x-auto">
            <Table>
              <TableHeader>
                {/* Column Headers with Sort */}
                <TableRow className="bg-muted/30">
                  <TableHead className="w-12 border-r h-12">
                    <Checkbox
                      checked={isAllVisibleSelected}
                      onCheckedChange={handleSelectAll}
                      ref={(el) => {
                        if (el) el.indeterminate = isSomeVisibleSelected && !isAllVisibleSelected
                      }}
                    />
                  </TableHead>
                  {visibleColumns.eventSequence && (
                    <TableHead className="border-r h-12 min-w-[120px]">
                      <div className="flex items-center gap-1 cursor-pointer select-none font-semibold" onClick={() => handleSort('eventSequence')}>
                        EventSequence
                        {sortField === 'eventSequence' && (
                          sortDirection === 'asc' ? <CaretUp size={12} /> : <CaretDown size={12} />
                        )}
                      </div>
                    </TableHead>
                  )}
                  {visibleColumns.ruleId && (
                    <TableHead className="border-r h-12 min-w-[100px]">
                      <div className="flex items-center gap-1 cursor-pointer select-none font-semibold" onClick={() => handleSort('ruleId')}>
                        Rule ID
                        {sortField === 'ruleId' && (
                          sortDirection === 'asc' ? <CaretUp size={12} /> : <CaretDown size={12} />
                        )}
                      </div>
                    </TableHead>
                  )}
                  {visibleColumns.rowVersion && (
                    <TableHead className="border-r h-12 min-w-[100px]">
                      <div className="flex items-center gap-1 cursor-pointer select-none font-semibold" onClick={() => handleSort('rowVersion')}>
                        Row Version
                        {sortField === 'rowVersion' && (
                          sortDirection === 'asc' ? <CaretUp size={12} /> : <CaretDown size={12} />
                        )}
                      </div>
                    </TableHead>
                  )}
                  {visibleColumns.benefitType && (
                    <TableHead className="border-r h-12 min-w-[200px]">
                      <div className="flex items-center gap-1 cursor-pointer select-none font-semibold" onClick={() => handleSort('benefitType')}>
                        Benefit Type
                        {sortField === 'benefitType' && (
                          sortDirection === 'asc' ? <CaretUp size={12} /> : <CaretDown size={12} />
                        )}
                      </div>
                    </TableHead>
                  )}
                  {visibleColumns.benefitCategory && (
                    <TableHead className="border-r h-12 min-w-[130px]">
                      <div className="flex items-center gap-1 cursor-pointer select-none font-semibold" onClick={() => handleSort('benefitCategory')}>
                        Benefit Category
                        {sortField === 'benefitCategory' && (
                          sortDirection === 'asc' ? <CaretUp size={12} /> : <CaretDown size={12} />
                        )}
                      </div>
                    </TableHead>
                  )}
                  {visibleColumns.businessArea && (
                    <TableHead className="border-r h-12 min-w-[120px]">
                      <div className="flex items-center gap-1 cursor-pointer select-none font-semibold" onClick={() => handleSort('businessArea')}>
                        Business Area
                        {sortField === 'businessArea' && (
                          sortDirection === 'asc' ? <CaretUp size={12} /> : <CaretDown size={12} />
                        )}
                      </div>
                    </TableHead>
                  )}
                  {visibleColumns.subBusinessArea && (
                    <TableHead className="border-r h-12 min-w-[180px]">
                      <div className="flex items-center gap-1 cursor-pointer select-none font-semibold" onClick={() => handleSort('subBusinessArea')}>
                        SubBusiness Area
                        {sortField === 'subBusinessArea' && (
                          sortDirection === 'asc' ? <CaretUp size={12} /> : <CaretDown size={12} />
                        )}
                      </div>
                    </TableHead>
                  )}
                  {visibleColumns.createdOn && (
                    <TableHead className="border-r h-12 min-w-[160px]">
                      <div className="flex items-center gap-1 cursor-pointer select-none font-semibold" onClick={() => handleSort('createdOn')}>
                        Created On
                        {sortField === 'createdOn' && (
                          sortDirection === 'asc' ? <CaretUp size={12} /> : <CaretDown size={12} />
                        )}
                      </div>
                    </TableHead>
                  )}
                  {visibleColumns.jsonData && (
                    <TableHead className="border-r h-12 min-w-[100px]">
                      <div className="flex items-center gap-1 cursor-pointer select-none font-semibold" onClick={() => handleSort('jsonData')}>
                        JsonData
                        {sortField === 'jsonData' && (
                          sortDirection === 'asc' ? <CaretUp size={12} /> : <CaretDown size={12} />
                        )}
                      </div>
                    </TableHead>
                  )}
                  {visibleColumns.isPublished && (
                    <TableHead className="border-r h-12 min-w-[110px]">
                      <div className="flex items-center gap-1 cursor-pointer select-none font-semibold" onClick={() => handleSort('isPublished')}>
                        IsPublished
                        {sortField === 'isPublished' && (
                          sortDirection === 'asc' ? <CaretUp size={12} /> : <CaretDown size={12} />
                        )}
                      </div>
                    </TableHead>
                  )}
                  {visibleColumns.downloadJs && (
                    <TableHead className="h-12 text-center min-w-[130px]">
                      Download JS...
                    </TableHead>
                  )}
                </TableRow>

                {/* Filter Row */}
                <TableRow className="bg-white border-b-2">
                  <TableHead className="p-2 border-r">
                    {/* Empty cell for checkbox column */}
                  </TableHead>
                  {visibleColumns.eventSequence && (
                    <TableHead className="p-2 border-r">
                      <div className="relative">
                        <MagnifyingGlass size={14} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
                        <Input
                          value={columnFilters.eventSequence}
                          onChange={(e) => updateColumnFilter('eventSequence', e.target.value)}
                          className="pl-9 h-8 text-sm"
                        />
                        {columnFilters.eventSequence && (
                          <Button
                            variant="ghost"
                            size="sm"
                            className="absolute right-2 top-1/2 transform -translate-y-1/2 h-6 w-6 p-0"
                            onClick={() => clearColumnFilter('eventSequence')}
                          >
                            <X size={12} />
                          </Button>
                        )}
                      </div>
                    </TableHead>
                  )}
                  {visibleColumns.ruleId && (
                    <TableHead className="p-2 border-r">
                      <div className="relative">
                        <MagnifyingGlass size={14} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
                        <Input
                          value={columnFilters.ruleId}
                          onChange={(e) => updateColumnFilter('ruleId', e.target.value)}
                          className="pl-9 h-8 text-sm"
                        />
                        {columnFilters.ruleId && (
                          <Button
                            variant="ghost"
                            size="sm"
                            className="absolute right-2 top-1/2 transform -translate-y-1/2 h-6 w-6 p-0"
                            onClick={() => clearColumnFilter('ruleId')}
                          >
                            <X size={12} />
                          </Button>
                        )}
                      </div>
                    </TableHead>
                  )}
                  {visibleColumns.rowVersion && (
                    <TableHead className="p-2 border-r">
                      <div className="relative">
                        <MagnifyingGlass size={14} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
                        <Input
                          value={columnFilters.rowVersion}
                          onChange={(e) => updateColumnFilter('rowVersion', e.target.value)}
                          className="pl-9 h-8 text-sm"
                        />
                        {columnFilters.rowVersion && (
                          <Button
                            variant="ghost"
                            size="sm"
                            className="absolute right-2 top-1/2 transform -translate-y-1/2 h-6 w-6 p-0"
                            onClick={() => clearColumnFilter('rowVersion')}
                          >
                            <X size={12} />
                          </Button>
                        )}
                      </div>
                    </TableHead>
                  )}
                  {visibleColumns.benefitType && (
                    <TableHead className="p-2 border-r">
                      <div className="relative">
                        <MagnifyingGlass size={14} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
                        <Input
                          value={columnFilters.benefitType}
                          onChange={(e) => updateColumnFilter('benefitType', e.target.value)}
                          className="pl-9 h-8 text-sm"
                        />
                        {columnFilters.benefitType && (
                          <Button
                            variant="ghost"
                            size="sm"
                            className="absolute right-2 top-1/2 transform -translate-y-1/2 h-6 w-6 p-0"
                            onClick={() => clearColumnFilter('benefitType')}
                          >
                            <X size={12} />
                          </Button>
                        )}
                      </div>
                    </TableHead>
                  )}
                  {visibleColumns.benefitCategory && (
                    <TableHead className="p-2 border-r">
                      <div className="relative">
                        <MagnifyingGlass size={14} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
                        <Input
                          value={columnFilters.benefitCategory}
                          onChange={(e) => updateColumnFilter('benefitCategory', e.target.value)}
                          className="pl-9 h-8 text-sm"
                        />
                        {columnFilters.benefitCategory && (
                          <Button
                            variant="ghost"
                            size="sm"
                            className="absolute right-2 top-1/2 transform -translate-y-1/2 h-6 w-6 p-0"
                            onClick={() => clearColumnFilter('benefitCategory')}
                          >
                            <X size={12} />
                          </Button>
                        )}
                      </div>
                    </TableHead>
                  )}
                  {visibleColumns.businessArea && (
                    <TableHead className="p-2 border-r">
                      <div className="relative">
                        <MagnifyingGlass size={14} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
                        <Input
                          value={columnFilters.businessArea}
                          onChange={(e) => updateColumnFilter('businessArea', e.target.value)}
                          className="pl-9 h-8 text-sm"
                        />
                        {columnFilters.businessArea && (
                          <Button
                            variant="ghost"
                            size="sm"
                            className="absolute right-2 top-1/2 transform -translate-y-1/2 h-6 w-6 p-0"
                            onClick={() => clearColumnFilter('businessArea')}
                          >
                            <X size={12} />
                          </Button>
                        )}
                      </div>
                    </TableHead>
                  )}
                  {visibleColumns.subBusinessArea && (
                    <TableHead className="p-2 border-r">
                      <div className="relative">
                        <MagnifyingGlass size={14} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
                        <Input
                          value={columnFilters.subBusinessArea}
                          onChange={(e) => updateColumnFilter('subBusinessArea', e.target.value)}
                          className="pl-9 h-8 text-sm"
                        />
                        {columnFilters.subBusinessArea && (
                          <Button
                            variant="ghost"
                            size="sm"
                            className="absolute right-2 top-1/2 transform -translate-y-1/2 h-6 w-6 p-0"
                            onClick={() => clearColumnFilter('subBusinessArea')}
                          >
                            <X size={12} />
                          </Button>
                        )}
                      </div>
                    </TableHead>
                  )}
                  {visibleColumns.createdOn && (
                    <TableHead className="p-2 border-r">
                      <div className="relative">
                        <MagnifyingGlass size={14} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
                        <Input
                          value={columnFilters.createdOn}
                          onChange={(e) => updateColumnFilter('createdOn', e.target.value)}
                          className="pl-9 h-8 text-sm"
                        />
                        {columnFilters.createdOn && (
                          <Button
                            variant="ghost"
                            size="sm"
                            className="absolute right-2 top-1/2 transform -translate-y-1/2 h-6 w-6 p-0"
                            onClick={() => clearColumnFilter('createdOn')}
                          >
                            <X size={12} />
                          </Button>
                        )}
                      </div>
                    </TableHead>
                  )}
                  {visibleColumns.jsonData && (
                    <TableHead className="p-2 border-r">
                      <div className="relative">
                        <MagnifyingGlass size={14} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
                        <Input
                          value={columnFilters.jsonData}
                          onChange={(e) => updateColumnFilter('jsonData', e.target.value)}
                          className="pl-9 h-8 text-sm"
                        />
                        {columnFilters.jsonData && (
                          <Button
                            variant="ghost"
                            size="sm"
                            className="absolute right-2 top-1/2 transform -translate-y-1/2 h-6 w-6 p-0"
                            onClick={() => clearColumnFilter('jsonData')}
                          >
                            <X size={12} />
                          </Button>
                        )}
                      </div>
                    </TableHead>
                  )}
                  {visibleColumns.isPublished && (
                    <TableHead className="p-2 border-r">
                      <div className="relative">
                        <MagnifyingGlass size={14} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
                        <Input
                          value={columnFilters.isPublished}
                          onChange={(e) => updateColumnFilter('isPublished', e.target.value)}
                          className="pl-9 h-8 text-sm"
                        />
                        {columnFilters.isPublished && (
                          <Button
                            variant="ghost"
                            size="sm"
                            className="absolute right-2 top-1/2 transform -translate-y-1/2 h-6 w-6 p-0"
                            onClick={() => clearColumnFilter('isPublished')}
                          >
                            <X size={12} />
                          </Button>
                        )}
                      </div>
                    </TableHead>
                  )}
                  {visibleColumns.downloadJs && (
                    <TableHead className="p-2">
                      {/* Empty for Download JS column */}
                    </TableHead>
                  )}
                </TableRow>
              </TableHeader>
              <TableBody>
                {currentPageData.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={Object.values(visibleColumns).filter(Boolean).length + 1} className="text-center py-8 text-muted-foreground">
                      {Object.values(columnFilters).some(filter => filter !== '') 
                        ? "No items match the current filters" 
                        : "No JSON data available"
                      }
                    </TableCell>
                  </TableRow>
                ) : (
                  currentPageData.map((item, index) => (
                    <TableRow 
                      key={item.id} 
                      className={`
                        ${selectedRows.includes(item.id) ? 'bg-blue-50 border-blue-200' : 'hover:bg-muted/30'}
                        ${index % 2 === 0 ? 'bg-white' : 'bg-slate-50/30'}
                        border-b transition-colors h-11
                      `}
                    >
                      <TableCell className="border-r p-3">
                        <Checkbox
                          checked={selectedRows.includes(item.id)}
                          onCheckedChange={(checked) => 
                            handleRowSelect(item.id, checked as boolean)
                          }
                        />
                      </TableCell>
                      {visibleColumns.eventSequence && (
                        <TableCell className="font-mono text-blue-600 font-medium border-r p-3 text-sm">
                          {item.eventSequence}
                        </TableCell>
                      )}
                      {visibleColumns.ruleId && (
                        <TableCell className="font-mono text-sm border-r p-3">
                          {item.ruleId}
                        </TableCell>
                      )}
                      {visibleColumns.rowVersion && (
                        <TableCell className="font-mono text-sm border-r p-3">
                          {item.rowVersion}
                        </TableCell>
                      )}
                      {visibleColumns.benefitType && (
                        <TableCell className="border-r p-3 text-sm">
                          {item.benefitType}
                        </TableCell>
                      )}
                      {visibleColumns.benefitCategory && (
                        <TableCell className="border-r p-3">
                          <Badge variant="secondary" className="text-xs">
                            {item.benefitCategory}
                          </Badge>
                        </TableCell>
                      )}
                      {visibleColumns.businessArea && (
                        <TableCell className="border-r p-3 text-sm font-medium">
                          {item.businessArea}
                        </TableCell>
                      )}
                      {visibleColumns.subBusinessArea && (
                        <TableCell className="border-r p-3 text-sm">
                          {item.subBusinessArea}
                        </TableCell>
                      )}
                      {visibleColumns.createdOn && (
                        <TableCell className="border-r p-3 text-sm font-mono">
                          {item.createdOn}
                        </TableCell>
                      )}
                      {visibleColumns.jsonData && (
                        <TableCell className="border-r p-3 text-center">
                          <JsonViewerPopup />
                        </TableCell>
                      )}
                      {visibleColumns.isPublished && (
                        <TableCell className="border-r p-3 text-center">
                          <Badge 
                            variant={item.isPublished === 'Yes' ? 'default' : 'secondary'} 
                            className={`text-xs font-medium ${item.isPublished === 'Yes' ? 'bg-green-100 text-green-800 border-green-300' : ''}`}
                          >
                            {item.isPublished}
                          </Badge>
                        </TableCell>
                      )}
                      {visibleColumns.downloadJs && (
                        <TableCell className="p-3 text-center">
                          <div className="flex items-center justify-center gap-1">
                            <Button variant="ghost" size="sm" className="h-7 w-7 p-0 text-blue-600 hover:bg-blue-50" title="Download JSON">
                              <Download size={14} />
                            </Button>
                            <Button variant="ghost" size="sm" className="h-7 w-7 p-0 text-orange-600 hover:bg-orange-50" title="View details">
                              <ArrowUp size={14} />
                            </Button>
                            <Button variant="ghost" size="sm" className="h-7 w-7 p-0 text-orange-600 hover:bg-orange-50" title="Export data">
                              <ArrowDown size={14} />
                            </Button>
                          </div>
                        </TableCell>
                      )}
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
          
          {/* Enhanced Pagination Controls */}
          <div className="flex items-center justify-between mt-4 px-4 pb-4 text-sm text-muted-foreground border-t bg-muted/20">
            <div className="flex items-center gap-4">
              <span className="font-medium">
                Showing {startIndex + 1} - {Math.min(endIndex, filteredAndSortedData.length)} of {filteredAndSortedData.length}
                {publishData.length !== filteredAndSortedData.length && (
                  <span className="text-blue-600 font-medium">
                    {' '}(filtered from {publishData.length} total)
                  </span>
                )}
              </span>
              {selectedRows.length > 0 && (
                <Badge variant="secondary" className="text-xs px-2 py-1">
                  {selectedRows.length} selected
                </Badge>
              )}
            </div>
            
            {totalPages > 1 && (
              <div className="flex items-center gap-3">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setCurrentPage(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="h-8 w-8 p-0"
                >
                  <CaretLeft size={14} />
                </Button>
                
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium">Page</span>
                  <Input
                    type="number"
                    min="1"
                    max={totalPages}
                    value={currentPage}
                    onChange={(e) => {
                      const page = parseInt(e.target.value)
                      if (page >= 1 && page <= totalPages) {
                        setCurrentPage(page)
                      }
                    }}
                    className="w-16 h-8 text-center text-sm font-medium"
                  />
                  <span className="text-sm font-medium">of {totalPages}</span>
                </div>
                
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setCurrentPage(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className="h-8 w-8 p-0"
                >
                  <CaretRight size={14} />
                </Button>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

// Collaborate component with tabbed interface
function CollaborateMain() {
  const [sortField, setSortField] = useState<string | null>(null)
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc')
  const [currentPage, setCurrentPage] = useState(1)
  const [pageSize, setPageSize] = useState(10)
  const [selectedRows, setSelectedRows] = useKV('collaborate-selected-rows', [] as string[])
  
  // Column filters for search
  const [columnFilters, setColumnFilters] = useState({
    id: '',
    collateralType: '',
    fontType: '',
    productName: '',
    folderName: '',
    effectiveDate: '',
    version: '',
    workflowStage: '',
    estimatedDate: '',
    collaborators: '',
    productLink: '',
    reviewSummary: '',
    reviewersInvolved: '',
    queuedBy: '',
    queuedDate: '',
    totalReviewCount: '',
    draftableCompare: '',
    updateStatus: '',
    emailStatus: ''
  })
  
  // Column visibility state
  const [visibleColumns, setVisibleColumns] = useKV('collaborate-visible-columns', {
    id: true,
    collateralType: true,
    fontType: true,
    productName: true,
    folderName: true,
    effectiveDate: true,
    version: true,
    workflowStage: true,
    estimatedDate: true,
    collaborators: true,
    productLink: true,
    reviewSummary: true,
    reviewersInvolved: true,
    queuedBy: true,
    queuedDate: true,
    totalReviewCount: true,
    draftableCompare: true,
    updateStatus: true,
    emailStatus: true
  })
  
  // Sample data based on the screenshot
  const collaborateData = [
    {
      id: '13148',
      collateralType: 'Medicare ANOC',
      fontType: 'Regular',
      productName: 'H4801015000',
      folderName: 'Term_H4801-015_Blue Cross Medicare Advantage Saver Plus',
      effectiveDate: '01/01/2026',
      version: '2025_0.02',
      workflowStage: 'Collection Updates In Progress',
      estimatedDate: '06/06/2025',
      collaborators: '1.00',
      productLink: '🔗',
      reviewSummary: '',
      reviewersInvolved: 'Vishal Bergire,Varadharajan R',
      queuedBy: 'Vishal Bergire',
      queuedDate: '05/29/2025 08:57:47',
      totalReviewCount: '1 out of 2',
      draftableCompare: '🔗',
      updateStatus: 'Update',
      emailStatus: '👁'
    },
    {
      id: '13148',
      collateralType: 'Medicare ANOC',
      fontType: 'Regular',
      productName: 'H4801014000',
      folderName: 'Term_H4801-014_Blue Cross Medicare Advantage Flex (PPO)',
      effectiveDate: '01/01/2026',
      version: '2025_1.01',
      workflowStage: 'Ready For Review',
      estimatedDate: '06/06/2025',
      collaborators: '1.01',
      productLink: '🔗',
      reviewSummary: '',
      reviewersInvolved: 'Elaine Warnecke, Leuryn Bledsoe',
      queuedBy: 'Vishal Bergire',
      queuedDate: '05/29/2025 08:57:25',
      totalReviewCount: '0 out of 4',
      draftableCompare: '🔗',
      updateStatus: 'Update',
      emailStatus: '👁'
    },
    {
      id: '13146',
      collateralType: 'Medicare ANOC',
      fontType: 'Regular',
      productName: 'H9790010000',
      folderName: 'INDV_H9790-010_Blue Cross Medicare Advantage Basic',
      effectiveDate: '01/01/2026',
      version: '2026_2.02',
      workflowStage: 'Updates Ready',
      estimatedDate: '06/02/2025',
      collaborators: '1.00',
      productLink: '🔗',
      reviewSummary: '',
      reviewersInvolved: 'ram agarwal,Chad Carpenter ...',
      queuedBy: 'ram.agarwal',
      queuedDate: '08/25/2024 14:05:20',
      totalReviewCount: '0 out of 8',
      draftableCompare: '🔗',
      updateStatus: 'Update',
      emailStatus: '👁'
    },
    {
      id: '13119',
      collateralType: 'Medicare ANOC',
      fontType: 'Regular',
      productName: 'H1666014000',
      folderName: 'INDV_H1666-014_Blue Cross Medicare Advantage Health',
      effectiveDate: '01/01/2026',
      version: '2026_2.02',
      workflowStage: 'Review Completed',
      estimatedDate: '05/26/2025',
      collaborators: '1.00',
      productLink: '🔗',
      reviewSummary: '',
      reviewersInvolved: 'ram agarwal,Chad Carpenter ...',
      queuedBy: 'ram.agarwal',
      queuedDate: '08/25/2024 14:04:37',
      totalReviewCount: '0 out of 8',
      draftableCompare: '🔗',
      updateStatus: 'Update',
      emailStatus: '👁'
    },
    {
      id: '13100',
      collateralType: 'Medicare ANOC',
      fontType: 'Regular',
      productName: 'S5715015000',
      folderName: 'Group_S5715-015',
      effectiveDate: '01/01/2026',
      version: '2026_0.01',
      workflowStage: 'Ready For Review',
      estimatedDate: '05/22/2025',
      collaborators: '0.01',
      productLink: '🔗',
      reviewSummary: '',
      reviewersInvolved: 'ram agarwal,Chad Carpenter ...',
      queuedBy: 'ram.agarwal',
      queuedDate: '08/25/2024 14:04:33',
      totalReviewCount: '0 out of 8',
      draftableCompare: '🔗',
      updateStatus: 'Update',
      emailStatus: '👁'
    },
    {
      id: '12901',
      collateralType: 'Medicare EOC',
      fontType: 'Regular',
      productName: 'H8554004000',
      folderName: 'INDV_H8554-004_Blue Cross Medicare Advantage Saver',
      effectiveDate: '01/01/2026',
      version: '2026_0.01',
      workflowStage: 'Ready For Review',
      estimatedDate: '05/15/2025',
      collaborators: '0.01',
      productLink: '🔗',
      reviewSummary: '',
      reviewersInvolved: 'ram agarwal,Chad Carpenter ...',
      queuedBy: 'ram.agarwal',
      queuedDate: '08/25/2024 14:03:41',
      totalReviewCount: '0 out of 8',
      draftableCompare: '🔗',
      updateStatus: 'Update',
      emailStatus: '👁'
    },
    {
      id: '12900',
      collateralType: 'Medicare EOC',
      fontType: 'Regular',
      productName: 'H8634004000',
      folderName: 'Term_INDV_H8634-004_Blue Cross Medicare Advantage',
      effectiveDate: '01/01/2026',
      version: '2026_0.01',
      workflowStage: 'Ready For Review',
      estimatedDate: '05/15/2025',
      collaborators: '0.01',
      productLink: '🔗',
      reviewSummary: '',
      reviewersInvolved: 'ram agarwal,Chad Carpenter ...',
      queuedBy: 'ram.agarwal',
      queuedDate: '08/25/2024 14:03:37',
      totalReviewCount: '0 out of 8',
      draftableCompare: '🔗',
      updateStatus: 'Update',
      emailStatus: '👁'
    },
    {
      id: '12969',
      collateralType: 'Medicare EOC',
      fontType: 'Regular',
      productName: 'H1666018000',
      folderName: 'INDV_H1666-018_Blue Cross Medicare Advantage Health',
      effectiveDate: '01/01/2026',
      version: '2026_0.01',
      workflowStage: 'Ready For Review',
      estimatedDate: '05/15/2025',
      collaborators: '0.01',
      productLink: '🔗',
      reviewSummary: '',
      reviewersInvolved: 'ram agarwal,Chad Carpenter ...',
      queuedBy: 'ram.agarwal',
      queuedDate: '08/25/2024 14:03:34',
      totalReviewCount: '0 out of 8',
      draftableCompare: '🔗',
      updateStatus: 'Update',
      emailStatus: '👁'
    },
    {
      id: '12968',
      collateralType: 'Medicare EOC',
      fontType: 'Regular',
      productName: 'H4801022000',
      folderName: 'INDV_H4801-022_Blue Cross Medicare Advantage Health',
      effectiveDate: '01/01/2026',
      version: '2026_0.01',
      workflowStage: 'Ready For Review',
      estimatedDate: '05/15/2025',
      collaborators: '0.01',
      productLink: '🔗',
      reviewSummary: '',
      reviewersInvolved: 'ram agarwal,Chad Carpenter ...',
      queuedBy: 'ram.agarwal',
      queuedDate: '08/25/2024 14:03:30',
      totalReviewCount: '0 out of 8',
      draftableCompare: '🔗',
      updateStatus: 'Update',
      emailStatus: '👁'
    }
  ]
  
  // Available columns configuration
  const availableColumns = [
    { key: 'id', label: 'Id' },
    { key: 'collateralType', label: 'Collateral Type' },
    { key: 'fontType', label: 'Font Type' },
    { key: 'productName', label: 'Product Name' },
    { key: 'folderName', label: 'Folder Name' },
    { key: 'effectiveDate', label: 'Effective Date' },
    { key: 'version', label: 'Version' },
    { key: 'workflowStage', label: 'Workflow Stage' },
    { key: 'estimatedDate', label: 'Estimated Completion' },
    { key: 'collaborators', label: 'Collaborators' },
    { key: 'productLink', label: 'Product Link' },
    { key: 'reviewSummary', label: 'Review Summary' },
    { key: 'reviewersInvolved', label: 'Reviewers Involved' },
    { key: 'queuedBy', label: 'Queued By' },
    { key: 'queuedDate', label: 'Queued Date' },
    { key: 'totalReviewCount', label: 'Total Review Count' },
    { key: 'draftableCompare', label: 'Draftable Compare' },
    { key: 'updateStatus', label: 'Update Status' },
    { key: 'emailStatus', label: 'Email Status' }
  ]
  
  // Filter and sort data
  const filteredAndSortedData = useMemo(() => {
    let filtered = collaborateData.filter(item => {
      // Apply column filters
      if (columnFilters.id && !item.id.toLowerCase().includes(columnFilters.id.toLowerCase())) {
        return false
      }
      if (columnFilters.collateralType && !item.collateralType.toLowerCase().includes(columnFilters.collateralType.toLowerCase())) {
        return false
      }
      if (columnFilters.fontType && !item.fontType.toLowerCase().includes(columnFilters.fontType.toLowerCase())) {
        return false
      }
      if (columnFilters.productName && !item.productName.toLowerCase().includes(columnFilters.productName.toLowerCase())) {
        return false
      }
      if (columnFilters.folderName && !item.folderName.toLowerCase().includes(columnFilters.folderName.toLowerCase())) {
        return false
      }
      if (columnFilters.effectiveDate && !item.effectiveDate.toLowerCase().includes(columnFilters.effectiveDate.toLowerCase())) {
        return false
      }
      if (columnFilters.version && !item.version.toLowerCase().includes(columnFilters.version.toLowerCase())) {
        return false
      }
      if (columnFilters.workflowStage && !item.workflowStage.toLowerCase().includes(columnFilters.workflowStage.toLowerCase())) {
        return false
      }
      if (columnFilters.estimatedDate && !item.estimatedDate.toLowerCase().includes(columnFilters.estimatedDate.toLowerCase())) {
        return false
      }
      if (columnFilters.collaborators && !item.collaborators.toLowerCase().includes(columnFilters.collaborators.toLowerCase())) {
        return false
      }
      if (columnFilters.reviewSummary && !item.reviewSummary.toLowerCase().includes(columnFilters.reviewSummary.toLowerCase())) {
        return false
      }
      if (columnFilters.reviewersInvolved && !item.reviewersInvolved.toLowerCase().includes(columnFilters.reviewersInvolved.toLowerCase())) {
        return false
      }
      if (columnFilters.queuedBy && !item.queuedBy.toLowerCase().includes(columnFilters.queuedBy.toLowerCase())) {
        return false
      }
      if (columnFilters.queuedDate && !item.queuedDate.toLowerCase().includes(columnFilters.queuedDate.toLowerCase())) {
        return false
      }
      if (columnFilters.totalReviewCount && !item.totalReviewCount.toLowerCase().includes(columnFilters.totalReviewCount.toLowerCase())) {
        return false
      }
      if (columnFilters.updateStatus && !item.updateStatus.toLowerCase().includes(columnFilters.updateStatus.toLowerCase())) {
        return false
      }
      
      return true
    })
    
    if (sortField) {
      filtered.sort((a, b) => {
        const aValue = a[sortField as keyof typeof a] || ''
        const bValue = b[sortField as keyof typeof b] || ''
        
        if (sortDirection === 'asc') {
          return aValue.toString().localeCompare(bValue.toString())
        } else {
          return bValue.toString().localeCompare(aValue.toString())
        }
      })
    }
    
    return filtered
  }, [collaborateData, sortField, sortDirection, columnFilters])
  
  // Pagination calculations
  const totalPages = Math.ceil(filteredAndSortedData.length / pageSize)
  const startIndex = (currentPage - 1) * pageSize
  const endIndex = startIndex + pageSize
  const currentPageData = filteredAndSortedData.slice(startIndex, endIndex)
  
  // Reset to page 1 when sort or filters change
  useEffect(() => {
    setCurrentPage(1)
  }, [sortField, sortDirection, columnFilters])
  
  const handleSort = (field: string) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc')
    } else {
      setSortField(field)
      setSortDirection('asc')
    }
  }
  
  const handleRowSelect = (rowId: string, checked: boolean) => {
    setSelectedRows((current: string[]) => 
      checked ? [...current, rowId] : current.filter(id => id !== rowId)
    )
  }
  
  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      const allVisibleIds = currentPageData.map(item => item.id)
      setSelectedRows((current: string[]) => {
        const newSet = new Set([...current, ...allVisibleIds])
        return Array.from(newSet)
      })
    } else {
      const visibleIds = new Set(currentPageData.map(item => item.id))
      setSelectedRows((current: string[]) => 
        current.filter(id => !visibleIds.has(id))
      )
    }
  }
  
  const updateColumnFilter = (column: string, value: string) => {
    setColumnFilters(prev => ({
      ...prev,
      [column]: value
    }))
  }
  
  const clearColumnFilter = (column: string) => {
    setColumnFilters(prev => ({
      ...prev,
      [column]: ''
    }))
  }
  
  const toggleColumnVisibility = (columnKey: string) => {
    setVisibleColumns((current: any) => ({
      ...current,
      [columnKey]: !current[columnKey]
    }))
  }
  
  const isAllVisibleSelected = currentPageData.length > 0 && 
    currentPageData.every(item => selectedRows.includes(item.id))
  
  const isSomeVisibleSelected = currentPageData.some(item => selectedRows.includes(item.id))
  
  const getStatusColor = (stage: string) => {
    switch (stage) {
      case 'Collection Updates In Progress':
        return 'bg-blue-100 text-blue-800 border-blue-300'
      case 'Ready For Review':
        return 'bg-orange-100 text-orange-800 border-orange-300'
      case 'Updates Ready':
        return 'bg-yellow-100 text-yellow-800 border-yellow-300'
      case 'Review Completed':
        return 'bg-green-100 text-green-800 border-green-300'
      default:
        return 'bg-gray-100 text-gray-800 border-gray-300'
    }
  }
  
  return (
    <div className="space-y-4">
      {/* Actions and Column Controls */}
      <div className="flex items-center justify-between">
        <div className="text-sm text-muted-foreground">
          {filteredAndSortedData.length} items total
          {selectedRows.length > 0 && (
            <Badge variant="secondary" className="ml-3">
              {selectedRows.length} selected
            </Badge>
          )}
        </div>
        
        <div className="flex items-center gap-3">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="flex items-center gap-2 h-9">
                <Columns size={16} />
                Columns
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-64">
              {availableColumns.map((column) => (
                <DropdownMenuCheckboxItem
                  key={column.key}
                  checked={visibleColumns[column.key]}
                  onCheckedChange={() => toggleColumnVisibility(column.key)}
                >
                  {column.label}
                </DropdownMenuCheckboxItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      
      {/* Data Grid */}
      <Card>
        <CardContent className="p-0">
          <div className="border rounded-lg">
            <Table>
              <TableHeader>
                {/* Column Headers with Sort */}
                <TableRow className="bg-muted/30">
                  <TableHead className="w-12 border-r h-11">
                    <Checkbox
                      checked={isAllVisibleSelected}
                      onCheckedChange={handleSelectAll}
                      ref={(el) => {
                        if (el) el.indeterminate = isSomeVisibleSelected && !isAllVisibleSelected
                      }}
                    />
                  </TableHead>
                  {visibleColumns.id && (
                    <TableHead className="border-r h-11 min-w-[80px]">
                      <div className="flex items-center gap-1 cursor-pointer select-none font-semibold" onClick={() => handleSort('id')}>
                        Id
                        {sortField === 'id' && (
                          sortDirection === 'asc' ? <CaretUp size={12} /> : <CaretDown size={12} />
                        )}
                      </div>
                    </TableHead>
                  )}
                  {visibleColumns.collateralType && (
                    <TableHead className="border-r h-11 min-w-[140px]">
                      <div className="flex items-center gap-1 cursor-pointer select-none font-semibold" onClick={() => handleSort('collateralType')}>
                        Collateral Type
                        {sortField === 'collateralType' && (
                          sortDirection === 'asc' ? <CaretUp size={12} /> : <CaretDown size={12} />
                        )}
                      </div>
                    </TableHead>
                  )}
                  {visibleColumns.fontType && (
                    <TableHead className="border-r h-11 min-w-[100px]">
                      <div className="flex items-center gap-1 cursor-pointer select-none font-semibold" onClick={() => handleSort('fontType')}>
                        Font Type
                        {sortField === 'fontType' && (
                          sortDirection === 'asc' ? <CaretUp size={12} /> : <CaretDown size={12} />
                        )}
                      </div>
                    </TableHead>
                  )}
                  {visibleColumns.productName && (
                    <TableHead className="border-r h-11 min-w-[140px]">
                      <div className="flex items-center gap-1 cursor-pointer select-none font-semibold" onClick={() => handleSort('productName')}>
                        Product Name
                        {sortField === 'productName' && (
                          sortDirection === 'asc' ? <CaretUp size={12} /> : <CaretDown size={12} />
                        )}
                      </div>
                    </TableHead>
                  )}
                  {visibleColumns.folderName && (
                    <TableHead className="border-r h-11 min-w-[250px]">
                      <div className="flex items-center gap-1 cursor-pointer select-none font-semibold" onClick={() => handleSort('folderName')}>
                        Folder Name
                        {sortField === 'folderName' && (
                          sortDirection === 'asc' ? <CaretUp size={12} /> : <CaretDown size={12} />
                        )}
                      </div>
                    </TableHead>
                  )}
                  {visibleColumns.effectiveDate && (
                    <TableHead className="border-r h-11 min-w-[130px]">
                      <div className="flex items-center gap-1 cursor-pointer select-none font-semibold" onClick={() => handleSort('effectiveDate')}>
                        Effective Date
                        {sortField === 'effectiveDate' && (
                          sortDirection === 'asc' ? <CaretUp size={12} /> : <CaretDown size={12} />
                        )}
                      </div>
                    </TableHead>
                  )}
                  {visibleColumns.version && (
                    <TableHead className="border-r h-11 min-w-[100px]">
                      <div className="flex items-center gap-1 cursor-pointer select-none font-semibold" onClick={() => handleSort('version')}>
                        Version
                        {sortField === 'version' && (
                          sortDirection === 'asc' ? <CaretUp size={12} /> : <CaretDown size={12} />
                        )}
                      </div>
                    </TableHead>
                  )}
                  {visibleColumns.workflowStage && (
                    <TableHead className="border-r h-11 min-w-[160px]">
                      <div className="flex items-center gap-1 cursor-pointer select-none font-semibold" onClick={() => handleSort('workflowStage')}>
                        Workflow Stage
                        {sortField === 'workflowStage' && (
                          sortDirection === 'asc' ? <CaretUp size={12} /> : <CaretDown size={12} />
                        )}
                      </div>
                    </TableHead>
                  )}
                  {visibleColumns.estimatedDate && (
                    <TableHead className="border-r h-11 min-w-[140px]">
                      <div className="flex items-center gap-1 cursor-pointer select-none font-semibold" onClick={() => handleSort('estimatedDate')}>
                        Estimated Completion
                        {sortField === 'estimatedDate' && (
                          sortDirection === 'asc' ? <CaretUp size={12} /> : <CaretDown size={12} />
                        )}
                      </div>
                    </TableHead>
                  )}
                  {visibleColumns.collaborators && (
                    <TableHead className="border-r h-11 min-w-[120px]">
                      <div className="flex items-center gap-1 cursor-pointer select-none font-semibold" onClick={() => handleSort('collaborators')}>
                        Collaborators
                        {sortField === 'collaborators' && (
                          sortDirection === 'asc' ? <CaretUp size={12} /> : <CaretDown size={12} />
                        )}
                      </div>
                    </TableHead>
                  )}
                  {visibleColumns.productLink && (
                    <TableHead className="border-r h-11 min-w-[100px] text-center">
                      Product Link
                    </TableHead>
                  )}
                  {visibleColumns.reviewSummary && (
                    <TableHead className="border-r h-11 min-w-[120px]">
                      <div className="flex items-center gap-1 cursor-pointer select-none font-semibold" onClick={() => handleSort('reviewSummary')}>
                        Review Summary
                        {sortField === 'reviewSummary' && (
                          sortDirection === 'asc' ? <CaretUp size={12} /> : <CaretDown size={12} />
                        )}
                      </div>
                    </TableHead>
                  )}
                  {visibleColumns.reviewersInvolved && (
                    <TableHead className="border-r h-11 min-w-[160px]">
                      <div className="flex items-center gap-1 cursor-pointer select-none font-semibold" onClick={() => handleSort('reviewersInvolved')}>
                        Reviewers Involved
                        {sortField === 'reviewersInvolved' && (
                          sortDirection === 'asc' ? <CaretUp size={12} /> : <CaretDown size={12} />
                        )}
                      </div>
                    </TableHead>
                  )}
                  {visibleColumns.queuedBy && (
                    <TableHead className="border-r h-11 min-w-[120px]">
                      <div className="flex items-center gap-1 cursor-pointer select-none font-semibold" onClick={() => handleSort('queuedBy')}>
                        Queued By
                        {sortField === 'queuedBy' && (
                          sortDirection === 'asc' ? <CaretUp size={12} /> : <CaretDown size={12} />
                        )}
                      </div>
                    </TableHead>
                  )}
                  {visibleColumns.queuedDate && (
                    <TableHead className="border-r h-11 min-w-[160px]">
                      <div className="flex items-center gap-1 cursor-pointer select-none font-semibold" onClick={() => handleSort('queuedDate')}>
                        Queued Date
                        {sortField === 'queuedDate' && (
                          sortDirection === 'asc' ? <CaretUp size={12} /> : <CaretDown size={12} />
                        )}
                      </div>
                    </TableHead>
                  )}
                  {visibleColumns.totalReviewCount && (
                    <TableHead className="border-r h-11 min-w-[140px]">
                      <div className="flex items-center gap-1 cursor-pointer select-none font-semibold" onClick={() => handleSort('totalReviewCount')}>
                        Total Review Count
                        {sortField === 'totalReviewCount' && (
                          sortDirection === 'asc' ? <CaretUp size={12} /> : <CaretDown size={12} />
                        )}
                      </div>
                    </TableHead>
                  )}
                  {visibleColumns.draftableCompare && (
                    <TableHead className="border-r h-11 min-w-[140px] text-center">
                      Draftable Compare
                    </TableHead>
                  )}
                  {visibleColumns.updateStatus && (
                    <TableHead className="border-r h-11 min-w-[120px]">
                      <div className="flex items-center gap-1 cursor-pointer select-none font-semibold" onClick={() => handleSort('updateStatus')}>
                        Update Status
                        {sortField === 'updateStatus' && (
                          sortDirection === 'asc' ? <CaretUp size={12} /> : <CaretDown size={12} />
                        )}
                      </div>
                    </TableHead>
                  )}
                  {visibleColumns.emailStatus && (
                    <TableHead className="h-11 min-w-[110px] text-center">
                      Email Status
                    </TableHead>
                  )}
                </TableRow>

                {/* Filter Row */}
                <TableRow className="bg-white border-b-2">
                  <TableHead className="p-2 border-r">
                    {/* Empty cell for checkbox column */}
                  </TableHead>
                  {visibleColumns.id && (
                    <TableHead className="p-2 border-r">
                      <div className="relative">
                        <MagnifyingGlass size={14} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
                        <Input
                          value={columnFilters.id}
                          onChange={(e) => updateColumnFilter('id', e.target.value)}
                          className="pl-9 h-8 text-sm"
                        />
                        {columnFilters.id && (
                          <Button
                            variant="ghost"
                            size="sm"
                            className="absolute right-2 top-1/2 transform -translate-y-1/2 h-6 w-6 p-0"
                            onClick={() => clearColumnFilter('id')}
                          >
                            <X size={12} />
                          </Button>
                        )}
                      </div>
                    </TableHead>
                  )}
                  {visibleColumns.collateralType && (
                    <TableHead className="p-2 border-r">
                      <div className="relative">
                        <MagnifyingGlass size={14} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
                        <Input
                          value={columnFilters.collateralType}
                          onChange={(e) => updateColumnFilter('collateralType', e.target.value)}
                          className="pl-9 h-8 text-sm"
                        />
                        {columnFilters.collateralType && (
                          <Button
                            variant="ghost"
                            size="sm"
                            className="absolute right-2 top-1/2 transform -translate-y-1/2 h-6 w-6 p-0"
                            onClick={() => clearColumnFilter('collateralType')}
                          >
                            <X size={12} />
                          </Button>
                        )}
                      </div>
                    </TableHead>
                  )}
                  {visibleColumns.fontType && (
                    <TableHead className="p-2 border-r">
                      <div className="relative">
                        <MagnifyingGlass size={14} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
                        <Input
                          value={columnFilters.fontType}
                          onChange={(e) => updateColumnFilter('fontType', e.target.value)}
                          className="pl-9 h-8 text-sm"
                        />
                        {columnFilters.fontType && (
                          <Button
                            variant="ghost"
                            size="sm"
                            className="absolute right-2 top-1/2 transform -translate-y-1/2 h-6 w-6 p-0"
                            onClick={() => clearColumnFilter('fontType')}
                          >
                            <X size={12} />
                          </Button>
                        )}
                      </div>
                    </TableHead>
                  )}
                  {visibleColumns.productName && (
                    <TableHead className="p-2 border-r">
                      <div className="relative">
                        <MagnifyingGlass size={14} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
                        <Input
                          value={columnFilters.productName}
                          onChange={(e) => updateColumnFilter('productName', e.target.value)}
                          className="pl-9 h-8 text-sm"
                        />
                        {columnFilters.productName && (
                          <Button
                            variant="ghost"
                            size="sm"
                            className="absolute right-2 top-1/2 transform -translate-y-1/2 h-6 w-6 p-0"
                            onClick={() => clearColumnFilter('productName')}
                          >
                            <X size={12} />
                          </Button>
                        )}
                      </div>
                    </TableHead>
                  )}
                  {visibleColumns.folderName && (
                    <TableHead className="p-2 border-r">
                      <div className="relative">
                        <MagnifyingGlass size={14} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
                        <Input
                          value={columnFilters.folderName}
                          onChange={(e) => updateColumnFilter('folderName', e.target.value)}
                          className="pl-9 h-8 text-sm"
                        />
                        {columnFilters.folderName && (
                          <Button
                            variant="ghost"
                            size="sm"
                            className="absolute right-2 top-1/2 transform -translate-y-1/2 h-6 w-6 p-0"
                            onClick={() => clearColumnFilter('folderName')}
                          >
                            <X size={12} />
                          </Button>
                        )}
                      </div>
                    </TableHead>
                  )}
                  {visibleColumns.effectiveDate && (
                    <TableHead className="p-2 border-r">
                      <div className="relative">
                        <MagnifyingGlass size={14} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
                        <Input
                          value={columnFilters.effectiveDate}
                          onChange={(e) => updateColumnFilter('effectiveDate', e.target.value)}
                          className="pl-9 h-8 text-sm"
                        />
                        {columnFilters.effectiveDate && (
                          <Button
                            variant="ghost"
                            size="sm"
                            className="absolute right-2 top-1/2 transform -translate-y-1/2 h-6 w-6 p-0"
                            onClick={() => clearColumnFilter('effectiveDate')}
                          >
                            <X size={12} />
                          </Button>
                        )}
                      </div>
                    </TableHead>
                  )}
                  {visibleColumns.version && (
                    <TableHead className="p-2 border-r">
                      <div className="relative">
                        <MagnifyingGlass size={14} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
                        <Input
                          value={columnFilters.version}
                          onChange={(e) => updateColumnFilter('version', e.target.value)}
                          className="pl-9 h-8 text-sm"
                        />
                        {columnFilters.version && (
                          <Button
                            variant="ghost"
                            size="sm"
                            className="absolute right-2 top-1/2 transform -translate-y-1/2 h-6 w-6 p-0"
                            onClick={() => clearColumnFilter('version')}
                          >
                            <X size={12} />
                          </Button>
                        )}
                      </div>
                    </TableHead>
                  )}
                  {visibleColumns.workflowStage && (
                    <TableHead className="p-2 border-r">
                      <div className="relative">
                        <MagnifyingGlass size={14} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
                        <Input
                          value={columnFilters.workflowStage}
                          onChange={(e) => updateColumnFilter('workflowStage', e.target.value)}
                          className="pl-9 h-8 text-sm"
                        />
                        {columnFilters.workflowStage && (
                          <Button
                            variant="ghost"
                            size="sm"
                            className="absolute right-2 top-1/2 transform -translate-y-1/2 h-6 w-6 p-0"
                            onClick={() => clearColumnFilter('workflowStage')}
                          >
                            <X size={12} />
                          </Button>
                        )}
                      </div>
                    </TableHead>
                  )}
                  {visibleColumns.estimatedDate && (
                    <TableHead className="p-2 border-r">
                      <div className="relative">
                        <MagnifyingGlass size={14} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
                        <Input
                          value={columnFilters.estimatedDate}
                          onChange={(e) => updateColumnFilter('estimatedDate', e.target.value)}
                          className="pl-9 h-8 text-sm"
                        />
                        {columnFilters.estimatedDate && (
                          <Button
                            variant="ghost"
                            size="sm"
                            className="absolute right-2 top-1/2 transform -translate-y-1/2 h-6 w-6 p-0"
                            onClick={() => clearColumnFilter('estimatedDate')}
                          >
                            <X size={12} />
                          </Button>
                        )}
                      </div>
                    </TableHead>
                  )}
                  {visibleColumns.collaborators && (
                    <TableHead className="p-2 border-r">
                      <div className="relative">
                        <MagnifyingGlass size={14} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
                        <Input
                          value={columnFilters.collaborators}
                          onChange={(e) => updateColumnFilter('collaborators', e.target.value)}
                          className="pl-9 h-8 text-sm"
                        />
                        {columnFilters.collaborators && (
                          <Button
                            variant="ghost"
                            size="sm"
                            className="absolute right-2 top-1/2 transform -translate-y-1/2 h-6 w-6 p-0"
                            onClick={() => clearColumnFilter('collaborators')}
                          >
                            <X size={12} />
                          </Button>
                        )}
                      </div>
                    </TableHead>
                  )}
                  {visibleColumns.productLink && (
                    <TableHead className="p-2 border-r">
                      {/* Empty for Product Link column */}
                    </TableHead>
                  )}
                  {visibleColumns.reviewSummary && (
                    <TableHead className="p-2 border-r">
                      <div className="relative">
                        <MagnifyingGlass size={14} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
                        <Input
                          value={columnFilters.reviewSummary}
                          onChange={(e) => updateColumnFilter('reviewSummary', e.target.value)}
                          className="pl-9 h-8 text-sm"
                        />
                        {columnFilters.reviewSummary && (
                          <Button
                            variant="ghost"
                            size="sm"
                            className="absolute right-2 top-1/2 transform -translate-y-1/2 h-6 w-6 p-0"
                            onClick={() => clearColumnFilter('reviewSummary')}
                          >
                            <X size={12} />
                          </Button>
                        )}
                      </div>
                    </TableHead>
                  )}
                  {visibleColumns.reviewersInvolved && (
                    <TableHead className="p-2 border-r">
                      <div className="relative">
                        <MagnifyingGlass size={14} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
                        <Input
                          value={columnFilters.reviewersInvolved}
                          onChange={(e) => updateColumnFilter('reviewersInvolved', e.target.value)}
                          className="pl-9 h-8 text-sm"
                        />
                        {columnFilters.reviewersInvolved && (
                          <Button
                            variant="ghost"
                            size="sm"
                            className="absolute right-2 top-1/2 transform -translate-y-1/2 h-6 w-6 p-0"
                            onClick={() => clearColumnFilter('reviewersInvolved')}
                          >
                            <X size={12} />
                          </Button>
                        )}
                      </div>
                    </TableHead>
                  )}
                  {visibleColumns.queuedBy && (
                    <TableHead className="p-2 border-r">
                      <div className="relative">
                        <MagnifyingGlass size={14} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
                        <Input
                          value={columnFilters.queuedBy}
                          onChange={(e) => updateColumnFilter('queuedBy', e.target.value)}
                          className="pl-9 h-8 text-sm"
                        />
                        {columnFilters.queuedBy && (
                          <Button
                            variant="ghost"
                            size="sm"
                            className="absolute right-2 top-1/2 transform -translate-y-1/2 h-6 w-6 p-0"
                            onClick={() => clearColumnFilter('queuedBy')}
                          >
                            <X size={12} />
                          </Button>
                        )}
                      </div>
                    </TableHead>
                  )}
                  {visibleColumns.queuedDate && (
                    <TableHead className="p-2 border-r">
                      <div className="relative">
                        <MagnifyingGlass size={14} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
                        <Input
                          value={columnFilters.queuedDate}
                          onChange={(e) => updateColumnFilter('queuedDate', e.target.value)}
                          className="pl-9 h-8 text-sm"
                        />
                        {columnFilters.queuedDate && (
                          <Button
                            variant="ghost"
                            size="sm"
                            className="absolute right-2 top-1/2 transform -translate-y-1/2 h-6 w-6 p-0"
                            onClick={() => clearColumnFilter('queuedDate')}
                          >
                            <X size={12} />
                          </Button>
                        )}
                      </div>
                    </TableHead>
                  )}
                  {visibleColumns.totalReviewCount && (
                    <TableHead className="p-2 border-r">
                      <div className="relative">
                        <MagnifyingGlass size={14} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
                        <Input
                          value={columnFilters.totalReviewCount}
                          onChange={(e) => updateColumnFilter('totalReviewCount', e.target.value)}
                          className="pl-9 h-8 text-sm"
                        />
                        {columnFilters.totalReviewCount && (
                          <Button
                            variant="ghost"
                            size="sm"
                            className="absolute right-2 top-1/2 transform -translate-y-1/2 h-6 w-6 p-0"
                            onClick={() => clearColumnFilter('totalReviewCount')}
                          >
                            <X size={12} />
                          </Button>
                        )}
                      </div>
                    </TableHead>
                  )}
                  {visibleColumns.draftableCompare && (
                    <TableHead className="p-2 border-r">
                      {/* Empty for Draftable Compare column */}
                    </TableHead>
                  )}
                  {visibleColumns.updateStatus && (
                    <TableHead className="p-2 border-r">
                      <div className="relative">
                        <MagnifyingGlass size={14} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
                        <Input
                          value={columnFilters.updateStatus}
                          onChange={(e) => updateColumnFilter('updateStatus', e.target.value)}
                          className="pl-9 h-8 text-sm"
                        />
                        {columnFilters.updateStatus && (
                          <Button
                            variant="ghost"
                            size="sm"
                            className="absolute right-2 top-1/2 transform -translate-y-1/2 h-6 w-6 p-0"
                            onClick={() => clearColumnFilter('updateStatus')}
                          >
                            <X size={12} />
                          </Button>
                        )}
                      </div>
                    </TableHead>
                  )}
                  {visibleColumns.emailStatus && (
                    <TableHead className="p-2">
                      {/* Empty for Email Status column */}
                    </TableHead>
                  )}
                </TableRow>
              </TableHeader>
              <TableBody>
                {currentPageData.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={Object.values(visibleColumns).filter(Boolean).length + 1} className="text-center py-8 text-muted-foreground">
                      {Object.values(columnFilters).some(filter => filter !== '') 
                        ? "No items match the current filters" 
                        : "No collaboration items available"
                      }
                    </TableCell>
                  </TableRow>
                ) : (
                  currentPageData.map((item, index) => (
                    <TableRow 
                      key={`${item.id}-${index}`} 
                      className={`
                        ${selectedRows.includes(`${item.id}-${index}`) ? 'bg-blue-50 border-blue-200' : 'hover:bg-muted/30'}
                        ${index % 2 === 0 ? 'bg-white' : 'bg-slate-50/30'}
                        border-b transition-colors h-12
                      `}
                    >
                      <TableCell className="border-r p-3">
                        <Checkbox
                          checked={selectedRows.includes(`${item.id}-${index}`)}
                          onCheckedChange={(checked) => 
                            handleRowSelect(`${item.id}-${index}`, checked as boolean)
                          }
                        />
                      </TableCell>
                      {visibleColumns.id && (
                        <TableCell className="font-mono text-blue-600 font-medium border-r p-3 text-sm">
                          {item.id}
                        </TableCell>
                      )}
                      {visibleColumns.collateralType && (
                        <TableCell className="border-r p-3">
                          <Badge variant="outline" className="text-xs font-medium">
                            {item.collateralType}
                          </Badge>
                        </TableCell>
                      )}
                      {visibleColumns.fontType && (
                        <TableCell className="border-r p-3">
                          <Badge variant="secondary" className="text-xs">
                            {item.fontType}
                          </Badge>
                        </TableCell>
                      )}
                      {visibleColumns.productName && (
                        <TableCell className="border-r p-3 text-sm font-mono">
                          {item.productName}
                        </TableCell>
                      )}
                      {visibleColumns.folderName && (
                        <TableCell className="border-r p-3 text-sm max-w-64 truncate" title={item.folderName}>
                          {item.folderName}
                        </TableCell>
                      )}
                      {visibleColumns.effectiveDate && (
                        <TableCell className="border-r p-3 text-sm font-mono">
                          {item.effectiveDate}
                        </TableCell>
                      )}
                      {visibleColumns.version && (
                        <TableCell className="border-r p-3">
                          <Badge variant="outline" className="font-mono text-xs">
                            {item.version}
                          </Badge>
                        </TableCell>
                      )}
                      {visibleColumns.workflowStage && (
                        <TableCell className="border-r p-3">
                          <Badge className={`text-xs font-medium ${getStatusColor(item.workflowStage)}`}>
                            {item.workflowStage}
                          </Badge>
                        </TableCell>
                      )}
                      {visibleColumns.estimatedDate && (
                        <TableCell className="border-r p-3 text-sm font-mono">
                          {item.estimatedDate}
                        </TableCell>
                      )}
                      {visibleColumns.collaborators && (
                        <TableCell className="border-r p-3 text-sm font-mono text-center">
                          {item.collaborators}
                        </TableCell>
                      )}
                      {visibleColumns.productLink && (
                        <TableCell className="border-r p-3 text-center">
                          <Button variant="ghost" size="sm" className="h-7 w-7 p-0 text-blue-600 hover:bg-blue-50" title="View Product">
                            <Link size={16} />
                          </Button>
                        </TableCell>
                      )}
                      {visibleColumns.reviewSummary && (
                        <TableCell className="border-r p-3 text-sm">
                          {item.reviewSummary || (
                            <span className="text-muted-foreground italic">—</span>
                          )}
                        </TableCell>
                      )}
                      {visibleColumns.reviewersInvolved && (
                        <TableCell className="border-r p-3 text-sm max-w-40 truncate" title={item.reviewersInvolved}>
                          {item.reviewersInvolved}
                        </TableCell>
                      )}
                      {visibleColumns.queuedBy && (
                        <TableCell className="border-r p-3 text-sm">
                          {item.queuedBy}
                        </TableCell>
                      )}
                      {visibleColumns.queuedDate && (
                        <TableCell className="border-r p-3 text-sm font-mono">
                          {item.queuedDate}
                        </TableCell>
                      )}
                      {visibleColumns.totalReviewCount && (
                        <TableCell className="border-r p-3 text-sm text-center">
                          <Badge variant="outline" className="text-xs">
                            {item.totalReviewCount}
                          </Badge>
                        </TableCell>
                      )}
                      {visibleColumns.draftableCompare && (
                        <TableCell className="border-r p-3 text-center">
                          <Button variant="ghost" size="sm" className="h-7 w-7 p-0 text-blue-600 hover:bg-blue-50" title="View Draftable Compare">
                            <Link size={16} />
                          </Button>
                        </TableCell>
                      )}
                      {visibleColumns.updateStatus && (
                        <TableCell className="border-r p-3 text-center">
                          <Button variant="ghost" size="sm" className="h-7 px-2 text-xs text-blue-600 hover:bg-blue-50" title="Update Status">
                            {item.updateStatus}
                          </Button>
                        </TableCell>
                      )}
                      {visibleColumns.emailStatus && (
                        <TableCell className="p-3 text-center">
                          <Button variant="ghost" size="sm" className="h-7 w-7 p-0 text-gray-600 hover:bg-gray-50" title="Email Status">
                            <Eye size={16} />
                          </Button>
                        </TableCell>
                      )}
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
          
          {/* Enhanced Pagination Controls */}
          <div className="flex items-center justify-between mt-4 px-4 pb-4 text-sm text-muted-foreground border-t bg-muted/20">
            <div className="flex items-center gap-4">
              <span className="font-medium">
                {startIndex + 1} to {Math.min(endIndex, filteredAndSortedData.length)} of {filteredAndSortedData.length}
                {collaborateData.length !== filteredAndSortedData.length && (
                  <span className="text-blue-600 font-medium">
                    {' '}(filtered from {collaborateData.length} total)
                  </span>
                )}
              </span>
              {selectedRows.length > 0 && (
                <Badge variant="secondary" className="text-xs px-2 py-1">
                  {selectedRows.length} selected
                </Badge>
              )}
            </div>
            
            {totalPages > 1 && (
              <div className="flex items-center gap-3">
                <span className="text-sm">Page</span>
                <Select value={currentPage.toString()} onValueChange={(value) => setCurrentPage(parseInt(value))}>
                  <SelectTrigger className="w-16 h-8">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {Array.from({ length: totalPages }, (_, i) => (
                      <SelectItem key={i + 1} value={(i + 1).toString()}>
                        {i + 1}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <span className="text-sm">of {totalPages}</span>
                
                <div className="flex items-center gap-1">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                    disabled={currentPage === 1}
                    className="h-8 w-8 p-0"
                  >
                    <CaretLeft size={14} />
                  </Button>
                  
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                    disabled={currentPage === totalPages}
                    className="h-8 w-8 p-0"
                  >
                    <CaretRight size={14} />
                  </Button>
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

function LogsTab() {
  const [sortField, setSortField] = useState<string | null>(null)
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc')
  const [currentPage, setCurrentPage] = useState(1)
  const [pageSize, setPageSize] = useState(10)
  
  // Column filters for search
  const [columnFilters, setColumnFilters] = useState({
    productName: '',
    collaborateVersion: '',
    actionChangeType: '',
    change: '',
    commentReason: '',
    updatedBy: '',
    dateTimestamp: ''
  })
  
  // Column visibility state
  const [visibleColumns, setVisibleColumns] = useKV('logs-visible-columns', {
    productName: true,
    collaborateVersion: true,
    actionChangeType: true,
    change: true,
    commentReason: true,
    updatedBy: true,
    dateTimestamp: true
  })
  
  // Sample data based on the screenshot
  const logsData = [
    {
      id: '1',
      productName: 'H3653015000_H5232001000',
      collaborateVersion: '0.01',
      actionChangeType: 'Status',
      change: 'Ready For Review',
      commentReason: '',
      updatedBy: 'System',
      dateTimestamp: '06/02/2025 05:01:03'
    },
    {
      id: '2',
      productName: 'H3653015000_H5232001000',
      collaborateVersion: '0.01',
      actionChangeType: 'Status',
      change: 'Publishing',
      commentReason: '',
      updatedBy: 'John Mitchell',
      dateTimestamp: '06/02/2025 05:00:14'
    },
    {
      id: '3',
      productName: 'H3653015000_H5232001000',
      collaborateVersion: '0.01',
      actionChangeType: 'Assignment',
      change: 'John Mitchell (Assigned)',
      commentReason: '',
      updatedBy: 'John Mitchell',
      dateTimestamp: '06/02/2025 05:00:14'
    },
    {
      id: '4',
      productName: 'H3653015000_H5232001000',
      collaborateVersion: '0.01',
      actionChangeType: 'Assignment',
      change: 'Sarah Thompson (Assigned)',
      commentReason: '',
      updatedBy: 'John Mitchell',
      dateTimestamp: '06/02/2025 05:00:14'
    },
    {
      id: '5',
      productName: 'H3653015000_H5232001000',
      collaborateVersion: '0.01',
      actionChangeType: 'ECD',
      change: '06/09/2025',
      commentReason: '',
      updatedBy: 'John Mitchell',
      dateTimestamp: '06/02/2025 05:00:14'
    },
    {
      id: '6',
      productName: '',
      collaborateVersion: '',
      actionChangeType: 'User group associated',
      change: 'David Rodriguez associated (Product Gr...',
      commentReason: '',
      updatedBy: 'John Mitchell',
      dateTimestamp: '06/02/2025 04:49:03'
    },
    {
      id: '7',
      productName: '',
      collaborateVersion: '',
      actionChangeType: 'User group associated',
      change: 'Maria Garcia associated (Comp...',
      commentReason: '',
      updatedBy: 'Sarah Thompson',
      dateTimestamp: '05/29/2025 11:27:08'
    },
    {
      id: '8',
      productName: '',
      collaborateVersion: '',
      actionChangeType: 'User group associated',
      change: 'Maria Garcia associated (Legal ...',
      commentReason: '',
      updatedBy: 'Sarah Thompson',
      dateTimestamp: '05/29/2025 11:27:08'
    },
    {
      id: '9',
      productName: '',
      collaborateVersion: '',
      actionChangeType: 'User group associated',
      change: 'Maria Garcia associated (Mark...',
      commentReason: '',
      updatedBy: 'Sarah Thompson',
      dateTimestamp: '05/29/2025 11:27:08'
    },
    {
      id: '10',
      productName: '',
      collaborateVersion: '',
      actionChangeType: 'User group associated',
      change: 'Maria Garcia associated (Produ...',
      commentReason: '',
      updatedBy: 'Sarah Thompson',
      dateTimestamp: '05/29/2025 11:27:08'
    }
  ]
  
  // Available columns configuration
  const availableColumns = [
    { key: 'productName', label: 'Product Name' },
    { key: 'collaborateVersion', label: 'Collaborate Version' },
    { key: 'actionChangeType', label: 'Action / Change Type' },
    { key: 'change', label: 'Change' },
    { key: 'commentReason', label: 'Comment / Reason' },
    { key: 'updatedBy', label: 'Updated By' },
    { key: 'dateTimestamp', label: 'Date and Timestamp' }
  ]
  
  // Filter and sort data
  const filteredAndSortedData = useMemo(() => {
    let filtered = logsData.filter(item => {
      // Apply column filters
      if (columnFilters.productName && !item.productName.toLowerCase().includes(columnFilters.productName.toLowerCase())) {
        return false
      }
      if (columnFilters.collaborateVersion && !item.collaborateVersion.toLowerCase().includes(columnFilters.collaborateVersion.toLowerCase())) {
        return false
      }
      if (columnFilters.actionChangeType && !item.actionChangeType.toLowerCase().includes(columnFilters.actionChangeType.toLowerCase())) {
        return false
      }
      if (columnFilters.change && !item.change.toLowerCase().includes(columnFilters.change.toLowerCase())) {
        return false
      }
      if (columnFilters.commentReason && !item.commentReason.toLowerCase().includes(columnFilters.commentReason.toLowerCase())) {
        return false
      }
      if (columnFilters.updatedBy && !item.updatedBy.toLowerCase().includes(columnFilters.updatedBy.toLowerCase())) {
        return false
      }
      if (columnFilters.dateTimestamp && !item.dateTimestamp.toLowerCase().includes(columnFilters.dateTimestamp.toLowerCase())) {
        return false
      }
      
      return true
    })
    
    if (sortField) {
      filtered.sort((a, b) => {
        const aValue = a[sortField as keyof typeof a] || ''
        const bValue = b[sortField as keyof typeof b] || ''
        
        if (sortDirection === 'asc') {
          return aValue.toString().localeCompare(bValue.toString())
        } else {
          return bValue.toString().localeCompare(aValue.toString())
        }
      })
    }
    
    return filtered
  }, [logsData, sortField, sortDirection, columnFilters])
  
  // Pagination calculations
  const totalPages = Math.ceil(filteredAndSortedData.length / pageSize)
  const startIndex = (currentPage - 1) * pageSize
  const endIndex = startIndex + pageSize
  const currentPageData = filteredAndSortedData.slice(startIndex, endIndex)
  
  // Reset to page 1 when sort or filters change
  useEffect(() => {
    setCurrentPage(1)
  }, [sortField, sortDirection, columnFilters])
  
  const handleSort = (field: string) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc')
    } else {
      setSortField(field)
      setSortDirection('asc')
    }
  }
  
  const updateColumnFilter = (column: string, value: string) => {
    setColumnFilters(prev => ({
      ...prev,
      [column]: value
    }))
  }
  
  const clearColumnFilter = (column: string) => {
    setColumnFilters(prev => ({
      ...prev,
      [column]: ''
    }))
  }
  
  const toggleColumnVisibility = (columnKey: string) => {
    setVisibleColumns((current: any) => ({
      ...current,
      [columnKey]: !current[columnKey]
    }))
  }

  return (
    <div className="space-y-4">
      {/* Header with Total Count */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium">Total</span>
          <span className="text-sm font-semibold text-primary">1440 Logs</span>
        </div>
        
        <div className="flex items-center gap-3">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="flex items-center gap-2 h-9">
                <Columns size={16} />
                Columns
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-64">
              {availableColumns.map((column) => (
                <DropdownMenuCheckboxItem
                  key={column.key}
                  checked={visibleColumns[column.key]}
                  onCheckedChange={() => toggleColumnVisibility(column.key)}
                >
                  {column.label}
                </DropdownMenuCheckboxItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      
      {/* Data Grid */}
      <Card>
        <CardContent className="p-0">
          <div className="border rounded-lg">
            <Table>
              <TableHeader>
                {/* Column Headers with Sort */}
                <TableRow className="bg-muted/30">
                  {visibleColumns.productName && (
                    <TableHead className="border-r h-12 min-w-[200px]">
                      <div className="flex items-center gap-1 cursor-pointer select-none font-semibold" onClick={() => handleSort('productName')}>
                        Product Name
                        {sortField === 'productName' && (
                          sortDirection === 'asc' ? <CaretUp size={12} /> : <CaretDown size={12} />
                        )}
                      </div>
                    </TableHead>
                  )}
                  {visibleColumns.collaborateVersion && (
                    <TableHead className="border-r h-12 min-w-[140px]">
                      <div className="flex items-center gap-1 cursor-pointer select-none font-semibold" onClick={() => handleSort('collaborateVersion')}>
                        Collaborate Version
                        {sortField === 'collaborateVersion' && (
                          sortDirection === 'asc' ? <CaretUp size={12} /> : <CaretDown size={12} />
                        )}
                      </div>
                    </TableHead>
                  )}
                  {visibleColumns.actionChangeType && (
                    <TableHead className="border-r h-12 min-w-[160px]">
                      <div className="flex items-center gap-1 cursor-pointer select-none font-semibold" onClick={() => handleSort('actionChangeType')}>
                        Action / Change Type
                        {sortField === 'actionChangeType' && (
                          sortDirection === 'asc' ? <CaretUp size={12} /> : <CaretDown size={12} />
                        )}
                      </div>
                    </TableHead>
                  )}
                  {visibleColumns.change && (
                    <TableHead className="border-r h-12 min-w-[180px]">
                      <div className="flex items-center gap-1 cursor-pointer select-none font-semibold" onClick={() => handleSort('change')}>
                        Change
                        {sortField === 'change' && (
                          sortDirection === 'asc' ? <CaretUp size={12} /> : <CaretDown size={12} />
                        )}
                      </div>
                    </TableHead>
                  )}
                  {visibleColumns.commentReason && (
                    <TableHead className="border-r h-12 min-w-[140px]">
                      <div className="flex items-center gap-1 cursor-pointer select-none font-semibold" onClick={() => handleSort('commentReason')}>
                        Comment / Reason
                        {sortField === 'commentReason' && (
                          sortDirection === 'asc' ? <CaretUp size={12} /> : <CaretDown size={12} />
                        )}
                      </div>
                    </TableHead>
                  )}
                  {visibleColumns.updatedBy && (
                    <TableHead className="border-r h-12 min-w-[140px]">
                      <div className="flex items-center gap-1 cursor-pointer select-none font-semibold" onClick={() => handleSort('updatedBy')}>
                        Updated By
                        {sortField === 'updatedBy' && (
                          sortDirection === 'asc' ? <CaretUp size={12} /> : <CaretDown size={12} />
                        )}
                      </div>
                    </TableHead>
                  )}
                  {visibleColumns.dateTimestamp && (
                    <TableHead className="h-12 min-w-[160px]">
                      <div className="flex items-center gap-1 cursor-pointer select-none font-semibold" onClick={() => handleSort('dateTimestamp')}>
                        Date and Timestamp
                        {sortField === 'dateTimestamp' && (
                          sortDirection === 'asc' ? <CaretUp size={12} /> : <CaretDown size={12} />
                        )}
                      </div>
                    </TableHead>
                  )}
                </TableRow>

                {/* Filter Row */}
                <TableRow className="bg-white border-b-2">
                  {visibleColumns.productName && (
                    <TableHead className="p-2 border-r">
                      <div className="relative">
                        <MagnifyingGlass size={14} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
                        <Funnel size={14} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
                        <Input
                          value={columnFilters.productName}
                          onChange={(e) => updateColumnFilter('productName', e.target.value)}
                          className="pl-9 pr-9 h-8 text-sm"
                        />
                      </div>
                    </TableHead>
                  )}
                  {visibleColumns.collaborateVersion && (
                    <TableHead className="p-2 border-r">
                      <div className="relative">
                        <MagnifyingGlass size={14} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
                        <Funnel size={14} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
                        <Input
                          value={columnFilters.collaborateVersion}
                          onChange={(e) => updateColumnFilter('collaborateVersion', e.target.value)}
                          className="pl-9 pr-9 h-8 text-sm"
                        />
                      </div>
                    </TableHead>
                  )}
                  {visibleColumns.actionChangeType && (
                    <TableHead className="p-2 border-r">
                      <div className="relative">
                        <MagnifyingGlass size={14} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
                        <Funnel size={14} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
                        <Input
                          value={columnFilters.actionChangeType}
                          onChange={(e) => updateColumnFilter('actionChangeType', e.target.value)}
                          className="pl-9 pr-9 h-8 text-sm"
                        />
                      </div>
                    </TableHead>
                  )}
                  {visibleColumns.change && (
                    <TableHead className="p-2 border-r">
                      <div className="relative">
                        <MagnifyingGlass size={14} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
                        <Funnel size={14} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
                        <Input
                          value={columnFilters.change}
                          onChange={(e) => updateColumnFilter('change', e.target.value)}
                          className="pl-9 pr-9 h-8 text-sm"
                        />
                      </div>
                    </TableHead>
                  )}
                  {visibleColumns.commentReason && (
                    <TableHead className="p-2 border-r">
                      <div className="relative">
                        <MagnifyingGlass size={14} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
                        <Funnel size={14} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
                        <Input
                          value={columnFilters.commentReason}
                          onChange={(e) => updateColumnFilter('commentReason', e.target.value)}
                          className="pl-9 pr-9 h-8 text-sm"
                        />
                      </div>
                    </TableHead>
                  )}
                  {visibleColumns.updatedBy && (
                    <TableHead className="p-2 border-r">
                      <div className="relative">
                        <MagnifyingGlass size={14} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
                        <Funnel size={14} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
                        <Input
                          value={columnFilters.updatedBy}
                          onChange={(e) => updateColumnFilter('updatedBy', e.target.value)}
                          className="pl-9 pr-9 h-8 text-sm"
                        />
                      </div>
                    </TableHead>
                  )}
                  {visibleColumns.dateTimestamp && (
                    <TableHead className="p-2">
                      <div className="relative">
                        <MagnifyingGlass size={14} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
                        <Funnel size={14} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
                        <Input
                          value={columnFilters.dateTimestamp}
                          onChange={(e) => updateColumnFilter('dateTimestamp', e.target.value)}
                          className="pl-9 pr-9 h-8 text-sm"
                        />
                      </div>
                    </TableHead>
                  )}
                </TableRow>
              </TableHeader>
              <TableBody>
                {currentPageData.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={Object.values(visibleColumns).filter(Boolean).length} className="text-center py-8 text-muted-foreground">
                      {Object.values(columnFilters).some(filter => filter !== '') 
                        ? "No logs match the current filters" 
                        : "No log entries available"
                      }
                    </TableCell>
                  </TableRow>
                ) : (
                  currentPageData.map((item, index) => (
                    <TableRow 
                      key={item.id} 
                      className={`
                        hover:bg-muted/30
                        ${index % 2 === 0 ? 'bg-white' : 'bg-slate-50/30'}
                        border-b transition-colors h-11
                      `}
                    >
                      {visibleColumns.productName && (
                        <TableCell className="border-r p-3 text-sm font-mono">
                          {item.productName || (
                            <span className="text-muted-foreground italic">—</span>
                          )}
                        </TableCell>
                      )}
                      {visibleColumns.collaborateVersion && (
                        <TableCell className="border-r p-3 text-center">
                          {item.collaborateVersion ? (
                            <Badge variant="outline" className="font-mono text-xs">
                              {item.collaborateVersion}
                            </Badge>
                          ) : (
                            <span className="text-muted-foreground italic">—</span>
                          )}
                        </TableCell>
                      )}
                      {visibleColumns.actionChangeType && (
                        <TableCell className="border-r p-3 text-sm">
                          {item.actionChangeType}
                        </TableCell>
                      )}
                      {visibleColumns.change && (
                        <TableCell className="border-r p-3 text-sm max-w-48 truncate" title={item.change}>
                          {item.change}
                        </TableCell>
                      )}
                      {visibleColumns.commentReason && (
                        <TableCell className="border-r p-3 text-sm">
                          {item.commentReason || (
                            <span className="text-muted-foreground italic">—</span>
                          )}
                        </TableCell>
                      )}
                      {visibleColumns.updatedBy && (
                        <TableCell className="border-r p-3 text-sm font-medium">
                          {item.updatedBy}
                        </TableCell>
                      )}
                      {visibleColumns.dateTimestamp && (
                        <TableCell className="p-3 text-sm font-mono">
                          {item.dateTimestamp}
                        </TableCell>
                      )}
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
          
          {/* Enhanced Pagination Controls */}
          <div className="flex items-center justify-between mt-4 px-4 pb-4 text-sm text-muted-foreground border-t bg-muted/20">
            <div className="flex items-center gap-4">
              <span className="font-medium">Page Size</span>
              <Select value={pageSize.toString()} onValueChange={(value) => setPageSize(parseInt(value))}>
                <SelectTrigger className="w-16 h-8">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="10">10</SelectItem>
                  <SelectItem value="25">25</SelectItem>
                  <SelectItem value="50">50</SelectItem>
                  <SelectItem value="100">100</SelectItem>
                </SelectContent>
              </Select>
              <span className="font-medium">
                1 to 10 of {filteredAndSortedData.length}
              </span>
            </div>
            
            {totalPages > 1 && (
              <div className="flex items-center gap-3">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                  disabled={currentPage === 1}
                  className="h-8 w-8 p-0"
                >
                  <CaretLeft size={14} />
                </Button>
                
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium">Page 1 of 144</span>
                </div>
                
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                  disabled={currentPage === totalPages}
                  className="h-8 w-8 p-0"
                >
                  <CaretRight size={14} />
                </Button>
                
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setCurrentPage(totalPages)}
                  disabled={currentPage === totalPages}
                  className="h-8 px-3 text-sm"
                >
                  »
                </Button>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

function UserManagementTab() {
  const [sortField, setSortField] = useState<string | null>(null)
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc')
  const [currentPage, setCurrentPage] = useState(1)
  const [pageSize, setPageSize] = useState(10)
  const [selectedRows, setSelectedRows] = useKV('user-management-selected-rows', [] as string[])
  
  // Column filters for search
  const [columnFilters, setColumnFilters] = useState({
    name: '',
    email: '',
    userGroups: ''
  })
  
  // Column visibility state
  const [visibleColumns, setVisibleColumns] = useKV('user-management-visible-columns', {
    name: true,
    email: true,
    userGroups: true
  })
  
  // Sample user data based on the screenshot
  const userData = [
    {
      id: '1',
      name: 'Vaishnavi',
      email: 'vaishnavi.katamble@simplifyheathcare.com',
      userGroups: ''
    },
    {
      id: '2',
      name: 'amol bondre',
      email: 'amol.bondre@simplifyheathcare.com',
      userGroups: ''
    },
    {
      id: '3',
      name: 'Ankita Thakre',
      email: 'ankita.thakre@simplifyheathcare.com',
      userGroups: ''
    },
    {
      id: '4',
      name: 'Chad Carpenter',
      email: 'Chad.Carpenter@medmutual.com',
      userGroups: ''
    },
    {
      id: '5',
      name: 'Chad Carpenter',
      email: 'Chad.Carpenter@ProMedica.org',
      userGroups: ''
    },
    {
      id: '6',
      name: 'Donna Piko',
      email: 'Donna.Piko@medmutual.com',
      userGroups: ''
    },
    {
      id: '7',
      name: 'Elaine Warnecke',
      email: 'Elaine.Warnecke@medmutual.com',
      userGroups: 'Product Group,Compliance Group,Legal Group,Marketing Group'
    },
    {
      id: '8',
      name: 'Holly Murray',
      email: 'Holly.Murray@medmutual.com',
      userGroups: ''
    },
    {
      id: '9',
      name: 'Lauryn Bledsoe',
      email: 'Lauryn.Bledsoe@medmutual.com',
      userGroups: ''
    },
    {
      id: '10',
      name: 'Mary Wachtell',
      email: 'Mary.Wachtell@medmutual.com',
      userGroups: ''
    }
  ]
  
  // Available columns configuration
  const availableColumns = [
    { key: 'name', label: 'Name' },
    { key: 'email', label: 'Email' },
    { key: 'userGroups', label: 'User Groups' }
  ]
  
  // Filter and sort data
  const filteredAndSortedData = useMemo(() => {
    let filtered = userData.filter(item => {
      // Apply column filters
      if (columnFilters.name && !item.name.toLowerCase().includes(columnFilters.name.toLowerCase())) {
        return false
      }
      if (columnFilters.email && !item.email.toLowerCase().includes(columnFilters.email.toLowerCase())) {
        return false
      }
      if (columnFilters.userGroups && !item.userGroups.toLowerCase().includes(columnFilters.userGroups.toLowerCase())) {
        return false
      }
      
      return true
    })
    
    if (sortField) {
      filtered.sort((a, b) => {
        const aValue = a[sortField as keyof typeof a] || ''
        const bValue = b[sortField as keyof typeof b] || ''
        
        if (sortDirection === 'asc') {
          return aValue.toString().localeCompare(bValue.toString())
        } else {
          return bValue.toString().localeCompare(aValue.toString())
        }
      })
    }
    
    return filtered
  }, [userData, sortField, sortDirection, columnFilters])
  
  // Pagination calculations
  const totalPages = Math.ceil(filteredAndSortedData.length / pageSize)
  const startIndex = (currentPage - 1) * pageSize
  const endIndex = startIndex + pageSize
  const currentPageData = filteredAndSortedData.slice(startIndex, endIndex)
  
  // Reset to page 1 when sort or filters change
  useEffect(() => {
    setCurrentPage(1)
  }, [sortField, sortDirection, columnFilters])
  
  const handleSort = (field: string) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc')
    } else {
      setSortField(field)
      setSortDirection('asc')
    }
  }
  
  const handleRowSelect = (rowId: string, checked: boolean) => {
    setSelectedRows((current: string[]) => 
      checked ? [...current, rowId] : current.filter(id => id !== rowId)
    )
  }
  
  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      const allVisibleIds = currentPageData.map(item => item.id)
      setSelectedRows((current: string[]) => {
        const newSet = new Set([...current, ...allVisibleIds])
        return Array.from(newSet)
      })
    } else {
      const visibleIds = new Set(currentPageData.map(item => item.id))
      setSelectedRows((current: string[]) => 
        current.filter(id => !visibleIds.has(id))
      )
    }
  }
  
  const updateColumnFilter = (column: string, value: string) => {
    setColumnFilters(prev => ({
      ...prev,
      [column]: value
    }))
  }
  
  const clearColumnFilter = (column: string) => {
    setColumnFilters(prev => ({
      ...prev,
      [column]: ''
    }))
  }
  
  const toggleColumnVisibility = (columnKey: string) => {
    setVisibleColumns((current: any) => ({
      ...current,
      [columnKey]: !current[columnKey]
    }))
  }
  
  const isAllVisibleSelected = currentPageData.length > 0 && 
    currentPageData.every(item => selectedRows.includes(item.id))
  
  const isSomeVisibleSelected = currentPageData.some(item => selectedRows.includes(item.id))

  return (
    <div className="space-y-4">
      {/* Header with Total Count and Action Buttons */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium">Total</span>
          <span className="text-sm font-semibold text-primary">{filteredAndSortedData.length} Users</span>
        </div>
        
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="sm" className="h-9 w-9 p-0 text-destructive hover:bg-destructive/10" title="Delete User">
            <X size={16} />
          </Button>
          
          <Button variant="outline" size="sm" className="h-9">
            Manage User Groups
          </Button>
          
          <Button className="h-9">
            Add/Edit User
          </Button>
        </div>
      </div>
      
      {/* Data Grid */}
      <Card>
        <CardContent className="p-0">
          <div className="border rounded-lg">
            <Table>
              <TableHeader>
                {/* Column Headers with Sort */}
                <TableRow className="bg-muted/30">
                  <TableHead className="w-12 border-r h-12">
                    <Checkbox
                      checked={isAllVisibleSelected}
                      onCheckedChange={handleSelectAll}
                      ref={(el) => {
                        if (el) el.indeterminate = isSomeVisibleSelected && !isAllVisibleSelected
                      }}
                    />
                  </TableHead>
                  {visibleColumns.name && (
                    <TableHead className="border-r h-12 min-w-[200px]">
                      <div className="flex items-center gap-1 cursor-pointer select-none font-semibold" onClick={() => handleSort('name')}>
                        Name
                        {sortField === 'name' && (
                          sortDirection === 'asc' ? <CaretUp size={12} /> : <CaretDown size={12} />
                        )}
                      </div>
                    </TableHead>
                  )}
                  {visibleColumns.email && (
                    <TableHead className="border-r h-12 min-w-[300px]">
                      <div className="flex items-center gap-1 cursor-pointer select-none font-semibold" onClick={() => handleSort('email')}>
                        Email
                        {sortField === 'email' && (
                          sortDirection === 'asc' ? <CaretUp size={12} /> : <CaretDown size={12} />
                        )}
                      </div>
                    </TableHead>
                  )}
                  {visibleColumns.userGroups && (
                    <TableHead className="h-12 min-w-[400px]">
                      <div className="flex items-center gap-1 cursor-pointer select-none font-semibold" onClick={() => handleSort('userGroups')}>
                        User Groups
                        {sortField === 'userGroups' && (
                          sortDirection === 'asc' ? <CaretUp size={12} /> : <CaretDown size={12} />
                        )}
                      </div>
                    </TableHead>
                  )}
                </TableRow>

                {/* Filter Row */}
                <TableRow className="bg-white border-b-2">
                  <TableHead className="p-2 border-r">
                    {/* Empty cell for checkbox column */}
                  </TableHead>
                  {visibleColumns.name && (
                    <TableHead className="p-2 border-r">
                      <div className="relative">
                        <MagnifyingGlass size={14} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
                        <Input
                          value={columnFilters.name}
                          onChange={(e) => updateColumnFilter('name', e.target.value)}
                          className="pl-9 h-8 text-sm"
                        />
                        {columnFilters.name && (
                          <Button
                            variant="ghost"
                            size="sm"
                            className="absolute right-2 top-1/2 transform -translate-y-1/2 h-6 w-6 p-0"
                            onClick={() => clearColumnFilter('name')}
                          >
                            <X size={12} />
                          </Button>
                        )}
                      </div>
                    </TableHead>
                  )}
                  {visibleColumns.email && (
                    <TableHead className="p-2 border-r">
                      <div className="relative">
                        <MagnifyingGlass size={14} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
                        <Input
                          value={columnFilters.email}
                          onChange={(e) => updateColumnFilter('email', e.target.value)}
                          className="pl-9 h-8 text-sm"
                        />
                        {columnFilters.email && (
                          <Button
                            variant="ghost"
                            size="sm"
                            className="absolute right-2 top-1/2 transform -translate-y-1/2 h-6 w-6 p-0"
                            onClick={() => clearColumnFilter('email')}
                          >
                            <X size={12} />
                          </Button>
                        )}
                      </div>
                    </TableHead>
                  )}
                  {visibleColumns.userGroups && (
                    <TableHead className="p-2">
                      <div className="relative">
                        <MagnifyingGlass size={14} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
                        <Input
                          value={columnFilters.userGroups}
                          onChange={(e) => updateColumnFilter('userGroups', e.target.value)}
                          className="pl-9 h-8 text-sm"
                        />
                        {columnFilters.userGroups && (
                          <Button
                            variant="ghost"
                            size="sm"
                            className="absolute right-2 top-1/2 transform -translate-y-1/2 h-6 w-6 p-0"
                            onClick={() => clearColumnFilter('userGroups')}
                          >
                            <X size={12} />
                          </Button>
                        )}
                      </div>
                    </TableHead>
                  )}
                </TableRow>
              </TableHeader>
              <TableBody>
                {currentPageData.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={Object.values(visibleColumns).filter(Boolean).length + 1} className="text-center py-8 text-muted-foreground">
                      {Object.values(columnFilters).some(filter => filter !== '') 
                        ? "No users match the current filters" 
                        : "No users available"
                      }
                    </TableCell>
                  </TableRow>
                ) : (
                  currentPageData.map((user, index) => (
                    <TableRow 
                      key={user.id} 
                      className={`
                        ${selectedRows.includes(user.id) ? 'bg-blue-50 border-blue-200' : 'hover:bg-muted/30'}
                        ${index % 2 === 0 ? 'bg-white' : 'bg-slate-50/30'}
                        border-b transition-colors h-12
                      `}
                    >
                      <TableCell className="border-r p-3">
                        <Checkbox
                          checked={selectedRows.includes(user.id)}
                          onCheckedChange={(checked) => 
                            handleRowSelect(user.id, checked as boolean)
                          }
                        />
                      </TableCell>
                      {visibleColumns.name && (
                        <TableCell className="border-r p-3 text-sm font-medium">
                          {user.name}
                        </TableCell>
                      )}
                      {visibleColumns.email && (
                        <TableCell className="border-r p-3 text-sm text-blue-600">
                          {user.email}
                        </TableCell>
                      )}
                      {visibleColumns.userGroups && (
                        <TableCell className="p-3 text-sm">
                          {user.userGroups ? (
                            <div className="flex flex-wrap gap-1">
                              {user.userGroups.split(',').map((group, idx) => (
                                <Badge 
                                  key={idx} 
                                  variant="outline" 
                                  className="text-xs font-medium"
                                >
                                  {group.trim()}
                                </Badge>
                              ))}
                            </div>
                          ) : (
                            <span className="text-muted-foreground italic">—</span>
                          )}
                        </TableCell>
                      )}
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
          
          {/* Enhanced Pagination Controls */}
          <div className="flex items-center justify-between mt-4 px-4 pb-4 text-sm text-muted-foreground border-t bg-muted/20">
            <div className="flex items-center gap-4">
              <span className="font-medium">Page Size</span>
              <Select value={pageSize.toString()} onValueChange={(value) => setPageSize(parseInt(value))}>
                <SelectTrigger className="w-16 h-8">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="10">10</SelectItem>
                  <SelectItem value="25">25</SelectItem>
                  <SelectItem value="50">50</SelectItem>
                  <SelectItem value="100">100</SelectItem>
                </SelectContent>
              </Select>
              <span className="font-medium">
                1 to 10 of {filteredAndSortedData.length}
              </span>
            </div>
            
            {totalPages > 1 && (
              <div className="flex items-center gap-3">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                  disabled={currentPage === 1}
                  className="h-8 w-8 p-0"
                >
                  <CaretLeft size={14} />
                </Button>
                
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium">Page 1 of 3</span>
                </div>
                
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                  disabled={currentPage === totalPages}
                  className="h-8 w-8 p-0"
                >
                  <CaretRight size={14} />
                </Button>
                
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setCurrentPage(totalPages)}
                  disabled={currentPage === totalPages}
                  className="h-8 px-3 text-sm"
                >
                  »
                </Button>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

function VisualDashboardTab() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Visual Dashboard</CardTitle>
        <CardDescription>
          Analytics and insights for collaboration workflows
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground">
          Charts, graphs, and visual analytics will be displayed here.
        </p>
      </CardContent>
    </Card>
  )
}

export function Collaborate() {
  const [currentTab, setCurrentTab] = useState('collaborate')

  return (
    <div className="p-4">
      <div className="mb-4">
        <h1 className="text-2xl font-semibold text-foreground mb-2">
          Collaborate
        </h1>
        <p className="text-muted-foreground">
          Work together on documents and track progress
        </p>
      </div>

      <Tabs value={currentTab} onValueChange={setCurrentTab} className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="collaborate" className="flex items-center gap-2">
            <FileText size={16} />
            Collaborate
          </TabsTrigger>
          <TabsTrigger value="logs" className="flex items-center gap-2">
            <Clock size={16} />
            Logs
          </TabsTrigger>
          <TabsTrigger value="user-management" className="flex items-center gap-2">
            <Users size={16} />
            User Management
          </TabsTrigger>
          <TabsTrigger value="visual-dashboard" className="flex items-center gap-2">
            <BarChart3 size={16} />
            Visual Dashboard
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="collaborate" className="mt-4">
          <CollaborateMain />
        </TabsContent>
        
        <TabsContent value="logs" className="mt-4">
          <LogsTab />
        </TabsContent>
        
        <TabsContent value="user-management" className="mt-4">
          <UserManagementTab />
        </TabsContent>
        
        <TabsContent value="visual-dashboard" className="mt-4">
          <VisualDashboardTab />
        </TabsContent>
      </Tabs>
    </div>
  )
}

export function Generate() {
  const [currentTab, setCurrentTab] = useState('generate-collateral')
  const [selectedDocuments, setSelectedDocuments] = useKV('generate-selected-docs', [] as string[])
  const [collateralName, setCollateralName] = useState('')
  const [selectedCollateral, setSelectedCollateral] = useKV('generate-selected-collateral', '' as string)
  
  // Document grid state with enhanced filtering
  const [sortField, setSortField] = useState<string | null>(null)
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc')
  
  // Smart search state
  const [productNameSearch, setProductNameSearch] = useState('')
  
  // Column filters for search and filtering - dynamic based on collateral type
  // Get initial column filters based on collateral type
  const getInitialColumnFilters = (collateralType: string) => {
    switch (collateralType) {
      case 'Medicare ANOC':
      case 'Medicare EOC':
      case 'SOB':
      case 'SBC':
      case 'SOB Rx filling':
      case 'SOB Med Filling':
      case 'SBC Filling':
      case 'Outline of Coverage':
        return {
          documentName: '',
          planType: '',
          egwp: '',
          folderName: '',
          folderVersionNumber: ''
        }
      case 'Medicare SB':
        return {
          documentName: '',
          planType: '',
          egwp: '',
          language: '',
          folderName: '',
          folderVersionNumber: ''
        }
      case 'Commercial Handbook':
      case 'Benefit Description':
      case 'HIPAA Codification':
      case 'Medicaid Handbook':
        return {
          documentName: '',
          planType: '',
          folderName: '',
          folderVersionNumber: ''
        }
      default:
        return {
          documentName: '',
          planType: '',
          egwp: '',
          folderName: '',
          folderVersionNumber: ''
        }
    }
  }

  const [columnFilters, setColumnFilters] = useState(getInitialColumnFilters(''))
  
  // Pagination state
  const [currentPage, setCurrentPage] = useState(1)
  const [pageSize, setPageSize] = useState(10)
  
  // Get column configuration for current collateral type
  const getColumnsForCollateral = (collateralType: string) => {
    switch (collateralType) {
      case 'Medicare ANOC':
      case 'Medicare EOC':
      case 'SOB':
      case 'SBC':
      case 'SOB Rx filling':
      case 'SOB Med Filling':
      case 'SBC Filling':
      case 'Outline of Coverage':
        return [
          { key: 'documentName', label: 'Document Name' },
          { key: 'planType', label: 'Plan Type' },
          { key: 'egwp', label: 'EGWP' },
          { key: 'folderName', label: 'Folder Name' },
          { key: 'folderVersionNumber', label: 'Folder Version Number' }
        ]
      case 'Medicare SB':
        return [
          { key: 'documentName', label: 'Document Name' },
          { key: 'planType', label: 'Plan Type' },
          { key: 'egwp', label: 'EGWP' },
          { key: 'language', label: 'Language' },
          { key: 'folderName', label: 'Folder Name' },
          { key: 'folderVersionNumber', label: 'Folder Version Number' }
        ]
      case 'Commercial Handbook':
      case 'Benefit Description':
      case 'HIPAA Codification':
      case 'Medicaid Handbook':
        return [
          { key: 'documentName', label: 'Document Name' },
          { key: 'planType', label: 'Plan Type' },
          { key: 'folderName', label: 'Folder Name' },
          { key: 'folderVersionNumber', label: 'Folder Version Number' }
        ]
      default:
        return [
          { key: 'documentName', label: 'Document Name' },
          { key: 'planType', label: 'Plan Type' },
          { key: 'egwp', label: 'EGWP' },
          { key: 'folderName', label: 'Folder Name' },
          { key: 'folderVersionNumber', label: 'Folder Version Number' }
        ]
    }
  }

  // Column visibility state - dynamic based on collateral type
  const getInitialColumnVisibility = (collateralType: string) => {
    const columns = getColumnsForCollateral(collateralType)
    const visibility: { [key: string]: boolean } = {}
    columns.forEach(col => {
      visibility[col.key] = true
    })
    return visibility
  }

  const [visibleColumns, setVisibleColumns] = useKV('generate-visible-columns', getInitialColumnVisibility(''))

  // Get available columns for current collateral type
  const availableColumns = useMemo(() => {
    return getColumnsForCollateral(selectedCollateral)
  }, [selectedCollateral])

  // Column visibility toggle function
  const toggleColumnVisibility = (columnKey: string) => {
    setVisibleColumns((current: any) => ({
      ...current,
      [columnKey]: !current[columnKey]
    }))
  }
  
  // Sample data matching the screenshot
  const collateralOptions = [
    'Medicare ANOC',
    'Medicare EOC',
    'Medicare SB',
    'SOB',
    'SBC',
    'SOB Rx filling',
    'SOB Med Filling',
    'SBC Filling',
    'Commercial Handbook',
    'Benefit Description',
    'HIPAA Codification',
    'Medicaid Handbook',
    'Outline of Coverage'
  ]
  
  // Different document sets for each collateral type with unique data
  const getDocumentsForCollateral = (collateralType: string) => {
    switch (collateralType) {
      case 'Medicare ANOC':
        return [
          { id: 'anoc_H2406064000', documentName: 'H2406064000', planType: '', egwp: 'No', folderName: 'H2406064000', folderVersionNumber: '2026_0.01' },
          { id: 'anoc_H2406084000', documentName: 'H2406084000', planType: 'Local PPO', egwp: 'No', folderName: 'H2406084000', folderVersionNumber: '2026_0.01' },
          { id: 'anoc_H0169001000', documentName: 'H0169001000', planType: 'HMOPOS', egwp: 'No', folderName: 'H0169001000', folderVersionNumber: '2026_0.01' },
          { id: 'anoc_H0169002000', documentName: 'H0169002000', planType: 'HMOPOS', egwp: 'No', folderName: 'H0169002000', folderVersionNumber: '2026_0.01' },
          { id: 'anoc_H0169003000', documentName: 'H0169003000', planType: 'HMOPOS', egwp: 'No', folderName: 'H0169003000', folderVersionNumber: '2026_0.01' },
          { id: 'anoc_H0169004000', documentName: 'H0169004000', planType: 'HMOPOS', egwp: 'No', folderName: 'H0169004000', folderVersionNumber: '2026_0.01' },
          { id: 'anoc_H0169006000', documentName: 'H0169006000', planType: 'HMOPOS', egwp: 'No', folderName: 'H0169006000', folderVersionNumber: '2026_0.01' },
          { id: 'anoc_H0169008000', documentName: 'H0169008000', planType: 'HMOPOS', egwp: 'No', folderName: 'H0169008000', folderVersionNumber: '2026_0.01' },
          { id: 'anoc_H0169009000', documentName: 'H0169009000', planType: 'HMOPOS', egwp: 'No', folderName: 'H0169009000', folderVersionNumber: '2026_0.01' },
          { id: 'anoc_H0251002000', documentName: 'H0251002000', planType: 'HMOPOS', egwp: 'No', folderName: 'H0251002000', folderVersionNumber: '2026_0.01' },
          { id: 'anoc_H0251004000', documentName: 'H0251004000', planType: 'HMOPOS', egwp: 'No', folderName: 'H0251004000', folderVersionNumber: '2026_0.01' },
          { id: 'anoc_H5421001000', documentName: 'H5421001000', planType: 'HMO', egwp: 'Yes', folderName: 'H5421001000', folderVersionNumber: '2026_0.01' },
          { id: 'anoc_H3347002000', documentName: 'H3347002000', planType: 'HMO', egwp: 'Yes', folderName: 'H3347002000', folderVersionNumber: '2026_0.01' },
          { id: 'anoc_H4512005000', documentName: 'H4512005000', planType: 'PPO', egwp: 'No', folderName: 'H4512005000', folderVersionNumber: '2026_0.01' },
          { id: 'anoc_H9876003000', documentName: 'H9876003000', planType: 'Regional PPO', egwp: 'Yes', folderName: 'H9876003000', folderVersionNumber: '2026_0.01' }
        ]
      case 'Medicare EOC':
        return [
          { id: 'eoc_H2406064000', documentName: 'H2406064000', planType: 'HMO', egwp: 'No', folderName: 'H2406064000', folderVersionNumber: '2026_1.01' },
          { id: 'eoc_H2406084000', documentName: 'H2406084000', planType: 'Local PPO', egwp: 'No', folderName: 'H2406084000', folderVersionNumber: '2026_1.01' },
          { id: 'eoc_H0169001000', documentName: 'H0169001000', planType: 'HMOPOS', egwp: 'No', folderName: 'H0169001000', folderVersionNumber: '2026_1.01' },
          { id: 'eoc_H0169002000', documentName: 'H0169002000', planType: 'HMOPOS', egwp: 'No', folderName: 'H0169002000', folderVersionNumber: '2026_1.01' },
          { id: 'eoc_H0169003000', documentName: 'H0169003000', planType: 'HMOPOS', egwp: 'No', folderName: 'H0169003000', folderVersionNumber: '2026_1.01' },
          { id: 'eoc_H0169004000', documentName: 'H0169004000', planType: 'HMOPOS', egwp: 'No', folderName: 'H0169004000', folderVersionNumber: '2026_1.01' },
          { id: 'eoc_H0169006000', documentName: 'H0169006000', planType: 'HMOPOS', egwp: 'No', folderName: 'H0169006000', folderVersionNumber: '2026_1.01' },
          { id: 'eoc_H0169008000', documentName: 'H0169008000', planType: 'HMOPOS', egwp: 'No', folderName: 'H0169008000', folderVersionNumber: '2026_1.01' },
          { id: 'eoc_H0169009000', documentName: 'H0169009000', planType: 'HMOPOS', egwp: 'No', folderName: 'H0169009000', folderVersionNumber: '2026_1.01' },
          { id: 'eoc_H0251002000', documentName: 'H0251002000', planType: 'HMOPOS', egwp: 'No', folderName: 'H0251002000', folderVersionNumber: '2026_1.01' },
          { id: 'eoc_H0251004000', documentName: 'H0251004000', planType: 'HMOPOS', egwp: 'No', folderName: 'H0251004000', folderVersionNumber: '2026_1.01' },
          { id: 'eoc_H5421001000', documentName: 'H5421001000', planType: 'HMO', egwp: 'Yes', folderName: 'H5421001000', folderVersionNumber: '2026_1.01' },
          { id: 'eoc_H3347002000', documentName: 'H3347002000', planType: 'HMO', egwp: 'Yes', folderName: 'H3347002000', folderVersionNumber: '2026_1.01' },
          { id: 'eoc_H4512005000', documentName: 'H4512005000', planType: 'PPO', egwp: 'No', folderName: 'H4512005000', folderVersionNumber: '2026_1.01' },
          { id: 'eoc_H9876003000', documentName: 'H9876003000', planType: 'Regional PPO', egwp: 'Yes', folderName: 'H9876003000', folderVersionNumber: '2026_1.01' },
          { id: 'eoc_H7722004000', documentName: 'H7722004000', planType: 'HMO-POS', egwp: 'No', folderName: 'H7722004000', folderVersionNumber: '2026_1.01' },
          { id: 'eoc_H8833006000', documentName: 'H8833006000', planType: 'PPO', egwp: 'Yes', folderName: 'H8833006000', folderVersionNumber: '2026_1.01' }
        ]
      case 'Medicare SB':
        return [
          { id: 'sb_H2406064000', documentName: 'H2406064000', planType: 'HMO', egwp: 'No', language: 'English', folderName: 'H2406064000', folderVersionNumber: '2026_2.01' },
          { id: 'sb_H2406064000_es', documentName: 'H2406064000', planType: 'HMO', egwp: 'No', language: 'Spanish', folderName: 'H2406064000_ES', folderVersionNumber: '2026_2.01' },
          { id: 'sb_H2406084000', documentName: 'H2406084000', planType: 'Local PPO', egwp: 'No', language: 'English', folderName: 'H2406084000', folderVersionNumber: '2026_2.01' },
          { id: 'sb_H0169001000', documentName: 'H0169001000', planType: 'HMOPOS', egwp: 'No', language: 'English', folderName: 'H0169001000', folderVersionNumber: '2026_2.01' },
          { id: 'sb_H0169001000_zh', documentName: 'H0169001000', planType: 'HMOPOS', egwp: 'No', language: 'Chinese', folderName: 'H0169001000_ZH', folderVersionNumber: '2026_2.01' },
          { id: 'sb_H0169002000', documentName: 'H0169002000', planType: 'HMOPOS', egwp: 'No', language: 'English', folderName: 'H0169002000', folderVersionNumber: '2026_2.01' },
          { id: 'sb_H0169003000', documentName: 'H0169003000', planType: 'HMOPOS', egwp: 'No', language: 'English', folderName: 'H0169003000', folderVersionNumber: '2026_2.01' },
          { id: 'sb_H0169004000', documentName: 'H0169004000', planType: 'HMOPOS', egwp: 'No', language: 'English', folderName: 'H0169004000', folderVersionNumber: '2026_2.01' },
          { id: 'sb_H0169004000_es', documentName: 'H0169004000', planType: 'HMOPOS', egwp: 'No', language: 'Spanish', folderName: 'H0169004000_ES', folderVersionNumber: '2026_2.01' },
          { id: 'sb_H0169006000', documentName: 'H0169006000', planType: 'HMOPOS', egwp: 'No', language: 'English', folderName: 'H0169006000', folderVersionNumber: '2026_2.01' },
          { id: 'sb_H0169008000', documentName: 'H0169008000', planType: 'HMOPOS', egwp: 'No', language: 'English', folderName: 'H0169008000', folderVersionNumber: '2026_2.01' },
          { id: 'sb_H0169009000', documentName: 'H0169009000', planType: 'HMOPOS', egwp: 'No', language: 'English', folderName: 'H0169009000', folderVersionNumber: '2026_2.01' },
          { id: 'sb_H5421001000', documentName: 'H5421001000', planType: 'HMO', egwp: 'Yes', language: 'English', folderName: 'H5421001000', folderVersionNumber: '2026_2.01' },
          { id: 'sb_H5421001000_es', documentName: 'H5421001000', planType: 'HMO', egwp: 'Yes', language: 'Spanish', folderName: 'H5421001000_ES', folderVersionNumber: '2026_2.01' },
          { id: 'sb_H3347002000', documentName: 'H3347002000', planType: 'HMO', egwp: 'Yes', language: 'English', folderName: 'H3347002000', folderVersionNumber: '2026_2.01' },
          { id: 'sb_H4512005000', documentName: 'H4512005000', planType: 'PPO', egwp: 'No', language: 'English', folderName: 'H4512005000', folderVersionNumber: '2026_2.01' },
          { id: 'sb_H9876003000', documentName: 'H9876003000', planType: 'Regional PPO', egwp: 'Yes', language: 'English', folderName: 'H9876003000', folderVersionNumber: '2026_2.01' },
          { id: 'sb_H7722004000', documentName: 'H7722004000', planType: 'HMO-POS', egwp: 'No', language: 'English', folderName: 'H7722004000', folderVersionNumber: '2026_2.01' },
          { id: 'sb_H8833006000', documentName: 'H8833006000', planType: 'PPO', egwp: 'Yes', language: 'English', folderName: 'H8833006000', folderVersionNumber: '2026_2.01' },
          { id: 'sb_H8833006000_es', documentName: 'H8833006000', planType: 'PPO', egwp: 'Yes', language: 'Spanish', folderName: 'H8833006000_ES', folderVersionNumber: '2026_2.01' }
        ]
      case 'SOB':
        return [
          { id: 'sob_H2406064000', documentName: 'H2406064000 SOB', planType: 'HMO', egwp: 'No', folderName: 'H2406064000_SOB', folderVersionNumber: '2026_1.0' },
          { id: 'sob_H2406084000', documentName: 'H2406084000 SOB', planType: 'PPO', egwp: 'No', folderName: 'H2406084000_SOB', folderVersionNumber: '2026_1.0' },
          { id: 'sob_H0169001000', documentName: 'H0169001000 SOB', planType: 'HMOPOS', egwp: 'No', folderName: 'H0169001000_SOB', folderVersionNumber: '2026_1.0' },
          { id: 'sob_H0169002000', documentName: 'H0169002000 SOB', planType: 'HMOPOS', egwp: 'No', folderName: 'H0169002000_SOB', folderVersionNumber: '2026_1.0' },
          { id: 'sob_H5421001000', documentName: 'H5421001000 SOB', planType: 'HMO', egwp: 'Yes', folderName: 'H5421001000_SOB', folderVersionNumber: '2026_1.0' }
        ]
      case 'SBC':
        return [
          { id: 'sbc_H2406064000', documentName: 'H2406064000 SBC', planType: 'HMO', egwp: 'No', folderName: 'H2406064000_SBC', folderVersionNumber: '2026_1.0' },
          { id: 'sbc_H2406084000', documentName: 'H2406084000 SBC', planType: 'PPO', egwp: 'No', folderName: 'H2406084000_SBC', folderVersionNumber: '2026_1.0' },
          { id: 'sbc_H0169001000', documentName: 'H0169001000 SBC', planType: 'HMOPOS', egwp: 'No', folderName: 'H0169001000_SBC', folderVersionNumber: '2026_1.0' },
          { id: 'sbc_H0169002000', documentName: 'H0169002000 SBC', planType: 'HMOPOS', egwp: 'No', folderName: 'H0169002000_SBC', folderVersionNumber: '2026_1.0' },
          { id: 'sbc_H5421001000', documentName: 'H5421001000 SBC', planType: 'HMO', egwp: 'Yes', folderName: 'H5421001000_SBC', folderVersionNumber: '2026_1.0' }
        ]
      case 'SOB Rx filling':
        return [
          { id: 'sob_rx_H2406064000', documentName: 'H2406064000 SOB Rx', planType: 'HMO', egwp: 'No', folderName: 'H2406064000_SOB_Rx', folderVersionNumber: '2026_1.0' },
          { id: 'sob_rx_H2406084000', documentName: 'H2406084000 SOB Rx', planType: 'PPO', egwp: 'No', folderName: 'H2406084000_SOB_Rx', folderVersionNumber: '2026_1.0' },
          { id: 'sob_rx_H0169001000', documentName: 'H0169001000 SOB Rx', planType: 'HMOPOS', egwp: 'No', folderName: 'H0169001000_SOB_Rx', folderVersionNumber: '2026_1.0' }
        ]
      case 'SOB Med Filling':
        return [
          { id: 'sob_med_H2406064000', documentName: 'H2406064000 SOB Med', planType: 'HMO', egwp: 'No', folderName: 'H2406064000_SOB_Med', folderVersionNumber: '2026_1.0' },
          { id: 'sob_med_H2406084000', documentName: 'H2406084000 SOB Med', planType: 'PPO', egwp: 'No', folderName: 'H2406084000_SOB_Med', folderVersionNumber: '2026_1.0' },
          { id: 'sob_med_H0169001000', documentName: 'H0169001000 SOB Med', planType: 'HMOPOS', egwp: 'No', folderName: 'H0169001000_SOB_Med', folderVersionNumber: '2026_1.0' }
        ]
      case 'SBC Filling':
        return [
          { id: 'sbc_fill_H2406064000', documentName: 'H2406064000 SBC Fill', planType: 'HMO', egwp: 'No', folderName: 'H2406064000_SBC_Fill', folderVersionNumber: '2026_1.0' },
          { id: 'sbc_fill_H2406084000', documentName: 'H2406084000 SBC Fill', planType: 'PPO', egwp: 'No', folderName: 'H2406084000_SBC_Fill', folderVersionNumber: '2026_1.0' },
          { id: 'sbc_fill_H0169001000', documentName: 'H0169001000 SBC Fill', planType: 'HMOPOS', egwp: 'No', folderName: 'H0169001000_SBC_Fill', folderVersionNumber: '2026_1.0' }
        ]
      case 'Commercial Handbook':
        return [
          { id: 'comm_handbook_001', documentName: 'Commercial Handbook v1', planType: 'Commercial', egwp: 'No', folderName: 'Commercial_Handbook_v1', folderVersionNumber: '2026_1.0' },
          { id: 'comm_handbook_002', documentName: 'Commercial Handbook v2', planType: 'Commercial', egwp: 'No', folderName: 'Commercial_Handbook_v2', folderVersionNumber: '2026_1.0' },
          { id: 'comm_handbook_003', documentName: 'Commercial Handbook v3', planType: 'Commercial', egwp: 'No', folderName: 'Commercial_Handbook_v3', folderVersionNumber: '2026_1.0' }
        ]
      case 'Benefit Description':
        return [
          { id: 'benefit_desc_001', documentName: 'Medical Benefits Description', planType: 'HMO', egwp: 'No', folderName: 'Medical_Benefits_Desc', folderVersionNumber: '2026_1.0' },
          { id: 'benefit_desc_002', documentName: 'Pharmacy Benefits Description', planType: 'PPO', egwp: 'No', folderName: 'Pharmacy_Benefits_Desc', folderVersionNumber: '2026_1.0' },
          { id: 'benefit_desc_003', documentName: 'Dental Benefits Description', planType: 'HMO', egwp: 'Yes', folderName: 'Dental_Benefits_Desc', folderVersionNumber: '2026_1.0' }
        ]
      case 'HIPAA Codification':
        return [
          { id: 'hipaa_001', documentName: 'HIPAA Privacy Notice', planType: 'All Plans', egwp: 'No', folderName: 'HIPAA_Privacy_Notice', folderVersionNumber: '2026_1.0' },
          { id: 'hipaa_002', documentName: 'HIPAA Security Policies', planType: 'All Plans', egwp: 'No', folderName: 'HIPAA_Security_Policies', folderVersionNumber: '2026_1.0' },
          { id: 'hipaa_003', documentName: 'HIPAA Breach Notification', planType: 'All Plans', egwp: 'No', folderName: 'HIPAA_Breach_Notification', folderVersionNumber: '2026_1.0' }
        ]
      case 'Medicaid Handbook':
        return [
          { id: 'medicaid_001', documentName: 'Medicaid Member Handbook', planType: 'Medicaid', egwp: 'No', folderName: 'Medicaid_Member_Handbook', folderVersionNumber: '2026_1.0' },
          { id: 'medicaid_002', documentName: 'Medicaid Provider Handbook', planType: 'Medicaid', egwp: 'No', folderName: 'Medicaid_Provider_Handbook', folderVersionNumber: '2026_1.0' },
          { id: 'medicaid_003', documentName: 'Medicaid Benefits Guide', planType: 'Medicaid', egwp: 'No', folderName: 'Medicaid_Benefits_Guide', folderVersionNumber: '2026_1.0' }
        ]
      case 'Outline of Coverage':
        return [
          { id: 'ooc_H2406064000', documentName: 'H2406064000 Outline', planType: 'HMO', egwp: 'No', folderName: 'H2406064000_Outline', folderVersionNumber: '2026_1.0' },
          { id: 'ooc_H2406084000', documentName: 'H2406084000 Outline', planType: 'PPO', egwp: 'No', folderName: 'H2406084000_Outline', folderVersionNumber: '2026_1.0' },
          { id: 'ooc_H0169001000', documentName: 'H0169001000 Outline', planType: 'HMOPOS', egwp: 'No', folderName: 'H0169001000_Outline', folderVersionNumber: '2026_1.0' },
          { id: 'ooc_H5421001000', documentName: 'H5421001000 Outline', planType: 'HMO', egwp: 'Yes', folderName: 'H5421001000_Outline', folderVersionNumber: '2026_1.0' }
        ]
      default:
        return []
    }
  }

  // Get current documents based on selected collateral
  const documents = useMemo(() => {
    if (!selectedCollateral) {
      return []
    }
    
    return getDocumentsForCollateral(selectedCollateral)
  }, [selectedCollateral])

  
  // Filter and sort documents with enhanced filtering
  const filteredAndSortedDocuments = useMemo(() => {
    let filtered = documents.filter(document => {
      // Apply smart search filter first
      const searchableFields = Object.values(document).join(' ').toLowerCase()
      if (productNameSearch && !searchableFields.includes(productNameSearch.toLowerCase())) {
        return false
      }
      
      // Apply common column filters
      if (columnFilters.documentName && !document.documentName.toLowerCase().includes(columnFilters.documentName.toLowerCase())) {
        return false
      }
      if (columnFilters.planType && !document.planType.toLowerCase().includes(columnFilters.planType.toLowerCase())) {
        return false
      }
      if (columnFilters.egwp && !document.egwp.toLowerCase().includes(columnFilters.egwp.toLowerCase())) {
        return false
      }
      if (columnFilters.folderName && !document.folderName.toLowerCase().includes(columnFilters.folderName.toLowerCase())) {
        return false
      }
      if (columnFilters.folderVersionNumber && !document.folderVersionNumber.toLowerCase().includes(columnFilters.folderVersionNumber.toLowerCase())) {
        return false
      }

      // Apply specific filters based on collateral type
      if (selectedCollateral === 'Medicare SB') {
        const sbDoc = document as any
        if (columnFilters.language && sbDoc.language && !sbDoc.language.toLowerCase().includes(columnFilters.language.toLowerCase())) {
          return false
        }
      }
      
      return true
    })
    
    // Apply sorting
    if (sortField) {
      filtered.sort((a, b) => {
        const aValue = a[sortField as keyof typeof a] || ''
        const bValue = b[sortField as keyof typeof b] || ''
        
        if (sortDirection === 'asc') {
          return aValue.toString().localeCompare(bValue.toString())
        } else {
          return bValue.toString().localeCompare(aValue.toString())
        }
      })
    }
    
    return filtered
  }, [documents, sortField, sortDirection, columnFilters, productNameSearch, selectedCollateral])
  
  // Pagination calculations
  const totalPages = Math.ceil(filteredAndSortedDocuments.length / pageSize)
  const startIndex = (currentPage - 1) * pageSize
  const endIndex = startIndex + pageSize
  const currentPageDocuments = filteredAndSortedDocuments.slice(startIndex, endIndex)
  
  // Reset to page 1 when sort or filters change
  useEffect(() => {
    setCurrentPage(1)
  }, [sortField, sortDirection, columnFilters, productNameSearch])
  
  const handleDocumentSelect = (docId: string, checked: boolean) => {
    setSelectedDocuments((current: string[]) => 
      checked ? [...current, docId] : current.filter(id => id !== docId)
    )
  }
  
  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      const allVisibleIds = currentPageDocuments.map(doc => doc.id)
      setSelectedDocuments((current: string[]) => {
        const newSet = new Set([...current, ...allVisibleIds])
        return Array.from(newSet)
      })
    } else {
      const visibleIds = new Set(currentPageDocuments.map(doc => doc.id))
      setSelectedDocuments((current: string[]) => 
        current.filter(id => !visibleIds.has(id))
      )
    }
  }
  
  const handleSort = (field: string) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc')
    } else {
      setSortField(field)
      setSortDirection('asc')
    }
  }

  const updateColumnFilter = (column: string, value: string) => {
    setColumnFilters(prev => ({
      ...prev,
      [column]: value
    }))
  }

  const clearColumnFilter = (column: string) => {
    setColumnFilters(prev => ({
      ...prev,
      [column]: ''
    }))
  }

  const clearAllFilters = () => {
    setColumnFilters(getInitialColumnFilters(selectedCollateral))
    setProductNameSearch('')
  }

  const handleCollateralSelect = (collateral: string) => {
    setSelectedCollateral(collateral)
    // Reset filters when collateral type changes
    const newFilters = getInitialColumnFilters(collateral)
    setColumnFilters(newFilters)
    setProductNameSearch('')
    setCurrentPage(1)
    
    // Update column visibility for the new collateral type
    const newVisibility = getInitialColumnVisibility(collateral)
    setVisibleColumns(newVisibility)
  }

  const isAllVisibleSelected = currentPageDocuments.length > 0 && 
    currentPageDocuments.every(doc => selectedDocuments.includes(doc.id))
  
  const isSomeVisibleSelected = currentPageDocuments.some(doc => selectedDocuments.includes(doc.id))

  const handleQueueCombined = () => {
    if (selectedDocuments.length === 0) {
      alert('Please select at least one document to queue combined.')
      return
    }
    
    // Show confirmation for Queue Combined action
    const confirmed = confirm(`Queue ${selectedDocuments.length} document(s) as combined collateral for ${selectedCollateral}?`)
    if (confirmed) {
      alert(`Successfully queued ${selectedDocuments.length} documents as combined collateral for ${selectedCollateral}.`)
      // Clear selection after successful queue
      setSelectedDocuments([])
    }
  }

  const handleQueue = () => {
    if (selectedDocuments.length === 0) {
      alert('Please select at least one document to queue.')
      return
    }
    
    // Show confirmation for regular Queue action
    const confirmed = confirm(`Queue ${selectedDocuments.length} document(s) for ${selectedCollateral}?`)
    if (confirmed) {
      alert(`Successfully queued ${selectedDocuments.length} documents for ${selectedCollateral}.`)
      // Clear selection after successful queue
      setSelectedDocuments([])
    }
  }

  return (
    <div className="p-4">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h1 className="text-2xl font-semibold text-foreground">Generate</h1>
          <p className="text-muted-foreground mt-1">
            Generate Documents in word, Print X, 508 and large print in English and other languages
          </p>
        </div>
      </div>
      
      <Tabs value={currentTab} onValueChange={setCurrentTab} className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="generate-collateral" className="flex items-center gap-2">
            <FileText size={16} />
            Generate Collateral
          </TabsTrigger>
          <TabsTrigger value="queued-collateral" className="flex items-center gap-2">
            <Clock size={16} />
            Queued Collateral
          </TabsTrigger>
          <TabsTrigger value="system-compare" className="flex items-center gap-2">
            <BarChart3 size={16} />
            System Generated Compare
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="generate-collateral" className="mt-4">
          <div className="space-y-4">
            {/* Global Filters */}
            <Card>
              <CardContent className="pt-4">
                <div className="grid grid-cols-5 gap-3">
                  <div className="space-y-1">
                    <Label className="text-sm font-medium">
                      Effective Year <span className="text-red-500">*</span>
                    </Label>
                    <Select defaultValue="2026">
                      <SelectTrigger className="h-9">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="2026">2026</SelectItem>
                        <SelectItem value="2025">2025</SelectItem>
                        <SelectItem value="2024">2024</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-1">
                    <Label className="text-sm font-medium">
                      Print Type <span className="text-red-500">*</span>
                    </Label>
                    <Select defaultValue="regular">
                      <SelectTrigger className="h-9">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="regular">Regular</SelectItem>
                        <SelectItem value="large-print-16pt">Large Print 16pt</SelectItem>
                        <SelectItem value="large-print-17pt">Large Print 17pt</SelectItem>
                        <SelectItem value="large-print-18pt">Large Print 18pt</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-1">
                    <Label className="text-sm font-medium">
                      Language <span className="text-red-500">*</span>
                    </Label>
                    <Select defaultValue="english">
                      <SelectTrigger className="h-9">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="english">English</SelectItem>
                        <SelectItem value="spanish">Spanish</SelectItem>
                        <SelectItem value="chinese">Chinese</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-1">
                    <Label className="text-sm font-medium">Version</Label>
                    <Select defaultValue="released">
                      <SelectTrigger className="h-9">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="released">Released</SelectItem>
                        <SelectItem value="in-progress">In Progress</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-1">
                    <Label className="text-sm font-medium">
                      Line of Business <span className="text-red-500">*</span>
                    </Label>
                    <Select defaultValue="both">
                      <SelectTrigger className="h-9">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="both">Both</SelectItem>
                        <SelectItem value="individual">Individual</SelectItem>
                        <SelectItem value="egwp">EGWP</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            {/* Main Content Area */}
            <div className="grid grid-cols-[280px_1fr] gap-4">
              {/* Left Panel - Collateral Selection */}
              <Card className="h-fit">
                <CardHeader className="pb-3">
                  <CardTitle className="text-base flex items-center justify-between">
                    Generate Collaterals List
                    <span className="text-xs font-normal text-muted-foreground">(Select One)</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="space-y-1">
                    <Label className="text-sm font-medium">Collateral Name</Label>
                    <Input
                      value={collateralName}
                      onChange={(e) => setCollateralName(e.target.value)}
                      placeholder="Enter collateral name"
                      className="h-9"
                    />
                  </div>
                  
                  <div className="space-y-2 max-h-[calc(100vh-320px)] overflow-y-auto pr-1">
                    {collateralOptions.map((collateral) => (
                      <div 
                        key={collateral}
                        onClick={() => handleCollateralSelect(collateral)}
                        className={`
                          cursor-pointer p-3 rounded-lg border transition-all duration-200 hover:shadow-sm
                          ${selectedCollateral === collateral 
                            ? 'border-primary bg-primary/10 shadow-sm ring-1 ring-primary/30' 
                            : 'border-border bg-card hover:border-primary/50 hover:bg-primary/5'
                          }
                        `}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex flex-col min-w-0 flex-1">
                            <span className="text-sm font-medium text-foreground truncate">{collateral}</span>
                            <span className="text-xs text-muted-foreground mt-0.5 line-clamp-2">
                              {collateral === 'Medicare ANOC' ? 'Annual Notice of Change' :
                               collateral === 'Medicare EOC' ? 'Evidence of Coverage' :
                               collateral === 'Medicare SB' ? 'Summary of Benefits' :
                               collateral === 'SOB' ? 'Summary of Benefits' :
                               collateral === 'SBC' ? 'Summary of Benefits and Coverage' :
                               collateral === 'SOB Rx filling' ? 'Summary of Benefits Rx Filling' :
                               collateral === 'SOB Med Filling' ? 'Summary of Benefits Med Filling' :
                               collateral === 'SBC Filling' ? 'Summary of Benefits and Coverage Filling' :
                               collateral === 'Commercial Handbook' ? 'Commercial Member Handbook' :
                               collateral === 'Benefit Description' ? 'Benefit Description Documents' :
                               collateral === 'HIPAA Codification' ? 'HIPAA Compliance Documents' :
                               collateral === 'Medicaid Handbook' ? 'Medicaid Member Resources' :
                               collateral === 'Outline of Coverage' ? 'Coverage Outline Documents' : ''
                              }
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
              
              {/* Right Panel - Document Selection */}
              <Card>
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between gap-4">
                    <div className="flex-1">
                      <SmartSearchBar
                        placeholder="Search documents..."
                        value={productNameSearch}
                        onChange={setProductNameSearch}
                        onSearch={(query) => setProductNameSearch(query)}
                        className="max-w-md"
                      />
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="outline" size="sm" className="flex items-center gap-2 h-8">
                            <Columns size={14} />
                            Columns
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-48">
                          {availableColumns.map((column) => (
                            <DropdownMenuCheckboxItem
                              key={column.key}
                              checked={visibleColumns[column.key]}
                              onCheckedChange={() => toggleColumnVisibility(column.key)}
                            >
                              {column.label}
                            </DropdownMenuCheckboxItem>
                          ))}
                        </DropdownMenuContent>
                      </DropdownMenu>
                      <Button 
                        onClick={handleQueue}
                        className="bg-blue-600 hover:bg-blue-700 h-8"
                      >
                        Queue
                      </Button>
                      {selectedCollateral === 'Medicare SB' && (
                        <Button 
                          onClick={handleQueueCombined}
                          className="bg-green-600 hover:bg-green-700 h-8"
                        >
                          Queue Combined
                        </Button>
                      )}
                    </div>
                  </div>
                  
                  <CardTitle className="text-base mt-3">
                    Select Documents
                    {selectedCollateral && (
                      <span className="text-xs font-normal text-muted-foreground ml-2">
                        ({filteredAndSortedDocuments.length} available)
                      </span>
                    )}
                  </CardTitle>
                </CardHeader>
                
                <CardContent className="p-3">
                  {/* Filter Summary and Clear All */}
                  {(Object.values(columnFilters).some(filter => filter !== '') || productNameSearch) && (
                    <div className="flex items-center justify-between mb-3 p-2 bg-blue-50 rounded-lg border">
                      <div className="flex items-center gap-2">
                        <Funnel size={14} className="text-blue-600" />
                        <span className="text-sm font-medium text-blue-800">
                          Active Filters: {Object.values(columnFilters).filter(filter => filter !== '').length + (productNameSearch ? 1 : 0)}
                        </span>
                      </div>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        onClick={clearAllFilters}
                        className="text-blue-600 hover:text-blue-700 h-7"
                      >
                        Clear All
                      </Button>
                    </div>
                  )}

                  <div className="border rounded-lg">
                    <Table>
                      <TableHeader>
                        {/* Column Headers with Sort */}
                        <TableRow className="bg-muted/50">
                          <TableHead className="w-10 border-r h-10">
                            <Checkbox
                              checked={isAllVisibleSelected}
                              onCheckedChange={handleSelectAll}
                              ref={(el) => {
                                if (el) el.indeterminate = isSomeVisibleSelected && !isAllVisibleSelected
                              }}
                            />
                          </TableHead>
                          {visibleColumns.documentName && (
                            <TableHead className="border-r h-10">
                              <div className="flex items-center gap-1 cursor-pointer select-none font-semibold" onClick={() => handleSort('documentName')}>
                                Document Name
                                {sortField === 'documentName' && (
                                  sortDirection === 'asc' ? <CaretUp size={12} /> : <CaretDown size={12} />
                                )}
                              </div>
                            </TableHead>
                          )}
                          {availableColumns.slice(1).map((column, index) => (
                            visibleColumns[column.key] && (
                              <TableHead 
                                key={column.key}
                                className={`${index < availableColumns.slice(1).length - 1 ? 'border-r' : ''} h-10`}
                              >
                                <div className="flex items-center gap-1 cursor-pointer select-none font-semibold" onClick={() => handleSort(column.key)}>
                                  {column.label}
                                  {sortField === column.key && (
                                    sortDirection === 'asc' ? <CaretUp size={12} /> : <CaretDown size={12} />
                                  )}
                                </div>
                              </TableHead>
                            )
                          ))}
                        </TableRow>

                        {/* Filter Row */}
                        <TableRow className="bg-muted/30">
                          <TableHead className="w-10 border-r p-1" />
                          {visibleColumns.documentName && (
                            <TableHead className="border-r p-1">
                              <div className="relative">
                                <MagnifyingGlass size={12} className="absolute left-2 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
                                <Input
                                  value={productNameSearch}
                                  onChange={(e) => setProductNameSearch(e.target.value)}
                                  placeholder="Filter documents..."
                                  className="pl-7 h-7 text-sm"
                                />
                                {productNameSearch && (
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    className="absolute right-1 top-1/2 transform -translate-y-1/2 h-5 w-5 p-0"
                                    onClick={() => setProductNameSearch('')}
                                  >
                                    <X size={10} />
                                  </Button>
                                )}
                              </div>
                            </TableHead>
                          )}
                          {availableColumns.slice(1).map((column, index) => (
                            visibleColumns[column.key] && (
                              <TableHead 
                                key={`filter-${column.key}`}
                                className={`p-1 ${index < availableColumns.slice(1).length - 1 ? 'border-r' : ''}`}
                              >
                                <div className="relative">
                                  <MagnifyingGlass size={12} className="absolute left-2 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
                                  <Input
                                    value={columnFilters[column.key] || ''}
                                    onChange={(e) => updateColumnFilter(column.key, e.target.value)}
                                    className="pl-7 h-7 text-sm"
                                  />
                                  {columnFilters[column.key] && (
                                    <Button
                                      variant="ghost"
                                      size="sm"
                                      className="absolute right-1 top-1/2 transform -translate-y-1/2 h-5 w-5 p-0"
                                      onClick={() => clearColumnFilter(column.key)}
                                    >
                                      <X size={10} />
                                    </Button>
                                  )}
                                </div>
                              </TableHead>
                            )
                          ))}
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {currentPageDocuments.length === 0 ? (
                          <TableRow>
                            <TableCell colSpan={Object.values(visibleColumns).filter(Boolean).length + 1} className="text-center py-8 text-muted-foreground">
                              {!selectedCollateral
                                ? "Please select a collateral type to view available documents"
                                : (Object.values(columnFilters).some(filter => filter !== '') || productNameSearch)
                                ? "No documents match the current filters" 
                                : "No documents available"
                              }
                            </TableCell>
                          </TableRow>
                        ) : (
                          currentPageDocuments.map((document, index) => (
                            <TableRow 
                              key={document.id} 
                              className="border-b transition-colors h-9 hover:bg-muted/50"
                            >
                              <TableCell className="w-10 border-r p-2">
                                <Checkbox
                                  checked={selectedDocuments.includes(document.id)}
                                  onCheckedChange={(checked) => {
                                    if (checked) {
                                      setSelectedDocuments([...selectedDocuments, document.id])
                                    } else {
                                      setSelectedDocuments(selectedDocuments.filter(id => id !== document.id))
                                    }
                                  }}
                                />
                              </TableCell>
                              {visibleColumns.documentName && (
                                <TableCell className="border-r p-2 text-sm font-medium">
                                  {document.documentName}
                                </TableCell>
                              )}
                              {availableColumns.slice(1).map((column, colIndex) => (
                                visibleColumns[column.key] && (
                                  <TableCell 
                                    key={column.key}
                                    className={`p-2 text-sm ${colIndex < availableColumns.slice(1).length - 1 ? 'border-r' : ''}`}
                                  >
                                    {document[column.key as keyof typeof document]}
                                  </TableCell>
                                )
                              ))}
                            </TableRow>
                          ))
                        )}
                      </TableBody>
                    </Table>
                  </div>

                  {/* Enhanced Pagination Controls */}
                  <div className="flex items-center justify-between mt-4 px-4 pb-4 text-sm text-muted-foreground border-t bg-muted/20">
                    <div className="flex items-center gap-4">
                      <span className="font-medium">
                        Showing {startIndex + 1} - {Math.min(endIndex, filteredAndSortedDocuments.length)} of {filteredAndSortedDocuments.length}
                        {documents.length !== filteredAndSortedDocuments.length && (
                          <span className="text-blue-600 font-medium">
                            {' '}(filtered from {documents.length} total)
                          </span>
                        )}
                        {selectedDocuments.length > 0 && (
                          <Badge variant="secondary" className="ml-2 text-xs">
                            {selectedDocuments.length} selected
                          </Badge>
                        )}
                      </span>
                    </div>
                    
                    {totalPages > 1 && (
                      <div className="flex items-center gap-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => setCurrentPage(currentPage - 1)}
                          disabled={currentPage === 1}
                          className="h-7 w-7 p-0"
                        >
                          <CaretLeft size={12} />
                        </Button>
                        
                        <div className="flex items-center gap-2">
                          <span className="text-sm">Page</span>
                          <Input
                            type="number"
                            min="1"
                            max={totalPages}
                            value={currentPage}
                            onChange={(e) => {
                              const page = parseInt(e.target.value)
                              if (page >= 1 && page <= totalPages) {
                                setCurrentPage(page)
                              }
                            }}
                            className="w-14 h-7 text-center text-sm"
                          />
                          <span className="text-sm">of {totalPages}</span>
                        </div>
                        
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => setCurrentPage(currentPage + 1)}
                          disabled={currentPage === totalPages}
                          className="h-7 w-7 p-0"
                        >
                          <CaretRight size={12} />
                        </Button>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="queued-collateral" className="mt-4">
          <QueuedCollateral />
        </TabsContent>
        
        <TabsContent value="system-compare" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>System Generated Compare</CardTitle>
              <CardDescription>
                Compare and analyze system-generated documents
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Comparison tools will be implemented here.
              </p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

export function MasterList() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedMasterList, setSelectedMasterList] = useState<any>(null)

  // Collections organized by categories
  const masterListCategories = [
    {
      id: 'cascade',
      title: 'Cascade Collections',
      description: 'Prescription packages and tiers management',
      icon: '🔄',
      color: 'bg-blue-50 border-blue-200 hover:bg-blue-100',
      masterlists: [
        {
          id: 'prescription-packages',
          name: 'Prescription Packages',
          description: 'Manage prescription drug packages and formulary tiers',
          lastModified: '2025-01-15',
          records: 1247,
          status: 'Active'
        },
        {
          id: 'drug-tiers',
          name: 'Drug Tiers',
          description: 'Configure drug tier classifications and coverage levels',
          lastModified: '2025-01-14',
          records: 523,
          status: 'Active'
        },
        {
          id: 'formulary-rules',
          name: 'Formulary Rules',
          description: 'Define rules for drug formulary management',
          lastModified: '2025-01-13',
          records: 892,
          status: 'Active'
        },
        {
          id: 'prior-auth',
          name: 'Prior Authorization',
          description: 'Manage prior authorization requirements and processes',
          lastModified: '2025-01-12',
          records: 678,
          status: 'Active'
        },
        {
          id: 'step-therapy',
          name: 'Step Therapy',
          description: 'Configure step therapy protocols and requirements',
          lastModified: '2025-01-11',
          records: 445,
          status: 'Active'
        },
        {
          id: 'quantity-limits',
          name: 'Quantity Limits',
          description: 'Set quantity limits for prescription medications',
          lastModified: '2025-01-10',
          records: 1156,
          status: 'Active'
        },
        {
          id: 'coverage-gaps',
          name: 'Coverage Gaps',
          description: 'Manage coverage gap rules and exceptions',
          lastModified: '2025-01-09',
          records: 234,
          status: 'Active'
        },
        {
          id: 'therapeutic-categories',
          name: 'Therapeutic Categories',
          description: 'Define therapeutic drug categories and classifications',
          lastModified: '2025-01-08',
          records: 789,
          status: 'Active'
        }
      ]
    },
    {
      id: 'mapping',
      title: 'Mapping Collections',
      description: 'API configuration and field mapping management',
      icon: '🗂️',
      color: 'bg-green-50 border-green-200 hover:bg-green-100',
      masterlists: [
        {
          id: 'api-config',
          name: 'API Configuration',
          description: 'Configure API endpoints and connection settings',
          lastModified: '2025-01-15',
          records: 156,
          status: 'Active'
        },
        {
          id: 'field-mapping',
          name: 'Field Mapping',
          description: 'Map data fields between systems and formats',
          lastModified: '2025-01-14',
          records: 324,
          status: 'Active'
        },
        {
          id: 'business-entity-mapping',
          name: 'Business Entity Mapping',
          description: 'Map business entities across different systems',
          lastModified: '2025-01-13',
          records: 287,
          status: 'Active'
        },
        {
          id: 'data-transformation',
          name: 'Data Transformation Rules',
          description: 'Define rules for data transformation and validation',
          lastModified: '2025-01-12',
          records: 492,
          status: 'Active'
        },
        {
          id: 'integration-endpoints',
          name: 'Integration Endpoints',
          description: 'Manage integration points and service endpoints',
          lastModified: '2025-01-11',
          records: 128,
          status: 'Active'
        },
        {
          id: 'workflow-mapping',
          name: 'Workflow Mapping',
          description: 'Map workflows between different business processes',
          lastModified: '2025-01-10',
          records: 376,
          status: 'Active'
        }
      ]
    },
    {
      id: 'certificates',
      title: 'Certificates & Specifications',
      description: 'Certificate management and download specifications',
      icon: '📋',
      color: 'bg-purple-50 border-purple-200 hover:bg-purple-100',
      masterlists: [
        {
          id: 'certificate-templates',
          name: 'Certificate Templates',
          description: 'Manage certificate templates and formats',
          lastModified: '2025-01-15',
          records: 89,
          status: 'Active'
        },
        {
          id: 'download-specs',
          name: 'Download Specifications',
          description: 'Define specifications for document downloads',
          lastModified: '2025-01-14',
          records: 145,
          status: 'Active'
        },
        {
          id: 'compliance-specs',
          name: 'Compliance Specifications',
          description: 'Manage compliance requirements and specifications',
          lastModified: '2025-01-13',
          records: 267,
          status: 'Active'
        },
        {
          id: 'format-standards',
          name: 'Format Standards',
          description: 'Define document format standards and guidelines',
          lastModified: '2025-01-12',
          records: 178,
          status: 'Active'
        },
        {
          id: 'quality-metrics',
          name: 'Quality Metrics',
          description: 'Define quality metrics and measurement standards',
          lastModified: '2025-01-11',
          records: 234,
          status: 'Active'
        }
      ]
    },
    {
      id: 'integration',
      title: 'Integration Collections',
      description: 'Integration mappings and system synchronization',
      icon: '🔗',
      color: 'bg-orange-50 border-orange-200 hover:bg-orange-100',
      masterlists: [
        {
          id: 'hpms-sync-mappings',
          name: 'HPMS sync mappings',
          description: 'Configure Health Plan Management System synchronization mappings',
          lastModified: '2025-01-15',
          records: 412,
          status: 'Active'
        },
        {
          id: 'api-mappings',
          name: 'API mappings',
          description: 'Manage API endpoint mappings and data transformations',
          lastModified: '2025-01-14',
          records: 298,
          status: 'Active'
        },
        {
          id: 'odm-mappings',
          name: 'ODM mappings',
          description: 'Object Data Model mappings for cross-system integration',
          lastModified: '2025-01-13',
          records: 156,
          status: 'Active'
        },
        {
          id: 'excel-upload-mappings',
          name: 'Excel upload mappings',
          description: 'Define mappings for Excel file upload and processing',
          lastModified: '2025-01-12',
          records: 234,
          status: 'Active'
        }
      ]
    }
  ]

  const generateMasterListData = (masterList: any) => {
    // Generate sample data based on collections type
    const baseData = []
    for (let i = 1; i <= Math.min(50, masterList.records); i++) {
      baseData.push({
        id: `${masterList.id}-${String(i).padStart(3, '0')}`,
        name: `${masterList.name} Item ${i}`,
        code: `${masterList.id.toUpperCase().substring(0, 3)}-${String(i).padStart(4, '0')}`,
        description: `Sample description for ${masterList.name} item ${i}`,
        status: i % 10 === 0 ? 'Inactive' : 'Active',
        category: masterList.name,
        lastModified: new Date(2025, 0, Math.floor(Math.random() * 15) + 1).toLocaleDateString(),
        modifiedBy: ['John Doe', 'Jane Smith', 'Mike Johnson', 'Sarah Wilson'][Math.floor(Math.random() * 4)],
        effectiveDate: '1/1/2026',
        expirationDate: new Date(2025, 11, 31).toLocaleDateString(),
        version: '2026_14.0'
      })
    }
    return baseData
  }

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'active':
        return 'bg-green-100 text-green-800 border-green-200'
      case 'inactive':
        return 'bg-red-100 text-red-800 border-red-200'
      case 'pending':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200'
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200'
    }
  }

  const filteredCategories = masterListCategories.map(category => ({
    ...category,
    masterlists: category.masterlists.filter(masterlist =>
      masterlist.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      masterlist.description.toLowerCase().includes(searchTerm.toLowerCase())
    )
  })).filter(category => category.masterlists.length > 0)

  if (selectedMasterList) {
    return (
      <div className="p-4">
        <div className="flex items-center gap-4 mb-6">
          <Button
            variant="ghost"
            onClick={() => setSelectedMasterList(null)}
            className="flex items-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Collections
          </Button>
          <div>
            <h1 className="text-2xl font-semibold text-foreground">{selectedMasterList.name}</h1>
            <p className="text-muted-foreground mt-1">{selectedMasterList.description}</p>
          </div>
        </div>

        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Collection Data</CardTitle>
                <div className="flex items-center gap-4 mt-2">
                  <p className="text-sm text-muted-foreground">
                    Effective Date: <span className="font-semibold text-foreground">1/1/2026</span>, Version No. <span className="font-semibold text-foreground">2026_14.0</span>
                  </p>
                </div>
              </div>
              <Button variant="outline" size="sm" className="h-8 w-8 p-0" title="Save">
                <FloppyDisk size={16} />
              </Button>
            </div>
            
            {/* Toolbar with Button Icons */}
            <div className="flex items-center justify-between mt-4 p-2 bg-muted/30 rounded-lg border">
              <div className="flex items-center gap-1">
                <Button variant="ghost" size="sm" className="h-8 w-8 p-0" title="Word wrap">
                  <TextAa size={16} />
                </Button>
                <Button variant="ghost" size="sm" className="h-8 w-8 p-0" title="Add rows">
                  <Plus size={16} />
                </Button>
                <Button variant="ghost" size="sm" className="h-8 w-8 p-0" title="Remove rows">
                  <X size={16} />
                </Button>
                <Button variant="ghost" size="sm" className="h-8 w-8 p-0" title="Copy rows">
                  <CopySimple size={16} />
                </Button>
                <Button variant="ghost" size="sm" className="h-8 w-8 p-0" title="Clear filter">
                  <XCircle size={16} />
                </Button>
                <Button variant="ghost" size="sm" className="h-8 w-8 p-0" title="View">
                  <Eye size={16} />
                </Button>
                <Button variant="ghost" size="sm" className="h-8 w-8 p-0" title="Download to Excel">
                  <Download size={16} />
                </Button>
                <Button variant="ghost" size="sm" className="h-8 w-8 p-0" title="Upload to Excel">
                  <CloudArrowUp size={16} />
                </Button>
                <Button variant="ghost" size="sm" className="h-8 w-8 p-0" title="Refresh">
                  <ArrowsClockwise size={16} />
                </Button>
                <Button variant="ghost" size="sm" className="h-8 w-8 p-0" title="Full screen">
                  <FrameCorners size={16} />
                </Button>
                <Button variant="ghost" size="sm" className="h-8 w-8 p-0" title="Grid preferences">
                  <Gear size={16} />
                </Button>
              </div>
              
              <div className="text-sm text-muted-foreground">
                {selectedMasterList.records} total records
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="overflow-auto max-h-[600px]">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>ID</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Code</TableHead>
                    <TableHead>Description</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Last Modified</TableHead>
                    <TableHead>Modified By</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {generateMasterListData(selectedMasterList).map((record) => (
                    <TableRow key={record.id}>
                      <TableCell className="font-mono text-sm">{record.id}</TableCell>
                      <TableCell className="font-medium">{record.name}</TableCell>
                      <TableCell className="font-mono text-sm">{record.code}</TableCell>
                      <TableCell className="text-sm text-muted-foreground max-w-xs truncate">
                        {record.description}
                      </TableCell>
                      <TableCell>
                        <Badge className={`text-xs ${getStatusColor(record.status)}`}>
                          {record.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-sm">{record.lastModified}</TableCell>
                      <TableCell className="text-sm">{record.modifiedBy}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="p-4">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-semibold text-foreground">Collections</h1>
          <p className="text-muted-foreground mt-1">Manage your collections organized by category</p>
        </div>
        
        <div className="flex items-center gap-3">
          <SmartSearchBar
            placeholder="Search collections..."
            value={searchTerm}
            onChange={setSearchTerm}
            onSearch={(query) => setSearchTerm(query)}
            className="w-80"
          />
        </div>
      </div>

      {searchTerm && (
        <div className="mb-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
          <div className="flex items-center gap-2">
            <MagnifyingGlass size={14} className="text-blue-600" />
            <span className="text-sm font-medium text-blue-800">
              {filteredCategories.reduce((total, cat) => total + cat.masterlists.length, 0)} results for "{searchTerm}"
            </span>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setSearchTerm('')}
              className="text-blue-600 hover:text-blue-700 h-6 px-2 ml-auto"
            >
              Clear
            </Button>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCategories.map((category) => (
          <Card key={category.id} className={`${category.color} transition-colors`}>
            <CardHeader className="pb-3">
              <div className="flex items-center gap-3">
                <div className="text-2xl">{category.icon}</div>
                <div className="flex-1">
                  <CardTitle className="text-lg">{category.title}</CardTitle>
                  <p className="text-sm text-muted-foreground mt-1">{category.description}</p>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 max-h-64 overflow-y-auto">
                {category.masterlists.map((masterlist) => (
                  <div
                    key={masterlist.id}
                    onClick={() => setSelectedMasterList(masterlist)}
                    className="flex items-center justify-between p-3 bg-white/80 backdrop-blur-sm rounded-lg border border-white/60 hover:bg-white/90 cursor-pointer transition-colors group"
                  >
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="text-sm font-medium text-foreground truncate" title={masterlist.name}>
                          {masterlist.name}
                        </h4>
                      </div>
                      <p className="text-xs text-muted-foreground line-clamp-2" title={masterlist.description}>
                        {masterlist.description}
                      </p>
                    </div>
                    <CaretRight size={12} className="text-muted-foreground flex-shrink-0" />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredCategories.length === 0 && searchTerm && (
        <div className="text-center py-12">
          <MagnifyingGlass size={48} className="mx-auto text-muted-foreground mb-4" />
          <h3 className="text-lg font-semibold text-foreground mb-2">No collections found</h3>
          <p className="text-muted-foreground">
            No collections match your search for "{searchTerm}"
          </p>
        </div>
      )}
    </div>
  )
}

export function AdminSettings() {
  return (
    <div className="p-4">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h1 className="text-2xl font-semibold text-foreground">Admin Settings</h1>
          <p className="text-muted-foreground mt-1">Manage system settings and configurations</p>
        </div>
      </div>
      <div className="bg-card rounded-lg border border-border p-8 text-center">
        <p className="text-muted-foreground">Admin settings features coming soon...</p>
      </div>
    </div>
  )
}

export function DesignStudio() {
  return (
    <div className="p-4">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h1 className="text-2xl font-semibold text-foreground">Design Studio</h1>
          <p className="text-muted-foreground mt-1">Design and customize documents</p>
        </div>
      </div>
      <div className="bg-card rounded-lg border border-border p-8 text-center">
        <p className="text-muted-foreground">Design studio features coming soon...</p>
      </div>
    </div>
  )
}

export function AskBenny() {
  return (
    <div className="p-4">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h1 className="text-2xl font-semibold text-foreground">Ask <em>Benny</em></h1>
          <p className="text-muted-foreground mt-1">Interact smartly with your content via your personalized Benefits1™ Native intelligence assistant</p>
        </div>
      </div>
      <div className="bg-card rounded-lg border border-border p-8 text-center">
        <p className="text-muted-foreground">Ask Benny features coming soon...</p>
      </div>
    </div>
  )
}

interface PortfolioProps {
  onNavigate?: (page: string) => void
  onProductSelect?: (productId: string, productName: string) => void
}

export function Portfolio({ onNavigate, onProductSelect }: PortfolioProps) {
  const [sortField, setSortField] = useState<string | null>(null)
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc')
  const [currentPage, setCurrentPage] = useState(1)
  const [pageSize, setPageSize] = useState(20)
  
  // Search filters
  const [productNameSearch, setProductNameSearch] = useState('')
  
  // View mode state
  const [viewMode, setViewMode] = useState<'interested' | 'all'>('interested')
  
  // Column filters for search
  const [columnFilters, setColumnFilters] = useState({
    portfolioName: '',
    effectiveDate: '',
    folderVersionNumber: '',
    status: '',
    lastUpdated: '',
    updatedBy: ''
  })
  
  // Sample data matching the screenshot
  const portfolioData = [
    {
      id: 'H9042008000',
      portfolioName: 'H9042008000',
      effectiveDate: '01/01/2026',
      folderVersionNumber: '2026_0.12',
      status: 'PSoT Preparation',
      lastUpdated: '09/25/2025',
      updatedBy: 'Shivani Vidhate',
      interested: 'No'
    },
    {
      id: 'H6529004000',
      portfolioName: 'H6529004000',
      effectiveDate: '01/01/2026',
      folderVersionNumber: '2026_0.12',
      status: 'PSoT Preparation',
      lastUpdated: '09/25/2025',
      updatedBy: 'Kiran Raskar',
      interested: 'No'
    },
    {
      id: 'H9042007000',
      portfolioName: 'H9042007000',
      effectiveDate: '01/01/2026',
      folderVersionNumber: '2026_0.12',
      status: 'PSoT Preparation',
      lastUpdated: '09/25/2025',
      updatedBy: 'Prasad Jadhav',
      interested: 'No'
    },
    {
      id: 'H9042004000',
      portfolioName: 'H9042004000',
      effectiveDate: '01/01/2026',
      folderVersionNumber: '2026_0.12',
      status: 'PSoT Preparation',
      lastUpdated: '09/25/2025',
      updatedBy: 'Prasad Jadhav',
      interested: 'No'
    },
    {
      id: '2026 Crosswalks',
      portfolioName: '2026 Crosswalks',
      effectiveDate: '01/01/2026',
      folderVersionNumber: '2026_0.01',
      status: 'PSoT Preparation',
      lastUpdated: '09/17/2025',
      updatedBy: 'Shivani Vidhate',
      interested: 'No'
    },
    {
      id: 'Test Crosswalk Plans',
      portfolioName: 'Test Crosswalk Plans',
      effectiveDate: '01/01/2026',
      folderVersionNumber: '2026_0.01',
      status: 'PSoT Preparation',
      lastUpdated: '07/29/2025',
      updatedBy: 'Prasad Jadhav',
      interested: 'No'
    },
    {
      id: 'H6529002000',
      portfolioName: 'H6529002000',
      effectiveDate: '01/01/2025',
      folderVersionNumber: '2025_1.03',
      status: 'PSoT Preparation',
      lastUpdated: '07/24/2025',
      updatedBy: 'Piyush Dixit',
      interested: 'No'
    },
    {
      id: 'H9042003001 Copy',
      portfolioName: 'H9042003001 Copy',
      effectiveDate: '01/01/2025',
      folderVersionNumber: '2025_0.01',
      status: 'PSoT Preparation',
      lastUpdated: '07/23/2025',
      updatedBy: 'Aarati Parakkal',
      interested: 'No'
    },
    {
      id: 'H9042003001',
      portfolioName: 'H9042003001',
      effectiveDate: '01/01/2025',
      folderVersionNumber: '2025_1.03',
      status: 'PSoT Preparation',
      lastUpdated: '07/17/2025',
      updatedBy: 'Piyush Dixit',
      interested: 'No'
    },
    {
      id: 'H9042003002',
      portfolioName: 'H9042003002',
      effectiveDate: '01/01/2025',
      folderVersionNumber: '2025_0.08',
      status: 'PSoT Preparation',
      lastUpdated: '07/17/2025',
      updatedBy: 'Piyush Dixit',
      interested: 'No'
    },
    {
      id: 'H9042002001',
      portfolioName: 'H9042002001',
      effectiveDate: '01/01/2025',
      folderVersionNumber: '2025_1.03',
      status: 'PSoT Preparation',
      lastUpdated: '07/17/2025',
      updatedBy: 'Piyush Dixit',
      interested: 'No'
    }
  ]
  
  // Filter and sort data
  const filteredAndSortedData = useMemo(() => {
    let filtered = portfolioData.filter(item => {
      // Apply product name search
      if (productNameSearch && !item.portfolioName.toLowerCase().includes(productNameSearch.toLowerCase())) {
        return false
      }
      
      // Apply column filters
      if (columnFilters.portfolioName && !item.portfolioName.toLowerCase().includes(columnFilters.portfolioName.toLowerCase())) {
        return false
      }
      if (columnFilters.effectiveDate && !item.effectiveDate.toLowerCase().includes(columnFilters.effectiveDate.toLowerCase())) {
        return false
      }
      if (columnFilters.folderVersionNumber && !item.folderVersionNumber.toLowerCase().includes(columnFilters.folderVersionNumber.toLowerCase())) {
        return false
      }
      if (columnFilters.status && !item.status.toLowerCase().includes(columnFilters.status.toLowerCase())) {
        return false
      }
      if (columnFilters.lastUpdated && !item.lastUpdated.toLowerCase().includes(columnFilters.lastUpdated.toLowerCase())) {
        return false
      }
      if (columnFilters.updatedBy && !item.updatedBy.toLowerCase().includes(columnFilters.updatedBy.toLowerCase())) {
        return false
      }
      
      return true
    })
    
    if (sortField) {
      filtered.sort((a, b) => {
        const aValue = a[sortField as keyof typeof a] || ''
        const bValue = b[sortField as keyof typeof b] || ''
        
        if (sortDirection === 'asc') {
          return aValue.toString().localeCompare(bValue.toString())
        } else {
          return bValue.toString().localeCompare(aValue.toString())
        }
      })
    }
    
    return filtered
  }, [portfolioData, sortField, sortDirection, columnFilters, productNameSearch])
  
  // Pagination calculations
  const totalPages = Math.ceil(filteredAndSortedData.length / pageSize)
  const startIndex = (currentPage - 1) * pageSize
  const endIndex = startIndex + pageSize
  const currentPageData = filteredAndSortedData.slice(startIndex, endIndex)
  
  const handleSort = (field: string) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc')
    } else {
      setSortField(field)
      setSortDirection('asc')
    }
  }

  const updateColumnFilter = (column: string, value: string) => {
    setColumnFilters(prev => ({
      ...prev,
      [column]: value
    }))
  }

  const clearColumnFilter = (column: string) => {
    setColumnFilters(prev => ({
      ...prev,
      [column]: ''
    }))
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header Section */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-foreground">Portfolio</h1>
          <p className="text-muted-foreground mt-1">View and manage your product portfolios and document collections</p>
        </div>
        
        {/* Product Search and New Button */}
        <div className="flex items-center gap-4">
          <SmartSearchBar
            placeholder="Search Products"
            value={productNameSearch}
            onChange={setProductNameSearch}
            className="w-64"
          />
          
          <Button 
            variant="default"
            className="h-9 px-4 font-medium"
          >
            <Plus size={16} className="mr-1.5" />
            New
          </Button>
        </div>
      </div>

      {/* View Mode Radio Buttons - New row */}
      <div className="flex justify-end">
        <div className="flex items-center gap-4">
          <div className="flex items-center space-x-2">
            <input
              type="radio"
              id="view-interested"
              name="view-mode"
              checked={viewMode === 'interested'}
              onChange={() => setViewMode('interested')}
              className="w-4 h-4 text-blue-600"
            />
            <Label htmlFor="view-interested" className="text-sm cursor-pointer">
              View interested
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <input
              type="radio"
              id="view-all"
              name="view-mode"
              checked={viewMode === 'all'}
              onChange={() => setViewMode('all')}
              className="w-4 h-4 text-blue-600"
            />
            <Label htmlFor="view-all" className="text-sm cursor-pointer">
              View all
            </Label>
          </div>
        </div>
      </div>

      {/* Data Table */}
      <Card>
        <CardContent className="p-0">
          <div className="border rounded-lg overflow-x-auto">
            <Table>
              <TableHeader>
                {/* Column Headers with Sort */}
                <TableRow className="bg-muted/30">
                  <TableHead className="border-r h-12 min-w-[200px]">
                    <div className="flex items-center gap-1 cursor-pointer select-none font-semibold" onClick={() => handleSort('portfolioName')}>
                      Portfolio Name
                      {sortField === 'portfolioName' && (
                        sortDirection === 'asc' ? <CaretUp size={12} /> : <CaretDown size={12} />
                      )}
                    </div>
                  </TableHead>
                  <TableHead className="border-r h-12 min-w-[130px]">
                    <div className="flex items-center gap-1 cursor-pointer select-none font-semibold" onClick={() => handleSort('effectiveDate')}>
                      Effective Date
                      {sortField === 'effectiveDate' && (
                        sortDirection === 'asc' ? <CaretUp size={12} /> : <CaretDown size={12} />
                      )}
                    </div>
                  </TableHead>
                  <TableHead className="border-r h-12 min-w-[160px]">
                    <div className="flex items-center gap-1 cursor-pointer select-none font-semibold" onClick={() => handleSort('folderVersionNumber')}>
                      Folder Version Number
                      {sortField === 'folderVersionNumber' && (
                        sortDirection === 'asc' ? <CaretUp size={12} /> : <CaretDown size={12} />
                      )}
                    </div>
                  </TableHead>
                  <TableHead className="border-r h-12 min-w-[120px]">
                    <div className="flex items-center gap-1 cursor-pointer select-none font-semibold" onClick={() => handleSort('status')}>
                      Status
                      {sortField === 'status' && (
                        sortDirection === 'asc' ? <CaretUp size={12} /> : <CaretDown size={12} />
                      )}
                    </div>
                  </TableHead>
                  <TableHead className="border-r h-12 min-w-[120px]">
                    <div className="flex items-center gap-1 cursor-pointer select-none font-semibold" onClick={() => handleSort('lastUpdated')}>
                      Last Updated
                      {sortField === 'lastUpdated' && (
                        sortDirection === 'asc' ? <CaretUp size={12} /> : <CaretDown size={12} />
                      )}
                    </div>
                  </TableHead>
                  <TableHead className="border-r h-12 min-w-[140px]">
                    <div className="flex items-center gap-1 cursor-pointer select-none font-semibold" onClick={() => handleSort('updatedBy')}>
                      Updated By
                      {sortField === 'updatedBy' && (
                        sortDirection === 'asc' ? <CaretUp size={12} /> : <CaretDown size={12} />
                      )}
                    </div>
                  </TableHead>
                  <TableHead className="h-12 min-w-[100px]">
                    <div className="flex items-center gap-1 cursor-pointer select-none font-semibold" onClick={() => handleSort('interested')}>
                      Interested
                      {sortField === 'interested' && (
                        sortDirection === 'asc' ? <CaretUp size={12} /> : <CaretDown size={12} />
                      )}
                    </div>
                  </TableHead>
                </TableRow>

                {/* Filter Row */}
                <TableRow className="bg-white border-b-2">
                  <TableHead className="p-2 border-r">
                    <div className="relative">
                      <MagnifyingGlass size={14} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
                      <Input
                        value={columnFilters.portfolioName}
                        onChange={(e) => updateColumnFilter('portfolioName', e.target.value)}
                        className="pl-9 h-8 text-sm"
                      />
                      {columnFilters.portfolioName && (
                        <Button
                          variant="ghost"
                          size="sm"
                          className="absolute right-2 top-1/2 transform -translate-y-1/2 h-6 w-6 p-0"
                          onClick={() => clearColumnFilter('portfolioName')}
                        >
                          <X size={12} />
                        </Button>
                      )}
                    </div>
                  </TableHead>
                  <TableHead className="p-2 border-r">
                    <div className="relative">
                      <MagnifyingGlass size={14} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
                      <Input
                        value={columnFilters.effectiveDate}
                        onChange={(e) => updateColumnFilter('effectiveDate', e.target.value)}
                        className="pl-9 h-8 text-sm"
                      />
                      {columnFilters.effectiveDate && (
                        <Button
                          variant="ghost"
                          size="sm"
                          className="absolute right-2 top-1/2 transform -translate-y-1/2 h-6 w-6 p-0"
                          onClick={() => clearColumnFilter('effectiveDate')}
                        >
                          <X size={12} />
                        </Button>
                      )}
                    </div>
                  </TableHead>
                  <TableHead className="p-2 border-r">
                    <div className="relative">
                      <MagnifyingGlass size={14} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
                      <Input
                        value={columnFilters.folderVersionNumber}
                        onChange={(e) => updateColumnFilter('folderVersionNumber', e.target.value)}
                        className="pl-9 h-8 text-sm"
                      />
                      {columnFilters.folderVersionNumber && (
                        <Button
                          variant="ghost"
                          size="sm"
                          className="absolute right-2 top-1/2 transform -translate-y-1/2 h-6 w-6 p-0"
                          onClick={() => clearColumnFilter('folderVersionNumber')}
                        >
                          <X size={12} />
                        </Button>
                      )}
                    </div>
                  </TableHead>
                  <TableHead className="p-2 border-r">
                    <div className="relative">
                      <MagnifyingGlass size={14} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
                      <Input
                        value={columnFilters.status}
                        onChange={(e) => updateColumnFilter('status', e.target.value)}
                        className="pl-9 h-8 text-sm"
                      />
                      {columnFilters.status && (
                        <Button
                          variant="ghost"
                          size="sm"
                          className="absolute right-2 top-1/2 transform -translate-y-1/2 h-6 w-6 p-0"
                          onClick={() => clearColumnFilter('status')}
                        >
                          <X size={12} />
                        </Button>
                      )}
                    </div>
                  </TableHead>
                  <TableHead className="p-2 border-r">
                    <div className="relative">
                      <MagnifyingGlass size={14} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
                      <Input
                        value={columnFilters.lastUpdated}
                        onChange={(e) => updateColumnFilter('lastUpdated', e.target.value)}
                        className="pl-9 h-8 text-sm"
                      />
                      {columnFilters.lastUpdated && (
                        <Button
                          variant="ghost"
                          size="sm"
                          className="absolute right-2 top-1/2 transform -translate-y-1/2 h-6 w-6 p-0"
                          onClick={() => clearColumnFilter('lastUpdated')}
                        >
                          <X size={12} />
                        </Button>
                      )}
                    </div>
                  </TableHead>
                  <TableHead className="p-2 border-r">
                    <div className="relative">
                      <MagnifyingGlass size={14} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
                      <Input
                        value={columnFilters.updatedBy}
                        onChange={(e) => updateColumnFilter('updatedBy', e.target.value)}
                        className="pl-9 h-8 text-sm"
                      />
                      {columnFilters.updatedBy && (
                        <Button
                          variant="ghost"
                          size="sm"
                          className="absolute right-2 top-1/2 transform -translate-y-1/2 h-6 w-6 p-0"
                          onClick={() => clearColumnFilter('updatedBy')}
                        >
                          <X size={12} />
                        </Button>
                      )}
                    </div>
                  </TableHead>
                  <TableHead className="p-2">
                    {/* Empty for Interested column */}
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {currentPageData.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center py-8 text-muted-foreground">
                      {Object.values(columnFilters).some(filter => filter !== '') || productNameSearch 
                        ? "No portfolios match the current filters" 
                        : "No portfolio data available"
                      }
                    </TableCell>
                  </TableRow>
                ) : (
                  currentPageData.map((item, index) => (
                    <TableRow 
                      key={item.id} 
                      className={`
                        hover:bg-muted/30
                        ${index % 2 === 0 ? 'bg-white' : 'bg-slate-50/30'}
                        border-b transition-colors h-11
                      `}
                    >
                      <TableCell className="border-r p-3 text-sm font-medium">
                        {item.portfolioName.includes('H') ? (
                          <button 
                            className="text-blue-600 font-mono hover:text-blue-800 hover:underline cursor-pointer transition-colors"
                            onClick={() => {
                              onProductSelect?.(item.id, item.portfolioName)
                            }}
                          >
                            {item.portfolioName}
                          </button>
                        ) : (
                          <button 
                            className="text-foreground hover:text-blue-600 hover:underline cursor-pointer transition-colors"
                            onClick={() => {
                              onProductSelect?.(item.id, item.portfolioName)
                            }}
                          >
                            {item.portfolioName}
                          </button>
                        )}
                      </TableCell>
                      <TableCell className="border-r p-3 text-sm text-center">
                        {item.effectiveDate}
                      </TableCell>
                      <TableCell className="border-r p-3 text-center">
                        <Badge variant="outline" className="font-mono text-xs">
                          {item.folderVersionNumber}
                        </Badge>
                      </TableCell>
                      <TableCell className="border-r p-3">
                        <Badge 
                          variant="outline" 
                          className="text-xs font-medium bg-blue-50 text-blue-700 border-blue-300"
                        >
                          {item.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="border-r p-3 text-sm text-center">
                        {item.lastUpdated}
                      </TableCell>
                      <TableCell className="border-r p-3 text-sm">
                        {item.updatedBy}
                      </TableCell>
                      <TableCell className="p-3 text-center">
                        <Badge 
                          variant="outline" 
                          className="text-xs font-medium"
                        >
                          {item.interested}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
          
          {/* Pagination Controls */}
          <div className="flex items-center justify-between mt-4 px-4 pb-4 text-sm text-muted-foreground border-t bg-muted/20">
            <div className="flex items-center gap-4">
              <span className="font-medium">
                Page {currentPage} of {Math.max(1, totalPages)}
              </span>
              <span className="font-medium">
                View 1 - 20 of 22
              </span>
            </div>
            
            {totalPages > 1 && (
              <div className="flex items-center gap-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                  disabled={currentPage === 1}
                  className="h-8 w-8 p-0"
                >
                  <CaretLeft size={14} />
                </Button>
                
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                  disabled={currentPage === totalPages}
                  className="h-8 w-8 p-0"
                >
                  <CaretRight size={14} />
                </Button>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export function Manage() {
  return (
    <div className="p-4">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h1 className="text-2xl font-semibold text-foreground">Manage</h1>
          <p className="text-muted-foreground mt-1">Manage your documents, rules, and content</p>
        </div>
      </div>
      <div className="bg-card rounded-lg border border-border p-8 text-center">
        <p className="text-muted-foreground">Management features coming soon...</p>
      </div>
    </div>
  )
}

export function GlobalContent() {
  return (
    <div className="p-4">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h1 className="text-2xl font-semibold text-foreground">Global Content</h1>
          <p className="text-muted-foreground mt-1">Manage global content and shared resources</p>
        </div>
      </div>
      <div className="bg-card rounded-lg border border-border p-8 text-center">
        <p className="text-muted-foreground">Global content management features coming soon...</p>
      </div>
    </div>
  )
}
