import { RightContentProps } from "@/components/card/rightContent.props";
import { RiDeleteBin6Line } from "react-icons/ri";
import { AiFillCheckSquare, AiTwotoneCheckSquare } from "react-icons/ai";
import { IconContext } from "react-icons";
import { IconSizeInPx } from "@/const/iconSize";
import { ImCancelCircle } from 'react-icons/im';

export function RightContent(props: RightContentProps) {

  const handleOnClick = async () => {
    if (props.is_deleted) {
      props.restoreTodo()
    } else {
      props.handleDeleteTodo()
    }
  }

  return <div className="w-36 border-[#D9D9D9] border-solid border-l-2 flex flex-col 
  justify-between items-center" >
    <IconContext.Provider value={{ size: IconSizeInPx, color: '#7E7E7E' }}>
      <a onClick={() => props.handleTodoState()} href={`#card-${props.id}`}>
        {props.is_finished ? <AiFillCheckSquare /> : <AiTwotoneCheckSquare />}
      </a>
    </IconContext.Provider>
    <IconContext.Provider value={{ size: IconSizeInPx, color: props.is_deleted ? 'black' : '#7E7E7E' }}>
      <a onClick={() => { handleOnClick() }} href={`#card-${props.id}`}>
        {props.is_deleted ? <ImCancelCircle /> : <RiDeleteBin6Line />}
      </a>
    </IconContext.Provider>
  </div>
}