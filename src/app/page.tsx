'use client';
import Menu from '@/app/menu';
import Body from './body';
import { useEffect, useState } from 'react';
import { Todo } from './todos.types';
import { TodosContext } from './todosContext';
import { supabase } from '@/SupabaseClient';
import { getAllTodos } from '@/Supabase/todos';
import { TagTypes } from './tag.types';
import { TagsContext } from './tagsContext';

export default function Home() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [tab, setTab] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [tags, setTags] = useState<TagTypes[]>([]);

  const fetchData = async () => {
    setIsLoading(true);
    // A SUP 
    await supabase.auth.signInWithPassword({ email: 'monadresse@gmail.com', password: 'monpass' });
    //
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
          <Menu tab={tab} setTab={setTab} />
          <Body tab={tab} setTab={setTab} isLoading={isLoading} />
        </TagsContext.Provider>
      </TodosContext.Provider>
    </main>
  )
}
