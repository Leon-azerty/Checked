import Button from "@/components/button/button"
import { supabase } from '@/SupabaseClient'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Input from "./input/input"

export default function Form() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const router = useRouter()

  const SignIn = async ({ email, password }: { email: string, password: string }) => {
    const { data, error } = await supabase.auth.signInWithPassword({ email, password, })
    console.log("route = /login", "data", data, "error", error)
    if (data !== null)
      router.push('/');
  }

  const SignUp = async ({ email, password }: { email: string, password: string }) => {
    console.log("WIP sign up")
    const { data, error } = await supabase.auth.signUp({ email, password })
    if (!error) {
      console.log("no error")
      router.push('/');
    }
    console.log("data", data, "error", error)
  }
  return <div className="flex flex-col w-5/12 justify-around items-center">

    <div className="flex flex-col items-center">
      <Input htmlFor="email" label="Email" placeholder="johndoe@gmail.com" onchange={(e) => { setEmail(e.target.value) }} />
      <Input htmlFor="password" label="Password" placeholder="*******" onchange={(e) => { setPassword(e.target.value) }} />
      <div className="flex justify-around mt-4">
        <Button text="Sign in" onClick={() => { SignIn({ email, password }) }} />
        <Button text="Sign up" onClick={() => { SignUp({ email, password }) }} />
      </div>
    </div>
    <div className="w-8/12 flex justify-center">
      <div className="text-xl w-10/12">
        <p>
          Take control of your daily tasks and boost your productivity.
        </p>
        <br />
        <p>
          Look no further than Checked, the perfect todo app designed with
          beginners in mind. Our user-friendly interface and intuitive features
          make task management a breeze
        </p>
      </div>
    </div>
  </div>
}