import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  OuterWrapper,
  InputLabel,
  InputBase,
  ButtonBase,
} from '../styles/s-global/common'
import {
  Wrapper,
  InputContainer,
  CustomLink,
  CustomSpan,
  AlertText,
  BottomWrapper,
} from '../styles/s-pages/login'

const Login = () => {
  const navigate = useNavigate()
  const [errorMessage, setErrorMessage] = useState('')
  const [userInfo, setUserInfo] = useState({
    id: '',
    pw: '',
  })

  const handleUserInfo = (key) => (e) => {
    const data = {
      ...userInfo,
      [key]: e.target.value,
    }
    setUserInfo(data)
  }
  // todo: api 붙이면 수정할 곳!
  const testApi = false
  const submitUserInfo = (e) => {
    e.preventDefault()
    console.log('api 요청', userInfo)
    //* 로그인 버튼 누르면 서버에 post 요청
    if (testApi) {
      setErrorMessage('')
      navigate('/')
    } else {
      setErrorMessage('아이디가 유효하지 않거나 잘못된 비밀번호 입니다.')
    }
  }
  return (
    <OuterWrapper>
      <Wrapper className="login_wrapper" action="#" onSubmit={submitUserInfo}>
        <InputContainer className="input_id">
          <InputLabel htmlFor="id">아이디</InputLabel>
          <InputBase
            type="text"
            id="id"
            onChange={handleUserInfo('id')}
            value={userInfo.id}
          />
        </InputContainer>
        <InputContainer className="input_password">
          <InputLabel htmlFor="password">비밀번호</InputLabel>
          <InputBase
            type="password"
            id="password"
            onChange={handleUserInfo('pw')}
            value={userInfo.pw}
          />
          <AlertText>{errorMessage}</AlertText>
        </InputContainer>
        <ButtonBase type="submit" margin={'60px 0 30px 0'}>
          로그인
        </ButtonBase>
        <BottomWrapper className="join">
          <CustomSpan>아직 계정이 없나요?</CustomSpan>
          <CustomLink to="/join">회원가입</CustomLink>
        </BottomWrapper>
        {/* <BottomWrapper className="identify">
          <CustomSpan>아이디/비밀번호를 잊었나요?</CustomSpan>
          <CustomLink to="identify">계정찾기</CustomLink>
        </BottomWrapper> */}
        {/* <span>소셜로그인</span> */}
      </Wrapper>
    </OuterWrapper>
  )
}

export default Login
