export interface RightContentProps {
  isFinished: boolean
  handleTodoState: () => void
  isDeleted: boolean
  id: number
  handleDeleteTodo: () => void
}