import { PhoneCall, UserSquare2, Map, CreditCard, LocateFixed, Car, CalendarDays, Timer, Wallet2, HeartHandshake, Globe2 } from "lucide-react";


export default function CardValidity ({customerData}) {


    let totalTaka = 0;

    customerData?.map(item => {
        totalTaka += item?.total;
    })


    return (
        <div className="my-5 p-5 relative">
            <div className="">
                <h1 className="text-2xl text-gray-600 flex flex-row gap-2 items-center">{<UserSquare2 />} Name: {customerData[0]?.name}</h1>
                <h2 className="mt-3 text-xl text-gray-500 flex flex-row gap-2 items-center">{<PhoneCall />} Number: {customerData[0]?.number}</h2>
                <h2 className="mt-3 text-xl text-gray-500 flex flex-row gap-2 items-center">{<Map />} Address: {customerData[0]?.address}</h2>
                <h2 className="mt-3 text-xl text-gray-500 flex flex-row gap-2 items-center">{<CreditCard />} Card Number: <span className="font-bold">{customerData[0].card_number}</span></h2>
                <h2 className="mt-3 text-xl text-gray-500 flex flex-row gap-2 items-center">{<LocateFixed />} Card Category: <span className="font-bold">Wash</span></h2>
                <h2 className="mt-3 text-xl text-gray-500 flex flex-row gap-2 items-center">{<Car />} Vichal no: {customerData[0]?.vichal_no}</h2>
                <h2 className="mt-3 text-xl text-gray-500 flex flex-row gap-2 items-center">{<Car />} Vichal model: {customerData[0]?.vichal_model}</h2>
            </div>

            <div className="my-5">
                <h1 className="text-2xl text-gray-900">Services</h1>

                <div className="border border-gray-500 p-5">
                    <h1 className="text-xl flex flex-row gap-2 items-center">{<Globe2 />} Total Service: {customerData[0]?.total_time} </h1>
                    <h1 className="text-xl flex flex-row gap-2 items-center">{<HeartHandshake />} Get Service: {customerData[0]?.get_service}</h1>
                    <h1 className={`text-xl flex flex-row gap-2 items-center ${customerData[0]?.left_time <= 0 && 'text-red-600'}`}>{<Timer />} Service left: {customerData[0]?.left_time}</h1>
                    
                    <h1 className={`text-xl flex flex-row gap-2 items-center ${new Date(customerData[0]?.exp_date) <= new Date() && 'text-red-600'}`}>{<CalendarDays />} Duration: {customerData[0]?.exp_date}</h1>
                    <h1 className="text-xl flex flex-row gap-2 items-center">{<Wallet2 />} Total Taka Pay: {totalTaka}</h1>
   
      
                </div>
            </div>

            {new Date(customerData[0]?.exp_date) <= new Date() && <h1 className="text-red-600/25 text-7xl font-semibold absolute rotate-45 left-1/3 top-1/3 p-5 bg-white shadow-md">Card is Expired</h1>}
            
        </div>
    )
}