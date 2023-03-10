import { useState, useEffect } from 'react';
import {  toJS  } from "mobx";
import { keyGeneratorRSA, keyGeneratorEC, maskingFactorGenerator, createUniqueLabelCorrection } from '../../crypto-helper/keyGeneration';
import {  AESEncrypt } from '../../crypto-helper/aesCryptography';
import { blind, createNumberFromText, blindReverse } from '../../crypto-helper/blind';
import { RSASign } from '../../crypto-helper/rsaCryptography';
import { hash } from '../../crypto-helper/hash';
import keyStoreVoter from '../../stores/KeyStore';
import VotingForm from '../../components/VotingForm/VotingForm';
import ThanksMessage from '../../components/ThanksMessage/ThanksMessage';
import InfoForVoter from '../../components/InfoForVoter/InfoForVoter';
import api from '../../api';
import { Navigate} from "react-router-dom";
import './VotingPage.scss';


const VotingPage = () => {
   const [valueVoting, setValueVoting] = useState(null);
   const [auth, setAuth] = useState("");
   const [uniqueLabelCorrection, setUniqueLabelCorrection]  = useState("");

   useEffect( () => {
      if(localStorage.getItem('passport')){
        let valuePass = localStorage.getItem('passport');
        loginPerson(valuePass)
      }else{
         setAuth("nouser")
      }
   } , [])

   const loginPerson =  async(valuePass) => {
      let res = await api.posts.postPerson(valuePass);
      setAuth(res);
      if(res === "went"){
         //Генерируем ключи
         let {privKey, pubKey} = keyGeneratorRSA();
         let secretKey = keyGeneratorEC();
         console.log(secretKey);
         keyStoreVoter.postKeyVoter({privKey, pubKey}, secretKey);

         //Достём из kdc ключи регистратора и кладём свой открытый ключ туда
         let registrarKeyOpen = await api.posts.postKey(valuePass, pubKey);

         keyStoreVoter.postRegistrarKeyPub(+createNumberFromText(registrarKeyOpen));

         // Генерируем случайный множитель
         let maskingFactor = maskingFactorGenerator();
         keyStoreVoter.postMaskingFactor(maskingFactor);

      }
   }

   if(auth === "nouser" || auth === "preparation"){
      return <Navigate to="/" replace={true} />
    }

   const setValueVotingByPerson = async(value) => {
      let secretKey = toJS(keyStoreVoter.keys.secrKey);
      // Шифруем
      let encryptVoting = AESEncrypt(value, secretKey);
      console.log(encryptVoting);
      // Cкрываем с помощью множиеля и ключа регистратора
      let maskingFactor = toJS(keyStoreVoter.maskingFactor);

      let blindEncrByVoter = blind(encryptVoting, maskingFactor );
      console.log("Замаскированная зашифрованная бюллетень множителем избирателя: " + blindEncrByVoter.toString());

      let numberKeyPubRegstr = toJS(keyStoreVoter.registrarKeyPub);

      let blindEncrByRegistrator = toJS(blind(blindEncrByVoter.toString(), numberKeyPubRegstr));
      console.log("Замаскированная зашифрованная бюллетень открытым ключом регистратора: " + blindEncrByRegistrator.toString());

      let heshBlindEncr = hash( blindEncrByRegistrator);

      console.log("Хеш замаскированного и зашифрованного бюллетеня: " + heshBlindEncr );
      
      let privKey = toJS(keyStoreVoter.keys.rsaKey.privKey);
      let signHeshBlindEncr = RSASign(heshBlindEncr, privKey )
      console.log("Подпись избирателя: " + signHeshBlindEncr);

      let valuePass = localStorage.getItem('passport');
      let signRegistrator =  await api.posts.postEncryptMaskText(valuePass,signHeshBlindEncr,blindEncrByRegistrator);
      
      console.log("Подпись регистратора: " + signRegistrator);

      let blindReverseFirst = blindReverse(blindEncrByRegistrator, numberKeyPubRegstr);
      let blindReverseSecond = blindReverse(blindReverseFirst, maskingFactor);
      console.log("Снятие маскирующих множителей: " + blindReverseSecond);

      let uniqueLabelCorrection = createUniqueLabelCorrection()
      console.log("Уникальная метка: " + uniqueLabelCorrection);
    

       await api.posts.postEncryptCounter(uniqueLabelCorrection, encryptVoting,signRegistrator, blindEncrByRegistrator );

       setUniqueLabelCorrection(uniqueLabelCorrection);
      setValueVoting(true);
   }
let secretKey = toJS(keyStoreVoter.keys.secrKey);
return (
   <div className="limiter">
   <div className="container-login10">
      <div className="wrap-login10">
         {valueVoting !== null? 
             <ThanksMessage/>
             : 
            <VotingForm setValueVotingByPerson={setValueVotingByPerson}/>
         }
      </div>
      { valueVoting !== null? 
         <InfoForVoter uniqueLabelCorrection={uniqueLabelCorrection}  secretKey={secretKey}/>:
         null
      }
   </div>
   </div>
)
}

export default VotingPage;