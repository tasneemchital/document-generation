import React, { useState, useMemo, useEffect } from "react"
import { useKV } from '@github/spark/hooks'
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { CaretUp, CaretDown, CaretLeft, CaretRight, Columns, MagnifyingGlass, X, ArrowUp, ArrowDown, Download, ArrowClockwise } from "@phosphor-icons/react"
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