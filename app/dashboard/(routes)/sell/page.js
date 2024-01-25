"use client"
import {Button} from "@/components/ui/button";
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table";
import React, {useEffect, useState} from "react";
import Link from "next/link";
import {Input} from "@/components/ui/input";
import {Search, Printer, XCircle, BadgeCheck, PrinterIcon, Eye} from "lucide-react";
import { Calendar as CalendarIcon } from "lucide-react"
import Loading from "@/components/Loading";
import { BACKEND_URL } from "@/Backend_Configure";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { format } from "date-fns"
import { cn } from "@/lib/utils"
import { Calendar } from "@/components/ui/calendar"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"




export default function Sell() {
    const [loading, setLoading] = useState(false)

    const [searchValue, SetSearchValue] = useState('')
    const [recentlySellDetails, setRecentlySellDetails] = useState([])
    const [fromDate, setFromtDate] = React.useState()
    const [toDate, setToDate] = React.useState()
    
    

    useEffect(() => {
        const sellHistory = []

        
        const fetchData = async () => {
            setLoading(true)
            const res = await fetch(`${BACKEND_URL}/sell-history/`)
            if (res.ok) {
                const data = await res.json();
        
                setLoading(false)

                data?.coustomer?.map(singleCustomer => {
                    data?.service?.map(singleService => {
                    
                        if (singleCustomer.id === singleService.cp_id) {
                            const x = data?.st?.filter(serviceType => serviceType.id === singleService.service_type_id)
                            
                            const newSellHistory = {
                                name : singleCustomer?.name,
                                number: singleCustomer?.number,
                                service: x[0].name,
                                date: singleService.date.split("T")[0],
                                total: singleService.total,
                                description: singleService?.description,
                                coustomerStatus: singleCustomer.card_number,
                                memo_number: singleService?.memo_number



                            }

                            sellHistory.push(newSellHistory)
                        }
                    })
                })

                data?.temp?.map(temp_singleCustomer => {
                    data?.service?.map(singleService => {
                        if (temp_singleCustomer.id === singleService.tcp_id) {
                            const x = data?.st?.filter(serviceType => serviceType.id === singleService.service_type_id)

                            const newSellHistory = {
                                name : temp_singleCustomer?.name,
                                number: temp_singleCustomer?.number,
                                service: x[0].name,
                                date: singleService.date.split("T")[0],
                                total: singleService.total,
                                description: singleService?.description,
                                coustomerStatus: <XCircle className="text-red-500"/>,
                                memo_number: singleService?.memo_number

                            }

                            sellHistory.push(newSellHistory)
                        }
                    })
                })

                setRecentlySellDetails(sellHistory)
                

                



            }

            
        }
        fetchData()

        

        // recentlySellDetails.reverse()
        
    }, [])

    if (loading) return <Loading sms="Wait a moments" />

    let totalTaka = 0;

    recentlySellDetails?.map(sell => {
        totalTaka += sell?.total
    })

    const newSearcDate = {
        day: fromDate?.getDay(),
        months: fromDate?.getMonth(),
        years: fromDate?.getFullYear(),
    }



    const getFromDate = async (ev) => {
        
        if (ev) {
            const res = await fetch(`${BACKEND_URL}/searchBydate/`, {
                    method: "POST",
                    // mode: "cors",
                    body: JSON.stringify({fromDate: `${ev.getFullYear()}-${ev.getMonth()+1}-${ev.getDate()}`, toDate: ""})
            })

            if (res.ok) {
                const data = await res.json()

                const sellHistory = [];
                data?.coustomer?.map(singleCustomer => {
                    data?.service?.map(singleService => {
                    
                        if (singleCustomer.id === singleService.cp_id) {
                            const x = data?.st?.filter(serviceType => serviceType.id === singleService.service_type_id)
                            
                            const newSellHistory = {
                                name : singleCustomer?.name,
                                number: singleCustomer?.number,
                                service: x[0].name,
                                date: singleService.date.split("T")[0],
                                total: singleService.total,
                                description: singleService?.description,
                                coustomerStatus: singleCustomer?.card_number,
                                memo_number: singleService?.memo_number



                            }

                            sellHistory.push(newSellHistory)
                        }
                    })
                })

                data?.temp?.map(temp_singleCustomer => {
                    data?.service?.map(singleService => {
                        if (temp_singleCustomer.id === singleService.tcp_id) {
                            const x = data?.st?.filter(serviceType => serviceType.id === singleService.service_type_id)

                            const newSellHistory = {
                                name : temp_singleCustomer?.name,
                                number: temp_singleCustomer?.number,
                                service: x[0].name,
                                date: singleService.date.split("T")[0],
                                total: singleService.total,
                                description: singleService?.description,
                                coustomerStatus: <XCircle className="text-red-500"/>,
                                memo_number: singleService?.memo_number

                            }

                            sellHistory.push(newSellHistory)
                        }
                    })
                })

                setRecentlySellDetails(sellHistory);
                

                
            }
            
        }
    }

    // console.log(recentlySellDetails);

    const getToDate = async (ev) => {
        if (fromDate && ev) {
            const res = await fetch(`${BACKEND_URL}/searchBydate/`, {
                method: "POST",
                // mode: "cors",
                body: JSON.stringify({toDate: `${ev.getFullYear()}-${ev.getMonth()+1}-${ev.getDate()}`, fromDate: `${fromDate.getFullYear()}-${fromDate.getMonth()+1}-${fromDate.getDate()}`})
            })

            if (res.ok) {
                const data = await res.json()

                const sellHistory = [];
                data?.coustomer?.map(singleCustomer => {
                    data?.service?.map(singleService => {
                    
                        if (singleCustomer.id === singleService.cp_id) {
                            const x = data?.st?.filter(serviceType => serviceType.id === singleService.service_type_id)
                            
                            const newSellHistory = {
                                name : singleCustomer?.name,
                                number: singleCustomer?.number,
                                service: x[0].name,
                                date: singleService.date.split("T")[0],
                                total: singleService.total,
                                description: singleService?.description,
                                coustomerStatus: singleCustomer?.card_number,
                                memo_number: singleService?.memo_number



                            }

                            sellHistory.push(newSellHistory)
                        }
                    })
                })

                data?.temp?.map(temp_singleCustomer => {
                    data?.service?.map(singleService => {
                        if (temp_singleCustomer.id === singleService.tcp_id) {
                            const x = data?.st?.filter(serviceType => serviceType.id === singleService.service_type_id)

                            const newSellHistory = {
                                name : temp_singleCustomer?.name,
                                number: temp_singleCustomer?.number,
                                service: x[0].name,
                                date: singleService.date.split("T")[0],
                                total: singleService.total,
                                description: singleService?.description,
                                coustomerStatus: <XCircle className="text-red-500"/>,
                                memo_number: singleService?.memo_number

                            }

                            sellHistory.push(newSellHistory)
                        }
                    })
                })

                setRecentlySellDetails(sellHistory);
                
                
            }
        }
            
    }

   
    

    const searchInputHandler = async (ev) => {
        SetSearchValue(ev.target.value)

        const sellHistory = [];

        if (ev.target.value > '') {
            const res = await fetch(`${BACKEND_URL}/search_by_number_or_card/`, {
                method: "POST",
                // mode: "cors",
                body: JSON.stringify({searchValue: ev.target.value})
            })

            if (res.ok) {
                const data = await res.json();
                data?.customer?.map(singleCustomer => {
                    data?.service?.map(singleService => {
                    
                        if (singleCustomer.id === singleService.cp_id || singleCustomer.id === singleService.tcp_id) {
                            const x = data?.st?.filter(serviceType => serviceType.id === singleService.service_type_id)
                            
                            
                            const newSellHistory = {
                                name : singleCustomer?.name,
                                number: singleCustomer?.number,
                                service: x[0].name,
                                date: singleService.date.split("T")[0],
                                total: singleService.total,
                                description: singleService?.description,
                                coustomerStatus: singleCustomer?.card_number,
                                memo_number: singleService?.memo_number



                            }

                            sellHistory.push(newSellHistory)
                        }
                    })
                })

                setRecentlySellDetails(sellHistory);
                

            }

        }

        if (ev.target.value === '') {
            const sellHistory = []

        
            const fetchData = async () => {
                setLoading(true)
                const res = await fetch(`${BACKEND_URL}/sell-history/`)
                if (res.ok) {
                    const data = await res.json();


                    
                    setLoading(false)
    
                    data?.coustomer?.map(singleCustomer => {
                        data?.service?.map(singleService => {
                        
                            if (singleCustomer.id === singleService.cp_id) {
                                const x = data?.st?.filter(serviceType => serviceType.id === singleService.service_type_id)
                                
                                const newSellHistory = {
                                    name : singleCustomer?.name,
                                    number: singleCustomer?.number,
                                    service: x[0].name,
                                    date: singleService.date.split("T")[0],
                                    total: singleService.total,
                                    description: singleService?.description,
                                    coustomerStatus: singleCustomer?.card_number,
                                    memo_number: singleService?.memo_number
    
    
    
                                }
    
                                sellHistory.push(newSellHistory)
                            }
                        })
                    })
    
                    data?.temp?.map(temp_singleCustomer => {
                        data?.service?.map(singleService => {
                            if (temp_singleCustomer.id === singleService.tcp_id) {
                                const x = data?.st?.filter(serviceType => serviceType.id === singleService.service_type_id)
    
                                const newSellHistory = {
                                    name : temp_singleCustomer?.name,
                                    number: temp_singleCustomer?.number,
                                    service: x[0].name,
                                    date: singleService.date.split("T")[0],
                                    total: singleService.total,
                                    description: singleService?.description,
                                    coustomerStatus: <XCircle className="text-red-500"/>,
                                    memo_number: singleService?.memo_number
    
                                }
    
                                sellHistory.push(newSellHistory)
                            }
                        })
                    })
    
                    setRecentlySellDetails(sellHistory)

    
                }
    
                
            }
            fetchData()

        }
    }






    return (
        <div className="px-5">
            <Link href="/dashboard/sell/new-memo">
                <Button>Entry new Memo</Button>
            </Link>

            <div className="py-5">
                <h3 className="text-2xl">Cash Memo Details</h3>

                <div className="my-5 flex flex-row justify-start space-x-2">
                    <div className={`flex flex-row justify-start items-center relative`}>
                        <Input placeholder="Search by phone number" value={searchValue} onChange={(ev) => searchInputHandler(ev)} />
                        <Search className="absolute right-2 text-gray-600" />

                    </div>
                    <div className="flex flex-row gap-2 w-1/2">
                        <Popover >
                            <PopoverTrigger asChild >
                                <Button
                                    variant={"outline"}
                                    className={cn(
                                        "w-full justify-start text-left font-normal",
                                        !fromDate && "text-muted-foreground"
                                    )}
                                >
                                    <CalendarIcon className="mr-2 h-4 w-4" />
                                    {fromDate ? format(fromDate, "PPP") : <span>From Date</span>}
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0">
                                <Calendar
                                    mode="single"
                                    selected={fromDate}
                                    onSelect={setFromtDate}
                                    onDayClick={(ev) => getFromDate(ev)}
                                    initialFocus
                                />
                            </PopoverContent>
                        </Popover>



                        <Popover>
                            <PopoverTrigger asChild>
                                <Button
                                    variant={"outline"}
                                    className={cn(
                                        "w-full justify-start text-left font-normal",
                                        !toDate && "text-muted-foreground"
                                    )}
                                >
                                    <CalendarIcon className="mr-2 h-4 w-4" />
                                    {toDate ? format(toDate, "PPP") : <span>To Date</span>}
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0">
                                <Calendar
                                    mode="single"
                                    selected={toDate}
                                    onSelect={setToDate}
                                    onDayClick={(ev) => getToDate(ev)}
                                    initialFocus
                                />
                            </PopoverContent>
                        </Popover>
                    </div>

 
                </div>

                <div className="py-3">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="w-[100px]">NO</TableHead>
                                <TableHead>Name</TableHead>
                                <TableHead>Phone Number</TableHead>
                                <TableHead>Service Name</TableHead>
                                <TableHead>Card Status</TableHead>
                                <TableHead>Date</TableHead>
                                <TableHead>Total</TableHead>
                                <TableHead>Action</TableHead>
                                {/* <TableHead>Print file</TableHead> */}
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {recentlySellDetails?.map((report, index) => (
                                <TableRow key={index}>
                                    <TableCell className="font-medium">{index+1}</TableCell>
                                    <TableCell>{report?.name}</TableCell>
                                    <TableCell>{report?.number}</TableCell>
                                    <TableCell>{report?.service}</TableCell>
                                    <TableCell>{report?.coustomerStatus}</TableCell>
                                    <TableCell>{report?.date.split('T')[0]}</TableCell>
                                    <TableCell>{report?.total}</TableCell>
                                    <TableCell>
                                        <Dialog>
                                            <DialogTrigger asChild>
                                                <Eye className="text-gray-600 hover:text-gray-900 cursor-pointer" />
                                            </DialogTrigger>
                                            <DialogContent className="sm:max-w-[425px]">
                                                <DialogHeader>
                                                <DialogTitle>Sell history</DialogTitle>
                                                <DialogDescription>
                                                    See the full customer details
                                                </DialogDescription>
                                                </DialogHeader>
                                                    <div className="grid gap-4 py-4">
                                                        <div className="items-center">
                                                            <h3 className="font-semibold">Name : {report?.name}</h3>
                                                            {/* <p>Card Number: {report?.coustomerStatus}</p> */}
                                                            <p>Phone Number: {report?.number}</p>
                                                            <p>Memo Number: {report?.memo_number}</p>
                                                            <p>Card Number: {report?.coustomerStatus} </p>
                                                            <p>Total: {report?.total} </p>
                                                            {/* <p>Vichel No: {customer.vichal_no}</p>
                                                            <p>Vichel Model: {customer.vichal_model}</p> */}
                                                            <p>Date: {report?.date.split('T')[0]}</p>
                                                            <p>Description: {report?.description}</p>
                         
                                                        </div>
                                                    </div>
                                                <DialogFooter>
                                                </DialogFooter>
                                            </DialogContent>
                                        </Dialog>
                                    </TableCell>
                                </TableRow>
                            ))}

                            <TableRow>
                                <TableCell></TableCell>
                                <TableCell></TableCell>
                                <TableCell></TableCell>
                                <TableCell></TableCell>
                                <TableCell></TableCell>
                                {/* <TableCell></TableCell> */}

                                <TableCell className="text-xl font-medium">Total-Taka: <span className="text-xl font-bold">{totalTaka}</span> /-</TableCell>
                                <TableCell></TableCell>
                            </TableRow>

                        </TableBody>
                    </Table>
                </div>
            </div>
        </div>
    )
}
