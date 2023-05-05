import React, { useContext, useState, useRef, useEffect } from 'react';
import { Form } from 'react-bootstrap';
import { DialogActions, Button } from '@mui/material';
import * as Api from '../../api';
import { UserStateContext } from '../../App';

function CommentAddForm({ portfolioOwnerId, setAdding, setComments }) {
  const [content, setContent] = useState('');
  const [userName, setUserName] = useState('');
  const contentInput = useRef();
  const userState = useContext(UserStateContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (content.length < 1) {
      contentInput.current.focus();
    }

    await Api.post(`comment/${portfolioOwnerId}`, {
      content,
      name: userName,
    });

    const res = await Api.get(`comment/${portfolioOwnerId}`);
    setComments(res.data);
    setAdding(false);
  };

  useEffect(() => {
    setUserName(userState.user.name)
  }, [userState.user])

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group controlId="addName">
        <div>{userName}</div>
      </Form.Group>
      <Form.Group controlId="addContent">
        <Form.Control
          className="commentCard"
          style={{ marginBottom: '3px' }}
          ref={contentInput}
          name="content"
          type="text"
          placeholder="댓글 내용을 입력해주세요"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
      </Form.Group>
      <Form.Group>
        <DialogActions>
          <Button
            style={{ marginLeft: '6px' }}
            variant="outlined"
            color="secondary"
            size="small"
            onClick={() => setAdding(false)}
          >
            취소하기
          </Button>
          <Button
            variant="contained"
            color="primary"
            size="small"
            type="submit"
          >
            추가하기
          </Button>
        </DialogActions>
      </Form.Group>
    </Form>
  );
}

export default CommentAddForm;
