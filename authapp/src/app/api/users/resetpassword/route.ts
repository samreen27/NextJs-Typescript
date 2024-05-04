import {connect} from "@/dbConfig/dbConfig"
import { NextRequest, NextResponse } from "next/server"
import User from "@/models/userModel"
import { sendEmail } from "@/helpers/mailer"


connect()

export async function POST(request: NextRequest){

    try {
        const reqBody = await request.json()
        const {email, password} = reqBody;
        console.log("login reqbody::",reqBody)

        //check if user exists
        const user = await User.findOne({email})
        if(!user){
            return NextResponse.json({error: "User does not exist"}, {status: 400})
        }
        console.log(user)
        
        //send Reset email
        await sendEmail({email, emailType:"RESET", userId: user._id})

    return NextResponse.json({
        message: "Reset Successful",
        success: true,
    })

    }  
    catch (error: any) {
        return NextResponse.json({error: error.message}, {status: 500})   
    }
}