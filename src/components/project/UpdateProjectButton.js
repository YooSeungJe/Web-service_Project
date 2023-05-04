import React from 'react';
import { IconButton, Tooltip } from '@mui/material';
import { Edit } from '@mui/icons-material';

const UpdateProjectButton = ({ onClick, project }) => {
  return (
    <Tooltip title="변경하기">
      <IconButton sx={{ ml: 'auto' }} onClick={() => onClick(project)}>
        <Edit />
      </IconButton>
    </Tooltip>
  );
};

export default UpdateProjectButton;
