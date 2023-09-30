import { AiOutlinePlusCircle, AiFillStar, AiFillCheckSquare, AiTwotoneCheckSquare } from "react-icons/ai";
import { RiDeleteBin6Line } from "react-icons/ri";
import { BsListNested } from 'react-icons/bs';
import { MenuProps } from '@/components/menu/menu.props';
import { gray_700, starYellow } from "@/const/colors";
import IconButton from "@/components/iconButton/iconButton";
import { useContext } from "react";
import { TagsContext } from '@/context/tagsContext';
import TagMenu from "@/components/tagMenu/tagMenu";

export default function Menu(props: MenuProps) {
  const tagsContext = useContext(TagsContext);
  if (!tagsContext) {
    throw new Error('todosContext must be used within a TodosProvider');
  }
  const [tags, setTags] = tagsContext;

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

  const addTagsInFilter = (name: string) => {
    if (props.filter.includes(name)) {
      props.setFilter(props.filter.filter((e) => e != name));
    } else {
      props.setFilter([...props.filter, name]);
    }
    return;
  }

  return <aside className="bg-white w-72 border-white-500 border-solid border-r-4 " >
    <IconButton icon={<AiOutlinePlusCircle />} text='Create Todo' onClick={handleCreateTodo} iconColor='black' className={`${props.tab == 'create' ? "font-bold" : ""}`} />
    <IconButton icon={<BsListNested />} text='All' onClick={handleListAllTodos} iconColor='black' className={`${props.tab == 'listAll' ? "font-bold" : ""}`} />
    <IconButton icon={<AiFillStar />} text='Favorites' onClick={handleListFavoriteTodos} iconColor={starYellow} className={`${props.tab == 'listFavorite' ? "font-bold" : ""}`} />
    <IconButton icon={<AiFillCheckSquare />} text='Checked' onClick={handleListCheckedTodos} iconColor={gray_700} className={`${props.tab == 'listChecked' ? "font-bold" : ""}`} />
    <IconButton icon={<AiTwotoneCheckSquare />} text='Unchecked' onClick={handleListUncheckedTodos} iconColor={gray_700} className={`${props.tab == 'listUnchecked' ? "font-bold" : ""}`} />
    <IconButton icon={<RiDeleteBin6Line />} text='Trash' onClick={handleListTrash} iconColor={gray_700} className={`${props.tab == 'listTrash' ? "font-bold" : ""}`} />
    <hr className="border-gray-400 border-solid border-b-2 rounded-lg mx-8"></hr>
    <div className="flex flex-wrap mt-2">
      {tags.length > 0 && tags.map((e, i) => <TagMenu key={e.name + i} tag={e} onClick={addTagsInFilter}></TagMenu>)}
    </div>
    {props.filter.length > 0 && props.filter.map((e, i) => <div key={e + i} className="flex flex-wrap mt-2">{e}</div>)}
  </aside >
}