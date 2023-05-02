import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
  Button,
  Radio,
  FormControlLabel,
  RadioGroup,
} from '@mui/material';

const CreateEducationDialog = ({
  open,
  onClose,
  newEducation,
  handleChange,
  handleSubmit,
  setNewEducation,
}) => {
  const handleClose = () => {
    setNewEducation({ schoolName: '', major: '', graduationTypeCode: '' });
    onClose();
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Create Education</DialogTitle>
      <DialogContent>
        <TextField
          label="School Name"
          name="schoolName"
          value={newEducation.schoolName}
          onChange={handleChange}
          fullWidth
          margin="normal"
          InputLabelProps={{
            shrink: true,
          }}
        />
        <TextField
          label="Major"
          name="major"
          value={newEducation.major}
          onChange={handleChange}
          fullWidth
          margin="normal"
          InputLabelProps={{
            shrink: true,
          }}
        />
        <RadioGroup
          name="graduationTypeCode"
          value={newEducation.graduationTypeCode}
          onChange={handleChange}
          row
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

export default CreateEducationDialog;
