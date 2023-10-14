import { useModalContext } from '@/context/modalTextContext'

export default function Modal({ color }: { color: string }) {
  const [modalText, setModalText] = useModalContext()
  return (
    <div
      className="fixed right-0 top-10 z-[1] flex justify-between items-start p-2 h-34 w-96 
    bg-gray-200 overflow-auto rounded-lg border-gray-700 border-2"
    >
      <p className={color}>{modalText}</p>
      <button className="text-xl text-black" onClick={() => setModalText('')}>
        X
      </button>
    </div>
  )
}
