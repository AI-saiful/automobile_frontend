"use client"

import { Button } from "@/components/ui/button";
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table";
import { FileEdit, Search, Trash2 } from "lucide-react";
import Link from "next/link";
import { Input } from "@/components/ui/input";





export default function Buy () {

    return (
        <div className="py-3 px-5">
        
        <div className="flex flex-row gap-3">
            <Link href='/dashboard/buy/stock-entry'>
                <Button className="my-5">Stock Entry</Button>
            </Link>

            <Link href={""}>
                <Button className="my-5">Expence</Button>
            </Link>
        </div>


        <div className={`my-5 flex flex-row justify-between items-center relative`}>
            <Input placeholder="Search by phone number or Card number" />
            <Search className="absolute right-2 text-gray-600" />
        </div>

        <h1 className="text-2xl pb-3">Stock List</h1>

        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead className="w-[100px]">No</TableHead>

                    <TableHead>Name</TableHead>
                    <TableHead>Brand</TableHead>
                    <TableHead>Quantity</TableHead>
                    <TableHead>Price</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Action</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {/* {customers?.map((customer, index) => ( */}
                    <TableRow>
                        <TableCell className="font-medium">{1}</TableCell>

                        <TableCell>{"Product Name"}</TableCell>
                        
                        <TableCell>{"Product Brand"}</TableCell>
                        <TableCell>{"product quantity"}</TableCell>
                        <TableCell>{"product Price"}</TableCell>
                        <TableCell>{"09/09/2003"}</TableCell>
                        <TableCell className="flex flex-row gap-2">
                            <Button>{<FileEdit className="mr-2" size={16} />} Edit</Button>
                            <Button className="bg-red-600">{<Trash2 className="mr-2" size={16} />} Delete</Button>
                        </TableCell>
                    </TableRow>
                {/* // ))} */}
            </TableBody>
        </Table>
    </div>
    )
}
