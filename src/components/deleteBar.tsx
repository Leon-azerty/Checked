import Button from "@/components/button";
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { getTodosToDeleteContext } from "@/context/todoToDeleteContext";
import { getTodosContext } from "@/context/todosContext";
import { Todo } from "@/dto/todos.types";
import { getModalContext } from '@/context/modalTextContext';

export default function DeleteBar() {
  const supabase = createClientComponentClient();
  const [todosToDelete, setTodosToDelete] = getTodosToDeleteContext();
  const [todos, setTodos] = getTodosContext();
  const [, setModalText] = getModalContext();

  const deleteTodoTags = async (todo: Todo) => {
    let { data, error } = await supabase.from('todo_tag')
      .delete().eq('todo_id', todo.id);
    if (error) {
      setModalText("ERROR : " + error.message);
      return console.log(error);
    }
  }

  const deleteTodo = async (todo_id: number) => {
    const { data, error } = await supabase.from('todo').delete()
      .eq('id', todo_id);
    if (error) {
      setModalText("ERROR : " + error.message);
      return console.log(error);
    }
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

  return <div className="flex flex-row-reverse items-center">
    {todosToDelete.length > 0 && <Button text='Delete' onClick={removeTodo} type="button" />}
  </div>
}