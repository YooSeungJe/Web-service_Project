import React, { useState } from 'react';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from '@mui/material';
const UpdateCertificateDialog = ({
  open,
  onClose,
  certificate,
  handleUpdate,
}) => {
  const [updatedCertificate, setUpdatedCertificate] = useState({
    certificationName: certificate.certificationName,
    certificationNumber: certificate.certificationNumber,
    issuanceDate: certificate.issuanceDate,
    issuingAuthority: certificate.issuingAuthority,
  });

  const handleInputChange = (event) => {
    setUpdatedCertificate({
      ...updatedCertificate,
      [event.target.name]: event.target.value,
    });
  };

  const handleUpdateClick = () => {
    handleUpdate(updatedCertificate);
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Update Certificate</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin='dense'
          label='Certification Name'
          name='certificationName'
          value={updatedCertificate.certificationName}
          fullWidth
          onChange={handleInputChange}
        />
        <TextField
          margin='dense'
          label='Certification Number'
          name='certificationNumber'
          value={updatedCertificate.certificationNumber}
          fullWidth
          onChange={handleInputChange}
        />
        <TextField
          margin='dense'
          label='Issuance Date'
          type='date'
          name='issuanceDate'
          value={new Date(certificate.issuanceDate).toISOString().slice(0, 10)}
          InputLabelProps={{
            shrink: true,
          }}
          inputProps={{
            max: '9999-12-31',
          }}
          fullWidth
          onChange={handleInputChange}
        />
        <TextField
          margin='dense'
          label='Issuing Authority'
          name='issuingAuthority'
          value={updatedCertificate.issuingAuthority}
          fullWidth
          onChange={handleInputChange}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleUpdateClick} color='primary'>
          Update
        </Button>
      </DialogActions>
    </Dialog>
  );
};

const UpdateCertificateButton = ({ onClick }) => (
  <Button onClick={onClick} size='small'>
    Update
  </Button>
);

export { UpdateCertificateButton, UpdateCertificateDialog };
