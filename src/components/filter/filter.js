import React from 'react';
import { useDispatch } from 'react-redux';
import { createFilter } from '../../redux/contacts/filterSlice';
import InputGroup from 'react-bootstrap/InputGroup';
import Form from 'react-bootstrap/Form';

const Filter = () => {
  const dispatch = useDispatch();

  const changeFilter = evnt => {
    dispatch(createFilter(evnt.currentTarget.value));
  };

  return (
    <>
      <InputGroup className="m-3" size="sm">
        <InputGroup.Text id="basic-addon3">
          Отделяем зерна от плевел так сказать ->
        </InputGroup.Text>
        <Form.Control
          id="basic-url"
          aria-describedby="basic-addon3"
          onChange={changeFilter}
        />
      </InputGroup>
    </>
  );
};

export default Filter;
