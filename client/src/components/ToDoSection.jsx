import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaLeaf } from "react-icons/fa6";

const ToDoSection = () => {
  const [todos, setTodos] = useState([]);
  const token = localStorage.getItem("token");

  // Function to get the todos
  const fetchTodos = () => {
    axios.get('http://localhost:3001/api/todos/', {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(result => setTodos(result.data))
      .catch(error => console.log(error));
  };


  useEffect(() => {
    fetchTodos(); 
   
    const handleTodosUpdated = () => {
      console.log('been updated');
      fetchTodos();
    };

    window.addEventListener('todosUpdated', handleTodosUpdated);

    return () => {
      window.removeEventListener('todosUpdated', handleTodosUpdated);
    };
  }, [token]);

  const handleEdit = (id) => {
    axios.put('http://localhost:3001/api/todos/update/'+id, null, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(() => {
        setTodos(prevTodos =>
          prevTodos.map(todo =>
            todo._id === id ? { ...todo, done: !todo.done } : todo
          )
        );
        // call to update
        window.dispatchEvent(new Event('todosUpdated'));
      })
      .catch(error => console.error("Update failed:", error));
  };




  ////////////////////////////////////////////////////main///////////////////////////////////////////////////////////



  

  return (
    <div className='part bg-babypowder p-5 mt-4 all'>
      {/* ToDo list */}
      <div className='flex flex-col gap-y-3'>
        {todos.length === 0 ? (
          <div>note down your daily todos</div>
        ) : (
          todos.map(todo => (
            <div key={todo._id} className='todos'>
              <FaLeaf
                className='leaf hover:cursor-pointer'
                onClick={() => handleEdit(todo._id)}
              />
              <p className={todo.done ? 'line-through' : ''}>{todo.task}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ToDoSection;
