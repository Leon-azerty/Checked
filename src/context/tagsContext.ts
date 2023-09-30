import { createContext, Dispatch, SetStateAction } from 'react';

import { TagTypes } from '@/dto/tag.types';

type TagsContextType = [TagTypes[], Dispatch<SetStateAction<TagTypes[]>>];

export const TagsContext = createContext<TagsContextType | undefined>(undefined);