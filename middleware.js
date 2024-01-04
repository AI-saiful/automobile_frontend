export { default } from "next-auth/middleware"

export const config = { matcher: [
    '/dashboard',
    '/dashboard/sell',
    '/dashboard/sell/new-memo',
    '/dashboard/customer',
    '/deshboard/customer/temporary-customer',
    '/dashboard/card-validity',
    '/deshboard/buy',
    
] }