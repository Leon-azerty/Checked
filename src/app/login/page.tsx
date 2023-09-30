'use client';
import '@/app/globals.css'
import "@/app/login/scrollbar.css"
import { useContext } from 'react';
import Modal from '@/components/modal/modal';
import { ModalTextContext } from '@/context/modalTextContext';
import Body from '@/app/login/body';

export default function Login() {
  const context = useContext(ModalTextContext);
  if (!context) {
    throw new Error("ModalTextContext is not defined");
  }
  const [modalText, _] = context;
  return (
    <div className='no-scrollbar overflow-y-auto text-black'>
      {modalText != "" && <Modal />}
      <Body />
    </div>
  )
}