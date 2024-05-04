"use client"
import { useRouter } from "next/navigation"
import axios from "axios"
import toast from "react-hot-toast";
import { useState } from "react";
import Link from "next/link";

export default function ProfilePage() {
    const router = useRouter();
    const [data, setData] = useState("Nothing")

    const logout = async () => {
        try {
            await axios.get("/api/users/logout")
            toast.success("Logout Successful")
            router.push("/login")
        } catch (error: any) {
            console.log("Logout Failed", error.message)
            toast.error(error.message)
        }
        
    }

    const getUserDetails = async () => {
        const res = await axios.get("/api/users/me")
        console.log(res.data)
        setData(res.data.data._id)
    }
    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <h1>Profile</h1>
            <hr />
            <p>Profile Page</p>
            <h2 className="rounded bg-green-500 p-3 mt-3">{data==="Nothing" ? "Nothing" : <Link href={`/profile/${data}`}>{data}</Link>}</h2>
            <hr />
            <button
                onClick={logout}
                className="bg-blue-500 mt-4 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >Logout</button>
            <button
                onClick={getUserDetails}
                className="bg-purple-500 mt-4 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >Get User Details</button>
        </div>
    )
}