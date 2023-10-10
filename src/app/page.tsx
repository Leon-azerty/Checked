'use client';
import Menu from '@/components/menu';
import Body from '@/components/body';
import { useEffect, useState } from 'react';
import { Todo } from '@/dto/todos.types';
import { TagsContext } from '@/context/tagsContext';
import { TodosContext } from '@/context/todosContext';
import { fetchTags, fetchTodos } from '@/Supabase/fetchData';
import type { Tag as TagType } from '@/dto/tag.types';
import { TodosToDeleteContext } from '@/context/todoToDeleteContext';
import { useRouter } from 'next/navigation'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { getModalContext } from '@/context/modalTextContext';
import Header from '@/components/header';
import Create from '@/components/create';

export default function Home() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [tab, setTab] = useState<string>('listAll');
  const [filter, setFilter] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [tags, setTags] = useState<TagType[]>([]);
  const [todosToDelete, setTodosToDelete] = useState<Todo[]>([]);
  const router = useRouter()
  const supabase = createClientComponentClient();
  const [showMenu, setShowMenu] = useState<boolean>(true);
  const [, setModalText] = getModalContext();

  const fetchData = async () => {
    const { data, error } = await fetchTags();
    if (error) {
      setModalText("ERROR : " + error.message);
      console.error("error", error);
      return []
    }
    setTags(data!);
    try {
      const allTodos = await fetchTodos(data!);
      setTodos(allTodos);
    } catch (error: string | any) {
      if (typeof (error) === 'string') {
        setModalText(error);
      }
      console.log("catch error : " + error);
    }
    setIsLoading(false);
  }

  const userIsLogged = async () => {
    const { data, error } = await supabase.auth.getSession()
    if (data.session === null) {
      router.push('/login');
    }
  }

  useEffect(() => {
    userIsLogged();
    fetchData();
  }, []);

  return (
    <div className='w-screen h-full min-h-screen flex text-black'>
      <TodosContext.Provider value={[todos, setTodos]}>
        <TagsContext.Provider value={[tags, setTags]}>
          <TodosToDeleteContext.Provider value={[todosToDelete, setTodosToDelete]}>
            {showMenu && <Menu tab={tab} setTab={setTab} filter={filter} setFilter={setFilter} />}
            <div className='flex-col bg-white w-full h-full min-h-screen max-w-screen'>
              <Header setModalText={setModalText} setShowMenu={setShowMenu} showMenu={showMenu} />
              {tab == "create" && <Create setTab={setTab} />}
              <Body tab={tab} setTab={setTab} isLoading={isLoading} filter={filter} />
            </div>
          </TodosToDeleteContext.Provider>
        </TagsContext.Provider>
      </TodosContext.Provider>
    </div>
  )
}
