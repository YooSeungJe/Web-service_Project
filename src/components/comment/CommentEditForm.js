import React, { useState, useRef } from 'react';
import { Form, Button } from 'react-bootstrap';
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
        name: comment.name
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
          ref={contentInput}
          type='text'
          placeholder='댓글 내용'
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
      </Form.Group>
      <Form.Group>
        <Button variant='outline-secondary'
            size='sm'type='submit'>확인</Button>
        <Button variant='outline-danger'
                  size='sm' onClick={() => setEdit(false)}>취소</Button>
      </Form.Group>
    </Form>
  );
}

export default CommentEditForm;
