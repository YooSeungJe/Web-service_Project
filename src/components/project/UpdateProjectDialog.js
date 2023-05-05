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
import '../components.css';

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
      // console.log(`project.startDate : ${project.startDate}`);
      // console.log(`project.endDate : ${project.endDate}`);
      setUpdatedStartDate(new Date(project.startDate));
      setUpdatedEndDate(new Date(project.endDate));
      // console.log(`updatedStartDate : ${updatedStartDate}`);
      // console.log(`updatedEndDate : ${updatedEndDate}`);
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
      <DialogTitle variant='h5'>프로젝트 변경</DialogTitle>
      <DialogContent>
        <TextField
          ref={titleInput}
          label='프로젝트 제목'
          name='title'
          margin='normal'
          placeholder=''
          fullWidth
          value={updatedProject.title}
          onChange={handleChange}
        />
        <TextField
          ref={descriptionInput}
          label='설명'
          name='description'
          margin='normal'
          placeholder=''
          fullWidth
          value={updatedProject.description}
          onChange={handleChange}
        />
        <div className='datePickers'>
          <DatePicker
            className='datePicker'
            value={updatedProject.StartDate}
            selected={updatedStartDate}
            onChange={(date) => setUpdatedStartDate(date)}
            dateFormat='yyyy.MM.dd'
          />
          <DatePicker
            className='datePicker'
            value={updatedProject.EndDate}
            selected={updatedEndDate}
            onChange={(date) => setUpdatedEndDate(date)}
            dateFormat='yyyy.MM.dd'
            minDate={new Date(updatedStartDate)}
          />
        </div>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} variant='outlined' color='secondary'>
          취소하기
        </Button>
        <Button
          onClick={() => {
            checkEmpty(updatedProject, titleInput, descriptionInput) &&
              handleUpdate();
          }}
          variant='contained'
          color='primary'
        >
          변경하기
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default UpdateProjectDialog;
