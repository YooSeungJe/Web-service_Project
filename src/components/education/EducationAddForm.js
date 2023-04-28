import React, { useState, useRef } from 'react';
import { Form, Button } from 'react-bootstrap';
import * as Api from '../../api';

function EducationAddForm({ userId, setAdding, setEducations }) {
  const [schoolName, setSchoolName] = useState('');
  const [major, setMajor] = useState('');
  const [graduationTypeCode, setGraduationTypeCode] = useState('');
  const schoolNameInput = useRef();
  const majorInput = useRef();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (schoolName.length < 1) {
      schoolNameInput.current.focus();
    } else if (major.length < 1) {
      majorInput.current.focus();
    }

    await Api.post('education', {
      schoolName,
      major,
      graduationTypeCode,
    });

    const res = await Api.get(`education/${userId}`);
    setEducations(res.data);
    setAdding(false);
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group controlId="addSchoolName">
        <Form.Control
          ref={schoolNameInput}
          name="schoolName"
          type="text"
          placeholder="학교 이름"
          value={schoolName}
          onChange={(e) => setSchoolName(e.target.value)}
        />
      </Form.Group>
      <Form.Group controlId="addMajor">
        <Form.Control
          ref={majorInput}
          name="major"
          type="text"
          placeholder="전공"
          value={major}
          onChange={(e) => setMajor(e.target.value)}
        />
      </Form.Group>
      <Form.Check
        name="graduationTypeCode"
        type="radio"
        label="재학중"
        value="재학중"
        onChange={(e) => {
          setGraduationTypeCode(e.target.value);
        }}
        inline
      />
      <Form.Check
        name="graduationTypeCode"
        type="radio"
        label="학사졸업"
        value="학사졸업"
        onChange={(e) => {
          setGraduationTypeCode(e.target.value);
        }}
        inline
      />
      <Form.Check
        name="graduationTypeCode"
        type="radio"
        label="석사졸업"
        value="석사졸업"
        onChange={(e) => {
          setGraduationTypeCode(e.target.value);
        }}
        inline
      />
      <Form.Check
        name="graduationTypeCode"
        type="radio"
        label="박사졸업"
        value="박사졸업"
        onChange={(e) => {
          setGraduationTypeCode(e.target.value);
        }}
        inline
      />
      <Form.Group>
        <Button variant="primary" type="submit">
          확인
        </Button>
        <Button variant="secondary" onClick={() => setAdding(false)}>
          취소
        </Button>
      </Form.Group>
    </Form>
  );
}

export default EducationAddForm;
