import Title from '@/components/title/title';
import Card from '@/components/card/card';
import { BodyProps } from '@/components/body/body.props';
import { useContext } from 'react';
import { TodosContext } from '@/context/todosContext';
import Create from '@/components/create/create';
import CardLoader from '@/components/loader/cardLoader';
import DeleteBar from '@/components/deleteBar/deleteBar';
import { RiLogoutBoxRLine } from 'react-icons/ri';
import { AiOutlineMenuFold, AiOutlineMenuUnfold } from 'react-icons/ai';
import IconButton from '@/components/iconButton/iconButton';
import { useRouter } from 'next/navigation'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { Todo } from '@/dto/todos.types';
import { TagTypes } from '@/dto/tag.types';
import { ModalTextContext } from '@/context/modalTextContext';

export default function Body(props: BodyProps) {
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

  function getNameTags(tags: TagTypes) {
    const { name } = tags;
    return name;
  }

  for (const filterTag of props.filter) {
    for (const todo of todos) {
      const tagsName = todo.tags.map(getNameTags);
      if (!tagsName.includes(filterTag)) {
        console.log(filterTag, "is in ", tagsName)
        todosFiltered = todosFiltered.filter(e => e.id !== todo.id);
      }
    }
  }

  const logOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      setModalText(error.message);
      console.log(error);
    } else {
      console.log("redirect to login")
      router.push('/login');
    }
  }

  return <div className='flex-col bg-white w-full h-full min-h-screen max-w-screen'>
    <div className='flex justify-between'>
      <div className='w-20'>
        {props.showMenu ? <IconButton icon={<AiOutlineMenuFold />} onClick={() => props.setShowMenu(false)} text='' iconColor='black' /> :
          <IconButton icon={<AiOutlineMenuUnfold />} onClick={() => props.setShowMenu(true)} text='' iconColor='black' />}
      </div>
      <Title />
      <div className='w-20'>
        <IconButton icon={<RiLogoutBoxRLine />} text=''
          onClick={logOut} iconColor='black'
        />
      </div>
    </div>
    <main>
      {props.tab == "create" && <Create setTab={props.setTab} />}
      {props.isLoading && <CardLoader />}
      {props.tab == "listDeleted" && <DeleteBar />}
      {todosFiltered.length > 0 && todosFiltered.map((e, i) => <Card todo={e} id={i} key={e.id} tab={props.tab} />)}
    </main>
  </div>
}