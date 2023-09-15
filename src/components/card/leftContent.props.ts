import { Todo } from "@/dto/todos.types";

export interface LeftContentProps {
  todo: Todo;
  isUpdate: boolean;
  UpdateTodo: () => void;
  LostFocus: () => void;
}