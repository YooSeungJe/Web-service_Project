import React from 'react';
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
} from '@mui/material';

const DeleteAwardDialog = ({
  open,
  onClose,
  handleDeleteConfirm,
  awardId,
  awardTitle,
}) => {
  const handleConfirmDelete = () => {
    handleDeleteConfirm(awardId);
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle variant="h5">수상 경력 삭제</DialogTitle>
      <DialogContent>
        <Typography variant="body1">
          정말로 이 수상 경력을 삭제하시겠습니까? <br />
          <br /> 선택하신 항목 : "{awardTitle}"
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

export default DeleteAwardDialog;
