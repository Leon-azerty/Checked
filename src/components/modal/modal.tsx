import { useContext } from "react";
import { ModalProps } from "@/components/modal/modal.props";
import { ModalTextContext } from '@/context/modalTextContext';

export default function Modal(props: ModalProps) {
  const context = useContext(ModalTextContext);
  if (!context) {
    throw new Error('modalTextContext must be used within a ModalTextContext');
  }
  const [modalText, setModalText] = context;
  return <div
    className="fixed right-0 top-10 z-[1] flex justify-between items-start p-2 h-34 w-96 
    bg-gray-200 overflow-auto rounded-lg border-gray-700 border-2"
  >
    <p className="text-red">
      {modalText}
    </p>
    <button className="text-xl" onClick={() => setModalText("")}>
      X
    </button>
  </div>
}