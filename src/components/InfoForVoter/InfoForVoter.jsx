import {CopyToClipboard} from 'react-copy-to-clipboard';
import copy from './copy.png'
import './InfoForVoter.scss';

 
 const InfoForVoter = ({uniqueLabelCorrection}) => {

    return (
      <div className="info-for-voter">
         <div className="info-for-voter__block">
            <h3 className="info-for-voter__header">Уникальная метка</h3>
            <p className="info-for-voter__descr">С помощью неё вы можете проверить, что ваш голос посчитан в таблице.</p>
            <div className="info-for-voter__block">
               <input className='info-for-voter__text' readOnly defaultValue={uniqueLabelCorrection}  id="kopirovaniya-teksta-first"/>
               <CopyToClipboard text={uniqueLabelCorrection}>
                  <button><img src={copy} alt="copy" /></button>
               </CopyToClipboard>
            </div>
         </div>
      </div>
    );
};

export default InfoForVoter;