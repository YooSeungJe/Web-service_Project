import React, { useEffect, useState } from 'react';
import { Box, Typography, Grid } from '@mui/material';
import { get, post, patch, delete as del } from '../../api';
import ProjectCard from './ProjectCard';
import CreateProjectButton from './CreateProjectButton';
import CreateProjectDialog from './CreateProjectDialog';
import UpdateProjectDialog from './UpdateProjectDialog';

const ProjectList = ({ portfolioOwnerId, isEditable }) => {
  const [projects, setProjects] = useState([]);
  const [createOpen, setCreateOpen] = useState(false);
  const [newProject, setNewProject] = useState({
    title: '',
    description: '',
    startDate: new Date(),
    endDate: new Date(),
  });

  const [selectedProjectId, setSelectedProjectId] = useState(null);
  const [updateOpen, setUpdateOpen] = useState(false);
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
    setNewProject({ ...newProject, [event.target.name]: event.target.value });
  };

  const handleSubmit = async () => {
    try {
      await post('project', newProject);
      const response = await get(`project/${portfolioOwnerId}`);
      setProjects(response.data);
      setCreateOpen(false);

      setNewProject({
        title: '',
        description: '',
        startDate: new Date(),
        endDate: new Date(),
      });
      handleCloseCreate();
    } catch (error) {
      console.error('Error creating project:', error);
    }
  };

  const handleOpenUpdate = (_id) => {
    setSelectedProjectId(_id);
    console.log('Update clicked for project:', _id);
    // Open the update dialog
    setUpdateOpen(true);
  };

  const handleUpdateClose = () => {
    setUpdateOpen(false);
    setSelectedProjectId(null);
    setNewProject({ title: '', description: '', startDate: '', endDate: '' });
  };

  const handleOpenDelete = (_id) => {
    console.log('Delete clicked for project:', _id);
  };

  const handleUpdateSubmit = async (_id, updatedProject) => {
    try {
      console.log(`updatedProject : ${updatedProject}`);
      console.log(`updatedProject.title : ${updatedProject.title}`);
      console.log(`_id : ${_id}`);
      console.log(`portfolioOwnerId : ${portfolioOwnerId}`);
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
    <Box>
      <Typography variant="h4">Projects</Typography>
      {projects.length === 0 && (
        <Typography variant="body1">No projects found.</Typography>
      )}
      {projects.length > 0 && (
        <Grid container spacing={2} key="project-grid">
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
      <Box mt={2}>
        <CreateProjectButton
          onClick={handleOpenCreate}
          isEditable={isEditable}
        />
      </Box>
      <CreateProjectDialog
        open={createOpen}
        onClose={handleCloseCreate}
        newProject={newProject}
        handleChange={handleChangeCreate}
        handleSubmit={handleSubmit}
        setNewProject={setNewProject}
      />
      <UpdateProjectDialog
        open={updateOpen}
        onClose={handleUpdateClose}
        project={projects.find((project) => project._id === selectedProjectId)}
        handleSubmit={handleUpdateSubmit}
      />
    </Box>
  );
};

export default ProjectList;
