export interface RightContentProps {
  is_finished: boolean
  handleTodoState: () => void
  is_deleted: boolean
  id: number
  handleDeleteTodo: () => void
  restoreTodo: () => void
}