import { useEffect, useState } from 'react';
import { Todo } from './todos.types';
import Title from './title';
import Card from './card';

export default function Body() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const fetchData = async () => {
    console.log('fetch');
    const res = await fetch('http://localhost:8080/todo', {
      method: "GET",
      mode: "cors",
    });
    const data = await res.json();
    console.log(data);
    setTodos(data);
  }

  const createTodo = async () => {
    console.log('click');
    const res = await fetch('http://localhost:8080/todo', {
      method: "POST",
      mode: "cors",
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(
        {
          "title": title,
          "description": description,
          "isFinished": false
        }
      ),
    });
    console.log(res);
    fetchData();
  };

  useEffect(() => {
    fetchData();
  }, []);
  return <div className='flex-col bg-white w-full'>
    <Title />
    {todos.length > 0 && todos.map((e, i) => <Card todo={todos[i]} key={i} />)}
  </div>
}