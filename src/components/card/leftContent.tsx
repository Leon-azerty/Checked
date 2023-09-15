import { LeftContentProps } from "./leftContent.props"
import { AiFillPlusCircle } from "react-icons/ai";
import { IconContext } from "react-icons";
import Tag from "../tag/tag";
import { useRef, useState } from "react";
import { useHover } from 'usehooks-ts';
import { supabase } from "@/SupabaseClient";
import { TagTypes } from "@/dto/tag.types";

export function LeftContent(props: LeftContentProps) {
  const hoverRef = useRef(null)
  const isHover = useHover(hoverRef)
  const [tags, setTags] = useState(props.todo.tags);

  const removeTag = async (tag: TagTypes) => {
    props.todo.tags = tags.filter(e => e.name !== tag.name);
    setTags(props.todo.tags);
    const { data, error } = await supabase.from('todo_tag')
      .delete()
      .eq('tagId', tag.id)
      .eq('todoId', props.todo.id);
    if (error) return console.log(error);
    console.log("data", data);
  }

  return <div className="w-full hover:pl-4 duration-300">
    <div ref={hoverRef} className="flex items-center">
      <p className="text-3xl font-bold">♦ {props.todo.title}</p>
      {tags.map((e, i) => <Tag key={i} tag={e} removeTag={removeTag} />)}
      <IconContext.Provider value={{ size: '26', color: "#7E7E7E" }}>
        <div onClick={() => { console.log("ajout d'un tag WIP") }}>
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