import { TextareaProps } from "./textarea.props";

export default function Textarea(props: TextareaProps) {
  return <>
    <label htmlFor="description" className="pt-4 ml-4 block mb-2 text-sm font-medium 
    text-gray-900 dark:text-white">Your description</label>
    <textarea id="description" rows={4} onChange={props.onChange}
      className="resize-none block p-2.5 w-full text-sm text-gray-900 bg-gray-50 
    description-lg focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 
    dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 
    dark:focus:border-blue-500" placeholder="Description"></textarea>

  </>
}