import { randomInt } from "node:crypto";
import sendMail from "../lib/nodemailer.js";
import hashServices from "./hash.services.js";

class OtpService {
  generateOTP() {
    const otp = randomInt(1000, 9999);
    return otp;
  }

  async sentOTPBySms(otp, phoneTo) {
    const smsNetApiKey = process.env.SMS_NET_BD_API_KEY;
    const smsNetUrl = `https://api.sms.net.bd/sendsms?api_key=${smsNetApiKey}&to=${phoneTo}&msg=Your%20siddikHouse%20OTP%20code%20is%20${otp}`;
    const response = await fetch(smsNetUrl);
    const data = await response.json();
    return data;
  }

  async sentOTPByEmail(otp, emailTo) {
    const res = await sendMail(
      emailTo,
      `SiddikHouse OTP code`,
      `Your OTP code is ${otp}`,
    );
    console.log("🚀 ~ res:", res)
    return res;
  }

  verifyOTP(hashedOtp, data) {
    const generatedHash = hashServices.hashOtp(data);
    return generatedHash === hashedOtp;
  }
}

export default new OtpService();
