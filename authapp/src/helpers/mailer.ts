// domain.com/verifytoken/assasasdfdgfdffg//server
// domain.com/verifytoken?token=adsadaddsdaf//client

import nodemailer from 'nodemailer'
import User from "@/models/userModel"
import bcryptjs from "bcryptjs"

export const sendEmail = async ({email, emailType, userId }: any) => {

    try {
      console.log(email, emailType, userId.toString() )
        //create a hashed token
        const hashedToken = await bcryptjs.hash(userId.toString(), 10)

        if (emailType === "VERIFY"){
            await User.findByIdAndUpdate(userId, {
                verifyToken: hashedToken,
                verifyTokenExpiry: Date.now() + 3600000})
        }
        else if(emailType === "RESET"){
            await User.findByIdAndUpdate(userId, {
                forgotPasswordToken: hashedToken,
                forgotPasswordTokenExpiry: Date.now() + 3600000})
        }

        var transport = nodemailer.createTransport({
            host: "sandbox.smtp.mailtrap.io",
            port: 2525,
            auth: {
              user: "2c4b5ab47b1236",
              pass: "18cfb2455370a2"
            }
          });

          //create mail options

          const mailOptions = {
            from: 'samreen.fatima276@gmail.com',
            to: email,
            subject: emailType === "VERIFY" ? "Verify your Email" : "Reset your password",
            html: `<p>Click 
            <a href="${process.env.DOMAIN}/${emailType === "VERIFY" ? "verifyemail" : "resetpassword"}?token=${hashedToken}">
            here</a> to 
            ${emailType==="VERIFY" ? "Verify your email" : "Reset your Password"}
            or copy paste the link below in your browser <br> ${process.env.DOMAIN}/${emailType === "VERIFY" ? "verifyemail" : "resetpassword"}?token=${hashedToken}
            </p>`
          }
          console.log(mailOptions)

          const mailResponse = await transport.sendMail(mailOptions)
          return mailResponse
    

    } catch (error: any) {
        throw new Error(error.message)
    }

}