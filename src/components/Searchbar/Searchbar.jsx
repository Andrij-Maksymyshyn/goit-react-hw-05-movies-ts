import React, { useState } from 'react';
import PropTypes from 'prop-types';
import toast from 'react-hot-toast';
import { Box, Form, Input, Button } from './Searchbar.styled';


function Searchbar({propSubmit}) {
const [inputFilmValue, setInputFilmValue] = useState('');

    const handleChange = e => {
    const { value } = e.currentTarget;

    setInputFilmValue(value);
  };

  const handleSubmit = e => {
    e.preventDefault();

    if (inputFilmValue.trim() === '') {
      toast.error('Please, fill in the field of search');
      return;
    }

    propSubmit(inputFilmValue);

    setInputFilmValue('');
  };

  return (
     <Box>
        <Form onSubmit={handleSubmit}>
           <Input
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search movies by keyword"
            value={inputFilmValue}
            onChange={handleChange}
                  />
            <Button type="submit">
           Search
          </Button>
        </Form>
      </Box>    
  );
};

export default Searchbar;

Searchbar.propTypes = {
  propSubmit: PropTypes.func.isRequired,
};