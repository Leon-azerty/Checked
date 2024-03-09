import { IconContext } from 'react-icons'
import { ImCancelCircle } from 'react-icons/im'
import { useTodosToDeleteContext } from '@/context/todoToDeleteContext'

export default function TodosToDelete({ name }: { name: string }) {
  const [todosToDeleteContext, setTodosToDeleteContext] =
    useTodosToDeleteContext()
  const deleteTodoInDeleteQueue = () => {
    setTodosToDeleteContext(
      todosToDeleteContext.filter((e) => e.title !== name)
    )
  }
  return (
    <div className="flex items-center">
      <p className="bg-gray-200 p-2 rounded-lg m-2">{name}</p>
      <IconContext.Provider value={{ size: '20' }}>
        <div onClick={deleteTodoInDeleteQueue} className="hover:scale-150">
          <ImCancelCircle />
        </div>
      </IconContext.Provider>
    </div>
  )
}
