// import MD5 from "crypto-js/md5";
// import Base64 from "crypto-js/enc-base64";
import { KJUR } from "jsrsasign";
export function hash(pureText) {
  return KJUR.crypto.Util.md5(pureText);
  //   return Base64.stringify(MD5(pureText));
}
