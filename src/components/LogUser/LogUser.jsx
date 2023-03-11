import { observer } from 'mobx-react-lite';
import logStore from '../../stores/LogStore';
import './LogUser.scss';

const LogUser = () => {

const {userLog} = logStore;
   return(
   <div className="logUser">
      <h2 className="logUser__title">Логи пользователя</h2>
      <div className="logUser__body">
         {
            userLog.map((log) => log)
         }
      </div>

   </div>)
  }
  
  export default observer(LogUser);