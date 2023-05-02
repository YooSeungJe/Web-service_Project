import React from 'react';
import { Box, Button } from '@mui/material';

const CreateEducationButton = ({ onClick, isEditable }) => {
  return isEditable ? (
    <Box textAlign="center">
      <Button variant="contained" color="primary" onClick={onClick}>
        Create
      </Button>
    </Box>
  ) : null;
};

export default CreateEducationButton;