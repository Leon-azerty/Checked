import { Todo } from "../../app/todos.types";

export interface CardProps {
  todo: Todo;
  id: number;
  tab: string;
}