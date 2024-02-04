import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom'
import { Button } from '../ui/button'
import { useSignOutAccount } from '@/lib/react-query/queriesAndMutations'
import { useEffect } from 'react'
import { useUserContext } from '@/context/AuthContext'
import { sidebarLinks } from '@/constants'
import { INavLink } from '@/types'

const LeftSidebar = () => {
  const {pathname} = useLocation()
  const {mutate:signOut, isSuccess} = useSignOutAccount()
  const navigate = useNavigate();
  const {user} = useUserContext();

  useEffect( () => {
      if(isSuccess) navigate(0);
  },[isSuccess] )

  return (
      <nav className='leftsidebar' >
        <div className='flex flex-col gap-11' >
        <Link to='/' className='flex-between gap-3 items-center'>
                
                <img src='assets/icons/svg/logo-no-background.svg' width={170} height={36} alt='logo' />
            </Link>
            <Link to={`/profile/${user.id}`} className='flex-center gap-3 ' >
                    <img src={user.imageUrl || '/assets/icons/profile-placeholder.svg'} alt="profile picture" className='h-8 w-8 rounded-full' />
                    <div className='flex flex-col'>
                        <p className='body-bold' >
                            {user.name}
                        </p>
                        <p className='small-regular text-light-3' >
                            @{user.username}
                        </p>
                    </div>
                </Link> 
                <ul className='flex flex-col gap-6' >
                    {sidebarLinks.map( (link:INavLink) => {
                      const isactive = pathname === link.route;
                        return (
                            <li key={link.label} className={`leftsidebar-link group ${isactive && "bg-primary-500" } `} >
                                <NavLink to={link.route} className='flex gap-4 items-center p-4' >
                                    <img src={link.imgURL} alt={link.label} className={`group-hover:invert-white ${isactive && 'invert-white'} `}  />
                                    {link.label} 
                                </NavLink>
                            </li>
                        )
                    })}
                </ul>
        </div>

        <Button variant='ghost' className='shad-button_ghost' onClick={()=>signOut()}  >
                    <img src='/assets/icons/logout.svg' alt="logout" />
                    <p className='small-medium lg:base-medium' >LogOut</p>
                </Button>

      </nav>
  )
}

export default LeftSidebar