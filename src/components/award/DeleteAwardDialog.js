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
      <DialogTitle>수상 내역 삭제</DialogTitle>
      <DialogContent>
        <Typography variant='body1'>
          정말로 이 수상 내역을 삭제하시겠어요? "{awardTitle}"?
        </Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleConfirmDelete} color='error'>
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteAwardDialog;
