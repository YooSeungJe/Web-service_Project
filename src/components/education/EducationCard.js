import React from 'react';
import { Card, Button, Row, Col } from 'react-bootstrap';
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
    <Card>
      <Row>
        <Col>{education.schoolName}</Col>
      </Row>
      <Row>
        <Col>{education.major}</Col>
      </Row>
      <Row>
        <Col>{education.graduationTypeCode}</Col>
      </Row>
      {isEditable && (
        <Col>
          <Button onClick={() => setEdit((change) => !change)}>편집</Button>
          <Button onClick={handleDelete}>삭제</Button>
        </Col>
      )}
    </Card>
  );
}

export default React.memo(EducationCard);
