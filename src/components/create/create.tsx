import { useContext, useState } from 'react';
import { AiOutlineCloseCircle } from 'react-icons/ai';
import { IconContext } from "react-icons";
import { CreateProps } from './create.props';
import { TodosContext } from '../../context/todosContext';
import Tag from '@/components/tag/tag';
import { HexColorPicker } from "react-colorful";
import { TagTypes } from '@/dto/tag.types';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import Input from '../input/input';
import Textarea from '../textarea/textarea';
import Button from '../button/button';
import { ModalTextContext } from '@/context/modalTextContext';

export default function Create(props: CreateProps) {
  const context = useContext(TodosContext);
  const [tags, setTags] = useState<TagTypes[]>([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [isTitleFilled, setIsTitleFilled] = useState(false);
  const [tagName, setTagName] = useState<string>("");
  const [color, setColor] = useState<string>("#D9D9D9");
  const supabase = createClientComponentClient();
  const modalContext = useContext(ModalTextContext);

  if (!context) {
    throw new Error('useTodosContext must be used within a TodosProvider');
  }
  const [todos, setTodos] = context;
  if (!modalContext) {
    throw new Error('use modalContext must be used within a modalProvider');
  }
  const [, setModalText] = modalContext;


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
    if (error) {
      setModalText(error.message);
      return console.log(error);
    }
    return data[0].id;
  }

  const insertTodoTag = async (todo_id: number, tag_id: number) => {
    const { data, error } = await supabase.from('todo_tag').insert({
      todo_id: todo_id,
      tag_id: tag_id,
    })
    if (error) {
      setModalText(error.message);
      return console.log(error)
    }
    console.log(data);

  }

  const createTodo = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (title == "") {
      setIsTitleFilled(true);
      return;
    }
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
    if (error) {
      setModalText(error.message);
      return console.log(error);
    }
    setTags([...tags, { id: data[0].id, name: tagName, color: color }]);
    setTagName("");
  }

  const removeTag = (tag: TagTypes) => {
    setTags(tags.filter(e => e !== tag));
  }

  return <div className="pt-4 animate-wiggle">
    <div className='flex justify-between mr-6' onClick={() => { props.setTab("ListAll") }}>
      <div></div>
      <IconContext.Provider value={{ size: '32' }}>
        <AiOutlineCloseCircle />
      </IconContext.Provider>
    </div>
    <form className='p-2'>
      <Input htmlFor='title' onchange={(e) => setTitle(e.target.value)}
        label='Your title' placeholder='title' type='email' isError={isTitleFilled} />
      <div className='flex flex-wrap'>
        <div className='my-2'>
          <Input htmlFor='tags' onchange={(e) => setTagName(e.target.value)}
            value={tagName} label='Tags' placeholder='Tags' type='text' />
          <Button type='button' onClick={addTag} text='Add Tags' />
        </div>
        <div className='my-2 flex h-full w-full'>
          <HexColorPicker color={color as string} className='w-6/12' onChange={setColor} />
          <div className='h-full w-6/12 flex flex-wrap justify-start'>
            {tags.length > 0 && tags.map((e, i) => <Tag key={e.name as string} tag={e} removeTag={() => { removeTag(e) }} />)}
          </div>
        </div>
      </div>
      <Textarea onChange={(e) => setDescription(e.target.value)} />
      <div className="flex justify-between mr-6 max-w-full">
        <div></div>
        <Button type='submit' onClick={(e) => createTodo(e)} text='Valider' />
      </div>
    </form>

  </div>

}