import { useState, useRef, useEffect } from 'react'
import { Search, Star, Clock, X, BookmarkPl
import { Search, Star, Clock, X, BookmarkPlus, Heart } from '@phosphor-icons/react'
import { Button } from '@/components/ui/button'
  Popover,
import {
} from '@/
  PopoverContent,

} from '@/components/ui/popover'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'

interface SavedQuery {
interface Sm
  query: string
  value = "",
  className = ""
  const [searchQuery,
 

  const inputRef = useRef<HTMLI
  useEffect(() => {
  }, [value])
  const handleSe

    setRecentQueries
 

    setIsPopoverOpen(false)

    setSear
  }
  const han
      handleSear
  }
  const saveCurrentQuery = () => {

      id: Date.now().toString(),
      label: saveLabel || searchQuery,
      isFavorite: true

    setSaveLabel("")


    setSavedQueries((curr


        q.id === id ? { ...q, isFavorite: !q.isFavorite }
    )

    setRecentQueries([])

  const allSavedQueries = savedQueries.filter(q => !q.i
  return (
      

            ref={in
            placeholder={pl
  }

          {searchQuery && (
              variant="ghost
              className=
   

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
                          onClick=
                              
                
             
                          }}
                     
            
                 
                  </div>
              )}
              {allSavedQueries.length > 0 && (
                  <div className="flex items-center
                    <span className="text-
                  <div className="space-y-1
           
                        className="flex items-ce
                   
              
        
                            onChange?.(query.query)
                          }}
                          <span className="truncate text-xs">
                          </span>
                     
                           
                            onClick={() => toggleFavorite(q
                          >
                          </Button>
                            variant="ghost"
                       
                          >
                          <
                      </div>
                  </div>
              )}
              {favoriteQueries.length === 0
                  <Star c
                  <p

              )}
          </PopoverContent>

          Search
      </div>
      {/* Save Dialog */
        <div className="fixed inset-0 bg-blac
            <div className="flex items-center justify
              <Button
                size="sm"
                className="h-6 w-6 p-0"
                <X clas
            </div>
            <div className="space
                <label className="text-sm t
                  <Badge variant="sec
                  </Badge>
              </div>
              <div>
                <Input
                  placeholder="Enter a custom label..."
                  onChange={(e
                />
            </div>
            <div className="flex items-center justify-end 
                variant="outline"
                onClick={() => setS
                Cancel
              <Button size="sm" onClick={saveCurrentQuery}>
              </Button>
          </div>
      )}
  )







































































































































































































