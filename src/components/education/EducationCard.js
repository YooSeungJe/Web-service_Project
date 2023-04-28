import React from 'react';
import { Card, Button, Col } from 'react-bootstrap';
import * as Api from '../../api';

function EducationCard({
  education,
  setEducations,
  setEdit,
  isEditable,
  userId,
}) {
  const _id = education._id;

  const handleDelete = async (e) => {
    e.preventDefault();

    await Api.delete('education', _id);
    try {
      const res = await Api.get(`education/${userId}`);
      setEducations(res.data);
    } catch (err) {
      setEducations([]);
    }
  };

  return (
    <Card bg='light' text='dark' border='info'>
      <Card.Body style={{ width: '40rem' }}>
        <Card.Title>{education.schoolName}</Card.Title>
        <Card.Text>{education.major}</Card.Text>
        <Card.Text>{education.graduationTypeCode}</Card.Text>
        {isEditable && (
          <Col>
            <Button
              variant='primary'
              onClick={() => setEdit((change) => !change)}
            >
              편집
            </Button>
            <Button variant='secondary' onClick={handleDelete}>
              삭제
            </Button>
          </Col>
        )}
      </Card.Body>
    </Card>
  );
}

export default React.memo(EducationCard);
