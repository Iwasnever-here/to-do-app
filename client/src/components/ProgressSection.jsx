import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ProgressSection = () => {
  const [total, setTotal] = useState(0);
  const [completed, setCompleted] = useState(0);

  const fetchProgress = () => {
    const token = localStorage.getItem('token');
    axios.get('http://localhost:3001/api/todos/progress', {
      headers: { Authorization: `Bearer ${token}` },
    })
    .then(result => {
      setTotal(result.data.total);
      setCompleted(result.data.completed);
    })
    .catch(console.log);
  };

  // updates the progress when changes
  useEffect(() => {
    fetchProgress();

    // Listen for event
    window.addEventListener('todosUpdated', fetchProgress);

    return () => {
      window.removeEventListener('todosUpdated', fetchProgress);
    };
  }, []);

  const progressPercent = total > 0 ? (completed / total) * 100 : 0;


  ////////////////////////////////////////////////////main///////////////////////////////////////////////////////////


  
  return (
    <div className='part bg-babypowder p-6 items-center all'>
      <h1>Progression</h1>
      <div className="w-55 bg-dustgreen rounded-full h-4 ">
        <div className="bg-spacesparkle h-4 rounded-full" style={{ width: `${progressPercent}%` }}></div>
      </div>
    </div>
  );
};

export default ProgressSection;
