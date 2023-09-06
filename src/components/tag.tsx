import { TagProps } from './tag.props';
import { ImCancelCircle } from 'react-icons/im';

export default function Tag({ name, color, removeTag }: { name: string, color: string, removeTag: any /* remplacer any par la fonction setState*/ }) {
  console.log(color);
  return <div className='flex items-center'>
    <div className={`${color} mx-1 rounded-lg px-2`}>#{name}</div>
    <div onClick={() => { removeTag(name) }}>
      <ImCancelCircle />
    </div>
  </div>
}