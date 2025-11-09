import { GraduationCap } from 'lucide-react'
import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { AuthState } from '@/context/auth-context/Auth-Context'


function AuthPage() {


    const { loginFormData, setLoginFormData, registerFormData, setRegisterFormData, activeTab, setActiveTab, handleRegisterUser, handleLoginUser, isLoading } = useContext(AuthState);

    return (
        <div className='flex flex-col min-h-screen'>
            <header className='px-4 lg:px-6 h-14 flex items-center border-b'>
                <Link to={"/"} className='flex items-center justify-center'>
                    <GraduationCap className='h-8 w-8 mr-4' />
                    <span className='font-extrabold text-xl'>LMS WIN</span>
                </Link>
            </header>
            <div className='flex items-center justify-center min-h-screen bg-background'>
                <Tabs defaultValue={activeTab} value={activeTab} onValueChange={setActiveTab} className="w-full max-w-md">
                    <TabsList>
                        <TabsTrigger value="register">Register</TabsTrigger>
                        <TabsTrigger value="login">Login</TabsTrigger>
                    </TabsList>
                    <TabsContent value="register">
                        <Card className={"p-6 space-y-4"}>
                            <CardHeader>
                                <CardTitle>Create a new account</CardTitle>
                                <CardDescription>Enter Your details to get started.</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <form className='flex flex-col gap-2' onSubmit={handleRegisterUser}>
                                    <div>
                                        <Label className={"mb-2"}>User Name</Label>
                                        <Input value={registerFormData.userName} onChange={(e) => { setRegisterFormData({ ...registerFormData, userName: e.target.value }) }} placeholder="Enter Your Name" />
                                    </div>
                                    <div>
                                        <Label className={"mb-2"}>User Email</Label>
                                        <Input value={registerFormData.userEmail} onChange={(e) => { setRegisterFormData({ ...registerFormData, userEmail: e.target.value }) }} placeholder="Enter Your Email" />
                                    </div>
                                    <div>
                                        <Label className={"mb-2"}>User Password</Label>
                                        <Input value={registerFormData.userPassword} onChange={(e) => { setRegisterFormData({ ...registerFormData, userPassword: e.target.value }) }} placeholder="Enter Your Password" />
                                    </div>
                                    <div>
                                        <Button disabled={isLoading} className={`${isLoading ? "disabled:bg-black/50 disabled:text-white" : null} w-full mt-5`}>{isLoading ? "Processing..." : "Register"}</Button>
                                    </div>
                                </form>
                            </CardContent>
                        </Card>

                    </TabsContent>
                    <TabsContent value="login">
                        <Card className={"p-6 space-y-4"}>
                            <CardHeader>
                                <CardTitle>Sign in to your account</CardTitle>
                                <CardDescription>Enter Your email and password to access your account.</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <form className='flex flex-col gap-2' onSubmit={handleLoginUser}>
                                    <div>
                                        <Label className={"mb-2"}>User Email</Label>
                                        <Input value={loginFormData.userEmail} onChange={(e) => { setLoginFormData({ ...loginFormData, userEmail: e.target.value }) }} placeholder="Enter Your Email" />
                                    </div>
                                    <div>
                                        <Label className={"mb-2"}>User Password</Label>
                                        <Input value={loginFormData.userPassword} onChange={(e) => { setLoginFormData({ ...loginFormData, userPassword: e.target.value }) }} placeholder="Enter Your Password" />
                                    </div>
                                    <div>
                                        <Button disabled={isLoading} className={`${isLoading ? "disabled:bg-black/50 disabled:text-white" : null} w-full mt-5`}>{isLoading ? "Processing..." : "Login"}</Button>
                                    </div>
                                </form>
                            </CardContent>
                        </Card></TabsContent>
                </Tabs>

            </div>

        </div>
    )
}

export default AuthPage