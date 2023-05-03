import React, { useState, useEffect, useRef } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
} from '@mui/material';

const UpdateAwardDialog = ({
  open,
  onClose,
  award,
  handleSubmit,
  checkEmpty,
}) => {
  const [updatedAward, setUpdatedAward] = useState({
    title: '',
    description: '',
    year: '',
  });

  const titleInput = useRef();
  const descriptionInput = useRef();

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
          ref={titleInput}
          label="Title"
          name="title"
          margin="normal"
          fullWidth
          value={updatedAward.title}
          onChange={handleChange}
        />
        <TextField
          ref={descriptionInput}
          label="Description"
          name="description"
          margin="normal"
          fullWidth
          value={updatedAward.description}
          onChange={handleChange}
        />
        <TextField
          margin="normal"
          fullWidth
          label="Year"
          name="year"
          value={updatedAward.year}
          onChange={handleChange}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>취소하기</Button>
        <Button
          onClick={() => {
            checkEmpty(updatedAward, titleInput, descriptionInput) &&
              handleUpdate();
          }}
        >
          수정하기
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default UpdateAwardDialog;
