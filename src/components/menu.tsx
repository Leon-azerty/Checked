import IconButton from '@/components/iconButton'
import { gray_700, starYellow } from '@/const/colors'
import { useTagsContext } from '@/context/tagsContext'
import { useToasterContext } from '@/context/toasterTextContext'
import { useTodosContext } from '@/context/todosContext'
import type { Tag as TagType } from '@/dto/tag.types'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import {
  AiFillCheckSquare,
  AiFillStar,
  AiOutlinePlusCircle,
  AiTwotoneCheckSquare,
} from 'react-icons/ai'
import { BsListNested } from 'react-icons/bs'
import { RiDeleteBin6Line } from 'react-icons/ri'
import Tag from './tag'

export default function Menu({
  tab,
  setTab,
  filter,
  setFilter,
}: {
  tab: string
  setTab: (create: string) => void
  filter: string[]
  setFilter: (filter: string[]) => void
}) {
  const [tags, setTags] = useTagsContext()
  const [, setToasterText] = useToasterContext()
  const [todos, setTodos] = useTodosContext()

  const handleCreateTodo = () => {
    setTab('create')
  }

  const handleListAllTodos = () => {
    setTab('listAll')
  }

  const handleListFavoriteTodos = () => {
    setTab('listFavorite')
  }

  const handleListCheckedTodos = () => {
    setTab('listChecked')
  }

  const handleListUncheckedTodos = () => {
    setTab('listUnchecked')
  }

  const handleListTrash = () => {
    setTab('listDeleted')
  }

  const addTagsInFilter = (tag: TagType) => {
    if (filter.includes(tag.name)) {
      setFilter(filter.filter((e) => e != tag.name))
    } else {
      setFilter([...filter, tag.name])
    }
    return
  }

  const removeTag = async (tag: TagType) => {
    const supabase = createClientComponentClient()
    for (const todo of todos) {
      for (const todoTag of todo.tags)
        if (todoTag.name == tag.name) {
          setToasterText(
            "ERROR : Can't delete tag because it is used in a todo"
          )
          return
        }
    }
    const { data, error } = await supabase.from('tag').delete().eq('id', tag.id)
    if (error) {
      console.log(error)
      setToasterText('ERROR : ' + error.message)
      return
    }
    setTags(tags.filter((e) => e.id != tag.id))
  }

  return (
    <aside className="bg-white w-72 border-white-500 border-solid border-r-4 animate-slide_to_right">
      <IconButton
        icon={<AiOutlinePlusCircle />}
        text="Create Todo"
        onClick={handleCreateTodo}
        iconColor="black"
        className={`${tab == 'create' ? 'font-bold' : ''}`}
      />
      <IconButton
        icon={<BsListNested />}
        text="All"
        onClick={handleListAllTodos}
        iconColor="black"
        className={`${tab == 'listAll' ? 'font-bold' : ''}`}
      />
      <IconButton
        icon={<AiFillStar />}
        text="Favorites"
        onClick={handleListFavoriteTodos}
        iconColor={starYellow}
        className={`${tab == 'listFavorite' ? 'font-bold' : ''}`}
      />
      <IconButton
        icon={<AiTwotoneCheckSquare />}
        text="Unchecked"
        onClick={handleListUncheckedTodos}
        iconColor={gray_700}
        className={`${tab == 'listUnchecked' ? 'font-bold' : ''}`}
      />
      <IconButton
        icon={<AiFillCheckSquare />}
        text="Checked"
        onClick={handleListCheckedTodos}
        iconColor={gray_700}
        className={`${tab == 'listChecked' ? 'font-bold' : ''}`}
      />
      <IconButton
        icon={<RiDeleteBin6Line />}
        text="Trash"
        onClick={handleListTrash}
        iconColor={gray_700}
        className={`${tab == 'listTrash' ? 'font-bold' : ''}`}
      />
      <hr className="border-gray-400 border-solid border-b-2 rounded-lg mx-8"></hr>
      <div className="flex flex-wrap mt-2">
        {tags.length > 0 &&
          tags.map((e, i) => (
            <Tag
              key={e.name + i}
              tag={e}
              onClick={addTagsInFilter}
              removeTag={removeTag}
            />
          ))}
      </div>
    </aside>
  )
}
