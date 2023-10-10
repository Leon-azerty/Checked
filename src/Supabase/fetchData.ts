import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { Todo } from '@/dto/todos.types';
import type { Tag as TagType } from '@/dto/tag.types';

const getAllTodos = async () => {
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
      todo.deadline = todo.deadline.replace("T", ' ').split('+')[0];
    }
    tmp.push(todo);
  }
  return tmp;
}

const fillTodoWithTag = async (tag_ids: string[], Tags: TagType[]) => {
  let tagsForTodo: TagType[] = []
  for (const tag_id of tag_ids) {
    const tag = Tags.find(tag => tag.id.toString() === tag_id);
    if (tag === undefined) {
      const tag = await getTag(tag_id);
      tagsForTodo.push(tag);
      continue;
    } else {
      tagsForTodo.push(tag)
    }
  }
  return tagsForTodo;
}

async function getTag_ids(todosId: number) {
  const tagsIds: string[] = [];
  const supabase = createClientComponentClient();
  const { data, error } = await supabase.from('todo_tag').select(`tag_id`).eq('todo_id', todosId)
  if (error) {
    console.error("error", error);
    throw new Error("ERROR : " + error.message);
  }
  for (const tag of data) {
    tagsIds.push(tag.tag_id);
  }
  return tagsIds;
}

async function getTag(tag_id: string) {
  const supabase = createClientComponentClient();
  const { data, error } = await supabase.from('tag').select(`id, name, color, author_id`).eq('id', tag_id)
  if (error) {
    console.error("error", error);
    throw new Error("ERROR : " + error.message);
  }
  return data[0];
}

export const fetchTags = async () => {
  const supabase = createClientComponentClient();
  return await supabase.from('tag').select(`id, name, color, author_id`);
}

export const fetchTodos = async (Tags: TagType[]) => {
  const allTodos: Todo[] = await getAllTodos();
  for (let i = 0; i < allTodos.length; i++) {
    const tag_ids = await getTag_ids(allTodos[i].id);
    allTodos[i].tags = await fillTodoWithTag(tag_ids, Tags);
  }
  return allTodos;
}