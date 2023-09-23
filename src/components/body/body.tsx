import Title from '../title/title';
import Card from '../card/card';
import { BodyProps } from './body.props';
import { useContext } from 'react';
import { TodosContext } from '../../context/todosContext';
import Create from '../create/create';
import CardLoader from '@/components/loader/cardLoader';
import DeleteBar from '@/components/deleteBar/deleteBar';
import { RiLogoutBoxRLine } from 'react-icons/ri';
import IconButton from '@/components/iconButton/iconButton';
import { useRouter } from 'next/navigation'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { Todo } from '@/dto/todos.types';

export default function Body(props: BodyProps) {
  const router = useRouter()
  const context = useContext(TodosContext);
  const supabase = createClientComponentClient();

  if (!context) {
    throw new Error('useTodosContext must be used within a TodosProvider');
  }
  const [todos,] = context;
  let todosFiltered: Todo[] = [];
  // on parcours la liste des todos
  for (const todo of todos) {
    //on recupere l'array de tags de la todo
    for (const todoTag of todo.tags) {
      let isTodoInFilter = true;
      // on parcout l'array de filter
      for (const filterTag of props.filter) {
        // verifier que le filterTag est dans la todo
        if (todoTag.name !== filterTag) {
          // sinon on vire la todo de todosFiltered
          isTodoInFilter = false;
        }
      }
      if (isTodoInFilter) {
        todosFiltered.includes(todo) ? null : todosFiltered.push(todo);
      }
    }
  }

  const logOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.log(error);
    } else {
      console.log("redirect to login")
      router.push('/login');
    }
  }

  return <div className='flex-col bg-white w-full h-full min-h-screen max-w-screen'>
    <div className='flex'>
      <div className='w-full'>
        <Title />
      </div>
      <div className='w-20'>
        <IconButton icon={<RiLogoutBoxRLine />} text=''
          onClick={logOut} iconColor='black'
        />
      </div>
    </div>

    {props.tab == "create" && <Create setTab={props.setTab} />}
    {props.isLoading && <CardLoader />}
    {props.tab == "listDeleted" && <DeleteBar />}
    {todosFiltered.length > 0 && todosFiltered.map((e, i) => <Card todo={e} id={i} key={e.id} tab={props.tab} />)}
  </div>
}