import { Chart } from "react-google-charts";

const PieChart = () => {
   const data = [
      ["Task", "Hours per Day"],
      ["Да", 11],
      ["Нет", 20],
    ];
   const options = {
      title: "Голосование за поправки в коституцию",
    };
 return (
   <Chart
   chartType="PieChart"
   data={data}
   options={options}
   width={"100%"}
   height={"400px"}
 />
 )
};
export default PieChart;