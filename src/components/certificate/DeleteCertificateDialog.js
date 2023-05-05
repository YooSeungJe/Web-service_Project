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
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>자격증 정보 삭제</DialogTitle>
      <DialogContent>
        <Typography variant='body1'>
          정말로 이 자격증 정보를 삭제하시겠습니까? <br />
          <br /> 선택하신 항목 : "{certificate.certificationName}"
        </Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} variant='outlined' color='secondary'>
          취소하기
        </Button>
        <Button onClick={onConfirmDelete} variant='contained' color='error'>
          삭제하기
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteCertificateDialog;
