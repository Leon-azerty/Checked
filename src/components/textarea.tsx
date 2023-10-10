export default function Textarea({ onChange }: {
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}) {
  return <>
    <label htmlFor="description" className="pt-4 ml-4 block mb-2 text-sm 
    font-medium text-gray-900 dark:text-white">Your description</label>
    <textarea id="description" rows={4} onChange={onChange}
      className="resize-none block p-2.5 w-full text-sm bg-gray-50 border 
      border-gray-300 text-gray-900 description-lg focus:ring-blue-500 
      focus:border-blue-500 rounded-lg" placeholder="Description"></textarea>

  </>
}