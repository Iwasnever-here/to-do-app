import React, { useState } from 'react'
import axios from 'axios'
import { useEffect } from 'react'
import { FaLeaf, } from "react-icons/fa6";

const ToDoSection = () => {

  const [todos, setTodos] = useState([])
  const token = localStorage.getItem("token");
  useEffect(() => {
  axios.get('https://to-do-app-bae5.onrender.com/api/todos/', {
    headers: { Authorization: `Bearer ${token}` }
  })
    .then(result => setTodos(result.data))
    .catch(error => console.log(error));
}, []);

const handleEdit = (id) => {
  const token = localStorage.getItem("token"); 

  axios.put(`https://to-do-app-bae5.onrender.com/api/todos/update/${id}`, null, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
  .then((result) => {
    location.reload();
  })
  .catch((error) => {
    console.error("Update failed:", error);
  });
};


  return (
    <div className=' part bg-babypowder p-5 mt-4 all'>
   

      {/* ToDo list*/}
        <div className='flex flex-col gap-y-3'>
        {
          todos.length === 0 ?
          <div> add todos </div>
          :
          todos.map(todo => (
            <div key = {todo._id} className='todos'>
              <FaLeaf className='leaf hover:cursor-pointer' onClick = {() => handleEdit(todo._id)}/>
              <p className={todo.done ? 'line-through' : ''}>{todo.task}</p>
            </div>
          ))
        }
        </div>
        
    </div>
  )
}

export default ToDoSection
