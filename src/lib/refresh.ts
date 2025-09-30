// Refresh utility to clear all caches and force reload
export const clearAllData = async () => {
  try {
    // Check if spark is available before using it
    if (typeof window !== 'undefined' && window.spark?.kv) {
      // Clear all KV data
      const keys = await window.spark.kv.keys()
      for (const key of keys) {
        await window.spark.kv.delete(key)
      }
    }
    
    // Force page refresh
    window.location.reload()
  } catch (error) {
    console.error('Error clearing data:', error)
    // Force reload anyway
    window.location.reload()
  }
}

export const refreshApp = () => {
  // Clear any cached data and force re-render
  window.location.reload()
}