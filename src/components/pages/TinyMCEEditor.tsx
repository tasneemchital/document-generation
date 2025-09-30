import { useRef, useEffect, useState } from 'react';
// TinyMCE not available in dependencies - using textarea instead
import { sanitizeHtml } from '@/lib/content-safety';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { FloppyDisk, X, Globe, TextT, Eye, EyeSlash } from '@phosphor-icons/react';
import { toast } from 'sonner';
import './tinymce-custom.css';

interface TinyMCEEditorProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (englishContent: string, spanishContent: string) => Promise<void>;
  initialEnglishContent?: string;
  initialSpanishContent?: string;
}

export function TinyMCEEditor({
  isOpen,
  onClose,
  onSave,
  initialEnglishContent = '',
  initialSpanishContent = ''
}: TinyMCEEditorProps) {
  const [englishContent, setEnglishContent] = useState(initialEnglishContent);
  const [spanishContent, setSpanishContent] = useState(initialSpanishContent);
  const [isPreviewMode, setIsPreviewMode] = useState(false);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Update content when initial values change
  useEffect(() => {
    setEnglishContent(initialEnglishContent);
    setSpanishContent(initialSpanishContent);
    setHasUnsavedChanges(false);
  }, [initialEnglishContent, initialSpanishContent]);

  const handleSave = async () => {
    setIsLoading(true);
    try {
      await onSave(englishContent, spanishContent);
      setHasUnsavedChanges(false);
      toast.success('Content saved successfully!');
    } catch (error) {
      toast.error('Failed to save content. Please try again.');
      console.error('Save error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleClose = () => {
    if (hasUnsavedChanges) {
      if (window.confirm('You have unsaved changes. Are you sure you want to close?')) {
        setHasUnsavedChanges(false);
        onClose();
      }
    } else {
      onClose();
    }
  };

  const handleContentChange = (content: string, isEnglish: boolean) => {
    if (isEnglish) {
      setEnglishContent(content);
    } else {
      setSpanishContent(content);
    }
    setHasUnsavedChanges(true);
  };

  // Keyboard shortcut for saving (Ctrl+S / Cmd+S)
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if ((event.ctrlKey || event.metaKey) && event.key === 's') {
        event.preventDefault();
        if (hasUnsavedChanges && !isLoading) {
          handleSave();
        }
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
      return () => document.removeEventListener('keydown', handleKeyDown);
    }
  }, [isOpen, hasUnsavedChanges, isLoading]);

  if (!isOpen) return null;

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-7xl h-[85vh] p-0 overflow-hidden">
        <DialogHeader className="px-6 py-4 border-b border-gray-200 bg-gray-50">
          <div className="flex items-center justify-between">
            <DialogTitle className="text-xl font-semibold text-gray-900 flex items-center gap-2">
              <TextT className="text-blue-600" size={20} />
              Content Editor
              {hasUnsavedChanges && (
                <Badge variant="outline" className="ml-2 text-amber-600 border-amber-300">
                  Unsaved Changes
                </Badge>
              )}
            </DialogTitle>
            
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setIsPreviewMode(!isPreviewMode)}
                className="flex items-center gap-2"
              >
                {isPreviewMode ? <EyeSlash size={14} /> : <Eye size={14} />}
                {isPreviewMode ? 'Edit' : 'Preview'}
              </Button>
            </div>
          </div>
        </DialogHeader>

        <ScrollArea className="flex-1">
          <div className="grid grid-cols-2 gap-6 p-6 h-full">
            {/* English Editor */}
            <Card className="flex flex-col h-full">
              <div className="px-4 py-3 border-b border-gray-200 bg-gray-50 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Globe size={16} className="text-blue-600" />
                  <span className="font-medium text-gray-900">English Content</span>
                </div>
                <Badge variant="secondary" className="text-xs">
                  Primary
                </Badge>
              </div>
              
              <div className="flex-1 p-4">
                {isPreviewMode ? (
                  <div 
                    className="prose prose-sm max-w-none min-h-[300px] p-4 border rounded bg-white"
                    dangerouslySetInnerHTML={{ __html: sanitizeHtml(englishContent || '<p><em>No content</em></p>') }}
                  />
                ) : (
                  <textarea
                    className="w-full min-h-[300px] p-4 border rounded bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                    value={englishContent}
                    onChange={(e) => handleContentChange(e.target.value, true)}
                    placeholder="Enter English content..."
                  />
                )}
              </div>
            </Card>

            {/* Spanish Editor */}
            <Card className="flex flex-col h-full">
              <div className="px-4 py-3 border-b border-gray-200 bg-gray-50 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <TextT size={16} className="text-amber-600" />
                  <span className="font-medium text-gray-900">Spanish Content</span>
                </div>
                <Badge variant="secondary" className="text-xs">
                  Translation
                </Badge>
              </div>
              
              <div className="flex-1 p-4">
                {isPreviewMode ? (
                  <div 
                    className="prose prose-sm max-w-none min-h-[300px] p-4 border rounded bg-white"
                    dangerouslySetInnerHTML={{ __html: sanitizeHtml(spanishContent || '<p><em>No content</em></p>') }}
                  />
                ) : (
                  <textarea
                    className="w-full min-h-[300px] p-4 border rounded bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                    value={spanishContent}
                    onChange={(e) => handleContentChange(e.target.value, false)}
                    placeholder="Enter Spanish content..."
                  />
                )}
              </div>
            </Card>
          </div>
        </ScrollArea>

        {/* Action Buttons */}
        <div className="flex items-center justify-end gap-3 px-6 py-4 border-t border-gray-200 bg-gray-50">
          <Button 
            variant="outline" 
            onClick={handleClose}
            className="flex items-center gap-2"
            disabled={isLoading}
          >
            <X size={14} />
            Cancel
          </Button>
          <Button 
            onClick={handleSave}
            className="flex items-center gap-2"
            disabled={isLoading || !hasUnsavedChanges}
          >
            <FloppyDisk size={14} />
            {isLoading ? 'Saving...' : 'Save Changes'}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}