import CryptLib from "cryptlib";
import jwt from "jsonwebtoken";
export class Encrypt_decrypt {
  static shaKey;

  static encrypt(data, BITS = 32) {
    if (!Encrypt_decrypt.shaKey) {
      Encrypt_decrypt.shaKey = CryptLib.getHashSha256(process.env.KEY, BITS);
    }
    return CryptLib.encrypt(data, Encrypt_decrypt.shaKey, process.env.IV);
  }

  static decrypt(data, BITS = 32) {
    if (!Encrypt_decrypt.shaKey) {
      Encrypt_decrypt.shaKey = CryptLib.getHashSha256(process.env.KEY, BITS);
    }
    return CryptLib.decrypt(data, Encrypt_decrypt.shaKey, process.env.IV);
  }
}
export const verifyToken = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader)
      return res.status(401).json({ message: "Authorization header missing" });

    const token = authHeader.split(" ")[1];
    if (!token) return res.status(401).json({ message: "Token not found" });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // attach user data (like email) for use later
    next();
  } catch (error) {
    return res.status(403).json({ message: "Invalid or expired token" });
  }
};
