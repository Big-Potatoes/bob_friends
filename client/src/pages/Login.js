import React from 'react'
import {
  OuterWrapper,
  InputLabel,
  InputBase,
  ButtonBase,
} from '../styles/common'
import { Wrapper, InputContainer, CustomLink, AlertText } from '../styles/login'

const Login = () => {
  return (
    <OuterWrapper>
      <Wrapper className="loing_wrapper">
        <InputContainer className="input_id">
          <InputLabel htmlFor="id">아이디</InputLabel>
          <InputBase type="text" id="id"></InputBase>
        </InputContainer>
        <InputContainer className="input_password">
          <InputLabel htmlFor="password">비밀번호</InputLabel>
          <InputBase type="password" id="password"></InputBase>
        </InputContainer>
        <AlertText>아이디가 유효하지 않거나 잘못된 비밀번호 입니다.</AlertText>
        <ButtonBase>로그인</ButtonBase>
        <div className="join">
          <span>아직 계정이 없나요?</span>
          <CustomLink to="/join">회원가입</CustomLink>
        </div>
        <div className="identify">
          <span>아이디/비밀번호를 잊었나요?</span>
          <CustomLink to="identify">계정찾기</CustomLink>
        </div>
        <span>소셜로그인</span>
      </Wrapper>
    </OuterWrapper>
  )
}

export default Login
