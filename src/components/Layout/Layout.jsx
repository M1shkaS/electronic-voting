import {Outlet} from "react-router-dom";
import ButtonHome from "../ButtonHome/ButtonHome";
import LogPage from "../../routes/LogPage/LogPage";
import './Layout.scss';

const Layout = () => {
return (
   <>
   <div className="outlet">
       <Outlet/>
       <ButtonHome/>
   </div>
      <LogPage/>
   </>
)
}

export default Layout;