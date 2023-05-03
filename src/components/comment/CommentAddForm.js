import React, { useState, useRef } from 'react';
import { Form, Button } from 'react-bootstrap';
import * as Api from '../../api';

function CommentAddForm({ portfolioOwnerId, setAdding, setComments }) {
  const [content, setContent] = useState('');
  const [name, setName] = useState('');
  const contentInput = useRef();
  const nameInput = useRef();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (content.length < 1) {
      contentInput.current.focus();
    } else if (name.length < 1) {
      nameInput.current.focus();
    }

    await Api.post(`comment/${portfolioOwnerId}`, {
      content,
      name
    });

    const res = await Api.get(`comment/${portfolioOwnerId}`);
    setComments(res.data);
    setAdding(false);
    console.log(res.data)
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group controlId="addName">
        <Form.Control
          ref={nameInput}
          name="name"
          type="text"
          placeholder="이름"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </Form.Group>
      <Form.Group controlId="addContent">
        <Form.Control
          ref={contentInput}
          name="content"
          type="text"
          placeholder="댓글 내용"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
      </Form.Group>
      <Form.Group>
        <Button variant='outline-secondary'
              size='sm' type="submit">
          확인
        </Button>
        <Button variant='outline-danger'
                  size='sm' onClick={() => setAdding(false)}>
          취소
        </Button>
      </Form.Group>
    </Form>
  );
}

export default CommentAddForm;
