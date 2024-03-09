import { gray_700 } from '@/const/colors'
import { IconContext } from 'react-icons'
import { BsDot } from 'react-icons/bs'

const DotSize = '48'

export default function FeatureRight({
  setSide,
}: {
  setSide: (side: string) => void
}) {
  return (
    <section
      className="flex w-10/12 items-center justify-between rounded-lg bg-gray-200 
      py-10 text-xl shadow-lg md:ml-14 md:w-7/12	"
    >
      <div className="ml-6 flex flex-col">
        <p>
          {' '}
          The real magic happens when you want to sort and access your tasks.
          Our Tag-Based Todo Filtering feature allows you to:
        </p>
        <ul className="ml-4 list-disc">
          <li>
            Filter by Tags: Quickly access tasks associated with specific tags.
          </li>
          <li>Tag Combination: Combine multiple tags.</li>
          <li>
            Clear Visuals: Tasks are color-coded by their tags, making it
            visually intuitive to identify and organize your todos at a glance.
          </li>
          <li>
            Faster Access: Filter your todos in seconds to find exactly what you
            need, precisely when you need it.
          </li>
          <li>
            Tailored Productivity: Customize your task management experience to
            align with your unique needs and preferences.
          </li>
        </ul>
        <div className="flex cursor-pointer justify-center">
          <IconContext.Provider value={{ size: DotSize, color: gray_700 }}>
            <BsDot onClick={() => setSide('left')} />
          </IconContext.Provider>
          <IconContext.Provider value={{ size: DotSize }}>
            <BsDot onClick={() => setSide('right')} />
          </IconContext.Provider>
        </div>
      </div>
    </section>
  )
}
