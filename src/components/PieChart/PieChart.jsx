import { observer } from "mobx-react-lite";
import { Chart } from "react-google-charts";
import tableDataStore from "../../stores/TableDataStore";

const PieChart = ({data}) => {
   const {tablData} = tableDataStore
   let counterYes = 0, counterNo = 0, counerNoVot = 0;
   tablData.forEach(element => {
      let {bulleten} = element;
      if(bulleten === "Да"){
         counterYes++
      }else if(bulleten === "Нет"){
         counterNo++ 
      }else{
         counerNoVot++
      }
   });
   const data2 = [
      ["Task", "Hours per Day"],
      ["За", counterYes],
      ["Против", counterNo],
      ["Не отправили данные", counerNoVot],
    ];
   const options = {
      title: "Голосование за поправки в коституцию",
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