import React from 'react';
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
} from '@mui/material';

const DeleteCertificateDialog = ({
  open,
  onClose,
  handleDeleteConfirm,
  certificateId,
  certificateName,
}) => {
  const handleConfirmDelete = () => {
    handleDeleteConfirm(certificateId);
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Delete Certificate</DialogTitle>
      <DialogContent>
        <Typography variant="body1">
          Are you sure you want to delete the certificate "{certificateName}"?
        </Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} variant="outlined">
          Cancel
        </Button>
        <Button onClick={handleConfirmDelete} variant="contained" color="error">
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteCertificateDialog;
