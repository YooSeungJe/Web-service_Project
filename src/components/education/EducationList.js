import React, { useEffect, useState } from 'react';
import { Box, Typography, Grid } from '@mui/material';
import { get, post, patch, delete as del } from '../../api';
import EducationCard from './EducationCard';
import CreateEducationButton from './CreateEducationButton';
import CreateEducationDialog from './CreateEducationDialog.js';
import UpdateEducationDialog from './UpdateEducationDialog';
import { ConstructionOutlined } from '@mui/icons-material';

const EducationList = ({ portfolioOwnerId, isEditable }) => {
  const [educations, setEducations] = useState([]);
  const [createOpen, setCreateOpen] = useState(false);
  const [newEducation, setNewEducation] = useState({
    schoolName: '',
    major: '',
    graduationTypeCode: '',
  });

  const [selectedEducationId, setSelectedEducationId] = useState(null);
  const [updateOpen, setUpdateOpen] = useState(false);

  const checkEmpty = (ref, input1, input2) => {
    if (ref.schoolName.length === 0) {
      input1.current.querySelector('input').focus();
      input1.current.querySelector('input').placeholder =
        '한글자 이상을 입력해주세요.';
      input1.current.querySelector('input').style.color = 'red';
      return false;
    } else if (ref.major.length === 0) {
      input2.current.querySelector('input').focus();
      input2.current.querySelector('input').placeholder =
        '한글자 이상을 입력해주세요.';
      input2.current.querySelector('input').style.color = 'red';
      return false;
    } else return true;
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await get(`education/${portfolioOwnerId}`);
        setEducations(response.data);
      } catch (error) {
        console.error('Error fetching educations:', error);
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
    setNewEducation({
      ...newEducation,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async () => {
    try {
      await post('education', newEducation);
      const response = await get(`education/${portfolioOwnerId}`);
      setEducations(response.data);
      setCreateOpen(false);

      setNewEducation({ schoolName: '', major: '', graduationTypeCode: '' });
      handleCloseCreate();
    } catch (error) {
      console.error('Error creating education:', error);
    }
  };

  const handleOpenUpdate = (_id) => {
    setSelectedEducationId(_id);
    console.log('Update clicked for education:', _id);
    // Open the update dialog
    setUpdateOpen(true);
  };

  const handleUpdateClose = () => {
    setUpdateOpen(false);
    setSelectedEducationId(null);
    setNewEducation({ schoolName: '', major: '', graduationTypeCode: '' });
  };

  const handleOpenDelete = (_id) => {
    console.log('Delete clicked for education:', _id);
  };

  const handleUpdateSubmit = async (_id, updatedEducation) => {
    try {
      await patch(`education/${_id}`, updatedEducation);
      const response = await get(`education/${portfolioOwnerId}`);
      setEducations(response.data);
      handleUpdateClose();
    } catch (error) {
      console.log(`updatedEducation : ${updatedEducation}`);
      console.log(
        `updatedEducation.schoolName : ${updatedEducation.schoolName}`
      );
      console.log(`_id : ${_id}`);
      console.log(`portfolioOwnerId : ${portfolioOwnerId}`);
      console.error('Error updating education:', error);
    }
  };

  const handleDeleteConfirm = async (_id) => {
    try {
      await del(`education/${_id}`);
      setEducations((prevEducations) =>
        prevEducations.filter((education) => education._id !== _id)
      );
      setSelectedEducationId(null);
      handleCloseDelete();
    } catch (error) {
      console.error('Error deleting education:', error);
    }
  };

  const handleCloseDelete = () => {
    setSelectedEducationId(null);
  };

  return (
    <Box>
      <Typography variant="h4">Educations</Typography>
      {educations.length === 0 && (
        <Typography variant="body1">No educations found.</Typography>
      )}
      {educations.length > 0 && (
        <Grid container spacing={2} key="education-grid">
          {educations.map((education) => (
            <Grid item key={education._id} xs={12} sm={6} md={4}>
              <EducationCard
                key={education._id}
                education={education}
                handleOpenUpdate={handleOpenUpdate}
                handleOpenDelete={handleOpenDelete}
                handleDeleteConfirm={handleDeleteConfirm}
                isEditable={isEditable}
              />
            </Grid>
          ))}
        </Grid>
      )}
      <Box mt={2}>
        <CreateEducationButton
          onClick={handleOpenCreate}
          isEditable={isEditable}
        />
      </Box>
      <CreateEducationDialog
        open={createOpen}
        onClose={handleCloseCreate}
        newEducation={newEducation}
        handleChange={handleChangeCreate}
        handleSubmit={handleSubmit}
        setNewEducation={setNewEducation}
        checkEmpty={checkEmpty}
      />
      <UpdateEducationDialog
        open={updateOpen}
        onClose={handleUpdateClose}
        education={educations.find(
          (education) => education._id === selectedEducationId
        )}
        handleSubmit={handleUpdateSubmit}
        checkEmpty={checkEmpty}
      />
    </Box>
  );
};

export default EducationList;
