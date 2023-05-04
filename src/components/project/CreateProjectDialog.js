import React, { useRef } from 'react';
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
  checkEmpty,
}) => {
  const titleInput = useRef();
  const descriptionInput = useRef();

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
      <DialogTitle variant="h5">프로젝트 추가</DialogTitle>
      <DialogContent>
        <TextField
          ref={titleInput}
          label="Title"
          name="title"
          value={newProject.title}
          onChange={handleChange}
          fullWidth
          margin="normal"
          placeholder="프로젝트 제목을 입력해주세요"
          InputLabelProps={{
            shrink: true,
          }}
        />
        <TextField
          ref={descriptionInput}
          label="Description"
          name="description"
          value={newProject.description}
          onChange={handleChange}
          fullWidth
          margin="normal"
          placeholder="프로젝트 설명을 입력해주세요"
          InputLabelProps={{
            shrink: true,
          }}
        />
        <DatePicker
          value={newStartDate}
          selected={newStartDate}
          onChange={setNewStartDate}
          dateFormat="yyyy.MM.dd"
        />
        <DatePicker
          value={newEndDate}
          selected={newEndDate}
          onChange={setNewEndDate}
          dateFormat="yyyy.MM.dd"
          minDate={new Date(newStartDate)}
        />
      </DialogContent>

      <DialogActions>
        <Button onClick={handleClose} variant="outlined" color="secondary">
          Cancel
        </Button>
        <Button
          onClick={() => {
            checkEmpty(newProject, titleInput, descriptionInput) &&
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

export default CreateProjectDialog;
