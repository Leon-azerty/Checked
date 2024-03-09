export default function Checkbox({
  htmlFor,
  label,
  placeholder,
  onchange,
  value,
  isError,
}: {
  htmlFor: string
  label: string
  placeholder: string
  onchange: (e: any) => void
  value?: string
  isError?: boolean
}) {
  return (
    <div className="my-2 flex items-center">
      <label
        htmlFor={htmlFor}
        className={`w-32 text-gray-900
      ${isError ? 'text-red' : ''}`}
      >
        {label} {isError ? ' is required' : ''}
      </label>
      <input
        onChange={onchange}
        type="checkbox"
        id={htmlFor}
        className={`block rounded-lg border border-gray-300 
    bg-gray-50 text-sm text-gray-900 focus:border-blue-500 
    focus:ring-blue-500 ${isError ? 'border-red' : ''}`}
        placeholder={placeholder}
        value={value}
      />
    </div>
  )
}
