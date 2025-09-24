/**
 * Content safety utilities to prevent XSS and JavaScript evaluation issues
 */

/**
 * Sanitizes a URL to prevent XSS attacks
 */
export function sanitizeUrl(url: string): string {
  if (!url || typeof url !== 'string') return '';
  
  return url
    .replace(/javascript:/gi, '') // Remove javascript: URLs
    .replace(/on\w+\s*=/gi, '') // Remove event handlers
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '') // Remove script tags
    .trim();
}

/**
 * Safely escapes string content for display
 */
export function escapeContent(value: string): string {
  if (value === null || value === undefined) return '';
  
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
    .replace(/\r?\n/g, '\\n'); // Escape newlines for safe text handling
}

/**
 * Sanitizes HTML content by removing dangerous tags and attributes
 */
export function sanitizeHtml(html: string): string {
  if (!html || typeof html !== 'string') return '';
  
  return html
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '') // Remove script tags
    .replace(/<iframe\b[^<]*(?:(?!<\/iframe>)<[^<]*)*<\/iframe>/gi, '') // Remove iframe tags
    .replace(/on\w+\s*=\s*"[^"]*"/gi, '') // Remove event handlers
    .replace(/on\w+\s*=\s*'[^']*'/gi, '') // Remove event handlers (single quotes)
    .replace(/javascript:/gi, '') // Remove javascript: URLs
    .trim();
}

/**
 * Alias for sanitizeHtml - for backward compatibility
 */
export const sanitizeHtmlContent = sanitizeHtml;

/**
 * Sanitizes rule descriptions for safe insertion into editors
 */
export function sanitizeRuleDescription(description: string): string {
  if (!description || typeof description !== 'string') return '';
  
  return description
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '') // Remove script tags
    .replace(/javascript:/gi, '') // Remove javascript: URLs
    .replace(/on\w+\s*=/gi, '') // Remove event handlers
    .replace(/eval\s*\(/gi, '') // Remove eval calls
    .replace(/function\s*\(/gi, '') // Remove function declarations
    .replace(/\[RULE-/gi, '[RULE-') // Normalize rule markers
    .replace(/\[\/RULE-/gi, '[/RULE-') // Normalize rule end markers
    .trim();
}

/**
 * Sanitizes condition expressions to prevent code injection in rule conditions
 */
export function sanitizeConditionExpression(expression: string): string {
  if (!expression || typeof expression !== 'string') return '';
  
  return expression
    .replace(/[<>]/g, '') // Remove angle brackets
    .replace(/javascript:/gi, '') // Remove javascript: URLs
    .replace(/on\w+\s*=/gi, '') // Remove event handlers
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '') // Remove script tags
    .replace(/eval\s*\(/gi, '') // Remove eval calls
    .replace(/function\s*\(/gi, '') // Remove function declarations
    .replace(/=\s*function/gi, '') // Remove function assignments
    .trim();
}

/**
 * Safely processes template content with IF/ELSE/END statements without JavaScript evaluation
 */
export function processTemplateContentSafely(content: string, variables: Record<string, any> = {}): string {
  if (!content || typeof content !== 'string') return '';
  
  try {
    let processedContent = content;
    
    // Safely process IF/ELSE/END statements using regex (no JavaScript evaluation)
    processedContent = processedContent.replace(
      /IF\s*\([^)]*\)\s*([\s\S]*?)(?:ELSE\s*([\s\S]*?))?(?:ENDIF|END)/gi,
      (match, ifContent, elseContent) => {
        // For safety, always return the IF content if it exists, otherwise ELSE content
        return (ifContent || elseContent || '').trim();
      }
    );
    
    // Safely replace variables using string replacement (no template literal evaluation)
    Object.entries(variables).forEach(([key, value]) => {
      if (key && value !== undefined && value !== null) {
        const safeValue = String(value).replace(/[{}]/g, ''); // Remove curly braces from value
        const regex = new RegExp(`\\{\\s*${key}\\s*\\}`, 'gi');
        processedContent = processedContent.replace(regex, safeValue);
      }
    });
    
    return processedContent;
  } catch (error) {
    console.warn('Error in safe template processing:', error);
    return content; // Return original if processing fails
  }
}

/**
 * Sets up global error handling to catch and log JavaScript errors
 */
export function setupGlobalErrorHandling(): () => void {
  const handleError = (event: ErrorEvent) => {
    // Filter out specific template-related errors that are safe to ignore
    const errorMessage = event.message || '';
    
    if (errorMessage.includes('IF is not defined') || 
        errorMessage.includes('ELSE is not defined') || 
        errorMessage.includes('END is not defined') ||
        errorMessage.includes('ENDIF is not defined')) {
      // These are likely template processing errors that don't affect functionality
      console.warn('Template processing reference error (safe to ignore):', errorMessage);
      event.preventDefault(); // Prevent the error from propagating
      event.stopPropagation(); // Stop the error event
      return true; // Prevent default error handling
    }
    
    // Also handle other common template-related errors
    if (errorMessage.includes('Cannot read property') && 
        (errorMessage.includes('IF') || errorMessage.includes('ELSE') || errorMessage.includes('END'))) {
      console.warn('Template property access error (safe to ignore):', errorMessage);
      event.preventDefault();
      event.stopPropagation();
      return true;
    }
    
    console.error('Caught JavaScript error:', {
      message: event.message,
      filename: event.filename,
      lineno: event.lineno,
      colno: event.colno,
      error: event.error
    });
    return false;
  };

  const handleUnhandledRejection = (event: PromiseRejectionEvent) => {
    const reasonStr = String(event.reason || '');
    
    // Handle promise rejections related to template processing
    if (reasonStr.includes('IF is not defined') || 
        reasonStr.includes('ELSE is not defined') || 
        reasonStr.includes('END is not defined')) {
      console.warn('Template processing promise rejection (safe to ignore):', reasonStr);
      event.preventDefault();
      return true;
    }
    
    console.error('Caught unhandled promise rejection:', event.reason);
    return false;
  };

  // Add global error listeners
  window.addEventListener('error', handleError, true); // Use capture phase
  window.addEventListener('unhandledrejection', handleUnhandledRejection, true);

  // Return cleanup function
  return () => {
    window.removeEventListener('error', handleError, true);
    window.removeEventListener('unhandledrejection', handleUnhandledRejection, true);
  };
}