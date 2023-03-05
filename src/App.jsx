import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import {AESEncrypt, AESDecrypt} from "./crypto-helper/aesCryptography";
import { RSASign,RSASignVerify } from "./crypto-helper/rsaCryptography";
import { hash } from "./crypto-helper/hash";
import { blind, blindReverse, createNumberFromText } from "./crypto-helper/blind";
import { keyGeneratorRSA, keyGeneratorEC, maskingFactorGenerator } from "./crypto-helper/keyGeneration";
import AuthorizationPage from "./routes/AuthorizationPage/AuthorizationPage";
import VotingPage from "./routes/VotingPage/VotingPage";
import Layout from "./components/Layout/Layout";
import ResultVotingPage from "./routes/ResultVotingPage/ResultVotingPage";

import './style/style.scss';
import './style/util.scss';

const App = () => {
   // Регистратора ключи
//    let registratorKey = keyGeneratorRSA();
//    // console.log(registratorKey);
//    let numberKeyPubRegstr = +createNumberFromText(registratorKey.pubKey.e)

//    // Избирателя ключи
//    let {privKey, pubKey} = keyGeneratorRSA();
//    console.log(pubKey);
//    console.log(privKey);
//    let secretKey = keyGeneratorEC();

//    let ciphertext = AESEncrypt("1", secretKey);
//    console.log("Зашифрованная бюллетень: " + ciphertext);

//    let maskingFactor = maskingFactorGenerator();
// // console.log(0);
//    let blindEncrByVoter = blind(ciphertext, maskingFactor );
//    console.log("Замаскированная зашифрованная бюллетень множителем избирателя: " + blindEncrByVoter.toString());
// //    console.log(0);
//    let blindEncrByRegistrator = blind(blindEncrByVoter.toString(), numberKeyPubRegstr);
//    console.log("Замаскированная зашифрованная бюллетень открытым ключом регистратора: " + blindEncrByRegistrator.toString());

//    let heshBlindEncr = hash(blindEncrByRegistrator);
//    console.log("Хеш замаскированного и зашифрованного бюллетеня: " + heshBlindEncr );

//    let signHeshBlindEncr = RSASign(heshBlindEncr,privKey )
//    console.log("Подпись избирателя: " + signHeshBlindEncr);

//    // -----?Регистратор---------------
//    console.log("Проверка ЭЦП: " +  RSASignVerify(signHeshBlindEncr, heshBlindEncr,pubKey ));

//    let signBlindEncrByRegistrator = RSASign(blindEncrByRegistrator,registratorKey.privKey )
//    console.log("Подпись регистратора: " + signBlindEncrByRegistrator);

//    let resFirst = blindReverse(blindEncrByRegistrator, numberKeyPubRegstr);
//    let resSecond = blindReverse(resFirst, maskingFactor);

//    // console.log(resSecond);
//    let h = hash(resSecond);
//    let ver = RSASignVerify(signBlindEncrByRegistrator, h, registratorKey.pubKey  )
//    console.log(ver);

//    // Счётчик
//    // Должен проперить эцп

//    let golos = AESDecrypt(resSecond,  secretKey);
//    console.log(golos);

   //Мусор

//    let signBlindEncrByRegistrator = RSASign(blindEncrByRegistrator,registratorKey.privKey )
//    console.log("Подпись регистратора: " + signBlindEncrByRegistrator);

//    let b = createNumberFromText(signBlindEncrByRegistrator) ;
//    console.log(b);
//    let a = blindReverse(b, maskingFactor, true);
// console.log(a);
// console.log("Проверка ЭЦП: " +  RSASignVerify(a, heshBlindEncr,registratorKey.pubKey ));




   // let unBlind = blindReverse(blindEncrByRegistrator, numberKeyPubRegstr);
   // let unBlind2 = blindReverse(unBlind, maskingFactor);
   // console.log(unBlind2 );
   // console.log(unBlind2 === ciphertext);
  
   // let aesCipherText = AESEncrypt("1");
   // blind(aesCipherText.ciphertext);

// console.log(hash("1"));
   // let res2 = RSASign(1);
   // let res1 = RSASign(1);
   // let res2 = RSASign(1);
   // console.log(res1.signature);


   // console.log(res2.signature);
   // console.log(RSASignVerify(res1.signature, 1, res1.pubKey));
   // console.log(RSASignVerify(res2.signature, 1, res2.pubKey));
   // console.log(RSASignVerify(res2.signature, res2.keypair.publicKey, res2.md));
   // console.log(RSASign(1));
   // console.log(RSASign(1));
   // console.log(RSASign(1));
   // console.log(RSASign(1));
   // let {ciphertext, privKey } = AESEncrypt("1");
   // console.log(ciphertext);
   // console.log(AESDecrypt(ciphertext, privKey));
  return(
  <div className="app">
   <Router>
      <Routes>
         <Route path="/" element={<Layout/>}>
            <Route path="/" element={<AuthorizationPage />}/>
            <Route path="/watcher" element={<ResultVotingPage/>}/>
            <Route path="/voting" element={<VotingPage />}/>
         </Route>
      </Routes>
   </Router>
   </div>) ;
};

export default App;
