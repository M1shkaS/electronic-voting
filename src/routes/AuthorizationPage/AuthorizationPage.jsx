import {
   Formik,
   Form,
   Field 
 } from 'formik';
import { Navigate, Link } from "react-router-dom";

import { useState } from 'react';

import './AuthorizationPage.scss';

import api from '../../api';


const AuthorizationPage = () => {

   const [valuePassp, setValuePassp] = useState('');
   const [auth, setAuth] = useState(false);
   const [voting, setVoting] = useState(false);
   const [errorMessageByServer, setErrorMessageByServer] = useState("");

   let classNameInputPass ="input100" ;
   if(valuePassp.length !== 0){
      classNameInputPass += ' has-val';
   }
   if(auth){
     return <Navigate to="/voting" replace={true} />
   }
   const loginPerson = async () => {
      let res;
      if(valuePassp.length !== 0  ){
         res = await api.posts.postPerson(valuePassp);
         if(res === "registered"){
            setAuth(true);
            localStorage.setItem('passport', valuePassp);
         }else{
            setVoting(true);
            setValuePassp("");
            if(res === "nouser"){
               setErrorMessageByServer('Вы ввели неправильные данные')
            }else{
               setErrorMessageByServer('Вы уже проголосовали, второй раз голосовать нельзя')
            }
         }
      }
   }

  return (
      <div className="limiter">
      <div className="container-login100">
         <div className="wrap-login100">
            <Formik   
            initialValues={{
               pass: ''
            }}
            onSubmit={() => {
               loginPerson()
            }}>
            <Form className="login100-form validate-form">
               <span className="login100-form-title p-b-26">
                  Подтверждение участия
               </span>
            <div></div>
               <div className="wrap-input100 validate-input" data-validate="Enter password">
                  <Field  className={classNameInputPass} type="number" name="pass" value={valuePassp} onChange={(e) =>{
                        setValuePassp(e.target.value)
                  } }/>
                  <span className="focus-input100" data-placeholder="Паспорт"></span>
               </div>
               {(voting && valuePassp.length == 0)?
                <div className='input-error'>{errorMessageByServer}</div>
                : null}
               <div className="wrap-info">
                  <ul>
                     <li className='wrap-info-item'>Голосование проводится с 8.00 до 20.00; </li>
                     <li className='wrap-info-item'>Вы можете проголосовать только один раз;</li>
                     <li className='wrap-info-item'>Ваш бюллетень, только если вы нажмёте кнопку 'Проголосовать' на странице электронного бюллетеня;</li>
                     <li className='wrap-info-item'>После того как вы будете перенаправлены на страницу электронного бюллетеня для голосования, у вас будет 15 минут для того, чтобы осуществить свой выбор;</li>
                     <li className='wrap-info-item'>Электронная бюллетень выдаётся только один раз, при попытке обновить страницу или если вы закроете вкладку, ваш голос учтён не будет и получить бюллетень повторно будет невозможно</li>
                     <li className='wrap-info-item'>Проверьте, чтобы ваше интернет-соединение было стабильно, в случае, если при загрузке электронного бюллетеня у васпрервётся соединение, ваш голос учтён не будет;</li>
                     <li className='wrap-info-item'>Если вы голосуете с мобильного телефона, советуем отключить подключение к wi-fi cетям;</li>
                  </ul>
               </div>
               <div className="container-login100-form-btn">
                  <div className="wrap-login100-form-btn">
                     <div className="login100-form-bgbtn"></div>
                     <button className="login100-form-btn"  type="submit">
                        Приступить к голосованию
                     </button>
                  </div>
                  <Link to='/watchtable' className="wrap-login100-form-btn link">
                     <div className="login100-form-bgbtn"></div>
                     <button className="login100-form-btn"  type="submit">
                        Наблюдать
                     </button>
                  </Link>
               </div>
            </Form>
            </Formik>
         </div>
      </div>
      </div>
  );
};

export default AuthorizationPage;
