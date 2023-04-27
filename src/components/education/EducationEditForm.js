import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import * as Api from '../../api';

function EducationEditForm({ education, setEducations, setEdit, userId }) {
  const [schoolName, setSchoolName] = useState(education.schoolName);
  const [major, setMajor] = useState(education.major);
  const [graduationTypeCode, setGraduationTypeCode] = useState(
    education.graduationTypeCode
  );

  const handleSubmit = async (e) => {
    e.preventDefault();

    const _id = education.key;

    await Api.patch('education', {
      _id,
      schoolName,
      major,
      graduationTypeCode,
    });

    const res = await Api.get(`education/${userId}`);
    setEducations(res.data);
    setEdit(false);
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group>
        <Form.Control
          type="text"
          placeholder="학력"
          value={schoolName}
          onChange={(e) => setSchoolName(e.target.value)}
        />
      </Form.Group>
      <Form.Group>
        <Form.Control
          type="text"
          placeholder="전공"
          value={major}
          onChange={(e) => setMajor(e.target.value)}
        />
      </Form.Group>
      <Form.Group>
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
      </Form.Group>
      <Form.Group>
        <Button type="submit">확인</Button>
        <Button onClick={() => setEdit(false)}>취소</Button>
      </Form.Group>
    </Form>
  );
}

export default EducationEditForm;
