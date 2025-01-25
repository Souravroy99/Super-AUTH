import { VERIFICATION_EMAIL_TEMPLATE } from "./emailTemplates.js"
import { mailtrapClient, sender } from "./mailtrap.config.js"

export const sendVerificationEmail = async(email, verificationToken) => {
    const recipient = [
        {
            email
        },
    ] 
console.log(verificationToken)
    try{
        const response = await mailtrapClient.send({
            from: sender,
            to: recipient,
            subject: "Verify your email",
            html: VERIFICATION_EMAIL_TEMPLATE.replace("{verificationCode}", verificationToken),
            category: "Email Verification"
        })

        console.log('Mailtrap Response: ', response)
    }
    catch(err) {
        console.log(`Error sending verification: ${err}`)
        throw new Error(`Error sending verification email: ${err}`)
    }
}