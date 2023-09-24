import { Todo } from "../../dto/todos.types";

export interface CardProps {
  todo: Todo;
  id: number;
  tab: string;
}