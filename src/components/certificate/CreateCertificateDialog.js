import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
} from '@mui/material';

const CreateCertificateDialog = ({ open, onClose, onSubmit, reset }) => {
  const [certificationName, setCertificationName] = useState('');
  const [certificationNumber, setCertificationNumber] = useState('');
  const [issuanceDate, setIssuanceDate] = useState('');
  const [issuingAuthority, setIssuingAuthority] = useState('');

  const [isIssuanceDateFocused, setIsIssuanceDateFocused] = useState(false);

  const handleIssuanceDateFocus = () => {
    setIsIssuanceDateFocused(true);
  };

  const handleIssuanceDateBlur = () => {
    setIsIssuanceDateFocused(false);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const certification = {
      certificationName,
      certificationNumber,
      issuanceDate,
      issuingAuthority,
    };
    onSubmit(certification);
    setCertificationName('');
    setCertificationNumber('');
    setIssuanceDate('');
    setIssuingAuthority('');
    onClose();
  };
  const handleDialogClose = () => {
    setCertificationName('');
    setCertificationNumber('');
    setIssuanceDate('');
    setIssuingAuthority('');
    onClose();
  };

  return (
    <Dialog open={open} onClose={handleDialogClose}>
      <form onSubmit={handleSubmit}>
        <DialogTitle>Create Certificate</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Certification Name"
            name="certificationName"
            type="text"
            fullWidth
            required
            value={certificationName}
            onChange={(event) => setCertificationName(event.target.value)}
          />
          <TextField
            margin="dense"
            label="Certification Number"
            name="certificationNumber"
            type="text"
            fullWidth
            required
            value={certificationNumber}
            onChange={(event) => setCertificationNumber(event.target.value)}
          />
          <TextField
            margin="dense"
            label="Issuance Date"
            name="issuanceDate"
            type="date"
            fullWidth
            required
            value={issuanceDate}
            onFocus={handleIssuanceDateFocus}
            onBlur={handleIssuanceDateBlur}
            InputLabelProps={{
              shrink: true,
              ...(isIssuanceDateFocused && {
                placeholder: 'yyyy/mm/dd',
              }),
            }}
            onChange={(event) => setIssuanceDate(event.target.value)}
          />

          <TextField
            margin="dense"
            label="Issuing Authority"
            name="issuingAuthority"
            type="text"
            fullWidth
            required
            value={issuingAuthority}
            onChange={(event) => setIssuingAuthority(event.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose}>Cancel</Button>
          <Button type="submit">Create</Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default CreateCertificateDialog;
