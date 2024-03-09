import Image from 'next/image'

export default function Header() {
  return (
    <div className="flex flex-col items-center justify-center p-5 md:flex-row md:items-baseline md:justify-start">
      <Image
        src="/C/Title_blue_black.png"
        className="w-auto"
        width="300"
        height="300"
        alt="title"
      />
      <p className="text-2xl md:ml-4 ">Did it, Checked it</p>
    </div>
  )
}
