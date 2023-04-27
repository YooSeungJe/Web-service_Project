import React from 'react';
import { Card, Button, Row, Col } from 'react-bootstrap';
import * as Api from '../../api';

function EducationCard({ education, setEducations, setEdit, isEditable }) {
  const _id = education._id;
  const handleDelete = async (e) => {
    e.preventDefault();
    await Api.delete('education');
    const res = await Api.get('/education', _id);
    setEducations(res.data);
  };

  return (
    <Card>
      <Row>{education.schoolName}</Row>
      <Row>
        <Col>{education.major}</Col>
        <Col>{education.graduationTypeCode}</Col>
      </Row>
      {isEditable && (
        <Col>
          <Button
            onClick={(edit) => {
              setEdit(!edit);
            }}
          >
            편집
          </Button>
          <Button onClick={handleDelete}>삭제</Button>
        </Col>
      )}
    </Card>
  );
}

export default EducationCard;
