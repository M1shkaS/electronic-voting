const { KJUR } = require("jsrsasign");
const BlindSignature = require("blind-signatures");

function RSASign(pureText, privKey) {
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

function RSASignVerify(signature, text, pubKey) {
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

function RSASignBlind(blinded, key) {
  try {
    const signed = BlindSignature.sign({
      blinded: blinded,
      key: key,
    });

    return signed;
  } catch (err) {
    return "Невозможно подписать";
  }
}

function RSASignVerifyBlind(unblinded, keyN, keyE, text) {
  try {
    const result = BlindSignature.verify({
      unblinded: unblinded.toString(),
      N: keyN,
      E: keyE,
      message: text,
    });
    return result;
  } catch (err) {
    return "Невозможно проверить подпись";
  }
}
module.exports = {
  RSASign,
  RSASignVerify,
  RSASignBlind,
  RSASignVerifyBlind,
};
