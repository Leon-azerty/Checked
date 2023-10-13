import { useRef } from 'react'
import { ImCancelCircle } from 'react-icons/im'
import { useHover } from 'usehooks-ts'
import type { Tag as TagType } from '@/dto/tag.types'

export default function Tag({
  tag,
  onClick,
  removeTag = undefined,
  filter,
}: {
  tag: TagType
  onClick: (tag: TagType) => void
  removeTag?: (tag: TagType) => void
  filter?: string[]
}) {
  const hoverRef = useRef(null)
  let isHover = useHover(hoverRef)
  if (window.innerWidth < 768) {
    isHover = true
  }
  return (
    <article ref={hoverRef} className="flex items-center h-8 my-1">
      <div
        style={{ backgroundColor: tag.color }}
        className={` ${
          filter?.includes(tag.name) ? 'h-full flex items-center' : ''
        } mx-1 rounded-lg px-2`}
        onClick={() => onClick(tag)}
      >
        #{tag.name}
      </div>
      {removeTag != undefined && isHover && (
        <div
          onClick={() => {
            removeTag(tag)
          }}
        >
          <ImCancelCircle />
        </div>
      )}
    </article>
  )
}
