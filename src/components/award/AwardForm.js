import React from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';

const AwardForm = ({
  title,
  setTitle,
  description,
  setDescription,
  year,
  setYear,
  handleCreate,
  handleCancel,
}) => {
  return (
    <form onSubmit={handleCreate}>
      <Box mb={2}>
        <TextField
          fullWidth
          label='Title'
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </Box>
      <Box mb={2}>
        <TextField
          fullWidth
          label='Description'
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
      </Box>
      <Box mb={2}>
        <TextField
          fullWidth
          label='Year'
          type='number'
          value={year}
          onChange={(e) => setYear(e.target.value)}
          required
        />
      </Box>
      <Box display='flex' justifyContent='space-between'>
        <Button type='submit' variant='contained' color='primary'>
          Submit
        </Button>
        <Button onClick={handleCancel} variant='outlined' color='secondary'>
          Cancel
        </Button>
      </Box>
    </form>
  );
};

export default AwardForm;
