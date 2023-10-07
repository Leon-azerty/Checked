import { useContext, useState } from 'react';
import { AiOutlineCloseCircle } from 'react-icons/ai';
import { IconContext } from "react-icons";
import { CreateProps } from '@/components/create/create.props';
import { TodosContext } from '@/context/todosContext';
import Tag from '@/components/tag/tag';
import { HexColorPicker } from "react-colorful";
import type { Tag as TagType } from '@/dto/tag.types';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import Input from '@/components/input/input';
import Textarea from '@/components/textarea/textarea';
import Button from '@/components/button/button';
import { ModalTextContext } from '@/context/modalTextContext';
import Checkbox from '@/components/checkbox/checkbox';
import Radio from '@/components/radio/radio';
import { TagsContext } from '@/context/tagsContext';
import TagMenu from '@/components/tagMenu/tagMenu';

export default function Create(props: CreateProps) {
  const [tags, setTags] = useState<TagType[]>([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [isTitleFilled, setIsTitleFilled] = useState(false);
  const [tagName, setTagName] = useState<string>("");
  const [date, setDate] = useState<string>("");
  const [time, setTime] = useState<string>("");
  const [color, setColor] = useState<string>("#D9D9D9");
  const [isDeadline, setIsDeadline] = useState<boolean>(false);
  const [deadlineType, setDeadlineType] = useState<string>("");
  const todosContext = useContext(TodosContext);
  const modalContext = useContext(ModalTextContext);
  const tagsContext = useContext(TagsContext);
  const supabase = createClientComponentClient();

  if (!tagsContext) {
    throw new Error('useTagsContext must be used within a TagsProvider');
  }
  const [existantTags, setExistantTags] = tagsContext;
  if (!todosContext) {
    throw new Error('useTodosContext must be used within a TodosProvider');
  }
  const [todos, setTodos] = todosContext;
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
      deadline: date + " " + time != " " ? date + " " + time : null,
      deadline_type: deadlineType != "" ? deadlineType : null,
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
      is_favorite: false, is_deleted: false, id: todo_id, tags: tags,
      deadline: isDeadline ? date + " " + time : "", deadline_type: deadlineType,
    }]);
    for (const tag of tags) {
      if (!existantTags.includes(tag)) {
        setExistantTags([...existantTags, tag]);
      }
    }
    setTitle("");
    setDescription("");
    props.setTab("");
  };

  const addTag = async () => {
    if (existantTags.find(e => e.name === tagName) !== undefined) {
      setModalText("Tag already exist");
      return;
    }
    const author_id = (await supabase.auth.getUser()).data.user?.id;
    //vérifier si le tag existe déjà dans la liste des tags de l'user
    const { data, error } = await supabase.from('tag').insert({
      name: tagName,
      color: color,
      author_id
    }).select('id');
    if (error) {
      setModalText(error.message);
      return console.log(error);
    }
    setTags([...tags, { id: data[0].id, name: tagName, color: color }]);
    setTagName("");
  }

  const removeTag = (tag: TagType) => {
    setTags(tags.filter(e => e !== tag));
  }

  const addExistantTag = (tag: TagType) => {
    setTags([...tags, tag]);
  }

  const addDeadline = () => {
    if (isDeadline) {
      setDate("");
      setTime("");
      setDeadlineType("");
    }
    setIsDeadline(!isDeadline)
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
      <Checkbox htmlFor='deadline' onchange={() => { addDeadline() }}
        label='Add Deadline' placeholder='' />
      {isDeadline && <Input htmlFor='date' onchange={(e) => { setDate(e.target.value) }}
        label='Date' placeholder='' type='date' />}
      {isDeadline && <Input htmlFor='time' onchange={(e) => { setTime(e.target.value) }}
        label='Time' placeholder='' type='time' />}
      {isDeadline && <Radio htmlFor='To_do_The' onchange={() => { setDeadlineType("to do the") }}
        label='To do The' placeholder='' name='deadline_type' />}
      {isDeadline && <Radio htmlFor='Before_The' onchange={() => { setDeadlineType("before the") }}
        label='Before The' placeholder='' name='deadline_type' />}

      <div className='flex flex-wrap'>
        <div className='my-2'>
          <div className='flex'>
            {existantTags.length > 0 && existantTags.map((e, i) => <TagMenu key={e.name as string} tag={e} onClick={() => { addExistantTag(e) }} />)}
          </div>
          <Input htmlFor='tag' onchange={(e) => setTagName(e.target.value)}
            value={tagName} label='Tag' placeholder='Tag' type='text' />
          <Button type='button' onClick={addTag} text='Add Tag' />
        </div>
        <div className='my-2 flex h-full w-full'>
          <HexColorPicker color={color as string} className='w-6/12' onChange={setColor} />
          <div className='h-full w-6/12 flex flex-wrap justify-start'>
            {tags.length > 0 && tags.map((e, i) => <Tag key={e.name as string} tag={e} onClick={() => { removeTag(e) }} />)}
          </div>
        </div>
      </div>
      <Textarea onChange={(e) => setDescription(e.target.value)} />
      <div className="flex justify-between mr-6 max-w-full">
        <div></div>
        <Button type='submit' onClick={(e) => createTodo(e)} text='Valider' />
      </div>
    </form >

  </div >

}