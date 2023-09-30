import type { Tag as TagType } from "@/dto/tag.types";

export interface TagMenuProps {
  tag: TagType;
  onClick: (name: string) => void;
}