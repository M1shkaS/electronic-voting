import tableDataStore from '../../stores/TableDataStore';
import './ResultsVoting.scss';

const ResultsVoting = ({data}) => {
    const {tablData} = tableDataStore;

    let users = [
        {name:"Чернова Полина Артёмовна", counter:0},
        {name:"Ильина Марина Игоревна", counter:0},
        {name:"Матвеев Григорий Александрович", counter:0},
        {name:"Иванова Виктория Михайловна", counter:0},
        {name:"Ильин Роман Константинович", counter:0},
        {name:"Фирсов Максим Владимирович", counter:0},

    ]
    let counter1 = 0, counter2 = 0, counter3 = 0, counter4 = 0, counter5 = 0, counter6 = 0, counter7 = 0, con8 = 0;
   tablData.forEach(element => {
      let {bulleten} = element;

      if(bulleten === ""){
         counter7++;
      }
      bulleten.split(',').forEach(item => {
         if(item === users[0].name){
            users[0].counter++;
            con8++;
         }
         if(item === users[1].name){
            users[1].counter++;
            con8++;
         }
         if(item === users[2].name){
            users[2].counter++;
            con8++;
         }
         if(item === users[3].name){
            users[3].counter++;
            con8++;
         }
         if(item === users[4].name){
            users[4].counter++;
            con8++;
         }
         if(item === users[5].name){
            users[5].counter++;
            con8++;
         }

      })

   });

   // по возрасту (Pete, Ann, John)
users.sort((a, b) => a.counter < b.counter ? 1 : -1);
return(
<div className='results'>
    <h2>Результаты голосования:</h2>
{users.map(({name, counter}, id) => {
    console.log(counter)
    return(
        <div className='results-item'>
            {id+1}: {name} - {counter} голос(а)
        </div>
    )
})}
</div>)
}

export default ResultsVoting;