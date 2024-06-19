import React from 'react'
import SingleTodo from './SingleTodo'

const TodoList = ({todos,setTodos}) => {
  console.log("this is from todolist>>>>>>>>>>",todos)
  return (
    <div className='todo_list'>
      {todos.map((item,i)=><SingleTodo data={item} todos={todos} setTodos={setTodos}/>)}
    </div>
  )
}

export default TodoList