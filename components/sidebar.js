"use client";
import { Montserrat } from 'next/font/google';
import Link from 'next/link';
import { cn } from '@/lib/utils'; 
import {usePathname} from "next/navigation"
// import Image from 'next/image';
import React, { use } from 'react'
import {
    LayoutDashboard,
    BarChartBig,
    BarChart4,
    ArrowDownWideNarrow,
    Users,
    CreditCard

} from 'lucide-react';

const routes = [
    {
        label: "Dashboard",
        icon: LayoutDashboard,
        href: "/dashboard",
        color: "text-gray-900"
    },

    {
        label: "Sell",
        icon: BarChartBig,
        href: "/dashboard/sell",
        color: "text-gray-900"
    },
    {
        label: "Buy",
        icon: ArrowDownWideNarrow,
        href: "/dashboard/buy",
        color: "text-gray-900"
    },
    {
        label: "Customer Details",
        icon: Users,
        href: "/dashboard/customer",
        color: "text-gray-900"
    },
    {
        label: "Card Validity",
        icon: CreditCard,
        href: "/dashboard/card-validity",
        color: "text-gray-900"
    },
]

const remonstrate = Montserrat({
    subsets: ["latin"]
})

function Sidebar() {
    const pathname = usePathname();

    
  return (
    <div className='space-y-4 py-4 flex flex-col h-full text-white bg-gray-400'>
        <div className="px-3 py-2 flex-1">
            <Link href='/dashboard' className='flex items-center pl-3 mb-14'>
                <h1 className={cn("text-2xl font-bold", remonstrate.className)}>{"Automobile"}</h1>
            </Link>

            <div className="space-y-1">
                {routes.map(route => (
                    <Link 
                        href={route.href}
                        key={route.href}
                        className={cn('text-sm group flex p-3 w-full justify-start font-medium cursor-pointer hover:text-white hover:bg-gray-900/20 rounded-lg transition', pathname === route.href ? "text-white bg-gray-900/20" : "text-gray-900")
                    }
                    >
                        <div className="flex items-center flex-1">
                            <route.icon className={cn("w-5 h-5 mr-5", pathname === route.href ? "text-white" : route.color)} />
                            {route.label}
                        </div>
                    
                    </Link>
                ))}
            </div>
        </div>
    </div>
  )
}

export default Sidebar
