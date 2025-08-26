import { useState, useEffect } from 'react';
import { useKV } from '@github/spark/hooks';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { RefreshCw, Database, FileText, Folder } from '@phosphor-icons/react';
import { Toaster } from '@/components/ui/sonner';
import { CMSDataCard } from '@/components/CMSDataCard';
import { SnippetLibrary } from '@/components/SnippetLibrary';
import { DocumentComposer } from '@/components/DocumentComposer';
import { CMSContent, ContentSnippet, Document } from '@/lib/types';
import { generateMockCMSData } from '@/lib/mockData';
import { toast } from 'sonner';

function App() {
  const [cmsData, setCmsData] = useState<CMSContent[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [snippets, setSnippets] = useKV<ContentSnippet[]>('content-snippets', []);
  const [documents, setDocuments] = useKV<Document[]>('saved-documents', []);
  const [showDocumentComposer, setShowDocumentComposer] = useState(false);
  const [selectedSnippet, setSelectedSnippet] = useState<ContentSnippet | null>(null);

  const loadCMSData = async () => {
    setIsLoading(true);
    try {
      const data = await generateMockCMSData();
      setCmsData(data);
      toast.success('CMS data loaded successfully');
    } catch (error) {
      toast.error('Failed to load CMS data');
      console.error('Failed to load CMS data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadCMSData();
  }, []);

  const handleSnippetCreated = (snippet: ContentSnippet) => {
    setSnippets(current => [...current, snippet]);
  };

  const handleSnippetUpdate = (updatedSnippet: ContentSnippet) => {
    setSnippets(current => 
      current.map(snippet => 
        snippet.id === updatedSnippet.id ? updatedSnippet : snippet
      )
    );
  };

  const handleSnippetSelect = (snippet: ContentSnippet) => {
    setSelectedSnippet(snippet);
  };

  const handleDocumentSave = (document: Document) => {
    setDocuments(current => [...current, document]);
  };

  const stats = {
    cmsItems: cmsData.length,
    snippets: snippets.length,
    documents: documents.length,
    categories: Array.from(new Set(snippets.map(s => s.category))).length
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-4xl font-bold text-foreground">DocuGen</h1>
              <p className="text-lg text-muted-foreground mt-1">
                Transform CMS content into structured document snippets
              </p>
            </div>
            <Button
              onClick={loadCMSData}
              disabled={isLoading}
              variant="outline"
              className="flex items-center gap-2"
            >
              <RefreshCw size={16} className={isLoading ? 'animate-spin' : ''} />
              Refresh CMS Data
            </Button>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <Database size={20} className="text-primary" />
                  <div>
                    <p className="text-2xl font-semibold">{stats.cmsItems}</p>
                    <p className="text-sm text-muted-foreground">CMS Items</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <FileText size={20} className="text-primary" />
                  <div>
                    <p className="text-2xl font-semibold">{stats.snippets}</p>
                    <p className="text-sm text-muted-foreground">Snippets</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <Folder size={20} className="text-primary" />
                  <div>
                    <p className="text-2xl font-semibold">{stats.categories}</p>
                    <p className="text-sm text-muted-foreground">Categories</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <FileText size={20} className="text-accent" />
                  <div>
                    <p className="text-2xl font-semibold">{stats.documents}</p>
                    <p className="text-sm text-muted-foreground">Documents</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        <Separator className="mb-8" />

        {/* Main Content */}
        <Tabs defaultValue="cms" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="cms" className="flex items-center gap-2">
              <Database size={16} />
              CMS Content
            </TabsTrigger>
            <TabsTrigger value="snippets" className="flex items-center gap-2">
              <FileText size={16} />
              Snippet Library
            </TabsTrigger>
          </TabsList>

          <TabsContent value="cms" className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-semibold">CMS Content</h2>
                <p className="text-muted-foreground">
                  Latest content from your CMS - create snippets from any piece of content
                </p>
              </div>
              <Badge variant="secondary" className="px-3 py-1">
                {cmsData.length} items loaded
              </Badge>
            </div>

            {isLoading ? (
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {[...Array(6)].map((_, i) => (
                  <Card key={i} className="animate-pulse">
                    <CardHeader>
                      <div className="h-4 bg-muted rounded w-3/4"></div>
                      <div className="h-3 bg-muted rounded w-1/2"></div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        <div className="h-3 bg-muted rounded"></div>
                        <div className="h-3 bg-muted rounded"></div>
                        <div className="h-3 bg-muted rounded w-2/3"></div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {cmsData.map((content) => (
                  <CMSDataCard
                    key={content.id}
                    content={content}
                    onSnippetCreated={handleSnippetCreated}
                  />
                ))}
              </div>
            )}
          </TabsContent>

          <TabsContent value="snippets">
            <SnippetLibrary
              snippets={snippets}
              onSnippetSelect={handleSnippetSelect}
              onCreateDocument={() => setShowDocumentComposer(true)}
            />
          </TabsContent>
        </Tabs>

        {/* Document Composer Dialog */}
        <DocumentComposer
          open={showDocumentComposer}
          onOpenChange={setShowDocumentComposer}
          snippets={snippets}
          onSnippetUpdate={handleSnippetUpdate}
          onDocumentSave={handleDocumentSave}
        />

        {/* Snippet Preview Dialog */}
        {selectedSnippet && (
          <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <Card className="w-full max-w-2xl max-h-[80vh] overflow-hidden">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>{selectedSnippet.title}</CardTitle>
                    <CardDescription className="flex items-center gap-4 mt-1">
                      <Badge variant="outline">{selectedSnippet.category}</Badge>
                      <span>Created {selectedSnippet.createdAt.toLocaleDateString()}</span>
                      {selectedSnippet.usageCount > 0 && (
                        <span>Used {selectedSnippet.usageCount} times</span>
                      )}
                    </CardDescription>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setSelectedSnippet(null)}
                  >
                    ×
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="overflow-y-auto">
                <p className="text-sm leading-relaxed mb-4">
                  {selectedSnippet.content}
                </p>
                {selectedSnippet.tags.length > 0 && (
                  <div className="flex flex-wrap gap-1">
                    {selectedSnippet.tags.map((tag) => (
                      <Badge key={tag} variant="secondary" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        )}
      </div>

      <Toaster />
    </div>
  );
}

export default App;