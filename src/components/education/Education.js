import React, { useState } from 'react';
import EducationEditForm from './EducationEditForm';
import EducationCard from './EducationCard';

function Education({ education, setEducations, isEditable }) {
  const [edit, setEdit] = useState(false);
  return (
    <>
      {edit ? (
        <EducationEditForm
          setEdit={setEdit}
          education={education}
          setEducations={setEducations}
        />
      ) : (
        <EducationCard
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
