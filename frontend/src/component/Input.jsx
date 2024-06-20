import React, { useState } from 'react'
import { REACT_APP_API_URL } from '../constants';

const Input = ({ todos, setTodos, }) => {
  const API_URL = REACT_APP_API_URL
  const SUPABASE_KEY = import.meta.env.VITE_SUPABASE_KEY
  const [todo,setTodo] = useState("")
  const addTodo = async (e) => {
    e.preventDefault()
    if (todo.trim() === '') return;
    try {
      const response = await fetch('https://sjzeoltpxdgjmfcnapeb.supabase.co/functions/v1/addTodo', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
      'Authorization': `Bearer ${SUPABASE_KEY}`

        },
        body: JSON.stringify({ text: todo,status:"PENDING" }),
      });
  
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
  
      const data = await response.json();
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