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
import { Suspense, useState } from 'react';
import Modal from '@/components/modal/modal';
import { ModalTextContext } from '@/context/modalTextContext';

export default function Login() {
  const [modalText, setModalText] = useState<string>("");
  return (
    <div className='no-scrollbar overflow-y-auto text-black'>
      <ModalTextContext.Provider value={[modalText, setModalText]}>
        {modalText != "" && <Modal />}
        <div className="flex flex-col w-screen bg-white">
          <Header />
          <div className='flex flex-col justify-center'>
            <Title />
            <button onClick={() => { setModalText("error blablabl") }}>
              showModal
            </button>
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
      </ModalTextContext.Provider>
    </div>
  )
}