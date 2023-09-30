import type { Tag as TagType } from "@/dto/tag.types";

export interface TagProps {
  tag: TagType;
  onClick: (tag: TagType) => void;
}