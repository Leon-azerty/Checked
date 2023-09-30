import { IconContext } from "react-icons";
import { IconButtonProps } from '@/components/iconButton/iconButton.props';

export default function IconButton(props: IconButtonProps) {
  return <button type="button" onClick={props.onClick} className="w-full hover:bg-[#7E7E7E] focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center my-2">
    <div className='w-10 flex justify-center'>
      <IconContext.Provider value={{ size: '26', color: props.iconColor }}>
        {props.icon}
      </IconContext.Provider>
    </div>
    <p className={`${props.className} w-30 text-xl`}>
      {props.text}
    </p>
  </button>
}