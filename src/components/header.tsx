import IconButton from '@/components/iconButton'
import Title from '@/components/title'
import { useToasterContext } from '@/context/toasterTextContext'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { useRouter } from 'next/navigation'
import { AiOutlineMenuFold, AiOutlineMenuUnfold } from 'react-icons/ai'
import { RiLogoutBoxRLine } from 'react-icons/ri'

export default function Header({
  showMenu,
  setShowMenu,
}: {
  showMenu: boolean
  setShowMenu: (showMenu: boolean) => void
}) {
  const supabase = createClientComponentClient()
  const router = useRouter()
  const [, setToasterText] = useToasterContext()

  const logOut = async () => {
    const { error } = await supabase.auth.signOut()
    if (error) {
      setToasterText({ message: error.message, type: 'ERROR' })
      console.log(error)
    } else {
      router.push('/login')
    }
  }

  return (
    <div className="flex justify-between items-center w-96 md:w-full">
      <div className="ml-2 w-20">
        {showMenu ? (
          <IconButton
            icon={<AiOutlineMenuFold />}
            onClick={() => setShowMenu(false)}
            text=""
            iconColor="black"
          />
        ) : (
          <IconButton
            icon={<AiOutlineMenuUnfold />}
            onClick={() => setShowMenu(true)}
            text=""
            iconColor="black"
          />
        )}
      </div>
      <Title />
      <div className="w-20 mr-5">
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
