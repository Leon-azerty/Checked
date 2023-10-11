import Card from '@/components/card';
import { getTodosContext } from '@/context/todosContext';
import CardLoader from '@/components/cardLoader';
import DeleteBar from '@/components/deleteBar';
import { Todo } from '@/dto/todos.types';
import type { Tag as TagType } from '@/dto/tag.types';
import NoTodoToDisplay from './noTodoToDisplay';

export default function Body({ tab, setTab, isLoading, filter }:
  { tab: string, setTab: (tab: string) => void, isLoading: boolean, filter: string[] }) {
  const [todos,] = getTodosContext();
  let todosFiltered: Todo[] = todos;

  function getNameTags(tags: TagType) {
    const { name } = tags;
    return name;
  }

  for (const filterTag of filter) {
    for (const todo of todos) {
      const tagsName = todo.tags.map(getNameTags);
      if (!tagsName.includes(filterTag)) {
        todosFiltered = todosFiltered.filter(e => e.id !== todo.id);
      }
    }
  }

  return <main>
    {filter.map((e, i) => <div key={i} className='flex w-full mt-4'>{e}</div>)}
    {isLoading && <CardLoader />}
    {tab == "listDeleted" && <DeleteBar />}
    {((todos.length === 0 || todosFiltered.length == 0) && !isLoading) && <NoTodoToDisplay setTab={setTab} />}
    {todosFiltered.length > 0 && todosFiltered.map((e, i) => <Card todo={e} id={i} key={e.id} tab={tab} />)}
  </main>
}