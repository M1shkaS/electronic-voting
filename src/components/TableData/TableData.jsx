import './TableData.scss';

const TableData = ({setActive,setModalInfoVotingDataActive,setInfoVotingData, data}) => {

   return(
      <table >
         
         <thead>
            <tr>
               <td>Метка пользователя</td>
               <td>Зашифрованная бюллетень</td>
               <td>Подпись регистратора</td>
               <td>Секретный ключ</td>
               <td>Голос</td>
            </tr>
         </thead>
         <tbody>
            {data.map((data) =>{
               const classname = data.bulleten === "Да" ? "active" :  data.bulleten === "Нет"? "passive" : "empty"
               return(
               <tr className={"string " + classname} key={data.uniqueLabelCorrection}
               onClick={(() =>{
                  setActive(true)
                  setModalInfoVotingDataActive(true)
                  setInfoVotingData(data);
                 
               })}
               >
                  <td><span>{data.uniqueLabelCorrection}</span> </td>
                  <td><span>{data.encrBulletin}</span> </td>
                  <td><span>{data.signRegistrator}</span> </td>
                  <td><span>{data.secretVotingKey ? data.secretVotingKey:"Данных нет"}</span> </td>
                  <td><span>{data.bulleten ? data.bulleten:"Данных нет"}</span> </td>
               </tr>
               )
            }
       )}
         </tbody>
      </table>
   )
}

export default TableData;