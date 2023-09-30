import { createContext, Dispatch, SetStateAction } from 'react';

import type { Tag as TagType } from '@/dto/tag.types';

type TagsContextType = [TagType[], Dispatch<SetStateAction<TagType[]>>];

export const TagsContext = createContext<TagsContextType | undefined>(undefined);