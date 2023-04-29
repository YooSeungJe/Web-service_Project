import React, { useState } from 'react';
import { Card, CardHeader, CardContent, CardActions, Box } from '@mui/material';
import UpdateAwardButton from './UpdateAwardButton';
import DeleteAwardButton from './DeleteAwardButton';
import DeleteAwardDialog from './DeleteAwardDialog';

const AwardCard = ({
  award,
  handleOpenUpdate,
  handleOpenDelete,
  handleDeleteConfirm,
  isEditable,
  currentUserId,
}) => {
  const { title, description, year } = award;

  const [deleteOpen, setDeleteOpen] = useState(false);

  const handleDeleteOpen = () => {
    setDeleteOpen(true);
  };

  const handleDeleteClose = () => {
    setDeleteOpen(false);
  };

  return (
    <Card>
      <CardHeader title={title} subheader={year} />
      <CardContent>{description}</CardContent>
      <CardActions disableSpacing>
        <Box sx={{ ml: 'auto' }}>
          {isEditable && (
            <UpdateAwardButton
              onClick={() => handleOpenUpdate(award.id)}
              id={award.id}
            />
          )}
          {isEditable && <DeleteAwardButton onClick={handleDeleteOpen} />}
        </Box>
      </CardActions>
      <DeleteAwardDialog
        open={deleteOpen}
        onClose={handleDeleteClose}
        handleDeleteConfirm={handleDeleteConfirm}
        awardId={award.id}
        awardTitle={award.title}
      />
    </Card>
  );
};

export default AwardCard;
