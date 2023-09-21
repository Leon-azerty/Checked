import { useContext, useState } from 'react';
import { AiOutlineCloseCircle } from 'react-icons/ai';
import { IconContext } from "react-icons";
import { CreateProps } from './create.props';
import { TodosContext } from '../../context/todosContext';
import Tag from '@/components/tag/tag';
import { HexColorPicker } from "react-colorful";
import { supabase } from '@/SupabaseClient';
import { TagTypes } from '@/dto/tag.types';

export default function Create(props: CreateProps) {
  const context = useContext(TodosContext);
  const [tags, setTags] = useState<TagTypes[]>([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [tagName, setTagName] = useState<string>("");
  const [color, setColor] = useState<string>("#D9D9D9");

  if (!context) {
    throw new Error('useTodosContext must be used within a TodosProvider');
  }
  const [todos, setTodos] = context;

  const insertTodo = async () => {
    const id = (await supabase.auth.getUser()).data.user?.id;
    const { data, error } = await supabase.from('todo').insert({
      name: title,
      description,
      is_finished: false,
      is_favorite: false,
      is_deleted: false,
      author_id: id,
    }).select('id');
    if (error) return console.log(error);
    return data[0].id;
  }

  const insertTodoTag = async (todo_id: number, tag_id: number) => {
    const { data, error } = await supabase.from('todo_tag').insert({
      todo_id: todo_id,
      tag_id: tag_id,
    })
    if (error) return console.log(error)
    console.log(data);

  }

  const createTodo = async () => {
    console.log('click');
    if (title == "" || description == "") return console.log('empty');
    // mettre un message d'erreur
    const todo_id = await insertTodo();
    //ajouter dans la table todo_tag
    for (const tag of tags) {
      insertTodoTag(todo_id, tag.id);
    }
    setTodos([...todos, {
      title: title, description: description, is_finished: false,
      is_favorite: false, is_deleted: false, id: todo_id, tags: tags
    }]);
    setTitle("");
    setDescription("");
    props.setTab("");
  };

  const addTag = async () => {
    const { data, error } = await supabase.from('tag').insert({
      name: tagName,
      color: color,
    }).select('id');
    if (error) return console.log(error);
    setTags([...tags, { id: data[0].id, name: tagName, color: color }]);
    setTagName("");
  }

  const removeTag = (tag: TagTypes) => {
    setTags(tags.filter(e => e !== tag));
  }

  return <div className="pt-4 animate-wiggle">
    <div className='flex justify-between mr-6' onClick={() => { props.setTab("") }}>
      <div></div>
      <IconContext.Provider value={{ size: '32' }}>
        <AiOutlineCloseCircle />
      </IconContext.Provider>
    </div>
    <label htmlFor="title" className="ml-4 block mb-2 text-sm font-medium text-gray-900 
    dark:text-white">Your title</label>
    <textarea id="title" rows={1} onChange={(e) => setTitle(e.target.value)} className='flex 
    w-full resize-none p-2.5' placeholder='title' ></textarea>

    <label htmlFor="tags" className="pt-4 ml-4 block mb-2 text-sm font-medium text-gray-900 
    dark:text-white">Tags</label>
    <div className='flex items-center'>
      <textarea id="tags" rows={1} onChange={(e) => setTagName(e.target.value)} className="resize-none
      block p-2.5 mr-4 w-64 text-sm text-gray-900 bg-gray-50 description-lg focus:ring-blue-500 
      focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 
      dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 rounded-md
      " placeholder="Tags" value={tagName}></textarea>
      <button type="button" onClick={addTag} className="w-28 text-white bg-gradient-to-r 
      from-black to-gray-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none 
      focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 
      text-center  mr-4">Add Tags</button>
      <HexColorPicker color={color} onChange={setColor} />
      {tags.length > 0 && tags.map((e, i) => <Tag key={e.name} tag={e} removeTag={() => { removeTag(e) }} />)}
    </div>

    <label htmlFor="description" className="pt-4 ml-4 block mb-2 text-sm font-medium 
    text-gray-900 dark:text-white">Your description</label>
    <textarea id="description" rows={4} onChange={(e) => setDescription(e.target.value)}
      className="resize-none block p-2.5 w-full text-sm text-gray-900 bg-gray-50 
    description-lg focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 
    dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 
    dark:focus:border-blue-500" placeholder="Description"></textarea>


    <div className="flex justify-between mr-6 max-w-full">
      <div></div>
      <button type="button" onClick={() => createTodo()} className="text-white bg-gradient-to-r 
      from-black to-gray-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none 
      focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 
      text-center">Valider</button>
    </div>

  </div>

}