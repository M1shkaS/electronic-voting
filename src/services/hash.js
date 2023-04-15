const { KJUR } = require("jsrsasign");

function hash(pureText) {
  return KJUR.crypto.Util.md5(pureText);
}
module.exports = { hash };
