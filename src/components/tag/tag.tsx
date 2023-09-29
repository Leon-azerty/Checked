import { useRef } from 'react';
import { ImCancelCircle } from 'react-icons/im';
import { useHover } from 'usehooks-ts';
import { TagProps } from './tag.props';

export default function Tag(props: TagProps) {
  const hoverRef = useRef(null)
  let isHover = useHover(hoverRef)
  if (window.innerWidth < 768) {
    isHover = true;
  }
  return <article ref={hoverRef} className='flex items-center h-8'>
    <div style={{ backgroundColor: props.tag.color }} className="mx-1 rounded-lg px-2">#{props.tag.name}</div>
    {isHover && <div onClick={() => { props.onClick(props.tag) }}><ImCancelCircle /></div>}
  </article>

}