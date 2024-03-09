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
      className="h-34 fixed right-0 top-10 z-[1] mr-2 flex w-96 items-start justify-between 
    overflow-auto rounded-lg border-2 border-gray-700 bg-gray-200 p-2"
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
