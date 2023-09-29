import { LeftContentProps } from "./leftContent.props"
import { AiFillPlusCircle } from "react-icons/ai";
import { IconContext } from "react-icons";
import Tag from "../tag/tag";
import { useRef, useState } from "react";
import { useHover } from 'usehooks-ts';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { TagTypes } from "@/dto/tag.types";
import Button from "../button/button";

export function LeftContent(props: LeftContentProps) {
  const hoverRef = useRef(null)
  const isHover = useHover(hoverRef)
  const [tags, setTags] = useState(props.todo.tags);
  const [isUpdating, setIsUpdating] = useState(false);
  const isDebug = true;
  const supabase = createClientComponentClient();

  const removeTag = async (tag: TagTypes) => {
    props.todo.tags = tags.filter(e => e.name !== tag.name);
    setTags(props.todo.tags);
    const { data, error } = await supabase.from('todo_tag')
      .delete()
      .eq('tag_id', tag.id)
      .eq('todo_id', props.todo.id);
    if (error) return console.log(error);
    console.log("data", data);
  }

  const UpdateTodo = async () => {
    console.log("send todo updated", props.todo.id, props.todo.description, props.todo.title)
    const { data, error } = await supabase.from('todo').update({
      description: props.todo.description,
      name: props.todo.title
    }).eq('id', props.todo.id);
    if (error) return console.log(error);
    console.log("data", data);
    setIsUpdating(false)
  }

  return <div className="w-full hover:pl-4 duration-300">
    <div ref={hoverRef} className="flex items-center w-full">
      <div className="flex w-full justify-between flex-col md:flex-row">
        <p className="text-3xl font-bold">{props.todo.title}</p>
        <div className="flex flex-col md:flex-row">
          <p className="flex bg-gray-300 rounded-xl items-center px-3 m-1 w-fit">{props.todo.deadline_type}</p>
          <p className="flex bg-gray-300 rounded-xl items-center px-3 m-1 w-fit">{props.todo.deadline}</p>
        </div>
      </div>
      {
        !isDebug &&
        <IconContext.Provider value={{ size: '26', color: "#7E7E7E" }}>
          <div onClick={() => { console.log("ajout d'un tag WIP") }}>
            {isHover && <AiFillPlusCircle />}
          </div>
        </IconContext.Provider>
      }
    </div >
    <div className="flex flex-wrap">
      {tags.map((e, i) => <Tag key={i} tag={e} onClick={removeTag} />)}
    </div>

    {
      isUpdating ?
        <textarea className="w-full"
          autoFocus defaultValue={props.todo.description}
          onChange={(e) => { props.todo.description = e.target.value }}>
        </textarea> :
        <p className="w-full" onClick={() => { setIsUpdating(true) }}>
          {props.todo.description}</p>
    }

    <div className="flex flex-row-reverse">
      {isUpdating && <Button type="button" text="update" onClick={() => { UpdateTodo() }} />}
      {isUpdating && <Button type="button" text="cancel"
        onClick={() => { setIsUpdating(false) }}
        className=" bg-gradient-to-r from-[#384854] to-[#d7d2cc]" />}
    </div>
  </div >
}

