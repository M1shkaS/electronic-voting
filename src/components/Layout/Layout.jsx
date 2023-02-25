import {Outlet} from "react-router-dom";

import LogPage from "../../routes/LogPage/LogPage";
import './Layout.scss';

const Layout = () => {
return (
   <>
   <div className="outlet">
       <Outlet/>
   </div>
      <LogPage/>
   </>
)
}

export default Layout;