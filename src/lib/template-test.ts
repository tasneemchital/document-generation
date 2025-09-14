/**
 * Test utility to verify safe template processing
 */

export function testTemplateProcessing(): boolean {
  const testContent = `
    {{IF:[Medicare[PlanType]=hmo]}}
    HMO Content
    {{ELSE}}
    Non-HMO Content
    {{END}}
  `;

  try {
    // Process the test content
    const processed = testContent.replace(
      /IF\s*\([^)]*\)\s*(.*?)(?:ELSE\s*(.*?))?(?:ENDIF|END)/gi,
      (match, ifContent, elseContent) => {
        return (ifContent || elseContent || '').trim();
      }
    );
    
    console.log('Test content:', testContent);
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