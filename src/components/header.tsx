import Title from '@/components/title';
import { RiLogoutBoxRLine } from 'react-icons/ri';
import { AiOutlineMenuFold, AiOutlineMenuUnfold } from 'react-icons/ai';
import IconButton from '@/components/iconButton';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { useRouter } from 'next/navigation'


export default function Header({ showMenu, setShowMenu, setModalText }: { showMenu: boolean, setShowMenu: (showMenu: boolean) => void, setModalText: (text: string) => void }) {
  const supabase = createClientComponentClient();
  const router = useRouter()

  const logOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      setModalText("ERROR : " + error.message);
      console.log(error);
    } else {
      router.push('/login');
    }
  }

  return <div className='flex justify-between w-96 md:w-full'>
    <div className='ml-4 w-20'>
      {showMenu ? <IconButton icon={<AiOutlineMenuFold />} onClick={() => setShowMenu(false)} text='' iconColor='black' /> :
        <IconButton icon={<AiOutlineMenuUnfold />} onClick={() => setShowMenu(true)} text='' iconColor='black' />}
    </div>
    <Title />
    <div className='mr-4 w-20'>
      <IconButton icon={<RiLogoutBoxRLine />} text=''
        onClick={logOut} iconColor='black'
      />
    </div>
  </div>
}