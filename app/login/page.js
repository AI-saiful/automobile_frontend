"use client"
// import { UserContext } from '@/context/AuthContext'
import { Loader2 } from 'lucide-react';
import { redirect, useRouter } from 'next/navigation';
import { useState } from 'react'
import {signIn} from "next-auth/react"
import { useSession } from 'next-auth/react';




export default function Login () {
    const session = useSession()
    const [loading, setLoading] = useState(false);
    const [loginData, setLoginData] = useState({
        username: '',
        password: '',
    })




    const router = useRouter()
    
    
    // if (users) return router.push('/dashboard')


    // const {loginUser} = useContext(UserContext)

    const loginSubmitHandler = async (e) => {
        e.preventDefault();
        setLoading(true)

        try {
            const x = await signIn('credentials', {
                username: loginData.username,
                password: loginData.password,
                redirect: false,
            })
            setLoading(false)
            if (x.ok && x.status && !x.error) {
                router.push('/dashboard')
            }

        } catch (error) {
            console.log(error);
        }

        // client input error handler
        

        
        
            

    }


    if (session?.status && session?.data) return router.push('/dashboard')
    




    return (
        <div className="flex min-h-[80vh] flex-1 flex-col justify-center px-6 py-12 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                    Sign in to your account
                </h2>
                {/* {error && <p className='text-center py-3 text-red-500'>{error}</p>} */}
            </div>
           

            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            {/* onSubmit={loginSubmitHandler} */}
                
                <form className="space-y-6" onSubmit={loginSubmitHandler} >
                    <div>
                        <label htmlFor="username" className="block text-sm font-medium leading-6 text-gray-900">
                            Username
                        </label>
                        <div className="mt-2">
                            <input
                                value={loginData.username}
                                onChange={(ev) => setLoginData({...loginData, username: ev.target.value})}
                                name='username'
                                type="text"
                                required
                                className="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                            {/* {Object(error) && error?.username && <p className='py-1 text-red-500'>{error?.username}</p>} */}
                        </div>
                    </div>

                    <div>
                        <div className="flex items-center justify-between">
                            <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                                Password
                            </label>
                        </div>
                        <div className="mt-2">
                            <input
                                value={loginData.password}
                                onChange={(ev) => setLoginData({...loginData, password: ev.target.value})}
                                name="password"
                                type="password"
                                required
                                className="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                            {/* {error?.password && <p className='py-1 text-red-500'>{error?.password}</p>} */}
                        </div>
                    </div>

                    <div>
                        <button
                            type="submit"
                            className="flex w-full justify-center rounded-md bg-green-800 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-green-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        >  
                            {loading ? (<Loader2 className='animate-spin' />) : 'Sign in'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}
