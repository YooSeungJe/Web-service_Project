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
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Delete Award</DialogTitle>
      <DialogContent>
        <Typography variant='body1'>
          Are you sure you want to delete the award "{awardTitle}"?
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
