import React from 'react';
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
} from '@mui/material';

const DeleteProjectDialog = ({
  open,
  onClose,
  handleDeleteConfirm,
  projectId,
  projectTitle,
}) => {
  const handleConfirmDelete = () => {
    handleDeleteConfirm(projectId);
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Delete Project</DialogTitle>
      <DialogContent>
        <Typography variant="body1">
          Are you sure you want to delete the project "{projectTitle}"?
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

export default DeleteProjectDialog;
