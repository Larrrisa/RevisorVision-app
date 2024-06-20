import styles from "../styles/Header.module.css";
import { Link, useLocation } from "react-router-dom";

function Header() {
  const location = useLocation();
  function getLink(pathname: string) {
    return location.pathname === pathname ? styles.item_active : styles.item;
  }
  return (
    <header className={styles.header}>
      <Link to="/" className={getLink("/")}>
        Каталог
      </Link>
      <Link to="/favorites" className={getLink("/favorites")}>
        Избранное
      </Link>
    </header>
  );
}

export default Header;
