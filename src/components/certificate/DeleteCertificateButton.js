import React from 'react';
import { IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

const DeleteCertificateButton = ({ onClick }) => {
  return (
    <IconButton onClick={onClick} aria-label='delete'>
      <DeleteIcon />
    </IconButton>
  );
};

export default DeleteCertificateButton;
