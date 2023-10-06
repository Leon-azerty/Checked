'use client';
import Menu from '@/components/menu/menu';
import Body from '@/components/body/body';
import { useContext, useEffect, useState } from 'react';
import { Todo } from '@/dto/todos.types';
import { TagsContext } from '@/context/tagsContext';
import { TodosContext } from '@/context/todosContext';
import { getAllTodos } from '@/Supabase/todos';
import type { Tag as TagType } from '@/dto/tag.types';
import { TodosToDeleteContext } from '@/context/todoToDeleteContext';
import { useRouter } from 'next/navigation'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { ModalTextContext } from '@/context/modalTextContext';

export default function Home() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [tab, setTab] = useState<string>('listAll');
  const [filter, setFilter] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [tags, setTags] = useState<TagType[]>([]);
  const [todosToDelete, setTodosToDelete] = useState<Todo[]>([]);
  const router = useRouter()
  const supabase = createClientComponentClient();
  const [showMenu, setShowMenu] = useState<boolean>(true);
  const modalContext = useContext(ModalTextContext);
  if (!modalContext) {
    throw new Error('use modalContext must be used within a modalProvider');
  }
  const [, setModalText] = modalContext;

  const userIsLogged = async () => {
    const { data, error } = await supabase.auth.getSession()
    if (data.session === null) {
      router.push('/login');
    }
  }

  useEffect(() => {
    userIsLogged();
  }, []);

  const fillTodoWithTag = async (tag_ids: string[], Tags: TagType[]) => {
    let tagsForTodo: TagType[] = []
    for (const tag_id of tag_ids) {
      const tag = Tags.find(tag => tag.id.toString() === tag_id);
      if (tag === undefined) {
        const tag = await getTag(tag_id);
        tagsForTodo.push(tag);
        continue;
      } else {
        tagsForTodo.push(tag)
      }
    }
    return tagsForTodo;
  }

  const fetchTodos = async (Tags: TagType[]) => {
    setIsLoading(true);
    const allTodos: Todo[] = await getAllTodos();
    for (let i = 0; i < allTodos.length; i++) {
      const tag_ids = await getTag_ids(allTodos[i].id);
      allTodos[i].tags = await fillTodoWithTag(tag_ids, Tags);
    }
    setTodos(allTodos);
    setIsLoading(false);
  }

  const fetchTags = async () => {
    const { data, error } = await supabase.from('tag').select(`*`)
    if (error) {
      setModalText(error.message);
      console.error("error", error);
      return []
    }
    setTags(data);
    return data;
  }

  const fetchData = async () => {
    const Tags = await fetchTags();
    await fetchTodos(Tags);
  }

  useEffect(() => {
    fetchData();
  }, []);

  async function getTag_ids(todosId: number) {
    const tagsIds: string[] = [];
    const { data, error } = await supabase.from('todo_tag').select(`tag_id`).eq('todo_id', todosId)
    if (error) {
      setModalText(error.message);
      console.error("error", error);
      return []
    }
    for (const tag of data) {
      tagsIds.push(tag.tag_id);
    }
    return tagsIds;
  }

  async function getTag(tag_id: string) {
    const { data, error } = await supabase.from('tag').select(`*`).eq('id', tag_id)
    if (error) {
      setModalText(error.message);
      console.error("error", error);
      return {}
    }
    return data[0];
  }

  return (
    <div className='w-screen h-full min-h-screen flex text-black'>
      <TodosContext.Provider value={[todos, setTodos]}>
        <TagsContext.Provider value={[tags, setTags]}>
          <TodosToDeleteContext.Provider value={[todosToDelete, setTodosToDelete]}>
            {showMenu && <Menu tab={tab} setTab={setTab} filter={filter} setFilter={setFilter} />}
            <Body tab={tab} setTab={setTab} isLoading={isLoading} filter={filter} setShowMenu={setShowMenu} showMenu={showMenu} />
          </TodosToDeleteContext.Provider>
        </TagsContext.Provider>
      </TodosContext.Provider>
    </div>
  )
}
