import { useContext, useState } from 'react';
import { AiOutlineCloseCircle } from 'react-icons/ai';
import { IconContext } from "react-icons";
import { CreateProps } from './create.props';
import { TodosContext } from './todosContext';
import Tag from '@/components/tag/tag';
import { HexColorPicker } from "react-colorful";

export default function Create(props: CreateProps) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [tag, setTag] = useState<string>("");
  const [tags, setTags] = useState<string[]>([]);
  const context = useContext(TodosContext);
  const [color, setColor] = useState("#aabbcc");
  let hexa = color;

  if (!context) {
    throw new Error('useTodosContext must be used within a TodosProvider');
  }
  const [todos, setTodos] = context;

  const createTodo = async () => {
    console.log('click');
    if (title == "" || description == "") return console.log('empty');
    // mettre un message d'erreur
    const res = await fetch('http://localhost:8080/todo', {
      method: "POST",
      mode: "cors",
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(
        {
          "title": title,
          "description": description,
          "isFinished": false,
          "isFavorite": false,
        }
      ),
    });
    console.log(res);
    if (!res) return console.log("error whit request")
    setTodos([...todos, {
      title: title, description: description, isFinished: false,
      isFavorite: false, isDeleted: false, id: todos.length + 1, tags: []
    }]);
    setTitle("");
    setDescription("");
    props.setTab("");
  };

  const addTags = () => {
    setTags([...tags, tag]);
    setTag("");
  }

  const removeTag = (name: string) => {
    setTags(tags.filter(e => e !== name));
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
      <textarea id="tags" rows={1} onChange={(e) => setTag(e.target.value)} className="resize-none
      block p-2.5 mr-4 w-64 text-sm text-gray-900 bg-gray-50 description-lg focus:ring-blue-500 
      focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 
      dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 rounded-md
      " placeholder="Tags" value={tag}></textarea>
      <button type="button" onClick={addTags} className="w-28 text-white bg-gradient-to-r 
      from-black to-gray-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none 
      focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 
      text-center  mr-4">Add Tags</button>
      <HexColorPicker color={color} onChange={setColor} />;
      {tags.length > 0 && tags.map((e, i) => <Tag key={e} name={e} color={hexa} removeTag={() => { removeTag(e) }} />)}
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