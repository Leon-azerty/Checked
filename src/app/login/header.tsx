import Image from 'next/image'
import TitleImage from '/public/C/Title_blue_black.png'

export default function Header() {
  return (
    <div className="flex flex-col items-center justify-center p-5 md:flex-row md:items-baseline md:justify-start">
      <Image src={TitleImage} className="w-auto" alt="title" />
      <p className="text-2xl md:ml-4 ">Did it, Checked it</p>
    </div>
  )
}
