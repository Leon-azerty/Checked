'use client'
import '@/app/globals.css'
import Toaster from '@/components/toaster'
import { ToasterContext } from '@/context/toasterTextContext'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { useState } from 'react'

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
  const [toasterText, setToasterText] = useState<string>('')
  const infoMessageColor = 'text-info'
  const errorMessageColor = 'text-red'

  return (
    <html lang="en">
      <title>Checked, Todo app</title>
      <body className={inter.className}>
        <ToasterContext.Provider value={[toasterText, setToasterText]}>
          {toasterText != '' && (
            <Toaster
              color={
                toasterText.includes('ERROR')
                  ? errorMessageColor
                  : infoMessageColor
              }
            />
          )}
          {children}
        </ToasterContext.Provider>
      </body>
    </html>
  )
}
