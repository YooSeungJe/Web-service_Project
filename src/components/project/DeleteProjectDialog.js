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
      <DialogTitle variant="h5">프로젝트 삭제</DialogTitle>
      <DialogContent>
        <Typography variant="body1">
          정말로 이 프로젝트를 삭제하시겠습니까? <br />
          <br /> 선택하신 항목 : "{projectTitle}"
        </Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} variant="outlined" color="secondary">
          취소하기
        </Button>
        <Button onClick={handleConfirmDelete} variant="contained" color="error">
          삭제하기
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteProjectDialog;
