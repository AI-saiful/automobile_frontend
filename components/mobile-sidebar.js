"use client"

import React, { useEffect, useState } from 'react'
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import Sidebar from '@/components/sidebar';

const MobileSidebar = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true)
  }, [])


  if (!isMounted) {
    return null
  }

  return (
    <Sheet defaultOpen={false}>
        <SheetTrigger>
            <Button  variant='ghost' size='icon' className='md:hidden'  >
                <Menu />
            </Button>
        </SheetTrigger>

        <SheetContent side='left' className='p-0'>
          <Sidebar />
        </SheetContent>
    </Sheet>
  )
}

export default MobileSidebar


