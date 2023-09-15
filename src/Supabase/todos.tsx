import { supabase } from "@/SupabaseClient";
import { Todo } from '../app/todos.types';
import { TagTypes } from "@/app/tag.types";

async function selectTodos() {
  const { data, error } = await supabase
    .from('todo').select(`*`);
  if (error) {
    console.error(error);
    return []
  }
  const todosId: String[] = [];
  for (const todo of data) {
    todosId.push(todo.id);
  }
  return todosId;
}

// const todosIds = await selectTodos();
// for (const id of todosIds) {
//   const tagIds = await getTagIds(id);
//   const tags: TagTypes[] = [];
//   for (const tagId of tagIds) {
//     const tag = await getTag(tagId)
//     tags.push(tag)
//   }
//   console.log("tags", tags);
// }



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
      isFavorite: data![i].isFavorite
    };
    tmp.push(todo);
  }
  return tmp;
}