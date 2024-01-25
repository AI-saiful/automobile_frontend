"use client"

import {Input} from "@/components/ui/input";
import { useState } from "react";
import {Button} from "@/components/ui/button";
import { ToastContainer, toast } from "react-toastify";
import { BACKEND_URL } from "@/Backend_Configure";



export default function CardClose () {
    const [cardDetails, setShowCardDetails] = useState([])
    const [searchInputValue, setSearchInputValue] = useState('')


    const inputSearcHandler = async (ev) => {
        setSearchInputValue(ev.target.value)



        if (ev.target.value > 0) {
            const resCustomerDataWithCard = await fetch(`${BACKEND_URL}/search_by_number_or_card/`, {
                method: "POST", 
                // mode: "cors",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({searchValue: ev.target.value})
            })

            if (resCustomerDataWithCard.ok && resCustomerDataWithCard.status === 200) {
                const customerDetailsWithCard = await resCustomerDataWithCard.json();

                if (customerDetailsWithCard) {
                    setShowCardDetails(customerDetailsWithCard?.customer)
                    
                }

                
            }

            
        }

        if (ev.target.value <= '') {
            setShowCardDetails(null)
        }

    }


    const closeSubmitHandler = async (ev) => {
        ev.preventDefault()

        

        const saveRenewData = await fetch(`${BACKEND_URL}/card_close/`, {
            method: "POST",
            // mode: "cors",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({card_number_or_phone_number: searchInputValue})
        })

        if (saveRenewData.ok && saveRenewData.status === 200) {
            const data = await saveRenewData.json()

            if (data) toast(data)

            return;



        }

    }




    return (
        <div className="px-3 py-3">
        <ToastContainer />
        <h1 className="text-2xl text-gray-800">Card Close Entry</h1>


            <div className={`grid ${cardDetails?.length > 0 && 'md:grid-cols-2 transition-all ease-in-out duration-100'} gap-3 mt-5`}>
                <form onSubmit={closeSubmitHandler}>
                    <div className="rounded-md py-5 flex flex-col gap-3 border border-gray-500/20 p-5 shadow-md">
                        <Input placeholder={"Enter the Card Number or Phone Number"} value={searchInputValue} onChange={(ev) => inputSearcHandler(ev)} />
                        {cardDetails?.length > 0 && <Button type="submit" className="mt-2">Save</Button>}
                        
                    </div>

                    
                </form>

               
               {cardDetails?.length > 0 && (
                    <div className="border border-gray-500/20 grid p-5 shadow-md rounded-md transition-all ease-in-out duration-100">
                        {cardDetails.length < 0 ? (<h1 className="flex flex-row gap-1 items-center">Card Status: <span className="text-red-600">Not Available</span></h1>) : (<h1 className="flex flex-row gap-1 items-center">Card Status: <span className="text-green-500 font-bold shadow-md p-2 rounded-lg bg-gray-400/20">Available</span></h1>)}
                        {cardDetails?.map((customer, index) => (
                            <>
                                <h1>Name : {customer?.name}</h1>
                                <h1>Phone : {customer?.number} </h1>
                                <h1>Address : {customer?.addrss} </h1>
                                <h1>Card Number : <span className="font-bold text-gray-600">{customer?.card_number}</span></h1>
                            </>
                        ))}
                    </div>
                                  
               )}
            </div>

        



    </div>
    )
}