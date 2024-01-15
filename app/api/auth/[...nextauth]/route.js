// import { authenticate } from "@/services/authService"
import jwtDecode from "jwt-decode";
import { BACKEND_URL } from "@/Backend_Configure"
import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
// import { cookies } from "next/headers";


export const authOptions = {

  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {},
      async authorize (credentials, req) {
        if (typeof credentials !== "undefined") {

            const res = await fetch(`${BACKEND_URL}/api/login/`, {
                method: "POST",
                // mode: "",
                headers: {
                    "Content-Type": "application/json",
                },

                body: JSON.stringify({username: credentials?.username, password: credentials?.password})
            })

            if (res.ok && res.status === 200) {
                const data = await res.json();



                if (res.ok && data?.access) {
                  const userDecode = await jwtDecode(data?.access);
                  const user = {
                    name: data.username,
                    email: userDecode?.user_id,
                  }

                  return user;

                }

                
            } else {
              console.log(res);
            }

        } else {
          return null
        }
      }
    })
    
  ],
  session: {strategy: 'jwt'},
  pages: {
    signIn: "/",
    signOut: '/'
  },
  secret:process.env.secret
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }