import { RightContentProps } from "@/components/card/rightCard.props";
import { RiDeleteBin6Line } from "react-icons/ri";
import { AiFillCheckSquare, AiTwotoneCheckSquare } from "react-icons/ai";
import { IconContext } from "react-icons";

export function RightCard(props: RightContentProps) {
  return <div className="w-36 border-[#D9D9D9] border-solid border-l-2 flex flex-col 
  justify-between items-center" >
    <IconContext.Provider value={{ size: '26', color: '#7E7E7E' }}>
      <a onClick={() => props.handleTodoState()} href={`#card-${props.id}`}>
        {props.is_finished ? <AiFillCheckSquare /> : <AiTwotoneCheckSquare />}
      </a>
    </IconContext.Provider>
    <IconContext.Provider value={{ size: '26', color: props.is_deleted ? 'black' : '#7E7E7E' }}>
      <a onClick={() => { props.handleDeleteTodo() }} href={`#card-${props.id}`}>
        <RiDeleteBin6Line />
      </a>
    </IconContext.Provider>
  </div>
}