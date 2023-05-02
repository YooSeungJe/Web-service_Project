import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
  Button,
} from '@mui/material';
import DatePicker from 'react-datepicker';

const CreateProjectDialog = ({
  open,
  onClose,
  newProject,
  handleChange,
  handleSubmit,
  setNewProject,
}) => {
  const handleClose = () => {
    setNewProject({
      title: '',
      description: '',
      startDate: new Date(),
      endDate: new Date(),
    });
    onClose();
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Create Project</DialogTitle>
      <DialogContent>
        <TextField
          label="Title"
          name="title"
          value={newProject.title}
          onChange={handleChange}
          fullWidth
          margin="normal"
          InputLabelProps={{
            shrink: true,
          }}
        />
        <TextField
          label="Description"
          name="description"
          value={newProject.description}
          onChange={handleChange}
          fullWidth
          margin="normal"
          InputLabelProps={{
            shrink: true,
          }}
        />
        <DatePicker
          name="startDate"
          value={newProject.startDate}
          selected={newProject.startDate}
          onChange={handleChange}
          dateFormat="yyyy.MM.dd"
        />
        <DatePicker
          name="endDate"
          value={newProject.endDate}
          selected={newProject.endDate}
          onChange={handleChange}
          dateFormat="yyyy.MM.dd"
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleSubmit} variant="contained" color="primary">
          Create
        </Button>
        <Button onClick={handleClose} variant="outlined" color="secondary">
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CreateProjectDialog;
