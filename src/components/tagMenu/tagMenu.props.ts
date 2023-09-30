import { TagTypes } from "@/dto/tag.types";

export interface TagMenuProps {
  tag: TagTypes;
  onClick: (name: string) => void;
}