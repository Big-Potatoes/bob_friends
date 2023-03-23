import React from 'react'
import {
  HiOutlinePencil,
  HiOutlineWallet,
  HiOutlineQueueList,
  HiOutlineQuestionMarkCircle,
} from 'react-icons/hi2'
import { useLocation } from 'react-router-dom'
import { LogoWrapper, MenuWrapper, Wrapper } from '../styles/nav'

const Nav = () => {
  const location = useLocation()
  const Tab = ({ path, name, icon }) => {
    console.log(location.pathname === path)
    return (
      <li className={name}>
        <MenuWrapper
          to={path}
          className={path === location.pathname ? 'clicked' : null}
        >
          {icon}
        </MenuWrapper>
      </li>
    )
  }
  return (
    <nav className="nav">
      <Wrapper className="menu_container">
        <Tab
          path={'/rullet'}
          name={'menu_1 rullet'}
          icon={<HiOutlineQuestionMarkCircle />}
        />
        <Tab
          path={'/board'}
          name={'menu_2 board'}
          icon={<HiOutlineQueueList />}
        />
        <li className="menu_3 logo">
          <MenuWrapper to={'/'}>
            <LogoWrapper src="/assets/logo.png" alt="button_home" />
          </MenuWrapper>
        </li>
        <Tab
          path={'/recharge'}
          name={'menu_4 recharge'}
          icon={<HiOutlineWallet />}
        />
        <Tab path={'/write'} name={'menu_5 write'} icon={<HiOutlinePencil />} />
      </Wrapper>
    </nav>
  )
}

export default Nav
