import '@/app/globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import ToastWrapper from './toastWrapper'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Checked, Todo-app',
  description: 'Checked Todo-app',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en</html>">
      <body className={inter.className}>
        <ToastWrapper>{children}</ToastWrapper>
      </body>
    </html>
  )
}
