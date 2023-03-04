import { KEYUTIL } from "jsrsasign";
import { KJUR } from "jsrsasign";
// const CryptoJS = require("crypto-js");

// const forge = require("node-forge");
// let rsa = forge.pki.rsa;
// Указываем в переменной что хотим пользоваться шифром RSA

export function RSASign(pureText, privKey) {
  try {
    let sig = new KJUR.crypto.Signature({ alg: "SHA1withRSA" });
    sig.init(privKey);
    sig.updateString(pureText);
    let signature = sig.sign();

    return signature;
  } catch (err) {
    return "Невозможно подписать";
  }
}

export function RSASignVerify(signature, text, pubKey) {
  try {
    let sig2 = new KJUR.crypto.Signature({ alg: "SHA1withRSA" });
    sig2.init(pubKey);
    sig2.updateString(text);
    let isValid = sig2.verify(signature);

    return isValid;
  } catch (err) {
    return false;
  }
}

// export function RSASign(pureText) {
//   const md = forge.md.sha256.create();

//   let keypair = rsa.generateKeyPair({ bits: 1024, e: 0x10001 });

//   const priv = keypair.privateKey;
//   const pub = keypair.publicKey;
//   md.update(pureText); // Создаём хэш цифровой подписи которая ещё не в формате Hex

//   const signature = priv.sign(md);
//   //   console.log("sign:", forge.util.encode64(signature));

//   let rsaKeypair = KEYUTIL.generateKeypair("RSA", 1024);
//   console.log(rsaKeypair);
//   return { signature, keypair, md };
// }

// export function RSASignVerify(signature, publicKey, md) {
//   //   let data = md.digest().bytes();
//   //   console.log("verify:", publicKey.verify(data, signature));
//   //   let verified = forge.util.decodeUtf8(
//   //     publicKey.verify(md.digest().bytes(), signature)
//   //   );
//   //   var verified = keypair.publicKey.verify(md.digest().bytes(), signature);
//   //   return verified;
// }
