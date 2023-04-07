import { KJUR } from "jsrsasign";

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
