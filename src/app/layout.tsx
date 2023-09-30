'use client';
import '@/app/globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { ModalTextContext } from '@/context/modalTextContext';
import { useState } from 'react';
import Modal from '@/components/modal/modal';

const inter = Inter({ subsets: ['latin'] })

const metadata: Metadata = {
  title: 'Checked',
  description: 'Checked Todo-app',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [modalText, setModalText] = useState<string>("");

  return (
    <html lang="en">
      <body className={inter.className}>
        <ModalTextContext.Provider value={[modalText, setModalText]}>
          {modalText != "" && <Modal />}

          {children}
        </ModalTextContext.Provider>
      </body>
    </html>
  )
}
