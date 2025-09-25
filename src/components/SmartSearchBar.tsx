import { useState, useRef, useEffect } from 'react'
import { useKV } from '@github/spark/hooks'
import { Search, Star, Clock, X, BookmarkPlus, Heart } from '@phosphor-icons/react'
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
  label?: string
  timestamp: number
  isFavorite: boolean
}

interface SmartSearchBarProps {
  placeholder?: string
  onSearch: (query: string) => void
  value?: string
  onChange?: (value: string) => void
  className?: string
}

export function SmartSearchBar({
  placeholder = "Search collections...",
  onSearch,
  value = "",
  onChange,
  className = ""
}: SmartSearchBarProps) {
  const [searchQuery, setSearchQuery] = useState(value)
  const [isPopoverOpen, setIsPopoverOpen] = useState(false)
  const [savedQueries, setSavedQueries] = useKV<SavedQuery[]>('smart-search-queries', [])
  const [recentQueries, setRecentQueries] = useKV<string[]>('smart-search-recent', [])
  const [showSaveDialog, setShowSaveDialog] = useState(false)
  const [saveLabel, setSaveLabel] = useState("")
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    setSearchQuery(value)
  }, [value])

  const handleSearch = (query: string = searchQuery) => {
    if (!query.trim()) return

    // Add to recent queries
    setRecentQueries((current: string[]) => {
      const filtered = current.filter(q => q !== query)
      return [query, ...filtered].slice(0, 10) // Keep only last 10
    })

    onSearch(query)
    setIsPopoverOpen(false)
  }

  const handleInputChange = (newValue: string) => {
    setSearchQuery(newValue)
    onChange?.(newValue)
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

    setSavedQueries((current: SavedQuery[]) => [newQuery, ...current])
    setSaveLabel("")
    setShowSaveDialog(false)
    setIsPopoverOpen(false)
  }

  const removeSavedQuery = (id: string) => {
    setSavedQueries((current: SavedQuery[]) => current.filter(q => q.id !== id))
  }

  const toggleFavorite = (id: string) => {
    setSavedQueries((current: SavedQuery[]) => 
      current.map(q => 
        q.id === id ? { ...q, isFavorite: !q.isFavorite } : q
      )
    )
  }

  const clearRecentQueries = () => {
    setRecentQueries([])
  }

  const favoriteQueries = savedQueries.filter(q => q.isFavorite)
  const allSavedQueries = savedQueries.filter(q => !q.isFavorite)

  return (
    <div className={`relative ${className}`}>
      <div className="flex items-center space-x-2">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
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
          <Button
            variant="ghost"
            size="sm"
            className="absolute right-2 top-1/2 transform -translate-y-1/2 h-6 w-6 p-0"
            onClick={() => setShowSaveDialog(true)}
            disabled={!searchQuery.trim()}
            title="Save search as favorite"
          >
            <BookmarkPlus className="h-3 w-3" />
          </Button>
        </div>
        
        <Popover open={isPopoverOpen} onOpenChange={setIsPopoverOpen}>
          <PopoverTrigger asChild>
            <Button variant="outline" size="sm" className="px-3">
              <Star className="h-4 w-4" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-80 p-0" align="end">
            <div className="p-4">
              <div className="flex items-center justify-between mb-3">
                <h4 className="font-medium text-sm">Search History</h4>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsPopoverOpen(false)}
                  className="h-6 w-6 p-0"
                >
                  <X className="h-3 w-3" />
                </Button>
              </div>

              {favoriteQueries.length > 0 && (
                <div className="mb-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Heart className="h-3 w-3 text-red-500" />
                    <span className="text-xs font-medium text-muted-foreground">Favorites</span>
                  </div>
                  <div className="space-y-1">
                    {favoriteQueries.map((query) => (
                      <div
                        key={query.id}
                        className="flex items-center justify-between group hover:bg-muted/50 rounded px-2 py-1"
                      >
                        <div className="flex-1 min-w-0">
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-auto p-0 text-left justify-start font-normal w-full"
                            onClick={() => {
                              setSearchQuery(query.query)
                              onChange?.(query.query)
                              handleSearch(query.query)
                            }}
                          >
                            <span className="truncate text-xs">
                              {query.label || query.query}
                            </span>
                          </Button>
                        </div>
                        <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => toggleFavorite(query.id)}
                            className="h-5 w-5 p-0"
                          >
                            <Heart className="h-3 w-3 text-red-500 fill-red-500" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => removeSavedQuery(query.id)}
                            className="h-5 w-5 p-0"
                          >
                            <X className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {recentQueries.length > 0 && (
                <div className="mb-4">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <Clock className="h-3 w-3 text-muted-foreground" />
                      <span className="text-xs font-medium text-muted-foreground">Recent</span>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={clearRecentQueries}
                      className="h-5 text-xs text-muted-foreground hover:text-foreground"
                    >
                      Clear
                    </Button>
                  </div>
                  <div className="space-y-1">
                    {recentQueries.slice(0, 5).map((query, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between group hover:bg-muted/50 rounded px-2 py-1"
                      >
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-auto p-0 text-left justify-start font-normal flex-1 min-w-0"
                          onClick={() => {
                            setSearchQuery(query)
                            onChange?.(query)
                            handleSearch(query)
                          }}
                        >
                          <span className="truncate text-xs">{query}</span>
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => {
                            const newQuery: SavedQuery = {
                              id: Date.now().toString(),
                              query,
                              timestamp: Date.now(),
                              isFavorite: true
                            }
                            setSavedQueries((current: SavedQuery[]) => [newQuery, ...current])
                          }}
                          className="h-5 w-5 p-0 opacity-0 group-hover:opacity-100 transition-opacity"
                          title="Add to favorites"
                        >
                          <Heart className="h-3 w-3" />
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {allSavedQueries.length > 0 && (
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <BookmarkPlus className="h-3 w-3 text-muted-foreground" />
                    <span className="text-xs font-medium text-muted-foreground">Saved</span>
                  </div>
                  <div className="space-y-1">
                    {allSavedQueries.slice(0, 5).map((query) => (
                      <div
                        key={query.id}
                        className="flex items-center justify-between group hover:bg-muted/50 rounded px-2 py-1"
                      >
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-auto p-0 text-left justify-start font-normal flex-1 min-w-0"
                          onClick={() => {
                            setSearchQuery(query.query)
                            onChange?.(query.query)
                            handleSearch(query.query)
                          }}
                        >
                          <span className="truncate text-xs">
                            {query.label || query.query}
                          </span>
                        </Button>
                        <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => toggleFavorite(query.id)}
                            className="h-5 w-5 p-0"
                          >
                            <Heart className="h-3 w-3" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => removeSavedQuery(query.id)}
                            className="h-5 w-5 p-0"
                          >
                            <X className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {favoriteQueries.length === 0 && recentQueries.length === 0 && allSavedQueries.length === 0 && (
                <div className="text-center py-6 text-muted-foreground">
                  <Star className="h-8 w-8 mx-auto mb-2 opacity-50" />
                  <p className="text-xs">No saved searches yet</p>
                  <p className="text-xs text-muted-foreground/70">
                    Start searching and save your favorites
                  </p>
                </div>
              )}
            </div>
          </PopoverContent>
        </Popover>

        <Button onClick={() => handleSearch()} size="sm">
          Search
        </Button>
      </div>

      {/* Save Dialog */}
      {showSaveDialog && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-card p-6 rounded-lg shadow-lg w-full max-w-md mx-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-medium">Save Search Query</h3>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowSaveDialog(false)}
                className="h-6 w-6 p-0"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
            
            <div className="space-y-3">
              <div>
                <label className="text-sm text-muted-foreground">Query</label>
                <div className="mt-1">
                  <Badge variant="secondary" className="text-xs">
                    {searchQuery}
                  </Badge>
                </div>
              </div>
              
              <div>
                <label className="text-sm text-muted-foreground">Label (optional)</label>
                <Input
                  type="text"
                  placeholder="Enter a custom label..."
                  value={saveLabel}
                  onChange={(e) => setSaveLabel(e.target.value)}
                  className="mt-1"
                />
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 mt-6">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowSaveDialog(false)}
              >
                Cancel
              </Button>
              <Button size="sm" onClick={saveCurrentQuery}>
                Save as Favorite
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}