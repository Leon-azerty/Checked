import Button from "@/components/button/button"
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Input from "./input/input"

export default function Form() {
  const [email, setEmail] = useState("")
  const [isLogIn, setIsLogIn] = useState(true)
  const [password, setPassword] = useState("")
  const router = useRouter()
  const supabase = createClientComponentClient();

  const SignIn = async ({ email, password }: { email: string, password: string }) => {
    const { data, error } = await supabase.auth.signInWithPassword({ email, password, })
    console.log("route = /login", "data", data, "error", error)
    if (data !== null)
      router.push('/');
  }

  const SignUp = async ({ email, password }: { email: string, password: string }) => {
    const { data, error } = await supabase.auth.signUp({ email, password })
    alert("Please check your email to confirm your account");
    if (!error) {
      console.log("no error")
      router.push('/');
    }
    console.log("data", data, "error", error)
  }

  const SubmitForm = async () => {
    console.log("submit form", isLogIn)
    if (isLogIn) {
      await SignIn({ email, password });
    } else {
      await SignUp({ email, password });
    }
  }


  return <div className="w-80 h-70 lg:w-96 flex flex-col items-center 
  bg-gray-200 rounded-xl mb-4" >
    <div className="flex w-full h-12 items-center border-b border-gray-500">
      <span onClick={() => setIsLogIn(true)} className={`w-6/12 h-full flex 
      items-center justify-center border-r	border-gray-500 rounded-tl-xl
      ${isLogIn ? "bg-gray-700" : ""}`}>
        <p>Log In</p>
      </span>
      <span onClick={() => setIsLogIn(false)} className={`w-6/12 h-full flex 
      items-center justify-center border-l border-gray-500 rounded-tr-xl
      ${isLogIn ? "" : "bg-gray-700"}`}>
        <p>Sign Up</p>
      </span>
    </div>
    <div className="flex flex-col w-60 justify-around items-center">
      <div className="flex flex-col items-center pt-2">
        <Input type="text" htmlFor="email" label="Email"
          placeholder="johndoe@gmail.com" onchange={(e) => { setEmail(e.target.value) }} />
        <Input type="password" htmlFor="password" label="Password"
          placeholder="*******" onchange={(e) => { setPassword(e.target.value) }} />
        <div className="flex justify-around my-4">
          <Button text={isLogIn ? "Log in" : "Create an account"}
            className={isLogIn ? "" : "w-44"} onClick={() => SubmitForm()} />
        </div>
      </div>
    </div>
  </div>
}