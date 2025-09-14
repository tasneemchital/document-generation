/**
 * Test utility to verify safe template processing
// 

  try {
    // but our global error handler should
    console.log('Test content:', testContent);
  
  try {
        return (ifContent || elseContent || '').trim();
    );
    console.log('Safely processed:', processed);
    console.log('Test content:', testContent);
    
}
// Make the test available globally for de
      /IF\s*\([^)]*\)\s*(.*?)(?:ELSE\s*(.*?))?(?:ENDIF|END)/gi,
      (match, ifContent, elseContent) => {
        return (ifContent || elseContent || '').trim();
      }
    );
    
    console.log('Safely processed:', processed);
    return true;
  } catch (error) {
    console.error('Template processing test failed:', error);
    return false;
  }
}

// Make the test available globally for debugging
if (typeof window !== 'undefined') {
  (window as any).testTemplateProcessing = testTemplateProcessing;
}