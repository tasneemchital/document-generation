import { useState } from 'react'
import { useKV } from '@github/spark/hooks'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/che
import { 
  Queue, 
  ClockCounterClockwise, 
  FileText,
  Calendar

  id: string
  documen
  status: 'queu
  timestamp: string
  progress: nu

  id: s
  type: 'E
  lastModified: string

  { id: '1', name: 'Medica
  { id: '3',
]
const documentTypes = 
const languages = 
const sampleTranslationJobs: TranslationJob[] = 
    id: 'job-1',
    documentName: '
    status: 'queued',
    timestamp: '20
 

interface MockDocument {
  id: string
  name: string
  type: 'EOC' | 'ANOC' | 'SB'
  instance: string
  lastModified: string
}

const mockDocuments: MockDocument[] = [
  { id: '1', name: 'Medicare EOC 2025', type: 'EOC', instance: 'HMO MAPD', lastModified: '2024-01-15' },
  { id: '2', name: 'ANOC Summary 2025', type: 'ANOC', instance: 'PPO MAPD', lastModified: '2024-01-10' },
  { id: '3', name: 'Summary of Benefits 2025', type: 'SB', instance: 'HMO MAPD', lastModified: '2024-01-12' },
  { id: '4', name: 'Medicare EOC Dental', type: 'EOC', instance: 'PPO MAPD', lastModified: '2024-01-08' }
]

const documentTypes = ['EOC', 'ANOC', 'SB']
const instances = ['HMO MAPD', 'PPO MAPD', 'PFFS']
const languages = ['Spanish', 'Chinese (Simplified)', 'Chinese (Traditional)', 'Vietnamese', 'Korean', 'Tagalog', 'Russian', 'Arabic', 'French', 'Portuguese']

export function TranslationStudio() {
  const [activeTab, setActiveTab] = useState('queue')
  const [translationJobs, setTranslationJobs] = useKV<TranslationJob[]>('translation-jobs', [])
  
  // Queue form state
  const [selectedDocumentType, setSelectedDocumentType] = useState('')
  const [selectedInstance, setSelectedInstance] = useState('')
  const [selectedDocuments, setSelectedDocuments] = useState<string[]>([])
  const [selectedLanguages, setSelectedLanguages] = useState<string[]>([])

  const filteredDocuments = mockDocuments.filter(doc => {
    if (selectedDocumentType && doc.type !== selectedDocumentType) return false
    if (selectedInstance && doc.instance !== selectedInstance) return false
    return true
    

  const handleDocumentToggle = (documentId: string) => {
    setSelectedDocuments(prev => 
      prev.includes(documentId) 
        ? prev.filter(id => id !== documentId)
        : [...prev, documentId]
    )
   

  const handleLanguageToggle = (language: string) => {
    setSelectedLanguages(prev => 
      prev.includes(language) 
        ? prev.filter(lang => lang !== language)
        : [...prev, language]
    )
   

    timestamp: '2024-01-13T11:45:00Z',
    if (selectedDocuments.length === 0 || selectedLanguages.length === 0) return

    // Get current user info
    documentType: 'EOC',
    
    status: 'completed',
    
    // Create a separate job for each document-language combination
    selectedDocuments.forEach(docId => {
      const document = mockDocuments.find(d => d.id === docId)!
      selectedLanguages.forEach(language => {
    documentName: 'ANO
          id: `job-${Date.now()}-${Math.random().toString(36).substr(2, 9)}-${docId}-${language}`,
    username: 'ahmed.hassan',
          documentName: document.name,
    progress: 0
          status: 'queued' as const,
          username: user.login,
          timestamp: new Date().toISOString(),
          targetLanguages: [language],
          progress: 0
    timest
      })
  }

    setTranslationJobs(current => [...current, ...newJobs])
    
    // Reset selections
    setSelectedDocuments([])
  const [selectedInstance, s
    setActiveTab('audit')


    if (selectedInstance && doc.instance !== selectedInstance) 
    switch (status) {

        return <Queue className="h-4 w-4 text-yellow-500" />
      case 'in_progress':
        return <CircleNotch className="h-4 w-4 text-blue-500 animate-spin" />
    )
        return <CheckCircle className="h-4 w-4 text-green-500" />
  con
  }

  const getStatusBadge = (status: TranslationJob['status']) => {
    const variants = {
      queued: 'bg-yellow-100 text-yellow-800 hover:bg-yellow-100',
      in_progress: 'bg-blue-100 text-blue-800 hover:bg-blue-100',
      completed: 'bg-green-100 text-green-800 hover:bg-green-100'
    }
    
    
      queued: 'Queued',
      const document = mockDocume
      completed: 'Completed'
     

          in
      <Badge variant="secondary" className={variants[status]}>
          timestamp: new Date()
        <span className="ml-1">{labels[status]}</span>
      </Badge>
    )


  return (
    <div className="p-6 max-w-7xl mx-auto">
    setActiveTab('audit')
        <Translate className="h-8 w-8 text-primary" />
  const getSt
          <h1 className="text-2xl font-bold text-foreground">Translation Studio</h1>
          <p className="text-sm text-muted-foreground">Queue documents for translation and monitor progress</p>
        </div>
      case '

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="queue" className="flex items-center gap-2">
            <Queue className="h-4 w-4" />
            Queue Translation
          </TabsTrigger>
          <TabsTrigger value="audit" className="flex items-center gap-2">
            <ClockCounterClockwise className="h-4 w-4" />
      completed: 'Complete
          </TabsTrigger>
    return (

        <TabsContent value="queue" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Document Selection */}
            <Card>
    <div className="p-6 ma
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5" />
                  Document Selection
        </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
            <Queue className="h-4 w-4" />
                    <label className="text-sm font-medium">Document Type</label>
                    <Select value={selectedDocumentType} onValueChange={setSelectedDocumentType}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
        <TabsContent value="queue" cl
                        {documentTypes.map(type => (
                          <SelectItem key={type} value={type}>{type}</SelectItem>
                        ))}
                  <FileText className=
                    </Select>
              </CardHead
                  
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
                    <label className="
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
                      <p 
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
            <Card>
                    )}
                  <Trans
                </div>
              </CardHeader>
            </Card>

            {/* Language Selection */}
                  
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Translate className="h-5 w-5" />
                  Target Languages
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                          </label>
                  <label className="text-sm font-medium">Select Languages for Translation</label>
                  <div className="border rounded-md p-3 max-h-64 overflow-y-auto">
                    <div className="space-y-2">

                        <div key={language} className="flex items-center space-x-2 p-2 rounded hover:bg-muted/50">
                  <Table>
                      <TableRow>
                        <TableHead>Type</TableHead>
                        <TableHead>Language</TableHead>
                        <Tab
                        <TableHea
                    </TableHeader>
                      {translationJobs
                        .ma
                          <TableCell c
                            <Badge
                          <Tab
                         
                          
                        
                      

                          </TableCell>
                            <User className="
                          </TableCell>
                            <div className="flex items-cen
                              <div className="flex fle
                                  {new Date(job.timestamp).toL
                                
                                
                         
                        </
                    </Ta
                </
            </CardContent>
        </TabsConte
    </div>







































































































