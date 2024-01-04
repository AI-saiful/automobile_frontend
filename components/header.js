"use client"
import {Popover, PopoverContent, PopoverTrigger} from "@/components/ui/popover";
import {ChevronDown, UserCircle} from "lucide-react";
import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs";
import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from "@/components/ui/card";
import {Label} from "@/components/ui/label";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import { useSession } from "next-auth/react";
import {signIn, signOut} from "next-auth/react"


export default function Header() {
    const session = useSession()


    


    return (

        <Popover>
            <PopoverTrigger asChild>
                <div className="flex w-full justify-end items-center cursor-pointer">
                    <ChevronDown />
                    <h3 className="text-sm px-2">{session?.data?.user?.name}</h3>
                    <UserCircle />

                </div>
            </PopoverTrigger>
            <PopoverContent className="w-80" align="end">
                <Tabs defaultValue="account" className="">
                    <TabsList className="grid w-full grid-cols-2">
                        <TabsTrigger value="account">Account</TabsTrigger>
                        <TabsTrigger value="password">Password</TabsTrigger>
                    </TabsList>
                    <TabsContent value="account">
                        <Card>
                            <CardHeader>
                                <CardTitle>Account</CardTitle>
                                {/* <CardDescription>
                                    Change your name or username
                                </CardDescription> */}
                            </CardHeader>
                            <CardContent className="space-y-2">
                                <div className="space-y-1">
                                    <Label htmlFor="name">username</Label>
                                    <Input disabled id="name" value={session?.data?.user?.name} />
                                </div>
                                {/* <div className="space-y-1">
                                    <Label htmlFor="username">Email</Label>
                                    <p>naiem9009@gmail.com</p>
                                </div> */}
                            </CardContent>
                            <CardFooter>
                                <Button onClick={() => signOut()} >Logout</Button>
                            </CardFooter>
                        </Card>
                    </TabsContent>
                    <TabsContent value="password">
                        <Card>
                            <CardHeader>
                                <CardTitle>Password</CardTitle>
                                <CardDescription>
                                    Change your password here if you need
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-2">
                                <div className="space-y-1">
                                    <Label htmlFor="current">Current password</Label>
                                    <Input id="current" type="password" />
                                </div>
                                <div className="space-y-1">
                                    <Label htmlFor="new">New password</Label>
                                    <Input id="new" type="password" />
                                </div>
                            </CardContent>
                            <CardFooter>
                                <Button>Save password</Button>
                            </CardFooter>
                        </Card>
                    </TabsContent>
                </Tabs>
            </PopoverContent>
        </Popover>
    )
}
