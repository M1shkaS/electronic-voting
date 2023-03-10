import './TableData.scss';

const TableData = ({data}) => {
   // const data = [
   //    {metka: "Ми", encrBul:"3123fdsf234df23f2f", signEnc: "3123fdsf234df23f2f"},
   //    {metka: "Ми", encrBul:"3123fdsf234df23f2f", signEnc: "3123fdsf234df23f2f"},
   //    {metka: "Ми", encrBul:"3123fdsf234df23f2f", signEnc: "3123fdsf234df23f2f"},
   //    {metka: "Ми", encrBul:"3123fdsf234df23f2f", signEnc: "3123fdsf234df23f2f"},
   //    {metka: "Ми", encrBul:"3123fdsf234df23f2f", signEnc: "3123fdsf234df23f2f"},
   //    {metka: "Ми", encrBul:"3123fdsf234df23f2f", signEnc: "3123fdsf234df23f2f"},
   //    {metka: "Ми", encrBul:"3123fdsf234df23f2f", signEnc: "3123fdsf234df23f2f"},
   //    {metka: "Ми", encrBul:"3123fdsf234df23f2f", signEnc: "3123fdsf234df23f2f"},
   //    {metka: "Ми", encrBul:"3123fdsf234df23f2f", signEnc: "3123fdsf234df23f2f"},
   //    {metka: "Ми", encrBul:"3123fdsf234df23f2f", signEnc: "3123fdsf234df23f2f"},
   //    {metka: "Ми", encrBul:"3123fdsf234df23f2f", signEnc: "3123fdsf234df23f2f"},
   //    {metka: "Ми", encrBul:"3123fdsf234df23f2f", signEnc: "3123fdsf234df23f2f"}
   // ];
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
               <tr className={classname} key={data.uniqueLabelCorrection}>
                  <td>{data.uniqueLabelCorrection}</td>
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