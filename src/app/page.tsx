import Image from 'next/image'
'use client';
import { useEffect, useState } from 'react';
import { Todos } from './todos.types';

export default function Home() {
  const [todos, setTodos] = useState<Todos[]>([]);
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

  return (
    <main className='w-screen h-screen'>
      <div className='flex-col'>
        <h1>Todo App</h1>
        <input className='flex' type='text' placeholder='Titre' onChange={(e) => { setTitle(e.target.value) }}></input>
        <input className='flex' type='text' placeholder='Description' onChange={(e) => { setDescription(e.target.value) }}></input>
        <button className='flex bg-white' onClick={() => { createTodo() }}>Valider</button>
        {todos.length > 0 && todos.map((e, i) => <span className="flex" key={i}>♦ {todos[i].title} {todos[i].description} {todos[i].isFinished ? "true" : "false"}</span>)}
      </div>
    </main>
  )
}
