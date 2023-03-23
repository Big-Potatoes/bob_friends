import React from 'react'
import styled from 'styled-components'
import { useNavigate } from 'react-router-dom'

//* header에 있어야 할 기능
// 1. 로고 : 클릭하면 index로 이동
// 2. 지역 : 인증시 유저의 인증한 지역, 없으면 지역 인증 유도 버튼
// 3. login : login 상태가 아닐 경우 노출
// 4. mypage: login 상태일 경우 노출
// 5. 뒤로가기 : 게시글 작성일 때 뒤로 가기 버튼
// 6. 완료버튼 : 게시글 작성일 때 완료 버튼

const Wrapper = styled.header`
  width: 100vw;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: space-around;
  background: var(--black-100);
`
const LogoContainer = styled.img`
  width: 40px;
  height: auto;
`
const Header = () => {
  const navigate = useNavigate()
  const logoHandler = () => {
    navigate('/')
  }
  return (
    <Wrapper className="header">
      <p>지역</p>
      <LogoContainer
        src="/assets/logo.png"
        alt="header_logo"
        onClick={logoHandler}
      />
      <p>login/join</p>
    </Wrapper>
  )
}

export default Header
