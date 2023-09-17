'use client';
import Menu from '@/components/menu/menu';
import Body from '@/components/body/body';
import { useEffect, useState } from 'react';
import { Todo } from '../dto/todos.types';
import { TodosContext } from '../context/todosContext';
import { supabase } from '@/SupabaseClient';
import { getAllTodos } from '@/Supabase/todos';
import { TagTypes } from '../dto/tag.types';
import { TagsContext } from '../context/tagsContext';
import { TodosToDeleteContext } from '@/context/todoToDeleteContext';
import { useRouter } from 'next/navigation'

export default function Home() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [tab, setTab] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [tags, setTags] = useState<TagTypes[]>([]);
  const [todosToDelete, setTodosToDelete] = useState<Todo[]>([]);
  const router = useRouter()

  const fetchData = async () => {
    const { data, error } = await supabase.auth.getSession()
    if (error) {
      console.log("error", error)
    }
    console.log("data", data)
    // router.push('/signIn');

    setIsLoading(true);
    const allTodos: Todo[] = await getAllTodos();

    for (let i = 0; i < allTodos.length; i++) {
      const tagIds = await getTagIds(allTodos[i].id);
      let tmp: TagTypes[] = []
      for (const tagId of tagIds) {
        const tag: TagTypes[] = await getTag(tagId);
        tmp.push(...tag)
      }
      allTodos[i].tags = tmp;
    }
    console.log("allTodos", allTodos);
    setTodos(allTodos);
    setIsLoading(false);
  }

  useEffect(() => {
    fetchData();
  }, []);

  async function getTagIds(todosId: number) {
    const tagsIds: String[] = [];
    const { data, error } = await supabase.from('todo_tag').select(`tagId`).eq('todoId', todosId)
    if (error) {
      console.error("error", error);
      return []
    }
    for (const tag of data) {
      tagsIds.push(tag.tagId);
    }
    return tagsIds;
  }

  async function getTag(tagId: String) {
    const { data, error } = await supabase.from('tag').select(`*`).eq('id', tagId)
    if (error) {
      console.error("error", error);
      return []
    }
    return data;
  }

  return (
    <main className='w-screen h-full min-h-screen flex'>
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
