const CryptoJS = require("crypto-js");

function AESEncrypt(pureText, privKey) {
  let ciphertext = encodeURIComponent(
    CryptoJS.AES.encrypt(JSON.stringify(pureText), privKey).toString()
  );

  return ciphertext;
}

function AESDecrypt(encryptedText, pubKey) {
  try {
    let bytes = CryptoJS.AES.decrypt(decodeURIComponent(encryptedText), pubKey);
    let decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
    return decryptedData;
  } catch (err) {
    return "Ключ неверный, невозможно расшифровать";
  }
}

module.exports = {
  AESEncrypt,
  AESDecrypt,
};
