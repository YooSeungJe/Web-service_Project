import React, { useState } from 'react';
import { Card, CardHeader, CardContent, CardActions, Box } from '@mui/material';
import UpdateAwardButton from './UpdateAwardButton';
import DeleteAwardButton from './DeleteAwardButton';
import DeleteAwardDialog from './DeleteAwardDialog';

import '../components.css';

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

  const handleDeleteButton = () => {
    setDeleteOpen((prevState) => !prevState);
  };
  return (
    <Card className="modelCard">
      <CardHeader variant="h5" title={title} subheader={year} />
      <CardContent sx={{ fontFamily: 'ChosunGu' }}>{description}</CardContent>
      <CardActions disableSpacing>
        <Box sx={{ ml: 'auto' }}>
          {isEditable && (
            <UpdateAwardButton
              onClick={() => handleOpenUpdate(award._id)}
              id={award._id}
            />
          )}
          {isEditable && <DeleteAwardButton onClick={handleDeleteButton} />}
        </Box>
      </CardActions>
      <DeleteAwardDialog
        open={deleteOpen}
        onClose={handleDeleteButton}
        handleDeleteConfirm={() => handleDeleteConfirm(award._id)}
        awardId={award._id}
        awardTitle={award.title}
      />
    </Card>
  );
};

export default AwardCard;
