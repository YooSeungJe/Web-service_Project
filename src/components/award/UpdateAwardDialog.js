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

  const [yearError, setYearError] = useState(false);

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
    <Dialog open={open} onClose={onClose}>
      <DialogTitle variant="h5">수상 경력 변경</DialogTitle>
      <DialogContent>
        <TextField
          ref={titleInput}
          label="수상 제목"
          name="title"
          margin="normal"
          fullWidth
          value={updatedAward.title}
          onChange={handleChange}
        />
        <TextField
          ref={descriptionInput}
          label="설명"
          name="description"
          margin="normal"
          fullWidth
          value={updatedAward.description}
          onChange={handleChange}
        />
        <TextField
          margin="normal"
          fullWidth
          label="수상연도"
          name="year"
          value={updatedAward.year}
          onChange={handleYearChange}
          InputLabelProps={{
            shrink: true,
          }}
          error={yearError}
          helperText={yearError ? '숫자로만 입력해주세요.' : ''}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} variant="outlined" color="secondary">
          취소하기
        </Button>
        <Button
          onClick={() => {
            checkEmpty(updatedAward, titleInput, descriptionInput) &&
              handleUpdate();
          }}
          variant="contained"
          color="primary"
        >
          변경하기
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default UpdateAwardDialog;
