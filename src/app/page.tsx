'use client';
import Menu from '@/app/menu';
import Body from './body';
import { useContext, useEffect, useState, createContext } from 'react';
import { Todo } from './todos.types';

export default function Home() {
  const [isFavoriteTodos, setIsFavoriteTodos] = useState<boolean>(false);
  return (
    <main className='w-screen h-screen flex'>
      <Menu isFavoriteTodosVisible={isFavoriteTodos} setIsFavoriteTodosVisible={setIsFavoriteTodos} />
      <Body isFavoriteTodosVisible={isFavoriteTodos} />
    </main>
  )
}
