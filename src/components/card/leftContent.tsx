import { LeftContentProps } from "./leftContent.props"
import { Spinner } from "../loader/spinner";
import { AiFillPlusCircle } from "react-icons/ai";
import { IconContext } from "react-icons";
import Tag from "../tag/tag";
import { useEffect, useState, useRef, useContext } from "react";
import { TagTypes } from "@/app/tag.types";
import { useHover } from 'usehooks-ts';
import { TagsContext } from "@/app/tagsContext";

export function LeftContent(props: LeftContentProps) {
  const hoverRef = useRef(null)
  const isHover = useHover(hoverRef)
  const tagsContext = useContext(TagsContext);
  console.log("tagsContext", tagsContext)
  if (!tagsContext) {
    throw new Error('useTodosContext must be used within a TagsProvider');
  }


  return <div className="w-full hover:pl-4 duration-300">
    <div className="flex items-center">
      <p className="text-3xl font-bold">♦ {props.todo.title}</p>
      {tagsContext[0] == null && <Spinner />}
      {tagsContext[0].map((e, i) => <Tag key={i} name={e.name} colorProps={e.color} />)}
      {/* {tagsContext[0].map((e, i) => <p key={i}>{e.name}</p>)} */}
      <IconContext.Provider value={{ size: '26', color: "#7E7E7E" }}>
        <div ref={hoverRef} onClick={() => { console.log("ajout d'un tag WIP") }}>
          {isHover && <AiFillPlusCircle />}
        </div>
      </IconContext.Provider>
    </div>

    {props.isUpdate ?
      <textarea className="w-full" onClick={props.UpdateTodo}
        onBlur={props.LostFocus} autoFocus defaultValue={props.todo.description}>
      </textarea> : <p className="w-full" onClick={props.UpdateTodo}>
        {props.todo.description}</p>}
    <div className="flex flex-row-reverse">
      {props.isUpdate && <button className="text-white bg-gradient-to-r from-black 
      to-gray-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none 
      focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 
      py-2.5 text-center mr-2 mb-2">update</button>}
    </div>
  </div>
}