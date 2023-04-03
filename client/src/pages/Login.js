import React, { useState } from 'react'
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
  const [isValid, setIsValid] = useState(true)
  const checkValid = () => {
    // 로그인 버튼 누르면 서버에 post 요청 -> 회원 정보 상태에 따라 isValid 변경
    setIsValid(false)
  }
  return (
    <OuterWrapper>
      <Wrapper className="login_wrapper">
        <InputContainer className="input_id">
          <InputLabel htmlFor="id">아이디</InputLabel>
          <InputBase type="text" id="id"></InputBase>
        </InputContainer>
        <InputContainer className="input_password">
          <InputLabel htmlFor="password">비밀번호</InputLabel>
          <InputBase type="password" id="password"></InputBase>
          {!isValid ? (
            <AlertText>
              아이디가 유효하지 않거나 잘못된 비밀번호 입니다.
            </AlertText>
          ) : null}
        </InputContainer>
        <ButtonBase margin={'60px 0'} onClick={checkValid}>
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
