import Button from "../button/button";
import { supabase } from "@/SupabaseClient";
import { useContext } from "react";
import { TodosToDeleteContext } from "@/context/todoToDeleteContext";
import TodosToDelete from "../todosToDelete/todosToDelete";
import { TodosContext } from "@/context/todosContext";
import { Todo } from "@/dto/todos.types";

export default function DeleteBar() {
  const todosToDeleteContext = useContext(TodosToDeleteContext);
  if (!todosToDeleteContext) {
    console.error("todosToDeleteContext is null");
    return <></>
  }
  const [todosToDelete, setTodosToDelete] = todosToDeleteContext;

  const todosContext = useContext(TodosContext);
  if (!todosContext) {
    console.error("todosToDeleteContext is null");
    return <></>
  }
  const [todos, setTodos] = todosContext;

  const deleteTodoTags = async (todo: Todo) => {
    let { data, error } = await supabase.from('todo_tag')
      .delete().eq('todo_id', todo.id);
    if (error) return console.log(error);
  }

  const deleteTodo = async (todo_id: number) => {
    const { data, error } = await supabase.from('todo').delete()
      .eq('id', todo_id);
    if (error) return console.log(error);
  }

  const removeTodo = async () => {
    let newTodos = todos;
    for (const todo of todosToDelete) {
      await deleteTodoTags(todo);
      await deleteTodo(todo.id).then(() => {
        newTodos = newTodos.filter(e => e.id !== todo.id);
        setTodos(newTodos);
      })
    }
    setTodosToDelete([]);
  }

  return <div className="flex justify-between items-center">
    <div className="flex">
      {todosToDelete.map((e, i) => <TodosToDelete key={i} name={e.title} />)}
    </div>
    <div></div>
    <Button text='Delete' onClick={removeTodo} />
  </div>
}