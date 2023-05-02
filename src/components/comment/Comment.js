import React, { useState } from 'react';
import CommentEditForm from './CommentEditForm';
import CommentCard from './CommentCard';

function Comment({ comment, setComments, isEditable, portfolioOwnerId }) {
  const [edit, setEdit] = useState(false);
  return (
    <>
      {edit ? (
        <CommentEditForm
          portfolioOwnerId={portfolioOwnerId}
          setEdit={setEdit}
          comment={comment}
          setComments={setComments}
        />
      ) : (
        <CommentCard
          portfolioOwnerId={portfolioOwnerId}
          isEditable={isEditable}
          setEdit={setEdit}
          comment={comment}
          setComments={setComments}
        />
      )}
    </>
  );
}

export default Comment;
