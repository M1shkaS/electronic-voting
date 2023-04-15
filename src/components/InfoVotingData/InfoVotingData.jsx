import './InfoVotingData.scss';

const InfoVotingData = ({infoVotingData}) => {
   let {uniqueLabelCorrection, encryptVoting, unblinded, secretVotingKey, bulleten} = infoVotingData;
   let strSign = unblinded.length > 125 ? unblinded.slice(0, 50)+"...":unblinded;
   let strEncr = encryptVoting.length > 125 ? encryptVoting.slice(0, 50)+"...":encryptVoting;
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