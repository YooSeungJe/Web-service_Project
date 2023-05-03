import React, { useState, useRef } from 'react';
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
  checkEmpty,
}) => {
  const titleInput = useRef();
  const descriptionInput = useRef();

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
          ref={titleInput}
          label="Title"
          name="title"
          value={newAward.title}
          onChange={handleChange}
          fullWidth
          margin="normal"
          placeholder="제목을 입력해주세요"
          InputLabelProps={{
            shrink: true,
          }}
        />
        <TextField
          ref={descriptionInput}
          label="Description"
          name="description"
          value={newAward.description}
          onChange={handleChange}
          fullWidth
          margin="normal"
          placeholder="내용을 입력해주세요"
          InputLabelProps={{
            shrink: true,
          }}
        />
        <TextField
          label="Year"
          name="year"
          value={newAward.year}
          onChange={handleYearChange}
          fullWidth
          margin="normal"
          InputLabelProps={{
            shrink: true,
          }}
          error={yearError}
          helperText={yearError ? 'Year must be a number' : ''}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} variant="outlined" color="secondary">
          취소하기
        </Button>
        <Button
          onClick={() => {
            checkEmpty(newAward, titleInput, descriptionInput) &&
              handleSubmit();
          }}
          variant="contained"
          color="primary"
        >
          추가하기
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CreateAwardDialog;
