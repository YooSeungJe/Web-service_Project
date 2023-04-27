import React, { useState, useEffect } from 'react';
import { Card, Button } from 'react-bootstrap';
import Education from './Education';
import EducationAddForm from './EducationAddForm';
import * as Api from '../../api';

function Educations({ portfolioOwnerId, isEditable }) {
  const [educations, setEducations] = useState([]);
  const [adding, setAdding] = useState(false);
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
        {adding && (
          <EducationAddForm
            userId={userId}
            setEducations={setEducations}
            setAdding={setAdding}
          />
        )}
        {isEditable && <Button onClick={() => setAdding(true)}>+</Button>}
      </Card.Body>
    </Card>
  );
}

export default Educations;
