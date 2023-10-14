import Image from 'next/image'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { useEffect, useState } from 'react'

export default function Title() {
  const supabase = createClientComponentClient()
  const [name, setName] = useState('')
  useEffect(() => {
    getUserName()
  }, [])

  const getUserName = async () => {
    const res = (await supabase.auth.getUser()).data.user?.email!
    setName(res)
  }

  return (
    <div className="flex justify-center items-center mt-4 flex-col">
      <Image
        src="/C/Title_blue_black.png"
        priority
        className="w-auto"
        width="300"
        height="300"
        alt="title"
      />
      <div>{name}</div>
    </div>
  )
}
