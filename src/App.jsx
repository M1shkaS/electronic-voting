import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import {AESEncrypt, AESDecrypt} from "./crypto-helper/aesCryptography";

import AuthorizationPage from "./routes/AuthorizationPage/AuthorizationPage";
import VotingPage from "./routes/VotingPage/VotingPage";
import Layout from "./components/Layout/Layout";
import ResultVotingPage from "./routes/ResultVotingPage/ResultVotingPage";

import './style/style.scss';
import './style/util.scss';

const App = () => {

  return(
  <div className="app">
   <Router>
      <Routes>
         <Route path="/" element={<Layout/>}>
            <Route path="/" element={<AuthorizationPage />}/>
            <Route path="/watchtable" element={<ResultVotingPage/>}/>
            <Route path="/voting" element={<VotingPage />}/>
         </Route>
      </Routes>
   </Router>
   </div>) ;
};

export default App;
