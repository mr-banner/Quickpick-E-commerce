import React from 'react';
import '../deleteloader/LoaderDelete.css';


const Loading = () => {
  const letters = ['D', 'E', 'L', 'E', 'T', 'I', 'N', 'G'];


  return (
    <div className="loading">
      <div className="loading-text">
        {letters.map((letter, index) => (
          <span key={index} className="loading-text-words">
            {letter}
          </span>
        ))}
      </div>
    </div>
  );
};


export default Loading;
