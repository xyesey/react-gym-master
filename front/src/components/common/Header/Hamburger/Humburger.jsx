import { Link } from "react-router-dom";
import { menu } from "./menuBase";
import styles from "./Humburger.module.scss";
import humburgerImg from "../../../../images/header/hamburger.svg";
import humburgerCloseImg from "../../../../images/header/hamburger-close.svg";
import useAuth from "../../../../hooks/useAuth";
import { useOutsideAlerter } from "../../../../hooks/useOutsideAlerter";

function Humburger() {
  const { setIsAuth } = useAuth();
  const { ref, isComponentVisible, setIsComponentVisible } =
    useOutsideAlerter(false);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsAuth(true);
    setIsComponentVisible(false);
  };

  return (
    <div className={styles.wrapper} ref={ref}>
      <button type="button" onClick={() => setIsComponentVisible(!isComponentVisible)}>
        <img
          src={isComponentVisible ? humburgerCloseImg : humburgerImg}
          alt="menu"
          height="24"
        />
      </button>
      <nav
        className={`${styles.menu} ${isComponentVisible ? styles.show : ""}`}
      >
        <ul>
          {menu.map((item, idx) => (
            <li key={`_menu_${idx}`}>
              <Link to={item.link}>{item.title}</Link>
            </li>
          ))}
          <li>
            <button onClick={handleLogout}>Logout</button>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default Humburger;
