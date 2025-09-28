import { useState, useRef, useEffect } from 'react'
import { useKV } from '@github/spark/hooks'
import { MagnifyingGlass, Star, Clock, X, BookmarkSimple, Heart } from '@phosphor-icons/react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'

interface SavedQuery {
  id: string
  query: string
  label: string
  timestamp: number
  isFavorite: boolean
}

interface SmartSearchBarProps {
  placeholder?: string
  value?: string
  onChange?: (value: string) => void
  className?: string
  storageKey?: string
}

export function SmartSearchBar({ 
  placeholder = "Search...", 
  value = "",
  onChange,
  className = "",
  storageKey = "smart-search"
}: SmartSearchBarProps) {
  const [searchQuery, setSearchQuery] = useState(value)
  const [recentQueries, setRecentQueries] = useKV<string[]>(`${storageKey}-recent`, [])
  const [savedQueries, setSavedQueries] = useKV<SavedQuery[]>(`${storageKey}-favorites`, [])
  const [isPopoverOpen, setIsPopoverOpen] = useState(false)
  const [showSaveDialog, setShowSaveDialog] = useState(false)
  const [saveLabel, setSaveLabel] = useState("")

  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    setSearchQuery(value)
  }, [value])

  const handleInputChange = (newValue: string) => {
    setSearchQuery(newValue)
    onChange?.(newValue)
  }

  const handleSearch = () => {
    if (!searchQuery.trim()) return
    
    // Add to recent queries using functional update
    setRecentQueries((current: string[]) => {
      if (!Array.isArray(current)) current = []
      const filtered = current.filter(q => q !== searchQuery)
      return [searchQuery, ...filtered].slice(0, 5)
    })
    
    setIsPopoverOpen(false)
    onChange?.(searchQuery)
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch()
    }
  }

  const saveCurrentQuery = () => {
    if (!searchQuery.trim()) return

    const newQuery: SavedQuery = {
      id: Date.now().toString(),
      query: searchQuery,
      label: saveLabel || searchQuery,
      timestamp: Date.now(),
      isFavorite: true
    }

    setSavedQueries((current: SavedQuery[]) => {
      if (!Array.isArray(current)) current = []
      return [newQuery, ...current]
    })
    setSaveLabel("")
    setShowSaveDialog(false)
    setIsPopoverOpen(false)
  }

  const removeSavedQuery = (id: string) => {
    setSavedQueries((current: SavedQuery[]) => {
      if (!Array.isArray(current)) current = []
      return current.filter(q => q.id !== id)
    })
  }

  const toggleFavorite = (id: string) => {
    setSavedQueries((current: SavedQuery[]) => {
      if (!Array.isArray(current)) current = []
      return current.map(q => 
        q.id === id ? { ...q, isFavorite: !q.isFavorite } : q
      )
    })
  }

  const markRecentAsFavorite = (query: string) => {
    const newFavorite: SavedQuery = {
      id: Date.now().toString(),
      query: query,
      label: query,
      timestamp: Date.now(),
      isFavorite: true
    }

    setSavedQueries((current: SavedQuery[]) => {
      if (!Array.isArray(current)) current = []
      return [newFavorite, ...current]
    })
    
    // Remove from recent searches
    setRecentQueries((current: string[]) => {
      if (!Array.isArray(current)) current = []
      return current.filter(q => q !== query)
    })
  }

  const clearRecentQueries = () => {
    setRecentQueries([])
  }

  const favoriteQueries = Array.isArray(savedQueries) ? savedQueries.filter(q => q.isFavorite) : []
  const allSavedQueries = Array.isArray(savedQueries) ? savedQueries.filter(q => !q.isFavorite) : []

  return (
    <div className={`relative ${className}`}>
      <div className="flex items-center space-x-2">
        <div className="relative flex-1">
          <MagnifyingGlass className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            ref={inputRef}
            type="text"
            placeholder={placeholder}
            value={searchQuery}
            onChange={(e) => handleInputChange(e.target.value)}
            onKeyPress={handleKeyPress}
            className="pl-10 pr-20"
          />
          {searchQuery && (
            <Button
              variant="ghost"
              size="sm"
              className="absolute right-12 top-1/2 transform -translate-y-1/2 h-6 w-6 p-0"
              onClick={() => {
                setSearchQuery("")
                onChange?.("")
              }}
            >
              <X className="h-3 w-3" />
            </Button>
          )}
        </div>
        
        <Popover open={isPopoverOpen} onOpenChange={setIsPopoverOpen}>
          <PopoverTrigger asChild>
            <Button 
              variant="outline" 
              size="sm"
              className="h-10 px-3"
            >
              <Star className="h-4 w-4" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-80" align="end">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="font-medium">Smart Search</h4>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowSaveDialog(true)}
                  className="text-xs"
                  disabled={!searchQuery.trim()}
                >
                  <BookmarkSimple className="h-3 w-3 mr-1" />
                  Save Query
                </Button>
              </div>
              
              {favoriteQueries.length > 0 && (
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-muted-foreground">Favorites</span>
                  </div>
                  <div className="space-y-1">
                    {favoriteQueries.map((query) => (
                      <div key={query.id} className="flex items-center justify-between p-2 hover:bg-muted rounded-md">
                        <button
                          className="flex-1 text-left truncate text-sm"
                          onClick={() => {
                            handleInputChange(query.query)
                            onChange?.(query.query)
                          }}
                        >
                          <span className="truncate text-xs">
                            {query.label}
                          </span>
                        </button>
                        <div className="flex items-center space-x-1">
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-6 w-6 p-0"
                            onClick={() => toggleFavorite(query.id)}
                          >
                            <Heart className="h-3 w-3 fill-red-500 text-red-500" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-6 w-6 p-0"
                            onClick={() => removeSavedQuery(query.id)}
                          >
                            <X className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {Array.isArray(recentQueries) && recentQueries.length > 0 && (
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-muted-foreground">Recent</span>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={clearRecentQueries}
                      className="text-xs"
                    >
                      Clear
                    </Button>
                  </div>
                  <div className="space-y-1">
                    {recentQueries.map((query, index) => (
                      <div key={index} className="flex items-center justify-between p-2 hover:bg-muted rounded-md">
                        <button
                          className="flex-1 text-left flex items-center space-x-2"
                          onClick={() => {
                            handleInputChange(query)
                            onChange?.(query)
                          }}
                        >
                          <Clock className="h-3 w-3 text-muted-foreground" />
                          <span className="truncate text-sm">{query}</span>
                        </button>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-6 w-6 p-0"
                          onClick={() => markRecentAsFavorite(query)}
                          title="Mark as favorite"
                        >
                          <Star className="h-3 w-3" />
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {favoriteQueries.length === 0 && (!Array.isArray(recentQueries) || recentQueries.length === 0) && (
                <div className="text-center py-6 text-muted-foreground">
                  <Star className="h-8 w-8 mx-auto mb-2 opacity-50" />
                  <p className="text-sm">No saved or recent searches</p>
                </div>
              )}
            </div>
          </PopoverContent>
        </Popover>
        
        <Button onClick={handleSearch} size="sm" className="h-10">
          Search
        </Button>
      </div>
      
      {/* Save Dialog */}
      {showSaveDialog && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-card p-6 rounded-lg shadow-lg w-96 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-medium">Save Search Query</h3>
              <Button
                variant="ghost"
                size="sm"
                className="h-6 w-6 p-0"
                onClick={() => setShowSaveDialog(false)}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
            <div className="space-y-3">
              <div>
                <label className="text-sm text-muted-foreground">Query:</label>
                <div className="mt-1">
                  <Badge variant="secondary" className="font-mono text-xs">
                    {searchQuery}
                  </Badge>
                </div>
              </div>
              <div>
                <label className="text-sm text-muted-foreground">Label (optional):</label>
                <Input
                  value={saveLabel}
                  placeholder="Enter a custom label..."
                  onChange={(e) => setSaveLabel(e.target.value)}
                  className="mt-1"
                />
              </div>
            </div>
            <div className="flex items-center justify-end space-x-2">
              <Button 
                variant="outline"
                size="sm"
                onClick={() => setShowSaveDialog(false)}
              >
                Cancel
              </Button>
              <Button size="sm" onClick={saveCurrentQuery}>
                Save Favorite
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}