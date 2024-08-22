import nodemailer from "nodemailer";
import {USER_GMAIL_ACCOUNT, PASSWORD_GMAIL_ACCOUNT} from "../config.js"


export const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false, // Use `true` for port 465, `false` for all other ports
  auth: {
    user: USER_GMAIL_ACCOUNT,
    pass: PASSWORD_GMAIL_ACCOUNT,
  },
});


export let enviar_correo = async (emailTo, asunto ,content, mes) => {
    try {

        let envio = await transporter.sendMail({
            from: USER_GMAIL_ACCOUNT,
            to: emailTo,
            subject: asunto,
            text: content,
          })
          console.log (mes)

    }
    catch (error) {
        console.error ("No se pudo realizar el envío del correo electrónico "+error)
    }

    
}