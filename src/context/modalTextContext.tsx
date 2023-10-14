import { createContext, Dispatch, SetStateAction, useContext } from 'react'

type ModalContextType = [string, Dispatch<SetStateAction<string>>]

export const ModalContext = createContext<ModalContextType | undefined>(
  undefined
)

export const useModalContext = () => {
  const context = useContext(ModalContext)
  if (context === undefined) {
    throw new Error('ModalContext must be used within a ModalProvider')
  }
  return context
}
