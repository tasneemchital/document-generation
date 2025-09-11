import { useState } from 'react'
import { Select, SelectContent, SelectItem,
import { Card } from '@/components/ui/card'
import { Textarea } from '@/components/ui/texta
import { Card } from '@/components/ui/card'
import { PencilSimple, Export, DotsThree } from '@phosphor-icons/react'
import { Textarea } from '@/components/ui/textarea'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

  'Medicare EOC Cover Pag
  onNavigate: (page: string) => void
 

  'Chapter 6',
  'Medicare EOC Cover Page',
const instance
export function
  const [selec
  const [secti
  const curren
  const handle
      ...prev,
    }))

    // Save fun
  }
  return (
      {/* Heade
        <div className="f
 

          <div className="flex items-center gap-2">

            <Button variant="ghost" size="sm">
            </Button>
              <DotsThree size={16} />
          </div>


            <span className="text-sm font-medium text-foregrou

          <div className="flex items-center gap-4">
            <div className="flex
              
                  <SelectValue /
       
   

            {/* Instances Dr
              <Label className="text-sm font-medium
                <SelectTrigger className="w-[200px] h-8">
   

          
                  ))}
              </Sele

            <div className="flex items-center gap-2">
              <Select value={selectedSection} onVal
                  <SelectValue />
                <SelectContent>
                 
                
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm">
              <PencilSimple size={16} />
            </Button>
            <Button variant="ghost" size="sm">
              <Export size={16} />
            </Button>
            <Button variant="ghost" size="sm">
              <DotsThree size={16} />
            </Button>
          </div>
        </div>

        {/* Navigation Controls */}
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium text-foreground">Medicare EOC</span>
            <div className="h-0.5 bg-primary w-16 rounded-full" />
          </div>

          <div className="flex items-center gap-4">
            {/* View Dropdown */}
            <div className="flex items-center gap-2">
              <Label className="text-sm font-medium">View</Label>
              <Select value={selectedView}>
                <SelectTrigger className="w-[200px] h-8">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Medicare EOC">Medicare EOC</SelectItem>

























































































