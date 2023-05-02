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
  onConfirmDelete,
  certificate,
}) => {
  console.log('check', certificate);
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Delete Certificate</DialogTitle>
      <DialogContent>
        <Typography>
          {`Are you sure you want to delete the certification "${certificate.certificationName}" ?`}
        </Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={onConfirmDelete} variant='contained' color='error'>
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteCertificateDialog;
