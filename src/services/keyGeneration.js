const { KEYUTIL } = require("jsrsasign");
const BlindSignature = require("blind-signatures");

function keyGeneratorRSA() {
  let rsaKeyPair = BlindSignature.keyGeneration({ b: 512 });

  let privKey = {
    d: rsaKeyPair.keyPair.d.toString(),
    n: rsaKeyPair.keyPair.n.toString(),
  };
  let pubKey = {
    e: rsaKeyPair.keyPair.e.toString(),
    n: rsaKeyPair.keyPair.n.toString(),
  };

  return { privKey, pubKey, rsaKeyPair };
}

function keyGeneratorEC() {
  let ecKeypair = KEYUTIL.generateKeypair("EC", "secp256r1");
  let privKey = KEYUTIL.getJWK(ecKeypair.prvKeyObj).d;

  return privKey;
}

function keyGeneratorForVotRSA() {
  let rsaKeypair = KEYUTIL.generateKeypair("RSA", 1024);

  let privKey = KEYUTIL.getJWK(rsaKeypair.prvKeyObj);
  let pubKey = KEYUTIL.getJWK(rsaKeypair.pubKeyObj);

  return { privKey, pubKey };
}

function maskingFactorGenerator(min = 1, max = 100000000000) {
  let rand = min - 0.5 + Math.random() * (max - min + 1);
  return Math.round(rand);
}

function createUniqueLabelCorrection() {
  let alphabet = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ",
    word = "";
  for (let i = 0; i < 6; i++) {
    word += alphabet[Math.round(Math.random() * (alphabet.length - 1))];
    word += maskingFactorGenerator(1, 20);
  }

  return word;
}
module.exports = {
  keyGeneratorRSA,
  keyGeneratorEC,
  createUniqueLabelCorrection,
  keyGeneratorForVotRSA,
};
