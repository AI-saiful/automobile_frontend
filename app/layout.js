import './globals.css'
import { Inter } from 'next/font/google'
import React from "react";
// import AppCookieProver from '@/cookieAppProvider';
import 'react-toastify/dist/ReactToastify.css';
import AuthProvider from '@/AuthProvider';

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Automobile application',
  description: '',
}

export default function RootLayout({children}) {
  return (
    
    <AuthProvider>
        <html lang="en">
          <body className={inter.className}>{children}</body>
        </html>
    </AuthProvider>


  )
}