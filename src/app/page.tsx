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
  const [tab, setTab] = useState<string>('listAll');
  const [filter, setFilter] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [tags, setTags] = useState<TagTypes[]>([]);
  const [todosToDelete, setTodosToDelete] = useState<Todo[]>([]);
  const router = useRouter()
  const supabase = createClientComponentClient();

  const userIsLogged = async () => {
    const { data, error } = await supabase.auth.getSession()
    console.log("data", data, "error", error)
    if (data.session === null) {
      router.push('/login');
    }
  }

  useEffect(() => {
    userIsLogged();
  },);

  const fillTodoWithTag = async (tag_ids: string[]) => {
    let tagsForTodo: TagTypes[] = []
    for (const tag_id of tag_ids) {
      const tag = await getTag(tag_id);
      tagsForTodo.push(tag)
    }
    return tagsForTodo;
  }

  const getMenuTags = async (tag_ids: string[], res: TagTypes[], nameTodo: string[]) => {
    for (const tag_id of tag_ids) {
      const tag = await getTag(tag_id);
      if (!nameTodo.includes(tag.name)) {
        res.push(tag);
        nameTodo.push(tag.name);
      }
    }
    return res;
  }

  const fetchData = async () => {
    setIsLoading(true);
    const allTodos: Todo[] = await getAllTodos();
    let nameTodo: string[] = [];
    let res: TagTypes[] = [];
    for (let i = 0; i < allTodos.length; i++) {
      const tag_ids = await getTag_ids(allTodos[i].id);
      allTodos[i].tags = await fillTodoWithTag(tag_ids);
      res = await getMenuTags(tag_ids, res, nameTodo);
    }
    setTags(res);
    setTodos(allTodos);
    setIsLoading(false);
  }

  useEffect(() => {
    fetchData();
  }, []);

  async function getTag_ids(todosId: number) {
    const tagsIds: string[] = [];
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

  async function getTag(tag_id: string) {
    const { data, error } = await supabase.from('tag').select(`*`).eq('id', tag_id)
    if (error) {
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
            <Menu tab={tab} setTab={setTab} filter={filter} setFilter={setFilter} />
            <Body tab={tab} setTab={setTab} isLoading={isLoading} filter={filter} />
          </TodosToDeleteContext.Provider>
        </TagsContext.Provider>
      </TodosContext.Provider>
    </div>
  )
}
