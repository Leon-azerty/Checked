import Image from 'next/image'
import TitleImage from '/public/C/Title_blue_black.png'

export default function Header() {
  return (
    <div className="mt-2 flex flex-col items-center justify-center md:flex-row md:items-baseline md:justify-start md:p-5">
      <Image src={TitleImage} className="w-auto" alt="title" />
      <p className="text-2xl md:ml-4 ">Did it, Checked it</p>
    </div>
  )
}
