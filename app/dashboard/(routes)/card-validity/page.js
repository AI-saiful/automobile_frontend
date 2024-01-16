"use client"

import { BACKEND_URL } from "@/Backend_Configure";
import CardValidity from "@/components/CardValidate";
import Loading from "@/components/Loading";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { useState } from "react";



export default function CardValidityCheck() {
    const [searchValue, SetSearchValue] = useState('')
    const [loading, setLoading] = useState(false)
    const [recentlySellDetails, setRecentlySellDetails] = useState([])
    const [error, setError] = useState("")

  





    const searchInputHandler = async (ev) => {
        

        const sellHistory = [];

        if (searchValue > '') {
            setLoading(true)
            const res = await fetch(`${BACKEND_URL}/search_by_number_or_card/`, {
                method: "POST",
                // mode: "cors",
                body: JSON.stringify({searchValue: searchValue})
            })

            if (res.ok) {
                const data = await res.json();

                const cardValidate = await fetch(`${BACKEND_URL}/card-validate-check/`, {
                    method: "POST",
                    // mode: "cors",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({card_number: data?.customer[0]?.card_number})
                });

                if (cardValidate.ok && cardValidate.status === 200) {
                    const cardData = await cardValidate.json()

                    setLoading(false)
                    data?.customer?.map(singleCustomer => {
                        data?.service?.map(singleService => {

                            if (singleCustomer.id !== singleService.cp_id) {
                                const newSellHistory = {
                                    name : singleCustomer?.name,
                                    number: singleCustomer?.number,
                                    service: singleCustomer?.name,
                                    address: singleCustomer?.addrss,
                                    date: singleService.date.split("T")[0],
                                    total: 0,
                                    card_number: singleCustomer?.card_number,
                                    vichal_no: singleCustomer?.vichal_no,
                                    vichal_model: singleCustomer?.vichal_model,
                                    exp_date: cardData?.exp_date,
                                    left_time: cardData?.left_time,
                                    total_time: cardData?.total_time,
                                    get_service: cardData?.get_service,
    
    
                                }
                                setError(null)
    
                                sellHistory.push(newSellHistory)
                            }

                            
                            
                        
                            if (singleCustomer.id === singleService.cp_id) {
                                const x = data?.st?.filter(serviceType => serviceType.id === singleService.service_type_id)



                           
                                
                                
                                const newSellHistory = {
                                    name : singleCustomer?.name,
                                    number: singleCustomer?.number,
                                    service: x[0].name,
                                    address: singleCustomer?.addrss,
                                    date: singleService.date.split("T")[0],
                                    total: singleService?.total,
                                    card_number: singleCustomer?.card_number,
                                    vichal_no: singleCustomer?.vichal_no,
                                    vichal_model: singleCustomer?.vichal_model,
                                    exp_date: cardData?.exp_date,
                                    left_time: cardData?.left_time,
                                    total_time: cardData?.total_time,
                                    get_service: cardData?.get_service,
    
    
                                }
                                setError(null)
    
                                sellHistory.push(newSellHistory)
                            }
                        })
                    })
                } else {
                    
                    setError('Something wrong')
                    setLoading(false)
                    
                }
                




                
                

            }

            setRecentlySellDetails(sellHistory);

        }

        
    }







    if (loading) return <Loading sms="Wait a moments" />



    return (
        <div className="px-3 py-3">

            <Link href='/dashboard/card-validity/card-renew'>
                    <Button>Card Renew</Button>
            </Link>


            <Input className="my-5" onChange={ev => SetSearchValue(ev.target.value)} placeholder={'Enter the card Number or Phone Number'} />


            <Button className="bg-gray-700" onClick={searchInputHandler} >Check</Button>

                

            {error && <h1 className="text-red-600 mt-5 text-3xl font-bold">{error}</h1>}
            {recentlySellDetails.length > 0 && <CardValidity customerData={recentlySellDetails}/>}
            
        </div>
    )
}