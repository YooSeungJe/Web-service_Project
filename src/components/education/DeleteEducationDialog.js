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
      <DialogTitle>Delete Education</DialogTitle>
      <DialogContent>
        <Typography variant="body1">
          Are you sure you want to delete the education "{educationTitle}"?
        </Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleConfirmDelete} color="error">
          {/* <Button onClick={() => handleDeleteConfirm()} color='error'> */}
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteEducationDialog;
