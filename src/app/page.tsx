'use client'
import { fetchTags, fetchTodos } from '@/Supabase/fetchData'
import Create from '@/app/create'
import Header from '@/components/header'
import Menu from '@/components/navBar'
import { TagsContext } from '@/context/tagsContext'
import { useToasterContext } from '@/context/toasterTextContext'
import { TodosToDeleteContext } from '@/context/todoToDeleteContext'
import { TodosContext } from '@/context/todosContext'
import type { Tag as TagType } from '@/dto/tag.types'
import { Todo } from '@/dto/todos.types'
import { useEffect, useState } from 'react'
import TodoList from './todoList'

export default function Home() {
  const [todos, setTodos] = useState<Todo[]>([])
  const [tab, setTab] = useState<string>('listAll')
  const [filter, setFilter] = useState<string[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [tags, setTags] = useState<TagType[]>([])
  const [todosToDelete, setTodosToDelete] = useState<Todo[]>([])
  const [showNavBar, setShowNavBar] = useState<boolean>(true)
  const [, setToaster] = useToasterContext()

  useEffect(() => {
    const fetchData = async () => {
      const { data, error } = await fetchTags()
      if (error) {
        setToaster({ message: error.message, type: 'ERROR' })
        console.error('error', error)
        return []
      }
      setTags(data!)
      try {
        const allTodos = await fetchTodos(data!)
        setTodos(allTodos)
      } catch (error: string | any) {
        if (typeof error === 'string') {
          setToaster({ message: error, type: 'ERROR' })
        }
        console.log('catch error : ' + error)
      }
      setIsLoading(false)
    }

    fetchData()
  }, [])

  return (
    <div className="flex h-full min-h-screen w-screen bg-white text-black">
      <TodosContext.Provider value={[todos, setTodos]}>
        <TagsContext.Provider value={[tags, setTags]}>
          <TodosToDeleteContext.Provider
            value={[todosToDelete, setTodosToDelete]}
          >
            {showNavBar && (
              <Menu
                tab={tab}
                setTab={setTab}
                filter={filter}
                setFilter={setFilter}
              />
            )}
            <div className="max-w-screen h-full min-h-screen w-full flex-col bg-white">
              <Header setShowNavBar={setShowNavBar} showNavBar={showNavBar} />
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
