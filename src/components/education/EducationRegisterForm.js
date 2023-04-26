import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';
import * as Api from '../../api';

function EducationRegisterForm({
  portfolioOwnerId,
  setRegistering,
  setEducations,
}) {
  // const navigate = useNavigate();

  const [schoolName, setSchoolName] = useState('');
  const [major, setMajor] = useState('');
  const [graduationTypeCode, setGraduationTypeCode] = useState('');

  // const [educationState, setEducationState] = useState({
  //   schoolName: '',
  //   major: '',
  //   graduationType: '',
  // });

  const handleSubmit = async (e) => {
    e.preventDefault();

    await Api.post('education', {
      schoolName,
      major,
      graduationTypeCode,
    });

    const res = await Api.get('education');
    setEducations(res.data);
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group controlId="registerSchoolName">
        <Form.Control
          name="schoolName"
          type="text"
          placeholder="학교 이름"
          value={schoolName}
          onChange={(e) => setSchoolName(e.target.value)}
        />
      </Form.Group>
      <Form.Group controlId="registerMajor">
        <Form.Control
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
        <Button variant="secondary" onClick={() => setRegistering(false)}>
          취소
        </Button>
      </Form.Group>
    </Form>
  );
}

export default EducationRegisterForm;
