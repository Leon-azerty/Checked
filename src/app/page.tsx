'use client'
import { fetchTags, fetchTodos } from '@/Supabase/fetchData'
import Create from '@/components/create'
import Header from '@/components/header'
import Menu from '@/components/menu'
import TodoList from '@/components/todoList'
import { TagsContext } from '@/context/tagsContext'
import { useToasterContext } from '@/context/toasterTextContext'
import { TodosToDeleteContext } from '@/context/todoToDeleteContext'
import { TodosContext } from '@/context/todosContext'
import type { Tag as TagType } from '@/dto/tag.types'
import { Todo } from '@/dto/todos.types'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

export default function Home() {
  const [todos, setTodos] = useState<Todo[]>([])
  const [tab, setTab] = useState<string>('listAll')
  const [filter, setFilter] = useState<string[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [tags, setTags] = useState<TagType[]>([])
  const [todosToDelete, setTodosToDelete] = useState<Todo[]>([])
  const router = useRouter()
  const supabase = createClientComponentClient()
  const [showMenu, setShowMenu] = useState<boolean>(true)
  const [, setToasterText] = useToasterContext()

  useEffect(() => {
    const fetchData = async () => {
      const { data, error } = await fetchTags()
      if (error) {
        setToasterText({ message: error.message, type: 'ERROR' })
        console.error('error', error)
        return []
      }
      setTags(data!)
      try {
        const allTodos = await fetchTodos(data!)
        setTodos(allTodos)
      } catch (error: string | any) {
        if (typeof error === 'string') {
          setToasterText({ message: error, type: 'ERROR' })
        }
        console.log('catch error : ' + error)
      }
      setIsLoading(false)
    }

    fetchData()
  }, [])

  return (
    <div className="w-screen h-full min-h-screen flex text-black bg-white">
      <TodosContext.Provider value={[todos, setTodos]}>
        <TagsContext.Provider value={[tags, setTags]}>
          <TodosToDeleteContext.Provider
            value={[todosToDelete, setTodosToDelete]}
          >
            {showMenu && (
              <Menu
                tab={tab}
                setTab={setTab}
                filter={filter}
                setFilter={setFilter}
              />
            )}
            <div className="flex-col bg-white w-full h-full min-h-screen max-w-screen">
              <Header setShowMenu={setShowMenu} showMenu={showMenu} />
              {tab == 'create' && <Create setTab={setTab} />}
              <TodoList
                tab={tab}
                setTab={setTab}
                isLoading={isLoading}
                filter={filter}
              />
            </div>
          </TodosToDeleteContext.Provider>
        </TagsContext.Provider>
      </TodosContext.Provider>
    </div>
  )
}
