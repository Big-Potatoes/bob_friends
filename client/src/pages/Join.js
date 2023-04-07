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
  //* id 유효성 검사
  // 1. id 입력 받고 중복검사 누르면 서버로 검사 요청
  // 2. 검사 결과 받은걸로 유효성 여부 바꾸기
  //* pw 유효성 검사
  // 1. pw 입력값이 변할 때 마다 비밀번호 형식에 유효한지
  // 2. pwConfirm 값이 입력될 때'마다' pw와 같은 값인지 검사해야함
  //* 회원 정보 submit 전 검사
  // id, pw, pw-confirm 데이터 모두 입력된 상태
  // id 유효성 검사 true
  // pw 양식이 형식에 적합한지
  // pw, pw-confirm 값이 같은지
  const [id, setId] = useState('')
  const [nickname, setNickname] = useState('')
  const [pw, setPw] = useState('')
  const [pwConfirm, setPwConfirm] = useState('')
  const [isValidId, setIsValidId] = useState(false)
  const [isValidPw, setIsValidPw] = useState(false)
  const handleInputId = (e) => {
    // id 값 입력 받는 함수
    setId(e.target.value)
  }
  const handleInputNickname = (e) => {
    setNickname(e.target.value)
  }
  const handleInputPw = (e) => {
    //pw 값 입력 받는 함수
    setPw(e.target.value)
  }
  const handleInputPwConfirm = (e) => {
    //pwConfirm 값 입력 받는 함수
    setPwConfirm(e.target.value)
  }
  const checkId = () => {
    //TODO: id 유효성 검사 IN 서버 -> id 입력 후 중복검사 요청 보낸 결과값으로 보여주기
    setIsValidId(true)
  }
  const checkpw = () => {
    //1. 총 길이가 8글자 이상 20글자 이하
    //2. 영어 소문자, 대문자, 숫자, 특수기호 모두를 포함해야 함
    const reg = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@$!%*?&]).{2,}$/
    setIsValidPw(pw.length !== 0 && reg.test(pw))
  }
  const checkPwConfirm = () => {
    // 모두 입력된 상태이고
    // 값이 같아야함
    console.log(pw)
    console.log(pw === pwConfirm)
    return pw.length !== 0 && pwConfirm.length !== 0 && pw === pwConfirm
  }
  const submitUserInfo = (e) => {
    e.preventDefault()
    console.log(id, nickname, pw)
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
            onChange={handleInputId}
            value={id}
            required
          />
        </InputContainer>
        <p onClick={checkId}>중복검사</p>
        <div className="id_alert_wrapper">
          {id ? (
            isValidId ? (
              <AlertText>사용할 수 있는 아이디입니다.</AlertText>
            ) : (
              <AlertText>이미 가입된 아이디입니다.</AlertText>
            )
          ) : null}
        </div>
        <InputContainer className="input_nickname">
          <InputLabel htmlFor="id">닉네임</InputLabel>
          <InputBase
            type="text"
            id="nickname"
            onChange={handleInputNickname}
            value={nickname}
            required
          />
        </InputContainer>
        <InputContainer className="input_password">
          <InputLabel htmlFor="password">비밀번호</InputLabel>
          <InputBase
            type="password"
            id="password"
            onChange={(e) => {
              handleInputPw(e)
              checkpw()
            }}
            value={pw}
            required
          />
        </InputContainer>
        <AlertText color="var(--black-200)" width="280px">
          8~20자 사이의 영문 소문자, 대문자, 숫자, 특수기호(@$!%*?&)로
          이루어져야 합니다.
        </AlertText>
        {pw ? (
          isValidPw ? null : (
            <AlertText>사용할 수 없는 비밀번호입니다.</AlertText>
          )
        ) : null}
        <InputContainer className="input_password_confirm">
          <InputLabel htmlFor="password_confirm">비밀번호 확인</InputLabel>
          <InputBase
            type="password"
            id="password_confirm"
            onChange={(e) => {
              handleInputPwConfirm(e)
              checkPwConfirm()
            }}
            value={pwConfirm}
            required
          />
        </InputContainer>
        {pwConfirm ? (
          checkPwConfirm() ? null : (
            <AlertText>비밀번호가 일치하지 않습니다.</AlertText>
          )
        ) : null}
        <ButtonBase
          type="submit"
          className={
            isValidId && isValidPw && checkPwConfirm() ? 'disabled' : null
          }
          onSubmit={submitUserInfo}
          disabled={false}
        >
          회원가입
        </ButtonBase>
      </Wrapper>
    </OuterWrapper>
  )
}

export default Join
