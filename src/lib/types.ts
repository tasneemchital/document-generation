export interface CMSContent {
  id: string;
  title: string;
  content: string;
  type: 'article' | 'page' | 'post' | 'template';
  author: string;
  lastModified: Date;
  tags: string[];
  metadata: {
    wordCount: number;
    readingTime: number;
    category: string;
  };
}

export interface ContentSnippet {
  id: string;
  title: string;
  content: string;
  sourceId?: string;
  tags: string[];
  category: string;
  createdAt: Date;
  lastUsed?: Date;
  usageCount: number;
}

export interface Document {
  id: string;
  title: string;
  snippets: DocumentSnippet[];
  createdAt: Date;
  lastModified: Date;
  status: 'draft' | 'final';
}

export interface DocumentSnippet {
  snippetId: string;
  position: number;
  customContent?: string;
}

export interface SnippetFilter {
  category?: string;
  tags?: string[];
  searchQuery?: string;
  sortBy?: 'title' | 'createdAt' | 'usageCount';
  sortOrder?: 'asc' | 'desc';
}