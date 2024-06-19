import React, { useState } from 'react'
import { MdDone, MdDelete } from "react-icons/md";
import { RiEditFill } from "react-icons/ri";
import { REACT_APP_API_URL } from '../constants';

const SingleTodo = ({data,todos,setTodos}) => {
  console.log("this is from singel todo",data)
  const [edit,setEdit] = useState(false)
  const [editText,setEditText] = useState({text:"",status:"PENDING"})
  const API_URL = REACT_APP_API_URL

  const editHandler = async (e,id) => {
    console.log(e.target.value,id)
    setEditText({text:e.target.value,id:id})
};
const submitHandler = async()=>{
  try {
    const response = await fetch(API_URL+"/"+editText?.id, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ text: editText?.text,status:"PENDING" }),
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    setEdit(false)
    // const data = await response.json();
    // setTodos([...todos, { text: todo,status:"PENDING" }]);
    // setTodo('');
  } catch (error) {
    console.error('Error adding todo:', error);
  }

}

const deleteHandler = async (id)=>{

  try {
    const response = await fetch(API_URL+"/"+id, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ text: editText?.text,status:"PENDING" }),
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    console.log("from deletion",)
    setTodos(prevTodos => prevTodos.filter(todo => todo.id !== id));
    // setTodos(todos.filter((item)=>{item.id!==id}));
    // setTodo('');
  } catch (error) {
    console.error('Error adding todo:', error);
  }

}


  return (
        <form className="single_todo" onSubmit={(e) => submitHandler(e)}>
      {data.status==="DONE" ? (
        <span>
          <s>{data?.text}</s>
        </span>
      ) : edit ? (
        <span><input
        className="single_todo--input"
          placeholder=""
          defaultValue={data.text}
          onChange={(e)=>{editHandler(e,data.id)}
          }
          autoFocus
        />
        </span>
      ) : (
        <span>{data.text}</span>
      )}
      <div className="todo_options">
        <MdDone className= "icon"onClick={() => {}} />
        <RiEditFill className= "icon"onClick={() => {setEdit(prev=>!prev)}} />
        <MdDelete className= "icon"onClick={() => {deleteHandler(data.id)}} />
      </div>
    </form>
  )
}

export default SingleTodo