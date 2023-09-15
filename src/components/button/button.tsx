import { ButtonProps } from './button.props';

export default function Button(props: ButtonProps) {
  return <button type="button" onClick={props.onClick} className="w-28 text-white bg-gradient-to-r 
  from-black to-gray-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none 
  focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 
  text-center  mr-4">{props.text}</button>

}