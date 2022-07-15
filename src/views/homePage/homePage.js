import Spinner from 'react-bootstrap/Spinner';

import { Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Suspense } from 'react';
import { authSelectors } from 'redux/auth';
import Card from 'react-bootstrap/Card';

const HomePage = () => {
  const isLoggedIn = useSelector(authSelectors.getIsLoggedIn);
  return (
    <>
      <div className="centered">
        <Suspense
          fallback={
            <div className="centered">
              <Spinner animation="border" />
            </div>
          }
        >
          {!isLoggedIn ? (
            <Card className="text-center">
              <Card.Img
                variant="top"
                src="https://c.tenor.com/95ycw_CgVHoAAAAC/napoleon-dynamite-wave.gif"
              />

              <Card.Body>
                <Card.Title>Здравствуй, незнакомец!</Card.Title>
                <Card.Text>
                  Тебе следовало бы войти используя логин или пройти регистрацию
                  ;)
                </Card.Text>
              </Card.Body>
            </Card>
          ) : (
            <Card className="text-center">
              <Card.Img
                variant="top"
                src="https://c.tenor.com/jjBjKjehH40AAAAS/drake-point.gif"
              />

              <Card.Body>
                <Card.Title>Эй !</Card.Title>
                <Card.Text>А, кто это к нам пожаловал ?!!</Card.Text>
              </Card.Body>
            </Card>
          )}
          <Outlet />
        </Suspense>
      </div>
    </>
  );
};

export default HomePage;
