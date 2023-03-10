import bigInt from "big-integer";
import { KEYUTIL } from "jsrsasign";
import CryptoJS from "crypto-js";

export function AESEncrypt(pureText, privKey) {
  let ciphertext = encodeURIComponent(
    CryptoJS.AES.encrypt(JSON.stringify(pureText), privKey).toString()
  );

  return ciphertext;
}

export function AESDecrypt(encryptedText, privKey) {
  try {
    let bytes = CryptoJS.AES.decrypt(
      decodeURIComponent(encryptedText),
      privKey
    );
    let decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
    return decryptedData;
  } catch (err) {
    return "Ключ неверный, невозможно расшифровать";
  }
}
