import { IconContext } from "react-icons";
import { StarProps } from "./starProps";
import { BsStarFill } from "react-icons/bs";

export function Star(props: StarProps) {
  return <a href={`#card-${props.id}`} className="pr-4"
    onClick={() => { props.handleTodoFavorite() }}>
    <IconContext.Provider value={{
      size: '26',
      color: props.isFavorite ? '#FFC700' : "#7E7E7E"
    }}>
      <BsStarFill />
    </IconContext.Provider>
  </a>
}