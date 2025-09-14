import { useState } from 'react'
import { useKV } from '@github/spark/hooks'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Checkbox } from '@/components/ui/checkbox'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { 
  ClockCounterClockwise, 
  CircleNotch,
  FileText,
  User
import { 
interface Tra
  documentType: 'EOC' | '
  instance: str
  username: st
  target
  FileText,
  Calendar,
  User
} from '@phosphor-icons/react'
import { cn } from '@/lib/utils'

interface TranslationJob {
  id: string
  documentType: 'EOC' | 'ANOC' | 'SB'
  documentName: string
  instance: string
  status: 'queued' | 'in_progress' | 'completed'
  username: string
  timestamp: string
  targetLanguages: string[]
  progress: number
 

  })
  const hand
      prev.inc
        : [...prev, documentI
  }
  const handleLanguage
 

  }
  const handleQueueTranslation = as

    const user = await spark.user()
    const newJobs: TranslationJob[] = []
    // Create a separate job for each document-language combination
      const document = mockDocuments.find(d => d.id === docId)!
 

          documentName: document.name
          status: 'queued' as const,
          timestamp: new Date().toISOString(),
          progress: 0
      })

    

    setActiveTab('audit')

    switch (status) {

        return <CircleNotch className="h-
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

    // Get current user info
    const user = await spark.user()
    
    const newJobs: TranslationJob[] = selectedDocuments.map(docId => {
      const document = mockDocuments.find(d => d.id === docId)!
      return {
        id: `job-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        documentType: document.type,
        documentName: document.name,
        instance: document.instance,
        status: 'queued' as const,
        username: user.login,
        timestamp: new Date().toISOString(),
        targetLanguages: [...selectedLanguages],
        progress: 0
      }
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
                        
          <TabsTrigger value="audit" className="flex items-center gap-2">
            <ClockCounterClockwise className="h-4 w-4" />
            Audit & Status
          </TabsTrigger>
        </TabsList>

        <TabsContent value="queue" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Document Selection */}
                </
              <CardHeader>
                <div className="space-y-2">
                  <FileText className="h-5 w-5" />
                  Document Selection
                </CardTitle>
                          <
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Document Type</label>
                    <Select value={selectedDocumentType} onValueChange={setSelectedDocumentType}>
                            {language
                        <SelectValue placeholder="Select type" />
                      ))}
                      <SelectContent>
                        {documentTypes.map(type => (
                          <SelectItem key={type} value={type}>{type}</SelectItem>
                  <div clas
                      </SelectContent>
                      {select
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
              <CardContent 
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
                  </p>
                                {doc.name}
                              </label>
                              <p className="text-xs text-muted-foreground">
                                Last modified: {doc.lastModified}
                              </p>
                        <TableHead
                          </div>
                        ))}
                      </div>
                      
                  </div>
                      
              </CardContent>
                   

            {/* Language Selection */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Translate className="h-5 w-5" />
                  Target Languages
                            
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Select Languages for Translation</label>
                  <div className="border rounded-md p-3 max-h-64 overflow-y-auto">
                            <Calendar className="h-4 w-4 tex
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

                {selectedLanguages.length > 0 && (
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Selected Languages:</label>
                    <div className="flex flex-wrap gap-2">
                      {selectedLanguages.map(lang => (
                        <Badge key={lang} variant="secondary">

                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Queue Summary & Action */}
          {(selectedDocuments.length > 0 || selectedLanguages.length > 0) && (

              <CardHeader>

              </CardHeader>

                <div className="grid grid-cols-2 gap-4 text-sm">

                    <span className="font-medium">Documents selected:</span>
                    <span className="ml-2 text-muted-foreground">{selectedDocuments.length}</span>
                  </div>
                  <div>
                    <span className="font-medium">Target languages:</span>
                    <span className="ml-2 text-muted-foreground">{selectedLanguages.length}</span>
                  </div>
                </div>
                
                <Button 
                  onClick={handleQueueTranslation}
                  disabled={selectedDocuments.length === 0 || selectedLanguages.length === 0}
                  className="w-full"

                  Queue {selectedDocuments.length * selectedLanguages.length} Translation Jobs

              </CardContent>

          )}


        <TabsContent value="audit" className="space-y-6">
          <Card>

              <CardTitle className="flex items-center gap-2">
                <ClockCounterClockwise className="h-5 w-5" />
                Translation Jobs Audit

            </CardHeader>
            <CardContent>
              {translationJobs.length === 0 ? (
                <div className="text-center py-12">
                  <Queue className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-muted-foreground">No Translation Jobs</h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    Queue some documents for translation to see them here
                  </p>

              ) : (
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Document</TableHead>
                        <TableHead>Type</TableHead>

                        <TableHead>Languages</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Progress</TableHead>
                        <TableHead>User</TableHead>
                        <TableHead>Queued</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {translationJobs.map(job => (

                          <TableCell className="font-medium">{job.documentName}</TableCell>

                            <Badge variant="outline">{job.documentType}</Badge>

                          <TableCell>{job.instance}</TableCell>

                            <div className="flex flex-wrap gap-1">

                                <Badge key={lang} variant="secondary" className="text-xs">
                                  {lang.split(' ')[0]}
                                </Badge>

                              {job.targetLanguages.length > 2 && (
                                <Badge variant="secondary" className="text-xs">
                                  +{job.targetLanguages.length - 2}
                                </Badge>
                              )}

                          </TableCell>

                          <TableCell>
                            <div className="flex items-center gap-2">
                              <Progress value={job.progress} className="w-16 h-2" />
                              <span className="text-xs text-muted-foreground">{job.progress}%</span>
                            </div>

                          <TableCell className="flex items-center gap-2">
                            <User className="h-4 w-4 text-muted-foreground" />
                            {job.username}
                          </TableCell>
                          <TableCell className="flex items-center gap-2">
                            <Calendar className="h-4 w-4 text-muted-foreground" />
                            {new Date(job.timestamp).toLocaleDateString()}
                          </TableCell>
                        </TableRow>

                    </TableBody>

                </div>

            </CardContent>

        </TabsContent>

    </div>

}