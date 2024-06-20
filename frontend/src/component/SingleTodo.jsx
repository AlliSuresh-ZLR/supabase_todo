import React, { useRef, useState } from "react";
import { MdDone, MdDelete } from "react-icons/md";
import { RiEditFill } from "react-icons/ri";
const SingleTodo = ({ data, todos, setTodos }) => {
  const [edit, setEdit] = useState(false);
  const [status, setStatus] = useState(data.status);
  const [editText, setEditText] = useState({
    text: data?.text,
    status: status,
    id: data?.id,
  });
  const SUPABASE_KEY = import.meta.env.VITE_SUPABASE_KEY;
  const editHandler = async (e, id) => {
    setEditText({ text: e.target.value || editText.text, id: id });
  };
  const statusEditHandler = async () => {
    try {
      const response = await fetch(
        "https://sjzeoltpxdgjmfcnapeb.supabase.co/functions/v1/updateTodo",
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${SUPABASE_KEY}`,
          },
          body: JSON.stringify({
            id: editText?.id,
            text: editText?.text,
            status: status == "PENDING" ? "DONE" : "PENDING",
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      setEdit(false);
      setStatus((prev) => (prev == "DONE" ? "PENDING" : "DONE"));
    } catch (error) {
      console.error("Error adding todo:", error);
    }
  };
  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        "https://sjzeoltpxdgjmfcnapeb.supabase.co/functions/v1/updateTodo",
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${SUPABASE_KEY}`,
          },
          body: JSON.stringify({
            id: editText?.id,
            text: editText?.text,
            status: editText?.status,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      setEdit(false);
    } catch (error) {
      console.error("Error adding todo:", error);
    }
  };

  const deleteHandler = async (id) => {
    try {
      const response = await fetch(
        "https://sjzeoltpxdgjmfcnapeb.supabase.co/functions/v1/deleteTodo",
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${SUPABASE_KEY}`,
          },
          body: JSON.stringify({
            id: id,
            text: editText?.text,
            status: "PENDING",
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      console.log("from deletion");
      setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
      // setTodo('');
    } catch (error) {
      console.error("Error adding todo:", error);
    }
  };

  return (
    <form className="single_todo" onSubmit={(e) => submitHandler(e)}>
      {data.status === "DONE" ? (
        <span>
          <s>{data?.text}</s>
        </span>
      ) : edit ? (
        <span>
          <input
            className="single_todo--input"
            placeholder=""
            defaultValue={data.text}
            onChange={(e) => {
              editHandler(e, data.id);
            }}
            autoFocus
          />
        </span>
      ) : (
        <span>{data.text}</span>
      )}
      <div className="todo_options">
        <MdDone
          className="icon"
          onClick={(e) => {
            statusEditHandler(e, data.id);
          }}
        />
        <RiEditFill
          className="icon"
          onClick={() => {
            setEdit((prev) => !prev);
          }}
        />
        <MdDelete
          className="icon"
          onClick={() => {
            deleteHandler(data.id);
          }}
        />
      </div>
    </form>
  );
};

export default SingleTodo;
