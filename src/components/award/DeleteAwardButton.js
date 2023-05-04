import React from 'react';
import { IconButton, Tooltip } from '@mui/material';
import { Delete } from '@mui/icons-material';

const DeleteAwardButton = ({ onClick }) => {
  return (
    <Tooltip title="삭제하기">
      <IconButton onClick={onClick} aria-label="delete award">
        <Delete />
      </IconButton>
    </Tooltip>
  );
};

export default DeleteAwardButton;
