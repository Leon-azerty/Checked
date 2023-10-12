'use client'
import '@/app/globals.css'
import '@/app/login/scrollbar.css'
import Body from '@/app/login/body'

export default function Login() {
  return (
    <div className="no-scrollbar overflow-y-auto text-black">
      <Body />
    </div>
  )
}
