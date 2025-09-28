import { useState, useEffect } from 'react'
import { useKV } from '@github/spark/hooks'
import { Navigation } from '@/components/Navigation'
import { TopBar } from '@/components/TopBar'
import { Dashboard } from '@/components/pages/Dashboard'
import { 
  MasterList, 
  Collaborate, 
  Generate, 
  Publish, 
  AdminSettings, 
  DesignStudio,
  AskBenny,
  Portfolio,
  Configure,
  Manage
} from '@/components/pages/PlaceholderPages'
import { DigitalContentManager } from '@/components/pages/DigitalContentManager'
import { MedicareEOCMasterList } from '@/components/pages/MedicareEOCMasterList'
import { DCMEditPage } from '@/components/pages/DCMEditPage'
import { Template } from '@/components/pages/Template'
import { TranslationStudio } from '@/components/pages/TranslationStudio'
import { ProductDetail } from '@/components/pages/ProductDetail'
import { Documents } from '@/components/pages/Documents'
import { DocumentViewer } from '@/components/pages/DocumentViewer'
import { NavigationDemo } from '@/components/NavigationDemo'
import { RuleData } from '@/lib/types'
import { refreshApp } from '@/lib/refresh'

function App() {
  // Force a complete refresh by incrementing a key on mount
  const [refreshKey, setRefreshKey] = useState(Date.now())
  
  const [currentPage, setCurrentPage] = useKV('sda-current-page', 'dashboard')
  const [isCollapsed, setIsCollapsed] = useKV('sda-sidebar-collapsed', false)
  const [editingRule, setEditingRule] = useKV<RuleData | null>('dcm-editing-rule', null)
  const [editingFrom, setEditingFrom] = useKV<string>('dcm-editing-from', 'dcm')
  const [rules, setRules] = useKV<RuleData[]>('rule-data', [])
  const [selectedProductId, setSelectedProductId] = useKV<string>('selected-product-id', '')
  const [selectedProductName, setSelectedProductName] = useKV<string>('selected-product-name', '')
  const [selectedDocumentId, setSelectedDocumentId] = useKV<string>('selected-document-id', '')
  const [selectedDocumentName, setSelectedDocumentName] = useKV<string>('selected-document-name', '')

  // Force refresh on mount and add keyboard shortcut
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.key === 'r') {
        e.preventDefault()
        refreshApp()
      }
    }
    
    setRefreshKey(prev => prev + 1)
    window.addEventListener('keydown', handleKeyPress)
    return () => window.removeEventListener('keydown', handleKeyPress)
  }, [])

  const handleRuleCreate = (newRule: RuleData) => {
    setRules((current: RuleData[]) => {
      if (!Array.isArray(current)) {
        return [newRule];
      }
      return [newRule, ...current];
    });
  };

  const handleRuleUpdate = (updatedRule: RuleData) => {
    setRules((current: RuleData[]) => {
      if (!Array.isArray(current)) {
        return [updatedRule];
      }
      return current.map(rule => 
        rule.id === updatedRule.id ? updatedRule : rule
      );
    });
  };

  const renderCurrentPage = () => {
    try {
      switch (currentPage) {
        case 'dashboard':
          return <NavigationDemo onNavigate={setCurrentPage} />
        case 'navigation-demo':
          return <NavigationDemo onNavigate={setCurrentPage} />
        case 'real-dashboard':
          return <Dashboard onNavigate={setCurrentPage} />
        case 'manage':
          return <Manage />
        case 'global-template':
          return <MedicareEOCMasterList onNavigate={setCurrentPage} />
        case 'template':
          return <Template 
            onNavigate={setCurrentPage} 
            onEditRule={(ruleId) => {
              const rule = rules.find(r => r.id === ruleId)
              if (rule) {
                setEditingRule(rule)
                setEditingFrom('template')
                setCurrentPage('edit-rule')
              }
            }} 
          />
        case 'translation-studio':
          return <TranslationStudio />
        case 'documents':
          return <Documents 
            onNavigate={setCurrentPage}
            onDocumentSelect={(documentId, documentName) => {
              setSelectedDocumentId(documentId)
              setSelectedDocumentName(documentName)
              setCurrentPage('document-viewer')
            }}
          />
        case 'document-viewer':
          return <DocumentViewer
            documentId={selectedDocumentId}
            documentName={selectedDocumentName}
            onNavigate={setCurrentPage}
          />
        case 'portfolio':
          return <Portfolio 
            onNavigate={setCurrentPage}
            onProductSelect={(productId, productName) => {
              setSelectedProductId(productId)
              setSelectedProductName(productName)
              setCurrentPage('product-detail')
            }}
          />
        case 'product-detail':
          return <ProductDetail 
            productId={selectedProductId}
            productName={selectedProductName}
            onNavigate={setCurrentPage}
          />
        case 'global-content':
          return <Configure />
        case 'collaborate':
          return <Collaborate />
        case 'masterlist':
          return <MasterList />
        case 'generate':
          return <Generate />
        case 'publish':
          return <Publish />
        case 'ask-benny':
          return <AskBenny />
        case 'admin-settings':
          return <AdminSettings />
        case 'design-studio':
          return <DesignStudio />
        case 'dcm':
          return <DigitalContentManager 
            onNavigate={setCurrentPage}
            onEditRule={(rule) => {
              setEditingRule(rule)
              setEditingFrom('dcm')
              setCurrentPage('edit-rule')
            }}
          />
        case 'create-rule':
          return <DCMEditPage 
            rule={null}
            onNavigate={setCurrentPage}
            onSave={(rule) => {
              handleRuleCreate(rule);
              setCurrentPage('dcm');
            }}
            mode="create"
          />
        case 'edit-rule':
          return <DCMEditPage 
            rule={editingRule}
            onNavigate={setCurrentPage}
            onSave={(rule) => {
              handleRuleUpdate(rule);
              setCurrentPage(editingFrom === 'template' ? 'template' : 'dcm');
            }}
            mode="edit"
          />
        default:
          return <Dashboard onNavigate={setCurrentPage} />
      }
    } catch (error) {
      console.error('Error rendering page:', error)
      return <Dashboard onNavigate={setCurrentPage} />
    }
  }

  return (
    <div key={refreshKey} className="flex flex-col h-screen bg-background">
      <TopBar onToggleSidebar={() => setIsCollapsed(!isCollapsed)} />
      <div className="flex flex-1 overflow-hidden">
        <Navigation 
          currentPage={currentPage}
          onNavigate={setCurrentPage}
          isCollapsed={isCollapsed}
        />
        <main className="flex-1 overflow-auto">
          {renderCurrentPage()}
        </main>
      </div>
    </div>
  )
}

export default App