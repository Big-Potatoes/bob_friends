/* eslint-disable */
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { api } from '../api/api'
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
  const [errorMessage, setErrorMessage] = useState({
    account: '',
    password: '',
    status: '',
  })
  const [userInfo, setUserInfo] = useState({
    account: '',
    password: '',
  })

  const handleUserInfo = (key) => (e) => {
    const data = {
      ...userInfo,
      [key]: e.target.value,
    }
    setUserInfo(data)
    if (e.target.value) {
      setErrorMessage({
        ...errorMessage,
        status: '',
      })
    }
  }
  const submitUserInfo = (e) => {
    e.preventDefault()
    //* login 요청 거절 당했을 때
    api
      .post('/auth/sign-in', userInfo)
      .then((res) => {
        console.log(res)
        if (res.status === 200) {
          localStorage.setItem('Bob_accessToken', res.data.accessToken)
          localStorage.setItem('Bob_refreshToken', res.data.refreshToken)
          navigate('/')
        }
      })
      .catch((error) => {
        console.log(error)
      })
  }
  return (
    <OuterWrapper>
      <Wrapper className="login_wrapper" action="#" onSubmit={submitUserInfo}>
        <InputContainer className="input_id">
          <InputLabel htmlFor="id">아이디</InputLabel>
          <InputBase
            type="text"
            id="id"
            onChange={handleUserInfo('account')}
            value={userInfo.account}
          />
        </InputContainer>
        <AlertText className="alert_id">{errorMessage.account}</AlertText>
        <InputContainer className="input_password">
          <InputLabel htmlFor="password">비밀번호</InputLabel>
          <InputBase
            type="password"
            id="password"
            onChange={handleUserInfo('password')}
            value={userInfo.password}
          />
          <AlertText className="alert_pw">{errorMessage.password}</AlertText>
          <AlertText className="alert_status">{errorMessage.status}</AlertText>
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
