import React, { useState } from 'react';
import { Button } from '@mui/material';
import CreateCertificateDialog from './CreateCertificateDialog';

const CreateCertificateButton = ({ onClick, onSubmit }) => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Button onClick={handleOpen}>Create Certificate</Button>
      <CreateCertificateDialog
        open={open}
        onClose={handleClose}
        onSubmit={onSubmit}
      />
    </>
  );
};

export default CreateCertificateButton;
