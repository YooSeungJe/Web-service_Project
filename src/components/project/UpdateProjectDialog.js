import React, { useState, useEffect, useRef } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
} from '@mui/material';
import DatePicker from 'react-datepicker';

const UpdateProjectDialog = ({
  open,
  onClose,
  project,
  handleSubmit,
  checkEmpty,
}) => {
  const [updatedProject, setUpdatedProject] = useState({
    title: '',
    description: '',
  });
  const [updatedStartDate, setUpdatedStartDate] = useState(new Date());
  const [updatedEndDate, setUpdatedEndDate] = useState(new Date());

  const titleInput = useRef();
  const descriptionInput = useRef();

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
          ref={titleInput}
          label="Title"
          name="title"
          margin="normal"
          placeholder=""
          fullWidth
          value={updatedProject.title}
          onChange={handleChange}
        />
        <TextField
          ref={descriptionInput}
          label="Description"
          name="description"
          margin="normal"
          placeholder=""
          fullWidth
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
        <Button
          onClick={() => {
            checkEmpty(updatedProject, titleInput, descriptionInput) &&
              handleUpdate();
          }}
        >
          Update
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default UpdateProjectDialog;
