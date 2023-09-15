import Button from "../button/button";
import { supabase } from "@/SupabaseClient";
import { DeleteBarProps } from "./deleteBar.props";
import { useContext, useState } from "react";
import { TodosToDeleteContext } from "@/context/todoToDeleteContext";
import TodosToDelete from "../todosToDelete/todosToDelete";
import { TodosContext } from "@/context/todosContext";

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

  const deleteTodoTag = async () => {
    console.log("deleteTodoTag todos", todosToDelete);
    for (const todo of todosToDelete) {
      let { data, error } = await supabase.from('todo_tag')
        .delete().eq('todoId', todo.id);
      if (error) return console.log(error);
      console.log(data);
    }
  }

  const deleteTodo = async () => {
    await deleteTodoTag();
    console.log("deleteTodo");
    for (const todo of todosToDelete) {
      console.log(todo.id);
      const { data, error } = await supabase.from('todo').delete()
        .eq('id', todo.id);
      if (error) return console.log(error);
      console.log(data);
      const tmp = todos.filter(e => e.id !== todo.id);
      setTodos(tmp);
    }
    setTodosToDelete([]);
  }

  return <div className="flex justify-between items-center">
    <div className="flex">
      {todosToDelete.map((e, i) => <TodosToDelete key={i} name={e.title} />)}
    </div>
    <div></div>
    <Button text='Delete' onClick={deleteTodo} />
  </div>
}