import { useState, useEffect } from 'react';
import PieChart from '../../components/PieChart/PieChart';
import TableData from '../../components/TableData/TableData';
import Modal from '../../components/Modal/Modal';
import Timer from '../../components/Timer/Timer';
import Spinner from '../../components/spinner/Spinner';
import sad from './sad.svg'
import tableDataStore from '../../stores/TableDataStore';
import InfoVotingData from '../../components/InfoVotingData/InfoVotingData';
import api from '../../api';

import './ResultVotingPage.scss';
import ResultsVoting from '../../components/ResultsVoting/ResultsVoting';

const ResultVotingPage = () => {

   const [data, setData] = useState([]);
   const [modalActive, setModalActive] = useState(false);
   const [modalInfoVotingDataActive, setModalInfoVotingDataActive] = useState(false);
   const [infoVotingData, setInfoVotingData] = useState({});
   const [time, setTime] = useState(false);
   const [dateTime, setDateTime] = useState({});
   const [loading, setLoading] = useState(true);
    
   useEffect( () => {
      localStorage.clear();
      getData();
   } , [])

   const getData =  async() => {
      let res = await api.posts.getDataTable();
      if(res?.message === "timeTicking"){
         setTime(true);
         setDateTime({...res.timeVot});
         if(res.table.length !== 0 ){

            tableDataStore.addTableData(res.table)
         }

         // setData(res.table);
         setLoading(false)
      }else{
         if(res.length !== 0 ){
            tableDataStore.addTableData(res)
         }
         setData(res);
         setLoading(false)
      }

   }
 
 return(
   <>
   {loading?
   <Spinner/>
   :  
   <> 
   {time ?
      <>
         <div>
               {data.length !== 0 ?
                     <PieChart data={data} />:
                    null
               }

               <Timer getData={getData} dateTime={dateTime}/>  
               <div className='post-data'>
                  <span className='info-btn'>Вы можете проверить, что ваш голос был засчитан(в таблице) по своей уникальной метке, которая была выдана вам во время голосования </span>
               </div> 
               {data.length !== 0 ?
               <TableData  setActive={setModalActive} setInfoVotingData={setInfoVotingData} setModalInfoVotingDataActive={setModalInfoVotingDataActive}/>:
               <>
                    <div className="empty-data">Данных пока нет, дождитесь окончания голосования.</div>
                    <img className='sad' src={sad} alt="sad" />
               </>
               }
            </div>   
      </>  
      :
      <>
         {data.length !==0 ?
            <div>
               <PieChart data={data} s/>
               <div className='post-data'>
                  <span className='info-btn'>Вы можете проверить, что ваш голос засчитан и посчитан правильно по своей уникальной метке</span>
               </div>
               {data.length !== 0 ?
               <>
                    <ResultsVoting data={data}/>
                    <TableData  setActive={setModalActive} setInfoVotingData={setInfoVotingData} setModalInfoVotingDataActive={setModalInfoVotingDataActive}/>
               </>
              :
               null
               }
            </div>
         :
            <>
               <div className="empty-data">Голосование ещё не началось</div>
               <img className='sad' src={sad} alt="sad" />
               <div className='empty-descr'>Дождитесь, когда когда начнётся голосование. Как только оно начнётся, вы сразу сможете проголосовать, вам будут выдана уникальная метка с помощью которой вы сможете найти свой голос в таблице, который будет  засчитан и посчитан. </div>
            </>  
      }
      </>
      }
       </>
}
   
{
   modalActive ?
   <Modal active={modalActive} setActive={setModalActive} setModalInfoVotingDataActive={setModalInfoVotingDataActive}>
   {
      modalInfoVotingDataActive ?
      <InfoVotingData infoVotingData={infoVotingData}/> :
      null
   }
   </Modal>
   :null
}
   </>
 )
}

export default ResultVotingPage;