// Module declarations for @github/spark
declare module '@github/spark/hooks' {
  export function useKV<T>(key: string, defaultValue: T): [T, (value: T | ((current: T) => T)) => void, () => void];
}

declare global {
  interface Window {
    spark: {
      llmPrompt: (strings: string[], ...values: any[]) => string;
      llm: (prompt: string, modelName?: string, jsonMode?: boolean) => Promise<string>;
      user: () => Promise<{
        avatarUrl: string;
        email: string;
        id: string;
        isOwner: boolean;
        login: string;
      }>;
      kv: {
        keys: () => Promise<string[]>;
        get: <T>(key: string) => Promise<T | undefined>;
        set: <T>(key: string, value: T) => Promise<void>;
        delete: (key: string) => Promise<void>;
      };
    };
  }
}