import { CardProps } from "@/components/card/card.props";
import { useContext, useState } from "react";
import "@/components/card/card.css"
import { LeftContent } from "@/components/card/leftContent";
import { RightContent } from "@/components/card/rightContent";
import { Star } from "@/components/card/star";
import { TodosToDeleteContext } from "@/context/todoToDeleteContext";
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { ModalTextContext } from '@/context/modalTextContext';

export default function Card(props: CardProps) {
  const [is_finished, setIs_finished] = useState(props.todo.is_finished);
  const [is_favorite, setIs_favorite] = useState(props.todo.is_favorite);
  const [is_deleted, setIs_deleted] = useState(props.todo.is_deleted);
  const supabase = createClientComponentClient();
  const modalContext = useContext(ModalTextContext);

  const context = useContext(TodosToDeleteContext);
  if (!context) {
    console.error("context is null");
    return <></>
  }
  const [todosToDeleteContext, setTodosToDeleteContext] = context;
  if (!modalContext) {
    throw new Error('use modalContext must be used within a modalProvider');
  }
  const [, setModalText] = modalContext;

  const handleTodoState = async () => {
    const { data, error } = await supabase.from('todo').update({
      is_finished: !is_finished
    }).eq('id', props.todo.id);
    if (error) {
      setModalText(error.message);
      return console.log(error);
    }
    setIs_finished(!is_finished);
  }

  const addTodoInTrash = async () => {
    setIs_deleted(true);
    const { data, error } = await supabase.from('todo')
      .update({ is_deleted: true }).eq('id', props.todo.id);
    if (error) {
      setModalText(error.message);
      return console.log(error);
    }
    // la ligne update quand on delete la todo
    // il faudrait mettre d'abord une anim pour montrer qu'on delete
    // puis seulement quand l'anim est finit on delete
    // setTodos(todos.filter((e, i) => i != props.id));
  }

  const addTodoInFavorite = async () => {
    const { data, error } = await supabase.from('todo').update({
      is_favorite: !is_favorite
    }).eq('id', props.todo.id);
    if (error) {
      setModalText(error.message);
      return console.log("error ", error);
    }
    setIs_favorite(!is_favorite);
  }

  const addTodoToDelete = () => {
    if (!todosToDeleteContext.includes(props.todo))
      setTodosToDeleteContext([...todosToDeleteContext, props.todo]);
  }

  const restoreTodo = async () => {
    const { data, error } = await supabase.from('todo').update({
      is_deleted: false
    }).eq('id', props.todo.id);
    if (error) {
      setModalText(error.message);
      return console.log(error);
    }
    setIs_deleted(false);
  }

  if (props.tab == "listFavorite" && !is_favorite) return (<></>);
  if (props.tab == "listAll" && is_deleted) return (<></>);
  if (props.tab == "listChecked" && !is_finished) return (<></>);
  if (props.tab == "listUnchecked" && is_finished) return (<></>);
  if (props.tab == "listDeleted" && !is_deleted) return (<></>);
  return <article id={`card-${props.id}`} onClick={addTodoToDelete} className={` 
  rounded-3xl p-6 m-6 border-gray-200 border-solid border-4 flex flex-col hover:pl-4 
  transition-all ease-in duration-500 animate-wiggle hover:scale-y-110
  ${is_finished ? "background-gradient-left-to-right border-green" : ""} 
  ${is_favorite ? `border-star-yellow` : ``} 
  ${is_deleted ? `border-red` : ``}
`}>
    <div className="flex flex-row-reverse">
      <RightContent handleDeleteTodo={addTodoInTrash}
        restoreTodo={restoreTodo}
        handleTodoState={handleTodoState} id={props.id}
        is_deleted={is_deleted} is_finished={is_finished} />
      <Star handleTodoFavorite={addTodoInFavorite} id={props.id} is_favorite={is_favorite} />
      <LeftContent
        todo={props.todo}
      />
    </div>
  </article>

}