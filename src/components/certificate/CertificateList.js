import React, { useEffect, useState } from 'react';
import { Typography, Grid } from '@mui/material';
import { get, post, put, delete as del } from '../../api';
import CertificateCard from './CertificateCard';
import CreateCertificateButton from './CreateCertificateButton';
import CreateCertificateDialog from './CreateCertificateDialog';
import UpdateCertificateDialog from './UpdateCertificateDialog';

import '../components.css';

const CertificateList = ({ portfolioOwnerId, isEditable }) => {
  const [certificates, setCertificates] = useState([]);
  const [createOpen, setCreateOpen] = useState(false);
  const [newCertificate, setNewCertificate] = useState({
    certificationName: '',
    certificationNumber: '',
    issuanceDate: '',
    issuingAuthority: '',
  });
  const [updatedCertificate, setUpdatedCertificate] = useState(null);

  const [selectedCertificateId, setSelectedCertificateId] = useState(null);
  const [updateOpen, setUpdateOpen] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await get(`certificates/${portfolioOwnerId}`);
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
    setNewCertificate({
      certificationName: '',
      certificationNumber: '',
      issuanceDate: '',
      issuingAuthority: '',
    });
  };

  const handleSubmit = async (certification) => {
    try {
      const response = await post('certificates', certification);
      setCertificates([...certificates, response.data]);
      setCreateOpen(false);

      setNewCertificate({
        certificationName: '',
        certificationNumber: '',
        issuanceDate: '',
        issuingAuthority: '',
      });
      setSelectedCertificateId(response.data._id);
      handleCloseCreate();
    } catch (error) {
      console.error('Error creating certificate:', error);
    }
  };
  const handleOpenUpdate = (selectedCertificateId) => {
    setSelectedCertificateId(selectedCertificateId);
    const currentCertificate = certificates.find(
      (c) => c._id === selectedCertificateId
    );
    setUpdatedCertificate(currentCertificate); // Add this line

    setUpdateOpen(true);
  };

  const handleUpdateClose = () => {
    setUpdateOpen(false);
    setSelectedCertificateId(null);
    setNewCertificate({
      certificationName: '',
      certificationNumber: '',
      issuanceDate: '',
      issuingAuthority: '',
    });
  };
  const handleUpdateSubmit = async (updatedCertificate) => {
    try {
      setCertificates(
        certificates.map((c) => {
          if (c._id === selectedCertificateId) {
            return {
              ...c,
              certificationName: updatedCertificate.certificationName,
              certificationNumber: updatedCertificate.certificationNumber,
              issuanceDate: updatedCertificate.issuanceDate,
              issuingAuthority: updatedCertificate.issuingAuthority,
            };
          }
          return c;
        })
      );

      await put(`certificates/${selectedCertificateId}`, updatedCertificate);
      handleUpdateClose();
    } catch (error) {
      console.error('Error updating certificate:', error);
    }
  };

  const handleDeleteConfirm = async (certificateId) => {
    try {
      await del(`certificates/${certificateId}`);
      setCertificates((prevCertificates) =>
        prevCertificates.filter(
          (certificate) => certificate._id !== certificateId
        )
      );
    } catch (error) {
      console.error('Error deleting certificate:', error);
    }
  };

  return (
    <div className='cert-box'>
      <Typography className='modelTitle' variant='h4'>
        자격증
      </Typography>
      {certificates.length === 0 && (
        <Typography variant='body2'>
          등록된 자격증 내용이 없습니다.
          <br />
          <br />
          아래 버튼으로 보유하신 자격증 정보를 추가해보세요.
        </Typography>
      )}
      {certificates.length > 0 && (
        <Grid container spacing={2}>
          {certificates.map((certificate) => (
            <Grid item key={certificate._id} xs={12} sm={6} md={4}>
              <CertificateCard
                key={certificate._id}
                certificate={certificate}
                isEditable={isEditable}
                handleDeleteConfirm={() => handleDeleteConfirm(certificate._id)}
                handleOpenUpdate={() => handleOpenUpdate(certificate._id)}
              />
            </Grid>
          ))}
        </Grid>
      )}
      {isEditable && (
        <div>
          <CreateCertificateButton
            onClick={handleOpenCreate}
            onSubmit={handleSubmit}
          />
        </div>
      )}
      <CreateCertificateDialog
        open={createOpen}
        onClose={handleCloseCreate}
        onSubmit={handleSubmit}
      />

      {selectedCertificateId &&
        certificates.find((c) => c._id === selectedCertificateId) && (
          <UpdateCertificateDialog
            open={updateOpen}
            onClose={handleUpdateClose}
            handleUpdate={handleUpdateSubmit}
            certificate={certificates.find(
              (c) => c._id === selectedCertificateId
            )}
            updatedCertificate={updatedCertificate}
          />
        )}
    </div>
  );
};

export default CertificateList;
