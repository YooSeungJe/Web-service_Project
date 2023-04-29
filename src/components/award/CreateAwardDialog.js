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
}) => {
  const handleClose = () => {
    onClose();
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
          onChange={handleChange}
          fullWidth
          margin='normal'
          InputLabelProps={{
            shrink: true,
          }}
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
