export default function Radio({ htmlFor, label, placeholder, onchange, value, isError, name,
}: {
  htmlFor: string, label: string, placeholder: string, onchange: (e: any) => void, value?: string, isError?: boolean, name: string
}) {
  return <div className="m-2">
    <label htmlFor={htmlFor} className={`block mb-2 text-sm 
  font-medium text-gray-900 dark:text-white ${isError ? "text-red" : ""}`}>
      {label} {isError ? " is required" : ""}
    </label>
    <input onChange={onchange} type="radio" name={name} id={htmlFor}
      className={`bg-gray-50 border border-gray-300 text-gray-900 
  text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 
  block w-full p-2.5 ${isError ? "border-red" : ""}`}
      placeholder={placeholder}
      value={value}
    />
  </div>
}