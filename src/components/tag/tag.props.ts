import { TagTypes } from "@/app/tag.types";

export interface TagProps {
  tag: TagTypes;
  removeTag: (tag: TagTypes) => void;
}