import IconButton from '@/components/iconButton'
import Title from '@/components/title'
import { useToasterContext } from '@/context/toasterTextContext'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { useRouter } from 'next/navigation'
import { AiOutlineMenuFold, AiOutlineMenuUnfold } from 'react-icons/ai'
import { RiLogoutBoxRLine } from 'react-icons/ri'

export default function Header({
  showNavBar,
  setShowNavBar,
}: {
  showNavBar: boolean
  setShowNavBar: (showNavBar: boolean) => void
}) {
  const supabase = createClientComponentClient()
  const router = useRouter()
  const [, setToaster] = useToasterContext()

  const logOut = async () => {
    const { error } = await supabase.auth.signOut()
    if (error) {
      setToaster({ message: error.message, type: 'ERROR' })
      console.log(error)
    } else {
      router.push('/login')
    }
  }

  return (
    <div className="flex w-96 items-center justify-between md:w-full">
      <div className="ml-2 w-20">
        {showNavBar ? (
          <IconButton
            icon={<AiOutlineMenuFold />}
            onClick={() => setShowNavBar(false)}
            text=""
            iconColor="black"
          />
        ) : (
          <IconButton
            icon={<AiOutlineMenuUnfold />}
            onClick={() => setShowNavBar(true)}
            text=""
            iconColor="black"
          />
        )}
      </div>
      <Title />
      <div className="mr-5 w-20">
        <IconButton
          icon={<RiLogoutBoxRLine />}
          text=""
          onClick={logOut}
          iconColor="black"
        />
      </div>
    </div>
  )
}
