import { useState } from 'react'
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
  Portfolio
} from '@/components/pages/PlaceholderPages'
import { DigitalContentManager } from '@/components/pages/DigitalContentManager'
import { MedicareEOCMasterList } from '@/components/pages/MedicareEOCMasterList'
import { DCMEditPage } from '@/components/pages/DCMEditPage'
import { Template } from '@/components/pages/Template'
import { TranslationStudio } from '@/components/pages/TranslationStudio'
import { RuleData } from '@/lib/types'

function App() {
  const [currentPage, setCurrentPage] = useKV('sda-current-page', 'dashboard')
  const [isCollapsed, setIsCollapsed] = useKV('sda-sidebar-collapsed', false)
  const [editingRule, setEditingRule] = useKV<RuleData | null>('dcm-editing-rule', null)
  const [editingFrom, setEditingFrom] = useKV<string>('dcm-editing-from', 'dcm')
  const [rules, setRules] = useKV<RuleData[]>('rule-data', [])

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
    switch (currentPage) {
      case 'dashboard':
        return <Dashboard onNavigate={setCurrentPage} />
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
      case 'portfolio':
        return <Portfolio />
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
  }

  return (
    <div className="flex flex-col h-screen bg-background">
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