// Mock implementation of spark API for development
export const mockSpark = {
  llmPrompt: (strings: string[], ...values: any[]) => {
    let result = strings[0]
    values.forEach((value, index) => {
      result += String(value) + (strings[index + 1] || '')
    })
    return result
  },
  
  llm: async (prompt: string, modelName?: string, jsonMode?: boolean) => {
    console.warn('Mock LLM called with:', { prompt, modelName, jsonMode })
    if (jsonMode) {
      return '{"message": "Mock LLM response in JSON mode"}'
    }
    return 'Mock LLM response'
  },
  
  user: async () => ({
    avatarUrl: 'https://github.com/github.png',
    email: 'user@example.com',
    id: 'mock-user-id',
    isOwner: true,
    login: 'mockuser'
  }),
  
  kv: {
    keys: async () => [],
    get: async <T>(key: string): Promise<T | undefined> => {
      const stored = localStorage.getItem(`mock-kv-${key}`)
      return stored ? JSON.parse(stored) : undefined
    },
    set: async <T>(key: string, value: T) => {
      localStorage.setItem(`mock-kv-${key}`, JSON.stringify(value))
    },
    delete: async (key: string) => {
      localStorage.removeItem(`mock-kv-${key}`)
    }
  }
}

// Initialize mock if spark is not available
if (typeof window !== 'undefined' && !window.spark) {
  window.spark = mockSpark
  globalThis.spark = mockSpark
}