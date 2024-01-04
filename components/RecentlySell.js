"use client"


import {
    Table,
    TableBody,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import {Input} from "@/components/ui/input"
import {Search} from "lucide-react";
import React, {useEffect, useState} from "react";
import Loading from "@/components/Loading";
import TableData from "@/components/TableData";
import Link from "next/link";
import { BACKEND_URL } from "@/Backend_Configure";




export function RecentlySell({dashboard}) {



    const [loading, setLoading] = useState(false)
    const [data, setData] = useState([])

    const [searchValue, SetSearchValue] = useState('')


    useEffect(() => {
        setLoading(true)
        const fetchData = async () => {
            setLoading(true)
            const res = await fetch(`${BACKEND_URL}/customer`)
            if (res.ok && res.status === 200) {
                const data = await res.json()
                setData(data.cps)
                setLoading(false);
            }
                
                


        }
        fetchData()
 
    }, [])


    if (loading) return <Loading />
    
    






    return (
        <div>
            <div className="flex flex-row justify-start space-x-2">
                <div className={`${dashboard && 'hidden'} my-5 flex flex-row justify-between items-center relative`}>
                    <Input placeholder="Search by phone number" value={searchValue} onChange={(ev) => SetSearchValue(ev.target.value)} />
                    <Search className="absolute right-2 text-gray-600" />
                </div>
                <div className={`${dashboard && 'hidden'} my-5 flex flex-row justify-between items-center relative`}>
                    <Input placeholder="Search by ID" value={searchValue} onChange={(ev) => SetSearchValue(ev.target.value)} />
                    <Search className="absolute right-2 text-gray-600" />
                </div>
            </div>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead className="w-[100px]">No</TableHead>
                        <TableHead>Name</TableHead>
                        <TableHead>Card Number</TableHead>
                        <TableHead>Address</TableHead>
                        <TableHead>Phone Number</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {dashboard && data?.filter((singleCustomer, index) => index < 10).map((service, index) => <TableData key={index} index={index} {...service} />)}
                    {/* {!dashboard && data?.map((service, index) => <TableData key={index} index={index} {...service} />)} */}
                </TableBody>
            </Table>

            <div className="cursor-pointer text-center py-5 hover:underline">
                {dashboard && (<Link href="/dashboard/customer">Click here to more sell history</Link>)}
            </div>


        </div>
    )
}
