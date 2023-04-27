import React, { useState, useEffect } from 'react';
import { Card, Button } from 'react-bootstrap';
import Education from './Education';
import EducationRegisterForm from './EducationRegisterForm';
import * as Api from '../../api';

function Educations({ portfolioOwnerId, isEditable }) {
  const [educations, setEducations] = useState([]);
  const [registering, setRegistering] = useState(false);
  const userId = portfolioOwnerId;

  useEffect(() => {
    Api.get(`education/${userId}`).then((res) => {
      setEducations(res.data);
      console.log(res.data); //확인용
    });
  }, [userId]);

  return (
    <Card>
      <Card.Body>
        <Card.Title>학력</Card.Title>
        {educations.map((education) => (
          <Education
            userId={userId}
            key={education._id}
            education={education}
            isEditable={isEditable}
          />
        ))}
        {registering && (
          <EducationRegisterForm
            userId={userId}
            setEducations={setEducations}
            setRegistering={setRegistering}
          />
        )}
        {isEditable && <Button onClick={() => setRegistering(true)}>+</Button>}
      </Card.Body>
    </Card>
  );
}

export default Educations;
