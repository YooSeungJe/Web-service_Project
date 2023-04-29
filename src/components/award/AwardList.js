import React, { useEffect, useState } from 'react';
import { Box, Typography, Grid } from '@mui/material';
import { get, post, patch, delete as del } from '../../api';
import AwardCard from './AwardCard';
import CreateAwardButton from './CreateAwardButton';
import CreateAwardDialog from './CreateAwardDialog';
import UpdateAwardDialog from './UpdateAwardDialog';

const AwardList = ({ portfolioOwnerId, isEditable }) => {
  const [awards, setAwards] = useState([]);
  const [createOpen, setCreateOpen] = useState(false);
  const [newAward, setNewAward] = useState({
    title: '',
    description: '',
    year: '',
  });

  const [selectedAwardId, setSelectedAwardId] = useState(null);
  const [updateOpen, setUpdateOpen] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await get(`awards/${portfolioOwnerId}`);
        console.log(portfolioOwnerId);
        setAwards(response.data);
      } catch (error) {
        console.error('Error fetching awards:', error);
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
    setNewAward({ ...newAward, [event.target.name]: event.target.value });
  };

  const handleSubmit = async () => {
    try {
      await post('awards', newAward);
      const response = await get(`awards/${portfolioOwnerId}`);
      setAwards(response.data);
      setCreateOpen(false);

      setNewAward({ title: '', description: '', year: '' });
      handleCloseCreate();
    } catch (error) {
      console.error('Error creating award:', error);
    }
  };

  const handleOpenUpdate = (id) => {
    setSelectedAwardId(id);
    console.log('Update clicked for award:', id);
    // Open the update dialog
    setUpdateOpen(true);
  };

  const handleUpdateClose = () => {
    setUpdateOpen(false);
    setSelectedAwardId(null);
    setNewAward({ title: '', description: '', year: '' });
  };

  const handleOpenDelete = (id) => {
    console.log('Delete clicked for award:', id);
  };
  const handleUpdateSubmit = async (id, updatedAward) => {
    try {
      await patch(`awards/${id}`, updatedAward);
      const response = await get(`awards/${portfolioOwnerId}`);
      setAwards(response.data);
      handleUpdateClose();
    } catch (error) {
      console.error('Error updating award:', error);
    }
  };

  const handleDeleteConfirm = async (id) => {
    try {
      await del(`awards/${id}`);
      setAwards((prevAwards) => prevAwards.filter((award) => award.id !== id));
      handleCloseDelete();
    } catch (error) {
      console.error('Error deleting award:', error);
    }
  };

  const handleCloseDelete = () => {
    console.log('Closing delete dialog');
  };

  return (
    <Box>
      <Typography variant='h4'>Awards</Typography>
      {awards.length === 0 && (
        <Typography variant='body1'>No awards found.</Typography>
      )}
      {awards.length > 0 && (
        <Grid container spacing={2}>
          {awards.map((award) => (
            <Grid item key={award.id} xs={12} sm={6} md={4}>
              <AwardCard
                key={award.id}
                award={award}
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
        <CreateAwardButton onClick={handleOpenCreate} isEditable={isEditable} />
      </Box>
      <CreateAwardDialog
        open={createOpen}
        onClose={handleCloseCreate}
        newAward={newAward}
        handleChange={handleChangeCreate}
        handleSubmit={handleSubmit}
      />
      <UpdateAwardDialog
        open={updateOpen}
        onClose={handleUpdateClose}
        award={awards.find((award) => award.id === selectedAwardId)}
        handleSubmit={handleUpdateSubmit}
      />
    </Box>
  );
};

export default AwardList;
