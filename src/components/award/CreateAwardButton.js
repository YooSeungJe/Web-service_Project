import React from 'react';
import { Box, Button } from '@mui/material';

const CreateAwardButton = ({ onClick, isEditable }) => {
  return isEditable ? (
    <Box textAlign="center">
      <Button variant="contained" color="primary" onClick={onClick}>
        추가하기
      </Button>
    </Box>
  ) : null;
};

export default CreateAwardButton;
