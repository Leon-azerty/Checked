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
      className={`${className} w-28 text-white
  bg-gradient-to-r from-black to-gray-700
  hover:bg-gradient-to-br focus:ring-4 focus:outline-none 
  focus:ring-blue-300 dark:focus:ring-blue-800 
  font-medium rounded-lg text-sm px-5 py-2.5 
  text-center  mr-4 mt-2 flex justify-center`}
    >
      {text}
      {step == 'loading' ? <Spinner /> : ''}
    </button>
  )
}
