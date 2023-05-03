import React from 'react';
import { IconButton } from '@mui/material';
import { Delete } from '@mui/icons-material';

const DeleteProjectButton = ({ onClick }) => {
  return (
    <IconButton onClick={onClick} aria-label="delete award">
      <Delete />
    </IconButton>
  );
};

export default DeleteProjectButton;
