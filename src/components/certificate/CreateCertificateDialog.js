import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
  Button,
} from '@mui/material';

const CreateCertificateDialog = ({
  open,
  handleClose,
  handleChange,
  handleSubmit,
  newCertificate,
}) => {
  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Add New Certificate</DialogTitle>
      <DialogContent>
        <TextField
          label='Certificate Name'
          name='certificateName'
          value={newCertificate.certificateName}
          onChange={handleChange}
          fullWidth
          margin='normal'
          InputLabelProps={{
            shrink: true,
          }}
        />
        <TextField
          label='Certificate Number'
          name='certificateNumber'
          value={newCertificate.certificateNumber}
          onChange={handleChange}
          fullWidth
          margin='normal'
          InputLabelProps={{
            shrink: true,
          }}
        />
        <TextField
          label='Issuance Date'
          name='issuanceDate'
          value={newCertificate.issuanceDate}
          onChange={handleChange}
          fullWidth
          margin='normal'
          InputLabelProps={{
            shrink: true,
          }}
        />
        <TextField
          label='Issuing Authority'
          name='issuingAuthority'
          value={newCertificate.issuingAuthority}
          onChange={handleChange}
          fullWidth
          margin='normal'
          InputLabelProps={{
            shrink: true,
          }}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleSubmit} variant='contained' color='primary'>
          Add
        </Button>
        <Button onClick={handleClose} variant='outlined' color='secondary'>
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CreateCertificateDialog;
