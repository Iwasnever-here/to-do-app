import { useState } from 'react'
import axios from 'axios'

const Form = ({ setTodos }) => {
  const [task, setTask] = useState('');
  const token = localStorage.getItem("token");


  // add to-dos from an input
  const handleAdd = () => {
    //prevent empty tasks
    if (!task.trim()) return; 

    axios.post('http://localhost:3001/api/todos', 
      { task: task },
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    )
    .then(result => {
      setTask('');
      if (setTodos) {
        setTodos(prev => [...prev, result.data]);
      } else {
        window.dispatchEvent(new Event('todosUpdated'));
      }
    })
    .catch(error => {
      console.error("Error creating task:", error.response?.data || error);
    });
  };


  ////////////////////////////////////////////////////main///////////////////////////////////////////////////////////



  

  return (
    <div className='flex h-12 items-center mt-5'>
      <input 
        type='text' 
        className='bg-babypowder p-2 w-[60%] rounded-full flex-auto'
        placeholder='Type your task here' 
        value={task}
        onChange={(e) => setTask(e.target.value)} 
      />
      <button 
        type='button' 
        className='bg-spacesparkle text-babypowder text-3xl p-1 px-3 rounded-2xl ml-2 flex-fixed' 
        onClick={handleAdd}
      >
        +
      </button>
    </div>
  );
};

export default Form;
