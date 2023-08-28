import { CardProps } from "../app/card.props";
import { RiDeleteBin6Line } from "react-icons/ri";
import { AiFillCheckSquare, AiTwotoneCheckSquare } from "react-icons/ai";
// import { AiTwotoneCheckSquare } from "react-icons/gr";
import { BsStarFill } from "react-icons/bs";
import { IconContext } from "react-icons";
import { useContext, useState } from "react";
import { TodosContext } from "@/app/todosContext";

export default function Card(props: CardProps) {
  const [isFinished, setIsFinished] = useState(props.todo.isFinished);
  const [isFavorite, setIsFavorite] = useState(props.todo.isFavorite);
  const context = useContext(TodosContext);
  if (!context) {
    throw new Error('useTodosContext must be used within a TodosProvider');
  }
  const [todos, setTodos] = context;

  const handleTodoState = async () => {
    const title = props.todo.title;
    const description = props.todo.description;
    const res = await fetch(`http://localhost:8080/todo/${props.id}`, {
      method: "PATCH",
      mode: "cors",
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        "title": title,
        "description": description,
        "isFinished": !isFinished,
        "isFavorite": isFavorite,
      }),
    });
    if (!res.ok) return console.log("not ok");
    const data = await res.json();
    console.log(data);
    setIsFinished(!isFinished);
  }

  const handleDeleteTodo = async () => {
    console.log("delete todo");
    const res = await fetch(`http://localhost:8080/todo/${props.id}`, {
      method: "DELETE",
      mode: "cors",
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({}),
    });
    console.log(res);
    res.ok ? console.log("ok") : console.log("not ok");
    const data = await res.json();
    console.log(data);
    // la ligne update quand on delete la todo
    // il faudrait mettre d'abord une anim pour montrer qu'on delete
    // puis seulement quand l'anim est finit on delete
    // setTodos(todos.filter((e, i) => i != props.id));
  }

  const handleTodoFavorite = async () => {
    const title = props.todo.title;
    const description = props.todo.description;
    const res = await fetch(`http://localhost:8080/todo/${props.id}`, {
      method: "PATCH",
      mode: "cors",
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        "title": title,
        "description": description,
        "isFinished": isFinished,
        "isFavorite": !isFavorite,
      }),

    });
    setIsFavorite(!isFavorite);
  }

  if (props.isFavoriteTodosVisible && !isFavorite) return (<></>);
  return <div className="w-full" key={props.id}>
    <div className="rounded-3xl p-6 m-6 border-[#D9D9D9] border-solid border-4 flex flex-col">
      <div className="flex flex-row-reverse">
        <div className="w-36 border-[#D9D9D9] border-solid border-l-2 flex flex-col justify-between items-center" >
          <IconContext.Provider value={{ size: '26', color: '#7E7E7E' }}>
            <div onClick={() => handleTodoState()}>
              {isFinished ? <AiFillCheckSquare /> : <AiTwotoneCheckSquare />}
            </div>
            <div onClick={() => { handleDeleteTodo() }}>
              <RiDeleteBin6Line />
            </div>
          </IconContext.Provider>
        </div>
        <div className="pr-4" onClick={() => { handleTodoFavorite() }}>
          <IconContext.Provider value={{ size: '26', color: isFavorite ? '#FFC700' : "#7E7E7E" }}>
            <BsStarFill />
          </IconContext.Provider>
        </div>
        <div className="w-full">
          <p className="text-3xl font-bold">♦ {props.todo.title}</p>
          <p>{props.todo.description}</p>
        </div>
      </div>
    </div>
  </div>

}