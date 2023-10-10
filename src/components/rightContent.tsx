import { RiDeleteBin6Line } from "react-icons/ri";
import { AiFillCheckSquare, AiTwotoneCheckSquare } from "react-icons/ai";
import { IconContext } from "react-icons";
import { IconSizeInPx } from "@/const/iconSize";
import { ImCancelCircle } from 'react-icons/im';
import { gray_700 } from "@/const/colors";

export function RightContent({ is_finished, handleTodoState, is_deleted, id, handleDeleteTodo, restoreTodo,
}: {
  is_finished: boolean
  handleTodoState: () => void
  is_deleted: boolean
  id: number
  handleDeleteTodo: () => void
  restoreTodo: () => void
}) {

  const handleOnClick = async () => {
    is_deleted ? restoreTodo() : handleDeleteTodo()
  }

  return <div className="w-36 border-gray-200 border-solid border-l-2 flex flex-col 
  justify-between items-center" >
    <IconContext.Provider value={{ size: IconSizeInPx, color: gray_700 }}>
      <a onClick={() => handleTodoState()} href={`#card-${id}`}>
        {is_finished ? <AiFillCheckSquare /> : <AiTwotoneCheckSquare />}
      </a>
    </IconContext.Provider>
    <IconContext.Provider value={{ size: IconSizeInPx, color: is_deleted ? 'black' : gray_700 }}>
      <a onClick={() => { handleOnClick() }} href={`#card-${id}`}>
        {is_deleted ? <ImCancelCircle /> : <RiDeleteBin6Line />}
      </a>
    </IconContext.Provider>
  </div>
}