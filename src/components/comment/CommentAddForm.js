import React, { useContext, useState, useRef } from 'react';
import { Form, Button } from 'react-bootstrap';
import * as Api from '../../api';
import { UserStateContext } from '../../App';

function CommentAddForm({ portfolioOwnerId, setAdding, setComments }) {
  const [content, setContent] = useState('');
  const contentInput = useRef();
  const userState = useContext(UserStateContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (content.length < 1) {
      contentInput.current.focus();
    }

    await Api.post(`comment/${portfolioOwnerId}`, {
      content,
      name: userState.user.name,
    });

    const res = await Api.get(`comment/${portfolioOwnerId}`);
    setComments(res.data);
    setAdding(false);
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group controlId='addName'>
        <div>{userState.user.name}</div>
      </Form.Group>
      <Form.Group controlId='addContent'>
        <Form.Control
          ref={contentInput}
          name='content'
          type='text'
          placeholder='댓글 내용'
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
      </Form.Group>
      <Form.Group style={{marginTop:'2px',marginLeft:'168px'}}>
        <Button  variant='outline-primary' size='sm' type='submit'>
          확인
        </Button>
        <Button
          style={{marginLeft:'6px'}}
          variant='outline-danger'
          size='sm'
          onClick={() => setAdding(false)}
        >
          취소
        </Button>
      </Form.Group>
    </Form>
  );
}

export default CommentAddForm;
