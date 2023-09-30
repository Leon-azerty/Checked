import { TagTypes } from "@/dto/tag.types";

export interface Todo {
  id: number;
  title: string;
  description: string;
  is_finished: boolean;
  is_favorite: boolean;
  is_deleted: boolean;
  tags: TagTypes[];
  deadline: string;
  deadline_type: string;
}