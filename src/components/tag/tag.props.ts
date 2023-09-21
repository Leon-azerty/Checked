import { TagTypes } from "../../dto/tag.types";

export interface TagProps {
  tag: TagTypes;
  removeTag: (tag: TagTypes) => void;
}