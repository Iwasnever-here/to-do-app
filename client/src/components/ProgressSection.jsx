import React, { useState, useEffect } from 'react'
import axios from 'axios'    

const ProgressSection = () => {
    const [total, setTotal] = useState(0);
    const [completed, setCompleted] = useState(0);

useEffect ( () => {
    axios.get('hhttps://to-do-app-bae5.onrender.com/api/todos/progress')

    .then(result => {
        setTotal(result.data.total)
        setCompleted(result.data.completed)
    })
    .catch(error => console.log(error))
  }, [])

const progressPercent = total > 0 ? (completed / total) * 100 : 0;

  return (
    // remember that you cannot put values directly into tailwind, use style
    <div className='part bg-babypowder p-6 items-center all'>
        <h1>Progression</h1>
        <div className="w-55 bg-dustgreen rounded-full h-4 ">
        <div className="bg-spacesparkle h-4 rounded-full "style={{ width: `${progressPercent}%`}} ></div>
    </div>


    </div>
  )
}

export default ProgressSection
