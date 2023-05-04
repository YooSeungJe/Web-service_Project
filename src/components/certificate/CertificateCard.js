import React, { useState } from 'react';
import { Card, CardHeader, CardContent, CardActions, Box } from '@mui/material';
import DeleteCertificateButton from './DeleteCertificateButton';
import DeleteCertificateDialog from './DeleteCertificateDialog';
import { UpdateCertificateButton } from './UpdateCertificate';

import '../components.css';

const CertificateCard = ({
  certificate,
  handleOpenUpdate,
  handleDeleteConfirm,
  isEditable,
}) => {
  const [deleteOpen, setDeleteOpen] = useState(false);

  const handleDeleteOpen = () => {
    setDeleteOpen(true);
  };

  const handleDeleteClose = () => {
    setDeleteOpen(false);
  };

  const handleDelete = async () => {
    try {
      await handleDeleteConfirm(certificate._id);
    } catch (error) {
      console.error('Error deleting certificate:', error);
    }
  };

  return (
    <Card className="card">
      <CardHeader
        variants="h5"
        title={certificate.certificationName}
        subheader={certificate.issuingAuthority}
      />
      <CardContent>
        <p>Certification Number: {certificate.certificationNumber}</p>
        <p>
          Issuance Date:{' '}
          {new Date(certificate.issuanceDate).toLocaleDateString()}
        </p>
      </CardContent>
      <CardActions disableSpacing>
        <Box sx={{ ml: 'auto' }}>
          {isEditable && (
            <UpdateCertificateButton
              onClick={() => handleOpenUpdate(certificate._id)}
              id={certificate._id}
            />
          )}
          {isEditable && <DeleteCertificateButton onClick={handleDeleteOpen} />}
        </Box>
      </CardActions>
      <DeleteCertificateDialog
        open={deleteOpen}
        onClose={handleDeleteClose}
        onConfirmDelete={handleDelete}
        certificate={certificate}
      />
    </Card>
  );
};

export default CertificateCard;
