'use client';
import Menu from '@/components/menu/menu';
import Body from '@/components/body/body';
import { useEffect, useState } from 'react';
import { Todo } from '../dto/todos.types';
import { TagsContext } from '../context/tagsContext';
import { TodosContext } from '../context/todosContext';
import { getAllTodos } from '@/Supabase/todos';
import { TagTypes } from '../dto/tag.types';
import { TodosToDeleteContext } from '@/context/todoToDeleteContext';
import { useRouter } from 'next/navigation'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'

export default function Home() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [tab, setTab] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [tags, setTags] = useState<TagTypes[]>([]);
  const [todosToDelete, setTodosToDelete] = useState<Todo[]>([]);
  const router = useRouter()
  const supabase = createClientComponentClient();

  const fillTodoWithTag = async (allTodos: Todo[]) => {
    for (let i = 0; i < allTodos.length; i++) {
      const tag_ids = await getTag_ids(allTodos[i].id);
      let tagsForTodo: TagTypes[] = []
      for (const tag_id of tag_ids) {
        const tag: TagTypes[] = await getTag(tag_id);
        tagsForTodo.push(...tag)
      }
      allTodos[i].tags = tagsForTodo;
    }
    setTodos(allTodos);
  }

  const getMenuTags = async (allTodos: Todo[]) => {
    let tagsForMenu: TagTypes[] = [];
    for (let i = 0; i < allTodos.length; i++) {
      const tag_ids = await getTag_ids(allTodos[i].id);
      for (const tag_id of tag_ids) {
        const tag: TagTypes[] = await getTag(tag_id);
        for (const t of tag) {
          if (!tagsForMenu.includes(t)) {
            tagsForMenu.push(t);
          }
        }
      }
    }
    setTags(tagsForMenu);
  }

  const userIsLogged = async () => {
    const { data, error } = await supabase.auth.getSession()
    if (data.session === null) {
      router.push('/login');
    }
  }

  useEffect(() => {
    userIsLogged();
  },);

  const fetchData = async () => {
    setIsLoading(true);
    const allTodos: Todo[] = await getAllTodos();
    await getMenuTags(allTodos);
    await fillTodoWithTag(allTodos);
    setIsLoading(false);
  }

  useEffect(() => {
    fetchData();
  }, []);

  async function getTag_ids(todosId: number) {
    const tagsIds: String[] = [];
    const { data, error } = await supabase.from('todo_tag').select(`tag_id`).eq('todo_id', todosId)
    if (error) {
      console.error("error", error);
      return []
    }
    for (const tag of data) {
      tagsIds.push(tag.tag_id);
    }
    return tagsIds;
  }

  async function getTag(tag_id: String) {
    const { data, error } = await supabase.from('tag').select(`*`).eq('id', tag_id)
    if (error) {
      console.error("error", error);
      return []
    }
    return data;
  }

  return (
    <main className='w-screen h-full min-h-screen flex text-black'>
      <TodosContext.Provider value={[todos, setTodos]}>
        <TagsContext.Provider value={[tags, setTags]}>
          <TodosToDeleteContext.Provider value={[todosToDelete, setTodosToDelete]}>
            <Menu tab={tab} setTab={setTab} />
            <Body tab={tab} setTab={setTab} isLoading={isLoading} />
          </TodosToDeleteContext.Provider>
        </TagsContext.Provider>
      </TodosContext.Provider>
    </main>
  )
}
