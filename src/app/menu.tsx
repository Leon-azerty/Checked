import { AiOutlinePlusCircle } from 'react-icons/ai';
import { AiFillStar } from 'react-icons/ai';
import { useState } from 'react';
import Create from './create';
import Button from '../components/button';


export default function Menu() {
  const [create, setCreate] = useState<boolean>(false);
  return <div className="bg-white w-72 border-white-500 border-solid border-r-4" >
    <Button icon={<AiOutlinePlusCircle />} text='Create Todo' onClick={() => setCreate(true)} iconColor='black' />
    <Button icon={<AiFillStar />} text='Favorites' onClick={() => { }} iconColor='#FFC700' />
    {create == true && <Create setCreate={setCreate} />}
  </div >
}