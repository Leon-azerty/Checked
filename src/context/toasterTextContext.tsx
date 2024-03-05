import { createContext, Dispatch, SetStateAction, useContext } from 'react'

type ToasterContextType = [
  { type: string; message: string },
  Dispatch<SetStateAction<{ type: string; message: string }>>
]

export const ToasterContext = createContext<ToasterContextType | undefined>(
  undefined
)

export const useToasterContext = () => {
  const context = useContext(ToasterContext)
  if (context === undefined) {
    throw new Error('ToasterContext must be used within a ToasterProvider')
  }
  return context
}
