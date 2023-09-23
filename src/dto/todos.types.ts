import { TagTypes } from "./tag.types";

export interface Todo {
  id: number;
  title: String;
  description: String;
  is_finished: boolean;
  is_favorite: boolean;
  is_deleted: boolean;
  tags: TagTypes[];
}