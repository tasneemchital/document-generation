import { useState, useEffect } from 'react'
import { useKV } from '@github/spark/hooks'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Input } from '@/components/ui/input'
import {
  Calendar,
  ClockCounterClockwise, 
  FileText,
  Queue,
  Translate,
  User,
  CheckCircle,
  CircleNotch,
  Eye,
  BookOpen,
  ListChecks
} from '@phosphor-icons/react'

interface TranslationQueue {
  id: string
  instance: string
  languages: string[]
  status: 'queued' | 'in_progress' | 'completed'
  username: string
  timestamp: string
  type: 'translation'
}

interface ProofreadingQueue {
  id: string
  documentName: string
  contractNumber: string
  planName: string
  languages: string[]
  status: 'queued' | 'in_progress' | 'completed'
  username: string
  timestamp: string
  type: 'proofreading'
}

interface AuditTrailItem {
  id: string
  type: 'translation' | 'proofreading'
  itemName: string
  details: string
  languages: string[]
  status: 'queued' | 'in_progress' | 'completed'
  username: string
  timestamp: string
}

interface DocumentForProofreading {
  id: string
  documentName: string
  contractNumber: string
  planName: string
  lastModified: string
}

// Mock data for instances and languages
const instances = ['HMMAPD', 'PPO MAPD', 'PDP', 'DSNP']
const languages = ['English', 'Spanish', 'Chinese', 'Vietnamese', 'Korean', 'Tagalog', 'Russian', 'Arabic', 'French', 'Portuguese']

// Mock data for proofreading documents
const mockProofreadingDocuments: DocumentForProofreading[] = [
  {
    id: 'H1234-001',
    documentName: 'Evidence of Coverage 2025',
    contractNumber: 'H1234',
    planName: 'Simplify HMO MAPD',
    lastModified: '2024-01-15'
  },
  {
    id: 'H2231-002', 
    documentName: 'Summary of Benefits',
    contractNumber: 'H2231',
    planName: 'Simplify PPO MAPD',
    lastModified: '2024-01-14'
  },
  {
    id: 'H4323-003',
    documentName: 'Annual Notice of Changes',
    contractNumber: 'H4323',
    planName: 'Health Choice DSNP',
    lastModified: '2024-01-13'
  },
  {
    id: 'S2121-004',
    documentName: 'Prescription Drug Plan',
    contractNumber: 'S2121',
    planName: 'Care Plus PDP',
    lastModified: '2024-01-12'
  }
]

