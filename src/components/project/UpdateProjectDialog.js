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
  });
  const [updatedStartDate, setUpdatedStartDate] = useState(new Date());
  const [updatedEndDate, setUpdatedEndDate] = useState(new Date());

  useEffect(() => {
    if (project) {
      setUpdatedProject({
        title: project.title,
        description: project.description,
      });
      console.log(`project.startDate : ${project.startDate}`);
      console.log(`project.endDate : ${project.endDate}`);
      setUpdatedStartDate(new Date());
      setUpdatedEndDate(new Date());
      console.log(`updatedStartDate : ${updatedStartDate}`);
      console.log(`updatedEndDate : ${updatedEndDate}`);
    }
  }, [project]);

  const handleChange = (event) => {
    setUpdatedProject({
      ...updatedProject,
      [event.target.name]: event.target.value,
    });
  };

  const handleUpdate = () => {
    handleSubmit(project._id, {
      ...updatedProject,
      startDate: updatedStartDate,
      endDate: updatedEndDate,
    });
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
          value={updatedProject.StartDate}
          selected={updatedStartDate}
          onChange={(date) => setUpdatedStartDate(date)}
          dateFormat="yyyy.MM.dd"
        />
        <DatePicker
          value={updatedProject.EndDate}
          selected={updatedEndDate}
          onChange={(date) => setUpdatedEndDate(date)}
          dateFormat="yyyy.MM.dd"
          minDate={new Date(updatedStartDate)}
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
