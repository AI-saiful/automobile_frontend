"use client"

import { Button } from "@/components/ui/button"
import { BadgeCheck, XCircle } from "lucide-react";

import React, { useEffect, useRef, useState } from 'react';
import {useReactToPrint} from 'react-to-print';




export default function Printable_file({custome_details, service, currentDate, memo_number}) {



    const componebtRef = useRef(null);
    const handlePrint = useReactToPrint({
        content: () => componebtRef.current
    })

    let totalTaka = 0;

    service?.map(singleSirvice => {
        totalTaka += singleSirvice?.total;
    })

    


    


    
    


    return (
        <section ref={componebtRef} className="py-20 print:py-10 print:max-w-md" style={{width: '100%', height: window.innerHeight}}>

            


            <div className="max-w-5xl mx-auto py-3 bg-white">
                <div className="text-end">
                    <Button onClick={handlePrint} className="print:hidden">Print</Button>
                </div>
                <article className="overflow-hidden">
                <div className="bg-[white] rounded-b-md">
                    <div className="p-3 px-9 print:px-14 print:p-0">
                    <div className="space-y-6 text-slate-700">

                    <p className="text-green-700 text-2xl print:text-2xl print:mt-3 font-extrabold tracking-tight uppercase font-body">
                        Mangrove Automobile
                    </p>
                    <p>Card Memo ID: {memo_number}</p>
                    </div>
                    </div>
                    <div className="print:mt-3 p-3 px-9 print:px-14 print:p-0">
                    <div className="flex w-full">
                    <div className="grid grid-cols-4 gap-12">
                    <div className="text-sm font-light text-slate-500">
                        <p className="w-full print:w-[400px] text-sm font-normal text-slate-700">
                        Customer Detail:
                        </p>
                        <p className="w-[500px]">Name: {custome_details.name}</p>
                        <p className="w-[500px]">Phone: {custome_details.number}</p>
                        <p className="w-[500px]">Address: {custome_details.address}</p>
                        <p className="w-[500px]">Date: {`${currentDate.day}/${currentDate.months}/${currentDate.fullYear}`}</p>
                    </div>
                    </div>
                    </div>
                    </div>

                    <div className="p-3 px-9 print:px-0 print:p-0 print:ml-14">
                    <div className="flex flex-col mx-0 mt-8 print:mt-8">
                    <table className="min-w-full print:w-full divide-y divide-slate-500">
                    <thead>
                        <tr>
                            <th scope="col" className="print:text-[9px] print:py-0 print:pr-0 py-3.5 pl-4 pr-3 text-left text-sm font-normal text-slate-700 sm:pl-6 md:pl-0">
                                SL
                            </th>
                            <th scope="col" className="print:text-[9px]  print:py-0 print:pr-0 py-3.5 pl-4 pr-3 text-left text-sm font-normal text-slate-700 sm:pl-6 md:pl-0">
                                Service Name
                            </th>
                            <th scope="col" className="print:text-[9px] print:py-0 print:pr-0 py-3.5 pl-4 pr-3 text-left text-sm font-normal text-slate-700 sm:pl-6 md:pl-0">
                                Description
                            </th>
                            <th scope="col" className="print:text-[9px] print:py-0 print:pr-0 py-3.5 px-3 text-right text-sm font-normal text-slate-700 sm:table-cell">
                                Price
                            </th>
                            <th scope="col" className="print:text-[9px] print:py-0 print:pr-0 py-3.5 px-3 text-right text-sm font-normal text-slate-700 sm:table-cell">
                                Quantity
                            </th>

                            <th scope="col" className="print:text-[9px] print:py-0 print:pr-0 py-3.5 pl-3 pr-4 text-right text-sm font-normal text-slate-700 sm:pr-6 md:pr-0">
                                Total Amount
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {service?.map((singleService, index) => (
                            <tr key={index} className="border-b w-full print:border-b border-slate-200">

                                <td className="py-4 print:py-1 pl-4 pr-3 print:pr-0 text-sm sm:pl-6 md:pl-0">
                                    <div className="font-medium text-slate-700 print:text-[7px]">
                                        {index+1}
                                    </div>
                                </td>
                                <td className="py-4 print:py-1 pl-4 pr-3 print:pr-0 text-sm sm:pl-6 md:pl-0">
                                    <div className="font-medium text-slate-700 print:text-[7px]">
                                        {singleService?.serviceName}
                                    </div>
                                </td>
                                <td className="py-4 print:py-1 pl-4 pr-3 print:pr-0 text-sm sm:pl-6 md:pl-0">
                                    <div className="font-medium text-slate-700 print:text-[7px]">
                                        {singleService?.description}
                                    </div>
                                </td>
                                <td className="px-3 py-4 print:py-1 text-sm text-center text-slate-500 sm:table-cell print:text-[7px]">
                                    {singleService?.price}
                                </td>
                                <td className="px-3 py-4 print:py-1 text-sm text-right text-slate-500 sm:table-cell print:text-[7px]">
                                    {singleService?.quintity}
                                </td>
    
                                <td className="py-4 print:py-1 pl-3 pr-4 print:pr-0 text-sm text-right text-slate-500 sm:pr-6 md:pr-0 print:text-[7px]">
                                    {singleService?.total}
                                </td>
                            </tr>
                        ))}

                    </tbody>
                        <tfoot>
                            <tr>
                                <th scope="row" colSpan={5} className="hidden pt-4 print:pt-0 pl-6 pr-3 print:pr-0 text-sm font-normal text-right text-slate-700 sm:table-cell md:pl-0">

                                </th>
                                <th scope="row" colSpan={5} className="print:text-[9px] pt-4 print:pt-0 pl-6 pr-3 print:pr-0 text-sm font-normal text-right text-slate-700 sm:table-cell md:pl-0">
                                    Total
                                </th>

                                <td className="print:text-[7px] pt-4 print:pt-0 pl-3 pr-4 print:pr-0 text-sm font-normal text-right text-slate-700 sm:pr-6 md:pr-0">
                                    {totalTaka}
                                </td>
                            </tr>
                        </tfoot>
                    </table>



                    <div className="mt-8">
                        <p className="text-gray-500 flex flex-col justify-center font-sm leading-tight">
                            <span className="text-gray-500 font-sm">.......................................</span>
                            <span className="print:font-sm">Manager signature</span>
                        </p>
                    </div>





                    </div>
                    </div>
                    
                </div>
            </article>
            
            </div>
            

            
        </section>
    )
}

  
