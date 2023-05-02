import React from 'react';
import { IconButton, Tooltip } from '@mui/material';
import { Edit } from '@mui/icons-material';

const UpdateEducationButton = ({ onClick, education }) => {
  return (
    <Tooltip title="Edit Education">
      <IconButton sx={{ ml: 'auto' }} onClick={() => onClick(education)}>
        <Edit />
      </IconButton>
    </Tooltip>
  );
};

export default UpdateEducationButton;
