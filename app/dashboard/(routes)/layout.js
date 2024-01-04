// "use client"

import React from "react";
import Navbar from "@/components/navbar"
import Sidebar from "@/components/sidebar";
// import AppCookieProver from "@/cookieAppProvider";
// import ProtectRoute from '@/ProtectRoutes';


// export const metadata: Metadata = {
//     title: 'Dashboard',
//     description: '',
// }


const DashboardLayout = async ({children}) => {

  return ( 
      <div className="h-full relative">
      <div className="hidden h-full md:flex md:w-72 md:flex-col md:fixed md:inset-y-0 z-80 ">
        <Sidebar />
      </div>
      <main className="md:pl-72 pb-10">
        <Navbar />
        {children}
      </main>
    </div>

   );
}
 
export default DashboardLayout;
