import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { LogoWrapper, MenuWrapper, Wrapper } from '../styles/nav'

const Nav = () => {
  const navigate = useNavigate()
  const logoHandler = () => {
    navigate('/')
  }
  const Tab = ({ content, icon }) => {
    const [fill, setFill] = useState('none')
    const onClickMenu = (e) => {
      console.log(e.target)
      setFill(`var(--maincolor)`)
    }
    return (
      <MenuWrapper onClick={onClickMenu}>{`${content}, ${fill}`}</MenuWrapper>
    )
  }
  return (
    <Wrapper className="nav">
      <Tab className="menu_tab_1" content={'오늘뭐먹지?'} />
      <Tab className="menu_tab_2" content={'게시판'} />
      <MenuWrapper className="menu_tab_3 home" onClick={logoHandler}>
        <LogoWrapper src="/assets/logo.png" alt="button_home" />
      </MenuWrapper>
      <Tab className="menu_tab_4" content={'충전'} />
      <Tab
        className="menu_tab_5"
        content={'write'}
        fileName={'http://www.w3.org/2000/svg'}
      />
    </Wrapper>
  )
}

export default Nav
