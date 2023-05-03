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
  newStartDate,
  newEndDate,
  handleChange,
  handleSubmit,
  setNewProject,
  setNewStartDate,
  setNewEndDate,
}) => {
  const handleClose = () => {
    setNewProject({
      title: '',
      description: '',
    });
    setNewStartDate(new Date());
    setNewEndDate(new Date());
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
          value={newProject.startDate}
          selected={newStartDate}
          onChange={setNewStartDate}
          dateFormat="yyyy.MM.dd"
        />
        <DatePicker
          value={newProject.endDate}
          selected={newEndDate}
          onChange={setNewEndDate}
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
