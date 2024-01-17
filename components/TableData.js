import {TableCell, TableRow} from "@/components/ui/table";
import React from "react";

export default function TableData({
        id,
        card_number,
        name,
        addrss,
        number,
        index
    }) {
        

    return (
        <TableRow key={index}>
            <TableCell className="font-medium">{index+1}</TableCell>
            <TableCell>{name}</TableCell>
            <TableCell>{card_number}</TableCell>
            <TableCell>{addrss}</TableCell>
            <TableCell>{number}</TableCell>
        </TableRow>
    )
}
