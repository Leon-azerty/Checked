import { useRef } from 'react';
import { ImCancelCircle } from 'react-icons/im';
import { useHover } from 'usehooks-ts';
import type { Tag as TagType } from "@/dto/tag.types";

export default function Tag({ tag, onClick }: {
  tag: TagType, onClick: (tag: TagType) => void
}) {
  const hoverRef = useRef(null)
  let isHover = useHover(hoverRef)
  if (window.innerWidth < 768) {
    isHover = true;
  }
  return <article ref={hoverRef} className='flex items-center h-8'>
    <div style={{ backgroundColor: tag.color }} className="mx-1 rounded-lg px-2">#{tag.name}</div>
    {isHover && <div onClick={() => { onClick(tag) }}><ImCancelCircle /></div>}
  </article>

}