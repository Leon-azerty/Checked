import type { Tag as TagType } from "@/dto/tag.types";

export default function TagMenu({ tag, onClick }: {
  tag: TagType, onClick: (name: string) => void
}) {
  return <article className='flex items-center' onClick={() => onClick(tag.name)}>
    <p style={{ backgroundColor: tag.color }} className="mx-1 rounded-lg px-2">#{tag.name}</p>
  </article>

}