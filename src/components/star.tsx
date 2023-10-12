import { IconContext } from "react-icons";
import { BsStarFill } from "react-icons/bs";
import { IconSizeInPx } from "@/const/iconSize";
import { starYellow, gray_700 } from "@/const/colors";

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
      color: is_favorite ? starYellow : gray_700
    }}>
      <BsStarFill />
    </IconContext.Provider>
  </a>
}