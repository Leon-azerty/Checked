import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import Image from 'next/image'
import { useEffect, useState } from 'react'

export default function Title() {
  const supabase = createClientComponentClient()
  const [name, setName] = useState('')

  useEffect(() => {
    const getUserName = async () => {
      const res = (await supabase.auth.getUser()).data.user?.email!
      setName(res)
    }
    getUserName()
  }, [])

  return (
    <div className="mt-4 flex flex-col items-center justify-center">
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
