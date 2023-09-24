import { InputProps } from "./input.props";

export default function Input(props: InputProps) {
  return <div>
    <label htmlFor={props.htmlFor} className="block mb-2 text-sm 
    font-medium text-gray-900 dark:text-white">
      {props.label}
    </label>
    <input onChange={props.onchange} type={props.type} id={props.htmlFor}
      className="bg-gray-50 border border-gray-300 text-gray-900 
    text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 
    block w-full p-2.5 "
      placeholder={props.placeholder} required
    />
    {/* dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 */}
  </div>
} 