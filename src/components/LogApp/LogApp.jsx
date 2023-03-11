import { observer } from 'mobx-react-lite';
import logStore from '../../stores/LogStore';
import './LogApp.scss';

const LogApp = () => {
   const {appLog} = logStore;
   return(
   <div className="logApp">
      <h2 className="logApp__title">Логи приложения</h2>
      <div className="logApp__body">
         {
            appLog.map((log) => log)
         }
      </div>
   </div>)
  }
  
  export default observer(LogApp);