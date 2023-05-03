import React, { useState, useEffect, useRef } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  RadioGroup,
  FormControlLabel,
  Radio,
} from '@mui/material';

const UpdateEducationDialog = ({
  open,
  onClose,
  education,
  handleSubmit,
  checkEmpty,
}) => {
  const [updatedEducation, setUpdatedEducation] = useState({
    schoolName: '',
    major: '',
    graduationTypeCode: '',
  });

  const schoolNameInput = useRef();
  const majorInput = useRef();

  useEffect(() => {
    if (education) {
      setUpdatedEducation({
        schoolName: education.schoolName,
        major: education.major,
        graduationTypeCode: education.graduationTypeCode,
      });
    }
  }, [education]);

  const handleChange = (event) => {
    console.log(updatedEducation); //확인용
    console.log(education); //확인용
    setUpdatedEducation({
      ...updatedEducation,
      [event.target.name]: event.target.value,
    });
  };

  const handleUpdate = () => {
    handleSubmit(education._id, updatedEducation);
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Edit Education</DialogTitle>
      <DialogContent>
        <TextField
<<<<<<< HEAD
          ref={schoolNameInput}
          margin="normal"
          fullWidth
          label="Education"
          name="schoolName"
          placeholder=""
=======
          margin='normal'
          fullWidth
          label='Education'
          name='schoolName'
>>>>>>> mercon
          value={updatedEducation.schoolName}
          onChange={handleChange}
        />
        <TextField
<<<<<<< HEAD
          ref={majorInput}
          margin="normal"
          fullWidth
          label="Major"
          name="major"
          placeholder=""
=======
          margin='normal'
          fullWidth
          label='Major'
          name='major'
>>>>>>> mercon
          value={updatedEducation.major}
          onChange={handleChange}
        />
        <RadioGroup
          name='graduationTypeCode'
          value={updatedEducation.graduationTypeCode}
          onChange={handleChange}
          row
        >
          <FormControlLabel
            value='재학중'
            control={<Radio />}
            label='재학중'
            checked={updatedEducation.graduationTypeCode === '재학중'}
          />
          <FormControlLabel
            value='학사졸업'
            control={<Radio />}
            label='학사졸업'
            checked={updatedEducation.graduationTypeCode === '학사졸업'}
          />
          <FormControlLabel
            value='석사졸업'
            control={<Radio />}
            label='석사졸업'
            checked={updatedEducation.graduationTypeCode === '석사졸업'}
          />
          <FormControlLabel
            value='박사졸업'
            control={<Radio />}
            label='박사졸업'
            checked={updatedEducation.graduationTypeCode === '박사졸업'}
          />
        </RadioGroup>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button
          onClick={() => {
            checkEmpty(updatedEducation, schoolNameInput, majorInput) &&
              handleUpdate();
          }}
        >
          Update
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default UpdateEducationDialog;
