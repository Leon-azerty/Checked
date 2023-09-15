import { supabase } from "@/SupabaseClient";
import { Todo } from '../app/todos.types';

export const getAllTodos = async () => {
  const { data, error } = await supabase.from('todo').select(`*`);
  if (error) {
    console.log(error)
    return [];
  }
  let tmp: Todo[] = [];
  for (let i = 0; i < data!.length; i++) {
    let todo: Todo = {
      id: data[i].id,
      title: data![i].name,
      description: data![i].description,
      isDeleted: data![i].isDeleted,
      isFinished: data![i].isFinished,
      isFavorite: data![i].isFavorite,
      tags: []
    };
    tmp.push(todo);
  }
  return tmp;
}