import { useEffect, useState } from 'react';
import { Todo } from './todos.types';
import Title from './title';
import Card from '../components/card';
import { todo } from 'node:test';

export default function Body() {
  const [todos, setTodos] = useState<Todo[]>([]);

  const fetchData = async () => {
    console.log('fetch');
    const res = await fetch('http://localhost:8080/todo', {
      method: "GET",
      mode: "cors",
    });
    const data = await res.json();
    console.log(data);
    setTodos(data);
    todos.map((e, i) => console.log("var = " + i));
  }

  useEffect(() => {
    fetchData();
  }, []);
  return <div className='flex-col bg-white w-full'>
    <Title />
    {todos.length > 0 && todos.map((e, i) => <Card todo={e} id={i} key={i} />)}
  </div>
}