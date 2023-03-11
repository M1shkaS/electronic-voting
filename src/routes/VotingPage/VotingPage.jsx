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
import logStore from '../../stores/LogStore';
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
         // logStore.addUserTextLog(`Пользователь создал пару ключей: (n, d) = ${privKey.n}, ${privKey.d}  (n, e) = ${pubKey.n}, ${pubKey.e}`)
         logStore.addUserTextLog(
         <div className="logUser__text" >
           <span>Пользователь создал пару ключей:</span><br/>
            (n, d) =  {privKey.n}, {privKey.d} <br/>
            (n, e) = {pubKey.n}, {pubKey.e}
         </div>)


         logStore.addAppTextLog(<div className="logUser__text" >
         <span>Пользователь создал пару ключей:</span><br/>
            (n, d) =  {privKey.n}, {privKey.d} <br/>
            (n, e) = {pubKey.n}, {pubKey.e}
         </div>)

         logStore.addUserTextLog(
            <div className="logUser__text" >
              <span>Пользователь сгенерировал секретный ключ для симметричного шифрования:</span><br/>
              {secretKey}
            </div>)
         
         logStore.addAppTextLog(
            <div className="logUser__text" >
              <span>Пользователь сгенерировал секретный ключ для симметричного шифрования:</span><br/>
              {secretKey}
            </div>
         )
         keyStoreVoter.postKeyVoter({privKey, pubKey}, secretKey);

         //Достём из kdc ключи регистратора и кладём свой открытый ключ туда
         let registrarKeyOpen = await api.posts.postKey(valuePass, pubKey);
         keyStoreVoter.postRegistrarKeyPub(+createNumberFromText(registrarKeyOpen));
         logStore.addUserTextLog(
            <div className="logUser__text" >
              <span>Пользователь получил из kdc открытый ключ регситратора:</span><br/>
              {registrarKeyOpen}
            </div>
         )


         // Генерируем случайный множитель
         let maskingFactor = maskingFactorGenerator();
         keyStoreVoter.postMaskingFactor(maskingFactor);
         // logStore.addUserTextLog(`Пользователь сгенерировал маскирующий множитель:  ${maskingFactor}`)
         logStore.addUserTextLog(
            <div className="logUser__text" >
              <span>Пользователь сгенерировал случайный маскирующий множитель:</span><br/>
              {maskingFactor}
            </div>)

         logStore.addAppTextLog(
            <div className="logUser__text" >
               <span>Пользователь сгенерировал случайный маскирующий множитель:</span><br/>
               {maskingFactor}
            </div>
         )
      }
   }

   if(auth === "nouser" || auth === "preparation"){
      return <Navigate to="/" replace={true} />
    }

   const setValueVotingByPerson = async(value) => {
      let secretKey = toJS(keyStoreVoter.keys.secrKey);
      // Шифруем
      let encryptVoting = AESEncrypt(value, secretKey);
      logStore.addUserTextLog(
         <div className="logUser__text" >
           <span>Зашифрованная бюллетень:</span><br/>
           {encryptVoting}
         </div>)
      logStore.addAppTextLog(
         <div className="logUser__text" >
            <span>Зашифрованная бюллетень:</span><br/>
            {encryptVoting}
         </div>
      )
      // console.log(encryptVoting);

      // Cкрываем с помощью множиеля и ключа регистратора
      let maskingFactor = toJS(keyStoreVoter.maskingFactor);

      let blindEncrByVoter = blind(encryptVoting, maskingFactor );
      // console.log("Замаскированная зашифрованная бюллетень множителем избирателя: " + blindEncrByVoter.toString());

      let numberKeyPubRegstr = toJS(keyStoreVoter.registrarKeyPub);

      let blindEncrByRegistrator = toJS(blind(blindEncrByVoter.toString(), numberKeyPubRegstr));
      // console.log("Замаскированная зашифрованная бюллетень открытым ключом регистратора: " + blindEncrByRegistrator.toString());

      logStore.addUserTextLog(
         <div className="logUser__text" >
           <span>Замаскированная зашифрованная бюллетень открытым ключом регистратора и множителем пользователя:</span><br/>
           {blindEncrByRegistrator.toString()}
         </div>)
      logStore.addAppTextLog(
         <div className="logUser__text" >
            <span>Замаскированная зашифрованная бюллетень открытым ключом регистратора и множителем пользователя:</span><br/>
            {blindEncrByRegistrator.toString()}
         </div>
      )

      let heshBlindEncr = hash( blindEncrByRegistrator);
      // console.log("Хеш замаскированного и зашифрованного бюллетеня: " + heshBlindEncr );
      
      let privKey = toJS(keyStoreVoter.keys.rsaKey.privKey);
      let signHeshBlindEncr = RSASign(heshBlindEncr, privKey )
      // console.log("Подпись избирателя: " + signHeshBlindEncr);
      logStore.addUserTextLog(
         <div className="logUser__text" >
           <span>Пользователь подписывает свою замаскированную бюллетень:</span><br/>
           {signHeshBlindEncr}
         </div>)
      logStore.addAppTextLog(
         <div className="logUser__text" >
            <span>Пользователь подписывает свою замаскированную бюллетень:</span><br/>
            {signHeshBlindEncr.toString()}
         </div>
      )

      let valuePass = localStorage.getItem('passport');
      let signRegistrator =  await api.posts.postEncryptMaskText(valuePass,signHeshBlindEncr,blindEncrByRegistrator);
      // console.log("Подпись регистратора: " + signRegistrator);

      logStore.addUserTextLog(
         <div className="logUser__text" >
           <span>Пользователь получил подпись регистратора:</span><br/>
           {signRegistrator}
         </div>)
      logStore.addAppTextLog(
         <div className="logUser__text" >
            <span>Регистратор проверил подпись пользователя: верная</span>
         </div>
      )
      
      logStore.addAppTextLog(
         <div className="logUser__text" >
            <span>Регистратор подписал скрытый зашифрованный бюллетень и отправил пользователю</span>
         </div>
      )
      logStore.addAppTextLog(
         <div className="logUser__text" >
            <span>Пользователь получил подпись регистратора:</span><br/>
            {signRegistrator}
         </div>
      )

      let blindReverseFirst = blindReverse(blindEncrByRegistrator, numberKeyPubRegstr);
      let blindReverseSecond = blindReverse(blindReverseFirst, maskingFactor);
      // console.log("Снятие маскирующих множителей: " + blindReverseSecond);
      logStore.addUserTextLog(
         <div className="logUser__text" >
           <span>Пользователь снял «маскирующий» множитель со слепой ЭЦП регистратора:</span><br/>
           {blindReverseSecond}
         </div>)
      logStore.addAppTextLog(
         <div className="logUser__text" >
            <span>Пользователь снял «маскирующий» множитель со слепой ЭЦП регистратора:</span><br/>
            {blindReverseSecond}
         </div>
      )
      let uniqueLabelCorrection = createUniqueLabelCorrection()
      // console.log("Уникальная метка: " + uniqueLabelCorrection);
          logStore.addUserTextLog(
         <div className="logUser__text" >
           <span>Пользователь сгенерировал уникальную метку:</span><br/>
           {uniqueLabelCorrection}
         </div>)
         logStore.addAppTextLog(
            <div className="logUser__text" >
               <span>Пользователь сгенерировал уникальную метку:</span><br/>
               {uniqueLabelCorrection}
            </div>
         )
       await api.posts.postEncryptCounter(uniqueLabelCorrection, encryptVoting,signRegistrator, blindEncrByRegistrator );
       logStore.addUserTextLog(
         <div className="logUser__text" >
           <span>Пользователь отправил счётчику свою метку, зашифрованный бюллетень и ЭЦП регистратора</span>
         </div>)
         logStore.addAppTextLog(
            <div className="logUser__text" >
               <span>Пользователь отправил счётчику свою метку, зашифрованный бюллетень и ЭЦП регистратора</span>
            </div>
         )
         logStore.addAppTextLog(
            <div className="logUser__text" >
               <span>Счётчик получил от пользователя метку, зашифрованный бюллетень и ЭЦП регистратора</span>
            </div>
         )
         logStore.addAppTextLog(
            <div className="logUser__text" >
               <span>Счётчик проверил ЭЦП регистратора: верная</span>
            </div>
         )
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