export default function FeatureLeft({
  setSide,
}: {
  setSide: (side: string) => void
}) {
  return (
    <section
      className="flex w-10/12 md:w-7/12 text-xl md:ml-14 
  bg-gray-200 rounded-lg py-10 hover:before:bg-red items-center 
  justify-between cursor-pointer	"
    >
      <div className="flex flex-col ml-6">
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
      </div>
      <div className="mx-4" onClick={() => setSide('right')}>
        &gt;
      </div>
    </section>
  )
}
