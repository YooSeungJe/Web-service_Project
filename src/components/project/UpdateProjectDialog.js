import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
} from '@mui/material';
import DatePicker from 'react-datepicker';

const UpdateProjectDialog = ({ open, onClose, project, handleSubmit }) => {
  const [updatedProject, setUpdatedProject] = useState({
    title: '',
    description: '',
    startDate: new Date(),
    endDate: new Date(),
  });

  useEffect(() => {
    if (project) {
      setUpdatedProject({
        title: project.title,
        description: project.description,
        startDate: project.startDate,
        endDate: project.endDate,
      });
    }
  }, [project]);

  const handleChange = (event) => {
    setUpdatedProject({
      ...updatedProject,
      [event.target.name]: event.target.value,
    });
  };

  const handleUpdate = () => {
    handleSubmit(project._id, updatedProject);
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Edit Project</DialogTitle>
      <DialogContent>
        <TextField
          margin="normal"
          fullWidth
          label="Title"
          name="title"
          value={updatedProject.title}
          onChange={handleChange}
        />
        <TextField
          margin="normal"
          fullWidth
          label="Description"
          name="description"
          value={updatedProject.description}
          onChange={handleChange}
        />
        <DatePicker
          name="startDate"
          value={updatedProject.startDate}
          selected={updatedProject.startDate}
          onChange={handleChange}
          dateFormat="yyyy.MM.dd"
        />
        <DatePicker
          name="endDate"
          value={updatedProject.endDate}
          selected={updatedProject.endDate}
          onChange={handleChange}
          dateFormat="yyyy.MM.dd"
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleUpdate}>Update</Button>
      </DialogActions>
    </Dialog>
  );
};

export default UpdateProjectDialog;
