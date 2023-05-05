import React, { useState, useRef } from 'react';
import { Form } from 'react-bootstrap';
import { DialogActions, Button } from '@mui/material';
import * as Api from '../../api';

function CommentEditForm({ comment, setComments, setEdit, portfolioOwnerId }) {
  const [content, setContent] = useState(comment.content);

  const contentInput = useRef();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (content.length < 1) {
      contentInput.current.focus();
    } else {
      const _id = comment._id;

      await Api.put(`comment/${portfolioOwnerId}/${_id}`, {
        _id,
        content,
        name: comment.name,
      });

      const res = await Api.get(`comment/${portfolioOwnerId}`);
      setComments(res.data);
      setEdit(false);
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <div>{comment.name}</div>
      <Form.Group>
        <Form.Control
          className="commentCard"
          ref={contentInput}
          type="text"
          placeholder="댓글 내용을 입력해주세요"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
      </Form.Group>
      <Form.Group>
        <DialogActions>
          <Button
            variant="outlined"
            color="secondary"
            size="small"
            onClick={() => setEdit(false)}
          >
            취소하기
          </Button>
          <Button
            variant="contained"
            color="primary"
            size="small"
            type="submit"
          >
            변경하기
          </Button>
        </DialogActions>
      </Form.Group>
    </Form>
  );
}

export default CommentEditForm;
