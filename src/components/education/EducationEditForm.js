import React, { useState, useRef } from 'react';
import { Form, Button } from 'react-bootstrap';
import * as Api from '../../api';

function EducationEditForm({ education, setEducations, setEdit, userId }) {
  const [schoolName, setSchoolName] = useState(education.schoolName);
  const [major, setMajor] = useState(education.major);
  const [graduationTypeCode, setGraduationTypeCode] = useState(
    education.graduationTypeCode
  );
  const schoolNameInput = useRef();
  const majorInput = useRef();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (schoolName.length < 1) {
      schoolNameInput.current.focus();
    } else if (major.length < 1) {
      majorInput.current.focus();
    } else {
      const _id = education._id;

      await Api.patch('education', {
        _id,
        schoolName,
        major,
        graduationTypeCode,
      });

      const res = await Api.get(`education/${userId}`);
      setEducations(res.data);
      setEdit(false);
    }

    console.log(schoolName, major);
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group>
        <Form.Control
          ref={schoolNameInput}
          type="text"
          placeholder="학력"
          value={schoolName}
          onChange={(e) => setSchoolName(e.target.value)}
        />
      </Form.Group>
      <Form.Group>
        <Form.Control
          ref={majorInput}
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
          checked={graduationTypeCode === '재학중'}
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
          checked={graduationTypeCode === '학사졸업'}
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
          checked={graduationTypeCode === '석사졸업'}
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
          checked={graduationTypeCode === '박사졸업'}
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
