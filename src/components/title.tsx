import Image from "next/image";

export default function Title() {
  return <div className="flex justify-center w-full mt-4">
    <Image src="/C/Title_blue_black.png" priority className="w-auto" width="300" height="300" alt="title" />
  </div>
}