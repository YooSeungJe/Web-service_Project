import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
  Button,
} from '@mui/material';

const CreateAwardDialog = ({
  open,
  onClose,
  newAward,
  handleChange,
  handleSubmit,
  setNewAward,
}) => {
  const [yearError, setYearError] = useState(false);

  const handleClose = () => {
    setNewAward({ title: '', description: '', year: '' });
    onClose();
  };

  const handleYearChange = (event) => {
    const yearValue = event.target.value;
    if (isNaN(yearValue)) {
      setYearError(true);
    } else {
      setYearError(false);
    }
    handleChange(event);
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Create Award</DialogTitle>
      <DialogContent>
        <TextField
          label='Title'
          name='title'
          value={newAward.title}
          onChange={handleChange}
          fullWidth
          margin='normal'
          InputLabelProps={{
            shrink: true,
          }}
        />
        <TextField
          label='Description'
          name='description'
          value={newAward.description}
          onChange={handleChange}
          fullWidth
          margin='normal'
          InputLabelProps={{
            shrink: true,
          }}
        />
        <TextField
          label='Year'
          name='year'
          value={newAward.year}
          onChange={handleYearChange}
          fullWidth
          margin='normal'
          InputLabelProps={{
            shrink: true,
          }}
          error={yearError}
          helperText={yearError ? 'Year must be a number' : ''}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleSubmit} variant='contained' color='primary'>
          Create
        </Button>
        <Button onClick={handleClose} variant='outlined' color='secondary'>
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CreateAwardDialog;
