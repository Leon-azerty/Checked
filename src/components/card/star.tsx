import { IconContext } from "react-icons";
import { StarProps } from "@/components/card/starProps";
import { BsStarFill } from "react-icons/bs";

export function Star(props: StarProps) {
  return <a href={`#card-${props.id}`} className="pr-4"
    onClick={() => { props.handleTodoFavorite() }}>
    <IconContext.Provider value={{
      size: '26',
      color: props.is_favorite ? '#FFC700' : "#7E7E7E"
    }}>
      <BsStarFill />
    </IconContext.Provider>
  </a>
}