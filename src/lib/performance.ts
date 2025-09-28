// Performance optimization utilities
import React, { useMemo, useCallback } from 'react'

// Debounce hook for search inputs
export function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = React.useState<T>(value)

  React.useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value)
    }, delay)

    return () => {
      clearTimeout(handler)
    }
  }, [value, delay])

  return debouncedValue
}

// Memoized filter function for large data sets
export function useMemoizedFilter<T>(
  data: T[],
  filters: Record<string, any>,
  searchTerm: string = ''
) {
  return useMemo(() => {
    return data.filter(item => {
      // Apply search term if provided
      if (searchTerm) {
        const searchableText = Object.values(item as any).join(' ').toLowerCase()
        if (!searchableText.includes(searchTerm.toLowerCase())) {
          return false
        }
      }

      // Apply other filters
      return Object.entries(filters).every(([key, value]) => {
        if (!value || value === 'all') return true
        const itemValue = (item as any)[key]
        return itemValue && itemValue.toString().toLowerCase().includes(value.toLowerCase())
      })
    })
  }, [data, filters, searchTerm])
}

// Pagination utilities
export function usePagination<T>(data: T[], pageSize: number, currentPage: number) {
  return useMemo(() => {
    const totalPages = Math.ceil(data.length / pageSize)
    const startIndex = (currentPage - 1) * pageSize
    const endIndex = startIndex + pageSize
    const currentPageData = data.slice(startIndex, endIndex)

    return {
      currentPageData,
      totalPages,
      startIndex,
      endIndex,
      hasNextPage: currentPage < totalPages,
      hasPreviousPage: currentPage > 1
    }
  }, [data, pageSize, currentPage])
}

// Memoized sort function
export function useMemoizedSort<T>(
  data: T[],
  sortField: keyof T | null,
  sortDirection: 'asc' | 'desc'
) {
  return useMemo(() => {
    if (!sortField) return data

    return [...data].sort((a, b) => {
      const aValue = a[sortField] || ''
      const bValue = b[sortField] || ''
      
      const comparison = aValue.toString().localeCompare(bValue.toString())
      return sortDirection === 'asc' ? comparison : -comparison
    })
  }, [data, sortField, sortDirection])
}

// Generic table handlers
export function useTableHandlers() {
  const handleSort = useCallback((
    field: string, 
    sortField: string | null, 
    sortDirection: 'asc' | 'desc',
    setSortField: (field: string | null) => void,
    setSortDirection: (direction: 'asc' | 'desc') => void
  ) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc')
    } else {
      setSortField(field)
      setSortDirection('asc')
    }
  }, [])

  const handleSelectAll = useCallback((
    checked: boolean,
    currentPageData: any[],
    selectedItems: string[],
    setSelectedItems: (items: string[]) => void
  ) => {
    if (checked) {
      const allVisibleIds = currentPageData.map(item => item.id)
      setSelectedItems([...new Set([...selectedItems, ...allVisibleIds])])
    } else {
      const visibleIds = new Set(currentPageData.map(item => item.id))
      setSelectedItems(selectedItems.filter(id => !visibleIds.has(id)))
    }
  }, [])

  const handleItemSelect = useCallback((
    itemId: string,
    checked: boolean,
    selectedItems: string[],
    setSelectedItems: (items: string[]) => void
  ) => {
    setSelectedItems(
      checked 
        ? [...selectedItems, itemId]
        : selectedItems.filter(id => id !== itemId)
    )
  }, [])

  return {
    handleSort,
    handleSelectAll,
    handleItemSelect
  }
}