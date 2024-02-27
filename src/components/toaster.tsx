import { useToasterContext } from '@/context/toasterTextContext'

export default function Toaster({ color }: { color: string }) {
  const [toasterText, setToasterText] = useToasterContext()
  return (
    <div
      className="fixed right-0 top-10 z-[1] flex justify-between items-start p-2 h-34 w-96 
    bg-gray-200 overflow-auto rounded-lg border-gray-700 border-2"
    >
      <p className={color}>{toasterText}</p>
      <button className="text-xl text-black" onClick={() => setToasterText('')}>
        X
      </button>
    </div>
  )
}
