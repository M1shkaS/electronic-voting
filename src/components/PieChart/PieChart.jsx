import { observer } from "mobx-react-lite";
import { Chart } from "react-google-charts";
import tableDataStore from "../../stores/TableDataStore";

const PieChart = ({data}) => {

   const {tablData} = tableDataStore

   let counter1 = 0, counter2 = 0, counter3 = 0, counter4 = 0, counter5 = 0, counter6 = 0, counter7 = 0;
   tablData.forEach(element => {
      let {bulleten} = element;
      if(bulleten === ""){
         counter7++;
      }
      bulleten.split(',').forEach(item => {
         if(item === "Чернова Полина Артёмовна"){
            counter1++;
         }
         if(item === "Ильина Марина Игоревна"){
            counter2++;
         }
         if(item === "Матвеев Григорий Александрович"){
            counter3++;
         }
         if(item === "Иванова Виктория Михайловна"){
            counter4++;
         }
         if(item === "Ильин Роман Константинович"){
            counter5++;
         }
         if(item === "Фирсов Максим Владимирович"){
            counter6++;
         }

      })

   });
   const data2 = [
      ["Task", "Hours per Day"],
      ["Чернова Полина Артёмовна", counter1],
      ["Ильина Марина Игоревна", counter2],
      ["Матвеев Григорий Александрович", counter3],
      ["Иванова Виктория Михайловна", counter4],
      ["Ильин Роман Константинович", counter5],
      ["Фирсов Максим Владимирович", counter6],
      ["Не отправили данные", counter7],
    ];
   const options = {
      title: "Голосование за выбор выборщиков",
    };
 return (
   <Chart
   chartType="PieChart"
   data={data2}
   options={options}
   width={"100%"}
   height={"400px"}
 />
 )
};
export default observer(PieChart);