export function TranslationStudio() {
  const [activeTab, setActiveTab] = useState('queue-translation')
  const [translationQueues, setTranslationQueues] = useKV<TranslationQueue[]>('translation-queues', [])
  const [proofreadingQueues, setProofreadingQueues] = useKV<ProofreadingQueue[]>('proofreading-queues', [])
  
  // Queue Translation form state
  const [selectedInstance, setSelectedInstance] = useState('')
  const [selectedLanguages, setSelectedLanguages] = useState<string[]>([])
  
  // Queue Proofreading form state  
  const [selectedDocuments, setSelectedDocuments] = useState<string[]>([])
  const [selectedProofreadingLanguages, setSelectedProofreadingLanguages] = useState<string[]>([])
  const [contractNumberFilter, setContractNumberFilter] = useState('')
  const [planNameFilter, setPlanNameFilter] = useState('')

  // Filter proofreading documents based on search criteria
  const filteredProofreadingDocuments = mockProofreadingDocuments.filter(doc => {
    if (contractNumberFilter && !doc.contractNumber.toLowerCase().includes(contractNumberFilter.toLowerCase())) return false
    if (planNameFilter && !doc.planName.toLowerCase().includes(planNameFilter.toLowerCase())) return false
    return true
  })

  const handleLanguageToggle = (language: string, setter: React.Dispatch<React.SetStateAction<string[]>>) => {
    setter(prev => 
      prev.includes(language) 
        ? prev.filter(lang => lang !== language)
        : [...prev, language]
    )
  }

  const handleDocumentToggle = (documentId: string) => {
    setSelectedDocuments(prev => 
      prev.includes(documentId) 
        ? prev.filter(id => id !== documentId)
        : [...prev, documentId]
    )
  }

  const handleQueueTranslation = () => {
    if (!selectedInstance || selectedLanguages.length === 0) return

    // Mock user for now
    const username = 'currentuser'
    
    const newQueue: TranslationQueue = {
      id: `trans-${Date.now()}-${Math.random().toString(36).substring(2, 11)}`,
      instance: selectedInstance,
      languages: [...selectedLanguages],
      status: 'queued',
      username: username,
      timestamp: new Date().toISOString(),
      type: 'translation'
    }

    setTranslationQueues(current => [...current, newQueue])
    
    // Reset selections
    setSelectedInstance('')
    setSelectedLanguages([])
    setActiveTab('audit-trail')
  }

  const handleQueueProofreading = () => {
    if (selectedDocuments.length === 0 || selectedProofreadingLanguages.length === 0) return

    // Mock user for now
    const username = 'currentuser'
    
    const newQueues: ProofreadingQueue[] = selectedDocuments.map(docId => {
      const document = mockProofreadingDocuments.find(d => d.id === docId)!
      return {
        id: `proof-${Date.now()}-${Math.random().toString(36).substring(2, 11)}-${docId}`,
        documentName: document.documentName,
        contractNumber: document.contractNumber,
        planName: document.planName,
        languages: [...selectedProofreadingLanguages],
        status: 'queued' as const,
        username: username,
        timestamp: new Date().toISOString(),
        type: 'proofreading'
      }
    })

    setProofreadingQueues(current => [...current, ...newQueues])
    
    // Reset selections
    setSelectedDocuments([])
    setSelectedProofreadingLanguages([])
    setActiveTab('audit-trail')
  }

  // Combine audit trail items
  const auditTrailItems: AuditTrailItem[] = [
    ...translationQueues.map(queue => ({
      id: queue.id,
      type: 'translation' as const,
      itemName: queue.instance,
      details: `Instance: ${queue.instance}`,
      languages: queue.languages,
      status: queue.status,
      username: queue.username,
      timestamp: queue.timestamp
    })),
    ...proofreadingQueues.map(queue => ({
      id: queue.id,
      type: 'proofreading' as const,
      itemName: queue.documentName,
      details: `${queue.contractNumber} - ${queue.planName}`,
      languages: queue.languages,
      status: queue.status,
      username: queue.username,
      timestamp: queue.timestamp
    }))
  ].sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())

  const getStatusIcon = (status: 'queued' | 'in_progress' | 'completed') => {
    switch (status) {
      case 'queued':
        return <Queue className="h-4 w-4 text-yellow-500" />
      case 'in_progress':
        return <CircleNotch className="h-4 w-4 text-blue-500 animate-spin" />
      case 'completed':
        return <CheckCircle className="h-4 w-4 text-green-500" />
    }
  }

  const getStatusBadge = (status: 'queued' | 'in_progress' | 'completed') => {
    const variants = {
      queued: 'bg-yellow-100 text-yellow-800 hover:bg-yellow-100',
      in_progress: 'bg-blue-100 text-blue-800 hover:bg-blue-100',
      completed: 'bg-green-100 text-green-800 hover:bg-green-100'
    }
    
    const labels = {
      queued: 'Queued',
      in_progress: 'In Progress',
      completed: 'Completed'
    }

    return (
      <Badge variant="secondary" className={variants[status]}>
        {getStatusIcon(status)}
        <span className="ml-1">{labels[status]}</span>
      </Badge>
    )
  }

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="flex items-center gap-3 mb-6">
        <Translate className="h-8 w-8 text-primary" />
        <div>
          <h1 className="text-2xl font-bold text-foreground">Translation Studio</h1>
          <p className="text-sm text-muted-foreground">Queue documents for translation and proofreading, monitor progress</p>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="queue-translation" className="flex items-center gap-2">
            <Queue className="h-4 w-4" />
            Queue Translation
          </TabsTrigger>
          <TabsTrigger value="queue-proofreading" className="flex items-center gap-2">
            <Eye className="h-4 w-4" />
            Queue Proofreading
          </TabsTrigger>
          <TabsTrigger value="audit-trail" className="flex items-center gap-2">
            <ClockCounterClockwise className="h-4 w-4" />
            Audit Trail
          </TabsTrigger>
        </TabsList>

        <TabsContent value="queue-translation" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Instance Selection */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <ListChecks className="h-5 w-5" />
                  Instance Selection
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Select Instance</label>
                  <Select value={selectedInstance} onValueChange={setSelectedInstance}>
                    <SelectTrigger>
                      <SelectValue placeholder="Choose an instance" />
                    </SelectTrigger>
                    <SelectContent>
                      {instances.map(instance => (
                        <SelectItem key={instance} value={instance}>{instance}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            {/* Language Selection */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Translate className="h-5 w-5" />
                  Target Languages
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Select Languages for Translation</label>
                  <div className="border rounded-md p-3 max-h-64 overflow-y-auto">
                    <div className="space-y-2">
                      {languages.map(language => (
                        <div key={language} className="flex items-center space-x-2 p-2 rounded hover:bg-muted/50">
                          <Checkbox
                            id={`trans-${language}`}
                            checked={selectedLanguages.includes(language)}
                            onCheckedChange={() => handleLanguageToggle(language, setSelectedLanguages)}
                          />
                          <label 
                            htmlFor={`trans-${language}`} 
                            className="text-sm font-medium cursor-pointer flex-1"
                          >
                            {language}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Queue Summary and Action */}
          <Card>
            <CardHeader>
              <CardTitle>Translation Queue Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <p className="text-sm">
                    <span className="font-medium">Instance:</span> {selectedInstance || 'None selected'}
                  </p>
                  <p className="text-sm">
                    <span className="font-medium">{selectedLanguages.length}</span> languages selected
                  </p>
                </div>
                <Button 
                  onClick={handleQueueTranslation}
                  disabled={!selectedInstance || selectedLanguages.length === 0}
                  className="flex items-center gap-2"
                >
                  <Queue className="h-4 w-4" />
                  Queue for Translation
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="queue-proofreading" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Document Selection */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BookOpen className="h-5 w-5" />
                  Document Selection
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Contract Number</label>
                    <Input
                      placeholder="Filter by contract"
                      value={contractNumberFilter}
                      onChange={(e) => setContractNumberFilter(e.target.value)}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Plan Name</label>
                    <Input
                      placeholder="Filter by plan"
                      value={planNameFilter}
                      onChange={(e) => setPlanNameFilter(e.target.value)}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Available Documents</label>
                  <div className="border rounded-md p-3 max-h-64 overflow-y-auto">
                    {filteredProofreadingDocuments.length === 0 ? (
                      <p className="text-sm text-muted-foreground text-center py-4">
                        No documents match the current filters
                      </p>
                    ) : (
                      <div className="space-y-2">
                        {filteredProofreadingDocuments.map(doc => (
                          <div key={doc.id} className="flex items-start space-x-2 p-2 rounded hover:bg-muted/50">
                            <Checkbox
                              id={doc.id}
                              checked={selectedDocuments.includes(doc.id)}
                              onCheckedChange={() => handleDocumentToggle(doc.id)}
                            />
                            <div className="flex-1 min-w-0">
                              <label 
                                htmlFor={doc.id} 
                                className="text-sm font-medium cursor-pointer block"
                              >
                                {doc.documentName}
                              </label>
                              <p className="text-xs text-muted-foreground">
                                {doc.contractNumber} - {doc.planName}
                              </p>
                              <p className="text-xs text-muted-foreground">
                                Last modified: {doc.lastModified}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Language Selection for Proofreading */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Translate className="h-5 w-5" />
                  Proofreading Languages
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Select Languages for Proofreading</label>
                  <div className="border rounded-md p-3 max-h-64 overflow-y-auto">
                    <div className="space-y-2">
                      {languages.map(language => (
                        <div key={language} className="flex items-center space-x-2 p-2 rounded hover:bg-muted/50">
                          <Checkbox
                            id={`proof-${language}`}
                            checked={selectedProofreadingLanguages.includes(language)}
                            onCheckedChange={() => handleLanguageToggle(language, setSelectedProofreadingLanguages)}
                          />
                          <label 
                            htmlFor={`proof-${language}`} 
                            className="text-sm font-medium cursor-pointer flex-1"
                          >
                            {language}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Proofreading Queue Summary and Action */}
          <Card>
            <CardHeader>
              <CardTitle>Proofreading Queue Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <p className="text-sm">
                    <span className="font-medium">{selectedDocuments.length}</span> documents selected
                  </p>
                  <p className="text-sm">
                    <span className="font-medium">{selectedProofreadingLanguages.length}</span> languages selected
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Total jobs to create: <span className="font-medium">{selectedDocuments.length * selectedProofreadingLanguages.length}</span>
                  </p>
                </div>
                <Button 
                  onClick={handleQueueProofreading}
                  disabled={selectedDocuments.length === 0 || selectedProofreadingLanguages.length === 0}
                  className="flex items-center gap-2"
                >
                  <Eye className="h-4 w-4" />
                  Queue for Proofreading
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="audit-trail" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <ClockCounterClockwise className="h-5 w-5" />
                Translation & Proofreading Audit Trail
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Type</TableHead>
                      <TableHead>Item</TableHead>
                      <TableHead>Details</TableHead>
                      <TableHead>Languages</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>User</TableHead>
                      <TableHead>Timestamp</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {auditTrailItems.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={7} className="text-center py-8 text-muted-foreground">
                          No translation or proofreading jobs found
                        </TableCell>
                      </TableRow>
                    ) : (
                      auditTrailItems.map(item => (
                        <TableRow key={item.id}>
                          <TableCell>
                            <Badge variant="outline" className={
                              item.type === 'translation' 
                                ? 'bg-blue-50 text-blue-700 border-blue-200'
                                : 'bg-purple-50 text-purple-700 border-purple-200'
                            }>
                              {item.type === 'translation' ? (
                                <>
                                  <Translate className="h-3 w-3 mr-1" />
                                  Translation
                                </>
                              ) : (
                                <>
                                  <Eye className="h-3 w-3 mr-1" />
                                  Proofreading
                                </>
                              )}
                            </Badge>
                          </TableCell>
                          <TableCell className="font-medium">{item.itemName}</TableCell>
                          <TableCell className="text-sm text-muted-foreground">{item.details}</TableCell>
                          <TableCell>
                            <div className="flex flex-wrap gap-1">
                              {item.languages.slice(0, 2).map(lang => (
                                <Badge key={lang} variant="secondary" className="text-xs">
                                  {lang}
                                </Badge>
                              ))}
                              {item.languages.length > 2 && (
                                <Badge variant="secondary" className="text-xs">
                                  +{item.languages.length - 2} more
                                </Badge>
                              )}
                            </div>
                          </TableCell>
                          <TableCell>{getStatusBadge(item.status)}</TableCell>
                          <TableCell>
                            <div className="flex items-center space-x-2">
                              <User className="h-4 w-4 text-muted-foreground" />
                              <span className="text-sm">{item.username}</span>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center space-x-2">
                              <Calendar className="h-4 w-4 text-muted-foreground" />
                              <div className="flex flex-col">
                                <span className="text-sm">
                                  {new Date(item.timestamp).toLocaleDateString()}
                                </span>
                                <span className="text-xs text-muted-foreground">
                                  {new Date(item.timestamp).toLocaleTimeString()}
                                </span>
                              </div>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}