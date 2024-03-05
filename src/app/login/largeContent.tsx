'use client'

import CheckedDesc from '@/app/login/checkedDesc'
import Form from '@/app/login/form'
import Image from 'next/image'
import { useEffect, useState } from 'react'

export default function LargeContent() {
  const [windowSize, setWindow] = useState<{ width?: number; height?: number }>(
    {}
  )
  useEffect(() => {
    setWindow({ width: window.innerWidth, height: window.innerHeight })
  }, [])

  if (windowSize.width! < 1024) {
    return (
      <div className="flex flex-col items-center">
        <div className="w-11/12 ">
          <Image
            priority
            className="animate-tinyBounce w-auto"
            loading="eager"
            src="/todos.png"
            width="500"
            height="100"
            alt="todos"
          />
        </div>
        <div className="h-8"></div>
        <Form />
        <CheckedDesc />
      </div>
    )
  } else {
    return (
      <div className="flex justify-around">
        <div className="w-7/12 lg:w-10/12 flex justify-center">
          <Image
            priority
            className="animate-tinyBounce w-auto"
            loading="eager"
            src="/todos.png"
            width="700"
            height="700"
            alt="todos"
          />
        </div>
        <div className="flex flex-col w-full md:w-10/12 md:h-5/12 justify-around items-center">
          <Form />
          <CheckedDesc />
        </div>
      </div>
    )
  }
}
