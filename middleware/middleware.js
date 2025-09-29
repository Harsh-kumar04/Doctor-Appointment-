import CryptLib from "cryptlib";

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
