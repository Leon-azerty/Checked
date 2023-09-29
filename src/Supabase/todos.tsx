import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { Todo } from '../dto/todos.types';

export const getAllTodos = async () => {
  const supabase = createClientComponentClient();
  const { data, error } = await supabase.from('todo').select(`
  id,
  name,
  description,
  is_finished,
  is_favorite,
  is_deleted,
  created_at,
  author_id,
  deadline,
  deadline_type
  `);
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
      tags: [],
      deadline: data![i].deadline,
      deadline_type: data![i].deadline_type,
    };
    if (todo.deadline != null) {
      console.log("todo.deadline", todo.deadline);
      todo.deadline = todo.deadline.replace("T", ' ').split('+')[0];
    }
    tmp.push(todo);
  }
  return tmp;
}