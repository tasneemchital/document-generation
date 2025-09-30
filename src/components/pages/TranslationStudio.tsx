import { useState, useEffect } from 'react'
import { useKV } from '@github/spark/hooks'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import {
  Calendar,
  ClockCounterClockwise, 
  FileText,
  Queue,
  Translate,
  User,
  CheckCircle,
  CircleNotch
} from '@phosphor-icons/react'

interface TranslationJob {
  id: string
  documentName: string
  documentType: 'EOC' | 'ANOC' | 'SB'
  targetLanguages: string[]
  status: 'queued' | 'in_progress' | 'completed'
  username: string
  timestamp: string
  progress: number
}

interface MockDocument {
  id: string
  name: string
  type: 'EOC' | 'ANOC' | 'SB'
  instance: string
  lastModified: string
}

const mockDocuments: MockDocument[] = [
  { id: 'H1234', name: 'H1234 - Simplify HMO MAPD', type: 'EOC', instance: 'HMO MAPD', lastModified: '2024-01-15' },
  { id: 'H2231-PPO', name: 'H2231 - Simplify PPO', type: 'EOC', instance: 'PPO MAPD', lastModified: '2024-01-14' },
  { id: 'H2231-DSNP', name: 'H2231 - Simplify Choice DSNP', type: 'SB', instance: 'DSNP', lastModified: '2024-01-13' },
  { id: 'H4323', name: 'H4323 - Health Choice HMO', type: 'EOC', instance: 'HMO MAPD', lastModified: '2024-01-12' },
  { id: 'H2121', name: 'H2121 - Care Plus HMO', type: 'EOC', instance: 'HMO MAPD', lastModified: '2024-01-11' }
]

const documentTypes = ['EOC', 'ANOC', 'SB']
const instances = ['HMO MAPD', 'PPO MAPD', 'PFFS', 'DSNP']
const languages = ['Spanish', 'Chinese (Simplified)', 'Chinese (Traditional)', 'Vietnamese', 'Korean', 'Tagalog', 'Russian', 'Arabic', 'French', 'Portuguese']

const sampleTranslationJobs: TranslationJob[] = [
  // H4323 - Health Choice HMO translations (matching the audit trail shown)
  {
    id: 'job-1',
    documentName: 'H4323 - Health Choice HMO',
    documentType: 'EOC',
    targetLanguages: ['Spanish'],
    status: 'completed',
    username: 'tasneemchital',
    timestamp: '2024-09-14T11:49:40.000Z',
    progress: 100
  },
  {
    id: 'job-2',
    documentName: 'H4323 - Health Choice HMO',
    documentType: 'EOC',
    targetLanguages: ['Vietnamese'],
    status: 'in_progress',
    username: 'tasneemchital',
    timestamp: '2024-09-14T11:49:40.000Z',
    progress: 45
  },
  // Medicare EOC 2025 translations
  {
    id: 'job-3',
    documentName: 'Medicare EOC 2025',
    documentType: 'EOC',
    targetLanguages: ['Spanish'],
    status: 'in_progress',
    username: 'tasneemchital',
    timestamp: '2024-09-14T11:40:24.000Z',
    progress: 35
  },
  {
    id: 'job-4',
    documentName: 'Medicare EOC 2025',
    documentType: 'EOC',
    targetLanguages: ['Chinese (Simplified)'],
    status: 'queued',
    username: 'tasneemchital',
    timestamp: '2024-09-14T11:40:24.000Z',
    progress: 0
  },
  // ANOC Summary 2025 translations
  {
    id: 'job-5',
    documentName: 'ANOC Summary 2025',
    documentType: 'ANOC',
    targetLanguages: ['Spanish'],
    status: 'completed',
    username: 'tasneemchital',
    timestamp: '2024-09-14T11:40:24.000Z',
    progress: 100
  },
  {
    id: 'job-6',
    documentName: 'ANOC Summary 2025',
    documentType: 'ANOC',
    targetLanguages: ['Chinese (Simplified)'],
    status: 'in_progress',
    username: 'tasneemchital',
    timestamp: '2024-09-14T11:40:24.000Z',
    progress: 78
  },
  // Summary of Benefits 2025 translations
  {
    id: 'job-7',
    documentName: 'Summary of Benefits 2025',
    documentType: 'SB',
    targetLanguages: ['Spanish'],
    status: 'completed',
    username: 'tasneemchital',
    timestamp: '2024-09-14T11:40:24.000Z',
    progress: 100
  },
  {
    id: 'job-8',
    documentName: 'Summary of Benefits 2025',
    documentType: 'SB',
    targetLanguages: ['Chinese (Simplified)'],
    status: 'queued',
    username: 'tasneemchital',
    timestamp: '2024-09-14T11:40:24.000Z',
    progress: 0
  },
  // Medicare EOC 2025 - Main Document translations
  {
    id: 'job-9',
    documentName: 'Medicare EOC 2025 - Main Document',
    documentType: 'EOC',
    targetLanguages: ['Spanish', 'Chinese (Simplified)'],
    status: 'in_progress',
    username: 'tasneemchital',
    timestamp: '2024-09-14T11:34:15.000Z',
    progress: 82
  },
  {
    id: 'job-10',
    documentName: 'Medicare EOC 2025 - Main Document',
    documentType: 'EOC',
    targetLanguages: ['Spanish'],
    status: 'completed',
    username: 'tasneemchital',
    timestamp: '2024-09-14T11:32:54.000Z',
    progress: 100
  },
  // Medicare EOC 2025 - Appendix A translation
  {
    id: 'job-11',
    documentName: 'Medicare EOC 2025 - Appendix A',
    documentType: 'EOC',
    targetLanguages: ['Spanish'],
    status: 'queued',
    username: 'tasneemchital',
    timestamp: '2024-09-14T11:32:54.000Z',
    progress: 0
  },
  // H1234 - Simplify HMO MAPD translations
  {
    id: 'job-12',
    documentName: 'H1234 - Simplify HMO MAPD',
    documentType: 'EOC',
    targetLanguages: ['Spanish'],
    status: 'completed',
    username: 'tasneemchital',
    timestamp: '2024-09-13T14:22:15.000Z',
    progress: 100
  },
  {
    id: 'job-13',
    documentName: 'H1234 - Simplify HMO MAPD',
    documentType: 'EOC',
    targetLanguages: ['Vietnamese'],
    status: 'in_progress',
    username: 'tasneemchital',
    timestamp: '2024-09-13T14:22:15.000Z',
    progress: 65
  },
  // H2231 - Simplify PPO translations
  {
    id: 'job-14',
    documentName: 'H2231 - Simplify PPO',
    documentType: 'EOC',
    targetLanguages: ['Chinese (Traditional)'],
    status: 'queued',
    username: 'tasneemchital',
    timestamp: '2024-09-13T10:15:30.000Z',
    progress: 0
  },
  // H2121 - Care Plus HMO translations
  {
    id: 'job-15',
    documentName: 'H2121 - Care Plus HMO',
    documentType: 'EOC',
    targetLanguages: ['Korean'],
    status: 'completed',
    username: 'tasneemchital',
    timestamp: '2024-09-12T16:45:22.000Z',
    progress: 100
  }
]

