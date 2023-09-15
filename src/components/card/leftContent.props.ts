import { TagTypes } from "@/app/tag.types";
import { Todo } from "@/app/todos.types";

export interface LeftContentProps {
  todo: Todo;
  isUpdate: boolean;
  UpdateTodo: () => void;
  // removeTag: (name: string) => void;
  LostFocus: () => void;
}