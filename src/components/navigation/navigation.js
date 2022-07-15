import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { authSelectors } from 'redux/auth';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import UserMenu from 'components/userMenu';
import styles from './navigation.module.css';

const Navigation = () => {
  const isLoggedIn = useSelector(authSelectors.getIsLoggedIn);

  return (
    <>
      <nav>
        <Navbar expand>
          <Container>
            <NavLink
              to="/"
              exact="true"
              className={({ isActive }) =>
                isActive ? styles.activeLink : styles.link
              }
            >
              Домой
            </NavLink>
            {isLoggedIn && (
              <NavLink
                to="/contacts"
                className={({ isActive }) =>
                  isActive ? styles.activeLink : styles.link
                }
              >
                Контакты
              </NavLink>
            )}

            {!isLoggedIn && (
              <NavLink
                to="/login"
                className={({ isActive }) =>
                  isActive ? styles.activeLink : styles.link
                }
              >
                Логин
              </NavLink>
            )}

            {!isLoggedIn && (
              <NavLink
                to="/register"
                className={({ isActive }) =>
                  isActive ? styles.activeLink : styles.link
                }
              >
                Регистрация
              </NavLink>
            )}

            <Navbar.Toggle />
            <Navbar.Collapse className="justify-content-end">
              <Navbar.Text>{isLoggedIn && <UserMenu />}</Navbar.Text>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </nav>
    </>
  );
};

export default Navigation;
