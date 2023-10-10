import Card from '@/components/card';
import { getTodosContext } from '@/context/todosContext';
import Create from '@/components/create';
import CardLoader from '@/components/cardLoader';
import DeleteBar from '@/components/deleteBar';
import { Todo } from '@/dto/todos.types';
import type { Tag as TagType } from '@/dto/tag.types';
import NoTodoToDisplay from './noTodoToDisplay';

export default function Body({ tab, setTab, isLoading, filter, showMenu, setShowMenu }: { tab: string, setTab: (tab: string) => void, isLoading: boolean, filter: string[], showMenu: boolean, setShowMenu: (showMenu: boolean) => void }) {
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
    {tab == "create" && <Create setTab={setTab} />}
    {filter.map((e, i) => <div key={i} className='flex w-full mt-4'>{e}</div>)}
    {isLoading && <CardLoader />}
    {tab == "listDeleted" && <DeleteBar />}
    {todos.length === 0 && !isLoading && <NoTodoToDisplay setTab={setTab} />}
    {todosFiltered.length > 0 && todosFiltered.map((e, i) => <Card todo={e} id={i} key={e.id} tab={tab} />)}
    {todosFiltered.length == 0 && <NoTodoToDisplay setTab={setTab} />}
  </main>
}