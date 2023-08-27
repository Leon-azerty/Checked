import { AiOutlinePlusCircle } from 'react-icons/ai';
import { AiFillStar } from 'react-icons/ai';
import { useState } from 'react';
import Create from './create';
import Button from '../components/button';
import { MenuProps } from './menu.props';


export default function Menu(props: MenuProps) {
  const [create, setCreate] = useState<boolean>(false);
  return <div className="bg-white w-72 border-white-500 border-solid border-r-4" >
    <Button icon={<AiOutlinePlusCircle />} text='Create Todo' onClick={() => setCreate(true)} iconColor='black' />
    <Button icon={<AiFillStar />} text='Favorites' onClick={() => { props.setIsFavoriteTodosVisible(!props.isFavoriteTodosVisible) }} iconColor='#FFC700' />
    {create == true && <Create setCreate={setCreate} />}
  </div >
}