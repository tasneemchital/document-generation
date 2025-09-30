// Production-ready mock implementation of spark API
export const spark = {
  llmPrompt: (strings: TemplateStringsArray, ...values: any[]) => {
    let result = strings[0]
    values.forEach((value, index) => {
      result += String(value) + (strings[index + 1] || '')
    })
    return result
  },
  
  llm: async (prompt: string, modelName?: string, jsonMode?: boolean) => {
    // In production, this would make actual API calls
    // For now, return appropriate mock responses
    if (jsonMode) {
      return JSON.stringify({ result: "Mock LLM response", status: "success" })
    }
    return 'Mock LLM response for production environment'
  },
  
  user: async () => ({
    avatarUrl: 'https://github.com/github.png',
    email: 'user@example.com',
    id: 'production-user-id',
    isOwner: true,
    login: 'sparkuser'
  }),
  
  kv: {
    keys: async () => {
      // Get all keys from localStorage that start with 'kv:'
      const keys: string[] = []
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i)
        if (key && key.startsWith('kv:')) {
          keys.push(key.substring(3)) // Remove 'kv:' prefix
        }
      }
      return keys
    },
    
    get: async <T>(key: string): Promise<T | undefined> => {
      try {
        const stored = localStorage.getItem(`kv:${key}`)
        return stored ? JSON.parse(stored) : undefined
      } catch (error) {
        console.warn(`Failed to get KV value for key "${key}":`, error)
        return undefined
      }
    },
    
    set: async <T>(key: string, value: T) => {
      try {
        localStorage.setItem(`kv:${key}`, JSON.stringify(value))
      } catch (error) {
        console.warn(`Failed to set KV value for key "${key}":`, error)
      }
    },
    
    delete: async (key: string) => {
      try {
        localStorage.removeItem(`kv:${key}`)
      } catch (error) {
        console.warn(`Failed to delete KV value for key "${key}":`, error)
      }
    }
  }
}

// Make spark globally available
declare global {
  interface Window {
    spark: {
      llmPrompt: (strings: TemplateStringsArray, ...values: any[]) => string
      llm: (prompt: string, modelName?: string, jsonMode?: boolean) => Promise<string>
      user: () => Promise<{
        avatarUrl: string
        email: string
        id: string
        isOwner: boolean
        login: string
      }>
      kv: {
        keys: () => Promise<string[]>
        get: <T>(key: string) => Promise<T | undefined>
        set: <T>(key: string, value: T) => Promise<void>
        delete: (key: string) => Promise<void>
      }
    }
  }
}

if (typeof window !== 'undefined') {
  window.spark = spark
}