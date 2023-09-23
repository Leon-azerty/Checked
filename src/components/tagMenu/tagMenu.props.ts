import { TagTypes } from "../../dto/tag.types";

export interface TagMenuProps {
  tag: TagTypes;
  addTagsInFilter: (name: String) => void;
}