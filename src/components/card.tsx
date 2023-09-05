import { CardProps } from "../app/card.props";
import { RiDeleteBin6Line } from "react-icons/ri";
import { AiFillCheckSquare, AiTwotoneCheckSquare } from "react-icons/ai";
// import { AiTwotoneCheckSquare } from "react-icons/gr";
import { BsStarFill } from "react-icons/bs";
import { IconContext } from "react-icons";
import { useContext, useState } from "react";
import { TodosContext } from "@/app/todosContext";
import "./card.css"

export default function Card(props: CardProps) {
  const [isFinished, setIsFinished] = useState(props.todo.isFinished);
  const [isFavorite, setIsFavorite] = useState(props.todo.isFavorite);
  const [isDeleted, setIsDeleted] = useState(false);
  const [isUpdate, setIsUpdate] = useState(false);
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
    setIsDeleted(true);
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

  const UpdateTodo = () => {
    console.log("update")
    setIsUpdate(true);
  }

  const LostFocus = () => {
    // vérifier qu'il n'y pas de changement avec la version précédente
    // (la version avant qu'on clique dessus)
    setIsUpdate(false)
  }

  if (props.isFavoriteTodosVisible && !isFavorite) return (<></>);
  return <div className="w-full" key={props.id}>
    {/* border-blue-500 transition-border-colors duration-500 */}
    <div id={`card-${props.id}`} className={` ${isFinished ? "background-gradient-left-to-right border-[#22c55e]" : ""} ${isFavorite ? `border-[#FFC700]` : ``} ${isDeleted ? `background-gradient-left-to-right-deleted` : ``} rounded-3xl p-6 m-6 border-[#D9D9D9] border-solid border-4 flex flex-col hover:pl-4 transition-all ease-in duration-500 animate-wiggle`}>
      <div className="flex flex-row-reverse">
        <div className="w-36 border-[#D9D9D9] border-solid border-l-2 flex flex-col justify-between items-center" >
          <IconContext.Provider value={{ size: '26', color: '#7E7E7E' }}>
            <a onClick={() => handleTodoState()} href={`#card-${props.id}`}>
              {isFinished ? <AiFillCheckSquare /> : <AiTwotoneCheckSquare />}
            </a>
          </IconContext.Provider>
          <IconContext.Provider value={{ size: '26', color: isDeleted ? 'black' : '#7E7E7E' }}>
            <a onClick={() => { handleDeleteTodo() }} href={`#card-${props.id}`}>
              <RiDeleteBin6Line />
            </a>
          </IconContext.Provider>
        </div>
        <a href={`#card-${props.id}`} className="pr-4" onClick={() => { handleTodoFavorite() }}>
          <IconContext.Provider value={{ size: '26', color: isFavorite ? '#FFC700' : "#7E7E7E" }}>
            <BsStarFill />
          </IconContext.Provider>
        </a>
        <div className="w-full hover:pl-4 duration-300">
          <p className="text-3xl font-bold">♦ {props.todo.title}</p>
          {isUpdate ? <textarea className="w-full" onClick={UpdateTodo} onBlur={LostFocus} autoFocus defaultValue={props.todo.description}></textarea> : <p className="w-full" onClick={UpdateTodo}>{props.todo.description}</p>}
          <div className="flex flex-row-reverse">
            {isUpdate && <button className="text-white bg-gradient-to-r from-black to-gray-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2">update</button>}
          </div>
        </div>
      </div>
    </div>
  </div >

}