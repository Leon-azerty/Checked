import { IconContext } from 'react-icons'
import { IconSizeInPx } from '@/const/iconSize'
import { MouseEventHandler } from 'react'

export default function IconButton({
  text,
  onClick,
  icon,
  iconColor,
  className,
}: {
  text: string
  onClick: MouseEventHandler<HTMLButtonElement>
  icon: any
  iconColor: string
  className?: string
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="my-2 
  inline-flex w-full items-center rounded-lg px-5 py-2.5 
  text-center text-sm font-medium hover:bg-gray-700 focus:outline-none"
    >
      <div className="flex w-10 justify-center">
        <IconContext.Provider value={{ size: IconSizeInPx, color: iconColor }}>
          {icon}
        </IconContext.Provider>
      </div>
      <p className={`${className} w-30 text-xl`}>{text}</p>
    </button>
  )
}
