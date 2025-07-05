import { useState } from 'react'
import axios from 'axios'

const Form = ({ setTodos }) => {
  const [task, setTask] = useState('');
  const token = localStorage.getItem("token");

  const handleAdd = () => {
    if (!task.trim()) return; // prevent empty tasks

    axios.post('http://localhost:3001/api/todos', 
      { task: task },
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    )
    .then(result => {
      console.log("Todo created:", result.data);
      setTask('');
      if (setTodos) {
        setTodos(prev => [...prev, result.data]); // update local state
      } else {
        location.reload(); // fallback if setTodos not passed
      }
    })
    .catch(error => {
      console.error("Error creating task:", error.response?.data || error);
    });
  };

  return (
    <div className='flex h-12 items-center mt-5'>
      <input 
        type='text' 
        className='bg-babypowder p-2 w-[60%] rounded-full flex-auto'
        placeholder='enter task' 
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
