import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Wrapper, LogoContainer } from '../styles/header'
//* header에 있어야 할 기능
// center - 로고 : 클릭하면 index로 이동

const Header = () => {
  const navigate = useNavigate()
  const logoHandler = () => {
    navigate('/')
  }
  const [region, setRegion] = useState(false)
  const [isEdit, setIsEdit] = useState(false)
  const [isLogin, setIsLogin] = useState(true)

  //* test용 state
  const testLogin = true
  const testEdit = false
  const testRegion = true

  const LeftField = ({ setRegion, setIsEdit, setIsLogin }) => {
    // 2. 지역 : 인증시 유저의 인증한 지역, 없으면 지역 인증 유도 버튼
    // 5. 뒤로가기 : 게시글 작성일 때 뒤로 가기 버튼
    useEffect(() => {
      // 로그인한 상태
      // ? (로그인 O) 페이지 위치-content ? 뒤로가기 : null
      //  : (페이지 위치-not content) 지역 인증 O ? 인증된 지역 : 지역 인증 필요
      // : (로그인 X) 지역 인증 필요
      setRegion(testRegion)
      setIsEdit(testEdit)
      setIsLogin(testLogin)
    }, [])
    return (
      <div className="header_left">
        {isLogin ? (
          isEdit ? (
            <p>뒤로 가기</p>
          ) : region ? (
            <p>경기 남부</p>
          ) : (
            <p>지역 인증 필요</p>
          )
        ) : (
          <p>지역 인증 필요</p>
        )}
      </div>
    )
  }
  const RightField = ({ setIsEdit, setIsLogin }) => {
    // 3. login : login 상태가 아닐 경우 노출
    // 4. mypage: login 상태일 경우 노출
    // 6. 완료버튼 : 게시글 작성일 때 완료 버튼
    useEffect(() => {
      setIsLogin(testLogin)
      setIsEdit(testEdit)
    }, [])
    return (
      <div className="header_right">
        {isLogin ? isEdit ? <p>완료</p> : <p>myPage</p> : <p>login</p>}
      </div>
    )
  }
  return (
    <Wrapper className="header">
      <LeftField
        className="header_left"
        setRegion={setRegion}
        setIsEdit={setIsEdit}
        setIsLogin={setIsLogin}
      />
      <LogoContainer
        className="header_logo"
        src="/assets/logo.png"
        alt="header_logo"
        onClick={logoHandler}
      >
        밥친구
      </LogoContainer>
      <RightField
        className="header_right"
        setIsEdit={setIsEdit}
        setIsLogin={setIsLogin}
      />
    </Wrapper>
  )
}

export default Header
