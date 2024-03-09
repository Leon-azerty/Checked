import Input from '@/components/input'
import Checkbox from '@/components/checkbox'
import Radio from '@/components/radio'

export default function Deadline({
  isDeadline,
  setIsDeadline,
  setDate,
  setTime,
  setDeadlineType,
}: {
  isDeadline: boolean
  setIsDeadline: (isDeadline: boolean) => void
  setDate: (date: string) => void
  setTime: (time: string) => void
  setDeadlineType: (deadlineType: string) => void
}) {
  const addDeadline = () => {
    if (isDeadline) {
      setDate('')
      setTime('')
      setDeadlineType('')
    }
    setIsDeadline(!isDeadline)
  }

  return (
    <>
      <Checkbox
        htmlFor="deadline"
        onchange={() => {
          addDeadline()
        }}
        label="Add Deadline"
        placeholder=""
      />
      {isDeadline && (
        <Input
          htmlFor="date"
          onchange={(e) => {
            setDate(e.target.value)
          }}
          label="Date"
          placeholder=""
          type="date"
        />
      )}
      {isDeadline && (
        <Input
          htmlFor="time"
          onchange={(e) => {
            setTime(e.target.value)
          }}
          label="Time"
          placeholder=""
          type="time"
        />
      )}
      {isDeadline && (
        <Radio
          htmlFor="To_do_The"
          onchange={() => {
            setDeadlineType('to do the')
          }}
          label="To do The"
          placeholder=""
          name="deadline_type"
        />
      )}
      {isDeadline && (
        <Radio
          htmlFor="Before_The"
          onchange={() => {
            setDeadlineType('before the')
          }}
          label="Before The"
          placeholder=""
          name="deadline_type"
        />
      )}
    </>
  )
}
