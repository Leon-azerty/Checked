export default function Input({
  htmlFor,
  label,
  placeholder,
  type,
  onchange,
  value,
  isError,
}: {
  htmlFor: string
  label: string
  placeholder: string
  type: string
  onchange: (e: any) => void
  value?: string
  isError?: boolean
}) {
  return (
    <div className="">
      <label
        htmlFor={htmlFor}
        className={`mb-2 block text-sm 
    font-medium text-gray-900 ${isError ? 'text-red' : ''}`}
      >
        {label} {isError ? ' is required' : ''}
      </label>
      <input
        onChange={onchange}
        type={type}
        id={htmlFor}
        className={`block w-full rounded-lg border 
    border-gray-300 bg-gray-50 p-2.5 text-sm 
    text-gray-900 focus:border-blue-500 focus:ring-blue-500 ${isError ? 'border-red' : ''}`}
        placeholder={placeholder}
        value={value}
      />
    </div>
  )
}
