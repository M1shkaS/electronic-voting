import './InfoForVoter.scss';
 
 const InfoForVoter = ({uniqueLabelCorrection, secretKey}) => {

    return (
      <div className="info-for-voter">
         <h3 className="info-for-voter__header">Уникальная метка</h3>
         <p className="info-for-voter__descr">С помощью неё вы можете проверить, что ваш голос засчтан(в таблице)</p>
         <input className='info-for-voter__text' defaultValue={uniqueLabelCorrection}  id="kopirovaniya-teksta"/>
         <h3 className="info-for-voter__header">Ваш секретный ключ</h3>
         <p className="info-for-voter__descr">После окончания времени голосования вы должны его отправить и вашу метку, чтобы ваш голос можно было расшифровать </p>
         <input className='info-for-voter__text-key' defaultValue={secretKey}  id="kopirovaniya-teksta"/>
      </div>
    );
};

export default InfoForVoter;