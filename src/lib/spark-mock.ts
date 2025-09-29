// Mock implementation of spark API for development
export const spark = {
  llmPrompt: (strings: string[], ...values: any[]) => {
    let result = strings[0]
    values.forEach((value, index) => {
      result += String(value) + (strings[index + 1] || '')
    })
    return result
  },
  
  llm: async (prompt: string, model?: string, jsonMode?: boolean) => {
    // Mock LLM response
    return jsonMode ? '{"result": "mock response"}' : 'Mock LLM response'
  },
  
  user: async () => ({
    avatarUrl: 'https://github.com/github.png',
    email: 'user@example.com',
    id: 'mock-user-id',
    isOwner: true,
    login: 'mockuser'
  }),
  
  kv: {
    keys: async () => Object.keys(localStorage).filter(key => key.startsWith('kv:')),
    
    get: async <T>(key: string): Promise<T | undefined> => {
      const stored = localStorage.getItem(`kv:${key}`)
      return stored ? JSON.parse(stored) : undefined
    },
    
    set: async <T>(key: string, value: T) => {
      localStorage.setItem(`kv:${key}`, JSON.stringify(value))
    },
    
    delete: async (key: string) => {
      localStorage.removeItem(`kv:${key}`)
    }
  }
}

// Make spark globally available in development
declare global {
  interface Window {
    spark: typeof spark
  }
}

if (typeof window !== 'undefined') {
  window.spark = spark
}