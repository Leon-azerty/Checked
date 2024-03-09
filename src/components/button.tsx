import { Spinner } from './spinner'
import { MouseEventHandler } from 'react'

export default function Button({
  text,
  onClick,
  className,
  type,
  step,
}: {
  text: string
  onClick: MouseEventHandler<HTMLButtonElement>
  className?: string
  type: 'button' | 'submit' | 'reset'
  step?: string
}) {
  return (
    <button
      type={type}
      disabled={step == 'loading' ? true : false}
      onClick={onClick}
      className={`${className} mr-4 mt-2
  flex w-28 justify-center
  rounded-lg bg-gradient-to-r from-black 
  to-gray-700 px-5 
  py-2.5 text-center text-sm font-medium text-white 
  hover:bg-gradient-to-br  focus:outline-none focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-800`}
    >
      {text}
      {step == 'loading' ? <Spinner /> : ''}
    </button>
  )
}
