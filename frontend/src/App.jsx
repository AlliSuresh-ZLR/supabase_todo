import { useEffect, useState } from 'react'

import './App.css'
import Input from './component/Input'
import TodoList from './component/TodoList'
import { REACT_APP_API_URL } from './constants'

function App() {
  const API_URL = REACT_APP_API_URL

  const [todos, setTodos] = useState([])
  useEffect(() => {
    fetchData()
  }, [setTodos])

  const fetchData = async ()=>{
    try {
      const response = await fetch(API_URL, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
  
      const data = await response.json();
      console.log("fetching from supabase",data)
      setTodos([...todos, ...data]);
    } catch (error) {
      console.error('Error fetching data:', error);
    }

  }
  

  return (
    <>
      <div className='flex items-center flex-col'>
        <h1 className='text-2xl font-bold'>welcome...</h1>
        <Input todos={todos} setTodos={setTodos}/>
        <TodoList todos={todos} setTodos={setTodos}/>
        </div>
    </>
  )
}

export default App
