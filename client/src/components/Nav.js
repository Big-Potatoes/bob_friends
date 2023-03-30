import React from 'react'
import {
  HiOutlinePencil,
  HiOutlineWallet,
  HiOutlineQuestionMarkCircle,
  HiOutlineChatBubbleLeftRight,
} from 'react-icons/hi2'
import { useLocation } from 'react-router-dom'
import {
  LogoWrapper,
  MenuWrapper,
  Wrapper,
  MenuTitle,
} from '../styles/s-components/nav'

const Nav = () => {
  const location = useLocation()
  const Tab = ({ path, name, icon, menu }) => {
    return (
      <li className={name}>
        <MenuWrapper
          to={path}
          className={path === location.pathname ? 'clicked' : null}
        >
          {icon}
          <MenuTitle>{menu}</MenuTitle>
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
          menu={'오늘 뭐 먹지?'}
          icon={<HiOutlineQuestionMarkCircle />}
        />
        <Tab
          path={'/recharge'}
          name={'menu_2 recharge'}
          menu={'포인트 충전'}
          icon={<HiOutlineWallet />}
        />
        <li className="menu_3 logo">
          <MenuWrapper to={'/'}>
            <LogoWrapper src="/assets/logo.png" alt="button_home" />
          </MenuWrapper>
        </li>
        <Tab
          path={'/write'}
          name={'menu_4 write'}
          menu={'글 작성'}
          icon={<HiOutlinePencil />}
        />
        <Tab
          path={'/users'}
          name={'menu_5 users'}
          menu={'친구 목록'}
          icon={<HiOutlineChatBubbleLeftRight />}
        />
      </Wrapper>
    </nav>
  )
}

export default Nav
