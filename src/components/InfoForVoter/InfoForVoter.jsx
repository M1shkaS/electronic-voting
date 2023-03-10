import {CopyToClipboard} from 'react-copy-to-clipboard';
import copy from './copy.png'
import './InfoForVoter.scss';

 
 const InfoForVoter = ({uniqueLabelCorrection, secretKey}) => {

    return (
      <div className="info-for-voter">
         <h3 className="info-for-voter__header">Уникальная метка</h3>
         <p className="info-for-voter__descr">С помощью неё вы можете проверить, что ваш голос засчитан(в таблице), но не посчитан</p>
         <div className="info-for-voter__block">
            <input className='info-for-voter__text' readOnly defaultValue={uniqueLabelCorrection}  id="kopirovaniya-teksta-first"/>
            <CopyToClipboard text={uniqueLabelCorrection}>
               <button><img src={copy} alt="copy" /></button>
            </CopyToClipboard>
         </div>
         <h3 className="info-for-voter__header">Ваш секретный ключ</h3>
         <p className="info-for-voter__descr">После окончания времени голосования вы должны его вместе с меткой, чтобы ваш голос можно было посчитать </p>

         <div className="info-for-voter__block">
            <input className='info-for-voter__text-key' readOnly defaultValue={secretKey}  id="kopirovaniya-teksta"/>
            <CopyToClipboard text={secretKey}>
               <button><img src={copy} alt="copy" /></button>
            </CopyToClipboard>
         </div>
 
      </div>
    );
};

export default InfoForVoter;