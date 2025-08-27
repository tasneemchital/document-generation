import { useState } from 'react';
import { useKV } from '@github/spark/hooks';
import { Dashboard } from '@/components/Dashboard';
import { DocuGenPage } from '@/components/DocuGenPage';

function App() {
  const [currentPage, setCurrentPage] = useKV<string>('current-page', 'dashboard');

  const handleNavigate = (page: string) => {
    setCurrentPage(page);
  };

  const renderCurrentPage = () => {
    switch (currentPage) {
      case 'manage':
        return <DocuGenPage onNavigate={handleNavigate} />;
      case 'dashboard':
      default:
        return <Dashboard onNavigate={handleNavigate} />;
    }
  };

  return renderCurrentPage();
}

export default App;