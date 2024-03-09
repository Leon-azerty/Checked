export default function Textarea({
  onChange,
}: {
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void
}) {
  return (
    <>
      <label
        htmlFor="description"
        className="mb-2 ml-4 block pt-4 text-sm 
    font-medium text-gray-900 dark:text-white"
      >
        Your description
      </label>
      <textarea
        id="description"
        rows={4}
        onChange={onChange}
        className="description-lg block w-full resize-none rounded-lg border border-gray-300 
      bg-gray-50 p-2.5 text-sm text-gray-900 
      focus:border-blue-500 focus:ring-blue-500"
        placeholder="Description"
      ></textarea>
    </>
  )
}
