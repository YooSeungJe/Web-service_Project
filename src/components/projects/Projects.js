import React, { useState, useEffect, createContext } from 'react';
import { Card, Row, Button, Col } from 'react-bootstrap';
import * as Api from '../../api';

import ProjectCard from './ProjectCard';
import ProjectAddForm from './ProjectAddForm';

export const ProjectsContext = createContext();

function Projects({ portfolioOwnerId, isEditable }) {
  const [isAdding, setIsAdding] = useState(false);
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    Api.get(`project/${portfolioOwnerId}`).then((res) => setProjects(res.data));
  }, []);

  return (
    <ProjectsContext.Provider value={{ projects, setProjects }}>
      <Card>
        <Card.Body>
          <Card.Title>프로젝트</Card.Title>
          {projects.map((project) => (
            <ProjectCard
              portfolioOwnerId={portfolioOwnerId}
              key={project.Id}
              project={project}
              isEditable={isEditable}
            />
          ))}
          {isAdding && (
            <ProjectAddForm
              portfolioOwnerId={portfolioOwnerId}
              setIsAdding={setIsAdding}
            />
          )}
          {isEditable && (
            <Row className='text-center mt-4 mb-3'>
              <Col sm={{ span: 20 }}>
                <Button onClick={() => setIsAdding(true)}>+</Button>
              </Col>
            </Row>
          )}
        </Card.Body>
      </Card>
    </ProjectsContext.Provider>
  );
}
export default Projects;
