import bigInt from "big-integer";
import { KEYUTIL } from "jsrsasign";
const CryptoJS = require("crypto-js");

const dynamicValue = "12/12/2021"; // Could use a date or something dynamic

export function AESEncrypt(pureText) {
  let ecKeypair = KEYUTIL.generateKeypair("EC", "secp256r1");
  let privKey = KEYUTIL.getJWK(ecKeypair.prvKeyObj).d;
  let ciphertext = encodeURIComponent(
    CryptoJS.AES.encrypt(JSON.stringify(pureText), privKey).toString()
  );

  const result = [];
  for (let i = 0; i < ciphertext.length; i++) {
    result.push(ciphertext.charCodeAt(i).toString(2));
  }
  //   console.log("Кодировка- ");
  //   console.log(result);

  //   console.log(String.fromCharCode(...result));

  let str = "";
  for (let i = 0; i < result.length; i++) {
    str += String.fromCharCode(parseInt(result[i], 2));
  }
  console.log(str);

  let num = [];
  for (let i = 0; i < result.length; i++) {
    num.push(result[i]);
  }
  console.log(num);

  let res = [];
  for (let i = 0; i < num.length; i++) {
    res.push(parseInt(num[i], 2));
  }
  console.log(res);

  let res2 = "";
  for (let i = 0; i < res.length; i++) {
    res2 += res[i] + "000";
  }
  console.log(bigInt(res2));
  //   console.log(bigInt(bigInt(res2) * bigInt(3)));
  let abc = bigInt(res2).multiply(3);
  //   console.log(abc.length);

  let strNull = bigInt(abc).divide(3).toString();
  console.log(strNull.length);

  let counter = 0;
  let arrNum = [];
  let check = 0;

  for (let i = 0; i < strNull.length; i++) {
    if (counter === 3 && strNull[i] !== 0) {
      counter = 0;
    }
    if (strNull[i] === 0) {
      counter++;
    }
  }
  return { ciphertext, privKey };
}

export function AESDecrypt(encryptedText, privKey) {
  const privateKey = privKey;
  let bytes = CryptoJS.AES.decrypt(
    decodeURIComponent(encryptedText),
    privateKey
  );
  let decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
  return decryptedData;
}

// let res2 = "";
// for (let i = 0; i < res.length; i++) {
//   res2 += res[i];
// }
// console.log(bigInt(res2));
// //   console.log(bigInt(bigInt(res2) * bigInt(3)));
// let abc = bigInt(res2).multiply(3);
// console.log(abc);
// console.log(bigInt(abc).divide(3));

// watcher
