import { useDispatch } from 'react-redux';
import React, { useState } from 'react';
import { authOperations } from '../redux/auth';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Row, Col } from 'react-bootstrap';

export default function RegisterView() {
  const dispatch = useDispatch();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleChange = ({ target: { name, value } }) => {
    switch (name) {
      case 'name':
        return setName(value);
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
    dispatch(authOperations.register({ name, email, password }));
    setName('');
    setEmail('');
    setPassword('');
  };

  return (
    <div className="centered">
      <Card className="text-center">
        <Card.Img
          variant="top"
          src="https://c.tenor.com/umMW5u13Z-gAAAAM/hush-quiet.gif"
        />

        <Card.Body>
          <Card.Title>Пcc, нужно нуменого приватных контактов ?</Card.Title>
          <Card.Text>
            Это останеться между нами ! <br></br>(честно, честно)
          </Card.Text>
        </Card.Body>
      </Card>

      <Form onSubmit={handleSubmit} className="m-3">
        <Row>
          <Col md>
            <Form.Group className="mb-3" controlId="formBasicName">
              <Form.Label>Как величать то?</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={name}
                placeholder="Имячко"
                onChange={handleChange}
              />
            </Form.Group>
          </Col>
          <Col md>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>А писать куда?</Form.Label>
              <Form.Control
                type="email"
                name="email"
                value={email}
                placeholder="Адресочек"
                onChange={handleChange}
              />
            </Form.Group>
          </Col>
          <Col md>
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Эт дело святое</Form.Label>
              <Form.Control
                type="password"
                name="password"
                value={password}
                placeholder="Парольчик"
                onChange={handleChange}
              />
            </Form.Group>
          </Col>
        </Row>

        <Button variant="success" type="submit">
          Присоединиться к клубу
        </Button>
      </Form>
    </div>
  );
}
