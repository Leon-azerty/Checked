'use client'
import Toaster from '@/components/toaster'
import { ToasterContext } from '@/context/toasterTextContext'
import { useState } from 'react'

export default function ToastWrapper({
  children,
}: {
  children: React.ReactNode
}) {
  const [toaster, setToaster] = useState<{ type: string; message: string }>({
    type: '',
    message: '',
  })

  if (toaster.message != '') {
    setTimeout(() => {
      setToaster({ message: '', type: '' })
    }, 5000)
  }
  return (
    <ToasterContext.Provider value={[toaster, setToaster]}>
      {toaster.message != '' && <Toaster />}
      {children}
    </ToasterContext.Provider>
  )
}
