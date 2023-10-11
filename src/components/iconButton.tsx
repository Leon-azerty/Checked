import { IconContext } from "react-icons";
import { IconSizeInPx } from "@/const/iconSize";
import { MouseEventHandler } from "react";

export default function IconButton({ text, onClick, icon, iconColor, className,
}: {
  text: string;
  onClick: MouseEventHandler<HTMLButtonElement>;
  icon: any;
  iconColor: string;
  className?: string;
}) {
  return <button type="button" onClick={onClick} className="w-full 
  hover:bg-[#7E7E7E] focus:outline-none font-medium rounded-lg text-sm px-5 
  py-2.5 text-center inline-flex items-center my-2">
    <div className='w-10 flex justify-center'>
      <IconContext.Provider value={{ size: IconSizeInPx, color: iconColor }}>
        {icon}
      </IconContext.Provider>
    </div>
    <p className={`${className} w-30 text-xl`}>
      {text}
    </p>
  </button>
}