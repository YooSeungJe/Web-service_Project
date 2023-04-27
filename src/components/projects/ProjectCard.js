import { Card, Button, Row, Col } from "react-bootstrap";
import { useState, useContext } from "react";
import * as Api from "../../api";
// 하위 컴포넌트
import ProjectEditForm from "./ProjectEditForm";
import { ProjectsContext } from "./Projects";

// ? 편집 버튼 클릭 시 isEditing의 값이 반대로 바뀜 (true <-> false)
// ? : default가 false라 true로 바뀌면서 Card 컴포넌트가 사라지고 편집 폼이 나타남

function ProjectCard({ project, isEditable, portfolioOwnerId }) {
  const { setProjects } = useContext(ProjectsContext);
  const [isEditing, setIsEditing] = useState(false);
  
  const userId = portfolioOwnerId;

  const handleDelete = async (e) => {
    e.preventDefault();
    await Api.delete(`project`);

  const res = await Api.get("project", userId);
    setProjects(res.data);
  };

  return (
    <Card.Text as="div">
      <Row className="align-items-center">
        {isEditing ? (
          <ProjectEditForm
            currentProject={project}
            setIsEditing={setIsEditing}
          />
        ) : (
          <Col className="mb-4">
            <div>{project.title}</div>
            <div>{project.description}</div>
            <div>
              {project.from_date.slice(0, 10)} ~ {project.to_date.slice(0, 10)}
            </div>
          </Col>
        )}

        {isEditable && (
          <Col xs lg="2">
            {!isEditing && (
              <>
                <Button
                  variant="outline-info"
                  size="sm"
                  onClick={() => setIsEditing((prev) => !prev)}
                  className="mr-3"
                >
                  편집
                </Button>{" "}
                <Button
                  variant="outline-danger"
                  size="sm"
                  onClick={() => handleDelete()}
                  className="mr-3"
                >
                  삭제
                </Button>
               
              </>
            )}
          </Col>
        )}
      </Row>
    </Card.Text>
  );
}

export default ProjectCard;
