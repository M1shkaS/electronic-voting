import { useState, useEffect } from 'react';
import PieChart from '../../components/PieChart/PieChart';
import FormPostData from '../../components/FormPostData/FormPostData';
import TableData from '../../components/TableData/TableData';
import Modal from '../../components/Modal/Modal';
import Timer from '../../components/Timer/Timer';
import sad from './sad.svg'
import tableDataStore from '../../stores/TableDataStore';
import InfoVotingData from '../../components/InfoVotingData/InfoVotingData';
import api from '../../api';

import './ResultVotingPage.scss';

const ResultVotingPage = () => {

   const [data, setData] = useState([]);
   const [modalActive, setModalActive] = useState(false);
   const [modalInfoVotingDataActive, setModalInfoVotingDataActive] = useState(false);
   const [infoVotingData, setInfoVotingData] = useState({});
    
   useEffect( () => {
      getData();
   } , [])

   const getData =  async() => {
      let res = await api.posts.getDataTable();
      if(res.length !== 0 ){
         tableDataStore.addTableData(res)
      }
     console.log(res);
      setData(res);
   }

 return(
   <>
   {data.length !==0 ?
      <div>
      <PieChart data={data} />
      {/* <Timer/> */}
      <div className='post-data'>
         <span className='info-btn'>Чтобы ваш голос был учтён отправьте свои данные, полученные при голосовании, нажав кнопку - </span>
         <button className='btn-open-modal' onClick={() => setModalActive(true)}>Отправить данные</button>
      </div>
      {data.length !== 0 ?
        <TableData  setActive={setModalActive} setInfoVotingData={setInfoVotingData} setModalInfoVotingDataActive={setModalInfoVotingDataActive}/>:
        null
      }
   </div>
   :<>
      <div className="empty-data">Данных пока нет</div>
      <img className='sad' src={sad} alt="sad" />
   </>
  
   
   
}
{
   modalActive ?
   <Modal active={modalActive} setActive={setModalActive} setModalInfoVotingDataActive={setModalInfoVotingDataActive}>
   {
      modalInfoVotingDataActive ?
      <InfoVotingData infoVotingData={infoVotingData}/> :
      <FormPostData setActive={setModalActive}/>
   }
   </Modal>
   :null
}

   </>
 )
}

export default ResultVotingPage;