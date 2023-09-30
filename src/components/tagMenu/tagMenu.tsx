import { TagMenuProps } from '@/components/tagMenu/tagMenu.props';

export default function TagMenu(props: TagMenuProps) {
  return <article className='flex items-center m-1' onClick={() => props.onClick(props.tag.name)}>
    <p style={{ backgroundColor: props.tag.color }} className="mx-1 rounded-lg px-2">#{props.tag.name}</p>
  </article>

}