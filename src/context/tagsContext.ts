import { createContext, Dispatch, SetStateAction, useContext } from 'react'

import type { Tag as TagType } from '@/dto/tag.types'

type TagsContextType = [TagType[], Dispatch<SetStateAction<TagType[]>>]

export const TagsContext = createContext<TagsContextType | undefined>(undefined)

export const useTagsContext = () => {
  const context = useContext(TagsContext)
  if (context === undefined) {
    throw new Error('TagsContext must be used within a TagsProvider')
  }
  return context
}
