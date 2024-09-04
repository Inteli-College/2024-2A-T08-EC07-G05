import React from 'react';

const BaseCard = ({ text, color }) => {
  return (
    <div className={`w-48 h-48 ${color} rounded-xl flex items-center justify-center text-white text-lg font-bold text-center text-3xl`}>
      {text}
    </div>
  );
};

export default BaseCard;
