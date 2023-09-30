import { IconContext } from "react-icons";
import { StarProps } from "@/components/card/star.props";
import { BsStarFill } from "react-icons/bs";
import { IconSizeInPx } from "@/const/iconSize";

export function Star(props: StarProps) {
  return <a href={`#card-${props.id}`} className="pr-4"
    onClick={() => { props.handleTodoFavorite() }}>
    <IconContext.Provider value={{
      size: IconSizeInPx,
      color: props.is_favorite ? '#FFC700' : "#7E7E7E"
    }}>
      <BsStarFill />
    </IconContext.Provider>
  </a>
}