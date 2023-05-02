import React, { useEffect, useState } from 'react';
import { Box, Typography, Grid } from '@mui/material';
import { get, post, patch, delete as del } from '../../api';
import CertificateCard from './CertificateCard';
import CreateCertificateButton from './CreateCertificateButton';
import CreateCertificateDialog from './CreateCertificateDialog';
import UpdateCertificateDialog from './UpdateCertificateDialog';

const CertificateList = ({ portfolioOwnerId, isEditable }) => {
  const [certificates, setCertificates] = useState([]);
  const [createOpen, setCreateOpen] = useState(false);
  const [newCertificate, setNewCertificate] = useState({
    certificateName: '',
    certificateNumber: '',
    issuanceDate: '',
    issuingAuthority: '',
  });

  const [selectedCertificateId, setSelectedCertificateId] = useState(null);
  const [updateOpen, setUpdateOpen] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await get(`certificates/${portfolioOwnerId}`);
        console.log(portfolioOwnerId);
        setCertificates(response.data);
      } catch (error) {
        console.error('Error fetching certificates:', error);
      }
    };

    fetchData();
  }, [portfolioOwnerId]);

  const handleOpenCreate = () => {
    setCreateOpen(true);
  };

  const handleCloseCreate = () => {
    setCreateOpen(false);
  };

  const handleChangeCreate = (event) => {
    setNewCertificate({
      ...newCertificate,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async () => {
    try {
      await post('certificates', newCertificate);
      const response = await get(`certificates/${portfolioOwnerId}`);
      setCertificates(response.data);
      setCreateOpen(false);

      setNewCertificate({
        certificateName: '',
        certificateNumber: '',
        issuanceDate: '',
        issuingAuthority: '',
      });
      handleCloseCreate();
    } catch (error) {
      console.error('Error creating certificate:', error);
    }
  };

  const handleOpenUpdate = (id) => {
    setSelectedCertificateId(id);
    console.log('Update clicked for certificate:', id);
    setUpdateOpen(true);
  };

  const handleUpdateClose = () => {
    setUpdateOpen(false);
    setSelectedCertificateId(null);
    setNewCertificate({
      certificateName: '',
      certificateNumber: '',
      issuanceDate: '',
      issuingAuthority: '',
    });
  };

  const handleUpdateSubmit = async (id, updatedCertificate) => {
    try {
      await patch(`certificates/${id}`, updatedCertificate);
      const response = await get(`certificates/${portfolioOwnerId}`);
      setCertificates(response.data);
      handleUpdateClose();
    } catch (error) {
      console.error('Error updating certificate:', error);
    }
  };

  const handleDeleteConfirm = async (id) => {
    try {
      await del(`certificates/${id}`);
      setCertificates((prevCertificates) =>
        prevCertificates.filter((certificate) => certificate.id !== id)
      );
    } catch (error) {
      console.error('Error deleting certificate:', error);
    }
  };

  return (
    <Box>
      <Typography variant="h4">Certificates</Typography>
      {certificates.length === 0 && (
        <Typography variant="body1">No certificates found.</Typography>
      )}
      {certificates.length > 0 && (
        <Grid container spacing={2}>
          {certificates.map((certificate) => (
            <Grid item key={certificate.id} xs={12} sm={6} md={4}>
              <CertificateCard
                key={certificate.id}
                certificate={certificate}
                isEditable={isEditable}
                handleDeleteConfirm={handleDeleteConfirm}
                handleOpenUpdate={handleOpenUpdate}
              />
            </Grid>
          ))}
        </Grid>
      )}
      {isEditable && (
        <Box mt={2}>
          <CreateCertificateButton onClick={handleOpenCreate} />
        </Box>
      )}
      <CreateCertificateDialog
        open={createOpen}
        handleClose={handleCloseCreate}
        handleChange={handleChangeCreate}
        handleSubmit={handleSubmit}
        newCertificate={newCertificate}
      />
      <UpdateCertificateDialog
        open={updateOpen}
        handleClose={handleUpdateClose}
        handleSubmit={handleUpdateSubmit}
        certificate={certificates.find((c) => c.id === selectedCertificateId)}
      />
    </Box>
  );
};

export default CertificateList;
