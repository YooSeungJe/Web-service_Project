import React, { useState } from 'react';
import EducationEditForm from './EducationEditForm';
import EducationCard from './EducationCard';

function Education({ education, setEducations, isEditable, userId }) {
  const [edit, setEdit] = useState(false);
  return (
    <>
      {console.log('문제없음')}
      {console.log(edit)}
      {edit ? (
        <EducationEditForm
          userId={userId}
          setEdit={setEdit}
          education={education}
          setEducations={setEducations}
        />
      ) : (
        <EducationCard
          userId={userId}
          isEditable={isEditable}
          setEdit={setEdit}
          education={education}
          setEducations={setEducations}
        />
      )}
    </>
  );
}

export default Education;
