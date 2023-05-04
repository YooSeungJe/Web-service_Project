import React from 'react';
import { IconButton, Tooltip } from '@mui/material';
import { Edit } from '@mui/icons-material';

const UpdateCertificateButton = ({ onClick }) => (
  <Tooltip title="Edit Certificate">
    <IconButton sx={{ ml: 'auto' }} onClick={onClick}>
      <Edit />
    </IconButton>
  </Tooltip>
);

export default UpdateCertificateButton;
