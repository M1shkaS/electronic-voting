import LogApp from "../../components/LogApp/LogApp";
import LogUser from "../../components/LogUser/LogUser";

import './LogPage.scss';
const LogPage = () => {
 return(
 <div className="log-page">
   <LogUser/>
   <LogApp/>
 </div>)
}

export default LogPage;