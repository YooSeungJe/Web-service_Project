import React, { useState } from 'react';
import Button from '@mui/material/Button';
import AwardForm from './AwardForm';
import { put, delete as del } from '../../api';
import Box from '@mui/material/Box';

const AwardItem = ({ award, onDelete, onUpdate }) => {
  const [editing, setEditing] = useState(false);
  const [title, setTitle] = useState(award.title);
  const [description, setDescription] = useState(award.description);
  const [year, setYear] = useState(award.year);

  const handleDelete = async () => {
    try {
      console.log('Deleting award with ID:', award.id);
      const response = await del(`awards/${award.id}`);
      console.log('Delete response:', response);
      onDelete(award.id);
    } catch (error) {
      console.error(error);
    }
  };

  const handleUpdate = async () => {
    try {
      const response = await put(`awards/${award.id}`, {
        title,
        description,
        year,
      });
      onUpdate(response.data);
      setEditing(false);
      setTitle(response.data.title);
      setDescription(response.data.description);
      setYear(response.data.year);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      {!editing ? (
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            borderBottom: '1px solid #ddd',
            py: 1,
          }}
        >
          <Box>
            <h3>{award.title}</h3>
            <p>
              {award.description} ({award.year})
            </p>
          </Box>
          <Box>
            <Button
              onClick={() => setEditing(true)}
              variant='contained'
              size='small'
              sx={{ mr: 1 }}
            >
              Update
            </Button>
            <Button
              onClick={handleDelete}
              variant='contained'
              color='error'
              size='small'
            >
              Delete
            </Button>
          </Box>
        </Box>
      ) : (
        <AwardForm
          title={title}
          setTitle={setTitle}
          description={description}
          setDescription={setDescription}
          year={year}
          setYear={setYear}
          handleCreate={handleUpdate}
          handleCancel={() => setEditing(false)}
          submitText='Update'
        />
      )}
    </>
  );
};

export default AwardItem;
