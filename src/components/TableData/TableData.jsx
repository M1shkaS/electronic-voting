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
console.log(data);
   return(
      <table >
         
         <thead>
            <tr>
               <td>Метка пользователя</td>
               <td>Зашифрованная бюллетень</td>
               <td>Подпись регистратора</td>
            </tr>
         </thead>
         <tbody>
            {data.map((data) =>
             (
            <tr key={data.uniqueLabelCorrection}>
               <td>{data.uniqueLabelCorrection}</td>
               <td><span>{data.encrBulletin}</span> </td>
               <td><span>{data.signRegistrator
}</span> </td>
            </tr>
            ))}
         </tbody>
      </table>
   )
}

export default TableData;