"use client"
import {RecentlySell} from "@/components/RecentlySell";
import Link from "next/link";

import Loading from "@/components/Loading";
import {BarChartBig, CircleDollarSign, ArrowDownWideNarrow, User2} from "lucide-react";
import { useState } from "react";
import { useEffect } from "react";
import DashboardBox from "@/components/dashboardBox";
import { BACKEND_URL } from "@/Backend_Configure";



const Home = () => {
    const [totalCustomer, setTotalCustomer] = useState(0)
    const [loading, setLoading] = useState(false)
    const [totalSell, setTotalSell] = useState(0)
    const [totalEarnings, setTotalEarnings] = useState(0)

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true)

            const totalCustomer = await fetch(`${BACKEND_URL}/customer`)

            if (totalCustomer.ok) {
                const tempCustomerTotal = await fetch(`${BACKEND_URL}/temporary_profile/`)
                if (tempCustomerTotal.ok) {
                    const customerLength = await totalCustomer.json();
                    const tempCustomerLength = await tempCustomerTotal.json()

                    const totalCustomerList = customerLength?.cps.length + tempCustomerLength?.cps.length;

                    setTotalCustomer(totalCustomerList)
                    setLoading(false)


                }

            }




            const totalSell = await fetch(`${BACKEND_URL}/total-sell/`)
            if (totalSell.ok){
                const data = await totalSell.json()
                setTotalSell(data)
            }
            const totalEarning = await fetch(`${BACKEND_URL}/totalServices/`)
            if (totalEarning.ok){
                const data = await totalEarning.json()

                let totalearningValue = 0;

                if (data.service?.length > 0) {
                    data?.service?.map(service => {
                        totalearningValue += service?.total;
                        
                    })
                }

                setTotalEarnings(totalearningValue)
                
                
            }

            
        }
        fetchData()
    }, [])

    

    
    

    return (

        <div className="px-8 space-y-4">
            <div className="flex flex-wrap">
            <DashboardBox name="Monthly Sell" href={'/dashboard/sell'} value={totalSell} icon={<BarChartBig /> } boxLoading={loading}/>
            <DashboardBox name="Monthly Buy" href={'/dashboard/buy'} value={0} icon={<ArrowDownWideNarrow /> } boxLoading={loading}/>
            <DashboardBox name="Monthly Earnings" href={'/dashboard/sell'} value={totalEarnings} icon={<CircleDollarSign /> } boxLoading={loading}/>
            <DashboardBox name="Total Customer" href={'/dashboard/customer'} value={totalCustomer} icon={<User2 /> } boxLoading={loading}/>
                
           </div>

            <div className="py-5">
                <h1 className="text-2xl">Recently Added Customer History</h1>
                <RecentlySell dashboard={true} />
            </div>
        </div>
  )
}

export default Home

