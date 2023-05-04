import React from 'react';
import { IconButton, Tooltip } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

const DeleteCertificateButton = ({ onClick }) => {
  return (
    <Tooltip title="삭제하기">
      <IconButton onClick={onClick} aria-label="delete">
        <DeleteIcon />
      </IconButton>
    </Tooltip>
  );
};

export default DeleteCertificateButton;
