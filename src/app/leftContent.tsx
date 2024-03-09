import { AiFillPlusCircle } from 'react-icons/ai'
import { IconContext } from 'react-icons'
import Tag from '@/components/tag'
import { useRef, useState } from 'react'
import { useHover } from 'usehooks-ts'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import type { Tag as TagType } from '@/dto/tag.types'
import Button from '@/components/button'
import { IconSizeInPx } from '@/const/iconSize'
import { Todo } from '@/dto/todos.types'
import { gray_700 } from '@/const/colors'

export function LeftContent({ todo }: { todo: Todo }) {
  const hoverRef = useRef(null)
  const isHover = useHover(hoverRef)
  const [tags, setTags] = useState(todo.tags)
  const [isUpdating, setIsUpdating] = useState(false)
  const isDebug = true
  const supabase = createClientComponentClient()

  const removeTag = async (tag: TagType) => {
    todo.tags = tags.filter((e) => e.name !== tag.name)
    setTags(todo.tags)
    const { data, error } = await supabase
      .from('todo_tag')
      .delete()
      .eq('tag_id', tag.id)
      .eq('todo_id', todo.id)
    if (error) return console.log(error)
  }

  const UpdateTodo = async () => {
    const { data, error } = await supabase
      .from('todo')
      .update({
        description: todo.description,
        name: todo.title,
      })
      .eq('id', todo.id)
    if (error) return console.log(error)
    console.log('data', data)
    setIsUpdating(false)
  }

  return (
    <div className="w-full hover:pl-4 duration-300">
      <div ref={hoverRef} className="flex items-center w-full">
        <div className="flex w-full justify-between flex-col md:flex-row">
          <div className="flex items-center">
            <p className="text-3xl font-bold flex flex-wrap">{todo.title}</p>
            {!isDebug && (
              <IconContext.Provider
                value={{ size: IconSizeInPx, color: gray_700 }}
              >
                <div
                  onClick={() => {
                    console.log("ajout d'un tag WIP")
                  }}
                >
                  {isHover && <AiFillPlusCircle />}
                </div>
              </IconContext.Provider>
            )}
          </div>
          <div className="flex flex-col md:flex-row">
            {todo.deadline_type && (
              <p className="flex bg-gray-300 rounded-xl items-center px-3 m-1 w-fit">
                {todo.deadline_type}
              </p>
            )}
            {todo.deadline && (
              <p className="flex bg-gray-300 rounded-xl items-center px-3 m-1 w-fit">
                {todo.deadline}
              </p>
            )}
          </div>
        </div>
      </div>
      <div className="flex flex-wrap">
        {tags.map((e, i) => (
          <Tag key={i} tag={e} onClick={() => {}} removeTag={removeTag} />
        ))}
      </div>

      {isUpdating ? (
        <textarea
          className="w-full"
          autoFocus
          defaultValue={todo.description}
          onChange={(e) => {
            todo.description = e.target.value
          }}
        ></textarea>
      ) : (
        <p
          className="w-full"
          onClick={() => {
            setIsUpdating(true)
          }}
        >
          {todo.description}
        </p>
      )}

      <div className="flex flex-col-reverse md:flex-row-reverse">
        {isUpdating && (
          <Button
            type="button"
            text="update"
            onClick={() => {
              UpdateTodo()
            }}
          />
        )}
        {isUpdating && (
          <Button
            type="button"
            text="cancel"
            onClick={() => {
              setIsUpdating(false)
            }}
          />
        )}
      </div>
    </div>
  )
}
