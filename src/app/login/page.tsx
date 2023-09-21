'use client';
import Image from 'next/image'
import '../globals.css'
import Header from './header'
import Title from './title'
import MenuTitle from './menuTitle'
import MenuDesc from './menuDesc'
import Footer from './footer'
import "./scrollbar.css"
import LargeContent from './largeContent'
import { Suspense } from 'react';

export default function Login() {
  return (
    <div className='no-scrollbar overflow-y-auto text-black'>
      <div className="flex flex-col w-screen bg-white">
        <Header />
        <div className='flex flex-col justify-center'>
          <Title />
          <Suspense fallback={<div>Loading...</div>}>
            <LargeContent />
          </Suspense>
          <MenuTitle />
          <div className='flex flex-col md:flex-row items-center justify-center'>
            <Image src="/menu.png" width="200" height="200" alt="menu" />
            <MenuDesc />
          </div>
        </div>
        <Footer />
      </div>
    </div>
  )
}