"use client"
import Link from "next/link"
import React, { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import axios, { Axios } from "axios"
import toast from "react-hot-toast"
import { sendEmail } from "@/helpers/mailer"



export default function LoginPage(){

        const [user, setUser] = useState({
            email: "",
            password: "",
        })
        const [loading, setLoading] = useState(false)
        const [buttonDisabled, setButtonDisabled] = useState(false);
        const [linkDisabled, setLinkDisabled] = useState(false);
        const [displayMsg, setDisplayMsg] = useState("")
        const router = useRouter()

        const onLogin = async () => {
            try {
                setLoading(true)
                const response = await axios.post("/api/users/login", user)
                console.log("Login done", response)
                toast.success("Login Success")
                router.push("/profile")

            } catch (error: any) {
                console.log("Login Failed::", error.message)
                toast.error(error.message)
            }
            finally{
                setLoading(false)
            }
                
        }

        useEffect(()=>{
            if(user.email.length >0 && user.password.length > 0 ){
                setButtonDisabled(false);
            }else{
                setButtonDisabled(true)
            }

            if(user.email.length >0){
                setLinkDisabled(false);
            }else{
                setLinkDisabled(true)
            }
        },[user])

        const handleClick = async () => {
            const message = " An Email has been sent to your EmailID . Please Reset your password from there"
            setDisplayMsg(message)
            try {
                console.log("user::",user)
                const response = await axios.post("/api/users/resetpassword", user)

            } catch (error: any) {
                console.log("Reset Failed::", error.message)
                toast.error(error.message)
            }
        }

        return (
            <div className="flex flex-col items-center justify-center min-h-screen py-2">
                <h1 className="text-2xl font-bold p-4 text-orange-500">{displayMsg}</h1>
                <h1>{loading ? "Processing..." : "Login" }</h1>
                <hr />
                 <label htmlFor="password">Email</label>
                <input
                    className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
                    type="email" 
                    id="email"
                    value={user.email}
                    onChange={(e)=>setUser(u=>({...u, email: e.target.value }))}
                    placeholder="email"
                 />
                <label htmlFor="password">Password</label>
                <input
                    className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
                    type="password" 
                    id="password"
                    value={user.password}
                    onChange={(e)=>setUser(u=>({...u, password: e.target.value }))}
                    placeholder="password"
                 />
                  <button
                  disabled = {linkDisabled}
                 className="p-2 underline rounded-lg mb-4 focus:outline-none focus:border-gray-600"
                 onClick={handleClick}>
                    Forgot Password
                 </button>
                 <button
                 disabled = {buttonDisabled}
                 className="p-2 border border-gray-300 bg-slate-500 rounded-lg mb-4 focus:outline-none
                  focus:border-gray-600"  
                 onClick={onLogin}>
                    Login Here
                 </button>
                 <Link href={"/signup"}>Visit Signup Page</Link>
            </div>
        )
}