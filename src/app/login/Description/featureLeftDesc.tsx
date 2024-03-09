import { gray_700 } from '@/const/colors'
import { IconContext } from 'react-icons'
import { BsDot } from 'react-icons/bs'

const DotSize = '48'

export default function FeatureLeft({
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
          Simplify your life with Checked&apos; intuitive menu for todo sorting.
          With just a few clicks, you can effortlessly organize your tasks based
          on multiple criteria:
        </p>
        <br />
        <ol className="ml-4 list-decimal	">
          <li>
            Favorites: Quickly access your most important tasks by marking them
            as favorites.
          </li>
          <li>
            Checked: Easily find completed tasks to celebrate your
            accomplishments.
          </li>
          <li>
            Unchecked: Focus on what&apos;s left to be done with a glance at
            your open tasks.
          </li>
          <li>
            Trash: Safeguard your workspace by identifying and managing tasks in
            the trash.
          </li>
        </ol>
        <br />
        <p>
          Our sorting menu empowers you to tailor your task view, ensuring you
          have full control and clarity in your todo journey. Stay organized,
          stay efficient, and stay on top of your tasks with Checked.
        </p>

        <div className="flex cursor-pointer justify-center">
          <IconContext.Provider value={{ size: DotSize }}>
            <BsDot onClick={() => setSide('left')} />
          </IconContext.Provider>
          <IconContext.Provider value={{ size: DotSize, color: gray_700 }}>
            <BsDot onClick={() => setSide('right')} />
          </IconContext.Provider>
        </div>
      </div>
    </section>
  )
}
