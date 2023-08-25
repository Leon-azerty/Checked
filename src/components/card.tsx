import { CardProps } from "../app/card.props";
import { RiDeleteBin6Line } from "react-icons/ri";
import { AiFillCheckSquare } from "react-icons/ai";
import { GrCheckbox } from "react-icons/gr";
import { IconContext } from "react-icons";
import { useState } from "react";

export default function Card(props: CardProps) {
  const [isFinished, setIsFinished] = useState(props.todo.isFinished);

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
  }

  return <div className="w-full" key={props.id}>
    <div className="rounded-3xl p-6 m-6 border-[#D9D9D9] border-solid border-4 flex flex-col">
      <div className="flex flex-row-reverse">
        <div className="w-36 border-[#D9D9D9] border-solid border-l-2 flex flex-col justify-between items-center" >
          <IconContext.Provider value={{ size: '26', color: '#7E7E7E' }}>
            <div onClick={() => handleTodoState()}>
              {isFinished ? <AiFillCheckSquare /> : <GrCheckbox />}
            </div>
            <div onClick={() => { handleDeleteTodo() }}>
              <RiDeleteBin6Line />
            </div>
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