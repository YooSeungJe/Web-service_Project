import React from 'react';
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
} from '@mui/material';

const DeleteEducationDialog = ({
  open,
  onClose,
  handleDeleteConfirm,
  educationId,
  educationTitle,
}) => {
  const handleConfirmDelete = () => {
    handleDeleteConfirm(educationId);
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle variant="h5">학력 삭제</DialogTitle>{' '}
      <DialogContent>
        <Typography variant="body1">
          정말로 이 학력을 삭제하시겠습니까? <br />
          <br /> 선택하신 항목 : "{educationTitle}"
        </Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} variant="outlined" color="secondary">
          취소하기
        </Button>
        <Button onClick={handleConfirmDelete} variant="contained" color="error">
          삭제하기
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteEducationDialog;
