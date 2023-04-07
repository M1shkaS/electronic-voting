import { KJUR } from "jsrsasign";

export function hash(pureText) {
  return KJUR.crypto.Util.md5(pureText);
}
