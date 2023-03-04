import { KEYUTIL } from "jsrsasign";

export function keyGeneratorRSA() {
  let rsaKeypair = KEYUTIL.generateKeypair("RSA", 1024);
  let privKey = KEYUTIL.getJWK(rsaKeypair.prvKeyObj);
  let pubKey = KEYUTIL.getJWK(rsaKeypair.pubKeyObj);

  return { privKey, pubKey };
}

export function keyGeneratorEC() {
  let ecKeypair = KEYUTIL.generateKeypair("EC", "secp256r1");
  let privKey = KEYUTIL.getJWK(ecKeypair.prvKeyObj).d;

  return privKey;
}

export function maskingFactorGenerator(min = 1, max = 100000000000) {
  let rand = min - 0.5 + Math.random() * (max - min + 1);
  return Math.round(rand);
}