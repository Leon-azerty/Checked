import { TagTypes } from "./tag.types";

export interface Todo {
  title: string;
  description: string;
  isFinished: boolean;
  isFavorite: boolean;
  isDeleted: boolean;
  tags: TagTypes[];
}