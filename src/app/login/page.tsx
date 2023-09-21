'use client'
import Image from 'next/image'
import '../globals.css'
import Form from './form'
import Header from './header'
import Title from './title'
import MenuTitle from './menuTitle'
import MenuDesc from './menuDesc'
import Footer from './footer'
import "./scrollbar.css"

export default function Login() {
  return (
    <div className='no-scrollbar overflow-y-auto'>
      <div className="flex flex-col w-screen bg-white">
        <Header />
        <div className='flex flex-col justify-center'>
          <Title />
          <div className='flex justify-around'>
            <Image src="/todos.png" width="700" height="700" alt="todos" />
            <Form />
          </div>
          <MenuTitle />
          <div className='flex justify-center'>
            <Image src="/menu.png" width="200" height="200" alt="menu" />
            <MenuDesc />
          </div>
        </div>
        <Footer />
      </div>
    </div>
  )
}