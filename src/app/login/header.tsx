import Image from "next/image";

export default function Header() {
  return <div className="flex p-5 justify-center md:justify-start">
    <Image src="/C/Title_blue_black.png" width="300" height="300" alt="title" />
  </div>
}