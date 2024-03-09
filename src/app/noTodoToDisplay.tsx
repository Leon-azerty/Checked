import Button from '../components/button'

export default function NoTodoToDisplay({
  setTab,
}: {
  setTab: (tab: string) => void
}) {
  return (
    <div className="flex h-96 items-center justify-center">
      <div className="flex h-20 flex-col items-center justify-between">
        <p className="text-gray-600">No Todo ? Create your first one </p>
        <Button
          text="Create"
          onClick={() => {
            setTab('create')
          }}
          type="button"
        />
      </div>
    </div>
  )
}
