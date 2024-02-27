import { Suspense } from 'react'
import Image from 'next/image'
import Header from '@/app/login/header'
import Title from '@/app/login/title'
import MenuTitle from '@/app/login/menuTitle'
import MenuDesc from '@/app/login/menuDesc'
import Footer from '@/app/login/footer'
import LargeContent from '@/app/login/largeContent'

const IMAGE_WIDTH = 200
const IMAGE_HEIGHT = 200

function ImageWithDesc() {
  return (
    <div className="flex flex-col md:flex-row items-center justify-center">
      <Suspense fallback={<div>Loading image...</div>}>
        <Image
          src="/menu_tags.png"
          className="w-auto"
          width={IMAGE_WIDTH}
          height={IMAGE_HEIGHT}
          alt="menu"
        />
      </Suspense>
      <MenuDesc />
    </div>
  )
}

export default function Body() {
  return (
    <div className="flex flex-col w-screen bg-white">
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
  )
}
