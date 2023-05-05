import { useContext } from 'react';
import React from 'react';
import { Card, Col } from 'react-bootstrap';
import { IconButton, Tooltip } from '@mui/material';
import { Edit } from '@mui/icons-material';
import DeleteIcon from '@mui/icons-material/Delete';
import * as Api from '../../api';
import { UserStateContext } from '../../App';

import './Comment.css';

import '../components.css';

function CommentCard({ comment, setComments, setEdit, portfolioOwnerId }) {
  const _id = comment._id;
  const userState = useContext(UserStateContext);

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
    <>
      <h5>{comment.name} 님</h5>
      <Card className="commentCard">
        <Card.Body>
          <Card.Text>{comment.content}</Card.Text>
        </Card.Body>
      </Card>
      {comment.userId === userState.user?.id && (
        <Col className="commentIcon">
          <Tooltip title="변경하기">
            <IconButton onClick={() => setEdit((change) => !change)}>
              <Edit />
            </IconButton>
          </Tooltip>
          <Tooltip title="삭제하기">
            <IconButton onClick={handleDelete} aria-label="delete">
              <DeleteIcon />
            </IconButton>
          </Tooltip>
        </Col>
      )}
    </>
  );
}

export default React.memo(CommentCard);
