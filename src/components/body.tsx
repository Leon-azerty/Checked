import Title from '@/components/title';
import Card from '@/components/card';
import { useContext } from 'react';
import { TodosContext } from '@/context/todosContext';
import Create from '@/components/create';
import CardLoader from '@/components/cardLoader';
import DeleteBar from '@/components/deleteBar';
import { RiLogoutBoxRLine } from 'react-icons/ri';
import { AiOutlineMenuFold, AiOutlineMenuUnfold } from 'react-icons/ai';
import IconButton from '@/components/iconButton';
import { useRouter } from 'next/navigation'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { Todo } from '@/dto/todos.types';
import type { Tag as TagType } from '@/dto/tag.types';
import { ModalTextContext } from '@/context/modalTextContext';
import NoTodoToDisplay from './noTodoToDisplay';

export default function Body({ tab, setTab, isLoading, filter, showMenu, setShowMenu }: { tab: string, setTab: (tab: string) => void, isLoading: boolean, filter: string[], showMenu: boolean, setShowMenu: (showMenu: boolean) => void }) {
  const router = useRouter()
  const context = useContext(TodosContext);
  const supabase = createClientComponentClient();
  const modalContext = useContext(ModalTextContext);

  if (!context) {
    throw new Error('useTodosContext must be used within a TodosProvider');
  }
  const [todos,] = context;
  if (!modalContext) {
    throw new Error('use modalContext must be used within a modalProvider');
  }
  const [, setModalText] = modalContext;
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

  const logOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      setModalText("ERROR : " + error.message);
      console.log(error);
    } else {
      router.push('/login');
    }
  }

  return <div className='flex-col bg-white w-full h-full min-h-screen max-w-screen'>
    <div className='flex justify-between w-96 md:w-full'>
      <div className='ml-4 w-20'>
        {showMenu ? <IconButton icon={<AiOutlineMenuFold />} onClick={() => setShowMenu(false)} text='' iconColor='black' /> :
          <IconButton icon={<AiOutlineMenuUnfold />} onClick={() => setShowMenu(true)} text='' iconColor='black' />}
      </div>
      <Title />
      <div className='mr-4 w-20'>
        <IconButton icon={<RiLogoutBoxRLine />} text=''
          onClick={logOut} iconColor='black'
        />
      </div>
    </div>
    <main>
      {tab == "create" && <Create setTab={setTab} />}
      {filter.map((e, i) => <div key={i} className='flex w-full mt-4'>{e}</div>)}
      {isLoading && <CardLoader />}
      {tab == "listDeleted" && <DeleteBar />}
      {todos.length === 0 && !isLoading && <NoTodoToDisplay setTab={setTab} />}
      {todosFiltered.length > 0 && todosFiltered.map((e, i) => <Card todo={e} id={i} key={e.id} tab={tab} />)}
      {todosFiltered.length == 0 && <NoTodoToDisplay setTab={setTab} />}
    </main>
  </div>
}