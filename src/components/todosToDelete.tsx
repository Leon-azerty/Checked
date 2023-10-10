import { IconContext } from "react-icons";
import { ImCancelCircle } from "react-icons/im";
import { useContext } from "react";
import { TodosToDeleteContext } from "@/context/todoToDeleteContext";

export default function TodosToDelete({ name }: { name: string }) {
  const context = useContext(TodosToDeleteContext);
  if (!context) {
    console.error("context is null");
    return <></>
  }
  const [todosToDeleteContext, setTodosToDeleteContext] = context;
  const deleteTodoInDeleteQueue = () => {
    setTodosToDeleteContext(todosToDeleteContext.filter(e => e.title !== name));
  }
  return <div className="flex items-center">
    <p className="bg-[#D9D9D9] p-2 rounded-lg m-2">{name}</p>
    <IconContext.Provider value={{ size: "20" }}>
      <div onClick={deleteTodoInDeleteQueue} className="hover:scale-150">
        <ImCancelCircle />
      </div>
    </IconContext.Provider>
  </div>
}