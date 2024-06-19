import React, { useState } from 'react'
import { REACT_APP_API_URL } from '../constants';

const Input = ({ todos, setTodos, }) => {
  const API_URL = REACT_APP_API_URL
  const [todo,setTodo] = useState("")
  const addTodo = async (e) => {
    e.preventDefault()
    if (todo.trim() === '') return;
  
    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text: todo,status:"PENDING" }),
      });
  
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
  
      const data = await response.json();
      setTodos([...todos, { text: todo,status:"PENDING" }]);
      setTodo('');
    } catch (error) {
      console.error('Error adding todo:', error);
    }
  };
  

  return (
    <form className="input" onSubmit={(e)=>addTodo(e)}>
    <input
      className="input_box"
      type="text"
      placeholder="enter the task"
      value={todo}
      onChange={(e)=>setTodo(e.target.value)}
    />

    <button className="input_submit" type="submit">
      Go
    </button>
  </form>
  )
}

export default Input