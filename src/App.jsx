import React, { useEffect, Suspense, lazy } from 'react';
import { Routes, Route } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import PrivateRoute from 'components/privateRoute';
import PublicRoute from 'components/publicRoute';
import { authOperations } from 'redux/auth';
import Navigation from 'components/navigation/navigation';
import Spinner from 'react-bootstrap/Spinner';

const Homepage = lazy(() => import('./views/homePage/homePage'));
const RegisterView = lazy(() => import('./views/registerView'));
const LoginView = lazy(() => import('./views/logInView'));
const Contacts = lazy(() => import('./views/contacts'));

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(authOperations.fetchCurrentUser());
  }, [dispatch]);

  return (
    <>
      <Navigation />
      <Suspense
        fallback={
          <div className="centered">
            <Spinner animation="border" />
          </div>
        }
      >
        <Routes>
          <Route exact path="/" element={<Homepage />} />
          <Route
            path="/register"
            element={
              <PublicRoute restricted>
                <RegisterView />
              </PublicRoute>
            }
          />
          <Route
            path="/login"
            element={
              <PublicRoute restricted>
                <LoginView />
              </PublicRoute>
            }
          />
          <Route
            path="/contacts"
            element={
              <PrivateRoute>
                <Contacts />
              </PrivateRoute>
            }
          />

          <Route path="*" element={<p>There's nothing here: 404!</p>} />
        </Routes>
      </Suspense>
    </>
  );
};

export default App;
