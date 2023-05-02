import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
} from '@mui/material';

const UpdateAwardDialog = ({ open, onClose, award, handleSubmit }) => {
  const [updatedAward, setUpdatedAward] = useState({
    title: '',
    description: '',
    year: '',
  });

  useEffect(() => {
    if (award) {
      setUpdatedAward({
        title: award.title,
        description: award.description,
        year: award.year,
      });
    }
  }, [award]);

  const handleChange = (event) => {
    setUpdatedAward({
      ...updatedAward,
      [event.target.name]: event.target.value,
    });
  };

  const handleUpdate = () => {
    handleSubmit(award._id, updatedAward);
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>수상 내역 수정</DialogTitle>
      <DialogContent>
        <TextField
          margin='normal'
          fullWidth
          label='Title'
          name='title'
          value={updatedAward.title}
          onChange={handleChange}
        />
        <TextField
          margin='normal'
          fullWidth
          label='Description'
          name='description'
          value={updatedAward.description}
          onChange={handleChange}
        />
        <TextField
          margin='normal'
          fullWidth
          label='Year'
          name='year'
          value={updatedAward.year}
          onChange={handleChange}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>취소하기</Button>
        <Button onClick={handleUpdate}>수정하기</Button>
      </DialogActions>
    </Dialog>
  );
};

export default UpdateAwardDialog;
