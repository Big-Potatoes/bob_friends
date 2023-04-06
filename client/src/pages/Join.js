/* eslint-disable */
import React, { useState } from 'react'
import {
  OuterWrapper,
  InputBase,
  InputLabel,
  ButtonBase,
} from '../styles/s-global/common'
import { Wrapper, InputContainer, AlertText } from '../styles/s-pages/join'
const Join = () => {
  //* pw 유효성 검사
  // 1. pw 입력값이 변할 때 마다 비밀번호 형식에 유효한지
  // 2. pwConfirm 값이 입력될 때'마다' pw와 같은 값인지 검사해야함
  const [userInfo, setUserInfo] = useState({
    id: '',
    nickname: '',
    pw: '',
    pwConfirm: '',
  })
  const handleInput = (key) => (e) => {
    // id, pw, pwConfirm 값 입력 받는 함수
    let user = {}
    user = {
      ...userInfo,
      [key]: e.target.value,
    }
    setUserInfo(user)
  }
  const checkId = () => {
    //TODO: id 유효성 검사 IN 서버 -> id 입력 후 중복검사 요청 보낸 결과값으로 보여주기
    console.log(userInfo.id)
  }
  const onChangePw = (e) => {
    //1. 총 길이가 8글자 이상 20글자 이하
    //2. 영어 소문자, 대문자, 숫자, 특수기호 모두를 포함해야 함
    const symbols = ['!', '@', '#', '$', '%', '^', '&', '*']
  }
  //Todo: 1. 모든 값이 다 입력되고, 2.유효성 검사를 모두 통과해야 회원가입 버튼을 누를 수 있도록 하기(disabled)
  return (
    <OuterWrapper>
      <Wrapper className="join_wrapper" action="#">
        <InputContainer className="input_id">
          <InputLabel htmlFor="id">아이디</InputLabel>
          <InputBase
            type="text"
            id="id"
            onChange={handleInput('id')}
            required
          />
          <span onClick={checkId}>중복검사</span>
        </InputContainer>
        <div className="id_alert_wrapper">
          <AlertText>사용할 수 있는 아이디입니다.</AlertText>
          <AlertText>이미 가입된 아이디입니다.</AlertText>
        </div>
        <InputContainer className="input_nickname">
          <InputLabel htmlFor="id">닉네임</InputLabel>
          <InputBase
            type="text"
            id="nickname"
            onChange={handleInput('nickname')}
            required
          />
        </InputContainer>
        <InputContainer className="input_password">
          <InputLabel htmlFor="password">비밀번호</InputLabel>
          <InputBase
            type="password"
            id="password"
            onChange={handleInput('pw')}
            required
          />
        </InputContainer>
        <AlertText color="var(--black-200)" width="300px">
          8~20자 사이의 영문 소문자, 대문자, 숫자, 특수기호로 이루어져야 합니다.
        </AlertText>
        <AlertText>사용할 수 없는 비밀번호입니다.</AlertText>
        <InputContainer className="input_password_confirm">
          <InputLabel htmlFor="password_confirm">비밀번호 확인</InputLabel>
          <InputBase
            type="password"
            id="password_confirm"
            onChange={() => {
              handleInput('pwConfirm')
              passwordConfirm(userInfo.pw, userInfo.pwConfirm)
            }}
            required
          />
        </InputContainer>
        <AlertText>비밀번호가 일치하지 않습니다.</AlertText>
        <ButtonBase type="submit">회원가입</ButtonBase>
      </Wrapper>
    </OuterWrapper>
  )
}

export default Join
