import { useToasterContext } from '@/context/toasterTextContext'
import { IconContext } from 'react-icons'
import { MdCheckCircle, MdClose, MdError } from 'react-icons/md'

export default function Toaster() {
  const [toaster, setToaster] = useToasterContext()

  let icon = null

  if (toaster.type == 'ERROR') {
    icon = <MdError />
  } else {
    icon = <MdCheckCircle />
  }

  return (
    <div
      className="fixed right-0 top-10 z-[1] flex justify-between items-start p-2 h-34 w-96 
    bg-gray-200 overflow-auto rounded-lg border-gray-700 border-2 mr-2"
    >
      <div className="flex items-center space-x-1">
        <IconContext.Provider value={{ color: 'black' }}>
          {icon}
        </IconContext.Provider>
        <p className="text-black">{toaster.message}</p>
      </div>
      <button
        className="text-xl text-black"
        onClick={() => setToaster({ type: '', message: '' })}
      >
        <MdClose />
      </button>
    </div>
  )
}
