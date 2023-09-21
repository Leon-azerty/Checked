'use client'
import Form from './form'
import Image from 'next/image'

export default function LargeContent() {
  if (typeof window === 'undefined') return <></>;
  const windowSize = { width: window.innerWidth, height: window.innerHeight };

  if (windowSize.width < 1024) {
    return <div className="flex flex-col items-center">
      <Image className='animate-tinyBounce' src="/todos.png" width="500" height="100" alt="todos" />
      <div className='h-8'></div>
      <Form />
    </div>
  } else {
    return <div className='flex justify-around'>
      <Image className='animate-tinyBounce' src="/todos.png" width="700" height="700" alt="todos" />
      <Form />
    </div>
  }

}