const BlindSignature = require("blind-signatures");

//Маскируем сообщение
function blindMessages(text, { n, e }) {
  const { blinded, r } = BlindSignature.blind({
    message: text,
    N: n,
    E: e,
  });

  return { blinded, r };
}
//Снимаем маскирующий с ЭЦП
function unBlindMessages(signByRegistrator, keyN, r) {
  const unblinded = BlindSignature.unblind({
    signed: signByRegistrator,
    N: keyN,
    r: r.toString(),
  });

  return unblinded;
}

module.exports = {
  blindMessages,
  unBlindMessages,
};
