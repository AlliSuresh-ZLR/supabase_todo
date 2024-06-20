import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";

import "./App.css";
import Input from "./component/Input";
import TodoList from "./component/TodoList";
import { REACT_APP_API_URL } from "./constants";

function App() {
  const API_URL = REACT_APP_API_URL;
  const SUPABASE_KEY = import.meta.env.VITE_SUPABASE_KEY;
  const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
  // const supabaseAnonKey = process.env.REACT_APP_SUPABASE_ANON_KEY;

  const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

  const [todos, setTodos] = useState([]);

  useEffect(() => {
    const fetchTodos = async () => {
      const { data, error } = await supabase
        .from('todos')
        .select('*');

      if (error) {
        console.error('Error fetching todos:', error);
      } else {
        setTodos(data);
      }
    };

    fetchTodos();

    const channelA = supabase
      .channel('schema-db-changes')
      .on('postgres_changes', {
        event: 'INSERT',
        schema: 'public',
        table: 'todos',
      }, (payload) => {
        setTodos((prevTodos) => [...prevTodos, payload.new]);
        console.log('INSERT payload:', payload.new);
      })
      .on('postgres_changes', {
        event: 'UPDATE',
        schema: 'public',
        table: 'todos',
      }, (payload) => {
        setTodos((prevTodos) => 
          prevTodos.map(todo => (todo.id === payload.new.id ? payload.new : todo))
        );
        console.log('UPDATE payload:', payload.new);
      })
      .subscribe();

    return () => {
      supabase.removeChannel(channelA);
    };
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch(
        "https://sjzeoltpxdgjmfcnapeb.supabase.co/functions/v1/getTodos",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${SUPABASE_KEY}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      console.log("fetching from supabase", data);
      setTodos([...todos, ...data]);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  return (
    <>
      <div className="flex items-center flex-col">
        <h1 className="text-2xl font-bold">welcome...</h1>
        <Input todos={todos} setTodos={setTodos} />
        <TodoList todos={todos} setTodos={setTodos} />
      </div>
    </>
  );
}

export default App;
