import React from 'react'
import Form from 'react-bootstrap/Form'
import { useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';
import { useState } from 'react';

function SearchBox() {
  const navigate = useNavigate();
  const [query, setQuery] = useState('');

  const submitHandler = (e) => {
    e.preventDefault();
    navigate(query ? `/search/?query=${query}` : '/search');
  }

  return (
    <Form className="d-flex me-auto" onSubmit={submitHandler}>
      <InputGroup>
        <FormControl
          type="text"
          name="q"
          id="q"
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search products..."
          arial-label="Search Products"
          aria-describedby="button-search"
        >
        </FormControl>
        <Button variant="outline-primary" type="submit" id="button-search">
          <i className='fas fa-search'></i>
        </Button>
      </InputGroup>
    </Form>
  )
}

export default SearchBox
