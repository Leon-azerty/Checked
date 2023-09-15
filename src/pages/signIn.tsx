import { supabase } from '@/SupabaseClient'
import '../app/globals.css'
import Button from '@/components/button/button'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function SignIn() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const router = useRouter()

  const SignIn = async ({ email, password }: { email: string, password: string }) => {
    console.log("WIP sign in")
    const { data, error } = await supabase.auth.signInWithPassword({ email, password, })
    console.log(data, error);
    if (!error) {
      console.log("no error")
      router.push('/');
    }
  }

  const SignUp = async ({ email, password }: { email: string, password: string }) => {
    console.log("WIP sign up")
    const { data, error } = await supabase.auth.signUp({ email, password })
    if (!error) {
      console.log("no error")
      router.push('/');
    }
    if (data) {
      console.log("data", data)
    }
    if (error) {
      console.log("error", error)
    }
  }

  return (
    <div className="flex flex-col h-screen w-screen">
      <p>Page to sign in</p>
      <input type="text" placeholder="email" onChange={(e) => { setEmail(e.target.value) }} />
      <input type="text" placeholder="password" onChange={(e) => { setPassword(e.target.value) }} />
      <Button text="Sign in" onClick={() => { SignIn({ email, password }) }} />
      <Button text="Sign up" onClick={() => { SignUp({ email, password }) }} />
    </div>
  )
}