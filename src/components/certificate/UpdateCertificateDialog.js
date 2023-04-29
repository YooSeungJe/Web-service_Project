import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
  Button,
} from '@mui/material';

const UpdateCertificateDialog = ({
  open,
  handleClose,
  handleSubmit,
  certificate,
}) => {
  const [updatedCertificate, setUpdatedCertificate] = useState({
    certificateName: '',
    certificateNumber: '',
    issuanceDate: '',
    issuingAuthority: '',
  });

  useEffect(() => {
    if (certificate) {
      setUpdatedCertificate({
        certificateName: certificate.certificateName,
        certificateNumber: certificate.certificateNumber,
        issuanceDate: certificate.issuanceDate,
        issuingAuthority: certificate.issuingAuthority,
      });
    }
  }, [certificate]);

  const handleChange = (event) => {
    setUpdatedCertificate({
      ...updatedCertificate,
      [event.target.name]: event.target.value,
    });
  };

  const handleUpdate = () => {
    handleSubmit(updatedCertificate);
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Edit Certificate</DialogTitle>
      <DialogContent>
        <TextField
          label='Certificate Name'
          name='certificateName'
          value={updatedCertificate.certificateName}
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
          value={updatedCertificate.certificateNumber}
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
          value={updatedCertificate.issuanceDate}
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
          value={updatedCertificate.issuingAuthority}
          onChange={handleChange}
          fullWidth
          margin='normal'
          InputLabelProps={{
            shrink: true,
          }}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleUpdate} variant='contained' color='primary'>
          Update
        </Button>
        <Button onClick={handleClose} variant='outlined' color='secondary'>
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default UpdateCertificateDialog;
