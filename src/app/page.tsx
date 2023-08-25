'use client';
import Menu from '@/app/menu';
import Body from './body';

export default function Home() {
  return (
    <main className='w-screen h-screen flex'>
      <Menu />
      <Body />
    </main>
  )
}
