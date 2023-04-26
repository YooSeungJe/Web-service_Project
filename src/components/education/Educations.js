import React, { useState, useEffect } from 'react';
import { Card, Button } from 'react-bootstrap';
import Education from './Education';
import EducationRegisterForm from './EducationRegisterForm';
import * as Api from '../../api';

function Educations({ portfolioOwnerId, isEditable }) {
  const [educations, setEducations] = useState([]);
  const [registering, setRegistering] = useState(false);

  useEffect(() => {
    Api.get('education').then((res) => {
      setEducations(res.data); //json일 수도...
      console.log(res.data); //{"schoolName":"aa","major":"aa","graduationTypeCode":"재학중"}
    });
  }, [portfolioOwnerId]);

  return (
    <Card>
      <Card.Body>
        <Card.Title>학력</Card.Title>
        {educations.map((education) => (
          <Education
            key={education._id}
            education={education}
            isEditable={isEditable}
          />
        ))}
        {registering && (
          <EducationRegisterForm
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
