import Image from "next/image";

export default function Header() {
  return <div className="flex flex-col p-5 justify-center items-center md:items-baseline md:flex-row md:justify-start">
    <Image src="/C/Title_blue_black.png" width="300" height="300" alt="title" />
    <p className="md:ml-4 text-2xl ">Dit it, Checked it</p>

  </div>
}