import { InputProps } from "@/components/input/input.props";

export default function Input(props: InputProps) {
  return <div className="m-2">
    <label htmlFor={props.htmlFor} className={`block mb-2 text-sm 
    font-medium text-gray-900 ${props.isError ? "text-red" : ""}`}>
      {props.label} {props.isError ? " is required" : ""}
    </label>
    <input onChange={props.onchange} type={props.type} id={props.htmlFor}
      className={`bg-gray-50 border border-gray-300 text-gray-900 
    text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 
    block w-full p-2.5 ${props.isError ? "border-red" : ""}`}
      placeholder={props.placeholder}
      value={props.value}
    />
  </div>
} 