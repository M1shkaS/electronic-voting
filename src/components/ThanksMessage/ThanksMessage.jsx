import {  Link } from "react-router-dom";
import './ThanksMessage.scss';
import logStore from "../../stores/LogStore";
const ThanksMessage = () => {
       
   logStore.addAppTextLog(
      <div className="logUser__text" >
         <span>Счётчик публикет: уникальные метки, зашифрованные бюллетени, эца регистратора</span>
      </div>
   )
   return(
      <div className="thanks-message">
      <h2 className="thanks-message__title">Спасибо за ваш голос!</h2>
      <div className="thanks-message__body">Ваш голос в электронном голосовании принят! Информация об идентификаторах вашего голоса - в нижней части страницы.</div>
      <Link to='/watcher' className="wrap-login100-form-btn link-thanks">
         <div className="login100-form-bgbtn"></div>
         <button className="login100-form-btn"  type="submit">
            Наблюдать
         </button>
      </Link>
      </div>
   )
}

export default ThanksMessage;