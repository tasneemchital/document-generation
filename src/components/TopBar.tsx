import { Search, Bell, User, HelpCircle } from '@phosphor-icons/react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

interface TopBarProps {
  onToggleSidebar: () => void
}

export function TopBar({ onToggleSidebar }: TopBarProps) {
  return (
    <div className="h-12 bg-[#2c5f7d] text-white flex items-center justify-between px-4 shadow-sm">
      {/* Left section - Menu button and logo */}
      <div className="flex items-center space-x-4">
        <button
          onClick={onToggleSidebar}
          className="p-1 hover:bg-white/10 rounded transition-colors"
        >
          <div className="w-5 h-5 flex flex-col justify-center space-y-1">
            <div className="w-full h-0.5 bg-white"></div>
            <div className="w-full h-0.5 bg-white"></div>
            <div className="w-full h-0.5 bg-white"></div>
          </div>
        </button>
        
        <div className="flex items-center space-x-2">
          <span className="text-lg font-semibold">SimplifyDocs</span>
          <span className="text-sm font-medium bg-white/20 px-2 py-0.5 rounded text-xs">.AI</span>
        </div>
        
        <nav className="hidden md:flex items-center space-x-6 ml-8">
          <button className="text-sm hover:text-white/80 transition-colors">Home</button>
        </nav>
      </div>
      
      {/* Right section - Search, Help, Notifications, Profile */}
      <div className="flex items-center space-x-3">
        {/* Search */}
        <div className="relative hidden md:block">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-white/60" />
          <Input 
            placeholder="Search..." 
            className="pl-10 w-64 h-8 bg-white/10 border-white/20 text-white placeholder:text-white/60 focus:bg-white/20"
          />
        </div>
        
        {/* Get Help Button */}
        <Button 
          size="sm" 
          className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 h-8 text-xs font-medium"
        >
          Get Help?
        </Button>
        
        {/* Search Icon (mobile) */}
        <button className="md:hidden p-2 hover:bg-white/10 rounded transition-colors">
          <Search className="w-5 h-5" />
        </button>
        
        {/* Notifications */}
        <button className="p-2 hover:bg-white/10 rounded transition-colors relative">
          <Bell className="w-5 h-5" />
          <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full text-xs flex items-center justify-center text-white font-bold">
            1
          </span>
        </button>
        
        {/* Profile */}
        <button className="p-2 hover:bg-white/10 rounded transition-colors">
          <User className="w-5 h-5" />
        </button>
      </div>
    </div>
  )
}