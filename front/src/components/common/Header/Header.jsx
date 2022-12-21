import styles from "./Header.module.scss";
import userImg from "../../../images/header/user.svg";
import arrowImg from "../../../images/header/Arrow.svg";
import authImage from "../../../images/header/dumbbell.svg"
import Humburger from "./Hamburger/Humburger";
import { useLocation, useNavigate } from "react-router-dom";
import useAuth from "../../../hooks/useAuth";

function Header({ backLink }) {
  const navigate = useNavigate()
  const location = useLocation()

  const { isAuth } = useAuth()

  return (
    <header className={styles.header}>
    {location.pathname !== '/' ? ( 
      <button type="button" onClick={() => navigate(-1)}>
        <img src={arrowImg} alt="back" />
      </button>
    ) : ( 
      <button type="button" onClick={() => navigate(isAuth ? '/profile' : '/auth')}>
        <img src={isAuth ? authImage : userImg} alt="Auth" height='40' />
      </button>
    )
    }
      <Humburger />
    </header>
  );
}

export default Header;
