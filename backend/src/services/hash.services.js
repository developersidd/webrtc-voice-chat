import { createHmac } from "node:crypto";
class HashService {
  hashOtp(data) {
    const hashedData = createHmac("sha256", process.env.HASH_SECRET)
      .update(data)
      .digest("hex");
    return hashedData;
  }
}

export default new HashService();
