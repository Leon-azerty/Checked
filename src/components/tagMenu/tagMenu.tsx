import { TagMenuProps } from './tagMenu.props';

export default function TagMenu(props: TagMenuProps) {
  return <article className='flex items-center m-1' onClick={() => props.addTagsInFilter(props.tag.name)}>
    <p style={{ backgroundColor: props.tag.color }} className="mx-1 rounded-lg px-2">#{props.tag.name}</p>
  </article>

}