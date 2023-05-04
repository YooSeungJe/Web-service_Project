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
      <DialogTitle variant="h5">자격증 정보 변경</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          label="자격증 이름"
          name="certificationName"
          value={updatedCertificate.certificationName}
          fullWidth
          onChange={handleInputChange}
        />
        <TextField
          margin="dense"
          label="자격증 번호"
          name="certificationNumber"
          value={updatedCertificate.certificationNumber}
          fullWidth
          onChange={handleInputChange}
        />
        <TextField
          margin="dense"
          label="발행날짜"
          type="date"
          name="issuanceDate"
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
          margin="dense"
          label="발행기관"
          name="issuingAuthority"
          value={updatedCertificate.issuingAuthority}
          fullWidth
          onChange={handleInputChange}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} variant="outlined" color="secondary">
          취소하기
        </Button>
        <Button onClick={handleUpdateClick} variant="contained" color="primary">
          변경하기
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default UpdateCertificateDialog;
