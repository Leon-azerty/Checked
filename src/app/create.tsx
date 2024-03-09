import Button from '@/components/button'
import Input from '@/components/input'
import Tag from '@/components/tag'
import Textarea from '@/components/textarea'
import { useTagsContext } from '@/context/tagsContext'
import { useToasterContext } from '@/context/toasterTextContext'
import { useTodosContext } from '@/context/todosContext'
import type { Tag as TagType } from '@/dto/tag.types'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { useState } from 'react'
import { HexColorPicker } from 'react-colorful'
import { IconContext } from 'react-icons'
import { AiOutlineCloseCircle } from 'react-icons/ai'
import IconButton from '../components/iconButton'
import Deadline from './deadline'

export default function Create({
  setTab,
}: {
  setTab: (create: string) => void
}) {
  const [tags, setTags] = useState<TagType[]>([])
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [isTitleFilled, setIsTitleFilled] = useState(false)
  const [tagName, setTagName] = useState<string>('')
  const [color, setColor] = useState<string>('gray-200')
  const supabase = createClientComponentClient()
  const [date, setDate] = useState<string>('')
  const [time, setTime] = useState<string>('')
  const [isDeadline, setIsDeadline] = useState<boolean>(false)
  const [deadlineType, setDeadlineType] = useState<string>('')
  const [existantTags, setExistantTags] = useTagsContext()
  const [todos, setTodos] = useTodosContext()
  const [, setToasterText] = useToasterContext()

  const insertTodo = async () => {
    const id = (await supabase.auth.getUser()).data.user?.id
    const { data, error } = await supabase
      .from('todo')
      .insert({
        name: title,
        description,
        is_finished: false,
        is_favorite: false,
        is_deleted: false,
        author_id: id,
        deadline: date + ' ' + time != ' ' ? date + ' ' + time : null,
        deadline_type: deadlineType != '' ? deadlineType : null,
      })
      .select('id')
    if (error) {
      setToasterText({ message: error.message, type: 'ERROR' })
      return console.log(error)
    }
    return data[0].id
  }

  const insertTodoTag = async (todo_id: number, tag_id: number) => {
    const { data, error } = await supabase.from('todo_tag').insert({
      todo_id,
      tag_id,
    })
    if (error) {
      setToasterText({ message: error.message, type: 'ERROR' })
      return console.log(error)
    }
  }

  const createTodo = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    if (title == '') {
      setIsTitleFilled(true)
      return
    }
    const todo_id = await insertTodo()
    for (const tag of tags) {
      insertTodoTag(todo_id, tag.id)
    }
    setTodos([
      ...todos,
      {
        title,
        description,
        is_finished: false,
        is_favorite: false,
        is_deleted: false,
        id: todo_id,
        tags,
        deadline: isDeadline ? date + ' ' + time : '',
        deadline_type: deadlineType,
      },
    ])
    for (const tag of tags) {
      if (!existantTags.includes(tag)) {
        setExistantTags([...existantTags, tag])
      }
    }
    setTitle('')
    setDescription('')
    setTab('')
  }

  const addTag = async () => {
    if (existantTags.find((e) => e.name === tagName) !== undefined) {
      setToasterText({ type: 'ERROR', message: 'Tag already exist' })
      return
    }
    const author_id = (await supabase.auth.getUser()).data.user?.id
    const { data, error } = await supabase
      .from('tag')
      .insert({
        name: tagName,
        color,
        author_id,
      })
      .select('id')
    if (error) {
      setToasterText({ message: error.message, type: 'ERROR' })
      return console.log(error)
    }
    setTags([...tags, { id: data[0].id, name: tagName, color }])
    setTagName('')
  }

  const removeTag = (tag: TagType) => {
    setTags(tags.filter((e) => e !== tag))
  }

  const addExistantTag = (tag: TagType) => {
    setTags([...tags, tag])
  }

  return (
    <div className="animate-wiggle pt-4">
      <div className="ml-auto mr-5 w-20" data-testid="close">
        <IconContext.Provider value={{ size: '32' }}>
          <IconButton
            icon={<AiOutlineCloseCircle />}
            iconColor="black"
            onClick={() => {
              setTab('listAll')
            }}
            text=""
          />
        </IconContext.Provider>
      </div>
      <form className="ml-2 p-2">
        <Input
          htmlFor="title"
          onchange={(e) => setTitle(e.target.value)}
          label="Your title"
          placeholder="title"
          type="email"
          isError={isTitleFilled}
        />
        <Deadline
          isDeadline={isDeadline}
          setDate={setDate}
          setDeadlineType={setDeadlineType}
          setIsDeadline={setIsDeadline}
          setTime={setTime}
        />
        <div className="flex flex-wrap">
          <div className="">
            <div className="flex">
              {existantTags.length > 0 &&
                existantTags.map((e, i) => (
                  <Tag
                    key={e.name as string}
                    tag={e}
                    onClick={() => {
                      addExistantTag(e)
                    }}
                  />
                ))}
            </div>
            <Input
              htmlFor="tag"
              onchange={(e) => setTagName(e.target.value)}
              value={tagName}
              label="Tag"
              placeholder="Tag"
              type="text"
            />
            <Button type="button" onClick={addTag} text="Add Tag" />
          </div>
          <div className="my-2 flex h-full w-full">
            <HexColorPicker
              color={color as string}
              className="w-6/12"
              onChange={setColor}
            />
            <div className="flex h-full w-6/12 flex-wrap justify-start">
              {tags.length > 0 &&
                tags.map((e, i) => (
                  <Tag
                    key={e.name as string}
                    tag={e}
                    onClick={() => null}
                    removeTag={() => {
                      removeTag(e)
                    }}
                  />
                ))}
            </div>
          </div>
        </div>
        <Textarea onChange={(e) => setDescription(e.target.value)} />
        <div className="mr-6 flex max-w-full justify-between">
          <div></div>
          <Button
            type="submit"
            onClick={(e) => createTodo(e)}
            text="Validate"
          />
        </div>
      </form>
    </div>
  )
}
