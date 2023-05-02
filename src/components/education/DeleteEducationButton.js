import React from 'react';
import { IconButton } from '@mui/material';
import { Delete } from '@mui/icons-material';

const DeleteEducationButton = ({ onClick }) => {
  return (
    <IconButton onClick={onClick} aria-label="delete education">
      <Delete />
    </IconButton>
  );
};

export default DeleteEducationButton;
