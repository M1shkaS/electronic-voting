import { useState, useEffect } from 'react';
import PieChart from '../../components/PieChart/PieChart';
import TableData from '../../components/TableData/TableData';
import Timer from '../../components/Timer/Timer';
import api from '../../api';


const ResultVotingPage = () => {

   const [data, setData] = useState([]);
   useEffect( () => {
      getData();
   } , [])

   const getData =  async() => {
      let res = await api.posts.getDataTable();
      setData(res);
   }

 return(
   <>
      {/* <PieChart/> */}
      <Timer/>
      {data.length !== 0 ?
        <TableData data={data}/>:
        null
      }
    
   </>
 )
}

export default ResultVotingPage;