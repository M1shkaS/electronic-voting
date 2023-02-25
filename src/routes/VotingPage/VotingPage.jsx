import { useState, useEffect } from 'react';
import VotingForm from '../../components/VotingForm/VotingForm';
import ThanksMessage from '../../components/ThanksMessage/ThanksMessage';
import api from '../../api';
import { Navigate} from "react-router-dom";
import './VotingPage.scss';


const VotingPage = () => {
   const [valueVoting, setValueVoting] = useState(null);
   const [auth, setAuth] = useState("");

   useEffect( () => {
      if(localStorage.getItem('passport')){
        let valuePass = localStorage.getItem('passport');
        loginPerson(valuePass)
      }else{
         setAuth("nouser")
      }
   } , [])

   const loginPerson =  async(valuePass) => {
      let res = await api.posts.postPerson(valuePass);
      setAuth(res);
   }

   if(auth === "nouser" || auth === "preparation"){
      return <Navigate to="/" replace={true} />
    }

   const setValueVotingByPerson = (value) => {
      setValueVoting(value);
   }

return (
   <div className="limiter">
   <div className="container-login10">
      <div className="wrap-login10">
         {valueVoting !== null? 
            <ThanksMessage/> : 
            <VotingForm setValueVotingByPerson={setValueVotingByPerson}/>
         }
      </div>
   </div>
   </div>
)
}

export default VotingPage;