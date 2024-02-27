import { createContext, Dispatch, SetStateAction, useContext } from 'react'

type ToasterContextType = [string, Dispatch<SetStateAction<string>>]

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
