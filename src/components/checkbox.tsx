
export default function Checkbox({ htmlFor, label, placeholder, onchange, value, isError }: {
  htmlFor: string;
  label: string;
  placeholder: string;
  onchange: (e: any) => void;
  value?: string;
  isError?: boolean;
}) {
  return <div className="m-2">
    <label htmlFor={htmlFor} className={`block mb-2 text-sm 
    font-medium text-gray-900 dark:text-white ${isError ? "text-red" : ""}`}>
      {label} {isError ? " is required" : ""}
    </label>
    <input onChange={onchange} type="checkbox" id={htmlFor}
      className={`bg-gray-50 border border-gray-300 text-gray-900 
    text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 
    block w-full p-2.5 ${isError ? "border-red" : ""}`}
      placeholder={placeholder}
      value={value}
    />
  </div>
}