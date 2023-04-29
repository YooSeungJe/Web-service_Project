import React from 'react';
import { Box, Button } from '@mui/material';

const CreateCertificateButton = ({ onClick }) => {
  return (
    <Box textAlign='center'>
      <Button variant='contained' color='primary' onClick={onClick}>
        Add Certificate
      </Button>
    </Box>
  );
};

export default CreateCertificateButton;
