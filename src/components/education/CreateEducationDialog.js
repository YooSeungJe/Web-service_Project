import React, { useRef } from 'react';
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
import { TrendingUpSharp } from '@mui/icons-material';

const CreateEducationDialog = ({
  open,
  onClose,
  newEducation,
  handleChange,
  handleSubmit,
  setNewEducation,
  checkEmpty,
}) => {
  const handleClose = () => {
    setNewEducation({ schoolName: '', major: '', graduationTypeCode: '' });
    onClose();
  };

  const schoolNameInput = useRef();
  const majorInput = useRef();

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Create Education</DialogTitle>
      <DialogContent>
        <TextField
          ref={schoolNameInput}
          label="School Name"
          name="schoolName"
          value={newEducation.schoolName}
          onChange={handleChange}
          fullWidth
          margin="normal"
          placeholder="학교 이름을 입력해주세요"
          InputLabelProps={{
            shrink: true,
          }}
        />
        <TextField
          ref={majorInput}
          label="Major"
          name="major"
          value={newEducation.major}
          onChange={handleChange}
          fullWidth
          margin="normal"
          placeholder="전공을 입력해주세요"
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
        <Button onClick={handleClose} variant="outlined" color="secondary">
          Cancel
        </Button>
        <Button
          onClick={() => {
            checkEmpty(newEducation, schoolNameInput, majorInput) &&
              handleSubmit();
          }}
          variant="contained"
          color="primary"
        >
          Create
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CreateEducationDialog;
