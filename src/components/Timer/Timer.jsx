import { useEffect, useMemo, useState } from "react";
import './Timer.scss';

const SECOND = 1000;
const MINUTE = SECOND * 60;
const HOUR = MINUTE * 60;
const DAY = HOUR * 24;
const deadline = new Date(2023, 1, 20);

 const Timer = ({ deadline = new Date(2023, 1, 20)}) => {
    const parsedDeadline = useMemo(() => Date.parse(deadline), [deadline]);
    const [time, setTime] = useState(parsedDeadline - Date.now());
    useEffect(() => {
        const interval = setInterval(
            () => setTime(parsedDeadline - Date.now()),
            1000,
        );

        return () => clearInterval(interval);
    }, [parsedDeadline]);

    return (
      <div className="timer">
         <h2>До конца голосования осталось:</h2>
         <div className="time">
               {Object.entries({
                  Days: time / DAY,
                  Hours: (time / HOUR) % 24,
                  Minutes: (time / MINUTE) % 60,
                  Seconds: (time / SECOND) % 60,
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