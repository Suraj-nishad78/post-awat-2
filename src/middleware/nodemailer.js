
import nodeMailer from "nodemailer"
import crypto from "crypto"
import exp from "constants";

function generateOTP() {
    const otp = crypto.randomInt(100000, 999999); // Generate a 6-digit OTP
    return otp.toString();
}


const sendOtpMail = async (req, res, next) =>{
    let transporter = nodeMailer.createTransport({
        service:'gmail',
        auth:{
            user:process.env.SENDER_MAIL,
            pass:process.env.SENDER_PASS
        }
    })

    const otp = generateOTP()
    req.otp = otp;
    const {name, email} = req.user;

    let mailOptions = {
        from:process.env.SENDER_MAIL,
        to:email,
        subject:'One-Time Password (OTP) for Password Reset',
        text:`Dear ${name},\n\nWe received a request to reset your password. Your One-Time Password (OTP) is: ${otp}.\n\nThis OTP is valid for the next 5 minutes.\n\nThankyou.`,
    }

    try{
        await transporter.sendMail(mailOptions);
        next()
    }catch(err){
        console.log('Error occured while sending mail: ', err)
    }

}

export {sendOtpMail}