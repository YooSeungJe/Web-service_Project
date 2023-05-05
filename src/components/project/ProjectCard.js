import React, { useState } from 'react';
import { Card, CardHeader, CardContent, CardActions, Box } from '@mui/material';
import UpdateProjectButton from './UpdateProjectButton';
import DeleteProjectButton from './DeleteProjectButton';
import DeleteProjectDialog from './DeleteProjectDialog';

import '../components.css';

const ProjectCard = ({
  project,
  handleOpenUpdate,
  handleOpenDelete,
  handleDeleteConfirm,
  isEditable,
  currentUserId,
}) => {
  const { title, description, startDate, endDate } = project;

  const [deleteOpen, setDeleteOpen] = useState(false);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString();
  };

  const handleDeleteButton = () => {
    setDeleteOpen((prevState) => !prevState);
  };
  return (
    <Card className="modelCard">
      <CardHeader
        variant="h5"
        title={title}
        subheader={`${formatDate(startDate)} ~ ${formatDate(endDate)}`}
      />
      <CardContent sx={{ fontFamily: 'ChosunGu' }}>{description}</CardContent>
      <CardActions disableSpacing>
        <Box sx={{ ml: 'auto' }}>
          {isEditable && (
            <UpdateProjectButton
              onClick={() => handleOpenUpdate(project._id)}
              id={project._id}
            />
          )}
          {/* {isEditable && <DeleteProjectButton onClick={handleDeleteOpen} />} */}
          {isEditable && <DeleteProjectButton onClick={handleDeleteButton} />}
        </Box>
      </CardActions>
      <DeleteProjectDialog
        open={deleteOpen}
        // onClose={handleDeleteClose}
        onClose={handleDeleteButton}
        handleDeleteConfirm={() => handleDeleteConfirm(project._id)}
        projectId={project._id}
        projectTitle={project.title}
      />
    </Card>
  );
};

export default ProjectCard;
