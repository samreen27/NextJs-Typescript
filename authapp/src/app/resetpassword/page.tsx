"use client"

import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react"

export default function Forgotpassword(){
    const [loading, setLoading] = useState(false)
    const [token, setToken] = useState("");
    const [reset, setReset] = useState(false);
    const [buttonDisabled, setButtonDisabled] = useState(false);
    const [userpwd, setUserpwd] = useState({
        password: "",
        confirmpassword: "",
    })

    const confirmPassword = async () => {
        try {
            setLoading(true)
            if (userpwd.password === userpwd.confirmpassword){
                const response = await axios.post('/api/users/resetEmailpwd', {token,userpwd})
                setReset(true)
                
            }
            else{
                alert("Passwords dont match")
            }
            
        } 
        catch (error: any) {
            console.log(error.response.data)
        }
        finally{
            setLoading(false)
        }
    }

    useEffect(()=>{
        if(userpwd.password.length >0 && userpwd.confirmpassword.length > 0 ){
            setButtonDisabled(false);
        }else{
            setButtonDisabled(true)
        }
    },[userpwd])

    useEffect(() => {
        const urlToken = window.location.search.split("=")[1];
        setToken(urlToken || "");
    }, []);
    
    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
                {reset && (<h1>Password Reset is done. Please Login from <Link href="/login">
                        here
                    </Link></h1>)}
                <h1>{loading ? "Processing..." : "Reset Password" }</h1>
                <hr />
                 <label htmlFor="password">Password</label>
                <input
                    className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
                    type="password" 
                    id="password"
                    placeholder="password"
                    value={userpwd.password}
                    onChange={(e)=>setUserpwd(u=>({...u,password: e.target.value}))}
                 />
                <label htmlFor="confirmpassword">Confirm Password</label>
                <input
                    className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
                    type="password" 
                    id="confirmpassword"
                    placeholder="confirm password"
                    value={userpwd.confirmpassword}
                    onChange={(e)=>setUserpwd(u=>({...u,confirmpassword: e.target.value}))}
                 />
                 <button
                 disabled={buttonDisabled}
                 className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600"
                 onClick={confirmPassword}>
                    Submit
                 </button>
        </div>
    )
}