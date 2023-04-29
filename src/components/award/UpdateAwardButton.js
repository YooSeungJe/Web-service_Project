import React from 'react';
import { IconButton, Tooltip } from '@mui/material';
import { Edit } from '@mui/icons-material';

const UpdateAwardButton = ({ onClick, id }) => {
  return (
    <Tooltip title='Edit Award'>
      <IconButton sx={{ ml: 'auto' }} onClick={() => onClick(id)}>
        <Edit />
      </IconButton>
    </Tooltip>
  );
};

export default UpdateAwardButton;
