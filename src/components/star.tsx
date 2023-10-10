import { IconContext } from "react-icons";
import { BsStarFill } from "react-icons/bs";
import { IconSizeInPx } from "@/const/iconSize";

export function Star({ id, handleTodoFavorite, is_favorite
}: {
  id: number
  handleTodoFavorite: () => void
  is_favorite: boolean
}) {
  return <a href={`#card-${id}`} className="pr-4"
    onClick={() => { handleTodoFavorite() }}>
    <IconContext.Provider value={{
      size: IconSizeInPx,
      color: is_favorite ? '#FFC700' : "#7E7E7E"
    }}>
      <BsStarFill />
    </IconContext.Provider>
  </a>
}