import { useState } from 'react';
import { AiOutlineCloseCircle } from 'react-icons/ai';
import { IconContext } from "react-icons";
import { CreateProps } from './create.props';

export default function Create(props: CreateProps) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");


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
  };

  return <div className="pt-4 animate-wiggle">
    <div className='flex justify-end pr-4' onClick={() => { props.setCreate(false) }}>
      <IconContext.Provider value={{ size: '32' }}>
        <AiOutlineCloseCircle />
      </IconContext.Provider>
    </div>
    <label htmlFor="title" className="ml-4 block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your title</label>
    <textarea id="title" rows={1} onChange={(e) => setTitle(e.target.value)} className='flex w-full resize-none p-2.5' placeholder='title' ></textarea>
    <label htmlFor="description" className="pt-4 ml-4 block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your description</label>
    <textarea id="description" rows={4} onChange={(e) => setDescription(e.target.value)} className="resize-none block p-2.5 w-full text-sm text-gray-900 bg-gray-50 description-lg focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Description"></textarea>
    <div className="flex justify-end pt-4">
      <button type="button" onClick={() => createTodo()} className="text-white bg-gradient-to-r from-black to-gray-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2">Valider</button>
    </div>

  </div>

}