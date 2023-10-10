import Button from "./button";

export default function NoTodoToDisplay({ setTab }: { setTab: (tab: string) => void }) {
  return <div className='flex justify-center items-center h-96'>
    <div className="flex flex-col items-center justify-between h-20">
      <p className="text-gray-600" >No Todo ? Create your first one </p>
      <Button text='Create' onClick={() => { setTab("create") }} type="button" />
    </div>
  </div>

}