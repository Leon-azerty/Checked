import {
  AiOutlinePlusCircle,
  AiFillStar,
  AiFillCheckSquare,
  AiTwotoneCheckSquare,
} from 'react-icons/ai'
import { RiDeleteBin6Line } from 'react-icons/ri'
import { BsListNested } from 'react-icons/bs'
import { gray_700, starYellow } from '@/const/colors'
import IconButton from '@/components/iconButton'
import { getTagsContext } from '@/context/tagsContext'
import Tag from './tag'
import type { Tag as TagType } from '@/dto/tag.types'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { getModalContext } from '@/context/modalTextContext'

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
  const [tags] = getTagsContext()
  const [, setModalText] = getModalContext()

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
    const { data, error } = await supabase.from('tag').delete().eq('id', tag.id)
    if (error) {
      console.log(error)
      setModalText(error.message)
    }
  }

  return (
    <aside className="bg-white w-72 border-white-500 border-solid border-r-4 ">
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
