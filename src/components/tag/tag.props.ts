import { TagTypes } from "../../dto/tag.types";

export interface TagProps {
  tag: TagTypes;
  onClick: (tag: TagTypes) => void;
}