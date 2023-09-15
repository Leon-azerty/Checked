import { useState, useRef } from 'react';
import { ImCancelCircle } from 'react-icons/im';
import { useHover } from 'usehooks-ts';

export default function Tag({ name, colorProps }: { name: string, colorProps: string }) {
  const [color, setColor] = useState<string>(colorProps);
  const hoverRef = useRef(null)
  const isHover = useHover(hoverRef)
  console.log("name", name)
  console.log("colorProps", colorProps)
  return <article ref={hoverRef} className='flex items-center'>
    <div style={{ backgroundColor: color }} className="mx-1 rounded-lg px-2">#{name}</div>
    {/* {isHover && <div onClick={() => { removeTag(name) }}><ImCancelCircle /></div>} */}
  </article>

}