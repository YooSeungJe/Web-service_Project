import React, { useState, useEffect } from 'react';
import { Card, Button } from 'react-bootstrap';
import Comment from './Comment';
import CommentAddForm from './CommentAddForm';
import * as Api from '../../api';

import '../components.css';
import { Block } from '@mui/icons-material';

function Comments({ portfolioOwnerId }) {
  const [comments, setComments] = useState([]);
  const [adding, setAdding] = useState(false);

  useEffect(() => {
    Api.get(`comment/${portfolioOwnerId}`).then((res) => {
      setComments(res.data);
    });
  }, [portfolioOwnerId]);

  return (
    <Card
      id="commentCard"
      className="mb-2 ms-3 mr-5"
      style={{ width: '300px' }}
    >
      <Card.Body>
        <Card.Title style={{ textAlign: 'center' }}>Comments</Card.Title>
        {comments.map((comment) => (
          <Comment
            portfolioOwnerId={portfolioOwnerId}
            key={comment._id}
            comment={comment}
            setComments={setComments}
          />
        ))}
        {adding && (
          <CommentAddForm
            portfolioOwnerId={portfolioOwnerId}
            setComments={setComments}
            setAdding={setAdding}
          />
        )}
        <Button
          style={{ margin: 'auto', display: 'block' }}
          variant="outline-success"
          size="sm"
          onClick={() => setAdding(true)}
        >
          +
        </Button>
      </Card.Body>
    </Card>
  );
}

export default Comments;
