import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import {AESEncrypt, AESDecrypt} from "./crypto-helper/aesCryptography";
import { RSASign,RSASignVerify } from "./crypto-helper/rsaCryptography";
import { hash } from "./crypto-helper/hash";
import AuthorizationPage from "./routes/AuthorizationPage/AuthorizationPage";
import VotingPage from "./routes/VotingPage/VotingPage";
import Layout from "./components/Layout/Layout";
import ResultVotingPage from "./routes/ResultVotingPage/ResultVotingPage";

import './style/style.scss';
import './style/util.scss';

const App = () => {
// console.log(hash("1"));
   // let res2 = RSASign(1);
   // let res1 = RSASign(1);
   // let res2 = RSASign(1);
   // console.log(res1.signature);


   // console.log(res2.signature);
   // console.log(RSASignVerify(res1.signature, 1, res1.pubKey));
   // console.log(RSASignVerify(res2.signature, 1, res2.pubKey));
   // console.log(RSASignVerify(res2.signature, res2.keypair.publicKey, res2.md));
   // console.log(RSASign(1));
   // console.log(RSASign(1));
   // console.log(RSASign(1));
   // console.log(RSASign(1));
   let {ciphertext, privKey } = AESEncrypt("1");
   console.log(ciphertext);
   console.log(AESDecrypt(ciphertext, privKey));
  return(
  <div className="app">
   <Router>
      <Routes>
         <Route path="/" element={<Layout/>}>
            <Route path="/" element={<AuthorizationPage />}/>
            <Route path="/watcher" element={<ResultVotingPage/>}/>
            <Route path="/voting" element={<VotingPage />}/>
         </Route>
      </Routes>
   </Router>
   </div>) ;
};

export default App;
