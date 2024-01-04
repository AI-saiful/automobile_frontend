"use client"


import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table";
import {Button} from "@/components/ui/button";
import React, {useEffect, useState} from "react";
import Loading from "@/components/Loading";
import { Search, Eye } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"
import Link from "next/link";
import { BACKEND_URL } from "@/Backend_Configure";


export default function CustomerDetails() {
    const [customers, setCustomer] = useState([])

    const [loading, setLoading] = useState(false)
    const [searchValue, SetSearchValue] = useState('')



    useEffect(() => {
        setLoading(true)
        const fetchData = async () => {

            const res = await fetch(`${BACKEND_URL}/customer`);

            if (res.ok && res.status === 200) {
                const data = await res.json()


                setCustomer(data.cps)
                setLoading(false)
            }



        }
        fetchData()
        // customers.reverse()
    }, [])

    
    const searchHandler = (ev) => {
        SetSearchValue(ev.target.value)
        const xf = customers?.filter(getCustomer => (getCustomer?.number === ev.target.value) || (getCustomer?.card_number === ev.target.value));
        
        if (xf.length > 0) {
            
            setCustomer(xf)
        } 
        
        if (ev.target.value === '') {
            const fetchData = async () => {
                setLoading(true)

                const res = await fetch(`${BACKEND_URL}/customer`)

                if (res.ok && res.status === 200) {
                    const data = await res.json()
                    setCustomer(data.cps)
                    setLoading(false)
                }

    
            }
            fetchData()
   
        }

        
    }

    if (loading) return <Loading />


    return (
        <div className="py-3 px-5">
            <Link href='/dashboard/customer/temporary-customer'>
                <Button className="my-5">Temporary Coustomer List</Button>
            </Link>


            <div className={`my-5 flex flex-row justify-between items-center relative`}>
                <Input placeholder="Search by phone number or Card number" value={searchValue} onChange={(ev) => searchHandler(ev)} />
                <Search className="absolute right-2 text-gray-600" />
            </div>

            <h1 className="text-2xl pb-3">Customer List</h1>

            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead className="w-[100px]">No</TableHead>
                        <TableHead>Card Number</TableHead>

                        <TableHead>Name</TableHead>
                        <TableHead>Address</TableHead>
                        <TableHead>Phone</TableHead>
                        <TableHead>date</TableHead>
                        
                        <TableHead>Action</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {customers?.map((customer, index) => (
                        <TableRow key={index}>
                            <TableCell className="font-medium">{index+1}</TableCell>
                            <TableCell>{customer.card_number}</TableCell>

                            <TableCell>{customer.name}</TableCell>
                            
                            <TableCell>{customer.addrss}</TableCell>
                            <TableCell>{customer.number}</TableCell>
                            <TableCell>{customer.date.split('T')[0]}</TableCell>
                            <TableCell>
                                <Dialog>
                                    <DialogTrigger asChild>
                                        <Eye className="text-gray-600 hover:text-gray-900 cursor-pointer" />
                                    </DialogTrigger>
                                    <DialogContent className="sm:max-w-[425px]">
                                        <DialogHeader>
                                        <DialogTitle>Customer</DialogTitle>
                                        <DialogDescription>
                                            See the full customer details
                                        </DialogDescription>
                                        </DialogHeader>
                                            <div className="grid gap-4 py-4">
                                                <div className="items-center">
                                                    <h3 className="font-semibold">Name : {customer.name}</h3>
                                                    <p>Card Number: {customer.card_number}</p>
                                                    <p>Phone Number: {customer.number}</p>
                                                    <p>Address: {customer.addrss} </p>
                                                    <p>Vichel No: {customer.vichal_no}</p>
                                                    <p>Vichel Model: {customer.vichal_model}</p>
                                                    <p>Date: {customer.date.split('T')[0]}</p>
                                                    {/* <p>Services: 10</p>
                                                    <p>Total pay: 54500</p>
                                                    <p>Total due: 1000</p> */}
                                                </div>
                                            </div>
                                        <DialogFooter>
                                        </DialogFooter>
                                    </DialogContent>
                                </Dialog>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    )
}
