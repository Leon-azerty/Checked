import { supabase } from "@/SupabaseClient";
import { Todo } from '../dto/todos.types';

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
      is_deleted: data![i].is_deleted,
      is_finished: data![i].is_finished,
      is_favorite: data![i].is_favorite,
      tags: []
    };
    tmp.push(todo);
  }
  return tmp;
}