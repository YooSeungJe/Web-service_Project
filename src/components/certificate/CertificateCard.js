import React, { useState } from 'react';
import { Card, CardHeader, CardContent, CardActions, Box } from '@mui/material';
import UpdateCertificateButton from './UpdateCertificateButton';
import DeleteCertificateButton from './DeleteCertificateButton';
import DeleteCertificateDialog from './DeleteCertificateDialog';

const CertificateCard = ({
  certificate,
  handleOpenUpdate,
  handleDeleteConfirm,
  isEditable,
}) => {
  const { certificateName, certificateNumber, issuanceDate, issuingAuthority } =
    certificate;

  const [deleteOpen, setDeleteOpen] = useState(false);

  const handleDeleteOpen = () => {
    setDeleteOpen(true);
  };

  const handleDeleteClose = () => {
    setDeleteOpen(false);
  };

  return (
    <Card>
      <CardHeader title={certificateName} subheader={issuingAuthority} />
      <CardContent>
        <p>Certificate Number: {certificateNumber}</p>
        <p>Issuance Date: {new Date(issuanceDate).toLocaleDateString()}</p>
      </CardContent>
      <CardActions disableSpacing>
        <Box sx={{ ml: 'auto' }}>
          {isEditable && (
            <UpdateCertificateButton
              onClick={() => handleOpenUpdate(certificate.id)}
              id={certificate.id}
            />
          )}
          {isEditable && <DeleteCertificateButton onClick={handleDeleteOpen} />}
        </Box>
      </CardActions>
      <DeleteCertificateDialog
        open={deleteOpen}
        onClose={handleDeleteClose}
        handleDeleteConfirm={handleDeleteConfirm}
        certificateId={certificate.id}
        certificateName={certificate.certificateName}
      />
    </Card>
  );
};

export default CertificateCard;
