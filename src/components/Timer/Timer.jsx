import { useEffect, useMemo, useState } from "react";
import './Timer.scss';

const SECOND = 1000;
const MINUTE = SECOND * 60;
const HOUR = MINUTE * 60;
const DAY = HOUR * 24;

 const Timer = ({dateTime}) => {
   const deadline = new Date(dateTime.endYear, dateTime.endMonth - 1,  dateTime.endDay, dateTime.endH, dateTime.endM + 1);
    const parsedDeadline = useMemo(() => Date.parse(deadline), [deadline]);
    const [time, setTime] = useState(parsedDeadline - Date.now());
    useEffect(() => {
        const interval = setInterval(
            () => setTime(parsedDeadline - Date.now()),
            1000,
        );

        return () => clearInterval(interval);
    }, [parsedDeadline]);

    let Day = Math.floor(time / DAY);
    let Hours = Math.floor((time / HOUR) % 24);
    let Minutes= Math.floor((time / MINUTE) % 60);
    let Seconds= Math.floor((time / SECOND) % 60);

    if(Day <= 0 && Hours <= 0 && Minutes <= 0 && Seconds <= 0){
     Day = 0;
     Hours = 0;
     Minutes= 0;
     Seconds= 0;
    }
    return (
      <div className="timer">
         <h2>До конца голосования осталось:</h2>
         <div className="time">
               {Object.entries({
                  Days: Day,
                  Hours: Hours,
                  Minutes: Minutes,
                  Seconds: Seconds,
               }).map(([label, value]) => (
                  <div key={label} className="col-4">
                     <div className="box">
                           <p>{`${Math.floor(value)}`.padStart(2, "0")}</p>
                           <span className="text">{label}</span>
                     </div>
                  </div>
               ))}
         </div>
      </div>
    );
};

export default Timer;