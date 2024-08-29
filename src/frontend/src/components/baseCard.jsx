import React from 'react';

const BaseCard = ({ text }) => {
  return (
    <div className="w-48 h-48 bg-blue-500 rounded-xl flex items-center justify-center text-white text-lg font-bold text-center text-4xl">
      {text}
    </div>
  );
};

export default BaseCard;
