"use client"

import { BACKEND_URL } from "@/Backend_Configure";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast, ToastContainer } from "react-toastify";


export default function CardRenew () {

    const router = useRouter()

    const [cardDetails, setShowCardDetails] = useState(null)
    const [searchInputValue, setSearchInputValue] = useState('')
    const [submitData, setSubmitData] = useState({
        service_time: "",
        duration: "",
        ammount: ""
    })


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
                    setShowCardDetails(customerDetailsWithCard?.customer[customerDetailsWithCard?.customer?.length-1])
                    
                    
                }

                
            }

            
        }

        if (ev.target.value <= '') {
            setShowCardDetails(null)
        }

    }


    const renewSubmitHandler = async (ev) => {
        ev.preventDefault()

        if (submitData.service_time <= '' || submitData.duration <= '' || submitData.ammount <= '') {
            return toast.error('Must be added the Service Time, durations and ammount', {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
        }

        const saveRenewData = await fetch(`${BACKEND_URL}/renew_card/`, {
            method: "POST",
            // mode: "cors",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({...submitData, card_number_or_phone_number: searchInputValue})
        })

        if (saveRenewData.ok && saveRenewData.status === 200) {
            const data = await saveRenewData.json()

            if (data) toast(data)

            return setSubmitData({ammount: '', duration: '', service_time: ''})


        }

    }




    return (
        <div className="px-3 py-3">
            <ToastContainer />
            <h1 className="text-2xl text-gray-800">Card Renew</h1>


                <div className={`grid ${cardDetails && 'md:grid-cols-2 transition-all ease-in-out duration-100'} gap-3 mt-5`}>
                    <form onSubmit={renewSubmitHandler}>
                        <div className="rounded-md py-5 flex flex-col gap-3 border border-gray-500/20 p-5 shadow-md">
                            <Input placeholder={"Enter the Card Number or Phone Number"} value={searchInputValue} onChange={(ev) => inputSearcHandler(ev)} />
                            <Input value={submitData.service_time} onChange={(ev) => setSubmitData({...submitData, service_time: ev.target.value})} type="number" placeholder={"Enter the Service Times, Example: 5"}/>
                            <Input value={submitData.duration} onChange={(ev) => setSubmitData({...submitData, duration: ev.target.value})} type="number" placeholder={"Enter the Durations => only days, Example: 90"}/>
                            <Input value={submitData.ammount} onChange={(ev) => setSubmitData({...submitData, ammount: ev.target.value})} type="number" placeholder={"Enter the Ammount, Example: 85490"}/>
                            {cardDetails && <Button type="submit" className="mt-2">Save</Button>}
                            
                        </div>

                        
                    </form>

                   
                   {cardDetails && (
                        <div className="border border-gray-500/20 grid p-5 shadow-md rounded-md transition-all ease-in-out duration-100">
                            {!cardDetails ? (<h1 className="flex flex-row gap-1 items-center">Card Status: <span className="text-red-600">Not Available</span></h1>) : (<h1 className="flex flex-row gap-1 items-center">Card Status: <span className="text-green-500 font-bold shadow-md p-2 rounded-lg bg-gray-400/20">Available</span></h1>)}
                            {/* {cardDetails?.map((customer, index) => ( */}
                            
                                <>
                                    <h1>Name : {cardDetails?.name}</h1>
                                    <h1>Phone : {cardDetails?.number} </h1>
                                    <h1>Address : {cardDetails?.addrss} </h1>
                                    <h1>Card Number : <span className="font-bold text-gray-600">{cardDetails?.card_number}</span></h1>
                                </>
                            {/* ))} */}
                        </div>
                                      
                   )}
                </div>

            



        </div>
    )
}