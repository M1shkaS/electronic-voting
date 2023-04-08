import './InfoVotingData.scss';

const InfoVotingData = ({infoVotingData}) => {
   let {uniqueLabelCorrection, encrBulletin, signRegistrarWithoutMask, secretVotingKey, bulleten} = infoVotingData;
   let strSign = signRegistrarWithoutMask.length > 125 ? signRegistrarWithoutMask.slice(0, 50)+"...":signRegistrarWithoutMask;
   let strEncr = encrBulletin.length > 125 ? encrBulletin.slice(0, 50)+"...":encrBulletin;
   return(
      <div className="info-for-voting-data">
         <h3>Метка избирателя</h3>
         <div className="info-for-voting-data__text">{uniqueLabelCorrection}</div>
         <h3>Зашифрованная бюллетень</h3>
         <div className="info-for-voting-data__text">{strEncr}</div>
         <h3>Подпись сервиса регистратора</h3>
         <div className="info-for-voting-data__text">{strSign}</div>
         <h3>Секретный ключ избирателя</h3>
         <div className="info-for-voting-data__text">{secretVotingKey ?secretVotingKey:"Данных нет"}</div>
         <h3>Голос избирателя</h3>
         <div className="info-for-voting-data__text">{bulleten ? bulleten:"Данных нет"}</div>
      </div>
   )
}

export default InfoVotingData;