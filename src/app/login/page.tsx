import '@/app/globals.css'
import Footer from '@/app/login/footer'
import Header from '@/app/login/header'
import LargeContent from '@/app/login/largeContent'
import MenuDesc from '@/app/login/menuDesc'
import MenuTitle from '@/app/login/menuTitle'
import '@/app/login/scrollbar.css'
import Title from '@/app/login/title'
import Image from 'next/image'
import { Suspense } from 'react'
import TagsImage from '/public/menu_tags.png'

function ImageWithDesc() {
  return (
    <div className="flex flex-col items-center justify-center md:flex-row">
      <Suspense fallback={<div>Loading image...</div>}>
        <Image src={TagsImage} className="w-auto" alt="menu" />
      </Suspense>
      <MenuDesc />
    </div>
  )
}

export default function Login() {
  return (
    <div className="no-scrollbar overflow-y-auto text-black">
      <div className="flex w-screen flex-col bg-white">
        <Header />
        <div className="flex flex-col justify-center">
          <Title />
          <Suspense fallback={<div>Loading content...</div>}>
            <LargeContent />
          </Suspense>
          <MenuTitle />
          <ImageWithDesc />
        </div>
        <Footer />
      </div>
    </div>
  )
}
