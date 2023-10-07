import { Suspense } from 'react';
import Image from 'next/image'
import Header from '@/app/login/header'
import Title from '@/app/login/title'
import MenuTitle from '@/app/login/menuTitle'
import MenuDesc from '@/app/login/menuDesc'
import Footer from '@/app/login/footer'
import LargeContent from '@/app/login/largeContent'

export default function Body() {

  return <div className="flex flex-col w-screen bg-white">
    <Header />
    <div className='flex flex-col justify-center'>
      <Title />
      <Suspense fallback={<div>Loading...</div>}>
        <LargeContent />
      </Suspense>
      <MenuTitle />
      <div className='flex flex-col md:flex-row items-center justify-center'>
        <Image src="/menu_tags.png" width="200" height="200" alt="menu" />
        <MenuDesc />
      </div>
    </div>
    <Footer />
  </div>
}