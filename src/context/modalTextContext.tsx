import { createContext, Dispatch, SetStateAction } from 'react';

type ModalTextContextType = [string, Dispatch<SetStateAction<string>>];

export const ModalTextContext = createContext<ModalTextContextType | undefined>(undefined);