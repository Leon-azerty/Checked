import Title from './title';
import Card from '../components/card/card';
import { BodyProps } from './body.props';
import { useContext } from 'react';
import { TodosContext } from './todosContext';
import Create from './create';
import CardLoader from '@/components/loader/cardLoader';
import { TagsContext } from './tagsContext';

export default function Body(props: BodyProps) {
  const context = useContext(TodosContext);
  if (!context) {
    throw new Error('useTodosContext must be used within a TodosProvider');
  }
  const [todos, setTodos] = context;

  return <div className='flex-col bg-white w-full h-full min-h-screen max-w-screen'>
    <Title />
    {props.tab == "create" && <Create setTab={props.setTab} />}
    {props.isLoading && <CardLoader />}
    {todos.length > 0 && todos.map((e, i) => <Card todo={e} id={i} key={i} tab={props.tab} />)}
  </div>
}