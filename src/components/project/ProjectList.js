import React, { useEffect, useState } from 'react';
import { Typography, Grid } from '@mui/material';
import { get, post, patch, delete as del } from '../../api';
import ProjectCard from './ProjectCard';
import CreateProjectButton from './CreateProjectButton';
import CreateProjectDialog from './CreateProjectDialog';
import UpdateProjectDialog from './UpdateProjectDialog';

import '../components.css';

const ProjectList = ({ portfolioOwnerId, isEditable }) => {
  const [projects, setProjects] = useState([]);
  const [createOpen, setCreateOpen] = useState(false);
  const [newProject, setNewProject] = useState({
    title: '',
    description: '',
  });
  const [newStartDate, setNewStartDate] = useState(new Date());
  const [newEndDate, setNewEndDate] = useState(new Date());

  const [selectedProjectId, setSelectedProjectId] = useState(null);
  const [updateOpen, setUpdateOpen] = useState(false);

  const dayInMs = 86400000; // 1일을 밀리초로 계산한 값

  const dateDiff = Math.floor(
    (new Date(newEndDate).getTime() - new Date(newStartDate).getTime()) /
      dayInMs
  );

  const checkEmpty = (ref, input1, input2) => {
    switch (true) {
      case ref.title.length === 0:
        input1.current.querySelector('input').focus();
        input1.current.querySelector('input').placeholder =
          '한글자 이상을 입력해주세요';
        return false;
      case ref.description.length === 0:
        input2.current.querySelector('input').focus();
        input2.current.querySelector('input').placeholder =
          '한글자 이상을 입력해주세요';
        return false;
      default:
        return true;
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await get(`project/${portfolioOwnerId}`);
        setProjects(response.data);
      } catch (error) {
        console.error('Error fetching projects:', error);
      }
    };

    fetchData();
  }, [portfolioOwnerId]);

  const handleOpenCreate = () => {
    setCreateOpen(true);
  };

  const handleCloseCreate = () => {
    setCreateOpen(false);
  };

  const handleChangeCreate = (event) => {
    setNewProject({
      ...newProject,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async () => {
    try {
      if (dateDiff < 0) {
        alert('기간이 역순입니다. 다시 확인해주세요.');
        return;
      }
      await post('project', {
        ...newProject,
        startDate: newStartDate,
        endDate: newEndDate,
      });
      const response = await get(`project/${portfolioOwnerId}`);
      setProjects(response.data);
      setCreateOpen(false);

      setNewProject({
        title: '',
        description: '',
      });
      setNewStartDate(new Date());
      setNewEndDate(new Date());
      handleCloseCreate();
    } catch (error) {
      console.error('Error creating project:', error);
    }
  };

  const handleOpenUpdate = (_id) => {
    setSelectedProjectId(_id);
    // console.log('Update clicked for project:', _id);
    setUpdateOpen(true);
  };

  const handleUpdateClose = () => {
    setUpdateOpen(false);
    setSelectedProjectId(null);
    setNewProject({
      title: '',
      description: '',
    });
    setNewStartDate(new Date());
    setNewEndDate(new Date());
  };

  const handleOpenDelete = (_id) => {
    // console.log('Delete clicked for project:', _id);
  };

  const handleUpdateSubmit = async (_id, updatedProject) => {
    try {
      if (dateDiff < 0) {
        alert('기간이 역순입니다. 다시 확인해주세요.');
        return;
      }
      await patch(`project/${_id}`, updatedProject);
      const response = await get(`project/${portfolioOwnerId}`);
      setProjects(response.data);
      handleUpdateClose();
    } catch (error) {
      console.error('Error updating project:', error);
    }
  };

  const handleDeleteConfirm = async (_id) => {
    try {
      await del(`Project/${_id}`);
      setProjects((prevProjects) =>
        prevProjects.filter((project) => project._id !== _id)
      );
      setSelectedProjectId(null);
      handleCloseDelete();
    } catch (error) {
      console.error('Error deleting project:', error);
    }
  };

  const handleCloseDelete = () => {
    setSelectedProjectId(null);
  };

  return (
    <div className='pro-box'>
      <Typography className='modelTitle' variant='h4'>
        프로젝트
      </Typography>
      {projects.length === 0 && (
        <Typography variant='body2'>
          등록된 프로젝트 내용이 없습니다.
          <br />
          <br />
          아래 버튼으로 프로젝트를 추가해보세요.
        </Typography>
      )}
      {projects.length > 0 && (
        <Grid container spacing={2} key='project-grid'>
          {projects.map((project) => (
            <Grid item key={project._id} xs={12} sm={6} md={4}>
              <ProjectCard
                key={project._id}
                project={project}
                handleOpenUpdate={handleOpenUpdate}
                handleOpenDelete={handleOpenDelete}
                handleDeleteConfirm={handleDeleteConfirm}
                isEditable={isEditable}
              />
            </Grid>
          ))}
        </Grid>
      )}
      <div>
        <CreateProjectButton
          onClick={handleOpenCreate}
          isEditable={isEditable}
        />
      </div>
      <CreateProjectDialog
        open={createOpen}
        onClose={handleCloseCreate}
        newProject={newProject}
        newStartDate={newStartDate}
        newEndDate={newEndDate}
        handleChange={handleChangeCreate}
        handleSubmit={handleSubmit}
        setNewProject={setNewProject}
        setNewStartDate={setNewStartDate}
        setNewEndDate={setNewEndDate}
        checkEmpty={checkEmpty}
      />
      <UpdateProjectDialog
        open={updateOpen}
        onClose={handleUpdateClose}
        project={projects.find((project) => project._id === selectedProjectId)}
        handleSubmit={handleUpdateSubmit}
        checkEmpty={checkEmpty}
      />
    </div>
  );
};

export default ProjectList;
