import { useContext, useState } from 'react';
import React from 'react';
import { Card, Button, Col } from 'react-bootstrap';
import * as Api from '../../api';
import { UserStateContext } from '../../App';

function CommentCard({
  comment,
  setComments,
  setEdit,
  portfolioOwnerId,
}) {
  const _id = comment._id;
  const userState = useContext(UserStateContext);
  const [isMatch, setIsMatch] = useState(false)

  const handleDelete = async (e) => {
    e.preventDefault();

    await Api.delete(`comment/${portfolioOwnerId}`, _id);
    try {
      const res = await Api.get(`comment/${portfolioOwnerId}`);
      setComments(res.data);
    } catch (err) {
      setComments([]);
    }
  };


  return (
    <Card>
      <Card.Body style={{ width: '40rem' }}>
        <Card.Title>{comment.name}</Card.Title>
        <Card.Text>{comment.content}</Card.Text>
        {comment.userId === userState.user?.id && (
          <Col>
            <Button
              variant='outline-secondary'
              size='sm'
              onClick={() => setEdit((change) => !change)}
            >
              편집
            </Button>
            <Button variant='outline-danger'
                  size='sm' onClick={handleDelete}>
              삭제
            </Button>
          </Col>
        )}
      </Card.Body>
    </Card>
  );
}

export default React.memo(CommentCard);
