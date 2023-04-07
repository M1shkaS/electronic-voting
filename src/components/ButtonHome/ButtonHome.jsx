import { Link } from "react-router-dom";
import home from '../../recourses/img/home.png'
import "./ButtonHome.scss";
const ButtonHome = () => {
  return (
    <Link to="/" className="link-home">
      <img src={home} alt="home" />
    </Link>
  );
};

export default ButtonHome;
