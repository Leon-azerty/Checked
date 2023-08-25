import { CardProps } from "./card.props";

export default function Card(props: CardProps) {
  return <div className="w-full" key={props.key}>
    <div className="rounded-3xl p-6 m-6 border-[#D9D9D9] border-solid border-4 flex flex-col">
      <p className="text-3xl font-bold">♦ {props.todo.title}</p>
      <p>{props.todo.description}</p>
      <p>{props.todo.isFinished ? "true" : "false"}</p>
    </div>
  </div>

}