export function TranslationStudio() {
  const [activeTab, setActiveTab] = useState('queue')
  const [translationJobs, setTranslationJobs] = useKV<TranslationJob[]>('translation-jobs', [])
  
  // Initialize with sample data if empty or force refresh
  useEffect(() => {
    // Always reset to show mixed statuses
    setTranslationJobs(sampleTranslationJobs)
  }, [setTranslationJobs])
  
  // Queue form state
  const [selectedDocumentType, setSelectedDocumentType] = useState('')
  const [selectedInstance, setSelectedInstance] = useState('')
  const [selectedDocuments, setSelectedDocuments] = useState<string[]>([])
  const [selectedLanguages, setSelectedLanguages] = useState<string[]>([])

  const filteredDocuments = mockDocuments.filter(doc => {
    if (selectedDocumentType && doc.type !== selectedDocumentType) return false
    if (selectedInstance && doc.instance !== selectedInstance) return false
    return true
  })

  const handleDocumentToggle = (documentId: string) => {
    setSelectedDocuments(prev => 
      prev.includes(documentId) 
        ? prev.filter(id => id !== documentId)
        : [...prev, documentId]
    )
  }

  const handleLanguageToggle = (language: string) => {
    setSelectedLanguages(prev => 
      prev.includes(language) 
        ? prev.filter(lang => lang !== language)
        : [...prev, language]
    )
  }

  const handleQueueTranslation = async () => {
    if (selectedDocuments.length === 0 || selectedLanguages.length === 0) return

    // Get current user info (mock for now)
    const user = { login: 'currentuser' }
    
    // Create a separate job for each document-language combination
    const newJobs: TranslationJob[] = []
    selectedDocuments.forEach(docId => {
      const document = mockDocuments.find(d => d.id === docId)!
      selectedLanguages.forEach(language => {
        newJobs.push({
          id: `job-${Date.now()}-${Math.random().toString(36).substring(2, 11)}-${docId}-${language}`,
          documentName: document.name,
          documentType: document.type,
          targetLanguages: [language],
          status: 'queued' as const,
          username: user.login,
          timestamp: new Date().toISOString(),
          progress: 0
        })
      })
    })

    setTranslationJobs(current => [...current, ...newJobs])
    
    // Reset selections
    setSelectedDocuments([])
    setSelectedLanguages([])
    setActiveTab('audit')
  }

  const getStatusIcon = (status: TranslationJob['status']) => {
    switch (status) {
      case 'queued':
        return <Queue className="h-4 w-4 text-yellow-500" />
      case 'in_progress':
        return <CircleNotch className="h-4 w-4 text-blue-500 animate-spin" />
      case 'completed':
        return <CheckCircle className="h-4 w-4 text-green-500" />
    }
  }

  const getStatusBadge = (status: TranslationJob['status']) => {
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
          <p className="text-sm text-muted-foreground">Queue documents for translation and monitor progress</p>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="queue" className="flex items-center gap-2">
            <Queue className="h-4 w-4" />
            Queue Translation
          </TabsTrigger>
          <TabsTrigger value="audit" className="flex items-center gap-2">
            <ClockCounterClockwise className="h-4 w-4" />
            Audit Trail
          </TabsTrigger>
        </TabsList>

        <TabsContent value="queue" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Document Selection */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5" />
                  Document Selection
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Document Type</label>
                    <Select value={selectedDocumentType} onValueChange={setSelectedDocumentType}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                      <SelectContent>
                        {documentTypes.map(type => (
                          <SelectItem key={type} value={type}>{type}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Instance</label>
                    <Select value={selectedInstance} onValueChange={setSelectedInstance}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select instance" />
                      </SelectTrigger>
                      <SelectContent>
                        {instances.map(instance => (
                          <SelectItem key={instance} value={instance}>{instance}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Available Documents</label>
                  <div className="border rounded-md p-3 max-h-64 overflow-y-auto">
                    {filteredDocuments.length === 0 ? (
                      <p className="text-sm text-muted-foreground text-center py-4">
                        Select document type and instance to view available documents
                      </p>
                    ) : (
                      <div className="space-y-2">
                        {filteredDocuments.map(doc => (
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
                                {doc.name}
                              </label>
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
                            id={language}
                            checked={selectedLanguages.includes(language)}
                            onCheckedChange={() => handleLanguageToggle(language)}
                          />
                          <label 
                            htmlFor={language} 
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
              <CardTitle>Queue Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <p className="text-sm">
                    <span className="font-medium">{selectedDocuments.length}</span> documents selected
                  </p>
                  <p className="text-sm">
                    <span className="font-medium">{selectedLanguages.length}</span> languages selected
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Total jobs to create: <span className="font-medium">{selectedDocuments.length * selectedLanguages.length}</span>
                  </p>
                </div>
                <Button 
                  onClick={handleQueueTranslation}
                  disabled={selectedDocuments.length === 0 || selectedLanguages.length === 0}
                  className="flex items-center gap-2"
                >
                  <Queue className="h-4 w-4" />
                  Queue for Translation
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="audit" className="space-y-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
              <CardTitle className="flex items-center gap-2">
                <ClockCounterClockwise className="h-5 w-5" />
                Translation Jobs Audit Trail
              </CardTitle>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => setTranslationJobs(sampleTranslationJobs)}
                className="text-xs"
              >
                Refresh Data
              </Button>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Document</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Language</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Progress</TableHead>
                      <TableHead>User</TableHead>
                      <TableHead>Timestamp</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {translationJobs.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={7} className="text-center py-8 text-muted-foreground">
                          No translation jobs found
                        </TableCell>
                      </TableRow>
                    ) : (
                      translationJobs
                        .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
                        .map(job => (
                          <TableRow key={job.id}>
                            <TableCell className="font-medium">{job.documentName}</TableCell>
                            <TableCell>
                              <Badge variant="outline">{job.documentType}</Badge>
                            </TableCell>
                            <TableCell>{job.targetLanguages.join(', ')}</TableCell>
                            <TableCell>{getStatusBadge(job.status)}</TableCell>
                            <TableCell>
                              <div className="flex items-center space-x-2">
                                <div className="flex-1 bg-gray-200 rounded-full h-2">
                                  <div 
                                    className="bg-primary h-2 rounded-full transition-all duration-300"
                                    style={{ width: `${job.progress}%` }}
                                  ></div>
                                </div>
                                <span className="text-xs text-muted-foreground w-12">
                                  {job.progress}%
                                </span>
                              </div>
                            </TableCell>
                            <TableCell>
                              <div className="flex items-center space-x-2">
                                <User className="h-4 w-4 text-muted-foreground" />
                                <span className="text-sm">{job.username}</span>
                              </div>
                            </TableCell>
                            <TableCell>
                              <div className="flex items-center space-x-2">
                                <Calendar className="h-4 w-4 text-muted-foreground" />
                                <div className="flex flex-col">
                                  <span className="text-sm">
                                    {new Date(job.timestamp).toLocaleDateString()}
                                  </span>
                                  <span className="text-xs text-muted-foreground">
                                    {new Date(job.timestamp).toLocaleTimeString()}
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