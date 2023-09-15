import { TagTypes } from "./tag.types";

export interface Todo {
  id: number;
  title: string;
  description: string;
  isFinished: boolean;
  isFavorite: boolean;
  isDeleted: boolean;
  tags: TagTypes[];
}