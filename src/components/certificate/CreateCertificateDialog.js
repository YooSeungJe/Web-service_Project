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
        <DialogTitle variant="h5">자격증 정보 추가</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="자격증 이름"
            name="certificationName"
            type="text"
            fullWidth
            required
            value={certificationName}
            onChange={(event) => setCertificationName(event.target.value)}
          />
          <TextField
            margin="dense"
            label="자격증 번호"
            name="certificationNumber"
            type="text"
            fullWidth
            required
            value={certificationNumber}
            onChange={(event) => setCertificationNumber(event.target.value)}
          />
          <TextField
            margin="dense"
            label="발행날짜"
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
            label="발행기관"
            name="issuingAuthority"
            type="text"
            fullWidth
            required
            value={issuingAuthority}
            onChange={(event) => setIssuingAuthority(event.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleDialogClose}
            variant="outlined"
            color="secondary"
          >
            취소하기
          </Button>
          <Button type="submit" variant="contained" color="primary">
            추가하기
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default CreateCertificateDialog;
