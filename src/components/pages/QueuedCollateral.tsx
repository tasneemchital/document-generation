import React, { useState, useMemo, useEffect } from "react"
import { useKV } from '@github/spark/hooks'
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { CaretUp, CaretDown, CaretLeft, CaretRight, Columns, MagnifyingGlass, X, ArrowClockwise, Queue, WarningCircle, Download, UploadSimple } from "@phosphor-icons/react"

export function QueuedCollateral() {
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