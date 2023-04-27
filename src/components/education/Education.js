import React, { useState } from 'react';
import EducationEditForm from './EducationEditForm';
import EducationCard from './EducationCard';

function Education({ education, setEducations, isEditable, userId }) {
  const [edit, setEdit] = useState(false);
  return (
    <>
      {console.log(edit)}
      {console.log(education._id)}
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
