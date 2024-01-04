"use client"
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table";
import React, {useEffect, useState} from "react";
import { BACKEND_URL } from "@/Backend_Configure";
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



export default function Temporary_Customer() {
    const [customers, setCustomer] = useState([])

    const [loading, setLoading] = useState(false)
    const [searchValue, SetSearchValue] = useState('')

    useEffect(() => {
        setLoading(true)
        const fetchData = async () => {

            const res = await fetch(`${BACKEND_URL}/temporary_profile/`);
            if (res.ok) {
                const data = await res.json();
                setCustomer(data.cps)
                setLoading(false)
                
            }
        }
        fetchData()
        // customers.reverse()
    }, [])


    const searchHandler = (ev) => {
        SetSearchValue(ev.target.value)
        const xf = customers?.filter(getCustomer => (getCustomer?.number === ev.target.value));
        
        if (xf.length > 0) {
            
            setCustomer(xf)
        } 
        
        if (ev.target.value === '') {
            const fetchData = async () => {
                setLoading(true)
                

                const res = await fetch(`${BACKEND_URL}/temporary_profile/`)

                if (res.ok && res.status === 200) {
                    const data = await res.json();
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


            <div className={`my-5 flex flex-row justify-between items-center relative`}>
                <Input placeholder="Search by phone number" value={searchValue} onChange={(ev) => searchHandler(ev)} />
                <Search className="absolute right-2 text-gray-600" />
            </div>

            <h1 className="text-2xl pb-3">Temporary Customer List</h1>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead className="w-[100px]">No</TableHead>

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
                                        <DialogTitle>Temporary Customer</DialogTitle>
                                        <DialogDescription>
                                            See the full customer details
                                        </DialogDescription>
                                        </DialogHeader>
                                            <div className="grid gap-4 py-4">
                                                <div className="items-center">
                                                    <h3 className="font-semibold">Name : {customer.name}</h3>
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
