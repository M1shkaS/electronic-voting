import { useState, useEffect } from 'react';
import PieChart from '../../components/PieChart/PieChart';
import FormPostData from '../../components/FormPostData/FormPostData';
import TableData from '../../components/TableData/TableData';
import Modal from '../../components/Modal/Modal';
import Timer from '../../components/Timer/Timer';
import api from '../../api';

import './ResultVotingPage.scss';

const ResultVotingPage = () => {

   const [data, setData] = useState([]);
   const [modalActive, setModalActive] = useState(false);
    
   useEffect( () => {
      getData();
   } , [])

   const getData =  async() => {
      let res = await api.posts.getDataTable();
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
        <TableData data={data}/>:
        null
      }
   </div>
   :
      <div className="empty-data">Данных пока нет</div>
}
     <Modal active={modalActive} setActive={setModalActive}>
      <FormPostData setActive={setModalActive}/>
     </Modal>
   </>
 )
}

export default ResultVotingPage;