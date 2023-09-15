import { CardProps } from "./card.props";
import { useState } from "react";
import "./card.css"
import { LeftContent } from "./leftContent";
import { RightCard } from "./rightCard";
import { Star } from "./star";
import { supabase } from "@/SupabaseClient";

export default function Card(props: CardProps) {
  const [isFinished, setIsFinished] = useState(props.todo.isFinished);
  const [isFavorite, setIsFavorite] = useState(props.todo.isFavorite);
  const [isDeleted, setIsDeleted] = useState(props.todo.isDeleted);
  const [isUpdate, setIsUpdate] = useState(false);

  const handleTodoState = async () => {
    const { data, error } = await supabase.from('todo').update({
      isFinished: !isFinished
    }).eq('id', props.todo.id);
    if (error) return console.log(error);
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

  // const removeTag = (name: string) => {
  //   setTags(tags.filter(elem => elem.name !== name))
  // }


  if (props.tab == "listFavorite" && !isFavorite) return (<></>);
  if (props.tab == "listChecked" && !isFinished) return (<></>);
  if (props.tab == "listUnchecked" && isFinished) return (<></>);
  if (props.tab == "listDeleted" && !isDeleted) return (<></>);
  return <div id={`card-${props.id}`} className={` 
  rounded-3xl p-6 m-6 border-[#D9D9D9] border-solid border-4 flex flex-col hover:pl-4 
  transition-all ease-in duration-500 animate-wiggle hover:scale-y-110
  ${isFinished ? "background-gradient-left-to-right border-[#22c55e]" : ""} 
  ${isFavorite ? `border-[#FFC700]` : ``} 
  ${isDeleted ? `background-gradient-left-to-right-deleted` : ``} 
  `}>
    <div className="flex flex-row-reverse">
      <RightCard handleDeleteTodo={handleDeleteTodo}
        handleTodoState={handleTodoState} id={props.id}
        isDeleted={isDeleted} isFinished={isFinished} />
      <Star handleTodoFavorite={handleTodoFavorite} id={props.id} isFavorite={isFavorite} />
      <LeftContent
        todo={props.todo}
        LostFocus={LostFocus}
        UpdateTodo={UpdateTodo}
        isUpdate={isUpdate}
      />
    </div>
  </div>

}