import React, { useEffect, useState } from 'react';
import { Typography, Grid } from '@mui/material';
import { get, post, patch, delete as del } from '../../api';
import AwardCard from './AwardCard';
import CreateAwardButton from './CreateAwardButton';
import CreateAwardDialog from './CreateAwardDialog';
import UpdateAwardDialog from './UpdateAwardDialog';

import '../components.css';

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

  const checkEmpty = (ref, input1, input2) => {
    switch (true) {
      case ref.title.length === 0:
        input1.current.querySelector('input').focus();
        input1.current.querySelector('input').placeholder =
          '한글자 이상을 입력해주세요';
        return false;
      case ref.description.length === 0:
        input2.current.querySelector('input').focus();
        input2.current.querySelector('input').placeholder =
          '한글자 이상을 입력해주세요';
        return false;
      default:
        return true;
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await get(`awards/${portfolioOwnerId}`);
        setAwards(response.data.awards);
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
      setAwards(response.data.awards);
      setCreateOpen(false);

      setNewAward({ title: '', description: '', year: '' });
      handleCloseCreate();
    } catch (error) {
      console.error('Error creating award:', error);
    }
  };

  const handleOpenUpdate = (_id) => {
    setSelectedAwardId(_id);
    setUpdateOpen(true);
  };

  const handleUpdateClose = () => {
    setUpdateOpen(false);
    setSelectedAwardId(null);
    setNewAward({ title: '', description: '', year: '' });
  };

  const handleOpenDelete = (_id) => {};

  const handleUpdateSubmit = async (_id, updatedAward) => {
    try {
      await patch(`awards/${_id}`, updatedAward);
      const response = await get(`awards/${portfolioOwnerId}`);
      setAwards(response.data.awards);
      handleUpdateClose();
    } catch (error) {
      console.error('Error updating award:', error);
    }
  };

  const handleDeleteConfirm = async (_id) => {
    try {
      await del(`awards/${_id}`);
      setAwards((prevAwards) =>
        prevAwards.filter((award) => award._id !== _id)
      );
      setSelectedAwardId(null);
      handleCloseDelete();
    } catch (error) {
      console.error('Error deleting award:', error);
    }
  };

  const handleCloseDelete = () => {
    setSelectedAwardId(null);
  };

  return (
    <div className='award-box'>
      <Typography variant='h4'>수상 경력</Typography>
      {awards.length === 0 && (
        <Typography variant='body2'>
          등록된 수상 내용이 없습니다.
          <br />
          <br />
          아래 버튼으로 수상 경력을 추가해보세요.
        </Typography>
      )}
      {awards.length > 0 && (
        <Grid container spacing={2} key='award-grid'>
          {awards.map((award) => (
            <Grid item key={award._id} xs={12} sm={6} md={4}>
              <AwardCard
                key={award._id}
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
      <div>
        <CreateAwardButton onClick={handleOpenCreate} isEditable={isEditable} />
      </div>
      <CreateAwardDialog
        open={createOpen}
        onClose={handleCloseCreate}
        newAward={newAward}
        handleChange={handleChangeCreate}
        handleSubmit={handleSubmit}
        setNewAward={setNewAward}
        checkEmpty={checkEmpty}
      />
      <UpdateAwardDialog
        open={updateOpen}
        onClose={handleUpdateClose}
        award={awards.find((award) => award._id === selectedAwardId)}
        handleSubmit={handleUpdateSubmit}
        checkEmpty={checkEmpty}
      />
    </div>
  );
};

export default AwardList;
