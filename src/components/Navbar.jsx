import { NavLink } from "react-router-dom";
import styles from "./Navbar.module.css";
import { useAuth } from "../hooks/useAuth";
import { useAuthValue } from "../context/AuthContext";

function Navbar() {
  const { user } = useAuthValue();
  const { logout } = useAuth();
  return (
    <nav className={styles.navbar}>
      <NavLink to="/" className={styles.brand}>
        Your <span>Brand</span>
      </NavLink>
      <ul className={styles.links_list}>
        <li>
          <NavLink
            to="/"
            className={({ isActive }) => (isActive ? `${styles.active}` : "")}
          >
            Home
          </NavLink>
        </li>
        {user && (
          <>
            <li>
              <NavLink
                to="/dashboard"
                className={({ isActive }) =>
                  isActive ? `${styles.active}` : ""
                }
              >
                Dashboard
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/properties/createProperty"
                className={({ isActive }) =>
                  isActive ? `${styles.active}` : ""
                }
              >
                Criar imóvel
              </NavLink>
            </li>
          </>
        )}
        {!user && (
          <>
            <li>
              <NavLink
                to="/register"
                className={({ isActive }) =>
                  isActive ? `${styles.active}` : ""
                }
              >
                Cadastre-se
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/login"
                className={({ isActive }) =>
                  isActive ? `${styles.active}` : ""
                }
              >
                Entrar
              </NavLink>
            </li>
          </>
        )}
        <li>
          <NavLink
            to="/about"
            className={({ isActive }) => (isActive ? `${styles.active}` : "")}
          >
            Sobre nós
          </NavLink>
        </li>
        {user && (
          <li>
            <button type="submit" onClick={logout}>
              Sair
            </button>
          </li>
        )}
      </ul>
    </nav>
  );
}

export default Navbar;
