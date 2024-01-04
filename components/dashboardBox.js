
import { LoaderIcon } from "lucide-react";
import Link from "next/link";
import React from "react";


export default function DashboardBox({name, value, icon, boxLoading=false, href}) {

    return (

        <div className="w-full lg:w-6/12 xl:w-3/12 px-4">
            <div className="relative flex flex-col min-w-0 break-words bg-white rounded-lg mb-6 xl:mb-0 shadow-lg">
                <div className="flex-auto p-4">
                    <div className="flex flex-wrap">
                        <div className="relative w-full pr-4 max-w-full flex-grow flex-1">
                            <h5 className="text-blueGray-400 uppercase font-bold text-xs">{name}</h5>
                            <span className="font-bold text-xl">{boxLoading ? (<LoaderIcon className="animate-spin" />) : (value)}</span>
                        </div>
                        <div className="relative w-auto pl-4 flex-initial">
                            <div className="text-white p-3 text-center inline-flex items-center justify-center w-12 h-12 shadow-lg rounded-full bg-blue-400">
                                {icon}
                            </div>
                        </div>
                    </div>
                    <Link href={href} className="text-sm text-blueGray-500 mt-4">See More</Link>
                </div>
            </div>
        </div>

    )
}
