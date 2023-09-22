import { AiOutlinePlusCircle, AiFillStar, AiFillCheckSquare, AiTwotoneCheckSquare } from "react-icons/ai";
import { RiDeleteBin6Line } from "react-icons/ri";
import { BsListNested } from 'react-icons/bs';
import { MenuProps } from './menu.props';
import { gray_700, starYellow } from "../../const/colors";
import IconButton from "../iconButton/iconButton";

export default function Menu(props: MenuProps) {

  const handleCreateTodo = () => {
    props.setTab('create');
  }

  const handleListAllTodos = () => {
    props.setTab('listAll');
  }

  const handleListFavoriteTodos = () => {
    props.setTab('listFavorite');
  }

  const handleListCheckedTodos = () => {
    props.setTab('listChecked');
  }

  const handleListUncheckedTodos = () => {
    props.setTab('listUnchecked');
  }

  const handleListTrash = () => {
    props.setTab('listDeleted');
  }

  return <div className="bg-white w-72 border-white-500 border-solid border-r-4 " >
    <IconButton icon={<AiOutlinePlusCircle />} text='Create Todo' onClick={handleCreateTodo} iconColor='black' className={`${props.tab == 'create' ? "font-bold" : ""}`} />
    <IconButton icon={<BsListNested />} text='All' onClick={handleListAllTodos} iconColor='black' className={`${props.tab == 'listAll' ? "font-bold" : ""}`} />
    <IconButton icon={<AiFillStar />} text='Favorites' onClick={handleListFavoriteTodos} iconColor={starYellow} className={`${props.tab == 'listFavorite' ? "font-bold" : ""}`} />
    <IconButton icon={<AiFillCheckSquare />} text='Checked' onClick={handleListCheckedTodos} iconColor={gray_700} className={`${props.tab == 'listChecked' ? "font-bold" : ""}`} />
    <IconButton icon={<AiTwotoneCheckSquare />} text='Unchecked' onClick={handleListUncheckedTodos} iconColor={gray_700} className={`${props.tab == 'listUnchecked' ? "font-bold" : ""}`} />
    <IconButton icon={<RiDeleteBin6Line />} text='Trash' onClick={handleListTrash} iconColor={gray_700} className={`${props.tab == 'listTrash' ? "font-bold" : ""}`} />
    <div className="border-gray-400 border-solid border-b-2 rounded-md mx-8"></div>
  </div >
}