import React, { useState, useEffect } from 'react';
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

const UpdateEducationDialog = ({ open, onClose, education, handleSubmit }) => {
  const [updatedEducation, setUpdatedEducation] = useState({
    schoolName: '',
    major: '',
    graduationTypeCode: '',
  });

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
          margin="normal"
          fullWidth
          label="Education"
          name="schoolName"
          value={updatedEducation.schoolName}
          onChange={handleChange}
        />
        <TextField
          margin="normal"
          fullWidth
          label="Major"
          name="major"
          value={updatedEducation.major}
          onChange={handleChange}
        />
        <RadioGroup
          value={updatedEducation.graduationTypeCode}
          onChange={handleChange}
        >
          <FormControlLabel value="재학중" control={<Radio />} label="재학중" />
          <FormControlLabel
            value="학사졸업"
            control={<Radio />}
            label="학사졸업"
          />
          <FormControlLabel
            value="석사졸업"
            control={<Radio />}
            label="석사졸업"
          />
          <FormControlLabel
            value="박사졸업"
            control={<Radio />}
            label="박사졸업"
          />
        </RadioGroup>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleUpdate}>Update</Button>
      </DialogActions>
    </Dialog>
  );
};

export default UpdateEducationDialog;
