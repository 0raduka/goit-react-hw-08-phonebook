import { useDispatch, useSelector } from 'react-redux';
import { authOperations } from '../redux/auth';
import { authSelectors } from 'redux/auth';
import React, { useState } from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { BiLoaderAlt } from 'react-icons/bi';

export default function LoginView() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const isLogging = useSelector(authSelectors.getIsLogging);
  const loginError = useSelector(authSelectors.getLoginError);
  const isLoggedIn = useSelector(authSelectors.getIsLoggedIn);

  const handleChange = ({ target: { name, value } }) => {
    switch (name) {
      case 'email':
        return setEmail(value);
      case 'password':
        return setPassword(value);
      default:
        return;
    }
  };

  const handleSubmit = e => {
    e.preventDefault();
    dispatch(authOperations.logIn({ email, password }));
    if (isLoggedIn) {
      console.log('ПОЛУЧИЛОСЬ');
      setEmail('');
      setPassword('');
    }
  };

  return (
    <div className="centered">
      <Card className="text-center">
        <Card.Img
          variant="top"
          src="https://c.tenor.com/OZPoWWCdJ8oAAAAC/michael-scott-wink.gif"
        />

        <Card.Body>
          <Card.Title>Опять ты !</Card.Title>
          <Card.Text>Коли бывалый, знаешь как тут все устроено.</Card.Text>
        </Card.Body>
      </Card>

      <Form onSubmit={handleSubmit} className="m-3">
        <Form.Group className="m-2" controlId="formBasicEmail">
          <Form.Label>Извольте ваш онлайн адрес</Form.Label>
          <Form.Control
            type="email"
            name="email"
            value={email}
            placeholder="Адресочек"
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Ну и так что б приватно все было</Form.Label>
          <Form.Control
            type="password"
            name="password"
            value={password}
            placeholder="Парольчик"
            onChange={handleChange}
          />
        </Form.Group>

        <Button variant="success" type="submit">
          Впустите!
        </Button>
      </Form>
      {isLogging && <BiLoaderAlt className={!loginError && 'rotate'} />}
      {isLogging && loginError && <p> хм. где то ошибка</p>}
    </div>
  );
}
