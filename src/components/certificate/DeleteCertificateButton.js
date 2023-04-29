import React from 'react';
import { IconButton } from '@mui/material';
import { Delete } from '@mui/icons-material';

const DeleteCertificateButton = ({ onClick }) => {
  return (
    <IconButton onClick={onClick} aria-label='delete certificate'>
      <Delete />
    </IconButton>
  );
};

export default DeleteCertificateButton;
