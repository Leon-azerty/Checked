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
import { supabase } from '@/SupabaseClient';
import { useRouter } from 'next/navigation'

export default function Body(props: BodyProps) {
  const router = useRouter()
  const context = useContext(TodosContext);
  if (!context) {
    throw new Error('useTodosContext must be used within a TodosProvider');
  }
  const [todos,] = context;

  const logOut = async () => {
    console.log("log out WIP")
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.log(error);
    } else {
      router.refresh();
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
    {todos.length > 0 && todos.map((e, i) => <Card todo={e} id={i} key={e.id} tab={props.tab} />)}
  </div>
}