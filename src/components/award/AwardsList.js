import React from 'react';
import AwardItem from './AwardItem';

const AwardsList = ({ awards, setAwards }) => {
  const handleDelete = (id) => {
    try {
      const updatedAwards = awards.filter((award) => award.id !== id);
      setAwards(updatedAwards);
    } catch (error) {
      console.error(error);
    }
  };

  const handleUpdate = (id, updatedAward) => {
    try {
      const updatedAwards = awards.map((award) =>
        award.id === id ? updatedAward : award
      );
      setAwards(updatedAwards);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      {awards.map((award, index) => (
        <AwardItem
          key={`${award.id}-${index}`}
          award={award}
          onDelete={handleDelete}
          onUpdate={handleUpdate}
          setAwards={setAwards}
        />
      ))}
    </div>
  );
};

export default React.memo(AwardsList);
