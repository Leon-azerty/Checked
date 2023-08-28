import Title from './title';
import Card from '../components/card';
import { BodyProps } from './body.props';
import { useContext } from 'react';
import { TodosContext } from './todosContext';

export default function Body(props: BodyProps) {
  const context = useContext(TodosContext);
  if (!context) {
    throw new Error('useTodosContext must be used within a TodosProvider');
  }
  const [todos, setTodos] = context;

  return <div className='flex-col bg-white w-full'>
    <Title />
    {todos.length > 0 && todos.map((e, i) => <Card todo={e} id={i} key={i} isFavoriteTodosVisible={props.isFavoriteTodosVisible} />)}
  </div>
}