import { useRef } from 'react'
import { ImCancelCircle } from 'react-icons/im'
import { useHover } from 'usehooks-ts'
import type { Tag as TagType } from '@/dto/tag.types'

export default function Tag({
  tag,
  onClick,
  removeTag = undefined,
}: {
  tag: TagType
  onClick: (tag: TagType) => void
  removeTag?: (tag: TagType) => void
}) {
  const hoverRef = useRef(null)
  let isHover = useHover(hoverRef)
  if (window.innerWidth < 768) {
    isHover = true
  }
  return (
    <article ref={hoverRef} className="my-1 flex h-8 items-center">
      <div
        style={{ backgroundColor: tag.color }}
        className="mx-1 rounded-lg px-2"
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
