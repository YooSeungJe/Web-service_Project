import React from 'react';
import { IconButton, Tooltip } from '@mui/material';
import { Edit } from '@mui/icons-material';

const UpdateAwardButton = ({ onClick, award }) => {
  return (
    <Tooltip title="변경하기">
      <IconButton sx={{ ml: 'auto' }} onClick={() => onClick(award)}>
        <Edit />
      </IconButton>
    </Tooltip>
  );
};

export default UpdateAwardButton;
