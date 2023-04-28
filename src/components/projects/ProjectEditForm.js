import React, { useState, useContext } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";
import DatePicker from "react-datepicker";
import * as Api from "../../api";

import { ProjectsContext } from "./Projects";



function ProjectEditForm({ portfolioOwnerId, currentProject, setIsEditing }) {
  const { setProjects } = useContext(ProjectsContext);
  const [title, setTitle] = useState(currentProject.title);
  const [description, setDescription] = useState(currentProject.description);
  const [startDate, setStartDate] = useState(
    new Date(currentProject.startDate)
  );
  const [endDate, setEndDate] = useState(new Date(currentProject.endDate));

  const handleSubmit = async (e) => {
    e.preventDefault();

   

    await Api.put(`project/${currentProject._id}`, {
      title,
      description,
      startDate,
      endDate,
    });

    // ? 1. 수정된 정보 GET요청
    // ? 2. 수정된 정보 projects에 저장
    // ? 3. 편집 폼 종료
    const res = await Api.get(`project/${portfolioOwnerId}`);
    setProjects(res.data);
    setIsEditing(false);
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group controlId="formBasicTitle" className="mt-1">
        <Form.Control
          type="text"
          placeholder="프로젝트 제목"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </Form.Group>

      <Form.Group controlId="formBasicDescription" className="mt-3">
        <Form.Control
          type="text"
          placeholder="프로젝트 상세내용"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </Form.Group>

      <Form.Group as={Row} className="mt-3">
        <Col md="auto">
          <DatePicker
            selected={startDate}
            dateFormat="yyyy.MM.dd"
            onChange={(date) => setStartDate(date)}
          />
        </Col>
        <Col md="auto">
          <DatePicker
            selected={endDate}
            dateFormat="yyyy.MM.dd"
            onChange={(date) => setEndDate(date)}
          />
        </Col>
      </Form.Group>

      <Form.Group as={Row} className="mt-3 text-center">
        <Col>
          <Button variant="primary" type="submit" className="me-3">
            확인
          </Button>
          <Button variant="secondary" onClick={() => setIsEditing(false)}>
            취소
          </Button>
        </Col>
      </Form.Group>
    </Form>
  );
}

export default ProjectEditForm;
