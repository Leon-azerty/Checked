import CheckedDesc from '@/app/login/checkedDesc'
import Form from '@/app/login/form'
import Image from 'next/image'
import TodosImage from '/public/todos.png'

export default function LargeContent() {
  return (
    <div className="flex w-full flex-col items-center space-y-4 lg:flex-row lg:justify-around">
      <Image
        priority
        className="mb-4 w-[320px] animate-tinyBounce justify-start sm:w-[500px]"
        loading="eager"
        src={TodosImage}
        alt="todos"
      />
      <div className="flex flex-col items-center lg:w-[500px] xl:w-[700px]">
        <Form />
        <CheckedDesc />
      </div>
    </div>
  )
}
