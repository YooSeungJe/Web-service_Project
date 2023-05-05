import React, { useState } from 'react';
import { Card, CardHeader, CardContent, CardActions, Box } from '@mui/material';
import UpdateEducationButton from './UpdateEducationButton';
import DeleteEducationButton from './DeleteEducationButton.js';
import DeleteEducationDialog from './DeleteEducationDialog';

import '../components.css';

const EducationCard = ({
  education,
  handleOpenUpdate,
  handleOpenDelete,
  handleDeleteConfirm,
  isEditable,
  currentUserId,
}) => {
  const { schoolName, major, graduationTypeCode } = education;

  const [deleteOpen, setDeleteOpen] = useState(false);

  // const handleDeleteOpen = () => {
  //   setDeleteOpen((prevState) => !prevState);
  // };

  // const handleDeleteClose = () => {
  //   setDeleteOpen((prevState) => !prevState);
  // };
  const handleDeleteButton = () => {
    setDeleteOpen((prevState) => !prevState);
  };
  return (
    <Card className="modelCard">
      <CardHeader
        variant="h5"
        title={schoolName}
        subheader={graduationTypeCode}
      />
      <CardContent sx={{ fontFamily: 'ChosunGu' }}>{major}</CardContent>
      <CardActions disableSpacing>
        <Box sx={{ ml: 'auto' }}>
          {isEditable && (
            <UpdateEducationButton
              onClick={() => handleOpenUpdate(education._id)}
              id={education._id}
            />
          )}
          {/* {isEditable && <DeleteEducationButton onClick={handleDeleteOpen} />} */}
          {isEditable && <DeleteEducationButton onClick={handleDeleteButton} />}
        </Box>
      </CardActions>
      <DeleteEducationDialog
        open={deleteOpen}
        // onClose={handleDeleteClose}
        onClose={handleDeleteButton}
        handleDeleteConfirm={() => handleDeleteConfirm(education._id)}
        educationId={education._id}
        educationTitle={education.schoolName}
      />
    </Card>
  );
};

export default EducationCard;
