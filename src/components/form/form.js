import React, { useState } from 'react';
import { useAddContactMutation } from '../../redux/contacts/contactsApi';
import { useGetAllContactsQuery } from '../../redux/contacts/contactsApi';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Row, Col } from 'react-bootstrap';
import Spinner from 'react-bootstrap/Spinner';

const AddContactForm = () => {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');

  const [addContact, { isLoading }] = useAddContactMutation();
  const { data } = useGetAllContactsQuery();

  const handleAddContact = async e => {
    e.preventDefault();
    const normalizedName = name.toLowerCase();

    if (data.find(contact => contact.name.toLowerCase() === normalizedName)) {
      alert(` ${name} is already in contacts`);
      return;
    }
    try {
      await addContact({ name, number }).then(reset());
    } catch (error) {
      console.log('Error', error);
    }
  };

  const handleInputText = evt => {
    const { name, value } = evt.target;
    switch (name) {
      case 'name':
        setName(value);
        break;
      case 'number':
        setNumber(value);
        break;
      default:
        console.log('Error !!!');
    }
  };

  const reset = () => {
    setName('');
    setNumber('');
  };

  return (
    <>
      <Form onSubmit={handleAddContact}>
        <Row>
          <Col md>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Имя</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={name}
                placeholder="Имя контакта"
                onChange={handleInputText}
                pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
                title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
              />
            </Form.Group>
          </Col>
          <Col md>
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Номер</Form.Label>
              <Form.Control
                type="tel"
                name="number"
                value={number}
                placeholder="Номер контакта"
                onChange={handleInputText}
                pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
                title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
                required
              />
            </Form.Group>
          </Col>
        </Row>

        <Button variant="success" type="submit">
          Добавить этого везунчика в список
        </Button>
      </Form>
      {isLoading && <Spinner animation="border" className="m-3" />}
    </>
  );
};

export default AddContactForm;
