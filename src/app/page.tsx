'use client';
import Menu from '@/app/menu';
import Body from './body';
import { useEffect, useState } from 'react';
import { Todo } from './todos.types';
import { TodosContext } from './todosContext';
import { supabase } from '@/SupabaseClient';

export default function Home() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [tab, setTab] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const fetchData = async () => {
    setIsLoading(true);
    await supabase.auth.signInWithPassword({ email: 'monadresse@gmail.com', password: 'monpass' });
    const { data, error } = await supabase.from('todo').select('*');
    console.log(data);
    if (error) console.log(error);
    // const res = await fetch('http://localhost:8080/todo', {
    //   method: "GET",
    //   mode: "cors",
    // });
    // const tmp = await res.json();
    // setTodos(tmp);
    let tmp: Todo[] = [];
    for (let i = 0; i < data!.length; i++) {
      let todo: Todo = { title: data![i].name, description: data![i].description, isDeleted: data![i].isDeleted, isFinished: data![i].isFinished, isFavorite: data![i].isFavorite, tags: data![i].tags };
      tmp.push(todo);
      console.log(todo);
    }
    setTodos(tmp);
    setIsLoading(false);
  }

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <main className='w-screen h-full min-h-screen flex'>
      <TodosContext.Provider value={[todos, setTodos]}>
        <Menu tab={tab} setTab={setTab} />
        <Body tab={tab} setTab={setTab} isLoading={isLoading} />
      </TodosContext.Provider>
    </main>
  )
}
