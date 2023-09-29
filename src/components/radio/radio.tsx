import { RadioProps } from "./radio.props";

export default function Radio(props: RadioProps) {
  return <div className="m-2">
    <label htmlFor={props.htmlFor} className={`block mb-2 text-sm 
  font-medium text-gray-900 dark:text-white ${props.isError ? "text-red" : ""}`}>
      {props.label} {props.isError ? " is required" : ""}
    </label>
    <input onChange={props.onchange} type="radio" name={props.name} id={props.htmlFor}
      className={`bg-gray-50 border border-gray-300 text-gray-900 
  text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 
  block w-full p-2.5 ${props.isError ? "border-red" : ""}`}
      placeholder={props.placeholder}
      value={props.value}
    />
  </div>
}