import React, { useState, useEffect } from 'react';
import { get, post, put, delete as del } from '../../api';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import AwardForm from './AwardForm';
import AwardsList from './AwardsList';

const AwardList = () => {
  const [awards, setAwards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [year, setYear] = useState('');
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await get('awards');
        setAwards(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching awards:', error);
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      const newAward = { title, description, year };

      const response = await post('awards', newAward);
      if (response.status === 201) {
        setAwards([...awards, newAward]);
        setTitle('');
        setDescription('');
        setYear('');
        setShowForm(false); // Hide the form after submitting
      }
    } catch (error) {
      console.error('Error creating new award:', error);
    }
  };

  const handleShowForm = () => {
    setShowForm(true);
  };

  const handleCancel = () => {
    setShowForm(false);
  };

  const handleDelete = async (id) => {
    try {
      const response = await del(`awards/${id}`);
      if (response.status === 204) {
        setAwards(awards.filter((award) => award.id !== id));
      }
    } catch (error) {
      console.error('Error deleting award:', error);
    }
  };

  const handleUpdate = async (id, updatedAward) => {
    try {
      const response = await put('awards', {
        id,
        ...updatedAward,
      });
      if (response.status === 200) {
        const updatedAwards = awards.map((award) =>
          award.id === id ? response.data : award
        );
        setAwards(updatedAwards);
      }
    } catch (error) {
      console.error('Error updating award:', error);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <Container maxWidth='sm'>
      <Box my={4}>
        <Typography variant='h4' component='h1' gutterBottom>
          Award List
        </Typography>
        <AwardsList
          awards={awards}
          setAwards={setAwards}
          onDelete={handleDelete}
          onUpdate={handleUpdate}
        />
        {!showForm && (
          <Button onClick={handleShowForm} variant='contained' color='primary'>
            Create
          </Button>
        )}
        {showForm && (
          <AwardForm
            title={title}
            setTitle={setTitle}
            description={description}
            setDescription={setDescription}
            year={year}
            setYear={setYear}
            handleCreate={handleCreate}
            handleCancel={handleCancel}
          />
        )}
      </Box>
    </Container>
  );
};

export default AwardList;
