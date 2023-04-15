import { useState, useEffect } from 'react';
import {  toJS  } from "mobx";
import {  AESEncrypt } from '../../services/aesCryptography';

import keyStoreVoter from '../../stores/KeyStore';
import VotingForm from '../../components/VotingForm/VotingForm';
import ThanksMessage from '../../components/ThanksMessage/ThanksMessage';
import InfoForVoter from '../../components/InfoForVoter/InfoForVoter';
import logStore from '../../stores/LogStore';
import api from '../../api';
import { Navigate} from "react-router-dom";
import './VotingPage.scss';

const {keyGeneratorEC,keyGeneratorForVotRSA, createUniqueLabelCorrection} = require('../../services/keyGeneration');
const { hash } = require('../../services/hash');
const { RSASign,  RSASignVerifyBlind } = require('../../services/rsaSign');
const { unBlindMessages, blindMessages } = require('../../services/blind');



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
      try{
         let res = await api.posts.postPerson(valuePass);
         setAuth(res);
         if(res === "went"){
            //Генерируем ключи
            let {privKey, pubKey} = keyGeneratorForVotRSA();
            let secretKey = keyGeneratorEC();
            // logStore.addUserTextLog(`Пользователь создал пару ключей: (n, d) = ${privKey.n}, ${privKey.d}  (n, e) = ${pubKey.n}, ${pubKey.e}`)
            logStore.addUserTextLog(
            <div className="logUser__text"  >
               <span>Пользователь создал пару ключей:</span><br/>
               <span>(n, d) </span>  = <br/> n = {privKey.n},  <br/> d = {privKey.d} <br/>
               <span>(n, e) </span> = <br/> n = {pubKey.n},  <br/> e = {pubKey.e}
            </div>)


            logStore.addAppTextLog(<div className="logUser__text"  >
            <span>Пользователь создал пару ключей:</span><br/>
               <span>(n, d) </span>  = <br/> n = {privKey.n},  <br/> d = {privKey.d} <br/>
               <span>(n, e) </span> = <br/> n = {pubKey.n},  <br/> e = {pubKey.e}
            </div>)

            logStore.addUserTextLog(
               <div className="logUser__text"  >
                  <span>Пользователь сгенерировал секретный ключ для симметричного шифрования:</span><br/>
                  {secretKey}
               </div>)
            
            logStore.addAppTextLog(
               <div className="logUser__text"  >
                  <span>Пользователь сгенерировал секретный ключ для симметричного шифрования:</span><br/>
                  {secretKey}
               </div>
            )
            keyStoreVoter.postKeyVoter({privKey, pubKey}, secretKey);

            //Достём из kdc открытый ключ регистратора и отправляем свой открытый ключ туда
            let registrarKeyOpen = await api.posts.postKey(valuePass, pubKey);

            keyStoreVoter.postRegistrarKeyPub(registrarKeyOpen);
            logStore.addUserTextLog(
               <div className="logUser__text" >
                  <span>Пользователь получил из kdc открытый ключ регситратора:</span><br/>
                  <span>(n, e) </span>  <br/> n = {registrarKeyOpen.n},  <br/> e = {registrarKeyOpen.e} <br/>
               </div>
            )

         }
      }
      catch(err){
         console.log("Что-то пошло не так!!");
         setAuth("nouser");

      }
   }

   //Обработка голоса избирателя
   const setValueVotingByPerson = async(value) => {
      try{
      let secretKey = toJS(keyStoreVoter.keys.secrKey);
      // Шифруем
      let encryptVoting = AESEncrypt(value, secretKey);
      logStore.addUserTextLog(
         <div className="logUser__text" >
           <span>Пользователь зашифровал бюллетень:</span><br/>
           {encryptVoting}
         </div>)
      logStore.addAppTextLog(
         <div className="logUser__text" >
            <span>Пользователь зашифровал бюллетень:</span><br/>
            {encryptVoting}
         </div>
      )
      
      //Маскируем зашифрованный текст

      let {blinded, r} = blindMessages(encryptVoting, toJS(keyStoreVoter.registrarKeyPub));

         logStore.addUserTextLog(
            <div className="logUser__text" >
              <span>Пользователь сгенерировал случайный маскирующий множитель:</span><br/>
              {r.toString()}
            </div>)

         logStore.addAppTextLog(
            <div className="logUser__text" >
               <span>Пользователь сгенерировал случайный маскирующий множитель:</span><br/>
               {r.toString()}
            </div>
         )

      keyStoreVoter.postMaskingFactor(r);

      logStore.addUserTextLog(
         <div className="logUser__text" >
           <span>Замаскированная зашифрованная бюллетень с помощью маскрирующего множителя:</span><br/>
           {blinded.toString()}
         </div>)
      logStore.addAppTextLog(
         <div className="logUser__text" >
            <span>Замаскированная зашифрованная бюллетень с помощью маскрирующего множителя:</span><br/>
           {blinded.toString()}
         </div>
      )

      //Вычисляем хеш-образ
      let heshBlindEncr = hash(blinded.toString());
      logStore.addUserTextLog(
         <div className="logUser__text" >
           <span>Пользователь вычислил хеш-образ замаскированного бюллетеня:</span><br/>
           {heshBlindEncr}
         </div>)
      logStore.addAppTextLog(
         <div className="logUser__text" >
            <span>Пользователь вычислил хеш-образ замаскированного бюллетеня:</span><br/>
           {heshBlindEncr}
         </div>
      )

      //Пользователь подписал хеш-образ замаскированного бюллетеня
      let privKey = toJS(keyStoreVoter.keys.rsaKey.privKey);
      let signHeshBlindEncr = RSASign(heshBlindEncr, privKey );

      logStore.addUserTextLog(
         <div className="logUser__text" >
           <span>Пользователь подписал хеш-образ замаскированного бюллетеня:</span><br/>
           {signHeshBlindEncr}
         </div>)
      logStore.addAppTextLog(
         <div className="logUser__text" >
            <span>Пользователь подписал хеш-образ замаскированного бюллетеня:</span><br/>
            {signHeshBlindEncr.toString()}
         </div>
      )

      //Отправляем регистратору (id, скрытый зашиф. бюл., и ЭЦП свою )
      //Также получаем ЭЦП регистратора замаскированного заш. бюл.
      let valuePass = localStorage.getItem('passport');

      logStore.addUserTextLog(
         <div className="logUser__text" >
           <span>Пользователь посылает регистратору(id, скрытый зашифрованный бюллетень и свою ЭЦП к нему )</span><br/>
         </div>)
      logStore.addAppTextLog(
         <div className="logUser__text" >
            <span>Пользователь посылает регистратору(id, скрытый зашифрованный бюллетень и свою ЭЦП к нему )</span><br/>
         </div>)

      let {signByRegistrator} = await api.posts.postEncryptMaskText(valuePass,signHeshBlindEncr,blinded.toString());
      
      logStore.addAppTextLog(
         <div className="logUser__text" >
            <span>Регистратор проверил подпись пользователя: {signByRegistrator? "Подпись верна!": "Подпись неверна!"}</span>
         </div>
      );
      if(!signByRegistrator){
         throw new Error();
      }

      logStore.addUserTextLog(
         <div className="logUser__text" >
           <span>Регистратор подписал скрытый зашифрованный бюллетень и отправил избирателю:</span><br/>
           {signByRegistrator.toString()}
         </div>)
      logStore.addAppTextLog(
         <div className="logUser__text" >
            <span>Регистратор подписал скрытый зашифрованный бюллетень и отправил избирателю:</span><br/>
            {signByRegistrator.toString()}
         </div>)
      

      let keyRegistrarN = toJS(keyStoreVoter.registrarKeyPub.n);
      let keyRegistrarE = toJS(keyStoreVoter.registrarKeyPub.e);

      //Снимаем маск. множитель
      const unblinded = unBlindMessages( signByRegistrator, keyRegistrarN, r);

      logStore.addUserTextLog(
         <div className="logUser__text" >
           <span>Пользователь снял маскриующий множитель с ЭЦП регистратора:</span><br/>
           {unblinded.toString()}
         </div>)
      logStore.addAppTextLog(
         <div className="logUser__text" >
            <span>Пользователь снял маскриующий множитель с ЭЦП регистратора:</span><br/>
            {unblinded.toString()}
         </div>
      )
      
      //Проверяем ЭЦП регистратора со снятым множителем
      const result = RSASignVerifyBlind(unblinded, keyRegistrarN,keyRegistrarE, encryptVoting );
     
      logStore.addUserTextLog(
         <div className="logUser__text" >
           <span>Пользователь проверил ЭЦП регистратора: {result? "Подпись верна!": "Подпись неверна!"}</span><br/>
         </div>)
      logStore.addAppTextLog(
         <div className="logUser__text" >
            <span>Пользователь проверил ЭЦП регистратора: {result? "Подпись верна!": "Подпись неверна!"}</span><br/>
         </div>
      )
      if (!result) {
         throw new Error();
       } 

      //Генерация уникальной метки
      let uniqueLabelCorrection = createUniqueLabelCorrection()

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

      //Избиратель отправляет счётчику свою метку, зашифрованный бюллетень и ЭЦП регистратора
      logStore.addUserTextLog(
         <div className="logUser__text" >
            <span>Пользователь отправил счётчику свою метку, зашифрованный бюллетень и ЭЦП регистратора</span><br/>
            <span>Метка: </span>{uniqueLabelCorrection} <br/>
            <span>Зашифрованная бюллетень: </span>{encryptVoting}<br/>
            <span>ЭЦП регистратора: </span>{unblinded.toString()}
         </div>)
      logStore.addAppTextLog(
         <div className="logUser__text" >
         <span>Пользователь отправил счётчику свою метку, зашифрованный бюллетень и ЭЦП регистратора</span><br/>
         <span>Метка: </span>{uniqueLabelCorrection} <br/>
         <span>Зашифрованная бюллетень: </span>{encryptVoting}<br/>
         <span>ЭЦП регистратора: </span>{unblinded.toString()}
      </div>)

     let resByCounter =  await api.posts.postEncryptCounter(uniqueLabelCorrection, encryptVoting, unblinded.toString());
     logStore.addAppTextLog(
      <div className="logUser__text" >
         <span>Счётчик проверил ЭЦП регистратора: {resByCounter? "Подпись верна!": "Подпись неверна!"}</span>
      </div>
   );
     if(!resByCounter){
         throw new Error();
      }

       setUniqueLabelCorrection(uniqueLabelCorrection);
       setValueVoting(true);

      //Как закончится время голосования отправляем секретный ключ
      await api.posts.postVotingKey(uniqueLabelCorrection, secretKey);
      let getTimeInterval =  setInterval(async () =>{
         let res =  await api.posts.getRemainingTime();
         if(res === "isEnd"){
            await api.posts.postVotingKey(uniqueLabelCorrection, secretKey);

            logStore.addUserTextLog(
               <div className="logUser__text" >
                  <span>Пользователь отправил счётчику свою метку, секретный ключ</span>
               </div>
            )
            logStore.addAppTextLog(
               <div className="logUser__text" >
                  <span>Счётчик получил уникальную метку и секретный ключ, и расшифровал нужный бюллетень </span>
               </div>
            )
            clearInterval(getTimeInterval);
         }
      }, 5000)
      }
      catch(err){
         console.log("Что-то пошло не так!!");
         setAuth("nouser");
      }
   }

   if(auth === "nouser" || auth === "preparation"){
      return <Navigate to="/" replace={true} />
   }

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
         <InfoForVoter uniqueLabelCorrection={uniqueLabelCorrection} />:
         null
      }
   </div>
   </div>
)
}

export default VotingPage;