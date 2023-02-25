import './TableData.scss';

const TableData = () => {
   const data = [
      {metka: "Ми", encrBul:"3123fdsf234df23f2f", signEnc: "3123fdsf234df23f2f"},
      {metka: "Ми", encrBul:"3123fdsf234df23f2f", signEnc: "3123fdsf234df23f2f"},
      {metka: "Ми", encrBul:"3123fdsf234df23f2f", signEnc: "3123fdsf234df23f2f"},
      {metka: "Ми", encrBul:"3123fdsf234df23f2f", signEnc: "3123fdsf234df23f2f"},
      {metka: "Ми", encrBul:"3123fdsf234df23f2f", signEnc: "3123fdsf234df23f2f"},
      {metka: "Ми", encrBul:"3123fdsf234df23f2f", signEnc: "3123fdsf234df23f2f"},
      {metka: "Ми", encrBul:"3123fdsf234df23f2f", signEnc: "3123fdsf234df23f2f"},
      {metka: "Ми", encrBul:"3123fdsf234df23f2f", signEnc: "3123fdsf234df23f2f"},
      {metka: "Ми", encrBul:"3123fdsf234df23f2f", signEnc: "3123fdsf234df23f2f"},
      {metka: "Ми", encrBul:"3123fdsf234df23f2f", signEnc: "3123fdsf234df23f2f"},
      {metka: "Ми", encrBul:"3123fdsf234df23f2f", signEnc: "3123fdsf234df23f2f"},
      {metka: "Ми", encrBul:"3123fdsf234df23f2f", signEnc: "3123fdsf234df23f2f"}
   ];

   return(
      <table>
         <thead>
            <tr>
               <td>Метка пользователя</td>
               <td>Зашифрованная бюл.</td>
               <td>Подпись регистратора</td>
            </tr>
         </thead>
         <tbody>
            {data.map((data) =>
             (
            <tr>
               <td>{data.metka}</td>
               <td>{data.encrBul}</td>
               <td>{data.signEnc}</td>
            </tr>
            ))}
         </tbody>
      </table>
   )
}

export default TableData;